# Site v2 — Climb rework + Home preview (new files, originals intact)

New files this round (old ones untouched): **`climb-v2.html`**, **`index-v2.html`**, plus a GIF slot (`assets/climb-preview.gif`, optional).

## ⚠️ Design-file access note (read this)
I could **not** fetch the three design links you sent — the `api.anthropic.com/v1/design/h/…` handoff returned 404 to an unauthenticated request, and the two `claude.ai/design/p/…` links are 403 (auth-gated). WebFetch can't send credentials, and I'm (correctly) blocked from scanning the environment for an API key. **So everything below is built to the *intent* you described + the current `content.json` + the overnight critique — not pixel-matched to your design files.** To get an exact match, do one of: (a) paste the file contents into the thread, (b) make the handoff a shareable/public link, or (c) wire the **Design→Code watcher** I scaffolded (`career-os/AI-OPS/design-to-code/`) — that's exactly the `api.anthropic.com/v1/design` handoff flow, with your key.

## `climb-v2.html` — the Climb, reworked
- **Two views with a persistent toggle** (segmented control, top of page):
  - **Timeline** — compact single-rail vertical list. Default on mobile (≤760px). This is the "renders as a timeline" format you liked; it's inherently **overlap-free** because everything is one column.
  - **Trail** — spacious view with a **self-drawing ascent spine** (SVG `stroke-dashoffset`, one signature motion). Default on desktop. Also single-column → no overlapping text.
  - Choice persists via `localStorage` (`climbView`).
- **Fixes the overlapping-text problem** by abandoning the fixed 1640px absolute-positioned canvas for responsive vertical layouts. Nothing can collide.
- **Content** is the same 13 nodes from `source/content.json`, rendered from one inline `NODES[]` array (so both views stay in sync; edit once).
- **Field notes**: marquee nodes (Dreamship/Google, The Long Walk, Manifesto, IBM) have an expandable "field note +" with the real story-bank copy — progressive disclosure, not a wall.
- **Paper aesthetic kept** (Spectral / Caveat / JetBrains Mono; cream + sienna/ochre/moss) so it still feels like the Climb — just cleaner.
- **Accessible motion**: full `prefers-reduced-motion` handling (spine draws instantly, reveals off); reveal-on-scroll with a 2.5s failsafe so nothing stays hidden.

## `index-v2.html` — Home with a Climb preview module + modal
- Replaced the flat "Twenty years, one climb" teaser with a **glass preview module**: copy + CTAs on the left, an **animated mini-timeline** on the right (gradient line + milestone dots, labeled 2006 · Google deal · now) that entices the click.
- Clicking the card (or "Preview ▸") opens a **modal** with a 5-stop mini-timeline of the marquee milestones and a **"Walk the full climb →"** CTA. Closes on ✕, overlay click, or Esc; `aria-modal` dialog.
- **Animated-GIF slot**: the modal shows `assets/climb-preview.gif` if you drop one in (a 3–5s screen-capture of the Climb scrolling would be perfect — or a Loom). If the file's absent, it gracefully hides and the CSS timeline carries it.
- All Climb links on this page point to `climb-v2.html`; everything else is the already-improved Home from PR #14.

## What I'd do next to make it `/impeccable` (suggestions)
1. **One signature, the rest calm** — the spine-draw (Trail) and the mini-timeline (Home) are the two signature moments; I kept everything else still. Resist adding more motion (the de-slop lesson cuts both ways).
2. **Add a real Loom/GIF** to the modal — a moving preview converts far better than a static one (collateral research).
3. **Anchor each Climb node to its proof** — e.g., Dreamship → the Google case study, Pickle DaaS → the dashboards (links are in; consider a "read the deal" expansion for the Google node).
4. **Portrait + one named reference** on Home (still the highest-ROI adds — OPEN-QUESTIONS P0).
5. **Promote the terminal** — it's the true signature of the whole site; consider an inline prompt teaser on Home that deep-links into `work.html`.
6. **Mobile pass**: verify the toggle hint + segmented control fit a 390px viewport without wrapping awkwardly; the timeline itself is safe.

## On your v7.html working index — my advice
**Do it here, in one pass, rather than a separate thread** — with one caveat. Reasons: (a) this thread already holds the full picture (the FACTS ledger, the positioning, the v2 Home/Climb, the design language), so changes stay coherent and I won't re-derive context; (b) splitting Home work across two threads is how you get drift between `index.html`, `index-v2.html`, and `v7.html` — three homes is exactly the convergence problem the HANDOFF warned about. **Caveat:** I can't see `v7.html` (same 403), so to merge its good parts I need you to paste it (or the specific sections you like). Send it and I'll reconcile v7 + index-v2 into a single chosen Home in this thread. If you'd rather keep momentum in your own design loop, that's fine too — just pick **one** canonical Home file and delete the others so they don't diverge.

## Versioning / safety
Originals (`index.html`, `climb.html`) are untouched. New files are additive and not yet linked from the live nav of the *old* pages, so nothing changes on the deployed site until you choose to promote v2. Same draft PR (#14) — still **do not merge** until the `career-os/` privacy question is resolved.
