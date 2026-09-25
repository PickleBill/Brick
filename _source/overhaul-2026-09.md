# Site overhaul, Sept 2026: the strategic plan

> **Status: PLANNING. Nothing on the live site changes until Bill signs off on §3 (facts) and §5 (calls).**
> Started 2026-09-25. Owner: Bill. Advisor + orchestrator: Claude. Binding rules: `CLAUDE.md` (the five
> build rules), `_source/facts.md` (LAW). This file is the brief every build agent reads.

---

## 0. The one move that matters most

**Make the site agree with the résumé you're sending today.**

Your Sep 21 résumé is more measured than the site. It says you *established a partnership, aligning
five internal teams*. The site says *VP-level sign-off* and shows Microsoft, Meta and Adobe as closed
partners, which the résumé never mentions. A hiring manager reading both, or a reference call, will
find the gap. So the rule for this overhaul:

> **The résumé is the ceiling. The site can tell the story more vividly, never bigger.**

Everything else (3 card photos instead of 6, Résumé in the nav, a proof section built on the Courtana
video) is cleanup on top of that rule.

---

## 1. What exists today (Rule 3: current state, checked 2026-09-25)

- **Home (`index.html`)**, rendered desktop + 375px. Order: Hero (6-photo identity card, auto-rotating)
  → Google deal → "Then the rest said yes" (logo constellation) → Terminal ("Prompt it") → Proof
  ("I show you the work": Courtana video + two website-screenshot cards) → Story row → Contact
  (Calendly + email form + links). Right-edge scroll-spy with 7 stops.
  **Nav: Story · Proof · Let's talk. No Résumé.** Résumé only appears in the footer → `resume-v2.html`.
- **`resume-v2.html`**: dark gradient web page with June content (VP-level, 11x, Microsoft/Meta/Adobe,
  40+ apps). Does not read as a résumé at a glance and does not match the Sep résumé.
- **`work.html`** ("Receipts, not slides"): Courtana + Dreamship cards, VibeCo / Pickle DaaS / 40+ apps
  cards, then a terminal.
- **New résumé:** Google Doc "Bill-Bricker-Resume", edited 2026-09-21. Snapshot:
  `_source/resume-2026-09-21.md`.
- **LinkedIn:** the public (logged-out) view is stale: old "Karmic Networker" headline, San Francisco,
  no Courtana. The updated profile still needs to reach us (Q6).
- **Links:** courtana.com is down. dreamship.com, vibeco.lovable.app and the Pickle DaaS dashboards
  are live.

---

## 2. Diagnosis (ranked by damage)

1. **Facts drift.** The site claims more than the Sep résumé in about 8 places (§3). Biggest risk,
   and invisible until someone compares.
