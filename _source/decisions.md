# _source/decisions.md — decision log

> One row per decision. Phase 0 seeds the **open** queue from the conflicts surfaced in
> `_source/facts.md`. Nothing here is acted on a surface until Bill signs off (Rule 3 + the
> "do not silently pick" rule). Resolved decisions move to the bottom with a date.

## ⏳ Open — after the Sept 2026 overhaul (Bill's call; none blocks the merge)
| # | Item | Notes |
|---|------|-------|
| P-1 | Public repo | Pages no longer publishes `_source/`, but the GitHub repo is public, so the working notes (framing rules, upgrades) are readable. Options: move `_source/` + `handoffs/` to a private repo, or make Brick private (Pages on a private repo needs a paid plan). |
| P-2 | Old résumé PDFs | ✅ Partly resolved 2026-09-25 (F-12 made them state a wrong number: $35M+): kept in the repo as history (O-5) but **no longer published** by Pages (excluded in `pages.yml`), so old links 404 instead of serving $35M+ / VP-level. Bill can still choose to redirect or delete. |
| P-3 | ask-bill backend | The vibeco Supabase function returns HTTP 500 ("AI service error") on every request; the terminal falls back to its local answers. Fix lives in the vibeco repo (provider key / quota), outside this repo. |
| P-4 | Optional copy (red-team suggestions, not applied) | Hero eyebrow → "AI-Forward Sales & Partnerships Leader"; hero CTA → "Prompt my résumé ↓"; drop the Story card's three principles and the contact sub-line as repeats. |
| P-5 | Venue Connect screenshot | Shows "Courtana Connect · Live partnership portal · 16 courts" (image, not copy). Keep, or swap for a neutral shot under F-4. |

## ⏳ Open — minor / story-level (not blocking the front door)
| # | Item | Notes |
|---|------|-------|
| S-1 | "The Long Walk" — keep the name or rename | Present-tense "figuring-out-what's-next" chapter; Bill to decide if it stays a named pin. |
| S-2 | DJ Billygoat — the story | Easter egg; needs the actual anecdote for the terminal `billygoat` answer. |

