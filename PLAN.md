# PLAN — The Improvement Engine · Session 1

> Working plan for the "make the portfolio world-class + build a reusable improvement engine" session.
> Started 2026-06-13. Branch: `claude/brick-portfolio-job-hunt-66eel3`.

## What Bill decided (Phase-0 interview)

- **Timeline:** ramping up over 1–3 months → build it *world-class*, not panic-polish.
- **Audience:** frontier-lab GTM/partnerships **primary**; founder + advisory as secondary doors.
- **Lead with:** the **website** (the hub everything links to).
- **Design risk:** **bold / orthogonal creative reworks of the hero** — explicitly *not* a safe polish pass. Propose multiple directions.

## Still owed by Bill (non-blocking)

- 🎯 Target companies/people list (seeds Track-B map + sharpens hero claim)
- 📋 Last session's QA findings (PASTE-SLOT A)
- 📋 The ChatGPT critique (PASTE-SLOT B)
- Portrait at `assets/portrait.jpg`; go/no-go on `billbricker.com`

## The diagnosis (hero)

Current `index.html` hero leads with vibes — *"Frontier tech evangelist, vibe pusher, 0→1 builder"* / eyebrow *"fka DJ Billygoat."* The hardest, most forwardable, most falsifiable claim — **closed Google as a partner as a sub-1-year-old startup** — is buried in the lede. Inherited audience research says: lead above the fold with one specific falsifiable claim. Fix that first; it's the highest-leverage move on the whole site.

## Track A — Website (leading)

1. **Hero reinvention — 3 orthogonal directions** (this pass), as previews under `previews/`:
   - **A · Thesis** — editorial confidence. Big type, the dual claim ("I sell frontier tech. And I build it myself.") substantiated by a falsifiable proof line. Restraint as the antidote to AI-slop.
   - **B · Living OS** — terminal-first. The signature interaction *is* the front door: "Don't read the résumé. Interrogate it." Demonstrates "builds it himself" in the first second.
   - **C · Data room** — proof matrix. Six falsifiable claims, each with evidence, scannable in 6 seconds for a recruiter.
2. Bill picks → converge `index.html` onto it; cascade nav/motion/typography consistency across all four surfaces.
3. Fold in the multi-lens audit (tech/QA, a11y, SEO, perf) + reconcile against Bill's QA findings + ChatGPT critique.
4. Real portrait treatment when the file lands; OG card refresh if the headline claim changes.

## Track B — Résumé + job-hunt (after the hero lands)

- Résumé upgrade (web `resume-v2.html` + print/PDF/ATS export from `content/`).
- LinkedIn pack (headline, About, experience, Featured) aligned to the chosen hero claim.
- Target-company/person map + drafted-not-sent outreach (cold / warm-intro / networking) in Bill's voice.

## Track C — Reusable machinery

- `.claude/agents/` library: `design-critic`, `copy-editor`, `seo-auditor`, `resume-reviewer`, `tech-qa`, `persona-panel`.
- **Improvement Dashboard** — a real HTML/JS mini-app on the site's design system: scores a deliverable across dimensions, lists prioritized P0–P3 issues→fixes, shows before/after.
- **Job-Hunt Tracker** — targets, stage, next action.

## Track D — Codify the engine

- A skill/workflow doc: intake → multi-lens critique (agents + counter-personas) → prioritize (P0–P3) → implement → verify → dashboard. Point-at-anything for the next deliverable.

## Guardrails (binding)

- Facts ledger (`content/FACTS.md`) is binding; never invent numbers/quotes/references; ⚠️ items flagged, not silently picked.
- Draft outreach only — send nothing, contact no one.
- Branch + draft PRs with preview links; never push straight to live.
- Don't regress the settled design direction. Converge, don't sprawl.
