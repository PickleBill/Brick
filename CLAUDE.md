# Brick — Bill Bricker's Dynamic Résumé

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

## Working With Bill

Bill answers interviews via voice-memo transcripts and bullet dumps; sessions do the structuring. When facts conflict across repos/docs, the ledger wins — flag conflicts, don't silently pick. Sensitive territory (The Long Walk / health) is handled at whatever publicity level Bill sets; default to discoverable-not-headline.
