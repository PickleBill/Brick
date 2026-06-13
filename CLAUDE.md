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
- **Design guardrails (de-slopped 2026-06-13, Impeccable-aligned).** The old guardrail *was* the AI-slop palette; this replaces it.
  - **Color:** tinted near-black `#0a0b0c`, warm-cream text `#f3ece0`, **one** restrained accent — muted sage `#a8c98e` (rare warm `#e69270` for live/now only). 60-30-10.
  - **NEVER:** gradient text (`background-clip:text`), rainbow neon (cyan/violet/coral/teal as decoration), glassmorphism everywhere, the count-up metric-card template. (These are the exact tells in `SKILL_IMPECCABLE.md`.)
  - **Surfaces:** solid `--surface:#111412` cards; backdrop-blur only on the nav (the one purposeful glass).
  - **Type:** **Bricolage Grotesque** (display) + **Hanken Grotesk** (body) + **JetBrains Mono** (terminal/labels only). Inter is retired (banned reflex font).
  - **Reference:** the Climb's paper aesthetic is the "not AI slop" north star. `index.html` is the reference de-slop implementation; Story/Work/Résumé roll onto this system next. Full rubric: vibeco `SKILL_IMPECCABLE.md` + `SKILL_CRITIQUE.md`. Anti-pattern: anything that reads "a model generated this."
- The LLM terminal backend lives in the vibeco Supabase project (its `_shared/llm-client.ts` conventions apply).

## Operating Preferences

- **Merging**: Bill authorized auto-merging Claude-authored roadmap PRs once they're mergeable and CI is green (decided 2026-06-13). Pause and ask before merges that are risky, irreversible, or outside the agreed scope.

## Working With Bill

Bill answers interviews via voice-memo transcripts and bullet dumps; sessions do the structuring. When facts conflict across repos/docs, the ledger wins — flag conflicts, don't silently pick. Sensitive territory (The Long Walk / health) is handled at whatever publicity level Bill sets; default to discoverable-not-headline.
