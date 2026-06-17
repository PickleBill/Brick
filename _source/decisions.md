# _source/decisions.md — decision log

> One row per decision. Phase 0 seeds the **open** queue from the conflicts surfaced in
> `_source/facts.md`. Nothing here is acted on a surface until Bill signs off (Rule 3 + the
> "do not silently pick" rule). Resolved decisions move to the bottom with a date.

## ⏳ Open — still need Bill's call (lower urgency, not blocking the front door)
| # | Decision | Options (recommendation **bold**) | Notes |
|---|----------|-----------------------------------|-------|
| D-1 | Directly-sent résumé contact | site = `bricker3@gmail.com`; résumé = **gmail** / `bill@courtana.com` | Sales résumé PDF currently uses `bill@courtana.com`. Confirm one per surface. |
| D-2 | IBM quota phrasing | public site = **"achieved quota" + Summit**; résumé = ">100%"? | Reconcile before the résumé PDF ships. |

## ✅ Resolved
| # | Decision | Outcome | Date |
|---|----------|---------|------|
| C-1 | Google teams + sign-off | **five internal teams · VP-level sign-off** (apply to `sales/index.html:225`, `ai-forward.js:126`, `v3`) | 2026-06-17 |
| C-2 | Northwestern Mutual TCV | **$8M+**, always paired with "top-10 nationally" (fix builder card `index.html:490`) | 2026-06-17 |
| C-3 | Google channel magnitude | **$45M+ ad spend** as the one verbatim phrasing; retire "8-fig" on builder/v3 | 2026-06-17 |
| C-4 | Canonical résumé PDF | **`assets/Bill_Bricker_Resume_vFinal.pdf`** — Bill supplying; links bridge on current PDF until it lands, then one swap | 2026-06-17 |
| D-0 | Two ledgers | **`_source/facts.md` is canonical**; retire/redirect `content/FACTS.md` | 2026-06-17 |
| D-V | Visual verification (Rule 4) | Playwright screenshot script at `tools/shoot.mjs` (desktop 1440 + laptop 1280 + mobile 375) renders local HTML to PNG before every "done." | 2026-06-17 |
