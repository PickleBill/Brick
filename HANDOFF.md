# HANDOFF — Bill Bricker's Dynamic Résumé (Brick)

> **➡️ Start at `ORCHESTRATION.md` (repo root) — that's the live hub now** (surface map, workflows,
> current board, open PRs). This file is kept as the 2026-06-13 convergence-pass history.
> Last updated: 2026-06-13.

---

## North Star (don't lose this)

**One beautiful, fast, shareable URL that gets Bill hired into a GTM / partnership role at a frontier AI lab.** The artifact *is* the proof of the pitch ("I sell AND build"). The win condition is a deliverable Bill is proud to drop into an email or DM — not a sprawl of pages.

**The bar:** would a hiring manager screenshot this and send it to a colleague? Everything that doesn't serve that gets cut.

---

## Convergence pass — 2026-06-13 (this session)

Executed the "CONVERGENCE & POLISH" plan below, code-side. What changed:

- **One front door, four surfaces.** Nav is now identical on every page: **Home · Story · Work · Résumé · Email.** The "Now" page was cut (file + `content/now.json` deleted, unlinked everywhere).
- **Google story folded into Story + terminal.** `google-deal.html` retired (deleted). It now lives as a dedicated **"The Google Partnership" pin** on the Climb (crown-jewel narrative: trust-layer, win-win-win incentives, the Stripe/PayPal/Payoneer/Meta flywheel, and the Microsoft/Bing-ChatGPT deal cut from the chemo chair) and as the `google-deal` STAR in the terminal. Home's case-study CTA repoints into the Climb.
- **Binding ledger corrections (do not regress).** Every "Sold Google" → "closed Google as a partner" across index/work/climb/resume-v2/resume. The Long Walk pin's superseded "twelve weeks of chemo" → "chemo through 2025; operated through treatment; *not the cancer chapter — the figuring-out chapter*" per `the-bridge.md`.
- **Alternates pulled out of the live experience** (archived, not deleted): `home-fn`, `home-warm`, `design-lab/`, minimal `resume.html`. The Home "design archive" link row was removed.
- **Portrait treatment shipped.** The Home hero's abstract ring is replaced by a real portrait frame in the operator card, wired to `assets/portrait.jpg` with a tasteful "portrait incoming" placeholder. **← Bill: drop your headshot at `assets/portrait.jpg` and it goes live.** Highest-leverage remaining move.
- **Number precision:** Home "clips analyzed" → "clips processed" (the precise *analyzed* figure, 4,097, stays in the terminal). See open-numbers list below — still needs Bill's confirmation, not silently picked.

**Still needs Bill (unchanged, and now the critical path):** (1) the portrait at `assets/portrait.jpg` + a 60–90s Loom; (2) custom domain; (3) confirm the ⚠️ numbers in `FACTS.md` — especially **20K+ vs 4,097 clips** and **40+ apps vs 65+ projects**, where the site currently commits to a framing that the ledger still flags.

---

## Current state

- **Live:** https://picklebill.github.io/Brick/ (auto-deploys from `main` via GitHub Actions; custom domain not yet set)
- **Repo:** `PickleBill/Brick` — static HTML/CSS/JS + JSON. No framework. Fast and free.
- **Design system (keep):** near-black `#08090a`, green→cyan→violet→coral gradients, glass cards, 22px radius, Inter + JetBrains Mono. Tokens are duplicated in each page's `<style>`.

### Pages that exist today (with honest triage)

| File | What it is | Verdict |
|------|-----------|---------|
| `index.html` | Home — operator card, stats, company cards | **KEEP** — this is the spine. Needs polish + a real photo. |
| `work.html` | The terminal ("bricker-os") | **KEEP** — the signature interaction. Strongest differentiator. |
| `climb.html` | Career timeline / "the climb" | **KEEP** — good bones; wants real photos at the pins. |
| `resume-v2.html` | Web résumé (primary) | **KEEP** — one résumé. |
| `resume.html` | Minimal/ATS résumé | **MERGE/DEMOTE** — pick one as canonical; keep the other only as a PDF/print export. |
| `home-fn.html`, `home-warm.html` | Alternate home directions | **CUT** from the live nav — archive only. They dilute. |
| `design-lab/` (5 directions) | Exploration sketches | **ARCHIVE** — not linked from the main experience. |
| `google-deal.html` | Google deal case study (added this session) | **REVIEW** — the *corpus* behind it is gold; the standalone page wasn't an explicit ask. Decide: fold the story into Climb/terminal, or keep as one tight case study. |
| `now.html` + `content/now.json` | "Now" page (added this session) | **CUT (recommended).** Bill flagged it as generic. Remove unless it earns its place. |

