# vSales — Build Log & Versions (2026-06-16)

Finalization run on the sales-first Dossier (`sales/index.html` + `sales/climb.html`),
driven by the **Impeccable** skill (now installed at `.claude/skills/impeccable`) plus the
4-lens ICP critic agents. Branch: `claude/tender-babbage-8yybko` → PR #27 → `main` (live).

## Version progression (commits, oldest → newest)
1. `2f5c457` — flip-card photo-flip v1 + declutter (overlays 5→3, logo micro-labels) + de-conflated hero lede.
2. `3ea96a3` — critic safe pass: static card glow (killed slop sheen), mobile nav fix, hero "Open to…" line, "live"→"recorded" video label, AI bar 72→90, OG/ledger fixes.
3. `1ba67ee` — terminal moved below the proof (progressive disclosure); "10x" trimmed 7→2; FANG-tier dropped; 40+ apps owns its number.
4. `7549b64` + `0b05b1b` — Impeccable skill committed + readiness hook + lockfile.
5. `ff61f78` — 9.8MB Courtana video gated to desktop (phones get the poster).
6. `fe1c895` — **flip card rebuilt** from the root/main identity card (whole-card flip, front portrait / back operator profile = dreamship photo → "Zero-to-one builder · forward-deployed GTM operator" → interactive proof bars, glow + auto-flip teaser) + **partner constellation** (floating logo stars + starfield, replacing the card grid).
7. `ba1f289` — **Impeccable loop 1** (init + critique + polish): `PRODUCT.md`/`DESIGN.md`; fixed flip-back overflow; killed the stat-badge side-stripe; hardened the constellation for mobile; gradient-text 7→2; bars settle (no cycle/teaser race) + bigger tap targets.

## Final state
- **Flip card:** whole-card flip, root-derived elegance at compact sales sizing; back = photo + tagline + 4 interactive bars; glow + 3.2s auto-flip teaser; reduced-motion safe.
- **Constellation:** floating logo "stars" + connective starfield (desktop); clean wrapped logo cluster (mobile, float/lines off).
- **Scan order:** hero → Google deal → constellation → pedigree/climb → AI multiplier → live terminal → contact.
- **Design system:** `PRODUCT.md` + `DESIGN.md` capture tokens, type, motion, the kept brand signatures (spectrum on H1 + contact only) and the reconciled anti-slop guardrails. Feeds Claude Design.
- **Mobile:** every section verified to reflow; heavy video gated; constellation + card hardened.
- **Archive:** `console.html` + `compare.html` → `sales/archive/`.

## Held / decisions for Bill
- **Numbered section eyebrows (01·02·03·04):** kept (part of the "Dossier" identity). Impeccable flags reflexive numbering as a tell — say the word and I'll drop the numbers, keep the text kickers.
- **Proof-number color:** dstats + AI metrics are now solid ink (de-slopped the "hero-metric template"). If it reads too calm, I can return the spectrum gradient to the headline $35M+.
- **Asset re-encode:** `courtana-shot.mp4` (9.8MB) + `climb-preview.png` (2.3MB) still want a real re-encode (no ffmpeg/sharp in this env); mobile is already mitigated.
- **Card bar a11y:** the 4 back-face bars are mouse/tap interactive but not keyboard-focusable; add `tabindex`/`role` if we want full keyboard parity.
- **Flip-back crop:** confirm the landscape stage photo reads well at the 31% crop.

## Re-run anytime
`/impeccable critique sales/index.html` · `/impeccable polish` · `/impeccable animate` · `/review-site` (4 ICP critics) · `/loop 30m /review-site`.
