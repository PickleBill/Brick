# Bill's Personal AI-Ops Stack — Roadmap

Synthesized from the "Courtana Architecture" research PDF + how this overnight run was actually executed. Goal: a repeatable operating system so Bill runs AI like a 10-person team. Phased; start with what compounds.

## The architecture (target state)
**Memory split** (don't mix strategy with technical constraints — it degrades the agent):
- `BILL-OS.md` — strategic identity: who he is, the thesis, audiences, revenue models, tone. (Parsed by desktop/web agents for drafting.) → the `career-os/` corpus already *is* this.
- `COURTANA-VALUE-PROP.md` — commercial truth / competitive positioning.
- `CLAUDE.md` (per repo) — lean technical constraints, deploy scripts, Definition-of-Done. (Already exists in each repo — keep <500 lines.)
- `LESSONS.md` — incident log (root cause → fix) so agents don't repeat mistakes.

**Control plane:** an orchestration layer (n8n self-hosted via Docker, execution-priced) that listens for webhooks → routes to the right model → formats → writes to the DB/repo, with **human-in-the-loop approval** nodes for anything outward-facing (publishing, sending). This is the "pause and ask Bill" pattern, automated.

**Multi-model routing** (route by task, never one model for everything):
- Long-context reasoning / multi-file code → Claude (Sonnet/Opus tier).
- Strict JSON / schema / tool-calling → GPT-class.
- Video/multimodal extraction → Gemini (native video; cheap at scale — the Pickle DaaS lane).
- High-volume drafting/triage → a flash/mini tier.

**Autonomous task queue (the "Ralph Wiggum" loop):** a `PLAN.md` as the single source of truth; a loop that reads it, does the top incomplete task, runs tests, updates status, exits; a stop-hook clears context and re-injects a fresh session per task. (This overnight run used a lighter version: a `PLAN.md` + parallel sub-agents + artifact-as-you-go.)

**MCP servers** (give the agent live tools): GitHub (PRs/issues), Supabase (schema/data), Notion (org memory), Firecrawl/Brave (web), Vercel/Netlify (deploys). Bill already has GitHub + (in this session) Gmail/Drive/HeyGen MCPs.

**Eval loop (EXP-018 pattern):** for any AI output that drifts (e.g. Pickle DaaS tagging), let staff flag errors; feed corrections + original output to a high-tier model that rewrites the system prompt, commits, redeploys. Closes the quality loop without manual prompt-babysitting.

## Phased plan
- **Phase 0 (this week):** consolidate memory — point all agents at `career-os/` as BILL-OS; add a `LESSONS.md`. Adopt `PLAN.md`-driven sessions. (≈0 new infra.)
- **Phase 1 (this month):** stand up the **Design→Code watcher** (scaffold below) — the first automation that compounds (Claude Design handoff → PR). Add GitHub + Firecrawl MCP to daily driver.
- **Phase 2:** n8n control plane (Docker) for one real workflow — e.g., "new Courtana clip → Gemini analyze → JSON → DB," human-approval before publish.
- **Phase 3:** multi-model router as a shared util across repos; the EXP-018 eval loop on Pickle DaaS tagging.
- **Phase 4:** "AI outreach assistant" (drafts only) — research a target, draft a personalized note from `templates.md`, queue for Bill's one-click approval. **Never auto-sends.**

## Guardrails (non-negotiable)
- Human-in-the-loop for anything outward-facing (publish/send/apply).
- Secrets in env/secret store, never in client code or commits.
- Branch + PR for any change to a deployed surface; never push straight to main.
- Facts ledger is binding for any generated copy.

## Why this matters for the job hunt
This stack *is* the "I build it myself" proof. Operating it visibly (and teaching it — see LEARNING-LOG.md) is itself the forward-deployed-GTM demonstration a frontier lab is hiring for.
