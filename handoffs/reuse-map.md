# Reuse Map — root (main) ↔ /sales/ ↔ pickle-daas-data

Operating principle (Bill, 2026-06-16): **reuse, don't rebuild.** The eventual merge-into-`main`
consolidates the best of both sites; this maps what already exists so we never duplicate work.
Ask Bill for new assets only when nothing here fits.

## Assets (`Brick/assets/` — committed; `/sales/` reaches them via `../assets/`)
- **Photos:** `family.jpg` (portrait → flip front), `dreamship-donate.jpg` (Freedom United stage →
  flip back), `family-ski.jpg`, `portrait-sales.jpg`, `portrait-2.png`, `design-refs/assets/portrait.jpg`
- **Logos (constellation-ready):** `google, microsoft, meta, stripe, paypal, payoneer, macys, zillow`
  (svg); `ibm, nwm, unc, wibidata, introstellar, gearlaunch, groupordare, pledge1, dreamship,
  courtana` (png/jpeg). The `/sales/` ecosystem currently renders **text wordmarks** for
  IBM/McKesson/Avalara/Nordstrom — `ibm.png` exists and could replace the IBM wordmark; the other
  three have no logo file.
- **Product shots (the "builds" / exploratory layer):** `shots/{dreamship,courtana,vibeco,
  brand-intelligence,naughtydata,litigator,venue-connect,layuplab,freakshow}.png`
- **Video / heavy:** `courtana-shot.mp4` (9.8MB — compress), `climb-preview.png` (2.3MB — optimize)
- **Docs:** `Bill_Bricker_Resume.pdf`, `og-card.png`

## Components worth porting between surfaces
- **Flip card flip+glow mechanics** — root `index.html` (whole-card flip, front+back faces). `/sales/`
  now matches (two photos + static glow).
- **Right-side scroll-spy nav** — root `index.html:415-422` + `home.js:303-309` (6-section tracker).
  Candidate to port into `/sales/` (deferred roadmap item).
- **Résumé V2** — root `resume-v2.html` (PDF export at `:121-160`). Candidate sales-aligned résumé
  surface (deferred).
- **Climb timeline + modals** — shared between root and `sales/climb.html` (sales version is active).
- **Live terminal (`ask-bill`)** — identical backend on both; endpoint
  `https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill`, corpus fetched from Brick
  GitHub Pages `content/index.json`. No duplication needed.

## Content (single source of truth — never hardcode a fact)
- `content/FACTS.md` (binding ledger), `content/stories/*`, `content/index.json` (ask-bill corpus
  manifest). Both sites + the terminal render from these.

## pickle-daas-data (sibling repo)
- Live dashboards linked from `/sales/` (e.g. `investor-walkthrough-v4.html`); Courtana CDN video +
  proof visuals live here — pull from here rather than re-generating.

## Already-present, relevant handoff docs
- `handoffs/CLAUDE-DESIGN-BRIEF.md` — the design-system brief to feed **Claude Design** (the canvas
  product that can't run `/impeccable`, but consumes a design system).
- `handoffs/vSales-review-2026-06-16.md` — the running multi-lens review + game plan.
