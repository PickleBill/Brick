# PLAN — v2 site build (bricker-os + The Climb)

_Built through the Impeccable framework. Win test for every choice: **would a frontier-lab hiring manager screenshot it and forward it?**_

## Objective
Recreate Bill Bricker's site at the fidelity of the freshly-exported **Claude Design** bundle, as production static HTML/CSS/JS on GitHub Pages. Two moods, one operator:
- **Home / `index.html`** — dark "glass operator" landing (bricker-os): flip identity card, self-booting live terminal, alternating editorial proof rows, VibeCo engine, Pickle DaaS tech proof, Climb teaser, contact.
- **The Climb / `climb.html`** — warm "field paper" career map: horizontal trail (desktop) / vertical stepped climb (mobile), field-note modal, begin-the-ascent tour. The emotional centerpiece — recreated faithfully, not modernized.

## Surfaces touched
| File | Action |
|------|--------|
| `index.html` | Replace with design v7 (Home), production-cleaned + finishing pass |
| `climb.html` | Replace with design Climb, production-cleaned, nav rewired |
| `home.js` | Home behavior (count-ups, flip, terminal) — from design `v7-app.js`, ledger-corrected |
| `assets/**` | Add missing logos + portraits from the design bundle |
| `work.html` / `resume-v2.html` | Keep (they already match the system) — nav/cross-link consistency only |
| `PLAN.md` / `BUILD-LOG.md` | This plan + decision log + ⚠️ items for Bill |

## Architecture decision
The design prototypes are **vanilla HTML/CSS/JS** — the only React is the disposable in-prototype "Tweaks" panel, which the handoff says to drop. So the build is a faithful adaptation, not a rewrite: strip the React/Babel/tweaks scaffolding + bundler artifacts, keep the inline vanilla scripts, wire nav to real routes, reconcile copy to `content/FACTS.md`, apply the §4.4 finishing pass. This preserves pixel fidelity while meeting the repo's "plain static site, no framework" convention.

## The §4.4 finishing pass (Home)
1. **Captions are copy, not dev-notes** — audit every label/fallback string; replace any leaked spec/placeholder with human voice.
2. **Lock editorial cadence** — Courtana → Dreamship → Pickle DaaS share one grammar (kicker → headline → lede → metrics → link, shot opposite) and **alternate sides** (L / R / L).
3. **Hold the gradient** — the green→cyan→violet→coral spectrum is reserved for **exactly one phrase** (hero "vibe pusher."). Everything else mint or mono. (Demote §01 "Prompt it." to mint.)

## Facts discipline
`content/FACTS.md` is binding. Numbers used as the design intends; ledger-precise corrections applied where the design conflated (e.g. "21K+ processed" vs "4,097 analyzed"). Every ⚠️ value that lands on a public surface is logged in `BUILD-LOG.md` for Bill to confirm. Nothing invented or inflated. "Closed Google as a partner" — never "sold."

## Overdrive — one signature motion per surface, calm elsewhere
- Home: the terminal that **boots itself** (types `whoami`) when scrolled into view; hero spectrum drift.
- Climb: the trail **drawing itself** through the seals; the live summit's halo pulse.
- All decorative motion gated behind `prefers-reduced-motion`; reveal failsafe so nothing sticks at opacity:0; media behind graceful no-file fallbacks.

## Order
1. Tokens + assets (two token sets, don't merge). 2. The Climb (data model → desktop map + mobile list + modal). 3. Home section-by-section. 4. Finishing pass. 5. Audit / Critique / Polish + self-red-team (lab manager, 6-second recruiter, competitor, technical interviewer). 6. Ship draft PR; Bill is the merge gate.

## Guardrails
Versioned/clean output · draft PR · facts binding · publicity tags honored · no `career-os/` on main · no outward actions · no infra/DNS/auth changes.
