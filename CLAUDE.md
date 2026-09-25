# Brick — Bill Bricker's Dynamic Résumé

## ⛔ Non-Negotiable Build Rules (established 2026-06-17, still binding)

These five rules were set for the front-door merge and remain the standing rules for every change. Read them before any change.

1. **`_source/facts.md` is LAW.** No surface gets a number that isn't in it; unverified =
   flagged (⚠️/🚩), never asserted. **`$45M+` = partner AD SPEND, never revenue.**
   **`$26M` = peak revenue.** Contact = `bricker3@gmail.com`, **no phone** on any public surface.
   (`_source/facts.md` supersedes `content/FACTS.md` — see decision D-0.)
2. **The HUB repo is the only source of truth for the site.** Claude Design / Magic Patterns =
   scratchpad for single components only, never whole-page re-imports. Spokes
   (`pickle-daas-data`, `vibeco`) stay separate; the hub **links** to them.
3. **Before ANY change:** read current state (repo + `_source/facts.md` + `_source/spec.md`),
   state what exists, make minimal **diffs**. Never rewrite from scratch. **Can't see current
   state → STOP.** Never silently pick between conflicting facts — surface both, log in
   `_source/decisions.md`, get sign-off.
4. **Before "done": RENDER** desktop + 375px mobile and verify against `_source/spec.md`; state
   what you checked. Harness: `node tools/shoot.mjs <path> --tag <label>` → `tools/screens/*.png`.
5. **One spacing scale** in `:root` (4 / 8 / 16 / 24 / 40 / 64 / 96). **One layout primitive owns
   vertical rhythm;** children never add compensating margins. This is the fix for the
   overlap / uneven-gap problem.

