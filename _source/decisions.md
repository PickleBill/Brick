# _source/decisions.md — decision log

> One row per decision. Phase 0 seeds the **open** queue from the conflicts surfaced in
> `_source/facts.md`. Nothing here is acted on a surface until Bill signs off (Rule 3 + the
> "do not silently pick" rule). Resolved decisions move to the bottom with a date.

## ⏳ Open — need Bill's call before any publish
| # | Decision | Options (recommendation **bold**) | Notes |
|---|----------|-----------------------------------|-------|
| C-1 | Google internal teams + sign-off level | **five teams · VP-level** / 5–6 teams · director-level | A = the corrected ledger Bill attached; B = what every live surface ships today. Changes `sales/index.html:225` + `sales/ai-forward.js:126`. |
| C-2 | Northwestern Mutual TCV | **$8M+** / $6M+ / omit the $ | A = corrected ledger; B = "locked" in `content/FACTS.md` + builder card. Front door currently omits it. |
| C-3 | Google channel magnitude — lock ONE phrasing | **$45M+ ad spend** / "eight-figure ad-spend channel" | $45M+ already ships on the front door; "8-fig" lingers on builder/v3. Pick one, use verbatim. |
| C-4 | Canonical résumé PDF | **supply `Bill_Bricker_Resume_vFinal.pdf`** / designate `Bill_Bricker_Resume.pdf` as canonical | No `…_vFinal.pdf` exists in the repo yet. All résumé links should resolve to one file. |
| D-0 | Two ledgers | **`_source/facts.md` canonical; redirect/retire `content/FACTS.md`** / keep both | Avoids a second source of truth. CLAUDE.md still names `content/FACTS.md`; updated note added. |
| D-1 | Directly-sent résumé contact | site = `bricker3@gmail.com`; résumé = ? | Sales résumé PDF currently uses `bill@courtana.com`. Confirm one per surface. |

## ✅ Resolved
| # | Decision | Outcome | Date |
|---|----------|---------|------|
| D-V | Visual verification (Rule 4) | Playwright screenshot script at `tools/shoot.mjs` (desktop 1440 + 1280, mobile 375) renders local HTML to PNG before every "done." | 2026-06-17 |
