# Session handoff — vSales (2026-06-16)

## Where we are
The sales-first **Dossier** (`sales/index.html`, live at `picklebill.github.io/Brick/sales/`) is working
and mobile-correct on branch `claude/tender-babbage-8yybko` → **draft PR #28**. Awaiting Bill's phone
preview, then merge to `main` (live). Preview:
`raw.githack.com/PickleBill/Brick/<HEAD>/sales/index.html`.

## Hierarchy objectives (Bill's — the north star)
1. **Sales-first.** Lead with the close — Dreamship founder, **closed Google as a partner in year one**
   ($45M+ ad-spend channel), led to **$35M+ peak revenue**. The AI-building (Courtana, 40+ apps, the live
   terminal) is the **support act / exploratory layer**, never the headline.
2. **Dead-simple first view → depth on demand.** Don't front-load everything.
3. **Mobile = desktop.** Same content everywhere, just reflowed. Never `display:none` real content on phones.
4. **Keep the energy.** Spectrum gradient + glass + motion are the brand. The all-muted "de-slop" pass was
   rejected (CLAUDE.md). Reduce *clutter*, not *color*.
5. **End goal: ONE site.** Merge the original root site (`/Brick/#top`) and the Dossier into a single
   sales-first site that reuses the best of both.

## What shipped this session (course-correct)
- **Flip card (final spec):** FRONT = `family.jpg` + caption; the **stat bars + ring stay BELOW the card**
  (always visible). BACK = the identity tagline as **text** ("▸ the operator / Zero-to-one builder /
  Forward-deployed / GTM operator", last line spectrum) with a staggered glow — **not** a photo overlay.
  Card sized down. Auto-flip teaser + sheen/glow from the main branch. Built on the proven `ff61f78`
  flip engine, so it renders correctly on mobile.
- **Mobile↔desktop parity restored:** removed every content `display:none` — nav links shrink (not hide),
  terminal chips wrap, bar values show, the video stat badges (JOOLA / Player DNA / Arc) **reflow stacked
  below the poster**, constellation lines stay. Verified at 390/760/1440 (Playwright).
- **Color restored:** spectrum gradients back on the proof numbers.
- **Impeccable init:** `.impeccable/live/config.json` written; `PRODUCT.md` + `DESIGN.md` present.
- **`consolidation-map.md`:** the main↔sales reuse audit (next-phase backbone).

## What we struggled with (lessons — read before next build)
- **Reuse, don't rebuild.** Rebuilding main's flip card from scratch caused the mobile breakage + drift.
  When main already has a working component, port *its code*, not just its idea.
- **The card took several passes.** Locked now (above). Don't re-litigate it in chat — refine visually.
- **Mobile parity is non-negotiable** and easy to violate with "polish" `display:none`.
- **Don't over-mute.** Generic anti-slop rules lose to the brand's color/motion identity.

## Next build — the exhaustive Impeccable loop (teed up)
Run **after** Bill's Claude Design pass (design direction first, then execute). Sequence on `sales/`:
1. `/impeccable critique sales/index.html` + `/review-site` (4 ICP critics) → P0–P3 backlog.
2. **Copy:** `/impeccable clarify` + the `copy-editor` agent — sharpen headlines/subs, kill redundancy.
   FACTS.md binding (banned: phone, $350K, "11+ sports"; **$45M ad-spend ≠ $35M revenue**).
3. **Structure/type/space:** `/impeccable layout` + `typeset` + `distill`.
4. **Mobile:** `/impeccable adapt` — re-verify parity at 390px.
5. **Signature:** `/impeccable overdrive` on ONE moment (the hero or the constellation), not everything.
6. Slop gate: `/impeccable audit`; then preview → merge.

## Open items
- **Video compression (BLOCKED here — no ffmpeg/image tooling in this env).** `courtana-shot.mp4` is 10.2MB
  (gated to poster-only on mobile), `climb-preview.png` 2.37MB, `family.jpg` 1.24MB. Run in a tooling
  session or locally:
  ```bash
  # video → ~1–2MB, keeps muted loop; then it can autoplay on mobile too
  ffmpeg -i assets/courtana-shot.mp4 -vf "scale=960:-2" -c:v libx264 -crf 30 -preset slow \
    -an -movflags +faststart assets/courtana-shot.mp4.new && mv assets/courtana-shot.mp4{.new,}
  # images
  cwebp -q 80 assets/climb-preview.png -o assets/climb-preview.webp   # or: convert ... -resize 1200x -quality 82
  convert assets/family.jpg -resize 800x -quality 82 assets/family.jpg
  ```
  After compressing the video, re-enable mobile playback (remove the `>=760px` gate in `sales/ai-forward.js`).
- **Merge the two sites** — the consolidation (see `consolidation-map.md`); design merge to happen in
  **Claude Design** (prompt: `handoffs/claude-design-prompt.md`).
