# v3 — "bricker.os, the live operator console"

_Built overnight 2026-06-15. A from-scratch, orthogonal reimagining of the site — research-led, then designed through a 4-lens advisory board. Live (unlinked) at **`/Brick/v3/`** so you can click through it before deciding whether to promote it._

> **Why a v3 at all?** v2 is a beautiful *marketing page* (glass cards, scroll, a terminal as one act). v3 is a different **axis**: the AI *is* the interface, the page is **instrumented** (live data), and it **re-tailors itself to whoever's reading it.** The thesis collapses into the medium — you're standing inside a production AI product I built, and it proves each claim as it answers.

---

## The 6-second bet
**Name → one line → one spectrum verb → a console already answering.** A frontier-lab hiring manager should, in one breath, get: _"I sell frontier tech and I build it myself,"_ see it's a live AI product, and be able to **interrogate it**. The share trigger is the juxtaposition no one else can post: _closed Google as a partner · $35M+ · solo AI builder · built through cancer._

---

## What's live in v3 (all working, all verified)
1. **The console hero.** A self-booting `ask-bill` terminal as the centerpiece — runs commands *and* free-text questions, grounded in the FACTS ledger, with a local fallback so it never dies. Instrument aesthetic: dot-grid + scanline field, JetBrains-Mono-led, the green→cyan→violet→coral **spectrum reserved for exactly one phrase** ("build it myself").
2. **★ Hiring-Manager Mode (the signature).** Type _"Partnerships Lead at Anthropic"_ → the console **tailors the case for that exact role**, streaming a custom pitch. The site reconfigures itself for the reader — proving AI-native fluency *and* GTM instinct in one move. (Falls back to a strong templated pitch if the endpoint is cold.)
3. **The "sells / builds" split.** Two panes resolve the only question that matters — _"can you really do both?"_ — at a glance: **Sells** (Google-as-partner, $35M+, 11x, enterprise) / **Builds** (40+ apps, 31 repos, $0.0054/clip).
4. **The ledger, in the open + "prove it" receipts.** Every load-bearing number is a button → opens a drawer with the full context, source, and a `"partner, not sold"`-style tag. _Grounded, every number traceable_ — the single most credible thing you can show an AI lab.
5. **Live heartbeat.** Pulls your latest public GitHub push → "last shipped 4h ago" in the status bar; `what did you ship this week?` lists real recent commits. The build has a pulse.
6. **Fun / playful endpoints.** `chuck` (Chuck-Norris API, Bricker-flavored), `advice`, `billygoat`, `sudo hire-bill` (gag → mailto), and a **↑↑↓↓←→←→ba konami** "DJ Billygoat mode." The energy you asked for.
7. **Forward-ready close.** "Hiring forward-deployed? Let's talk this week." + a one-click **copyable forward line** so a hiring manager can paste you to their VP in one move.
8. Full a11y (reduced-motion honored everywhere, keyboard, ARIA-live console, focus rings), fast (no framework, inline critical CSS), graceful edge states.

---