The front-door merge **shipped** (PRs #30/#39): the front door is now the repo root
(`index.html`), and `/sales/` is a redirect stub pointing there. The legacy sales site is
preserved at `archive/sales-legacy-2026-06-22/`. The one automation worth building is a
fact-consistency checker that scans every surface against `_source/facts.md`.

## What This Is

The canonical home of Bill's dynamic résumé / personal OS — a living "about me" product targeting GTM/partnership roles at frontier AI labs. The thesis: the artifact demonstrates the claim ("sells AND builds") — an AI-native personal product, shipped by a GTM operator.

Part of the **Courtana organization** ecosystem (see sibling repos: `vibeco`, `peakcourtana`, `pickle-daas-data`).

## Key Documents

- `_source/facts.md` — **THE ledger.** Single source of truth for every number/claim; supersedes `content/FACTS.md`. ⚠️ marks unconfirmed facts.
- `_source/spec.md` — the site spec every render check verifies against.
- `_source/decisions.md` — decision log; conflicting facts get logged here for sign-off.
- `_source/grader.md` — grading rubric for the site.
- `_source/overhaul-2026-09.md` — the Sept 2026 overhaul plan: facts to reconcile against the new résumé (`_source/resume-2026-09-21.md`), target site, parallel workstreams + agent briefs. Read before any overhaul work.
- `_source/claude-design-brief.md` — paste-ready design-review prompt for Claude Design (the site, its audience, tokens, hard rules, what to hand back). Claude Design returns section-level specs/mockups; they get implemented here, never re-imported whole.
- `HANDOFF.md` — session pickup doc. `PLAN.md` / `PRODUCT.md` / `DESIGN.md` / `BUILD-LOG.md` — the v2 build brief, product register, design system, and build log.
- `ROADMAP.md` — product vision, phased plan, open decisions.
- `INTERVIEW.md` — the corpus-extraction interview. Sessions act as interviewer; answers become `content/stories/`.

## Site Structure (current)

The live site is `picklebill.github.io/Brick/`. All primary pages are at the repo root:

- `index.html` — **the front door** (Main). One-objective page; scroll-spy sections: Deal (Google + partner logos) · Ask · Work · Story · Talk. Nav (every page) = Story (`climb.html`) · Proof (`work.html`) · Résumé (`resume/`) · "Let's talk" CTA (Calendly).
- `climb.html` — Story (the sales-arc narrative). `work.html` — Proof (the full proof of work; anchors `#courtana` `#dreamship` `#pickle-daas` `#vibeco` `#apps`). `resume/` — the résumé page; its PDF `assets/Bill_Bricker_Resume_2026-09.pdf` is rendered from it by `tools/resume-pdf.mjs`. `resume-v2.html` / `resume.html` are redirect stubs → `resume/`.
- `home.js` — front-door behavior (reveal, count-ups, identity card, ask-bill terminal with hiring-manager/reference modes, featured video, scroll-spy).
- `operator-card.js` — `<operator-card>` Web Component: the three-facet identity-card hero (builder · pay it forward · father; O-1, 2026-09-25). The six-facet v6.5 is frozen in `archive/2026-09-pre-overhaul/operator-card.js` and shown beside the live card in `playground.html`. `operator-card-cube.js` — parked cube variant, lives in `playground.html`. `card-lab.html` — card experiments.
- `site-config.js` — one place to wire conversion + analytics (Calendly / Formspree / Plausible / Clarity); everything falls back to `mailto:bricker3@gmail.com` until configured. Calendly is live.
- `tools/` — render harness: `shoot.mjs` (page screenshots), `elshot.mjs` (element shots), `record-motion.mjs`; `net.mjs` makes headless Chromium load Google Fonts behind the cloud sandbox proxy. **`npm run factcheck`** (`tools/factcheck.mjs`) scans every published surface against the ledger's Tier A rules; CI runs it on every PR.
- `sales/index.html` — redirect stub → root (forwards query/hash). `archive/sales-legacy-2026-06-22/` — the preserved legacy sales site. `archive/` root files — the pre-merge builder page.
- `v3/` — parked experiment. `content/`, `source/` — legacy content/design references from the v1 lineage (`pickle-daas-data`).

## Conventions

- **Content-first architecture**: all surfaces (pages, terminal, PDF, OG cards) render from `content/`. Never hardcode a fact into a page.
- **Static site** — plain HTML/CSS/JS + JSON on GitHub Pages. Do not introduce a framework without an explicit decision in `ROADMAP.md`.
- **Publicity tags** (`public` / `blur` / `private`) on facts and stories are binding. `private` content may be alluded to by the terminal but never stated.
- **Design guardrails**: near-black `#08090a`, green→cyan→violet→coral gradients, glass cards (`rgba(255,255,255,.045)` fill, `.09` borders), 22px radius. Type: **Bricolage Grotesque** (display) + **Hanken Grotesk** (body) + **JetBrains Mono** (terminal/labels). Keep the color + motion energy — the brief reaction (2026-06-13) to an all-muted "de-slop" pass was that it killed what made the site feel alive. **Design direction under active revision, UX-led** (hierarchy, scannability, accessible motion, progressive disclosure) rather than a single style rubric; fold in select Impeccable skills (e.g. Overdrive for signature animation). Anti-pattern: generic AI-generated interfaces.
- The LLM terminal backend lives in the vibeco Supabase project (its `_shared/llm-client.ts` conventions apply).

## Operating Preferences

- **Merging**: Bill authorized auto-merging Claude-authored roadmap PRs once they're mergeable and CI is green (decided 2026-06-13). Pause and ask before merges that are risky, irreversible, or outside the agreed scope.
- **Keep the old version of every major visual change** (decided 2026-09-25, O-5): before a page or big component changes, freeze the old one under `archive/<yyyy-mm>-<label>/` (or beside the live one in `playground.html` for components) with before/after screenshots, so Bill can compare "what it was" vs "what it became." Never overwrite without an archived copy.
- **Always hand Bill a preview link** for any UI change (he's non-technical and previews everything): the live GitHub Pages URL after merge, or a `raw.githack.com/PickleBill/Brick/<branch>/<path>` link for a branch before merge (decided 2026-06-15).
- **Positioning** (per the 2026-06-15 "Col bill" call, unchanged through the merge): AI-Forward Sales & Partnerships lead, Dreamship/Google centerpiece, no phone, $45M+ ad-spend ≠ $26M peak revenue. The sales-first Dossier that carried this was folded into the root front door; its legacy build (with `ai-forward.css` / `ai-forward.js`) is under `archive/sales-legacy-2026-06-22/`.

## Working With Bill

Bill answers interviews via voice-memo transcripts and bullet dumps; sessions do the structuring. When facts conflict across repos/docs, the ledger wins — flag conflicts, don't silently pick. Sensitive territory (The Long Walk / health) is handled at whatever publicity level Bill sets; default to discoverable-not-headline.
