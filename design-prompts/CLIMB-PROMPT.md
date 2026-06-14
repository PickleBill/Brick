# Claude Design prompt — finalize "The Climb" (`climb.html`)

Paste everything below the line into Claude Design to polish the Climb. The goal is concept ③ **"let the Climb breathe"** — keep the magic, cut the chrome. Do **not** redesign it.

---

You are refining the existing **`climb.html`** — a horizontally-scrolling, paper/vellum "field map" of Bill Bricker's 20-year career (2006→2026). Output the **edited single static HTML file**. Preserve everything that makes it special; make only the changes below.

## Preserve (do not touch)
- The **paper aesthetic**: `--paper:#efe3c4`, `--ink:#2b1f10`, `--sienna:#a8421d`, `--ochre`, `--moss`, the vellum noise texture, wax-seal medallions. **Do NOT convert it to the dark theme** — it is intentionally its own world.
- Type system: **Spectral** (serif body), **Caveat** (`--hand`, handwriting), **JetBrains Mono** (labels). 
- The fixed **1640×730px** coordinate canvas, the `fit()` / `center()` scaling for mobile, the JS-drawn SVG trail connecting nodes, all node data, the era/year axis and margin notes.
- All numbers (already correct per the facts ledger): Courtana 36 courts / 11+ sports; Dreamship $35M+ / 11x / **closed Google as a partner** (never "sold"); The Long Walk as a present-tense chapter.

## The brief (concept ③ — drag-only, centered-on-load atlas, no buttons)
1. **Delete all navigation buttons.** Remove the in-card **‹ prev / next ›** arrows and the "Begin the ascent" tour button. Exploration is **drag + scroll + tap a seal** only. Remove the matching JS (`step()`, the tour listener, the Arrow-key handlers — keep `Escape` to close a card) and any now-dead progress text.
2. **Momentum + wheel.** Keep drag-to-pan, but add **inertia** on release (velocity tracked in `pointermove`, a `requestAnimationFrame` decay of ~0.93 on `pointerup`) and map a **vertical mouse wheel to horizontal pan** (`scrollLeft += deltaY`). Cancel momentum on a new `pointerdown`/`wheel`. Skip inertia under `prefers-reduced-motion`.
3. **Glowing summit.** The present-day node (Courtana, the `live` seal at "2026 · now") must read as **the glowing summit** — a soft, breathing halo pulse (layered amber/sienna glow + an expanding ring). Keep the `prefers-reduced-motion` shut-off.
4. **Field-note voice.** Render each card's pull-quote in the **Caveat** hand font (larger, sienna) so it reads like a handwritten field note; keep the body prose in Spectral for legibility. First-person, terse, observational — Bill's voice.

## Optional, if it helps it breathe
- More horizontal air between clustered medallions; a faint "you are here" treatment near the summit; a one-line Caveat margin note per era. Nothing that adds chrome or buttons.

Keep the file self-contained (inline `<style>`/`<script>`), no framework, no build step.