## The research that shaped it (deep-research, 9 agents, cited)
**The market is begging for your exact profile.**
- GTM is the **#1 hiring category** at the labs — ~1-in-5 roles at OpenAI, ~20% at Anthropic. ([gtmnow](https://gtmnow.com/anthropic-and-openai-are-hiring-gtm-roles-more-than-anything-else/))
- The role they hire "most aggressively" is the **Forward-Deployed / GTM Engineer** — _"the line between selling and building has collapsed."_ That **is** you. ([getperspective](https://getperspective.ai/blog/why-every-ai-startup-needs-forward-deployed-engineering-function-2026), [paraform](https://www.paraform.com/blog/forward-deployed-ai-engineer))
- **Portfolio-with-receipts beats résumé;** ~37% of employers no longer trust credentials; cold outreach **+ a real artifact** gets "orders-of-magnitude" higher response. The site should BE the artifact you forward. ([developia](https://developia.substack.com/p/the-ai-hiring-revolution-why-resumes), [hirearcher](https://hirearcher.com/blog/how-to-get-hired-at-an-ai-startup-in-2025), [interviewing.io](https://interviewing.io/blog/how-to-get-in-the-door-at-top-companies-cold-out-reach-to-hiring-managers-part-2))

**Design: how to be *shareable* without "AI slop."**
- AI-slop tell = Inter + purple→blue gradient + uniform cards. Break the font + the gradient. (You already do — Bricolage/Hanken/Mono + the 4-colour spectrum; v3 leans further into mono/instrument.) ([925studios](https://www.925studios.co/blog/ai-slop-web-design-guide), [standardbeagle](https://standardbeagle.com/the-year-ai-generated-interfaces-took-over/))
- **The site IS the proof, one bold gimmick, executed with restraint.** Bruno Simon's drivable car, Robby Leonardi's platformer — the interaction *is* the work sample. Developer-native metaphors (terminals, `npx`, VS Code skins) travel. ([figma](https://www.figma.com/resource-library/portfolio-website-examples/), [Codrops](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/))
- **Grounded, honest AI wins:** RAG over real content, page-aware, injection-hardened, "expert system about me" not a clone. **ChatJC** and **VAi** (real job-seekers' résumé bots) reportedly converted interviews above cold applies. ([rye.dev](https://rye.dev/blog/building-ask-rag-portfolio-chatbot/), [CNBC](https://www.cnbc.com/2026/04/30/these-2-job-seekers-built-ai-chatbots-to-talk-to-recruiters-for-them.html))
- **Cite every claim; respect publicity tags as a visible feature** — for an AI-lab audience, "no hallucinations, every number traceable" is the flex. ([vishalbakshi eval harness](https://vishalbakshi.github.io/blog/posts/2025-06-26-portfolio-llm/))
- Core Web Vitals + `prefers-reduced-motion` handling = credibility signals to a technical eye. ([joshwcomeau](https://www.joshwcomeau.com/animation/scroll-driven-animations/), [web vitals](https://www.corewebvitals.io/core-web-vitals))

---

## The advisory board, distilled (your "many permutations")
Four lenses brainstormed in parallel; the convergent picks became v3. The rest is your menu.

**Already in v3:** Hiring-Manager Mode · prove-it receipts/ledger · sells÷builds split · live GitHub heartbeat · `chuck`/konami/`sudo hire-bill` · forward-ready close · the FDE positioning + "this site is the proof" hook.

**The menu — high-impact ideas not yet built (pick what you love, I'll ship them):**
- **Reference-check roleplay** — `reference-check` boots the AI playing a former Dreamship/Google-era colleague answering "would you hire him again?" — grounded, humanizing, sidesteps self-praise.
- **Mock partnership negotiation** — `negotiate`: a 4-turn sim where the AI plays a skeptical BD lead and you watch the GTM instinct live, ending in a scorecard.
- **Lens toggle** — `--exec / --eng / --investor`: the same answers re-pitched for each reader (the <3-min recruiter reality).
- **Recruiter / engineer / founder views** — the page re-orders which proof leads, by who's reading.
- **Cover-note typewriter** — paste a JD → a tailored 4-sentence note types itself live; `diff <JD>` highlights overlap/gaps.
- **Published eval harness** — open-source a test suite + live scoreboard for the résumé bot. For a *GTM-who-builds* role aimed at a lab, eval rigor is itself the flex.
- **`npx billbricker`** — a résumé that streams in the recruiter's own terminal, then drops the link. Novel distribution, lands in the engineer's daily environment.
- **"Attacks deflected" log** — show the prompt-injection attempts the bot blocks. Demonstrating you ship *safe* AI surfaces is uniquely on-thesis for a frontier lab.
- **Reactive particle/cursor field** (reduced-motion-gated) — keep the energy without a full 3D scene.
- **Voice input** (Web Speech API) — ask by talking.

---

## Honest notes / decisions for you
- **v3 is live but unlinked.** The public root (`/`) is still v2. Nothing about v3 is exposed to a hiring manager unless they open `/Brick/v3/`. Promote it (or merge ideas back into v2) whenever you're ready — your call.
- **Ledger ⚠️ items still apply** (same list as `BUILD-LOG.md`): the 36 courts / $35M+ / GMV / phone-on-site / etc. v3 surfaces them exactly as the ledger has them; confirm or correct and I'll update once.
- **The biggest single upgrade is still a real portrait + a 60–90s Loom.** v3 doesn't lean on a portrait (it's a console), but a Loom would be a killer `demo` command.
- **Network:** the console's live calls (ask-bill, GitHub, Chuck Norris) all degrade gracefully — if any endpoint is cold, you get a strong canned answer, never a broken state.

**The bar I built to:** _would a frontier-lab hiring manager screenshot it and forward it with a comment?_ The comment I'm aiming for: _"this guy built a thing that interviews him better than I could."_
