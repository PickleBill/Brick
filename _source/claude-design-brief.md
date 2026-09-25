# Design review brief: Bill Bricker's portfolio site

> Paste everything below the line into Claude Design, and attach the 8 screenshots
> (4 pages × desktop 1440px + phone 375px). Written 2026-09-25, after the Sept 2026 overhaul
> shipped. To refresh the shots: `node tools/shoot.mjs <page> --tag review` per page.

---

## Your role

You're a senior product designer reviewing a live personal portfolio site. Your job is a
**design review with concrete, buildable recommendations**, not a rebuild. The site's code
lives in a GitHub repo and is maintained by a coding agent (Claude Code). Whatever you
recommend will be implemented there, so give specs a developer can apply directly: tokens,
sizes, spacing, order, copy. Mockups of **single sections or components** are welcome.
Please don't hand back a whole-page re-import. A past whole-page redo broke spacing and
interactions, so the repo only takes changes section by section.

## The site

- **Live:** https://picklebill.github.io/Brick/. Open it if you can. The attached
  screenshots show every page at desktop 1440px and phone 375px. The phone shots are one
  long page cut into columns: read top to bottom, then left to right.
- **Pages:**
  - `/` home (the front door)
  - `/work.html` Proof
  - `/climb.html` Story (an interactive career map)
  - `/resume/` Résumé (on-screen digital version, plus a PDF download)
- **Owner:** Bill Bricker, AI-Forward Sales & Partnerships Leader, 3× founder, Raleigh NC.
- **Audience:** hiring managers and GTM leaders at frontier AI labs (Anthropic, OpenAI, etc.),
  plus the recruiters who forward links. Some give it about 6 seconds on a phone. Others
  are a hiring manager reading closely on a laptop.
- **The one job:** make a GTM or partnerships leader think "this person sells *and* builds,
  get him on a call." The page itself is the proof: an AI-native personal product
  shipped by a sales operator.
- **Primary conversion:** "Grab 30 minutes →" (Calendly). Secondary: ask the AI terminal a
  question, download the résumé.

## What's working (keep it)

- **The vibe.** Near-black background, glass cards, green→cyan→violet→coral gradients, real
  motion energy. An earlier all-muted "de-slop" pass killed what made the site feel alive and
  was rolled back. Refine the energy; don't sand it off.
- **The hero line:** "I close the deals the biggest names in tech say yes to." It's locked.
- **The Google story as the centerpiece.** He closed Google as a partner in Dreamship's
  first year.
- **The interactive pieces:**
  - the 3-facet identity card
  - the "Prompt my résumé" AI terminal
  - the Courtana court video with AI stat pop-ups
  - the Climb map

## Current home page, top to bottom

1. **Nav** (sticky, on every page): Story · Proof · Résumé · "Let's talk" button.
2. **Hero.**
   - Left: `<operator-card>`, a holographic 3-facet identity card (builder / pay it forward /
     father) with dots to switch facets.
   - Right:
     - eyebrow "Sales & Partnerships Leader for the AI Era"
     - H1 (above)
     - one-line lede
     - two CTAs: "Grab 30 minutes →" and "Ask my AI anything ↓"
3. **Google** ("I closed Google as a partner. In year one.")
   - a short paragraph
   - three stats: **$45M+** partner ad spend · **$26M** peak revenue · **11x** growth in 2020
   - a logo constellation of other partners: Stripe, PayPal, Payoneer, Meta, Adobe,
     Microsoft
4. **Story card** ("Twenty years, one climb.") links to the Climb page, with a map preview image.
5. **Terminal** ("Don't read the résumé. Prompt it.") A chat-style terminal with suggested
   question chips, a hiring-manager/reference mode, and a paste-a-job-description flow.
6. **Proof** ("I don't pitch the work. I show you the work.") Two cards:
   - **Courtana**, with the autoplaying court video and cycling AI stat pop-ups
   - **Dreamship**
   - Plus a link to the full Proof page.
7. **Contact** ("Let's close something big.")

## What I want your eyes on

Bill's words across review rounds: the site has "an awesome vibe but is a little busy" and
is "still a little text-heavy," with "awkward multi-line" wraps on mobile. Specifically:

