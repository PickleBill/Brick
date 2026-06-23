# Brick Orchestration Hub — Bill's operating system for working across Claude

> **Read this FIRST in any new thread.** This is the one place that points at everything.
> The repo is the source of truth (CLAUDE.md rule 2); this doc is the memory; threads are disposable.
> Last updated: **2026-06-23**. Keep it current — every session ends by updating §5 (the board).

If you're a fresh Claude session: read this top-to-bottom, then read `CLAUDE.md`, `_source/facts.md`,
and `_source/spec.md`. If you're Bill: §1 (where to do what) and §2 (plugins/setup) are for you.

---

## 0. The anti-spiral rules (why this exists)

You're not lost — you're spread across **6 surfaces with no single source of truth.** That's the
whole problem. These five rules fix it:

1. **One workstream per thread.** When a thread starts sprawling, STOP. Update §5 of this hub, open a
   fresh thread, paste `THREAD-SEED.md`. (The "Triage handoff" and "Website copy" sessions both
   bloated because everything ran in one thread — don't repeat it.)
2. **The repo is the hub.** This file lives in the repo so any surface can point at it. Working docs
   that live only in Dropbox/iCloud go stale and can't be read by web sessions.
3. **New version every time; never overwrite a good thing.** This is the #1 cause of the mess (66 card
   copies). Bump a version or date a filename; archive the old one; never silently replace.
4. **Use agents for fan-out.** Reviews, research, multi-file analysis → spin up sub-agents in parallel.
   Don't do it serially in the main thread.
5. **Ship at 8/10, then iterate.** Perfect is the enemy of pushed. Preview → sign-off → merge → improve.

---

## 1. The surface map — where to do what

You have many Claude surfaces. Each is good at ONE thing. Stop switching mid-task; route by the job.

| Job you're doing | Use this surface | Why |
|---|---|---|
| Edit the site, run git, push, open PRs | **Claude Code** (web `claude.ai/code` *or* desktop/terminal) | Full repo access; the only place that ships to the live site |
| Long task while you're away / on your phone | **Claude Code on the web** | Runs in the cloud, persists when you close the tab; you steer from the phone |
| Design a card/page mockup before coding | **Claude Design** (`claude.ai/design`) | Purpose-built canvas (powered by Magic Patterns). Explore here, then PORT to code (§3) |
| See your *local* files / drive your *own* browser | **Claude Cowork** (desktop "local agent mode") | The only surface with Desktop Commander + "Claude in Chrome." Web Code can't touch your Mac |
| Strategy / research / no-code thinking | **Claude.ai Projects or Chat** | Knowledge base + conversation; not a coding environment |

**Capability reality (so you stop guessing):**

| Surface | Sees your Mac's files? | Drives your browser? | Pushes to GitHub? | Runs plugins/skills? |
|---|---|---|---|---|
| Claude Code — terminal/desktop | ✅ full | ❌ (unless an MCP adds it) | ✅ | ✅ full |
| Claude Code — web (this session) | ⚠️ only the cloned repo + uploads + Drive/Gmail connectors | ❌ | ✅ | ✅ (cloud-scoped) |
| Claude Code — mobile (iOS) | ❌ | ❌ | ❌ | ❌ (it remote-controls a real session) |
| Claude Cowork (local agent) | ✅ full Mac | ✅ Claude-in-Chrome | via the local repo | ✅ |
| Claude.ai Projects / Chat | ❌ | ❌ | ❌ | ❌ |
| Claude Design | ❌ (reads uploads) | ❌ | ❌ | ❌ (separate surface) |

> **Key takeaway:** *This* web session (Claude Code on the web) cannot see your Mac or drive your
> browser. If you need me to look at the live Claude Design canvas, that's a **Cowork** job — or
> export the design and upload the file here (§3).

---

## 2. Operating manual: plugins & setup (for a non-engineer)

**What a "plugin" is:** a bundle that can carry *slash commands*, *sub-agents*, *skills*, *MCP
connectors*, and *hooks*. Skills/agents are the useful bits for you.

**How to install one** (run in Claude Code **terminal or desktop**, not the web):
```
/plugin install <name>@claude-plugins-official      # e.g. github@claude-plugins-official
/plugin                                              # opens the browse/install UI
/plugin list                                         # what you have
```
For community plugins, add the marketplace first: `/plugin marketplace add anthropics/claude-plugins-community`.

**About "frontend-design":** there is **no official plugin by that exact name.** Two things cover that need:
- **In this repo, you already have it.** The **Impeccable** design skill + four review agents
  (`design-critic`, `ux-flow`, `copy-editor`, `persona-panel`) are committed under `.claude/`, so they
  load automatically in *any* session on this repo — web included. Use `/impeccable <command>` and
  `/review-site`.
