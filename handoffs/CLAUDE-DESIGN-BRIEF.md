# Claude Design — PRIMARY session. Final polish of bricker-os.

> **Run this FIRST**, before the Claude Code session. You are the creative lead. Your comps, tokens, and assets get **ported into a Claude Code build session** afterward — so be concrete and implementation-ready (exact hex/px/timing, named asset files). Open a new Claude.ai **Design** chat and paste this; attach the assets listed at the end.

## Wear four hats
A senior **UX/UI designer** + a **graphic / visual-media creator** + a **visual-asset curator** + judged through the eyes of a **frontier-AI-lab hiring manager / recruiter** doing a 6-second scan.

## The product
**bricker-os** — Bill Bricker's dynamic résumé / personal OS. Thesis: *"I sell frontier tech, and I build it myself."* The site **is** the proof — an AI-native product shipped by a GTM operator, targeting **GTM / partnerships / forward-deployed** roles at frontier labs.
- Live home: https://picklebill.github.io/Brick/
- Operator console (v3): https://picklebill.github.io/Brick/v3/
- The Climb (career map): https://picklebill.github.io/Brick/climb.html

## Design system (hold the line)
Near-black `#08090a`; glass cards (`rgba(255,255,255,.045)` fill, `.09` borders, 22px radius); the **green→cyan→violet→coral** gradient (`--spectrum`) used for **exactly one phrase per surface**; type = **Bricolage Grotesque** (display) + **Hanken Grotesk** (body) + **JetBrains Mono** (terminal/labels). Keep the color + motion energy — a fully muted "de-slop" pass was rejected as lifeless. Anti-pattern: generic AI UI (Inter + flat purple gradient + uniform cards).

## Where it stands & the open critiques (Bill's own words, round 4)
The build is functional and on-brand but **the visuals need cleaning up and organizing**. Specifically:
- **The 6-panel "VibeCo engine"** is decent but needs to be cleaned up — even gutters, consistent caption treatment, the featured VibeCo panel reading clearly as #1. Some panels are static screenshots (incl. full-browser-chrome captures) that need clean treatment or replacement.
- **The terminal** is good but was crowded; it's now single-line auto-scrolling "wheels" — pressure-test that interaction and propose the most legible, accessible version (a hiring manager shouldn't have to hunt).
- **Hierarchy & scannability across sections** — headers are two-line now; make the rhythm deliberate. Reduce visual noise; let each section breathe.
- **Identity flip-card** — front is centered with a glowing gradient "Vibe Pusher"; back has stat bars with hover-reveal proof chips + a give-back photo. Make it feel premium, not busy.

## Deliver (concrete, portable to a build agent)
1. **Ranked critique** of the live home + v3 through the hiring-manager lens — what's forward-worthy vs. what reads unfinished.
2. **Hi-fi comps** for the 3–5 highest-impact moves (hero, identity card, the VibeCo grid, the data section). Implementable in **static HTML/CSS** — no framework.
3. **The missing media**, created or spec'd: a real **portrait** treatment, **OG share card** refresh, **clean app screenshots** for the VibeCo panels (replacing the browser-chrome frames), and a **60–90s Loom** outline (script + shotlist).
4. **One signature motion per surface** (and what *not* to animate), with reduced-motion behavior.
5. A **handoff block**: exact hex/px/timing values + asset filenames so the Claude Code session implements without guessing.

Constraints: every number traces to `content/FACTS.md` (attached). "Closed Google as a **partner**," never "sold." Don't invent stats.

## Attach these
- Photos: **couple (Bill & Kirsten)**, **family-ski**, **sepia family**, **dream-ship-donate** check.
- App media: **Freak Show**, **Layup Lab**, **Venue Connect** (the GIFs/clean shots).
- Current-state screenshots of the live home + v3 (paste them).
- The **Design Concepts** reference + the **Courtana Lobby Display** HTML (live-dashboard aesthetic).
- `content/FACTS.md` from the Brick repo.

Start with the ranked critique + the single highest-impact comp; then iterate surface by surface.