## ✅ Resolved
| # | Decision | Outcome | Date |
|---|----------|---------|------|
| C-1 | Google teams + sign-off | **5–6 internal teams · VP-level** per vFinal (quiz said "five"; using the résumé so the page matches the downloadable doc). VP overturns old "director-level". | 2026-06-17 |
| C-2 | Northwestern Mutual TCV | **$6M+** per vFinal (quiz said $8M+; using the résumé), always paired with "top-10 nationally". Builder card `index.html:490` already $6M+. | 2026-06-17 |
| C-3 | Google channel magnitude | **$45M+ ad spend** as the one verbatim phrasing; "8-fig" on builder/v3 = the McKesson enterprise deal, not the channel — retire it there. | 2026-06-17 |
| C-4 | Canonical résumé PDF | **`assets/Bill_Bricker_Resume_vFinal.pdf`** — in the repo (Bill-supplied, "safe for source truth"); all résumé links repoint to it in the build. | 2026-06-17 |
| D-0 | Two ledgers | **`_source/facts.md` is canonical**; retire/redirect `content/FACTS.md`. | 2026-06-17 |
| D-1 | Public contact | **`bricker3@gmail.com`** everywhere — vFinal résumé uses gmail (not `bill@courtana.com`). | 2026-06-17 |
| D-2 | IBM quota phrasing | **"achieved quota"** — vFinal uses it; drop ">100%". | 2026-06-17 |
| D-V | Visual verification (Rule 4) | Playwright screenshot script at `tools/shoot.mjs` (desktop 1440 + laptop 1280 + mobile 375) renders local HTML to PNG before every "done." | 2026-06-17 |
| D-3 | `/impeccable` in the loop | `/impeccable` (layout·typeset·clarify·distill·overdrive·critique·audit·polish·detect) + `/review-site` are a **standing, iterative** build step, not one-time polish — mapped to build moments in `_source/spec.md` "Design loop". | 2026-06-17 |
| D-4 | Facts-ledger framing | Guardrails reframed (Bill): **★ north star "tell the best story" promoted to the top**; block split into **Tier A integrity-floor** (sacred — false/harmful if broken) vs **Tier B editorial** (Bill's call, meant to flex). Ledger *order* ≠ page order (page order lives in `spec.md`). | 2026-06-17 |
| U-1 | Terminal placement | **Pulled up — right after 01 centerpiece** (brief Q2, signed off). Current `sales/index.html:322` buries it last ("progressive disclosure"); build moves it up. One-block move, trivially reversible; confirm against real pixels in the build. | 2026-06-17 |
| D-5 | Pivot to v4 chassis | `/sales` core architecture judged buggy (spacing/rhythm + janky interactions). **Repurpose the repo-root `index.html` chassis** (terminal-first, scroll-spy, side-by-side companies) with the locked messaging, built **non-destructively at `v4/`** (sales + root untouched). Keep chassis, swap messaging (interview Q3). Graded by `_source/grader.md` (forward-able / rhythm&mobile / alive-not-slop + facts gate). Spec → `_source/spec.md` "v4". | 2026-06-17 |
| D-6 | v4 revision 2 (Bill round-2 feedback) | Declutter floating labels · hero flipped (card L / copy R) with compact flip (Freedom-United check front / family back) + the 4 sales operator bars · ground-up **Google deal card** front-and-center (numbers folded in slim, green stat band absorbed) → terminal · **Builds** = featured + **swipeable rail** (NOT a wheel — my guidance; Bill agreed), companies + apps, coalesces Companies/VibeCo/Pickle-DaaS · fix terminal mobile typing. Order: Hero → Google → Terminal → Builds → Story → Contact. Full spec → `_source/spec.md` "v4 — Revision 2". ⏸ build after sign-off. | 2026-06-17 |
| D-7 | Adobe — partner status | **Promoted cleared-logo → closed partner** at Bill's explicit direction ("super important"). Added to the flywheel partner list in `_source/facts.md`, the HOME "Closed as partners & clients" row (`index.html`, wordmark — no logo asset yet), and the résumé partners strip (`resume-v2.html`). | 2026-06-21 |
| F-1 | Google teams + sign-off | **Five internal teams; "VP-level" retired** from every surface (not on the résumé). Supersedes C-1. | 2026-09-25 |
| F-2 | Google framing | Site keeps **"closed Google as a partner, in year one."** | 2026-09-25 |
| F-3 | Dreamship dates | **CEO 2018–2024 · Board Chair 2024–2026**; Bill is no longer Board Chair. | 2026-09-25 |
| F-4 | Courtana status | **Winding down.** Never "live"/"now"/"currently"; never "shut down". Past tense, what was built; 2024–2026; no courtana.com links; the video is the proof. | 2026-09-25 |
| F-5 | IBM title | **Watson Foundations Account Executive** (Summit program entry as Netezza Brand Specialist). | 2026-09-25 |
| F-6 | Northwestern Mutual | **$8M TCV · 185 accounts · top-10 nationally.** Supersedes C-2. Doc line is garbled; résumé page uses the corrected sentence in `facts.md`. | 2026-09-25 |
| F-7 | $150K · 3 versions · Ukraine & Nigeria | **Dreamship** (the résumé's IntroStellar placement is wrong). | 2026-09-25 |
| F-8 | Partners named | **Keep the full list on the site** (Google, Stripe, PayPal, Payoneer, Meta, Adobe, Microsoft). Résumé page mirrors the résumé. | 2026-09-25 |
| F-9 | Numbers not on the résumé | **11x + 40+ apps** stay on the site and go back on the résumé; GMV · units · CAGR · EBITDA · $2.2M → terminal / PDF only. | 2026-09-25 |
| F-10 | Pledge 1% | **~1,200 → 2,100+ orgs.** | 2026-09-25 |
| F-11 | New facts | Added: Stripe U.S. payments access · GearLaunch team of 13 · Freedom United board 2020–22 · "TopGolf meets Pickleball" · Vietnamese merchant market. | 2026-09-25 |
| O-1 | Hero card | **3 facets:** builder (headshot) · pay it forward (Freedom United check) · father (family). Bill, later the same day: "I liked your idea of the three cards." DJ comes off the card (stays a terminal easter egg); GTM Operator + Community Curator cut. Family copy: **"3× Father · 3× Founder · Guess which matters most."** No auto-rotate. The 6-facet v6.5 is frozen in `archive/2026-09-pre-overhaul/` and shown next to the live card in `playground.html`. | 2026-09-25 |
| O-5 | Keep old versions | **Every major visual change archives the old version with a before/after** (Bill, 2026-09-25). This overhaul: `archive/2026-09-pre-overhaul/` (frozen pages + `screens/*.before.jpg`); after-shots land beside them at ship. | 2026-09-25 |
| F-12 | Dreamship peak revenue | **$26M** everywhere forward-facing (site, terminal, AI corpus, résumé page + PDF, OG card). Bill: "it was actually 26 million in peak revenue, not 35"; an accounting treatment could have shown $35M. Supersedes every `$35M+`. Frozen archive copies keep the old number as history. | 2026-09-25 |
| O-2 | Résumé | New **`resume/`** page (paper-sheet look) + PDF rendered from it; **Résumé in the top nav** on every page; old résumé pages archived behind redirects. | 2026-09-25 |
| O-3 | Home declutter | Fold the logo constellation into the Google section; drop the inline email form; Courtana proof = the video. | 2026-09-25 |
| O-4 | Privacy | Stop publishing working docs via Pages; scrub the private raise figure from repo text (history untouched). | 2026-09-25 |
