# Media / Asset Index

What exists, what's missing, where it lives. Drives the collateral build order.

## Exists (in Brick repo)
- `assets/og-card.png` (1200×630 share card) — wired into pages.
- `assets/logos/` — courtana, dreamship, ibm, pledge1.
- `assets/shots/` — brand-intelligence, courtana, dreamship, litigator, naughtydata, venue-connect, vibeco.
- Live surfaces: Home, Climb (`climb.html`), Terminal (`work.html`), Résumé (`resume-v2.html` + minimal `resume.html`).
- Pickle DaaS dashboards (live on pickle-daas-data Pages): investor-walkthrough-v4, brand-intelligence-v4, showcase-portal-v4.
- VibeCo live app (vibeco.lovable.app) + featured builds (Venue Connect, NaughtyData, Litigator, +30).

## Missing — highest leverage first (all need Bill)
1. **Portrait** at `assets/portrait.jpg` (16:10) — slot wired; placeholder showing. **P0.**
2. **Custom domain** (billbricker.com) — not an asset but the #1 signal gap. **P0.**
3. **One named reference/quote** — a glass testimonial card. **P0.**
4. **60–90s Loom** walking the dashboard/terminal. **P1.**
5. **Two-page PDF résumé** (the v4 "Direct Send" PDF exists in Bill's files — get it into the repo as a downloadable + linked from resume-v2.html). **P1.**
6. **Deal-sheet one-pager** (assemble from deal-case-studies.md). **P1.**

## Notes
- Build screenshots are committed PNGs (good — no flaky external deps).
- Pickle DaaS imagery falls back to a live CDN URL if the local PNG 404s — fine, but prefer committed assets.
- For the résumé PDF: the extracted text is captured in resume-upgrade.md; the actual PDF file should be added by Bill (or exported from resume-v2.html).
