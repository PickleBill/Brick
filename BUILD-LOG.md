# BUILD LOG — v2 site (2026-06-15)

Overnight v2 build of Bill's site from the freshly-exported **Claude Design** bundle, implemented as production static HTML/CSS/JS on GitHub Pages. Win test for every choice: _would a frontier-lab hiring manager screenshot it and forward it?_

## What shipped
| Surface | File | Notes |
|---|---|---|
| **Home / bricker-os** | `index.html` (+ `home.js`) | Dark glass operator. Flip identity card, self-booting live terminal (+ chips + free-text Q&A wired to the `ask-bill` endpoint with a local fact-ledger fallback), alternating editorial proof rows, VibeCo engine, Pickle DaaS tech proof, Climb teaser, contact. |
| **The Climb** | `climb.html` | Warm field-paper career map. Desktop horizontal trail (SVG drawn through the seals) + mobile vertical stepped climb (same data → two layouts), field-note modal with begin-the-ascent tour, prev/next, Esc. |
| Terminal | `work.html` | Retained — already on-system; now linked from Home's interface section. |
| Résumé | `resume-v2.html` / `resume.html` | Retained — already on-system. |

## Architecture decision
The design prototypes are **vanilla HTML/CSS/JS**; the only React was the in-prototype "Tweaks" panel, which the handoff says to drop. So this is a faithful adaptation, not a rewrite: stripped the React/Babel/Tweaks scaffolding + Claude-Design bundler artifacts (`__bundler_thumbnail`, `data-screen-label`, baked inline `font-family`), kept the inline vanilla scripts, moved Home's behavior to `home.js`, wired nav to real routes, reconciled copy to `content/FACTS.md`. Pixel fidelity preserved; repo's "plain static site, no framework" convention honored.

## §4.4 finishing pass (applied to Home)
1. **Captions are copy, not dev-notes** — removed the leaked placeholder portrait graphic (it literally read "replace assets/portrait.jpg"); see Portrait below.
2. **Editorial cadence locked** — Courtana → Dreamship → Pickle DaaS now alternate sides L / R / L with one shared grammar.
3. **Held the gradient** — the green→cyan→violet→coral spectrum is now used for **exactly one phrase**: the hero thesis verb "vibe pusher." (Demoted §01 "Prompt it." to mint.)

## Ledger corrections (FACTS.md wins)
- **Pickle DaaS clips:** design said "20K+ clips analyzed" (conflated). Corrected everywhere to the ledger-precise pair — **21K+ processed · 4,097 analyzed · $0.0054/clip**.
- **Dreamship profitability:** softened "profitable every year" → "**profitable at step-back, and every year since**" (the ledger's public-confirmed phrasing; resolves the ⚠️ "4 of 8 years" EBITDA conflict without overclaiming).
- "Closed Google as a **partner**" preserved everywhere — never "sold."

## Portrait (Bill's #1 open item)
The bundle's `assets/portrait.jpg` was a **placeholder** with a baked-in dev-note ("replace assets/portrait.jpg · 16:10") — and was actually PNG bytes mislabeled `.jpg`. Removed it. The flip-card **front** now shows a clean, intentional branded identity panel; the **back** uses Bill's real family photo (`portrait-2.png`, which is genuine). To add a real solo portrait: drop a 4:5 image at `assets/portrait.png` and restore the `<img>` per the comment seam in `index.html`. The OG share card (`og-card.png`) is real and ships as-is.

## QA (headless Chromium, verified)
- ✅ Home terminal self-boots on scroll, runs chips + free-text (`companies`, `google-deal`), input appears, flip card flips to operator profile w/ animated bars.
- ✅ Climb modal: begin-the-ascent tour (1/16), seal-click (Dreamship → dreamship.com), prev/next, Esc-to-close.
- ✅ Responsive: at 390px the desktop map hides and the 16-card mobile climb shows.
- ✅ All asset refs + internal links resolve; JS syntax clean; no leftover prototype artifacts/placeholder strings; `prefers-reduced-motion` honored throughout.

## ⚠️ For Bill to confirm (surfaced on public pages, per the ledger's ⚠️ tags)
These are live on the site as easy-to-edit constants. Confirm or correct:
- **Courtana:** 36 courts live/piloting · 11+ sports · [private] raised · 44-court LOI — all still current / public-safe?
- **Dreamship:** $35M+ revenue · 11x (which year/base) · ~$85M GMV · 2.3M+ units · $2.2M raised · "5–6 internal Google teams" · 8-figure channel run 5+ yrs — public-safe?
- **Earlier:** NWM top-10 / $6M+ TCV / 150+ accounts · IBM 8-figure McKesson / >100% quota.
- **Personal:** phone `908·601·8152` (site-public vs card-only?) · "father of three" framing · keep the name "The Long Walk"? · the DJ Billygoat story.
- **Highest-leverage gaps (gate conversion more than any pixel):** a real solo portrait · a 60–90s Loom · one named reference/quote · custom domain (billbricker.com).

## Guardrails honored
Built on branch (no force to anyone else's) · draft PR for review · `career-os/` kept off this branch and off `main` · no outward actions · no DNS/billing/auth/infra changes · nothing invented; ⚠️ items collected above.
