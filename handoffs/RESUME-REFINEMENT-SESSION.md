# Claude Code — interview-driven value-prop + résumé refinement

> Paste into a Claude Code session on the **`picklebill/Brick`** repo (everything lives here — no other repo needed). This is an **iterative, interview-style** session: you ask Bill sharp questions, he answers in bullets / voice-memo style, you implement and ship small. Two intertwined goals — (1) sharpen the site's **value props** so a frontier-lab hiring manager gets it in 6 seconds, and (2) fine-tune the **résumé page** + its PDF download until it's interview-ready. Bill is simultaneously updating his *actual* résumé in an external tool ("co-work") and will drop in copy/assets — reconcile those into the site and keep every surface in sync with the ledger.

## Source of truth — read first, every loop
- **`content/FACTS.md`** — the ledger. Every number/claim on the site must trace here. `⚠️` = unconfirmed (do **not** ship as a headline until Bill signs off); tags `public` / `blur` / `private` are binding. **First interview pass: walk the ⚠️ rows and get Bill to confirm or correct** (e.g. $35M+ revenue, the 11x base/year, 36 courts, $350K raise, $0.0054/clip, the Northwestern Mutual / IBM numbers). Update the ledger, **then** propagate to the surfaces.
- **`content/stories/`** (`the-google-deal.md`, `the-bridge.md`) — narrative source for résumé bullets.
- **`CLAUDE.md`** — guardrails. "Closed Google as a **partner**," never "sold."

## Keep these surfaces in sync (one value-prop change touches all of them)
- **Home pitch** — `index.html`: hero `.lede` (~:433); identity-card stat bars `data-m`/`data-ml` (~:478–494); operating-company ledes (~:594, :608); Pickle-DaaS lede (~:669).
- **Terminal answers** — `home.js`: `whoami` (~:87), `companies` (~:91), `google-deal` (~:95), `builds` (~:106), `why-you` (~:133), `the-fit` (~:141).
- **Résumé** — `resume-v2.html`: hero role (~:148), the 4 Highlights (~:170–173), Experience / 7 roles (~:183–222); plus the minimal/ATS twin `resume.html`.
- **Cross-links** — `climb.html`, `work.html`, `v3/`.
> When a claim changes, **grep it across all of the above and update together** — don't leave the résumé saying one thing and the terminal another.

## The résumé page (the "last page")
- `resume-v2.html` is the **canonical** DreamWork-style résumé, and **the download already works**: `⤓ Save as PDF` → `window.print()` (~:153) with a dedicated `@media print` block (~:121–130) that flattens to clean white/ink. So your job is **fine-tuning, not building** a download. **After every content change, render the print view and check the PDF** — no clipped cards, sane page breaks, contact info intact.
- When Bill drops the **updated résumé from co-work** (paste, file attach, or into `assets/`): pull the strongest, ledger-true bullets into `resume-v2.html` **and** `resume.html`, flag anything not yet in `content/FACTS.md` as `⚠️` for confirmation, and keep the web design system (don't paste a Word look).

## The loop — interview → implement → ship in parallel
1. **Interview in small batches.** Ask 2–4 sharp questions at a time — confirm a ⚠️ fact, or pressure-test a value prop (e.g. *"for a partnerships role at a lab, is 'I translate frontier capability into a signed yes' the sharpest line, or do we lead with the Google partnership?"*). Don't bulk-dump 20 questions.
2. **Implement the smallest coherent change,** sync all surfaces, verify (headless Chromium screenshot of the changed surface **and** the résumé print view; `node --check home.js`).
3. **Ship in parallel.** Commit on a working branch and **open a PR per coherent change**; **auto-merge clean, green ones to production** (Bill authorized auto-merge of clean PRs) and keep anything risky/large as a **draft PR** for his review. Don't block the interview on a deploy — keep moving while Bill keeps feeding refinements.
4. **Track open items** in a short running checklist (confirmed / ⚠️ / shipped) so nothing drifts.

## Guardrails
- Never ship a ⚠️ fact as a headline without Bill confirming it; the ledger wins over any page.
- Don't invent numbers or upgrade a hedge into a claim. When facts conflict across surfaces, **flag it — don't silently pick.**
- Keep the design system (tokens in `CLAUDE.md`); the résumé stays web-native and print-clean.

**Start by** reading `content/FACTS.md` and `resume-v2.html`, then open with your first batch: the top ⚠️ facts to confirm + the single sharpest hero value-prop decision.
