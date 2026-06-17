# _source/spec.md — the merged sales-leader front door

> Empty until **Phase 1b**. Will be written section by section, each line tagged
> **KEEP FROM SALES / ABSORB FROM BUILDER / NEW**, every number citing `_source/facts.md`,
> leading commercial with builds as proof. Nothing here yet — do not build against this file
> until it is filled and signed off.

## Positioning + copy brief (from Phase 1a — ✅ LOCKED pending sign-off)

**Positioning, one line:** *AI-Forward Sales & Partnerships Leader who closes the deals the biggest
names in tech say yes to — and builds the AI that does the work.*
**Single job:** a **forward-worthy asset.** Bill's network shares it (he's visibly "more than a
résumé"); the recipient books the conversation. **Metric = forward-ability.** The PDF stays the full record.
**Audience (two layers):** the forwarder (VC friends / well-connected network) + the recipient
(GTM hiring manager or colleague — frontier lab or otherwise).
**Win test:** would a frontier-lab GTM hiring manager screenshot it and forward it to a colleague?
**Proof spine (lead commercial, prove with builder):** Google in year one → VP-level across 5–6
internal teams → **$45M+** partner ad spend → **$35M+** peak revenue (4 yrs EBITDA-profitable) → the AI
multiplier (Courtana / Pickle DaaS, 40+ apps solo).

**Interview decisions:**
- **Q1 — single job:** forward-worthy asset (above). Forward-ability is the metric.
- **Q2 — signature element:** the **live "prompt my résumé" terminal**, pulled **up** — hero hook →
  terminal high, right after the Google centerpiece. Everything else goes quiet around it.
- **Q3 — message overlap:** slim the hero to the CLAIM (words, not numbers) + tease the build;
  the 01 centerpiece owns the $45M+/$35M+ numbers, section 04 owns the AI-builder proof.
- **Q4 — remove one accessory:** DEFERRED (Bill, "come back to it later") — keep all decorative
  elements for now; revisit against real pixels in the build.
- **Q5 — single primary CTA:** **prompt the terminal** ("Ask my résumé anything ↓"); email = the calm
  close; everything else demoted to one quiet row. (Bill: broader UX happy-path / nav / CTA is a known
  larger effort for later.)
- **Demote to depth:** pedigree/climb → one quiet row linking `climb.html`; `v3/` + `work.html` stay optional depth.

### Copy seeds (from vFinal résumé — verbatim-grade, all in `_source/facts.md`)
- Tagline: *"Two decades turning frontier technology into revenue. Now all-in on AI-native go-to-market."*
- Three-beat operating system (great section scaffold):
  - **HOW I CLOSE** — first-of-a-kind partnerships with the biggest names in tech (Google, Stripe,
    Meta, Microsoft); **$45M+ partner ad spend**; seven- and eight-figure enterprise deals.
  - **WHAT I BUILD** — products that scale (**Dreamship → $35M+**) + an AI force multiplier:
    intake, synthesis, proof, collateral, ship.
  - **WHO I LEAD** — top-tier talent recruited with no money and no brand; globally distributed
    teams (SF, NYC, Vietnam, SE Asia, Ukraine, Nigeria).
- Spine line: *"Closed Google as a partner in year one … VP-level sign-off across 5–6 internal Google
  teams … drove $45M+ in partner ad spend over 5+ years."*

## Design direction (from Phase 1a — ✅ LOCKED pending sign-off)
- **Signature, pulled high:** the live terminal is the one bold, alive thing — placed right after the
  Google centerpiece. Everything else stays quiet and disciplined around it.
- **Motion budget:** one orchestrated moment (terminal boots `whoami`). Decorative motion (flip-card,
  constellation, video badges) is **kept for now** (Q4 deferred) but stays subordinate to the terminal.
- **Spacing (Rule 5 — the overlap fix):** ONE token scale in `:root` (4/8/16/24/40/64/96); one layout
  primitive owns vertical rhythm; children add no compensating margins.
- **Primary CTA:** "Ask my résumé anything ↓" → the terminal. Email = calm close at contact; everything
  else demoted to a single quiet row.
- **Identity:** keep the dark `bricker.os` theme + green→cyan→violet→coral as a *deliberate* identity
  tied to "prompt the résumé," not a default.
