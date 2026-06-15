# Starter prompt — Claude Design: final visual polish of bricker-os

> **How to use:** open a **new Claude.ai Design chat**. Paste the brief below. Attach the assets listed at the bottom (drag in the real photos, the current screenshots, and the two reference HTML files). Run it in parallel with the Claude Code build session.

---

You are my **design lead**, and you're going to wear three hats at once and a fourth to judge:
- a **senior UX/UI designer** (hierarchy, scannability, motion, accessibility, responsive),
- a **graphic / visual-media creator** (the imagery, OG card, app screenshots, a portrait/Loom plan, micro-animations),
- a **visual asset collector/curator** (gather + organize the real media the site is missing),
- all reviewed through the eyes of a **frontier-AI-lab hiring manager / recruiter** doing a 6-second scan and deciding whether to forward it.

## The product
**bricker-os** — Bill Bricker's dynamic résumé / personal OS. Thesis: *"I sell frontier tech, and I build it myself."* The site **is** the proof — an AI-native personal product shipped by a GTM operator. He's positioning for **GTM / partnerships / forward-deployed** roles at frontier AI labs.

- **Live home:** https://picklebill.github.io/Brick/
- **Live "operator console" (v3):** https://picklebill.github.io/Brick/v3/
- **The Climb (career map):** https://picklebill.github.io/Brick/climb.html

## Design system (hold the line)
Near-black `#08090a`; glass cards (`rgba(255,255,255,.045)` fill, `.09` borders, 22px radius); the signature **green→cyan→violet→coral** gradient used for **exactly one phrase per surface** (never as full-page wash); type = **Bricolage Grotesque** (display) + **Hanken Grotesk** (body) + **JetBrains Mono** (terminal/labels). Keep the color + motion energy — a fully "de-slopped" muted pass was rejected as lifeless. Anti-pattern: generic AI-generated UI (Inter + purple gradient + uniform cards).

## What I want from you
1. **A final-polish critique** of the live home + v3, ranked by impact, through the hiring-manager lens — what makes it *forward-worthy* vs. what reads unfinished.
2. **High-fidelity comps** for the 3–5 highest-impact moves (hero, identity card, the VibeCo 6-panel, the data section). Keep them implementable in static HTML/CSS — no framework.
3. **The missing media**, created or speced: a real **portrait** treatment, an **OG share card** refresh, clean **app screenshots** for the VibeCo panels, and a **60–90s Loom** outline (script + shotlist) for an embedded "demo" tile.
4. **One signature motion** per surface (and what to *not* animate), with reduced-motion behavior.
5. A short **handoff back to the build agent**: exact hex/px/timing values and asset filenames, so a Claude Code session can implement without guessing.

Constraints: every claim/number must trace to the fact ledger (I'll provide `content/FACTS.md`); "closed Google as a **partner**," never "sold." Don't invent stats.

## Attach these
- The real photos: **couple (Bill & Kirsten)**, **family-ski**, **sepia family**, **dream-ship-donate** check.
- Current-state screenshots of the live home + v3 (I'll paste them).
- The two reference HTML files: **Design Concepts** and the **Courtana Lobby Display** (for the live-dashboard aesthetic).
- `content/FACTS.md` from the Brick repo.

Start by giving me your ranked critique + the single highest-impact comp, then we'll iterate surface by surface.