### The genuinely valuable stuff produced this session (do NOT lose)

1. **`content/FACTS.md`** — the facts ledger. One defensible number per claim, with publicity tags. This is the backbone of a content-first site.
2. **`content/stories/the-bridge.md`** and **`the-google-deal.md`** — real narrative extracted from Bill's own interview answers. The Dreamship→Courtana-through-cancer story and the Google-partnership/Microsoft-from-the-chemo-chair story. **This is the most valuable output of the whole session.** Whatever the site becomes, this corpus feeds it.
3. **The "sold Google" correction** — the old site said "sold to Google"; the truth is a *first-of-its-kind partnership*. Fixed across pages. Don't regress this.
4. **Infra wins:** local assets (no more thum.io/Clearbit flakiness), OG share cards, auto-deploy.

---

## What drifted this session (so the next one doesn't repeat it)

- **The Supabase/vibeco "brain" detour.** The terminal's real-LLM backend lives in a *separate* repo (`vibeco`) and got stuck on a deploy-secret issue. It ate a lot of focus. **Recommendation: park it.** The terminal already works great on its built-in keyword answers. Treat the live LLM as a "nice to have later," and do NOT cross into vibeco unless Bill explicitly wants it. (Status: `ask-bill` function merged to vibeco but not deployed — blocked on a `SUPABASE_ACCESS_TOKEN` repo secret.)
- **Adding surfaces instead of polishing the core.** Two new pages got built without an explicit ask. The lesson for the fresh session: **converge, don't expand.**

---

## The plan for the fresh session (the /design-sync starting point)

**Theme: CONVERGENCE & POLISH. Add nothing new until the core is stunning.**

1. **Pick the one home.** Commit to `index.html`, cut `home-fn`/`home-warm` from nav, archive `design-lab/`. One front door.
2. **Put Bill on the page.** The previous session's handover and the corpus both scream this: *no human is on the site.* One strong portrait (and ideally a 60–90s Loom) outperforms any pixel polish. **This needs Bill, not code.** Highest-leverage single move.
3. **Tighten to 3–4 surfaces, max:** Home · Climb · Terminal · Résumé. Decide whether the Google story is its own page or folded in. Kill the Now page.
4. **Custom domain.** Buy `billbricker.com`, point Pages at it, update the `og:url`/`og:image` absolute URLs in the page heads.
5. **Design-sync pass.** One cohesive polish sweep across the kept pages — consistent nav, consistent motion budget (one signature interaction per page, not motion everywhere), real photo treatment, sub-2s load. Use the vibeco `SKILL_*.md` Impeccable framework as the rubric if desired.
6. **Only then** consider extras (QR card, live terminal brain, analytics).

---

## Open decisions for Bill

1. **Domain name** — `billbricker.com`? (cheapest credibility upgrade)
2. **Photo + video** — willing to add a portrait and a short Loom? (biggest single upgrade)
3. **Google story** — own page, or folded into Climb/terminal?
4. **Now page** — cut it? (recommended)
5. **Live terminal brain** — worth finishing the Supabase deploy, or leave the terminal on its built-in answers? (recommended: leave it for now)
6. **Numbers** — confirm the ⚠️ items in `FACTS.md` (revenue, deal economics, clip counts) and their publicity level.

---

## Guardrails (the riff-raff filter)

- **Don't add pages.** Improve what's there.
- **Don't touch vibeco** unless the live terminal brain is explicitly the goal.
- **Content-first:** every fact comes from `FACTS.md`; never hardcode a new number.
- **Restraint is the aesthetic.** The antidote to "AI slop" is fewer, sharper elements — more whitespace, one idea per screen, real specifics over generated filler.
- The corpus in `content/stories/` is the crown jewel. Mine it; don't bury it.