- **Quality floor (unannounced):** responsive to 375px · visible keyboard focus · reduced-motion respected.
- **Proposed section order (finalize in 1b):** Hero → 01 Centerpiece (Google owns the numbers) →
  ▶ **Terminal** (signature, pulled up) → 02 Ecosystem → 03 Multiplier (Courtana/AI) → Pedigree row →
  Contact (email close).
- **Known later effort (Bill):** full UX happy-path, navigation, and CTA system — a dedicated later pass.

### Design loop — `/impeccable` as a standing, iterative pass (Bill, 2026-06-17 · decision D-3)
Treat `/impeccable` (and `/review-site`) as an **integrated, repeating step of the build**, not a
one-time polish at the end. Map command → moment:
- **Frame a section before building:** `/impeccable layout` (structure/IA) + `/impeccable typeset`
  (type scale) → set the bones before writing HTML.
- **Tighten copy to the ledger:** `/impeccable clarify` + `/impeccable distill` → shortest true
  line; cross-check every number against `_source/facts.md`.
- **The signature moment:** `/impeccable overdrive` on the terminal boot (`whoami`) — the one
  orchestrated animation (motion budget = 1).
- **After each render (Rule 4):** `/impeccable critique` (hierarchy/spacing) + `/impeccable audit`
  (a11y/perf) + **`/review-site`** (4-lens ICP red-team: would a frontier-lab GTM hiring manager
  forward it?).
- **Pre-"done":** `/impeccable polish` + `/impeccable detect` (kill generic-AI-interface tells /
  anti-patterns — CLAUDE.md anti-pattern guardrail).
- **Cadence:** build a slice → render → `critique` + `audit` → fix → re-render. Each loop is a small
  **diff** (Rule 3), screenshot-verified (Rule 4).

## Section-by-section spec (from Phase 1b — ✅ ready for build)

> **Tag key:** `KEEP` = stays as-is in `sales/index.html` · `FIX` = same element, ledger/copy
> correction · `MOVE` = reorder only · `NEW` = net-new · `ABSORB` = mine from builder `index.html` /
> spokes. Every number cites `_source/facts.md`. Lead commercial; builds are the multiplier (Tier B).
>
> **Locked section order** (terminal pulled up per Q2): Hero → 01 Centerpiece → ▶ Terminal →
> 02 Ecosystem → 03 Multiplier → Pedigree row → Contact.
>
> ⚠️ **LIVE CONTRADICTION to resolve in build:** current `sales/index.html` ships the terminal
> **last** (`:322`, comment *"moved below the proof — progressive disclosure"*). Brief = terminal
> **up**, right after 01. **Recommend up** — it's the differentiated "sells AND builds" proof; burying
> it after 04 makes it redundant payoff most readers never reach. One-block move, trivial to flip back. (Decision U-1.)

**Global / chrome**
- `KEEP` dark `bricker.os` identity, mesh + grain, nav brand (facts: identity).
- `FIX` nav → **Story · Work · Résumé** (CLAUDE.md "Col bill"); demote **Email** from a nav peer to the
  contact close — currently 4 items incl. Email at `:165–168`. Low priority, keep Email reachable.
- `FIX` **every résumé link → `assets/Bill_Bricker_Resume_vFinal.pdf`** (C-4). Today they point at
  `../assets/Bill_Bricker_Resume.pdf`: nav `:167`, hero `:214`, contact `:370`, footer `:375`.
- `KEEP` quality floor — 375px responsive, visible focus, reduced-motion (already wired `:58,111,141`).

**Hero** (`:172–218`) — *the CLAIM in words; numbers teased, not stated (Q3)*
- `KEEP` eyebrow "AI-Forward Sales & Partnerships Leader" `:209` + H1 "I close the deals the biggest
  names in tech **say yes to.**" `:210` (facts: positioning line).
- `FIX` lede `:211` currently front-loads `$45M+`/`$35M+`; per Q3 the **01 centerpiece owns the
  numbers** — hero teases ("a first-of-its-kind Google deal… then I built the AI behind it"), keep one verbal hook.
- `KEEP` operator flip-card (family ⇄ give-back) `:177–195` — Q4 deferred; stays subordinate to terminal.
- `KEEP` glanceable hero bars `:199–202` — verify values are ledger-clean ($45M+ channel · 6 partners · 11x · 40+ apps). ✓
- `FIX` **primary CTA = the terminal** (Q5): add **"Ask my résumé anything ↓"** as the lead action
  (today hero CTAs are "See the Google deal →" + "Download résumé" `:213–214`); résumé = calm secondary.
