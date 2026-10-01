import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { GateConfig, GateEvaluation } from "./deployment-gate";

const CHECK_NAME = "ShipGuard production gate";
type Json = Record<string, unknown>;
export type VercelCheckConfig = { token: string; teamSlug: string; projectId: string; checkId: string; branch: string; testOnly: boolean; gate: GateConfig };
type CheckRun = { id: string; checkId: string; deploymentId: string; projectId?: string; status: string; conclusion?: string; externalId?: string };
type Dependencies = {
  fetch?: typeof fetch; now?: () => number; log?: (line: string) => void; signal?: AbortSignal;
  sleep?: (milliseconds: number) => Promise<void>;
  runGate?: (config: GateConfig) => Promise<{ exitCode: number; evaluation: GateEvaluation }>;
  requestGate?: (config: GateConfig) => Promise<GateEvaluation>;
};
class VercelCheckError extends Error {}
function fail(message: string): never { throw new VercelCheckError(message); }
const id = (value: unknown): value is string => typeof value === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(value);
function object(value: unknown): Json { return value && typeof value === "object" && !Array.isArray(value) ? value as Json : fail("Vercel returned an invalid response."); }
function required(env: Record<string, string | undefined>, name: string) { const value = env[name]; if (!value || value !== value.trim()) fail(`${name} is missing or invalid.`); return value!; }
function credentials(env: Record<string, string | undefined>) {
  const token = required(env, "VERCEL_TOKEN"), teamSlug = required(env, "VERCEL_TEAM_SLUG"), projectId = required(env, "VERCEL_PROJECT_ID");
  if (token.length > 512 || /[\s\x00-\x1f\x7f]/.test(token)) fail("VERCEL_TOKEN is invalid.");
  if (!/^[a-z0-9][a-z0-9-]{0,99}$/.test(teamSlug) || !/^prj_[a-zA-Z0-9]+$/.test(projectId)) fail("Vercel project or team scope is invalid.");
  return { token, teamSlug, projectId };
}
export function vercelCheckConfig(env: Record<string, string | undefined>, gate: GateConfig): VercelCheckConfig {
  const scoped = credentials(env), checkId = required(env, "VERCEL_CHECK_ID"), branch = required(env, "SHIPGUARD_PRODUCTION_BRANCH");
  if (!id(checkId) || !branch || branch.length > 255 || /[\x00-\x1f\x7f]/.test(branch)) fail("Vercel check ID or production branch is invalid.");
  if (gate.request.target !== "production-commit" || gate.request.environment !== "production" || gate.request.prNumber !== undefined) fail("Native Vercel checks require the production-commit target and production environment.");
  if (env.SHIPGUARD_VERCEL_TEST_ONLY !== undefined && !["true", "false"].includes(env.SHIPGUARD_VERCEL_TEST_ONLY)) fail("SHIPGUARD_VERCEL_TEST_ONLY must be true or false.");
  return { ...scoped, checkId, branch, testOnly: env.SHIPGUARD_VERCEL_TEST_ONLY === "true", gate };
}
export function checkSetupPlan(projectId: string, teamSlug: string) {
  if (!/^prj_[a-zA-Z0-9]+$/.test(projectId) || !/^[a-z0-9][a-z0-9-]{0,99}$/.test(teamSlug)) fail("Vercel project or team scope is invalid.");
  return { method: "POST", url: `https://api.vercel.com/v2/projects/${projectId}/checks?slug=${encodeURIComponent(teamSlug)}`, body: { name: CHECK_NAME, requires: "build-ready", blocks: "none", targets: ["production"], source: { kind: "webhook" }, timeout: 2400, isRerequestable: false } };
}
export function validateDispatch(raw: unknown, config: VercelCheckConfig): string {
  const event = object(raw), payload = object(event.client_payload), project = object(payload.project), git = object(payload.git), repository = object(event.repository);
  if (event.action !== "vercel.deployment.ready" || repository.full_name !== config.gate.request.repository
    || project.id !== config.projectId || payload.environment !== "production" || git.ref !== config.branch
    || typeof git.sha !== "string" || git.sha.toLowerCase() !== config.gate.request.headSha
    || typeof payload.id !== "string" || !/^dpl_[a-zA-Z0-9]+$/.test(payload.id)) fail("Vercel dispatch does not match the configured project, repository, production branch, or exact commit.");
  return payload.id as string;
}
export function validateDeployment(raw: unknown, config: VercelCheckConfig, deploymentId: string) {
  const deployment = object(raw), meta = object(deployment.meta);
  const [owner, repo] = config.gate.request.repository.split("/");
  if (deployment.id !== deploymentId || deployment.projectId !== config.projectId || deployment.target !== "production" || deployment.readyState !== "READY"
    || meta.githubCommitSha !== config.gate.request.headSha || meta.githubCommitRef !== config.branch
    || meta.githubCommitOrg !== owner || meta.githubCommitRepo !== repo) fail("Authenticated Vercel deployment metadata does not match the requested project, repository, production branch, or commit.");
}
export function validateCheck(raw: unknown, config: Pick<VercelCheckConfig, "projectId" | "checkId" | "testOnly">) {
  const check = object(raw), source = object(check.source);
  if (check.id !== config.checkId || check.projectId !== config.projectId || check.name !== CHECK_NAME || check.deletedAt !== undefined
    || check.requires !== "build-ready" || check.blocks !== (config.testOnly ? "none" : "deployment-promotion")
    || !Array.isArray(check.targets) || check.targets.length !== 1 || check.targets[0] !== "production"
    || source.kind !== "webhook" || typeof check.timeout !== "number" || check.timeout < 2100 || check.timeout > 3600) fail("The Vercel check is not the configured ShipGuard production check with the required blocking mode and timeout.");
}
function validateRun(raw: unknown, config: VercelCheckConfig, deploymentId: string): CheckRun {
  const run = object(raw);
  if (!id(run.id) || run.checkId !== config.checkId || run.deploymentId !== deploymentId || run.projectId !== config.projectId
    || !["queued", "running", "completed"].includes(String(run.status))) fail("Vercel returned a check run for an unexpected deployment or check.");
  return run as CheckRun;
}
async function responseJson(response: Response) {
  if (!response.headers.get("content-type")?.includes("application/json") || !response.body) fail("Vercel returned an invalid JSON response.");
  const reader = response.body!.getReader(), parts: Uint8Array[] = []; let length = 0;
  try { while (true) { const next = await reader.read(); if (next.done) break; length += next.value.byteLength; if (length > 262144) { await reader.cancel(); fail("Vercel response exceeded the safe size limit."); } parts.push(next.value); } }
  finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length); let at = 0; for (const part of parts) { bytes.set(part, at); at += part.byteLength; }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown; } catch { return fail("Vercel returned unreadable JSON."); }
}
async function api(config: Pick<VercelCheckConfig, "token" | "teamSlug">, path: string, dependencies: Dependencies, method = "GET", body?: unknown, cleanup = false) {
  const url = new URL(path, "https://api.vercel.com"); if (url.origin !== "https://api.vercel.com" || !path.startsWith("/") || path.startsWith("//")) fail("Invalid Vercel API path.");
  url.searchParams.set("slug", config.teamSlug);
  const timeout = AbortSignal.timeout(15000), signal = dependencies.signal && !cleanup ? AbortSignal.any([dependencies.signal, timeout]) : timeout;
  let response: Response;
  try { response = await (dependencies.fetch ?? fetch)(url.href, { method, redirect: "manual", signal, headers: { Authorization: `Bearer ${config.token}`, Accept: "application/json", ...(body !== undefined ? { "Content-Type": "application/json" } : {}) }, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) }); }
  catch { return fail("Vercel check request failed or timed out. Promotion is not approved."); }
  if (!response.ok) fail(`Vercel check request failed (HTTP ${response.status}). Promotion is not approved.`);
  return responseJson(response);
}
const cancelled = (dependencies: Dependencies) => { if (dependencies.signal?.aborted) fail("Vercel check was cancelled. Promotion is not approved."); };
const nativeGate = async () => await import(new URL("./deployment-gate.ts", import.meta.url).href) as typeof import("./deployment-gate");