- **For visual design**, the tool is **Claude Design** (it's Magic Patterns under the hood), a separate
  surface — not a plugin you install.

**Which plugins to actually install** (keep it to a few — each adds token cost):
| Plugin | Scope | Why |
|---|---|---|
| `github@claude-plugins-official` | User | PR/branch/commit workflows (if you ever use the terminal directly) |
| `commit-commands@claude-plugins-official` | User | Generates commit messages / staging — saves typing |
| `security-guidance@claude-plugins-official` | User | Auto-flags risky code; good default for a non-engineer |
| *(this repo's Impeccable + agents)* | Project (already committed) | Design/UX/copy review — no install needed |

**Where settings live (and the sync gotcha):**
- `~/.claude/` = **your machine only** (personal skills, model, keybindings). Does **NOT** sync across
  Mac/web/phone.
- repo `.claude/` = **travels with the repo** via git (so Impeccable + agents follow you to web sessions).
- **So:** put anything you want everywhere into the **repo's `.claude/`** (committed). Personal
  machine-only prefs go in `~/.claude/`.

**Should you use Terminal / Desktop / Web / Mobile?** Recommendation for you:
- **Desktop app** for day-to-day site work (visual diffs, easier than the terminal).
- **Web** when you're away or want a long task to run in the background.
- **Cowork** only when you need to see local files or drive your browser into Claude Design.
- **Mobile** to kick things off and check status — not to do the work.
- Pick Desktop *or* Web as your home base and stop bouncing.

---

## 3. Canonical workflows (the ones that keep biting you)

### A. Design → Code (the one that failed twice)
- **Claude Design = exploration only.** It does not ship.
- ❌ **Do NOT click "Send to Claude Code."** It passes a *pointer*, not the code — the receiving session
  can't see the design and (correctly) refuses to invent it.
- ❌ **Do NOT iframe a Design export into the site.** Inlined 1–4 MB bundles kill performance/SEO/mobile
  and can't inherit the site's design tokens. (The one allowed exception is a truly self-contained
  widget — which the Operator Card already is.)
- ✅ **Do this:** in Claude Design → **Share → Export → Standalone HTML → download** → **upload/drag that
  file into Claude Code** → Code ports it into the repo's real HTML/CSS/JS against the `:root` tokens.

### B. The Operator Card (stop the 66-page spiral)
- **In the repo it's already live** as the `<operator-card>` web component (`operator-card.js`), shipped
  to the home hero in commit #38. The old cube is parked in `playground.html`.
- **In Claude Design, the spiral is caused by:** (1) the **Tweaks panel** — those knobs (`textDensity`,
  `flipMode`, `flipSpeed`, `motion`, `accent`, `foilIntensity`…) are **live settings, they do NOT make
  copies** — use them freely; and (2) **every text/structure edit + every export spawns a new page.**
- **"Slow" is usually not the card** — it's your Mac's **Reduce Motion** setting silently killing the
  animation. Set Tweaks → `motion: Full`. (v6 already dropped the fragile Atropos/Lenis libs.)
- **Naming convention to end the mess:** keep exactly **one** "current" file named
  `operator-card-v<N>.dc.html`; only bump `N` for a real structural change; rename/archive everything
  else so the file list has one obvious live version. Convert photos to **JPG/PNG named by slot**
  (Claude Design can't find HEIC).

### C. Prompt-forge (before pasting a prompt into another tool/thread)
Build a portable 10/10 prompt that another Claude can run with zero context (goal, audience,
constraints, examples, format, done-criteria). Score it brutally — a 7 called a 9 wastes the most time.

### D. Thread handoff
End-of-thread ritual: update §5 of this hub → start a fresh thread → paste `THREAD-SEED.md`. Nothing is
lost because the state lives here, not in the thread.

### E. File naming (find it on mobile)
`SURFACE_topic_v<N>_YYYY-MM-DD.md` — e.g. `CLAUDE-DESIGN_card-refine_v2_2026-06-23.md`. Group by surface.

---

## 4. Connector inventory (the "connectors" in your /goal)

Available MCP connectors in the web sessions, and what they're for:

| Connector | Status | Use for |
|---|---|---|
| **GitHub** | ✅ live | the repo, PRs, CI |
| **Calendly** | ✅ live | booking link `https://calendly.com/bricker3-idwj/30min` (wired into #39) |
| **Google Drive** | ✅ live | pulling research / assets into a session |
| **Gmail** | ✅ live | outreach drafts, search |
| **Fireflies** | ✅ live | meeting transcripts → corpus / stories |
| **Lovable** | ✅ live | app builds (e.g. Freak Show, Layup Lab) — not yet used in earnest |
| **Magic Patterns** | ✅ live | = the engine behind Claude Design |
| **HyperFrames (HeyGen)** | ✅ live | programmatic video (e.g. a Loom-style intro) |

**Pending from Bill** (placeholders fall back gracefully until provided) for the #39 analytics:
Microsoft **Clarity** id · **Plausible** domain · **Formspree** (or Tally) form id · **Dub** account.

---

## 5. Live workstream board (the roll-up) — update this every session

| ID | Workstream | Status | Lives in | Next action |
|---|---|---|---|---|
| **A** | Operator Card (hero) | 🟡 v6.5 (6-facet) port queued — **blocked on the design code** | repo `operator-card.js` (4-facet live: `operator·capitalist·dj·father`); Design `2ea72829…` v6.5 (`builder·payforward·father·dj·gtm·community`) | Bill uploads the v6.5 Standalone HTML **or** project .zip here → port on a branch w/ subagents → preview |
| **B** | Work / Proof Deck (4 builds) | 🟡 needs X-level pass (placeholder images, doesn't scroll on desktop) | repo `index.html` proof section | Real media (Courtana video), livelier desktop default — spoke prompt |
| **C** | Front door + analytics | ✅ **merged (#39, 2026-06-23)** → live; `/sales/` redirects to root; analytics dormant until ids (punted) | `main` / live | (optional) add Plausible domain later — easiest single add |
| **D** | Skills (prompt-forge, design-iterate) | 🟡 drafted in Cowork "ABOUT BILL" folder, not installed | Dropbox `_skills-draft/` | Install via `/plugin` or `.claude/skills/` — spoke |
| **E** | Lovable refresh | ⚪ not started | Lovable | spoke |
| **F** | Job-search engine | 🟡 spec'd (Workstream-C signal-scan) | `handoffs/workstream-C-signal-scan-spec.md` (on #39 branch) | separate `signal-scan` repo when Bill says go |
| **G** | Orchestration hub | ✅ **this doc** | repo | keep §5 current; mirror `THREAD-SEED.md` to phone |

---

## 6. Open PR board + triage (11 open as of 2026-06-23)

> **Resolved 2026-06-23:** #39 **merged** (live). **Closed:** #13 · #14 · #15 · #31 · #32 · #33 · #34 · #37. **Still open:** #40 (this hub) · #22 + #16 (Bill's call). Table kept for the record.

| PR | What | Verdict |
|---|---|---|
| **#39** one-objective front door + analytics, archives `/sales/` | on current `main`, no blocking CI | ✅ **KEEP — your front door.** Preview on phone (tap "Grab 30 minutes"), add the 4 ids, merge |
| **#22** Remote-Control + BILL-OS docs | docs only | 🟡 **Decide:** merge as reference, or let this hub supersede it |
| **#16** `.claude/settings.json` permission allowlist | aggressive `Bash(*)` autonomy | 🟡 **Decide:** useful (persists permissions) but broad; merge a tightened version or skip |
| **#37** Impeccable preview (solid-green/calmer) | "do not merge" by its own note; partly conflicts with "keep the energy" | ⛔ **Close** (preview-only; salvage nothing critical) |
| **#34** sales iframe Operator Card | superseded — card is a web component now; `/sales/` being archived | ⛔ **Close** |
| **#33** Codex co-listing copy | stale base (pre-#38) | ⛔ **Close** (mine any copy first) |
| **#32** post-launch polish + persona | stale base; a11y fixes likely already in `main` | ⛔ **Close** (check holo-card salvage) |
| **#15** holistic one-pager v6 drafts | very old base; superseded by shipped front door | ⛔ **Close** |
| **#13** hero reinvention drafts | very old base; superseded | ⛔ **Close** |
| **#31** "Disable Codex Claude gate checks" | **NOT a draft**, stale base, **deletes 49,382 lines / 104 files** — rips out Impeccable + agents + hooks | 🚨 **CLOSE NOW** — most likely to merge by accident and would gut the whole setup |
| **#14** Home copy + `career-os/` | contains **private** target-people / outreach / health material in a **public** repo | 🚨 **CLOSE** + move `career-os/` to a private location |

**Status:** the 8 closes + the #39 merge are done. ⚠️ **#14's branch (`claude/bricker-positioning-website-audit-3gar62`) still holds private `career-os/` material on a public branch — recommend deleting the branch.** #22 (fold into this hub & close?) and #16 (permissions — merge tightened or skip?) await Bill.

---

## 7. Needs-from-Bill (consolidated)

- **The v6.5 card export** — upload the **Standalone HTML** or the **Project-archive .zip** (zip preferred; bundles the 6 photos) here, to unblock the port. Two photos are missing from `assets/`: `family-luau.jpg`, `community-rooftop.jpg`.
- **#14 branch** — OK to delete `claude/bricker-positioning-website-audit-3gar62`? (private material on a public branch).
- **#22 / #16** — fold #22's remote-control notes into this hub & close? merge a tightened #16, or skip?
- **Analytics (punted):** when ready, the Plausible domain is the easiest single add.

---

## 8. Where the canonical truth lives (pointers, don't duplicate)

- `_source/facts.md` — **LAW.** Every number/claim. ($45M+ = ad spend; $35M+ = peak revenue; no phone.)
- `_source/spec.md` — page/section spec. `_source/decisions.md` — the decision log. `_source/grader.md` — the win test.
- `content/stories/` — the narrative corpus (the-bridge, the-google-deal) — the crown jewel.
- `design-refs/` — exported design references ("recreate, don't ship as-is").
- `HANDOFF.md` / `handoffs/` — historical session handoffs (this hub supersedes them as the entry point).
