# Claude Design prompt — Brick holistic one-pager (clean editorial direction, `v4`)

Paste everything below the line into Claude Design. It's self-contained. Goal: take **all of Bill's existing content** and render it in the **clean, editorial, label-and-image-back-and-forth rhythm** of the "Brick — Design Concepts" deck. Less is more — kill crowding, let it breathe.

---

You are designing **`v4.html`** for Bill Bricker's dynamic résumé ("bricker-os") — a single, shareable, scrolling one-pager. Output **one self-contained static HTML file** (inline `<style>`/`<script>`, no framework, no build step), deployable to GitHub Pages. The whole site is the proof that Bill "sells AND builds." Make it **super clean and uncrowded** — generous whitespace, one idea per section, an editorial rhythm of alternating text/label and image.

## Hard rules
1. **Tokens (`:root`):** `--bg:#08090a; --glass:rgba(255,255,255,.045); --line:rgba(255,255,255,.09); --text:#f4f2ec; --mute:#9aa0a3; --sage:#8cf0a0; --cyan:#5ee0d6; --teal:#3fd6c8; --violet:#a78bfa; --purple:#b18bff; --coral:#ff8a5c; --cream:#f3ecdc; --green:#6fefb4; --blue:#7fb0e8; --term:#d8ddd6;` Fonts: **Bricolage Grotesque** (display), **Hanken Grotesk** (body), **JetBrains Mono** (terminal/labels). Glass cards: 22px radius, `blur(20px)`, 1px `--line`. Near-black canvas, a few soft drifting mesh blobs.
2. **One gradient, one phrase, one page.** The full green→cyan→violet→coral flowing gradient appears on **exactly one phrase** — the hero "**Interrogate it.**" Everything else is flat mint or mono (small 2-stop mint→cyan accents OK).
3. **Render every number from the ledger** (below). Never "sold/acquired" Google — "**closed Google as a partner**." 21,000 processed / 4,097 analyzed. 40+ apps / 31 repos (never 65+).
4. **Clean > dense.** No tile-soup. Prefer a few large, confident sections over many small cards. Honor `prefers-reduced-motion`; reveal-on-scroll with a failsafe.

## Hero (the centerpiece) — flip-card + padded terminal, lots of air
Two columns, generous gap and padding. Elegant and uncrowded.
- **Left — identity flip-card** (glass, click to flip):
  - *Front:* a small mono eyebrow ("Pickle-Bill Bricker · fka DJ Billygoat"), then the **big bold headline** (live copy) **"Frontier tech evangelist, vibe pusher, 0→1 builder."** with the full spectrum on **"vibe pusher,"** (the one spectrum phrase on the page), a mono subline "enterprise seller → founder-CEO", and below it **Bill's vertical portrait** (`assets/portrait.jpg`) generously padded inside the card with an "● in the room" pulse and a "flip for the operator profile" hint.
  - *Back (on click):* **the operator profile** — "OPERATOR PROFILE · Raleigh, NC · father of three", a cycling readout, and **5 animated skill bars** (Enterprise & partnership GTM · Zero-to-one building · AI-native product · Founder-led sales · Connector & BD) with mint→cyan/violet/coral gradient fills that count up and auto-rotate the readout. Smooth 3D flip; bar clicks don't flip; a "click to flip" hint.
- **Right — the live terminal in a padded glass view** (the user specifically wants padding around the terminal): a small `bill@bricker-os — the résumé, interrogated` header, the screen, a minimal input line, a single "what else to ask" chip row, and CTAs. Boots `whoami` on arrival.
- On mobile, stack: flip-card (copy + face) → terminal.

## The terminal (hybrid, live)
Boots `whoami` on load (typewriter; instant under reduced-motion), leaves a blinking prompt. **Built-in commands** (instant, mono syntax colors): `help, whoami, ls, companies, google-deal, sales-gtm, enterprise, builds, pickle-daas, stats, git log, ask <q>, contact, clear`. **Free-text** POSTs to `https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill` (`{question,history:last6}`, 20s timeout) with a local keyword-Q&A fallback. **Deep links:** `?cmd=` / `?q=` auto-run (for QR cards).

## Body — clean alternating editorial flow (like the Design Concepts deck)
Each section: a small mono kicker label (01, 02, 03…), a confident heading, one short line of copy, and a large image/screenshot — **alternating sides** down the page. Lots of air.
1. **Stat band** (one clean row): 11x · $35M+ · 8-fig Google · 40+ apps · 21K clips · 3 startups (count-ups, flat mint).
2. **01 · Two companies, both live** — **Courtana** (text left / image right) and **Dreamship** (image left / text right) as full-width standalone "paths," each with its own metrics and CTA.
3. **02 · The engine — VibeCo** — a centered hero card + a tidy grid of app shots (Venue Connect, NaughtyData, Litigator + more), airy. "40+ apps across 31 repos."
4. **03 · The tech proof — Pickle DaaS** — split image/text: 21K processed / 4,097 analyzed / $0.0054 per clip / 31 repos, dashboard links.
5. **04 · The person** — a quiet teaser linking out to the Climb (`climb.html`).
6. **Contact** — "Let's build something that matters." + email / phone / LinkedIn.

## Facts ledger (load-bearing)
Bill Bricker · Raleigh, NC · father of three · fka DJ Billygoat · bricker3@gmail.com · linkedin.com/in/williambricker. **Closed Google as a partner** (first-of-its-kind cross-division partnership, 8-figure channel, ran 5+ years; Stripe/PayPal/Payoneer/Meta followed) while Dreamship was sub-one-year-old — NOT an acquisition. **Dreamship:** cofounder/CEO 2018–25, $35M+, 11x in one year; cut the Microsoft/Bing-ChatGPT deal from Duke mid-chemo. **Courtana:** founder/CEO 2023→, 36 courts live/piloting, 11+ sports. **VibeCo:** 11 agents, 40+ apps / 31 repos. **Pickle DaaS:** $0.0054/clip, 21K processed / 4,097 analyzed. IBM/Netezza 2012–14, 7-figure deals, >100% quota. 3 startups, 20 years.

## Assets
`assets/portrait.jpg` (vertical hero portrait), `assets/portrait-2.jpg` (horizontal, stats-card back), `assets/og-card.png`, `assets/logos/{courtana,dreamship}.png`, `assets/shots/{courtana,dreamship,vibeco,venue-connect,naughtydata,litigator,brand-intelligence}.png`. Lazy-load with graceful `onerror` placeholders.
