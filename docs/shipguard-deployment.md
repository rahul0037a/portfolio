# Portfolio: ShipGuard production check setup

This document is prepared for `rahul0037a/portfolio` as `docs/shipguard-deployment.md`. The proposed setup PR adds this guide, two standalone Node 24 scripts, and two workflows. It changes no portfolio application files.

## Current state

- Vercel project: `prj_EKxy3Haw4bfWVd2920KqOeAuVvdK`, team `rahuls-projects-c1bc064c`, production branch `main`.
- Native check: `chk_0146072c-552f-48f1-9b69-ec754eb5ada7`, **ShipGuard production gate**, `requires: build-ready`, `blocks: none`, production only.
- A real nonblocking run on [the current deployment](https://vercel.com/rahuls-projects-c1bc064c/portfolio/2QXBNLmDPma3Yz1wzS28NWqNbxXQ) correctly failed when the local ShipGuard gate returned DISABLED. Production enforcement is not active.

## Proposed files

| Repository path | Purpose |
| --- | --- |
| `.github/workflows/shipguard-production-ci.yml` | Run `npm ci` and `npm run build` on the exact main SHA without gate credentials. |
| `.github/workflows/shipguard-vercel-deployment.yml` | Handle Vercel's production-ready event using trusted main-branch scripts and authenticated deployment metadata. |
| `scripts/deployment-gate.ts` | Poll for an exact-SHA ShipGuard permission and refuse invalid, expired or denied results. |
| `scripts/vercel-deployment-check.ts` | Publish the outcome only to this deployment's native check run. |
| `docs/shipguard-deployment.md` | This setup and activation guide. |

The workflow uses `SHIPGUARD_VERCEL_TEST_ONLY=true` until production activation is approved. Merging these files starts main's CI and Vercel's existing automatic deployment behavior; the setup PR must remain unmerged until that step is approved.

## Test configuration

Repository Actions secrets:

- `SHIPGUARD_GATE_TOKEN`: a new portfolio-scoped ShipGuard evaluator credential. It cannot approve or override a decision.
- `SHIPGUARD_VERCEL_TOKEN`: the approved portfolio-scoped Vercel token, expiring October 31, 2026.

Repository Actions variables:

| Variable | Value |
| --- | --- |
| `SHIPGUARD_URL` | Current HTTPS tunnel origin, with no path. Update when the tunnel restarts. |
| `SHIPGUARD_DASHBOARD_URL` | `http://localhost:3000` for approval links on the administrator's computer. |
| `SHIPGUARD_VERCEL_PROJECT_ID` | `prj_EKxy3Haw4bfWVd2920KqOeAuVvdK` |
| `SHIPGUARD_VERCEL_CHECK_ID` | `chk_0146072c-552f-48f1-9b69-ec754eb5ada7` |
| `SHIPGUARD_PRODUCTION_BRANCH` | `main` |
| `SHIPGUARD_VERCEL_TEST_ONLY` | `true` |

The local ShipGuard configuration must enable the portfolio production gate with branch `main`, required CI context exactly `ShipGuard production CI`, and a maximum analysis age of 60 minutes. Only the relay's authenticated machine evaluation route is exposed by `SHIPGUARD_RELAY_GATE_ENABLED=true`; dashboard and admin routes stay local. PostgreSQL, app, worker, relay and tunnel must remain running. This temporary setup stops working when the computer or tunnel is offline.

## Verify before activation

After the reviewed setup PR is merged, confirm main CI passes on the actual production SHA. Inspect a genuine `vercel.deployment.ready` dispatch and confirm its sender matches the workflow's `vercel[bot]` restriction. The publisher also checks the authenticated Vercel project, repository, branch, deployment ID and SHA.

In nonblocking mode, verify the remote bearer-token connection, queued commit analysis, a denied check, an allowed check, and cancellation/outage handling. REVIEW needs an authenticated local approval; BLOCK needs an explicit override with a reason. Neither can bypass missing, failed or pending independent CI. Every new deployment needs its own run and fresh permission.

## Separate production activation

After the nonblocking workflow succeeds and activation is approved, change this exact native check to `blocks: deployment-promotion` and set `SHIPGUARD_VERCEL_TEST_ONLY=false`. Verify a real deployment remains held for denial and promotes only after fresh permission. Vercel builds continue while promotion waits. The result remains successful after publication even if a ShipGuard grant later expires; Vercel administrators can Force Promote. A local tunnel is not suitable for reliable unattended production enforcement.

Keep credential values out of commits, chat and logs. Rotate credentials before their expiry. Node 24 runs both trusted scripts without installing packages or executing candidate application code with gate secrets.
