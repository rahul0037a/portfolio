import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export type GateOutcome = "ALLOW" | "REVIEW" | "BLOCK" | "DENY" | "DISABLED";
export type GateEvaluation = {
  evaluationId: string;
  outcome: GateOutcome;
  permitted: boolean;
  reason: string;
  approvalUrl: string;
  traceUrl?: string;
  expiresAt?: string;
};
export type GateConfig = {
  origin: string;
  dashboardOrigin?: string;
  token: string;
  request: { repository: string; prNumber?: number; target?: "production-commit"; headSha: string; environment: string; requestKey: string };
  pollMs: number;
  maxWaitMs: number;
  waitForOverride?: boolean;
};
type GateDependencies = {
  fetch?: typeof fetch;
  now?: () => number;
  sleep?: (milliseconds: number) => Promise<void>;
  log?: (line: string) => void;
};

class GateError extends Error {}

function required(env: Record<string, string | undefined>, name: string): string {
  const value = env[name];
  if (!value || value !== value.trim()) throw new GateError(`${name} is missing or invalid.`);
  return value;
}

function seconds(env: Record<string, string | undefined>, name: string, fallback: number, min: number, max: number): number {
  const raw = env[name] ?? String(fallback);
  if (!/^\d+$/.test(raw)) throw new GateError(`${name} must be a whole number of seconds.`);
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < min || value > max) throw new GateError(`${name} must be between ${min} and ${max} seconds.`);
  return value * 1000;
}

export function gateConfig(env: Record<string, string | undefined>): GateConfig {
  let url: URL;
  try { url = new URL(required(env, "SHIPGUARD_URL")); } catch { throw new GateError("SHIPGUARD_URL must be an absolute HTTPS origin (localhost HTTP is allowed locally)."); }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new GateError("SHIPGUARD_URL must be an HTTPS origin without credentials, path, query, or fragment (localhost HTTP is allowed locally).");
  }
  const token = required(env, "SHIPGUARD_GATE_TOKEN");
  if (!/^sg_gate_[a-f0-9]{64}$/.test(token)) throw new GateError("SHIPGUARD_GATE_TOKEN is invalid.");
  const repository = required(env, "SHIPGUARD_REPOSITORY");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}\/[a-zA-Z0-9._-]{1,100}$/.test(repository)) throw new GateError("SHIPGUARD_REPOSITORY must be owner/repository.");
  const target = env.SHIPGUARD_TARGET ?? "pull-request";
  if (!["pull-request", "production-commit"].includes(target)) throw new GateError("SHIPGUARD_TARGET must be pull-request or production-commit.");
  const rawPr = target === "pull-request" ? required(env, "SHIPGUARD_PR_NUMBER") : undefined;
  const prNumber = rawPr ? Number(rawPr) : undefined;
  if (rawPr && (!/^[1-9]\d*$/.test(rawPr) || !Number.isSafeInteger(prNumber))) throw new GateError("SHIPGUARD_PR_NUMBER must be a positive integer.");
  if (target === "production-commit" && env.SHIPGUARD_PR_NUMBER) throw new GateError("Production commit requests omit SHIPGUARD_PR_NUMBER.");
  const headSha = required(env, "SHIPGUARD_HEAD_SHA").toLowerCase();
  if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(headSha)) throw new GateError("SHIPGUARD_HEAD_SHA must be the full 40 or 64 character commit SHA.");
  const environment = required(env, "SHIPGUARD_ENVIRONMENT");
  if (!/^[a-z][a-z0-9._-]{0,49}$/.test(environment)) throw new GateError("SHIPGUARD_ENVIRONMENT is invalid.");
  const requestKey = required(env, "SHIPGUARD_REQUEST_KEY");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/.test(requestKey)) throw new GateError("SHIPGUARD_REQUEST_KEY is invalid.");
  let dashboardOrigin = url.origin;
  if (env.SHIPGUARD_DASHBOARD_URL) {
    let dashboard: URL;
    try { dashboard = new URL(env.SHIPGUARD_DASHBOARD_URL); } catch { throw new GateError("SHIPGUARD_DASHBOARD_URL must be a trusted dashboard origin."); }
    if (dashboard.username || dashboard.password || dashboard.pathname !== "/" || dashboard.search || dashboard.hash || !(dashboard.protocol === "https:" || dashboard.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(dashboard.hostname))) throw new GateError("SHIPGUARD_DASHBOARD_URL must be HTTPS or local HTTP, without a path or credentials.");
    dashboardOrigin = dashboard.origin;
  }
  return {
    origin: url.origin,
    dashboardOrigin,
    token,
    request: { repository, ...(target === "production-commit" ? { target: "production-commit" as const } : { prNumber }), headSha, environment, requestKey },
    pollMs: seconds(env, "SHIPGUARD_POLL_SECONDS", 10, 5, 60),
    maxWaitMs: seconds(env, "SHIPGUARD_MAX_WAIT_SECONDS", 600, 0, 1800),
    waitForOverride: env.SHIPGUARD_WAIT_FOR_OVERRIDE === "true",
  };
}

