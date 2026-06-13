# Brick — Dynamic Résumé Roadmap

**Product:** The living "About Bill Bricker" — a dynamic résumé / personal OS at the center of the Courtana ecosystem.
**Audience (primary):** GTM / partnership leadership at frontier AI labs. (Secondary: investors, venue partners, board/advisory.)
**Current state:** v1 lives at `picklebill.github.io/pickle-daas-data/showcase/v2/` (Home, Climb, Terminal, Résumé). This repo (Brick) becomes the canonical home.

---

## The Thesis

Most portfolios *describe* what someone did. This one **demonstrates** it. Bill's positioning is "sells AND builds" — so the artifact itself is the proof: an AI-native personal product, shipped and visibly alive, built by a GTM operator. Every feature should pass one test:

> Does this make a hiring manager at a frontier lab think "this person already works the way we wish our GTM people did"?

The killer demo is the **real LLM terminal** — "talk to Bill's OS" in a lab interview. Everything else feeds it.

## The Three Pillars

1. **Corpus** (the moat) — structured personal data: facts ledger, stories, voice, media. Single source of truth in `content/`. Site, terminal, PDF, OG cards, and QR card all render *from* it.
2. **Surfaces** — Home, Climb, Terminal, Résumé, case studies, Now page, QR business card.
3. **Aliveness** — the site visibly updates (Now page), responds (LLM terminal), and tells Bill when someone's reading (analytics).

---

## Phase 0 — Foundation (unblock everything else)

- [x] **Migrate the v2 source into Brick** — done 2026-06-12 by mirroring the live GitHub Pages deployment (all pages self-contained; static HTML/CSS/JS + `content.json` architecture preserved).
- [ ] **Enable GitHub Pages on Brick** (Settings → Pages → deploy from `main`, root) — Bill, one click after merge. Then the site lives at `picklebill.github.io/Brick/`.
- [ ] **Custom domain.** Buy `billbricker.com` (or chosen alternative), add CNAME, point Pages at it. Also update the hardcoded `og:url`/`og:image` URLs in the page heads when the domain switches.
- [x] **Kill flaky dependencies.** thum.io screenshots → committed `assets/shots/*.png`; Clearbit logos → real company icons in `assets/logos/`.
- [ ] **Reconcile the numbers.** One defensible figure per metric, everywhere (see `content/FACTS.md` ledger — e.g. 20K+ clips vs 4,097 analyzed).
- [x] **OG share cards** (1200×630) — `assets/og-card.png` generated in the site design system; meta tags wired into index/climb/work/resume pages. Regenerate when the headline stats change.
- [x] **"Sold Google" ambiguity fixed** — meta description + content.json now read "closed Google as a partner" / "won & ran the Google partnership."

**Exit criteria:** the site lives at the custom domain, sourced from this repo, zero third-party runtime dependencies, one set of numbers.

## Phase 1 — Corpus (runs in parallel, never stops)

- [ ] **Run the interview** (`INTERVIEW.md`) — voice memos or text dumps are fine; sessions transcribe into `content/stories/`.
- [ ] **Priority stories** (ranked by narrative value):
  1. **The Bridge** — Dreamship → Courtana, overlapping The Long Walk (cancer treatment). The most human, most differentiating story on the site. Currently completely untold.
  2. **The Google Deal** — the crown jewel; currently 6 terminal lines. Needs full case-study treatment.
  3. **The Builder Turn** — how a career seller became a 65-project vibe-coding ecosystem operator.
  4. **The Manifesto** — "Who can I introduce you to?" networking philosophy.
  5. Origin texture — DJ Billygoat, Northwestern Mutual, IBM/Netezza war stories.
- [ ] **Harvest existing corpus** — mine Claude project handovers, MD files across repos (vibeco docs, pickle-daas-data, past session handoffs) into `content/`.
- [ ] **Media intake** — personal photos, build screenshots, family-appropriate visuals. Real pixels of a real human (handover critique: "people hire faces and voices").

**Exit criteria:** `content/` is the richest single document set about Bill anywhere; the terminal system prompt builds from it.

## Phase 2 — Signature Features

- [x] **Real LLM terminal** — shipped 2026-06-13. `ask-bill` edge function in the vibeco Supabase project (Claude 3.5 Sonnet via `bill-qa` route, per-IP rate limit, 400-token cap) reads the corpus from `content/index.json` at runtime — corpus updates need no redeploy. `work.html` calls it for free-text questions with graceful fallback to the keyword engine. Deep links supported: `work.html?q=why+pickleball` / `?cmd=whoami` (QR card ready).
- [~] **Portrait on Home** — shipped 2026-06-13: the hero operator card now frames `assets/portrait.jpg` (placeholder until Bill drops the file). The single highest-leverage remaining move.
- [ ] **60–90s Loom/video** of Bill walking the dashboard — embedded on Home. Outperforms every polished pixel.
- [ ] **QR business card** — a 🥒 physical card whose QR opens the terminal directly (`/work?cmd=whoami` style deep link). Memorable in person.
- [ ] **Personal photos woven into Climb** — the paper-aesthetic timeline gains real images at key pins.

## Phase 3 — Editorial Layer

- [x] **Google deal — folded into Story + terminal** (decided 2026-06-13: a dedicated "The Google Partnership" Climb pin + the `google-deal` terminal STAR, rather than a standalone page). Standalone `google-deal.html` retired. Editorial single-column expansion remains optional if a lab audience wants the long form.
- [x] **The Bridge as a Climb pin + terminal answer** — the Long Walk pin now tells the Dreamship→Courtana story honestly (step-back with the Google deal in flight, treatment, present-tense "figuring-out chapter"). Corpus: `the-bridge.md`.
- [ ] **Networking Manifesto + "How We Win"** as quiet serif essay pages.
- [x] **"Now" page — CUT** (decided 2026-06-13: flagged generic; removed to converge on four surfaces).

## Phase 4 — Distribution & Polish

- [ ] Visitor analytics (Plausible free tier) — know when a recruiter is reading; follow up same day.
- [ ] PDF/ATS résumé export generated from `content/`.
- [ ] LinkedIn profile aligned to the site's positioning + outreach templates.
- [ ] Impeccable-style design audit (vibeco `SKILL_*.md` framework) — kill anything that reads "generic AI interface."

---

## Decisions Needed from Bill (the back-and-forth queue)

| # | Decision | Recommendation |
|---|----------|----------------|
| 1 | Domain name + purchase | `billbricker.com` |
| 2 | ~~Prominence of The Long Walk / chemo story~~ | **DECIDED 2026-06-12: very public** — full story goes into the public narrative. See `content/stories/the-bridge.md`. Open: keep the "Long Walk" name (Bill redefined it as present-tense). |
| 3 | Which numbers are public-safe (Google deal terms, revenue, raise amounts) | Interview will produce a "public / blur / private" tag per fact |
| 4 | Photo + video comfort level | At minimum: one good portrait, one 60–90s Loom |
| 5 | Primary audience ranking (lab GTM role vs. founder/fundraise vs. advisory) | Lab GTM first — it sharpens every headline |

## Design Guardrails (carried from v2 handover)

Near-black `#08090a`; green→cyan→violet→coral gradients; glass cards `rgba(255,255,255,.045)` fill / `.09` borders; sage accents; 22px radius; 20px blur; Inter + JetBrains Mono (Spectral + Caveat on Climb). Motion: drifting meshes, scroll reveals, count-ups, hover glows. Anti-pattern: anything that looks default.
