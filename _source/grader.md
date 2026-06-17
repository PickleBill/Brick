# _source/grader.md — the v4 prompt grader ("are we there yet?")

> Run after every render of the v4 front door. Inputs: the desktop + 375px screenshots
> (`tools/shoot.mjs`), the live URL, and `_source/facts.md`. Built from Bill's success bar
> (2026-06-17 interview). Use as a self-check, hand to an LLM judge, or pair with `/review-site`.
>
> **Three quality dimensions, 0–5 each. Plus one hard GATE that overrides everything.**
> **Target: every dimension ≥ 4 AND the GATE passes.** Anything below → ranked fix list, re-render, re-grade.

---

## ⛔ GATE — facts & guardrail integrity (binary, must PASS)
Auto-FAIL the entire grade if ANY is true (scan rendered HTML + copy against `_source/facts.md`):
- A **phone number** appears anywhere in the HTML/surface.
- **`$350K`** raise · **"11+ sports"** · **"sub-one-year-old startup"** is rendered.
- **`$45M+` reads as revenue** (must read as ad spend / channel), or `$45M+` and `$35M+` are conflated.
- A number on a surface **isn't in `_source/facts.md`**, or **"8-fig" labels the Google channel** (that's the McKesson enterprise deal).
- A **résumé link** points anywhere but `assets/Bill_Bricker_Resume_vFinal.pdf`.
- Google sign-off reads **"director"** (must be **VP-level**).

PASS = none of the above. Non-negotiable — this is facts.md Tier A.

---

## 1. Forward-able — would a frontier-lab GTM hiring manager screenshot & forward it?
- **5** — In 6 seconds the claim + the proof + "this one's different" all land; I'd forward it unprompted.
- **4** — Clearly forward-worthy; one beat could be sharper.
- **3** — Credible but generic; I'd read it, not forward it.
- **2** — Mixed signals; the "sells AND builds" thesis doesn't pop.
- **0–1** — Reads like a template résumé site.
- *Look for:* hero claim legible instantly · commercial-first with builder as the multiplier · the live terminal as proof · zero filler.

## 2. Flawless rhythm & mobile — the recurring bug, gone
- **5** — One spacing scale; every gap intentional; zero overlap / crammed / floating; pixel-clean at 375px.
- **4** — Rhythm consistent; one or two minor gaps to tune.
- **3** — Mostly fine; a couple of uneven or cramped transitions.
- **2** — Noticeable overlap / inconsistent gaps / a mobile break.
- **0–1** — The old problem: things collide or float; mobile broken.
- *Look for:* consistent section rhythm · no compensating child margins · flip card / terminal / grids don't overflow or shift · 375px has no horizontal scroll and no clipped text.

## 3. Alive, not slop — distinctive energy, not generic-AI
- **5** — Color + motion read as a deliberate identity ("prompt the résumé"); nothing looks like a default AI template; one signature moment (the terminal) earns the attention.
- **4** — Distinctive and alive; motion budget disciplined.
- **3** — Pleasant but could be any dark-glass AI site.
- **2** — Generic gradient-on-black; motion feels decorative / random.
- **0–1** — Obvious AI-slop tells.
- *Look for:* restrained motion (one orchestrated moment) · color as identity not decoration · type hierarchy with personality · no stocky filler.

---

## Output format (every run)
```
GATE:            PASS / FAIL  (list each violation if FAIL)
Forward-able:    N/5 — one line why + the single highest-leverage fix
Rhythm & mobile: N/5 — "
Alive, not slop: N/5 — "
VERDICT:         SHIP  /  FIX → top 3 ranked fixes, each mapped to file:line
```
Then: fix the top items → re-render → re-grade until **all ≥ 4 and GATE = PASS**.