function sameOriginUrl(value: unknown, origin: string): value is string {
  if (typeof value !== "string" || value.length > 2048 || /[\x00-\x1f\x7f]/.test(value)) return false;
  try {
    const url = new URL(value);
    return url.origin === origin && !url.username && !url.password && !url.hash;
  } catch { return false; }
}

export function validateGateEvaluation(value: unknown, origin: string, now: number): GateEvaluation {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new GateError("ShipGuard returned an invalid gate response.");
  const v = value as Record<string, unknown>;
  const outcomes: GateOutcome[] = ["ALLOW", "REVIEW", "BLOCK", "DENY", "DISABLED"];
  if (typeof v.evaluationId !== "string" || !/^[a-zA-Z0-9_-]{1,128}$/.test(v.evaluationId)
    || !outcomes.includes(v.outcome as GateOutcome) || typeof v.permitted !== "boolean"
    || typeof v.reason !== "string" || !v.reason.trim() || v.reason.length > 4000
    || !sameOriginUrl(v.approvalUrl, origin)
    || (v.traceUrl !== undefined && !sameOriginUrl(v.traceUrl, origin))) {
    throw new GateError("ShipGuard returned an invalid gate response.");
  }
  if (v.permitted !== (v.outcome === "ALLOW")) throw new GateError("ShipGuard returned an inconsistent permission decision.");
  if (v.expiresAt !== undefined && (typeof v.expiresAt !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(v.expiresAt) || !Number.isFinite(Date.parse(v.expiresAt)))) {
    throw new GateError("ShipGuard returned an invalid permission expiry.");
  }
  // A positive answer is a short lived permission. Missing/expired permission
  // never becomes a successful deployment merely because a server said ALLOW.
  if (v.permitted && (typeof v.expiresAt !== "string" || Date.parse(v.expiresAt) <= now || Date.parse(v.expiresAt) > now + 330000)) throw new GateError("ShipGuard permission has an invalid or expired time window. Evaluate again before deploying.");
  return v as GateEvaluation;
}

async function boundedBody(response: Response): Promise<string> {
  if (!response.body) throw new GateError("ShipGuard returned an empty gate response.");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 64000) { await reader.cancel(); throw new GateError("ShipGuard returned an oversized gate response."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

export async function requestGate(config: GateConfig, dependencies: GateDependencies = {}, timeoutMs = 45000): Promise<GateEvaluation> {
  const requestFetch = dependencies.fetch ?? fetch;
  const now = dependencies.now ?? Date.now;
  let response: Response;
  try {
    response = await requestFetch(`${config.origin}/api/deployment-gates/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${config.token}` },
      body: JSON.stringify(config.request),
      redirect: "manual",
      signal: AbortSignal.timeout(Math.max(1, Math.min(45000, timeoutMs))),
    });
  } catch { throw new GateError("ShipGuard gate could not be reached within the request timeout. Deployment is denied."); }
  // In particular never follow an HTTP redirect carrying this bearer token.
  if (!response.ok) throw new GateError(`ShipGuard gate request failed (HTTP ${response.status}). Deployment is denied.`);
  if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) throw new GateError("ShipGuard returned a non-JSON gate response. Deployment is denied.");
  try {
    return validateGateEvaluation(JSON.parse(await boundedBody(response)), config.dashboardOrigin ?? config.origin, now());
  } catch (error) {
    if (error instanceof GateError) throw error;
    throw new GateError("ShipGuard returned an unreadable gate response. Deployment is denied.");
  }
}