export async function runVercelDeploymentCheck(config: VercelCheckConfig, event: unknown, dependencies: Dependencies = {}): Promise<{ exitCode: number; runId: string }> {
  const log = dependencies.log ?? console.log, now = dependencies.now ?? Date.now, deploymentId = validateDispatch(event, config);
  const deadline = now() + config.gate.maxWaitMs;
  const runPath = `/v2/deployments/${deploymentId}/check-runs`, checkPath = `/v2/projects/${config.projectId}/checks/${config.checkId}`;
  let run: CheckRun | undefined;
  try {
    cancelled(dependencies);
    validateCheck(await api(config, checkPath, dependencies), config);
    validateDeployment(await api(config, `/v13/deployments/${deploymentId}?withGitRepoInfo=true`, dependencies), config, deploymentId);
    const listing = object(await api(config, runPath, dependencies));
    if (!Array.isArray(listing.runs) || listing.runs.length > 1000) fail("Vercel check run listing is invalid or incomplete.");
    const matches = listing.runs.filter((entry) => object(entry).checkId === config.checkId);
    if (matches.length > 1) fail("Several runs exist for this deployment and check. Inspect them before retrying.");
    run = matches.length ? validateRun(matches[0], config, deploymentId) : validateRun(await api(config, runPath, dependencies, "POST", { checkId: config.checkId }), config, deploymentId);
    if (run.status === "completed" || (run.externalId && run.externalId !== config.gate.request.requestKey)) fail("This deployment check run was already completed or claimed by another workflow attempt.");
    cancelled(dependencies);
    run = validateRun(await api(config, `${runPath}/${run.id}`, dependencies, "PATCH", { status: "running", externalId: config.gate.request.requestKey }), config, deploymentId);
    if (run.status !== "running" || run.externalId !== config.gate.request.requestKey) fail("Vercel did not confirm ownership of the running check.");
    // Complete this gate after the other blocking Vercel checks. Otherwise a
    // successful grant could sit while another check waits for human action.
    while (true) {
      const currentRuns = object(await api(config, runPath, dependencies));
      if (!Array.isArray(currentRuns.runs) || currentRuns.runs.length > 1000) fail("Vercel check run listing is invalid or incomplete.");
      const otherBlocking = currentRuns.runs.map(object).filter((item) => item.checkId !== config.checkId && ["deployment-promotion", "deployment-alias"].includes(String(item.blocks)));
      if (otherBlocking.some((item) => item.status === "completed" && item.conclusion !== "succeeded")) fail("Another Vercel promotion check did not succeed.");
      if (otherBlocking.every((item) => item.status === "completed" && item.conclusion === "succeeded")) break;
      cancelled(dependencies);
      const remaining = deadline - now(); if (config.gate.maxWaitMs === 0 || remaining <= 0) fail("Other Vercel promotion checks did not finish within the wait limit.");
      const waitMs = Math.min(config.gate.pollMs, remaining);
      await (dependencies.sleep ?? ((milliseconds) => new Promise<void>((done, reject) => {
        const timer = setTimeout(() => { dependencies.signal?.removeEventListener("abort", abort); done(); }, milliseconds);
        const abort = () => { clearTimeout(timer); reject(new VercelCheckError("Check cancelled.")); };
        dependencies.signal?.addEventListener("abort", abort, { once: true });
      })))(waitMs);
    }
    const gateModule = dependencies.runGate && dependencies.requestGate ? undefined : await nativeGate();
    const gateFetch: typeof fetch = (input, options) => (dependencies.fetch ?? fetch)(input, { ...options, signal: dependencies.signal ? AbortSignal.any([dependencies.signal, ...(options?.signal ? [options.signal] : [])]) : options?.signal });
    const remaining = deadline - now();
    if (config.gate.maxWaitMs > 0 && remaining <= 0) fail("The native check wait limit was reached.");
    const waited = await (dependencies.runGate ?? ((gate) => gateModule!.runGate(gate, { fetch: gateFetch, now, log })))({ ...config.gate, maxWaitMs: config.gate.maxWaitMs === 0 ? 0 : remaining });
    cancelled(dependencies);
    if (waited.exitCode !== 0 || !waited.evaluation.permitted || waited.evaluation.outcome !== "ALLOW") fail("ShipGuard did not allow this production commit within the wait limit.");
    // Re-read all external identities and the active check configuration before
    // the last evaluation. A prior passing run is never reused for a redeploy.
    validateDeployment(await api(config, `/v13/deployments/${deploymentId}?withGitRepoInfo=true`, dependencies), config, deploymentId);
    validateCheck(await api(config, checkPath, dependencies), config);
    const current = validateRun(await api(config, `${runPath}/${run.id}`, dependencies), config, deploymentId);
    if (current.status !== "running" || current.externalId !== config.gate.request.requestKey) fail("The native check run changed while awaiting approval.");
    const lastRuns = object(await api(config, runPath, dependencies));
    if (!Array.isArray(lastRuns.runs) || lastRuns.runs.length > 1000 || lastRuns.runs.map(object).some((item) => item.checkId !== config.checkId && ["deployment-promotion", "deployment-alias"].includes(String(item.blocks)) && (item.status !== "completed" || item.conclusion !== "succeeded"))) fail("Other Vercel promotion check results changed while awaiting approval.");
    const fresh = await (dependencies.requestGate ?? ((gate) => gateModule!.requestGate(gate, { fetch: gateFetch, now })))(config.gate);
    cancelled(dependencies);
    if (!fresh.permitted || fresh.outcome !== "ALLOW" || !fresh.expiresAt || Date.parse(fresh.expiresAt) < now() + 30000) fail("Fresh ShipGuard permission has insufficient remaining validity. Promotion is not approved.");
    const terminal = validateRun(await api(config, `${runPath}/${run.id}`, dependencies, "PATCH", { status: "completed", conclusion: "succeeded", completedAt: now(), conclusionText: "ShipGuard permitted this exact production commit after a fresh evaluation.", externalId: config.gate.request.requestKey, ...(fresh.traceUrl ? { externalUrl: fresh.traceUrl } : {}), output: { evaluationId: fresh.evaluationId, headSha: config.gate.request.headSha, expiresAt: fresh.expiresAt } }), config, deploymentId);
    if (terminal.status !== "completed" || terminal.conclusion !== "succeeded") fail("Vercel did not confirm the successful native check outcome.");
    log(config.testOnly ? "ShipGuard native Vercel check succeeded in NONBLOCKING TEST mode. Production is not protected by this check." : "ShipGuard native Vercel check succeeded for this exact deployment. Other Vercel promotion requirements still apply.");
    return { exitCode: 0, runId: run.id };
  } catch {
    if (run && run.status !== "completed" && (!run.externalId || run.externalId === config.gate.request.requestKey)) {
      try { await api(config, `${runPath}/${run.id}`, dependencies, "PATCH", { status: "completed", conclusion: dependencies.signal?.aborted ? "canceled" : "failed", completedAt: now(), conclusionText: "ShipGuard permission was not established. Production promotion is not approved." }, true); }
      catch { log("Vercel could not record the failed check. Its queued/running state must remain blocking until timeout or manual inspection."); }
    }
    log("ShipGuard native Vercel check did not approve production promotion.");
    return { exitCode: 1, runId: run?.id ?? "" };
  }
}

