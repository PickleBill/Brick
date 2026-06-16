# vSales — Multi-Lens Review & Game Plan (2026-06-16)

Ran the `/review-site` engine on the Dossier build (`sales/index.html` + `sales/climb.html`): real desktop/mobile/breakpoint screenshots via Playwright, then four parallel critics — **design**, **copy**, **ux-flow**, **persona-panel (ICP)**. Win test: *would a frontier-lab GTM hiring manager screenshot the fold and forward it?*

**Headline finding (all four lenses):** on mobile the fold was the dim portrait + ring + bars; the value prop sat below it. Fixed. Second theme: **repetition** — "$35M+/$45M+", "made the company", "biggest names in tech", "10x the work/selling" recurred 3–5× — tightened so each beat is told once.

## P0 — applied this pass (safe polish)
- [x] **Mobile fold now leads with the headline** — `index.html` hero `@media(max-width:900px)`: `.hcopy{order:-1}`, card shrunk to 268px and centered. (design + persona)
- [x] **Headline balanced, orphan removed** — dropped the hard `<br>`, `text-wrap:balance`, font max 58→52. (design)
- [x] **Pickle DaaS clip math fixed** — `21K+ processed · 4,097 deep-analyzed · $0.0054 per analyzed clip` on index **and** console (was "21K processed / $0.0054 per clip", implying the wrong product). (persona/technical)
- [x] **Removed the false-"live" badge** ("IN THE ROOM" pulse) from the static hero photo. (persona)
- [x] **Copy de-dup** — tightened hero lede (ledger term "$35M+ peak revenue", "10x my output"), trimmed `whoami`, varied the Dreamship terminal header and §02 sub ("FANG-tier partners"), demoted "40+ apps" to a leverage footnote. (copy + persona)
- [x] **Climb "$45M+ ≠ revenue" guard** added where it sat next to "$35M+ peak revenue". (copy/ledger)
- [x] **Flywheel grid → full rows** (3-up / 2-up / 1-up) — no more orphaned Microsoft card at 760–900. (design)
- [x] **Keyboard `:focus-visible` rings** added globally (`ai-forward.css`). (ux/a11y)
- [x] **Console dead `#center` anchor** fixed. (ux)
- [x] **Video: hide overlay badges < 560px; pause autoplay under reduced-motion.** (design/ux)

## P1 — needs Bill's call (held)
1. **Hero photo.** The current `portrait-sales.jpg` reads as a dim DJ-booth shot — wrong face for a sales-first hero, and no clean headshot exists in the repo (the alternates are family photos). **Drop a clean professional headshot** → I wire it as the flip front. *Highest-impact single fix.*
2. **Hero density.** The operator card stacks a flip photo + a progress ring (20) + four mini bar-charts — reads slightly "dashboard." Recommend **keep the 4 bars, drop the ring** (move "20 years selling" to a one-liner above).
3. **Lead with leverage, not volume.** Across hero bar / §04 / climb, "40+ apps · 31 repos" reads as sprawl to a hiring manager. Promote "compress weeks of GTM into days / output of ten"; keep 40+ as a footnote (partly done in §04 — extend to the hero bar?).
4. **CTA hierarchy.** One primary action per screen; make Résumé/Email unmistakably primary in the closing block; consider an explicit "open to…" role line in the fold.
5. **Climb desktop a11y.** Map seals are mouse-only — make nodes keyboard-operable (`tabindex`/`role`/Enter) + `aria-label`. (Touches climb JS.)
6. **Terminal first paint.** Seed a dim "// booting bricker.os…" + visible prompt so it doesn't read as an empty black box before scroll-boot.

## P2 / P3 — backlog
- Climb summit motion budget (drop the `vibe` jitter, lower sunburst opacity); mobile founder-chapter emphasis.
- Kill the nav-brand blinking cursor (competes with the real terminal cursor).
- Optimize `climb-preview.png` (2.3MB → ~200KB); the 9.8MB hero clip is heavy.
- Brand-mark consistency (climb 🥒 emoji vs `● bill.bricker` wordmark).
- Standardize the "10x my output" object everywhere; trim "ask" 3× in the terminal section.

## The engine (now reusable)
- `.claude/agents/{design-critic,copy-editor,ux-flow,persona-panel}.md` + `.claude/commands/review-site.md`. Re-run anytime with **`/review-site`**, or continuously with **`/loop 30m /review-site`**. Screenshots land in `/tmp/shots/` (Playwright Chromium installed at `/opt/pw-browsers`).
