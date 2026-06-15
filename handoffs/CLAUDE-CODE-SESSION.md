# Claude Code — fresh build session for bricker-os

> Open a **new Claude Code window** on the `picklebill/Brick` repo and paste this. Run **after** the Claude Design session has produced direction (Design is primary). Three parts: **(1) set up the environment, (2) learn the build, (3) ingest Design's output and clear the backlog.** Work agentically but in small, reversible steps; interview Bill before big moves.

---

## Part 1 — Set up the environment first ("Bill OS")
The recurring pain: on remote/web Claude Code, Bill kept handing the agent photos/design files it couldn't "see." The access model to internalize and fix:
- A web session can read: **(a)** files **attached into the session** (paperclip → land on disk), **(b)** the **git repos** mounted, **(c)** **Google Drive / Gmail** via connectors. A **CleanShot/share link** sometimes works if you can fetch the underlying media URL.
- It **cannot** read: a **pasted/inline chat image** (shown to the model, never written to disk — *this was the whole confusion*), **claude.ai "Project" knowledge**, or the **local filesystem**.

Your first job — **research + recommend (cite sources), then set up the minimal useful stack**, interviewing Bill before changes:
1. **Local control:** running Claude Code locally vs. web; whether **Desktop Commander** (or similar MCP) is the right way to give an agent his files/terminal/browser. Close the "can't see my stuff" gap.
2. **MCP/connector audit:** what's on, the **safest minimal additions** (filesystem, browser/Playwright, GitHub, Drive, Gmail), no kitchen sink.
3. **Codex + other platforms:** integrate without over-engineering — when to use which.
4. **A phased "Bill OS":** Phase 0 = close the access gap + 2–3 highest-leverage automations (voice-memo→notes, screenshot→asset pipeline, "drop a file in this Drive folder → agents see it"). Keep a running `BILL-OS.md`.

Interview first: machine/OS? what's installed (Claude Code local? Desktop Commander? which connectors)? what should an agent *do* this week? what's off-limits?

---

## Part 2 — Learn the build (so you can extend it cleanly)
Static site, **plain HTML/CSS/JS on GitHub Pages** (no framework — don't add one without a `ROADMAP.md` decision). Live at https://picklebill.github.io/Brick/.

**Key files**
- `index.html` — the home page. All CSS is in one `<style>` block (design tokens in `:root`). Sections: hero, `#interface` (terminal), green stat band, `#work` (companies), `#engine` (VibeCo 6-panel), pickle-DaaS video band, story/climb teaser, contact.
- `home.js` — behavior: reveal-on-scroll, count-ups, the **identity flip-card** (auto-cycling stat bars + hover-logo chips), the **terminal** (commands + `ask-bill` LLM calls + `tailor`/reference-check hiring modes + streaming typewriter + local fallback), cycling video badges, **command-row "wheels"** (single-line auto-scroll, pause on hover), VibeCo `data-gif` hover-swap, scroll-spy, mobile nav, konami.
- `v3/` — the "operator console" variant (`v3/app.js` has the original hiring-manager/reference/JD mode logic).
- `climb.html` — the career map; `assets/climb-preview.png` is its screenshot used on the home teaser.
- `assets/` — `courtana-shot.mp4`, photos (`family.jpg`, `dreamship-donate.jpg`, `family-ski.jpg`), `logos/`, `shots/` (VibeCo panels incl. `freakshow.jpg`, `layuplab.png`).
- `content/FACTS.md` — **the ledger.** Every number/claim must trace here; ⚠️ = unconfirmed. "Closed Google as a **partner**," never "sold."

**Conventions:** content-first (no facts hardcoded into a page that aren't in the ledger); the `--spectrum` gradient for one phrase per surface; the terminal's LLM backend lives in the **vibeco** Supabase project (`ask-bill` edge function, endpoint already wired in `home.js`). Verify changes with headless Chromium screenshots + `node --check home.js` before pushing. Develop on the assigned branch; open a **draft PR**; auto-merge of clean/green roadmap PRs is authorized.

---

## Part 3 — Ingest Design + clear the backlog
1. **Port the Claude Design output:** take its tokens (hex/px/timing) + comps + asset files, and implement the agreed surfaces. Drop its **clean app screenshots** in `assets/shots/` (replace the browser-chrome frames), wire any **real GIFs/MP4s** into the VibeCo panels via the existing `data-gif` hook, and place the **couple photo** on the card front (front slot is wired for a vertical portrait).
2. **Pickle-DaaS gallery modal** (deferred, highest backlog item): from the data section, a **"▸ explore the live lab"** trigger → a gallery modal of the coolest dashboards (Coaching Studio, Venue Report, Player Lab, Lobby Display, Brand Intel, Investor walkthrough), each opening a **lazy-loaded live `<iframe>` lightbox**. Source the dashboard list from the `pickle-daas-data` repo's Lobby Display.
3. **Remaining feedback / polish** per Design's critique: VibeCo grid tidy, terminal-wheel legibility, section rhythm/scannability.
4. **Asset inbox to chase Bill for:** couple photo (Drive `_intake MEDIA`), animated GIFs for Freak Show/Layup Lab/Venue Connect (attach as files), the real Freak Show URL.

Keep the live site green at every step; small PRs; screenshot-verify each change.
