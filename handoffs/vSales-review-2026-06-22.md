# Review game plan — one-objective pass on the home front door (2026-06-22)

Four-lens `/review-site` critique (design · copy · ux-flow · persona-panel) of the restructured canonical `index.html`, goal = collapse to ONE objective ("senior warm-intro reader → I want to talk to him → books a call"). Ranked P0–P3; what was applied this pass is marked ✅, deferred ⏸, rejected ❌.

## Applied this pass ✅
- **P0 (design/ux)** One dominant CTA per viewport: contact now has a single `Grab 30 minutes →` pill; demoted `Or email me` to a quiet text link in `.contact-alt`; capture `Send` button restyled subordinate (flat, not pill) and renamed `Send a note →`. `index.html` contact block.
- **P0 (copy/ux)** Primary book buttons now point **directly at Calendly** (`https://calendly.com/bricker3-idwj/30min`) as the static href (robust without JS); `site-config.js` still confirms/overrides. Hero + contact.
- **P0 (design)** Capture form centered (`margin:auto; justify-content:center`); `.contact-alt` contrast bumped `--faint → --mute` (AA); input padding → 44px tap target.
- **P0 (ux)** Terminal `contact` command now leads with the Calendly booking line (was email/LinkedIn only). `home.js:245`.
- **P0/P1 (ux)** Subpage funnel fixed: `climb.html` + `work.html` nav CTA changed from `Résumé` → `Let's talk →` (`index.html#contact`), so deep readers keep the booking path.
- **P1 (ux)** Scroll-spy gains a `06 · Talk` entry pointing at `#contact`.
- **P1 (copy/persona)** Reframed "Currently … looking for a seat" → "Open to the right GTM or partnerships role — where the hard deals decide the company" (peer/selective posture). Simplified contact lede to "Hiring for GTM or partnerships?". Tightened hero lede ("the AI behind the selling"). Flywheel "Every name below came easier" → "The rest followed."

## Rejected ❌ (with reason)
- **Persona P0 "VP-level → director-level":** FALSE ALARM. The agent read the stale `content/FACTS.md`; the governing ledger `_source/facts.md` (LAW, supersedes it) states *"VP-level overturns old 'director-level'."* VP-level is correct and stays. → **Action item:** reconcile/retire the stale `content/FACTS.md` so this doesn't recur.
- **ux/persona "remove playground footer link":** Bill explicitly requested the quiet playground link last session. Kept.

## Deferred ⏸ (Bill's call — voice/structure/judgment)
- Surface the role/ask in the hero (persona P1) — bigger positioning change.
- Disambiguate the partner constellation "which logos are personal closes vs enterprise accounts I sold into" (persona P1) — needs care + facts.
- Gate/soften the wildcard terminal chips ("dj billygoat", "surprise me") for senior readers (persona P2) — but DESIGN.md says keep personality; Bill's call.
- Reduce "solo" repetition (persona P3); add a "product UI" label on the Courtana stat badges (persona P3).
- Reconcile résumé destinations (resume-v2.html HTML page vs vFinal.pdf) (ux P2).
- Add a mid-page "impressed? grab 30 min" nudge after the builds cards to stop attention leaking to external sites (ux P1) — optional.

## Notes
- Plausible tagged-event classes (`plausible-event-name=Book/Email/Resume`) are valid; they simply won't fire until `plausibleDomain` is set in `site-config.js`.
- Separately fixed binding FACTS violations on `resume.html` found during the sweep: removed phone, `$350K`; "cumulative"→"peak" revenue; "sub-one-year-old"/"<1-year-old"→"in year one"; "director+"→"VP-level".