function safeLog(value: string, token: string): string {
  return value.split(token).join("[redacted]").replace(/[\x00-\x1f\x7f]/g, " ");
}

export async function runGate(config: GateConfig, dependencies: GateDependencies = {}): Promise<{ exitCode: number; evaluation: GateEvaluation }> {
  const now = dependencies.now ?? Date.now;
  const sleep = dependencies.sleep ?? ((milliseconds) => new Promise<void>((resolveSleep) => setTimeout(resolveSleep, milliseconds)));
  const log = dependencies.log ?? console.log;
  const startedAt = now();
  let lastEvaluation: GateEvaluation | undefined;
  let lastMessage = "";
  let approvalShown = false;
  while (true) {
    const remaining = config.maxWaitMs - (now() - startedAt);
    if (lastEvaluation && remaining <= 0) {
      log("ShipGuard review approval was not received within the wait limit. Deployment is denied.");
      return { exitCode: 2, evaluation: lastEvaluation };
    }
    const evaluation = await requestGate(config, dependencies, config.maxWaitMs === 0 ? 45000 : Math.max(1, remaining));
    lastEvaluation = evaluation;
    const message = `ShipGuard ${evaluation.outcome}: ${safeLog(evaluation.reason, config.token)}`;
    if (message !== lastMessage) { log(message); lastMessage = message; }
    if (evaluation.permitted && evaluation.outcome === "ALLOW") {
      log(`ShipGuard allowed this exact commit until ${evaluation.expiresAt}. Re-evaluate immediately before deployment.`);
      return { exitCode: 0, evaluation };
    }
    if (evaluation.outcome !== "REVIEW" && !(evaluation.outcome === "BLOCK" && config.waitForOverride)) return { exitCode: 1, evaluation };
    if (config.maxWaitMs === 0 || now() - startedAt >= config.maxWaitMs) {
      log("ShipGuard review approval was not received within the wait limit. Deployment is denied.");
      return { exitCode: 2, evaluation };
    }
    if (!approvalShown) { log(`ShipGuard approval: ${safeLog(evaluation.approvalUrl, config.token)}`); approvalShown = true; }
    await sleep(Math.min(config.pollMs, config.maxWaitMs - (now() - startedAt)));
  }
}

async function main() {
  if (process.argv.includes("--help")) {
    console.log("Node 24: node scripts/deployment-gate.ts");
    console.log("Required environment: SHIPGUARD_URL, SHIPGUARD_GATE_TOKEN, SHIPGUARD_REPOSITORY, SHIPGUARD_PR_NUMBER, SHIPGUARD_HEAD_SHA, SHIPGUARD_ENVIRONMENT, SHIPGUARD_REQUEST_KEY.");
    console.log("Optional: SHIPGUARD_TARGET=production-commit (omit PR number), SHIPGUARD_DASHBOARD_URL (trusted separate dashboard origin), SHIPGUARD_WAIT_FOR_OVERRIDE=true (poll BLOCK within the same attempt), SHIPGUARD_POLL_SECONDS (5–60, default 10), SHIPGUARD_MAX_WAIT_SECONDS (0–1800, default 600). Exit 0 only for unexpired ALLOW; 2 for wait timeout; 1 otherwise.");
    return;
  }
  const { exitCode } = await runGate(gateConfig(process.env));
  process.exitCode = exitCode;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error instanceof GateError ? error.message : "ShipGuard gate failed. Deployment is denied; no credentials were printed.");
    process.exitCode = 1;
  });
}
