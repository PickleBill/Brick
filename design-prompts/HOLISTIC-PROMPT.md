# Claude Design prompt — Brick holistic one-pager (`v3.html`)

Paste everything below the line into Claude Design to regenerate or refine the one-page site. It is self-contained.

---

You are designing **`v3.html`** for Bill Bricker's dynamic résumé ("bricker-os"). Output **one self-contained static HTML file** — inline `<style>` and `<script>`, no framework, no build step, deployable as-is to GitHub Pages. It must feel cinematic, alive, and premium — the artifact itself is the proof that Bill "sells AND builds."

## Hard rules (do not break)
1. **Design tokens (`:root`):**
   ```
   --bg:#08090a; --glass:rgba(255,255,255,.045); --line:rgba(255,255,255,.09);
   --text:#f4f2ec; --mute:#9aa0a3; --faint:#5c6164;
   --sage:#8cf0a0; --cyan:#5ee0d6; --teal:#3fd6c8; --violet:#a78bfa; --purple:#b18bff; --coral:#ff8a5c; --cream:#f3ecdc;
   --green:#6fefb4; --blue:#7fb0e8; --amber:#e6b86e; --term:#d8ddd6; /* terminal palette */
   --sans:'Hanken Grotesk'; --disp:'Bricolage Grotesque'; --mono:'JetBrains Mono';
   ```
   Glass cards: `--glass` fill, 1px `--line` border, **22px radius**, `backdrop-filter:blur(20px)`. Near-black canvas with 4 drifting blurred mesh blobs (green / violet / cyan / coral).
2. **One gradient, one phrase, one page.** The full **green→cyan→violet→coral** flowing gradient is reserved for **exactly one phrase on the whole page** — the hero thesis verb "**Interrogate it.**" Everything else is flat **mint** (`--sage`) or **mono**. Small 2-stop mint→cyan accents are OK for section brand words; never spray the full 4-stop spectrum elsewhere.
3. **Every number renders from the facts ledger** (below). Never invent. Specifically: **"closed Google as a partner"** — NEVER "sold/acquired." **"21,000 clips processed / 4,097 fully analyzed."** **"40+ AI apps across 31 repos"** — never "65+."
4. **Accessibility:** reveal-on-scroll with a 2.5s failsafe; honor `prefers-reduced-motion` for every animation (mesh, typewriter, count-ups, hover).

## The facts ledger (load-bearing claims)
- Bill Bricker · Raleigh, NC · father of three · fka DJ Billygoat · bricker3@gmail.com · 908-601-8152 · linkedin.com/in/williambricker
- Closed **Google** as a partner — a first-of-its-kind cross-division partnership, an **8-figure** ad-spend channel — while Dreamship was a **sub-one-year-old** startup; it **ran 5+ years**, then Stripe/PayPal/Payoneer/Meta followed. (NOT an acquisition.)
- **Dreamship:** cofounder/CEO 2018–25, **$35M+** revenue, **11x in a single year**. Cut the Microsoft/Bing-ChatGPT merchant deal from a chair at Duke mid-chemo.
- **Courtana:** founder/CEO 2023→now, AI smart-court SaaS, **36 courts** live/piloting, **11+ sports**.
- **VibeCo:** 11 AI agents, idea → brief → build prompts → working app. **40+ apps across 31 repos.**
- **Pickle DaaS:** **$0.0054/clip** (~7x cheaper than GPT-4o), **21K clips processed / 4,097 analyzed**.
- IBM/Netezza 2012–14: 7-figure deals, >100% quota. 3 startups. 20 years operating.
- The Long Walk: diagnosed 2023, chemo through 2025, the pipeline kept moving — present-tense "figuring-out" chapter, not the cancer chapter.

## Page structure (single vertical scroll)
Sticky nav (`🥒 Bill Bricker` brand). Links: **Home**→`#top`, **Story**→`climb.html` (out), **Work**→`#proof` (in-page), **Résumé**→`resume-v2.html` (out), **Email**→`mailto:`. Add `scroll-margin-top:80px` to `header#top` and every `section[id]`.

