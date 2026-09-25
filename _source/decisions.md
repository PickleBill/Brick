# _source/decisions.md — decision log

> One row per decision. Phase 0 seeds the **open** queue from the conflicts surfaced in
> `_source/facts.md`. Nothing here is acted on a surface until Bill signs off (Rule 3 + the
> "do not silently pick" rule). Resolved decisions move to the bottom with a date.

## ⏳ Open — Sept 2026 overhaul (blocking; details + recommendations in `_source/overhaul-2026-09.md` §3 and §5)
> Source of the conflicts: Bill's Sep 21 résumé (snapshot `_source/resume-2026-09-21.md`) vs this ledger.
> Nothing below touches a surface until Bill signs off.

| # | Item | Ledger today | Sep 21 résumé |
|---|------|--------------|---------------|
| F-1 | Google teams + sign-off | VP-level · 5–6 teams | five teams, no VP |
| F-2 | Google framing | "closed Google as a partner" | "established a partnership" |
| F-3 | Dreamship dates | CEO 2018–Sep 2023 · Chair Sep 2023–present | CEO 2018–2024 · Chair 2024–2026 |
| F-4 | Courtana dates + status | 2023–present · "live" | 2024–2026 · courtana.com down |
| F-5 | IBM title | Watson Analytics & Netezza Brand Specialist | Watson Foundations Account Executive |
| F-6 | Northwestern Mutual | $6M+ TCV · 150+ accounts | $8M TCV · 185 accounts (line garbled in Doc) |
| F-7 | $150K · 3 versions · Ukraine & Nigeria | Dreamship | IntroStellar |
| F-8 | Partners named | + Meta, Adobe, Microsoft/Bing | Google, Stripe, PayPal, Payoneer only |
| F-9 | Site numbers absent from résumé | 11x, GMV, units, CAGR, EBITDA, $2.2M, 40+ apps | none |
| F-10 | Pledge 1% | — | ~1,200 → 2,100+ orgs |
| F-11 | New facts to add | — | Stripe detail · GearLaunch 13 · Freedom United board · "TopGolf meets Pickleball" · Vietnamese merchant market |
| O-1 | Hero card photos | 6, auto-rotate | rec: 3 (builder · father · pay it forward), no auto-rotate |
| O-2 | Résumé page look + nav | footer-only, `resume-v2.html` | rec: new `resume/` paper sheet, Résumé in top nav |
| O-3 | Home declutter | 7 sections | rec: fold constellation into Google; drop inline email form |
| O-4 | Privacy | whole repo published by Pages | rec: stop publishing working docs; scrub private raise figure |

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
