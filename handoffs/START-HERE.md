# START HERE — bricker-os handoff (two parallel sessions)

You're picking up Bill Bricker's personal site (`picklebill/Brick`, live at **https://picklebill.github.io/Brick/**). This session built rounds 1–4; it's near context capacity, so the work continues in **two fresh sessions you can start at the same time.**

## The workflow (order matters)
1. **Claude Design session — PRIMARY. Run this FIRST.** It's the creative lead: it audits the live site, produces final-polish comps + the missing media (portrait, OG, app shots, a Loom), and returns concrete tokens (hex/px/timing) + asset files. → paste **`CLAUDE-DESIGN-BRIEF.md`**.
2. **Fresh Claude Code session — the builder.** It (a) sets up Bill's environment first (the file-access gap, MCPs, Codex, "Bill OS"), then (b) **ingests the Claude Design output** and builds out the remaining backlog. → paste **`CLAUDE-CODE-SESSION.md`**.

So: **Design decides, Code implements.** Run Design first, let it produce direction + assets, then port those into the Code session.

## Where things stand (as of 2026-06-15, round 4)
**Live & working:** hero, identity flip-card (gradient "Vibe Pusher", hover-logo bars), `brick.os` terminal with a real LLM backend (ask-bill + `tailor`/reference-check hiring modes) + mobile nav, green stats band, two companies, **6-panel VibeCo**, Pickle-DaaS video band, dynamic Climb preview, contact. Plus `v3/` (operator console) and `climb.html`.

**Just shipped (round 4):** unbroke "Forward-deployed", restored the "Vibe Pusher" gradient, fixed the mobile card bleed, "Ask it."→"Prompt it.", terminal command rows are now single-line auto-scrolling "wheels," and **Freak Show + Layup Lab** added to VibeCo (static frames).

## Asset inbox (still needed from Bill)
- **Couple photo ("Bill & Kirsten")** — for the card front. Pending in Google Drive `_intake MEDIA` (needs a Drive approval, or attach as a file).
- **Animated GIFs** for VibeCo hover — the CleanShot links only exposed **static frames**, so Freak Show / Layup Lab / Venue Connect are currently still images. To animate, Bill should attach the real **`.gif` or `.mp4`** files (or Drive links). Hover-swap wiring (`data-gif` on `.vpanel`) is already in place — just drop a URL in.
- **Real URLs** for Freak Show (currently a best-guess Lovable link) and confirm Layup Lab (`layuplab.lovable.app`).

## Backlog (for the Code session, after Design)
See `CLAUDE-CODE-SESSION.md` → Part 3. Headline item: the **Pickle-DaaS gallery modal** (live dashboard lightboxes), plus whatever Design hands back.

## Ground rules
- Content-first; every claim traces to `content/FACTS.md` (⚠️ = unconfirmed). "Closed Google as a **partner**," never "sold."
- Design guardrails in `CLAUDE.md`. Keep the color + motion energy (a muted "de-slop" pass was rejected).
- Bill works via voice memos / bullet dumps; the session structures. Auto-merge of clean, green roadmap PRs is authorized.