1. **HERO (`#top`)** — two columns.
   - *Left:* eyebrow "Pickle-Bill Bricker · fka DJ Billygoat" (pulsing dot); h1 **"Don't read the résumé."** + `<span class="g">Interrogate it.</span>` (the one spectrum phrase); ONE short lede sentence; CTAs "Ask my OS ↓" (focuses the terminal input) and "Walk the climb"→`climb.html`.
   - *Right:* ONE glass "bricker-os" window stacking, top→bottom: (a) macOS title bar — traffic-light dots + `bill@bricker-os : ~` + pulsing "online"; (b) **portrait banner** (`assets/portrait.jpg`, 16:9, `object-position:center 32%`) with an `onerror` placeholder and two pills: "in the room" (top-left, pulsing) and "Bill Bricker · Raleigh, NC · father of three" (bottom-left); (c) the **terminal screen**; (d) input bar `➜ ~ [ask me anything…] ↵ run`; (e) a single static chip tray labeled "what else to ask →".
2. **Stat band** (below hero): 6 count-up tiles — 11x · $35M+ · 8-fig Google · 40+ apps · 21K clips · 3 startups. Flat mint numbers with a soft glow (NOT the full spectrum).
3. **`#proof` — Proof of work.** A restrained **proof wall**: 6 real screenshot tiles (`assets/shots/*.png`) as glass cards with **mono captions** ("proof you can see beats proof you click"). Then **two standalone company "paths"** (full-width alternating image/body cards, each its own CTA): **Courtana** (teal, 36 courts / 11+ sports) and **Dreamship** (purple, $35M+ / 11x / Google channel 5+ yrs).
4. **`#vibeco` — The engine.** VibeCo hero card + a **six-pane grid** of app tiles (use `assets/shots/venue-connect.png`, `naughtydata.png`, `litigator.png`; placeholders for HeadsUpTime / LayupLab / FreakFoSho) + "browse the full ecosystem" strip.
5. **`#pickle` — The tech proof.** Pickle DaaS split card: image + body, metrics (21K / $0.0054 / 31 repos), dashboard chips.
6. **`#story` — The person.** A teaser card linking out to `climb.html`.
7. **`#contact`** — "Let's build something that matters." + email / phone / LinkedIn pills. Footer.

## The terminal (the centerpiece — "boot on arrival")
Port a hybrid terminal into the hero window:
- **On load,** auto-run `whoami` with a typewriter effect (60ms/char, instant under reduced-motion), then leave a blinking cursor on a fresh prompt. The chips are "what else to ask."
- **Built-in commands** (instant, formatted HTML with mono syntax colors — mint `--green` prompts/ok, blue keys, amber STAR labels): `help, whoami, ls, companies, google-deal, sales-gtm, enterprise, builds, pickle-daas, stats, git log, ask <q>, contact, clear`. Use the ledger copy above for each.
- **Free-text questions** POST to the live LLM brain: `https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill` with `{question, history:last6}`, 20s AbortController timeout. On failure, fall back to a local keyword Q&A set (lab/Google/vibe-coding/pickleball/superpower/cancer/family/availability/Dreamship/IBM/stack/DJ-Billygoat).
- **Deep links:** `?cmd=whoami` or `?q=why+pickleball` auto-run on load (for QR business cards).
- Keep it **uncrowded:** one short screen (~30vh), a single static chip row (not a scrolling marquee).

## Assets (wire these paths)
`assets/portrait.jpg` (hero face; graceful `onerror` placeholder), `assets/og-card.png`, `assets/logos/{courtana,dreamship}.png`, `assets/shots/{courtana,dreamship,vibeco,venue-connect,naughtydata,litigator,brand-intelligence}.png`. Lazy-load all images with `onerror` fallbacks.
