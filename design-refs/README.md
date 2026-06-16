# Handoff: Brick site — AI-Forward Sales repositioning (two hero directions)

## Overview
Two complete homepage directions for **Bill Bricker's** personal site ("Brick"), both
executing the **AI-Forward Sales & Partnerships** repositioning from the 2026‑06‑15 strategy
call. Sales leads; building is reframed as a multiplier ("I build the AI workflows that 10x my
selling"). Same single narrative, two visual treatments to choose between:

- **Console** (`console-ai-forward.html`) — terminal-led hero. The live `bricker.os` terminal
  is the signature interaction and sits in the first fold.
- **Dossier** (`dossier-ai-forward.html`) — portrait-forward "operator ID" hero (floating glass
  card + animated metric bars/ring); the terminal moves down into the AI-proof section.
- **Compare** (`compare-ai-forward.html`) — a reviewer harness that embeds both directions in
  live iframes side by side with a Side‑by‑side / Console / Dossier toggle. Not a shippable page —
  it's a decision tool. Discard it once a direction is picked.

## About the Design Files
**These HTML/CSS/JS files are design references, not production code to ship as‑is.** They are
high‑fidelity prototypes showing the intended look, copy, and behavior. The task is to **recreate
the chosen direction inside the existing Brick codebase** (the `PickleBill/Brick` repo) using its
established patterns — keep the existing structure and the simple menu nav; do not bolt this on as a
parallel site. The other HTML pages in the repo (`climb.html` / Story, `work.html` / Work) are out
of scope here and still carry the *old* narrative; bringing them in line is a follow‑up.

These were built to be a **frame of reference** to hand to Claude Code alongside additional context
the author will provide. Treat the narrative hierarchy and the facts ledger as binding; treat the
exact DOM structure as a strong suggestion.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, motion, and copy. Recreate pixel‑accurately
using the repo's existing design tokens/components. All design tokens are enumerated below and live
in `css/ai-forward.css`.

---

## Narrative hierarchy (binding — same on both directions, stated ONCE across the site)
1. **Hero header:** *AI‑Forward Sales & Partnerships Leader — I close the deals the biggest names in tech say yes to.*
2. **The one heavy line** (carries the page): *"I founded Dreamship and, in year one, closed Google as a partner — an eight‑figure channel that made the company on its climb to $35M+ revenue, EBITDA‑profitable four years."*
3. **Dreamship / Google = the centerpiece, ABOVE Courtana** → then the flywheel (Stripe, PayPal, Payoneer, Meta, Microsoft) → then sales pedigree (IBM, Northwestern Mutual).
4. **Courtana = one compact "AI chops" proof** (Pickle DaaS pipeline + 40+ apps), framed as the multiplier — *not* a company/traction story.

Directives honored: text cut ~50%; nav = **Story · Work · Résumé** (+ Email button); Résumé is a
**download link** to the PDF, not a re‑told summary; **no public phone number anywhere**; email +
LinkedIn only.

---

## Screens / Views

### 1. Hero — Console direction
- **Purpose:** Lead with the positioning line + the heavy Dreamship/Google sentence; route into the terminal.
- **Layout:** Single centered column inside `max-width:1120px`, padding `74px 28px 8px`. Eyebrow pill → `h1` → heavy lede → two CTA pills → "Closed" credibility row. Below it, full‑width terminal section.
- **Components:**
  - *Eyebrow pill:* mono 11.5px, uppercase, letter‑spacing .14em, color `--mint2` (#4cc890), 1px `--line` border, glass bg, pill radius, pulsing mint dot.
  - *H1:* Bricolage Grotesque 700, `clamp(38px,6.2vw,72px)`, letter‑spacing ‑.038em, line‑height .99, max‑width 18ch. Phrase "say yes to." wrapped in `.spectrum` (animated gradient text).
  - *Heavy lede:* Hanken Grotesk, `clamp(16px,2vw,20px)`, color `--mute` (#9aa0a8); bolded spans in `--ink` (#f4f6f7).
  - *CTAs:* `.pill.solid` (bg `--ink`, text #08090a) "Run the terminal →"; `.pill.ghost` (glass, `--line2` border) "Download résumé".
  - *Cred row:* mono 11.5px, faint; label "Closed" in mint2; partners Google · Microsoft · Stripe · PayPal · Payoneer · Meta.

### 2. Hero — Dossier direction
- **Purpose:** Put a human/operator ID in the first fold; same headline + heavy line on the right.
- **Layout:** 2‑col grid `.86fr 1.14fr`, gap 48px, vertically centered, padding `72px 28px 18px`. Left = floating operator card; right = eyebrow/h1/lede/CTAs/cred (same content as Console but slightly smaller `h1` clamp `36–62px`). Below ~900px it stacks and the card moves above the copy (`order:-1`, max‑width 420px).
- **Operator card (`.opcard`):** glass gradient, 1px `--line`, radius 22px, padding 16px, soft drop shadow. **Two signature motions:** a slow vertical **float** (`@keyframes float`, translateY ±7px, 7s) and a periodic **sheen** sweep (skewed white gradient, 7s). Contains:
  - *Portrait* — 4:5, radius 15px. In the prototype this is an `<image-slot>` (drag‑drop fillable) defaulting to `assets/portrait.jpg`. **In production, make it a normal `<img>` slot for a clean executive headshot.** Overlays: "● IN THE ROOM" mono pill top‑left; bottom gradient scrim; caption "**Bill Bricker** · Raleigh, NC · fka DJ Billygoat".
  - *Ring + bars* — an 84px SVG progress ring (center number swaps on hover) beside 4 interactive stat bars. Hovering a bar swaps the ring center; auto‑cycles every 2.6s. Bars: "Enterprise & partnership GTM / IBM·Google / 95%", "Closed big‑tech partners / Stripe·Meta / 92%", "Zero‑to‑one scale / $35M+ / 90%", "AI‑native workflows / 40+ apps / 86%". Track fills are spectrum gradients.

### 3. Terminal (`bricker.os`) — signature interactive (Console: first fold; Dossier: in §04)
- **Purpose:** "Ask the machine" — proof the site is AI‑built; a playful résumé.
- **Layout:** Dark shell `#0a0c0d`, radius 22px, 1px gradient‑masked border, macOS traffic‑light bar with "bill@bricker-os — zsh — 80×24" + pulsing "● LIVE" badge. Scroll body `min-height 286px / max 360px`. Command chip row at the bottom.
- **Behavior:** On scroll into view it auto‑types `whoami`. User taps a chip or types a command + Enter. Commands type out char‑by‑char (38ms), then print lines (90ms stagger). Commands: `whoami · dreamship · flywheel · pedigree · ai · hire · help · clear`. `pedigree` appends a link to `climb.html`; `ai` appends a smooth‑scroll link to `#ai`. Unknown → red "command not found". Respects `prefers-reduced-motion` (no typing). All copy lives in the `COMMANDS` map in `js/ai-forward.js`.

### 4. §01 The centerpiece — Dreamship / Google
- Glass panel, padding `38px`. Heavy display sub‑headline (Bricolage 700, `clamp(24px,3.3vw,38px)`) about the 5–6‑team Google sign‑off; gloss paragraph; **4‑up stat grid**; footnote chip.
- **Stats (count‑up on scroll):** `$35M+` Dreamship revenue · `11x` growth in 2020 ($1.6M→$17M) · `8‑fig` **ad‑spend channel through Google — labeled "not our revenue"** · `4` years EBITDA‑profitable / profitable today. Footnote: ~$85M GMV · 2.3M+ units · 323% CAGR (2019–21). Stat numbers use the green→cyan→violet clip‑text gradient (Bricolage 800).

### 5. §02 Flywheel
- Kicker + headline, then a flex‑wrap row of partner cards (`.partner`, min 140px). First card `.anchor` (Google, tinted mint, gradient name); the rest Stripe / PayPal / Payoneer / Meta / Microsoft, each tagged ANCHOR/THEN. Hover lifts ‑4px.

### 6. §03 Pedigree / Climb
- Kicker + headline, then a 2‑col glass card linking to `climb.html`: left = paragraph (Northwestern Mutual top‑10 nat'l, IBM/Netezza seven‑figure + quota) with a "Walk the climb →" mono link; right = a simple ascending line‑chart SVG (mint stroke, faint fill, cyan + coral node dots). Caption row: NWM → IBM → WibiData → GearLaunch → Dreamship → Courtana.

### 7. §04 AI multiplier — Courtana (compact)
- Kicker + headline "I build the AI workflows that 10x my selling." Two glass cards: Pickle DaaS pipeline (metrics 21K+ clips · $0.0054/clip · 40+ apps/31 repos) and AI‑native GTM (links: Pickle DaaS walkthrough, VibeCo simulator, all work). On Dossier, the **terminal** follows here. `id="ai"`.

### 8. Contact + footer
- Centered: "Let's close something big.", subline of target roles, three pills — `mailto:bill@courtana.com`, LinkedIn, Download résumé. Footer: mono, faint, top border. **No phone number.**

## Interactions & Behavior
- **Scroll reveal:** elements with `.rv` start `opacity:0; translateY(24px)` and transition in at 92% viewport (`.8s` ease). Hard failsafe forces all visible after 1300ms (print/throttle safe).
- **Count‑ups:** `[data-count]` ease‑out over 1100ms when scrolled to; supports `data-pre`/`data-suf`/`data-dec`.
- **Operator bars (Dossier):** hover/click swaps ring center; idle auto‑cycle 2.6s; track widths animate from `data-w`.
- **Terminal:** see §3.
- **All animation gated on `prefers-reduced-motion`.** Spectrum/marquee drifts and the typing effect disable under reduce.
- **Responsive:** hero grids collapse to 1 column ≤880–900px; nav text links hide ≤600px (Email pill stays); terminal font shrinks ≤560px.

## State Management
Minimal/local only — no data fetching. State needed if rebuilt in a framework:
- Terminal: `busy` flag, command‑output log array, boot‑once flag, current input string.
- Operator bars: active index + auto‑cycle timer.
- Reveal/count‑up: per‑element "done" sets (or use IntersectionObserver in the target framework).

## Design Tokens (from `css/ai-forward.css`)
**Color**
- `--bg:#08090a` · `--bg2:#0c0e10`
- `--ink:#f4f6f7` · `--mute:#9aa0a8` · `--faint:#666d74`
- `--mint:#6fefb4` · `--mint2:#4cc890`
- spectrum stops: `--green:#5be8a0` · `--cyan:#36c6e0` · `--violet:#8b7cf0` · `--coral:#ff8a6b`
- `--spectrum: linear-gradient(100deg,#5be8a0 0%,#36c6e0 33%,#8b7cf0 66%,#ff8a6b 100%)`
- glass: `rgba(255,255,255,.045)` / `.025`; lines: `rgba(255,255,255,.09)` / `.16`

**Type** (Google Fonts)
- Display: **Bricolage Grotesque** (700/800) — headlines, stat numbers
- Body: **Hanken Grotesk** (400/500/600/700)
- Mono: **JetBrains Mono** (400/500/600) — eyebrows, kickers, terminal, captions

**Radius / blur / layout:** card radius `22px`, inner media `15px`, pills `99px`; backdrop blur `20px`; content max‑width `1120px`; ease `cubic-bezier(.22,.61,.36,1)`.

**Shadow:** cards `0 40px 90px -44px rgba(0,0,0,.85)`; terminal `0 50px 110px -50px rgba(0,0,0,.9)`.

## Fact discipline (read `content/FACTS.md` — it is the binding ledger)
- **Eight figures = ad spend THROUGH the Google channel, NOT Dreamship revenue.** Keep them distinct and labeled.
- **$35M+ = Dreamship revenue/scale.** EBITDA‑profitable four years; profitable today.
- **$350K Courtana raise is private — never render it.**
- Microsoft/Bing‑ChatGPT deal: keep the dignified framing; do not flex the chemo context.
- Never invent a number. Every value above traces to `FACTS.md` or the sent résumé.

## Assets
- `assets/portrait.jpg` — the "DJ Billygoat" portrait (bold, neon). Used as the Dossier hero default **only as a placeholder** — production should drop in a clean executive headshot. The "fka DJ Billygoat" caption is an intentional easter egg.
- `assets/Bill_Bricker_Resume_Sales.pdf` — the sent résumé; target of every "Download résumé" link and the nav Résumé item.
- `image-slot.js` — the drag‑drop fillable image component used in the Dossier prototype only. Replace with a normal image in production.
- Fonts load from Google Fonts via `<link>` in each HTML head.

## Files
- `console-ai-forward.html` — Console direction (terminal‑led).
- `dossier-ai-forward.html` — Dossier direction (portrait‑forward). Also loads `image-slot.js`.
- `compare-ai-forward.html` — side‑by‑side reviewer harness (iframes both directions). Reference only.
- `css/ai-forward.css` — shared design system + all section styles.
- `js/ai-forward.js` — terminal engine + scroll reveal + count‑ups + operator bars. The `COMMANDS` map holds all terminal copy.
- `content/FACTS.md` — the binding facts ledger.

Open any HTML file directly in a browser to see it live (internet needed for Google Fonts).
