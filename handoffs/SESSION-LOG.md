# Session Log — Brick résumé & vSales site (2026-06-15 → 06-16)

A readable chronicle of the work across this session: what was asked, what was done, the decisions made, and what's still open. Newest at the bottom. Branch throughout: `claude/kind-brown-gpvua1`.

---

## 1 · Résumé refinement → **PR #24 (merged)**
**Ask:** reconcile two updated co-work résumés (1-page + full) into the site and the facts ledger; get the résumé interview-ready.

**Decisions (Bill):** keep **bricker3@gmail.com**; keep the full Courtana line incl. $350K raised + 44-court LOI; keep **>100% quota + IBM Summit**; EBITDA = **"four years running."**

**Done:** updated `content/FACTS.md` (provenance + cleared ⚠️ rows); rewrote `resume-v2.html` + `resume.html` — new positioning, **Partnerships-closed strip** (Google · Microsoft · Stripe · PayPal · Payoneer · Meta), fixed the stale Board-Chair dates (→ 2018–Sep 2023 CEO; Board Chair 2023–Present), wove in 11x-in-2020 / 323% CAGR / EBITDA-four-years / 21 fulfillment locations / IBM Summit / Courtana 760 users / Mike Olson / Ukraine&Nigeria. Made the **partnerships strip print into the PDF** + tightened page breaks. **Merged to main; live** at `picklebill.github.io/Brick/resume-v2.html`.

## 2 · vSales sales-first site → **PR #25 (draft)**
**Ask (the "Col bill" strategy call):** rebuild as **sales-first** (codename vSales) in `/sales/`, keeping the old site at the repo root. Lead = **AI-Forward Sales & Partnerships Leader**; building is the *multiplier*, not a dev identity. Dreamship/Google centerpiece above Courtana. Nav = Story · Work · Résumé. No phone. Design assets supplied in a zip.

**Decision:** build a new `/sales/` version, don't replace the root.

**Done:** the zip was a full design handoff (`design-refs/`) — used it. Built `sales/index.html` (**Dossier**, primary), `sales/console.html` (Console A/B), `sales/compare.html` (A/B harness), `sales/climb.html` (the Climb with sales-arc copy, visual unchanged), `sales/ai-forward.css` + `sales/ai-forward.js` (live terminal: canned sales commands + free-text → `ask-bill` backend with graceful fallback). Staged `assets/Bill_Bricker_Resume.pdf` + portrait. Updated `content/FACTS.md` with vSales public-site rules: **$45M+ ad spend ≠ $35M+ peak revenue**, "in year one" not "sub-one-year-old", achieved quota + Summit, and **never public**: $350K / "11+ sports" / phone.

## 3 · Dossier rework (Bill picked Dossier)
**Ask:** flip-panel photo from the original build (keep flippable), smaller image; 2-line header moved up; minimize the "closed" strip; tighten the Dreamship deal; move the terminal under the deal with 3 grouped command rows; one-panel Climb section + the zoom-in climb image; the "shot of the day" clip in the AI section; less colorful headers.

**Done:** all of the above — flip card, terminal relocated with 3 rows (the record / hiring me? / wildcards + new `why-you`/`billygoat`/`surprise`), climb-preview image, `courtana-shot.mp4`, spectrum reduced on section headers.

## 4 · Review engine + safe P0 polish
**Ask:** run automated agent-based critiques (design/visual desktop+mobile, copy, UX, audience/ICP); build a game plan; advise on a separate session; use agents/loops/skills.

**Findings:** Impeccable isn't installed; Magic Patterns is wrong-stack — so we **operationalized the persona-review rubric** as committed agents. **Playwright works here** → real desktop+mobile screenshots in-session.

**Built (reusable):** `.claude/agents/{design-critic,copy-editor,ux-flow,persona-panel}.md` + `.claude/commands/review-site.md` → run **`/review-site`** (loop with `/loop 30m /review-site`).

**Applied (safe P0):** mobile fold now leads with the **headline** (was the photo); headline balanced; **Pickle DaaS clip math** corrected (21K processed / 4,097 analyzed / $0.0054 per analyzed clip); removed the fake "live" badge; copy de-dup; climb "$45M ≠ revenue" guard; flywheel full-row grid; global `:focus-visible`; console dead anchor; video mobile/reduced-motion. Game plan recorded in `handoffs/vSales-review-2026-06-16.md`.

## 5 · Final polish + go-live
**Ask:** use the **main-branch flip photos** (family ⇄ give-back), fix hero density + CTA hierarchy, do P2/P3 + another thorough review, port the **better data-warehouse overlays** from main, fix the weird bottom spacing, write this session log, and **get it live in production** (not raw.githack) without replacing main.

**Done:** family flip photo (front) ⇄ Dreamship give-back (back); **dropped the metric ring** for a clean "20 years in enterprise GTM" line + 4 (now varied) bars; added a clickable **"Open to frontier-lab GTM & partnerships leadership →"** availability line; ported the **5 animated stat-badge overlays** onto the video (hidden on mobile for legibility); rebuilt the footer into a links row + normalized contact/footer spacing. Ran a **final design-critic + persona-panel pass** — hiring manager verdict: **"forward it."** Applied their P0s: cut "output of ten", "FANG-tier" → "big-tech", tamed the oversized mint button, fixed the video-label collision, completed reduced-motion coverage, tightened the lede.

**Go-live:** merged `/sales/` to `main` → live at **`picklebill.github.io/Brick/sales/`** (real GitHub Pages, not raw.githack); the **old site stays untouched** at the repo root.

---

## Decisions ledger
- Public contact on the site: **bricker3@gmail.com + LinkedIn only, no phone.**
- Google number: **$45M+ ad spend *through the channel*** (kept distinct from $35M+ peak revenue).
- Hero photo: **family photo (father-of-three), flippable to the Dreamship give-back shot.**
- Direction: **Dossier** (Console + Compare retained as artifacts).
- Deploy: **`/sales/` live alongside the preserved root site** (no root replacement).

## Outstanding / open questions
- **A clean professional headshot** would still upgrade the flip front (currently the family photo; the only solo portrait in the repo reads as a dim club shot).
- **OG share image** still shows the old positioning — regenerate a vSales card (1200×630).
- **Hero clip is 9.8MB** — compress offline (no usable ffmpeg in this env).
- **Ledger ⚠️:** Northwestern Mutual TCV ($6M vs $8M) and the IBM quota wording (public "achieved quota" vs résumé ">100%") still want one reconciled value.
- Whether to **promote `/sales/` to the site root** later (and/or retire Console/Compare) — deferred.
