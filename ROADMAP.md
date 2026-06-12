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

- [ ] **Connect `pickle-daas-data` to a Claude session** and migrate the v2 source into Brick (keep the static HTML/CSS/JS + `content.json` architecture — do NOT rewrite in React; static is fast, free, and working).
- [ ] **Custom domain.** Buy `billbricker.com` (or chosen alternative), add CNAME, configure GitHub Pages on Brick. "picklebill.github.io/pickle-daas-data/showcase/v2" reads borrowed; the domain is the cheapest credibility upgrade on the board.
- [ ] **Kill flaky dependencies.** Replace thum.io screenshots and Clearbit logos with committed local PNGs/SVGs.
- [ ] **Reconcile the numbers.** One defensible figure per metric, everywhere (see `content/FACTS.md` ledger — e.g. 20K+ clips vs 4,097 analyzed).
- [ ] **OG share cards** (1200×630) so LinkedIn/iMessage unfurls look premium from day one of the new domain.

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

- [ ] **Real LLM terminal.** Swap keyword matching for a Claude Haiku endpoint with the corpus as system prompt. Recommended: a Supabase Edge Function in the existing vibeco project (infra + `ANTHROPIC_API_KEY` already exist) following the `_shared/llm-client.ts` pattern; CORS locked to the custom domain; rate-limited; capped tokens. This is the demo that closes interviews.
- [ ] **60–90s Loom/video** of Bill walking the dashboard — embedded on Home. Outperforms every polished pixel.
- [ ] **QR business card** — a 🥒 physical card whose QR opens the terminal directly (`/work?cmd=whoami` style deep link). Memorable in person.
- [ ] **Personal photos woven into Climb** — the paper-aesthetic timeline gains real images at key pins.

## Phase 3 — Editorial Layer

- [ ] **Google deal case-study page** — editorial single column, pull quotes, the full mechanics. Highest-status artifact for lab audiences.
- [ ] **The Bridge as a Climb pin + terminal answer** — telling the Dreamship→Courtana story honestly (board chair transition, treatment, the pull of building again).
- [ ] **Networking Manifesto + "How We Win"** as quiet serif essay pages.
- [ ] **"Now" page** — JSON-driven monthly shipping log. Recruiters return to alive things.

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
