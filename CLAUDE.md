# Brick — Bill Bricker's Dynamic Résumé

## ⛔ Non-Negotiable Build Rules (merge-to-one-front-door, 2026-06-17)

These five rules are binding for the whole front-door merge. Read them before any change.

1. **`_source/facts.md` is LAW.** No surface gets a number that isn't in it; unverified =
   flagged (⚠️/🚩), never asserted. **`$45M+` = partner AD SPEND, never revenue.**
   **`$35M+` = peak revenue.** Contact = `bricker3@gmail.com`, **no phone** on any public surface.
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

The front door being merged is **`/sales/`** (`sales/index.html`). The builder page at the repo
root (`index.html`) is preserved and mined for parts. The one automation worth building is a
fact-consistency checker that scans every surface against `_source/facts.md`.

## What This Is

The canonical home of Bill's dynamic résumé / personal OS — a living "about me" product targeting GTM/partnership roles at frontier AI labs. The thesis: the artifact demonstrates the claim ("sells AND builds") — an AI-native personal product, shipped by a GTM operator.

Part of the **Courtana organization** ecosystem (see sibling repos: `vibeco`, `peakcourtana`, `pickle-daas-data`).

## Key Documents

- `ROADMAP.md` — product vision, phased plan, open decisions. Read this first.
- `INTERVIEW.md` — the corpus-extraction interview. Sessions act as interviewer; answers become `content/stories/`.
- `content/FACTS.md` — single source of truth for every number/claim. Nothing ships to a surface unless it's in the ledger. ⚠️ marks unconfirmed facts.

## Current State & Lineage

The live v1 site is at `picklebill.github.io/pickle-daas-data/showcase/v2/` (repo: `picklebill/pickle-daas-data`, not yet migrated here). Its `source/HANDOVER.md` and `source/content.json` are the design-system and content references. Phase 0 of the roadmap migrates that source into this repo and moves to a custom domain.

## Conventions

- **Content-first architecture**: all surfaces (pages, terminal, PDF, OG cards) render from `content/`. Never hardcode a fact into a page.
- **Static site** — plain HTML/CSS/JS + JSON on GitHub Pages. Do not introduce a framework without an explicit decision in `ROADMAP.md`.
- **Publicity tags** (`public` / `blur` / `private`) on facts and stories are binding. `private` content may be alluded to by the terminal but never stated.
- **Design guardrails**: near-black `#08090a`, green→cyan→violet→coral gradients, glass cards (`rgba(255,255,255,.045)` fill, `.09` borders), 22px radius. Type: **Bricolage Grotesque** (display) + **Hanken Grotesk** (body) + **JetBrains Mono** (terminal/labels). Keep the color + motion energy — the brief reaction (2026-06-13) to an all-muted "de-slop" pass was that it killed what made the site feel alive. **Design direction under active revision, UX-led** (hierarchy, scannability, accessible motion, progressive disclosure) rather than a single style rubric; fold in select Impeccable skills (e.g. Overdrive for signature animation). Anti-pattern: generic AI-generated interfaces.
- The LLM terminal backend lives in the vibeco Supabase project (its `_shared/llm-client.ts` conventions apply).

## Operating Preferences

- **Merging**: Bill authorized auto-merging Claude-authored roadmap PRs once they're mergeable and CI is green (decided 2026-06-13). Pause and ask before merges that are risky, irreversible, or outside the agreed scope.
- **Always hand Bill a preview link** for any UI change (he's non-technical and previews everything): the live GitHub Pages URL after merge, or a `raw.githack.com/PickleBill/Brick/<branch>/<path>` link for a branch before merge (decided 2026-06-15).
- **vSales (sales-first site)**: lives in `/sales/` (Dossier `index.html` is primary; `console.html` + `compare.html` are A/B variants; `climb.html` is the sales-arc story). Old site preserved untouched at the repo root. Build per the 2026-06-15 "Col bill" call: AI-Forward Sales & Partnerships lead, Dreamship/Google centerpiece, nav = Story · Work · Résumé, no phone, $45M+ ad-spend ≠ $35M+ peak revenue. Design system in `sales/ai-forward.css`; live terminal in `sales/ai-forward.js`.

## Working With Bill

Bill answers interviews via voice-memo transcripts and bullet dumps; sessions do the structuring. When facts conflict across repos/docs, the ledger wins — flag conflicts, don't silently pick. Sensitive territory (The Long Walk / health) is handled at whatever publicity level Bill sets; default to discoverable-not-headline.
