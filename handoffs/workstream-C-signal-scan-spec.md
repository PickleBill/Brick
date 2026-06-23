# Workstream C — Market-Research Agents ("Signal Scan") — SPEC

> Separate initiative (its own repo, a spoke — not part of the Brick site). Authored 2026-06-22 by a background agent. Nothing built yet; this is the spec + scaffold for review. v1 feeds Brick's roadmap first, then generalizes to Vibeco / Courtana / any company (dogfood).

## TL;DR
- Pipeline: **Scanners → Normalizer → Pain-ranker → Roadmap-writer → Digest/publish.**
- **v1 thin slice = Hacker News only** (Algolia API, no auth, ToS-clean) end-to-end to a first Markdown report.
- Outputs: a weekly **Intelligence Report** + a **ranked opportunity roadmap** tagged `brick-site-improvement` vs `net-new-product`, optionally auto-filed as GitHub issues into Brick (dry-run by default).
- Off-the-shelf: Claude Code `Agent` tool for orchestration, JSON files for storage, cron/Actions for cadence. No DB/framework in v1.
- Platform risk is the main constraint: HN/Reddit safe-ish; **X, LinkedIn, job boards are ToS-restricted** and gated behind explicit decisions (LinkedIn = never scrape; X = paid API only).

## Repo
Recommended name **`signal-scan`** (describes the function, generalizes). Private initially. Structure: `config/` (pain-areas, platforms, scoring), `agents/` (one .md per sub-agent), `tools/` (hn.mjs, reddit.mjs, github-issues.mjs), `data/` (raw → normalized → clusters → opportunities), `reports/`, `orchestrate.mjs`.

## Sub-agents
1. **Scanners (per platform)** — HN (Algolia `search`/`search_by_date`, no key — build first), Reddit (official OAuth app-only), X (⛔ paid/ToS, off), job boards (⛔ ToS, demand-corroborator only), LinkedIn (⛔ never scrape; manual paste-in lane only). Output raw items with verbatim quote ≤400 chars + permalink + relevance_guess.
2. **Normalizer/dedupe** — unify schema, fuzzy-merge near-dupes across platforms, scrub PII.
3. **Pain-ranker** — cluster into themes; score `Frequency × Intensity × Monetizability × Fit` (1–5 rubric each; show sub-scores + cited quotes; ≥3 sources for "high confidence").
4. **Roadmap-writer** — tag each opportunity `brick-site-improvement` | `net-new-product` | `insight-only`; problem statement + action + effort (S/M/L) + feeds (Brick/Vibeco/Courtana).
5. **Digest/publish** — weekly Markdown report (TL;DR top-3 + deltas, ranked table, evidence, two-track roadmap); opt-in GitHub issue filing (dry-run default, threshold-gated, only brick-site items, label `from:signal-scan`).

## Query seeds (4 pain areas)
- **Personal sites/portfolios** — HN: "portfolio site recruiters", "developer portfolio waste of time"; Reddit: r/cscareerquestions, r/web_design, r/freelance, r/resumes. Hypotheses: "all look AI-generated", "nobody clicks it", "effort vs ROI", "can't show proof".
- **Hiring** — HN: "hiring is broken", "resume black hole", "ATS"; Reddit: r/recruitinghell, r/ExperiencedDevs, r/managers. Hypotheses: "can't verify claims", "resumes all sound AI-written", "senior GTM-AI talent unfindable".
- **Recruiters** — HN: "recruiter spam", "sourcing tools"; Reddit: r/recruiting, r/Talent. Hypotheses: "generic outreach ignored", "can't assess real fit".
- **Being found / finding people like me** — HN: "how recruiters find you", "talent search tool"; Reddit: r/cscareerquestions, r/Entrepreneur. Hypotheses: "great but invisible", "no way to surface sells-AND-builds profiles", "matching is keyword-dumb".

## Data schema
Three lifecycle stages (JSON): **raw item** (platform, pain_area, permalink, quote, engagement, relevance_guess) → **normalized item** (representative_quote, sources[], corroboration_count, pii_scrubbed) → **theme** (pain_statement, member_ids, evidence) → **ranked opportunity** (scores{frequency,intensity,monetizability,fit,total}, track, proposed_action, effort, feeds, delta_vs_last_run).

## Orchestration & cadence
DAG: scanners (parallel) → normalize → rank → roadmap → digest → (opt-in) issues. Run via Claude Code Agent tool (v1) or headless cron/Actions (once prompts stable). **Weekly** Monday digest + **on-demand**. `data/.lastrun.json` tracks per-platform `since`.

## v1 thin slice (build first)
HN → first report end to end, zero auth/cost/ToS: write `tools/hn.mjs` → HN Scanner → Normalizer (HN-only) → Pain-ranker (top ~10) → Digest (issue-filing dry-run). Review with Bill, then add Reddit, then consider paid platforms.

## Risks/guardrails
LinkedIn never scrape (manual/official only); X paid-only behind budget; Reddit official API + rate limits, no long-term raw storage; PII scrub; ≥3 sources for confidence; issue-filing dry-run + threshold-gated + brick-site-only; never edits Brick site files.

## Open questions for Bill
1. Repo home/visibility (Courtana org? private?). 2. Next platform after HN — Reddit (free, recommended) or pay for X? 3. Monthly budget ceiling for paid APIs? 4. Auto-file issues or keep dry-run + manual? threshold? 5. Cadence: weekly vs on-demand-first? 6. Parameterize `fit` from day 1 for generalization? 7. Manual LinkedIn paste-in lane or skip for v1?

**Recommended next action:** approve the name + HN thin slice, answer Q1–Q4, then build `tools/hn.mjs` + the agent prompt files and run the first HN report. No Brick site files touched.