- `KEEP` availability line `:216`.

**01 — Centerpiece: Google / Dreamship** (`:220–235`) — *owns the numbers*
- `KEEP` structure + "**5–6 internal teams**" `:225` (C-1 ✓). 
- `KEEP` dstats verbatim: `$35M+` peak revenue · 11x ('20 $1.6M→$17M) · **`$45M+` ad spend "through
  the channel — not revenue"** `:230` (Guardrail #1 — keep this exact caption) · 4 yrs EBITDA-profitable / profitable today.
- `KEEP` foot8 "~$85M GMV · 2.3M+ units · 323% CAGR (2019–21)" `:233` (facts: Dreamship).

**▶ Terminal — signature, pulled up** (`MOVE` `#brickeros` from `:322–361` → slot 3)
- `MOVE` whole section to right after 01; drop the "moved below the proof" comment.
- `FIX` the **only** ledger gap left on the front door: `sales/ai-forward.js:126` "director sign-off"
  → **"VP-level"** (C-1).
- `KEEP` three command rows (record / hiring me? / wildcards) `:339–358` + the `whoami` boot.
- `NEW` wire hero's "Ask my résumé anything ↓" → focus `#termInput` + scroll here.
- ⚠️ `billygoat` chip depends on open story **S-2** (DJ Billygoat anecdote) — keep a graceful
  placeholder until Bill supplies it.

**02 — Ecosystem** (`:237–269`) — *one credible yes unlocked the next*
- `KEEP` constellation / logo wall; all logos on the cleared list (facts: cleared logos).
- `KEEP` sub "first-of-its-kind partnerships, then enterprise clients and the retail floor" `:241`.

**03 — Multiplier: Courtana / Pickle DaaS** (`:288–320`) — *the proof, not the headline*
- `KEEP` "I build the AI workflows that 10x my selling" `:291` (Tier B — multiplier, not developer identity).
- `KEEP` CV video + stat badges `:294–303`; `KEEP` "**40+ apps across 31 repos**, run solo" `:307`
  (locked verbatim — never mix with the looser "65+").
- `KEEP` aimetrics 21K+ clips · 4,097 deep · $0.0054/clip `:309–311` (facts: Pickle DaaS).
- `KEEP` spoke links — Pickle DaaS walkthrough + VibeCo simulator `:314–315` (hub *links* out, never
  re-imports — Rule 2).

**Pedigree — demoted to one quiet row** (`MOVE`/`FIX` `:271–286`)
- `MOVE` from full "03" section to a single quiet row near the close (brief: "demote to depth"). Keep
  the `climb.html` link + node trail NWM→IBM→WibiData→GearLaunch→Dreamship→Courtana `:285`.
- `KEEP` copy `:277`: NWM "top 10 nationally / 150+ accounts" + IBM "seven-figure analytics & early-AI
  (Watson); achieved quota" (facts: earlier track record). The row **alludes**; the PDF carries the
  `$6M+` TCV (C-2 — always paired with "top-10 nationally").

**Contact — calm close** (`:363–377`)
- `KEEP` "Let's close something big." + email primary `:365–368`; `FIX` résumé link → vFinal `:370`.
- `KEEP` LinkedIn `:369`; **no phone** (Guardrail #3 — front door already clean ✓).
- `KEEP` footer; `FIX` footer résumé link → vFinal `:375`.

**Cut / defer (not on the front-door spine):** `v3/index.html`, `work.html`, `console.html`,
`compare.html` stay optional depth, not linked from this merge (brief: "demote to depth"). They still
carry their own ledger violations (phone / `$350K` / "11+ sports" / "sub-one-year-old" — see the facts
surface audit) → fix or `noindex` in **Phase 2**, not this merge.

## Spacing scale (Rule 5 — one ramp, defined once)
- **Token ramp in `:root`:** `--s1:4px; --s2:8px; --s3:16px; --s4:24px; --s5:40px; --s6:64px; --s7:96px;`
- **One layout primitive owns vertical rhythm:** all top-level `section.wrap` blocks get their gap from
  a *single* owner (e.g. `section.wrap + section.wrap{margin-top:var(--s7)}` or a `.stack` parent).
  **Children never add compensating top/bottom margins** — the documented fix for the overlap / uneven-gap problem.
- **Build step — replace the ad-hoc margins already in `ai-forward.css` / inline:** e.g.
  `.contact{padding-top:84px}` (`sales/index.html:112`), `.termsec{padding-top:30px}` (`:78`),
  `.foot{margin-top:60px}` (`:115`), `.contact{padding-top:84px}` → fold into the ramp + single owner.
- **Verify (Rule 4):** `node tools/shoot.mjs sales/index.html --tag phase1b` at desktop + 375px before "done."

## v4 — NEW APPROACH: repurpose the root chassis (2026-06-17, post-interview)

> **Supersedes the `/sales` chassis for the front-door goal** (Bill: /sales core architecture is buggy on
> spacing & interactions). **Non-destructive** — built at **`v4/`**; `/sales` + repo-root `index.html`
> stay untouched for side-by-side. Interview (2026-06-17): problem = **spacing/rhythm + janky interactions**
> (not the style, not the flow); **keep the root chassis, swap the messaging**; grade on **forward-able /
> rhythm&mobile / alive-not-slop** with a facts-integrity gate → `_source/grader.md`.

**Base:** copy repo-root `index.html` + `home.js` → `v4/index.html` + `v4/home.js`. Repoint `"assets/` →
`"../assets/"`, internal page links → `../`, résumé → `../assets/Bill_Bricker_Resume_vFinal.pdf`.
**Why this chassis:** already terminal-first (01 "The interface"), scroll-spy nav, mobile hamburger,
side-by-side operating companies, single-primitive section padding (`section.block{padding-top}`).

**Messaging swap (keep structure, change words — Q3):**
- Title / meta / OG → "AI-Forward Sales & Partnerships Leader" + the locked claim; fix "sub-one-year-old".
- Hero: avail = identity eyebrow; **H1 = "I close the deals the biggest names in tech *say yes to.*"**;
  lede = Google-in-year-one → then built the AI; **primary CTA = "Prompt my résumé ↓"** (→ terminal),
  secondary = Download résumé (vFinal). Availability line under the CTAs.
- Flip front idlines → operator identity; drop the public "Vibe Pusher" / "fka DJ Billygoat" (keep
  billygoat as a terminal easter egg only).

**Ledger fixes (each one is a GATE item):**
- Bar1 + statband **"8-fig" Google channel → `$45M+` ad spend** (C-3); statband **"$35M+ revenue led" →
  `$35M+` peak revenue** (guardrail #2).
- Courtana opco: **drop "11+ sports" + "$350K"** → 36 courts · 760 users · 4 venues.
- Dreamship opco: **"sub-one-year-old startup" → "in year one".**
- Contact: **remove the phone (`tel:`)** → Download résumé (vFinal).
- nav + footer résumé (`resume-v2.html`) → **vFinal PDF**.
- `home.js` terminal copy: scan for 8-fig / phone / $350K / 11-sports / sub-one-year / director → fix to ledger.

**The two bugs to kill (Q1) — verify against the grader, don't blind-refactor:**
- **Rhythm:** confirm one section primitive owns vertical spacing; add the Rule-5 token ramp; kill any
  compensating margins the render surfaces.
- **Interactions:** flip-card fixed `min-height` + terminal/mic robustness — fix whatever the render shows
  janky (overflow, layout shift, reduced-motion).

**Done = grader: all 3 dims ≥ 4 + GATE pass; rendered desktop + 375px; preview link to Bill.**

## v4 — Revision 2 (Bill feedback, 2026-06-17) — ⏸ SPEC FOR SIGN-OFF (do not build yet)

> Documents Bill's round-2 feedback on the live v4 + decisions (interview 2026-06-17). v4 is the
> front-door lead direction; this revision gets it back onto the original roadmap track
> (build → red-team → align → ship). Build only after Bill signs off.

### A. Declutter — kill the floating labels/overlays (use only when necessary)
**Cut** (text-heavy, low value): flip-cue text "tap to flip / flip back" (also currently reversed)
→ one minimal ⟲ icon, no words · card photo tags ("building & giving", "Dreamship × Freedom United…",
op-head "Raleigh, NC · father of three", cf-tag) · hero availability sub-line ("Open to GTM… fractional…
board") — already lives at the contact close · VibeCo "11 AI agents" badge · trim the 5 video CV stat
badges → 2–3 key ones. **Keep** (functional): terminal LIVE badge, the `whoami` boot, the avail dot.
*(Challenge: a flip with zero affordance is undiscoverable — keep the one ⟲ icon.)*

### B. Hero — flip the layout + rebuild the card
- **Layout:** card **LEFT**, copy **RIGHT** (match the sales branch; currently reversed).
- **Card = compact flip + 4 bars below** (the sales card pattern, not v4's tall 498px flip):
  - FRONT = the **Freedom United giant-check photo** (`assets/dreamship-donate.jpg`), **made taller/wider**
    (it's narrow now) — give-back seen first.
  - BACK = the **family photo** (`assets/family.jpg`).
  - Below the flip: the **4 operator bars from the sales version** — `$45M+` Google channel · `6` big-tech
    partners · `11x` ('20) · `0→40+` AI apps. Compact.
  - Minimize vertical height; fix the flip cue (single icon, correct face).

### C. Google deal — ground-up centerpiece card (front & center → terminal)
- New clean section, **brief**: first-of-its-kind Google partnership, closed **in year one**, **VP-level
  across 5–6 teams**, ran **5+ years**.
- **Numbers folded in, slim** (Bill likes the stat card — keep its spirit, slimmed): `$45M+` ad spend
  *(not revenue)* · `$35M+` peak revenue · `11x` ('20) · 4 yrs profitable. The old green 6-stat band is
  **absorbed here** — no separate band.
- Hands off to the terminal ("ask the machine about it ↓").
- **Design ground-up with `/impeccable craft`** — narrative-with-numbers, NOT a big-number hero-metric
  grid (that's the slop template). Numbers support the deal story.

### D. Builds — proof-of-work (featured + swipeable rail) — THE most important section
- **Decision (Bill + my guidance):** featured item + horizontal **scroll-snap rail**, NOT a rotating
  wheel (wheels hide proof + jank on mobile). **Don't over-engineer** — plain CSS scroll-snap, no lib.
- **Content (companies + apps):** coalesces the old Companies + VibeCo + Pickle DaaS sections into one.
  - **Featured slot:** the most visual proof — propose the **Pickle DaaS CV video** (raw court video →
    player/coaching/venue intel · `$0.0054/clip`); VibeCo (engine behind 40+ apps) the alt.
  - **Rail:** Courtana · Dreamship · VibeCo (companies) + Litigator · Venue Connect · Layup Lab · Freak
    Show · HeadsUpTime (apps). Each card tagged Company · App · Data.
- **Interaction:** drag/swipe + arrows (desktop) + scroll-snap (mobile); peek the next card; keyboard +
  visible focus; reduced-motion safe; **no auto-rotate**. Sneak-peek → click/scroll through (per Bill).
- **Approach:** `/impeccable shape` → `craft` the featured card + rail card + rail mechanics; render
  desktop+375; grade.

### E. Terminal — fix mobile
Bug: on mobile the boot **doesn't type out** and typing input is janky. Diagnose `home.js` boot /
`typed()` + input focus/scroll/keyboard on mobile. Desktop is great — keep it.

### F. New section order
Hero (card L / copy R) → **Google deal card** (numbers folded slim) → **Terminal** → **Builds**
(featured + rail) → Story → Contact. *(Drops the separate green stat band + the separate
Companies/VibeCo/Pickle-DaaS sections — all coalesced.)*

### Build sequence (small diffs · render+grade each · preview link each)
1. Declutter + hero flip + card rebuild → render/grade.
2. Google deal card (`/impeccable craft`) → render/grade.
3. **Builds featured + rail** (`/impeccable shape`→`craft`) → render/grade. ← the big one.
4. Terminal mobile fix.
5. Copy pass (thin em-dashes · sharpen hero → push *forward-able* 4→5) + `/impeccable layout` + `polish`.
6. Red-team: `/review-site` + persona-panel (forward-able gate) → fix P0/P1.
7. **Back on track:** formalize v4 as THE front door (supersede `/sales`), align résumé/terminal ledger, ready-for-merge.

### My take on the round-1 impeccable recs (deferred items)
- em-dash copy / sharpen hero → step 5 (sharpening the hero now would be wasted before the restructure).
- layout/spacing pass → step 5 (the restructure changes the layout; polish after).
- flip-card tall height → **already handled** by §B (compact card).
- spy numbers → **keep** (deliberate nav mini-map, not the per-section tell).
Net: the restructure subsumes most of round-1 polish — don't polish before rebuilding.