export async function createNonblockingCheck(env: Record<string, string | undefined>, dependencies: Dependencies = {}) {
  const config = credentials(env), plan = checkSetupPlan(config.projectId, config.teamSlug);
  const listing = object(await api(config, `/v2/projects/${config.projectId}/checks`, dependencies));
  if (!Array.isArray(listing.checks) || listing.checks.some((check) => object(check).name === CHECK_NAME)) fail("ShipGuard check already exists or the check listing is invalid. Inspect it instead of creating a duplicate.");
  const created = object(await api(config, `/v2/projects/${config.projectId}/checks`, dependencies, "POST", plan.body));
  if (!id(created.id)) fail("Vercel did not return a check ID.");
  validateCheck(created, { projectId: config.projectId, checkId: created.id, testOnly: true });
  return created.id;
}
export async function activateCheck(env: Record<string, string | undefined>, dependencies: Dependencies = {}) {
  const config = credentials(env), checkId = required(env, "VERCEL_CHECK_ID"); if (!id(checkId)) fail("VERCEL_CHECK_ID is invalid.");
  const path = `/v2/projects/${config.projectId}/checks/${checkId}`;
  validateCheck(await api(config, path, dependencies), { ...config, checkId, testOnly: true });
  await api(config, path, dependencies, "PATCH", { blocks: "deployment-promotion" });
  validateCheck(await api(config, path, dependencies), { ...config, checkId, testOnly: false });
  return checkId;
}
async function main() {
  if (process.argv.includes("--help")) { console.log("Node 24: node scripts/vercel-deployment-check.ts [--setup-plan | --create-check | --activate-check]. Default runs a verified production deployment check from GITHUB_EVENT_PATH. Setup creates a NONBLOCKING check; activation requires separate explicit approval. See docs/phase5-deployment.md. Credentials are never printed."); return; }
  if (process.argv.includes("--setup-plan")) { console.log(JSON.stringify(checkSetupPlan(required(process.env, "VERCEL_PROJECT_ID"), required(process.env, "VERCEL_TEAM_SLUG")), null, 2)); return; }
  if (process.argv.includes("--create-check")) { console.log(`Nonblocking ShipGuard check created: ${await createNonblockingCheck(process.env)}`); return; }
  if (process.argv.includes("--activate-check")) { console.log(`Production promotion check activated and verified: ${await activateCheck(process.env)}`); return; }
  const gateModule = await nativeGate(), config = vercelCheckConfig(process.env, gateModule.gateConfig(process.env));
  const eventPath = required(process.env, "GITHUB_EVENT_PATH"), eventBytes = readFileSync(eventPath); if (eventBytes.byteLength > 65536) fail("Vercel dispatch payload is too large.");
  const event = JSON.parse(eventBytes.toString("utf8"));
  const controller = new AbortController(); const cancel = () => controller.abort();
  process.once("SIGINT", cancel); process.once("SIGTERM", cancel);
  try { process.exitCode = (await runVercelDeploymentCheck(config, event, { signal: controller.signal })).exitCode; }
  finally { process.removeListener("SIGINT", cancel); process.removeListener("SIGTERM", cancel); }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(() => { console.error("ShipGuard Vercel check failed. No production permission was published; no credentials were printed."); process.exitCode = 1; });
