# NEXT-SESSION BRIEF — transfer to a fresh Claude Code window

Hand this (and the two prompts beside it) to the new session. It rolls up what was asked, what's already built and where, and the two themes Bill wants carried forward: **inline-GIF / motion thinking** and **using the Impeccable framework**.

## Coordinates (everything lives here)
- **Repo:** `PickleBill/Brick` · **Working branch:** `claude/bricker-positioning-website-audit-3gar62` · **Open draft PR:** #14.
- The whole career package is under **`career-os/`** on that branch (NOT on `main`, NOT deployed). A fresh clone defaults to `main`, so: `git fetch origin claude/bricker-positioning-website-audit-3gar62 && git checkout` it — or read any file via raw URL: `https://raw.githubusercontent.com/PickleBill/Brick/claude/bricker-positioning-website-audit-3gar62/career-os/<FILE>`.
- **Read these first:** `career-os/MORNING-BRIEF.md` (start here), `GAME-PLAN.md`, `POSITIONING.md`, `OPEN-QUESTIONS.md`, `DECISIONS.md`, `content/FACTS.md` (the binding ledger), `CAREER-CORPUS/*`, `SITE-AUDIT/*` (UX-AUDIT, COPY-AUDIT, WEBSITE-REWRITE, V2-CHANGES), `RESEARCH/*`, `LEARNING-LOG.md`.
- The vibeco repo holds the **Impeccable design framework**: `vibeco/SKILL_*.md` + `vibeco/.impeccable.md`.

## What Bill asked for (the through-line)
1. **Career:** turn his public footprint into an opportunity-generation system for **GTM/partnerships at frontier AI labs** — thesis: *"I sell frontier tech AND I build it myself."* The site is the proof.
2. **Overnight run delivered:** positioning, 50+ org target map (named contacts, live reqs, fit/reach), role matrix, drafted outreach, organized career corpus, résumé/LinkedIn upgrades, AI-ops roadmap + an inert Design→Code watcher, and a sharpened Home (`index.html`: falsifiable hero "I sell frontier tech, and I build it myself" + GTM-lesson captions).
3. **This round:** rework the **Climb** page (kill overlapping text; add a timeline view + a mobile-friendly view toggle; polish to `/impeccable`) and add a **Climb preview module + modal** on Home. I built interim `climb-v2.html` / `index-v2.html` from *description only* (the design handoff was auth-gated). **Bill has now solved the handoff and has the full Claude Design zip** — so the v2 build should come from the **real design assets**, using my v2 files only as pattern reference (toggle, no-overlap, modal, GIF slot), not as the base.

## Theme 1 — inline GIF / motion thinking (carry this)
- **Why GIFs/motion:** a short moving preview (3–5s scroll capture or Loom) of the Climb/terminal converts far better than a static teaser (collateral research: video ≈ +300% engagement). Use them to *entice the click* into deeper pages.
- **The slot pattern (important):** never hard-reference a media file that may not exist — it 404s. Provide a **graceful fallback**: a self-drawing inline **SVG line** (`stroke-dashoffset` animation) that needs no file, and swap in `<img src="…gif">` only when the asset exists. (That's exactly how the Home modal preview is built now.)
- **One signature motion per page, calm everywhere else.** Over-animation reads as AI-slop; the all-muted "de-slop" pass was *also* rejected. The resolution: concentrate energy into ONE moment (the Climb spine drawing itself; the terminal typing; the hero gradient) and keep the rest still.
- **Always** honor `prefers-reduced-motion` (instant, no animation) and lazy-load heavy media so it never blocks LCP.
- Best GIF placements: Climb-preview modal, the terminal (a typing demo), maybe build-card hover previews.

## Theme 2 — using the Impeccable framework (carry this)
Run the build *through* the vibeco Impeccable skills, in order:
- **Shape** — write a one-page design brief before building (purpose, primary user action, direction, layout, states, open questions). Don't build blind.
- **Bolder** — push past the safe/default version toward one distinctive choice per page.
- **Clarify** — copy discipline: verb-first, kill filler, one idea per sentence, match the buyer's mental model (already applied to the Home hero).
- **Overdrive** — the signature animation/interaction (scroll-driven reveal, spring physics, View Transitions), with reduced-motion respected. This is where the GIF/SVG-line thinking lives.
- **Audit** — QA scorecard: accessibility, performance, theming, responsive, anti-patterns.
- **Critique** — Nielsen-heuristic UX pass (separate from code).
- **Polish** — final pass on finished components.
- **Onboard** — empty/first-run states (e.g., the terminal before a query).
- **Banned anti-patterns:** side-stripe borders; gradient *text*. ⚠️ Tension to resolve: the current site uses gradient text in the hero/headings and Bill *likes* the color energy — so either limit gradient text to exactly one signature spot, or get Bill's sign-off to keep it. Flag, don't silently strip.

## Hard guardrails (unchanged)
- **FACTS.md is binding** — ledger wins, nothing invented, ⚠️ items stay off public surfaces. Key: "closed Google as a partner" (NEVER "sold"); "21K processed / 4,097 analyzed"; "40+ apps / 31 repos."
- **`career-os/` is private working material on a PUBLIC repo** — do NOT merge it to `main`; keep it off deployed surfaces (OPEN-Q #1). Build site changes as **new versioned files or a clean branch**; draft PRs only; user is the merge gate.
- Don't touch DNS/billing/auth/infra; no outward-facing actions (no sending/applying).

## Highest-leverage open items (still need Bill — see OPEN-QUESTIONS.md)
Custom domain (billbricker.com) · a real portrait · one named reference/quote · a 60–90s Loom · confirm ⚠️ numbers. These gate conversion more than any pixel.

## The two-session plan (what Bill wants next)
- **Session A — Builder** (`PROMPT-v2-build.md`): overnight v2 build from the Claude Design zip + this context.
- **Session B — Auditor** (`PROMPT-v2-auditor.md`): parallel red-team/different-perspective — reviews, checks facts, proposes alternative versions, scores against Impeccable + the counter-personas.
- **Coordination (critical so they don't stomp each other):** Builder owns its build branch and opens draft PRs; Auditor works read-mostly, posts findings as PR review comments + a critique doc, and proposes alternatives on its OWN branch — it never pushes to the Builder's branch. If both run on the same machine, use **git worktrees** (one per session). Bill is the referee/merge gate.
