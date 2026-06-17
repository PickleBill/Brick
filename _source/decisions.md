# _source/decisions.md — decision log

> One row per decision. Phase 0 seeds the **open** queue from the conflicts surfaced in
> `_source/facts.md`. Nothing here is acted on a surface until Bill signs off (Rule 3 + the
> "do not silently pick" rule). Resolved decisions move to the bottom with a date.

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