2. **Dead and non-compliant Courtana proof.** courtana.com is down but linked in 7 places (home, work,
   climb, both résumé pages). Worse, the Courtana website screenshot (`assets/shots/courtana.png`,
   used as the card image **and** as the video's poster frame) shows **"11 sports"**, a Tier A
   never-render. It's on the page now, as a picture, so text scans miss it.
3. **The hero card does too much.** 6 photos, auto-advance, dots, aperture bloom. It competes with the
   headline. Two facets are weak: "GTM Operator" sits on a luau family photo; "Vibe Pusher / DJ" is an
   inside joke on the front door.
4. **No Résumé in the nav**, and the résumé page is out of date and doesn't look like a résumé.
5. **The proof section is two website screenshots.** The video is the real proof. The cards are
   brochure shots of websites, one of them dead.
6. **General busyness.** 7 sections, a 7-stop scroll-spy, an animated line constellation behind the
   logos, three ways to make contact.
7. **Privacy leak (fix first, separate from design).** The Pages workflow publishes the whole repo, so
   `picklebill.github.io/Brick/_source/facts.md` is public, including the private Courtana raise figure
   and other "never public" notes. The GitHub repo itself is public too.

---

## 3. Facts to reconcile: Sep 21 résumé vs `_source/facts.md` (needs Bill's sign-off)

> Per Rule 3 nothing is silently picked. Each row is logged as open in `_source/decisions.md`.
> **"Need you"** = I can't recommend without information only you have.

| # | Fact | Ledger (LAW today) | Sep 21 résumé | My recommendation |
|---|------|--------------------|---------------|-------------------|
| F-1 | Google teams + sign-off | VP-level across 5–6 teams | "aligning five internal teams" (no VP) | Match the résumé: **five internal teams**. Bring "VP-level" back only if it goes on the résumé too. |
| F-2 | Google framing | "closed Google as a partner in year one" | "Established a partnership in Dreamship's first year" | Keep **"closed Google as a partner, in year one"** on the site. Same claim, stronger verb. Your call. |
| F-3 | Dreamship dates | CEO 2018–Sep 2023 · Board Chair Sep 2023–present | CEO 2018–2024 · Board Chair 2024–2026 | **Need you.** Which is right, and are you still Board Chair? |
| F-4 | Courtana dates + status | Founder & CEO 2023–present · site says LIVE, "currently building" | Founder & CEO 2024–2026 | **Need you.** Active, paused, or wound down? This drives copy on every page. |
| F-5 | IBM title | Watson Analytics & Netezza Brand Specialist | Watson Foundations Account Executive | Adopt the résumé. LinkedIn agrees (Netezza Brand Specialist was the Summit program role). |
| F-6 | Northwestern Mutual | $6M+ TCV · 150+ accounts (C-2) | $8M TCV · 185 accounts | Adopt the résumé if you stand behind $8M (your original quiz answer). **The résumé line is garbled** ("…College Unit Director.that reached a top-10…"): fix it in the Doc before we export a PDF. |
| F-7 | $150K · 3 product versions · Ukraine & Nigeria | Dreamship (early phase) | IntroStellar | **Need you.** Which company? |
| F-8 | Partners named | Google, Stripe, PayPal, Payoneer, Meta, Adobe, Microsoft/Bing | Google, Stripe, PayPal, Payoneer ("evolving relationship") | **Need you.** Keep the ones you'd defend on a reference call, and put the **same list on both** résumé and site. |
| F-9 | Numbers on the site, not on the résumé | 11x ($1.6M→$17M) · ~$85M GMV · 2.3M+ units · 323% CAGR · 4 yrs EBITDA-profitable · $2.2M raised · 40+ apps / 31 repos | none of these | Keep **11x** and **40+ apps** on the site (most forwardable) and add them back to the résumé. Move the rest to the terminal + PDF only. |
| F-10 | Pledge 1% | not in ledger | ~1,200 → 2,100+ orgs (LinkedIn's 2017 text says 1,800+) | Adopt the résumé figure. |
| F-11 | New facts | none | Stripe: U.S. payments access for merchants + joint events · GearLaunch team of 13 · Freedom United board 2020–22 · Courtana "TopGolf meets Pickleball" · Google deal served an underserved Vietnamese merchant market | Add to the ledger. |

After sign-off: update `_source/facts.md`, the GATE in `_source/grader.md` (it still hard-codes
"VP-level" and "vFinal"), and move these rows to Resolved.

---

## 4. The target site

**Nav on every page:** Story (`climb.html`) · Proof (`work.html`) · **Résumé** (`resume/`) · [Let's talk] (Calendly)

**Home: five beats and a close** (was seven sections)
1. **Hero:** headline + lede + two CTAs. Identity card with **3 photos, no auto-rotate** (tap to change).
2. **The deal:** Google story + its numbers, with **one quiet row of partner and customer logos**. The
   separate constellation section folds in here.
3. **Prompt it:** the terminal, same position (decision U-1 stands).
4. **Proof teaser:** the **Courtana video is the centerpiece** (2 badges, not 3), one line each for
   Dreamship and the AI builds, then **"See the full proof of work →"** (`work.html`). Both website
   screenshot cards go.
5. **Story row** → `climb.html`.
- **Close:** Calendly is primary; email · LinkedIn · résumé as one quiet line.

**Résumé page (new, at `resume/`):** the Sep résumé as a clean sheet on the site, prints to two pages
exactly like the PDF, with a Download PDF button. A few bullets link to their proof. Old
`resume-v2.html` / `resume.html` stay in place and redirect once you sign off (never overwrite).

**Proof page (`work.html`, reworked):** the "larger proof of work". Courtana (video, no dead link),
Dreamship (live link), Pickle DaaS (live dashboards), VibeCo (live), the showcase apps with their
screenshots, terminal at the bottom. Every link checked live.

---

## 5. Calls for Bill (one batch, my pick first)

- **Q1 · Facts.** Sign off F-1…F-11: reply "all recs" or list exceptions. I need real answers on
  **F-3** (Dreamship dates), **F-4** (Courtana status), **F-7** ($150K company), **F-8** (partner list).
- **Q2 · Hero card photos.**
  - **A (my pick), 3:** Headshot "0 → 1 Builder" · Family "3× Father" · Freedom United check "Pay it
    forward". Covers work, family, giving: the three things people remember.
  - **B, 4:** A + the community rooftop shot.
  - **C (wildcard), 1:** headshot only, no carousel; the other photos move to the Story page.
  - Cut in A and B: DJ (stays as a terminal easter egg) and "GTM Operator" (luau photo; the whole page
    already says GTM).
- **Q3 · Résumé page look.**
  - **A (my pick), paper sheet:** light, editorial, reads as a résumé instantly, prints exactly like the PDF.
  - **B, dark and site-native:** today's look with the new content.
  - **C (wildcard), interactive:** each bullet expands into its proof (video, logo, dashboard).
- **Q4 · Declutter extras** (yes/no each; my picks in brackets): fold the logo constellation into the
  Google section **[yes]** · drop the inline email form, keep Calendly + one quiet line **[yes]** · the
  "Currently building Courtana" line **[depends on F-4]**.
- **Q5 · Privacy fix:** stop publishing the working docs and scrub the private raise figure from the
  repo text **[yes, do first]**. (Purging it from git history means rewriting `main`; I'd only do that
  with your explicit OK.)
- **Q6 · LinkedIn:** drop your downloaded LinkedIn HTML, or Profile → More → Save to PDF, into Google
  Drive. I'll read it and line up the headline and About with the site. (I can't reach your computer or
  a logged-in LinkedIn from this cloud session.)
- **Q7 · New PDF:** once the Northwestern Mutual line is fixed in the Doc, say "export". I'll pull a PDF
  from Drive into `assets/` as a **new** file (vFinal stays).

---

## 6. How we build it: parallel agents

**Phase 0: sign-off (Bill, about 15 min).** Answer §5. I then update `facts.md`, `decisions.md` and
`grader.md` in one docs-only commit. Nothing builds on unsigned facts.

**Phase 1: six agents in parallel,** each in its own git worktree, each owning **separate files** so
they can't collide:

| WS | Job | Owns (only these files) | Waits on |
|----|-----|-------------------------|----------|
| **A** | Résumé page | `resume/index.html` (new) · new PDF in `assets/` | Phase 0 · Q3 · Q7 |
| **B** | Hero card trim | `operator-card.js` | Q2 |
| **C** | Proof page + dead links | `work.html` · `climb.html` · `resume-v2.html` · `resume.html` (link fixes only there) · `assets/shots/courtana-video-poster.jpg` (new) | Phase 0 · F-4 |
| **D** | Home front door | `index.html` | Phase 0 · Q4 · B's attribute note |
| **E** | Terminal + corpus | `home.js` · `content/*.json` | Phase 0 |
| **F** | Guardrails + privacy | `tools/factcheck.mjs` (new) · `.github/workflows/*` · `package.json` · private-figure scrub in docs | Q5 |

**Shared contract (every agent):**
- Nav = Story (`climb.html`) · Proof (`work.html`) · Résumé (`resume/`) · Let's talk (Calendly link from `site-config.js`). Same order, same labels, every page.
- D must not rename IDs that `home.js` uses: `#cvid`, `#vidwrap`, `#spy`, `#term`, `#termOut`, `#termIn`, `#termLine`, `#termChips`.
- Résumé links → the new PDF once it exists; `assets/Bill_Bricker_Resume_vFinal.pdf` until then.
- No link to courtana.com anywhere. No use of `assets/shots/courtana.png` (it shows "11 sports").

**Phase 2: integrate + QA (Claude).** Merge A–F onto `claude/bold-tesla-5id6sq` → `npm run factcheck`
→ render every page desktop + 375px (Rule 4) → run the four red-team agents already in
`.claude/agents/` in parallel (persona-panel, design-critic, copy-editor, ux-flow) → one fix list ranked
by how many lenses flagged each item → fix P0/P1 → preview links
(`raw.githack.com/PickleBill/Brick/<branch>/…`) → Bill's OK → merge.

---

## 7. Agent briefs (paste-ready)

**Every brief starts with this preamble:**
> Read `CLAUDE.md`, `_source/facts.md` (LAW, post Phase 0), `_source/spec.md`, and
> `_source/overhaul-2026-09.md` (§6 shared contract). Touch only the files you own. Minimal diffs, never
> rewrite a page from scratch. One spacing scale (Rule 5), no compensating margins. No phone, no private
> figures, no number that isn't in `facts.md`. Em-dashes sparingly, no AI superlatives. Before "done",
> render desktop + 375px with `node tools/shoot.mjs <page> --tag <ws>` and list what you checked.

**A · Résumé page.** Build `resume/index.html`: a full web résumé from the signed-off ledger, same words
and order as `_source/resume-2026-09-21.md` (summary · 01 Proof · 02 Experience · 03 Education ·
04 Capabilities · 05 How I work · 06 Beyond), corrected per §3. Look per Q3 (default: a light "paper"
sheet centred on the dark site background, site fonts, one accent colour). Top: shared nav with Résumé
active, plus Download PDF and Email buttons. Print CSS hides nav and buttons and fits two Letter pages.
Contact = email + LinkedIn + site, no phone. 3–4 bullets get a small proof link (Google →
`../index.html#google`, Courtana → `../work.html#courtana`, clip analysis → the Pickle DaaS dashboard).
Paths are relative from `/resume/`. Also render a print preview (`page.pdf()`): exactly two pages, no
widows, nothing clipped.

**B · Hero card.** In `operator-card.js`, cut `FACES` to the Q2 set (default order: builder → father →
payforward). Default auto-advance off (still honour the attribute if set). Keep the aperture bloom,
tap/swipe, reduced-motion and aria labels. Dots = facet count. A stored or `start` facet that no longer
exists (e.g. `dj`, `gtm`) must fall back to `builder`. Render the card with `tools/elshot.mjs` on
`index.html` at desktop + 375. Hand D the exact hero attribute to set.

**C · Proof page + dead links.** Rework `work.html` into the full proof of work:
(a) **Courtana**: feature `assets/courtana-shot.mp4` with a new poster frame. Extract it with
`ffmpeg-static` (`npm i ffmpeg-static` in a scratch dir works in this environment, then
`ffmpeg -ss 8 -i assets/courtana-shot.mp4 -frames:v 1 -q:v 3 assets/shots/courtana-video-poster.jpg`;
pick a frame with no text that isn't in the ledger). Headless Chromium can't play H.264, so screenshots
show the poster; that's expected. No courtana.com link; copy per F-4. Give it `id="courtana"`.
(b) Dreamship → dreamship.com. (c) Pickle DaaS → the dashboards. (d) VibeCo → vibeco.lovable.app.
(e) Apps: Litigator, Venue Connect, Layup Lab, Pickleball Freak Show, HeadsUpTime, using
`assets/shots/*` (HeadsUpTime has no shot: text card). (f) Terminal stays at the bottom; align its
inline answers to the ledger. Then replace every courtana.com link in `climb.html`, `resume-v2.html`,
`resume.html` with `work.html#courtana` (or remove). Curl every external href (expect 200).

**D · Home front door.** In `index.html` only: (1) nav + footer per the shared contract. (2) Hero:
set B's card attribute; eyebrow and lede aligned to the signed-off ledger. (3) Google section: copy per
F-1/F-2/F-9; fold the "Then the rest said yes" logos in as one quiet row and drop the constellation SVG
(Q4); logo list per F-8. (4) Proof teaser: the video as centrepiece with 2 badges, poster = C's new
frame, remove both website-screenshot cards, one compact line or strip for Dreamship and the AI builds,
CTA "See the full proof of work →" `work.html`. (5) Update the `#spy` entries to the new section list.
(6) Contact per Q4; "Currently" line per F-4. (7) `<title>`, meta description and OG text aligned.
Grade with `_source/grader.md`.

**E · Terminal + corpus.** Align every terminal answer in `home.js`, and `content/content.json` +
`content/index.json` (the live ask-bill backend reads the corpus), to the signed-off ledger: IBM title,
Northwestern Mutual, Dreamship and Courtana dates + status, Google team count and sign-off, partner list,
the $150K attribution. Add the F-11 facts. Keep behaviour (boot, chips, hiring-manager/reference modes)
unchanged. Résumé links inside answers → the new résumé page / PDF. Grep for every Tier A pattern.
Don't touch `index.html`.

**F · Guardrails + privacy.** (1) `tools/factcheck.mjs` + `npm run factcheck`: scan all published
HTML/JS/JSON (skip `archive/`, `v3/`, `design-refs/`, `node_modules/`) for: phone patterns; the private
raise figure; "11 sports" / "11+ sports"; "sub-one-year-old"; "director" near Google sign-off; "8-fig"
near Google or channel; `$45M+` near "revenue" without "not revenue"; résumé links that don't point at
the canonical page/PDF; any courtana.com link; any reference to retired images
(`assets/shots/courtana.png`). `--links` also curls external hrefs. Print `file:line`, exit non-zero on
a hit. Add a `pull_request` workflow that runs it. (2) Pages: publish a staged folder that leaves out
`_source/`, `HANDOFF.md`, `BUILD-LOG.md`, `PLAN.md`, `ROADMAP.md`, `INTERVIEW.md`, `.claude/`,
`handoffs/`, `design-refs/`, `tools/`. **Keep `content/*.json` published**: first confirm which URL the
ask-bill function fetches the corpus from. (3) Replace the private raise figure in repo docs with
"[private: ask Bill]". Git history still has it; flag that, don't rewrite history.

---

## 8. Done means

- `npm run factcheck` passes: zero Tier A hits, zero dead links, every number traces to `facts.md`.
- Every page rendered desktop + 375px: no horizontal scroll, no overlap, no clipped text.
- `_source/grader.md`: all three dimensions ≥ 4, GATE passes.
- Home has ≤ 6 blocks. Hero card has 3 (or 4) photos, no auto-rotate.
- Résumé is in the top nav on every page; the résumé page matches the PDF word for word.
- Nothing links to courtana.com or shows the "11 sports" screenshot.
- Preview links sent to Bill; Bill signs off; merged.

---

## 9. The standing "strategic advisor" prompt (reuse in any new session)

```
You're my strategic advisor on my portfolio site: repo PickleBill/Brick, live at
https://picklebill.github.io/Brick/. I'm a sales & partnerships operator (3x founder) aiming at
GTM / partnership roles at frontier AI labs. The site has to be something a hiring manager forwards.

Before you recommend anything:
1. Read CLAUDE.md, _source/facts.md (LAW), _source/spec.md, _source/decisions.md,
   and _source/overhaul-2026-09.md.
2. Render what's live: node tools/shoot.mjs <page> --tag now (desktop + 375px). Look at it.
3. Open my newest résumé in Google Drive ("Bill-Bricker-Resume") and diff it against facts.md.

Then give me, in this order:
- The one move that matters most right now, in one sentence.
- What you checked (pages, facts, links).
- 2-3 options for that move, your pick, and one line on why.
- Every question you need from me, in ONE batch.

Rules: the résumé is the ceiling (the site never claims more than it). Never change a number without
my sign-off; log conflicts in _source/decisions.md. Small diffs, never rebuild a page from scratch.
New version, never overwrite. Em-dashes sparingly, no AI superlatives. Always give me a preview link.
```
