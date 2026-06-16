---
description: Run the multi-lens design/copy/UX/ICP critique on the vSales site and produce a ranked P0–P3 improvement game plan.
---

Run the vSales improvement loop on the sales-first site. Target: `sales/index.html` (Dossier, primary) + `sales/climb.html`; design system `sales/ai-forward.css`; engine `sales/ai-forward.js`. Argument (optional page/URL/focus): $ARGUMENTS

Steps:
1. **Screenshots.** If Playwright Chromium is available, screenshot the live preview at desktop 1440×900, tablet 820, mobile 390×844, and the 760 & 900 breakpoints, full-page, into `/tmp/shots/`. Use the current branch's SHA-pinned raw.githack URL. If the browser can't launch, note it and proceed with a source-only review (or ask the user for screenshots).
2. **Fan out 4 critics IN PARALLEL** (one message, four Agent calls): `design-critic` (also reads `/tmp/shots/*.png`), `copy-editor`, `ux-flow`, `persona-panel`. Each returns ranked, file-mapped findings.
3. **Synthesize** into one deduped, ranked **P0–P3 game plan** — each item: P-level · file:line · the specific change · which lens flagged it. P0 = clearly-safe polish; P1 = structural/copy; P2 = nice-to-have; P3 = optional.
4. **Record** the plan to `handoffs/vSales-review-<date>.md` and surface a tight summary in chat.
5. **Apply only the safe P0 items** on the working branch. Guardrails: `content/FACTS.md` is binding (no invented numbers; no phone / $350K / "11+ sports" / "sub-one-year-old"; $45M+ ad spend ≠ $35M+ revenue); re-grep banned terms; `node --check sales/ai-forward.js`; verify `<div>` balance; re-screenshot to confirm. Hold P1+ for the user. Push and hand back a SHA-pinned raw.githack preview link.

Use `/loop 30m /review-site` to run this on a recurring interval.