1. **Busyness and hierarchy.** What should be quieter, cut, or merged so the eye lands on
   the right three things in the first scroll? Is the section order right for a 6-second
   recruiter?
2. **Mobile at 375px.** Rhythm, type scale, line breaks, tap targets, how the hero card and
   the terminal behave on a phone. Most first looks are forwarded links opened on phones.
3. **Text load.** Where can words become visuals, numbers, or nothing?
4. **The hero.** Does the card + headline + two CTAs read instantly? Is the card pulling
   its weight or competing with the headline?
5. **The proof section.** Is the video card + Dreamship card the strongest possible "show
   me"? Are the stat pop-ups on the video sleek and legible without being noisy?
6. **Consistency across pages.** Do home, Proof, Story, and Résumé feel like one product?
   Look at the nav, footer, cards, type, and spacing.
7. **Motion budget.** Which motion earns its place, and which is noise? Everything must
   still work with `prefers-reduced-motion`.
8. **Accessibility basics.** Contrast on muted text, focus states, and anything keyboard or
   screen-reader users would trip on.

## Design system (current; recommend changes in these terms)

- **Color:**
  - background `#08090a` / `#0d0f11`
  - text `#f4f2ec`, muted `#9aa0a3`, faint `#80878d`
  - accent (sage green) `#6fefb4`
  - cyan `#5ee0d6`, violet `#a78bfa`, coral `#ff8a5c`, amber `#ffb454`
  - signature gradient `linear-gradient(100deg,#5be8a0,#36c6e0 33%,#8b7cf0 66%,#ff8a6b)`
- **Glass cards:** fill `rgba(255,255,255,.045)`, border `rgba(255,255,255,.09)`, radius 22px.
- **Type:**
  - **Bricolage Grotesque** (display, 500–800)
  - **Hanken Grotesk** (body)
  - **JetBrains Mono** (labels, terminal)
  - H1 `clamp(34px,4.8vw,56px)`, H2 `clamp(26px,3.4vw,40px)`, H3 `clamp(20px,2.2vw,28px)`
- **Spacing scale (the only one allowed):** 4 / 8 / 16 / 24 / 40 / 64 / 96 px.
  - One layout container owns the vertical rhythm between sections.
  - Children never add their own compensating margins; that caused the old overlap and
    uneven-gap bugs.
- **Max content width:** 1140px. Phone side gutter 16px.
- **Tech:** plain static HTML/CSS/JS on GitHub Pages; no framework and no build step. The
  identity card is a Web Component with shadow DOM.

## Hard rules (these are integrity rules, not taste)

These come from Bill's facts ledger. If a recommendation would break one, drop it.

- **Numbers:** don't add, change, or round any number. Use only what's already on the site.
  - **$45M+ is partner AD SPEND through the Google channel, never revenue.**
  - **$26M is PEAK revenue.**
  - The two must always stay visibly distinct.
- **Contact:** email `bricker3@gmail.com` + LinkedIn only. **No phone number anywhere on
  the site.**
- **Courtana (2024–2026) is in the past tense.**
  - Never "live," "now," or "currently," and never "shut down."
  - No links to courtana.com.
  - The video is the proof.
- **Banned claims:**
  - "VP-level"
  - "11+ sports"
  - "sub-one-year-old startup" (it's "in year one")
  - any fundraising amount
- **Positioning:** lead commercial, prove with builder. Sales is the headline. AI building is
  the multiplier, never a "developer" identity.
- **Copy suggestions are welcome** (shorter is better), but they must only rephrase or cut
  what's already there.

## What to hand back

1. **Top 5 changes, ranked by impact.** For each one:
   - **Where:** page + section.
   - **Problem:** what's wrong, in one or two sentences.
   - **Change:** exact spec (layout, sizes in the spacing scale, colors from the tokens,
     type, copy before → after), for **desktop and 375px phone**.
   - **Why it helps the one job** above.
   - **Effort:** S / M / L.
2. **A mockup** of the one or two highest-impact sections (hero and proof are the likely
   candidates), as a single-section component.
3. **Quick wins:** a short list of small fixes (spacing, wraps, contrast, alignment).
4. **Keep:** the things you'd explicitly not touch, so they don't get "improved" away.
5. **Cut list:** anything you'd remove outright.

Keep it opinionated. One clear recommendation per issue beats a menu of options.
