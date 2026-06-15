# BILL-OS.md — running tracker for Bill's AI dev environment

> The living decision log for "Bill OS" — how Bill leverages Claude Code, MCPs/connectors, and
> related AI tooling. **Append-only:** add dated decisions, don't rewrite history. The companion
> starter prompt for a full local setup session is `ENV-SETUP-PROMPT.md` (in this folder).
>
> _Last updated: 2026-06-15._

---

## Access model (confirmed)

The pain that kicked this off: on a **web/cloud** Claude Code session, the agent couldn't "see"
Bill's local photos and design files. The fix isn't a better way to push files *up* to a cloud
agent — it's a different channel entirely (**Remote Control**) that runs the agent *on the Mac*.

| Channel | Agent runs on | Sees local files? | Survives Mac sleep? | Best for |
|---|---|---|---|---|
| **Web session** (claude.ai/code) | Anthropic cloud VM | ❌ repo + attachments + Drive/Gmail connectors only | ✅ yes | Fire-and-forget repo work |
| Attach / Drive / commit | (feeds the cloud VM) | — | — | Getting *specific* assets to a cloud agent |
| **Remote Control** (`claude remote-control`) | **The Mac** | ✅ **everything local** (FS, terminal, git, local MCPs) | ❌ no — Mac must stay awake | **Design/photo work; steer from phone** |
| Local terminal Claude Code | The Mac | ✅ everything local | ❌ no | Same as above, minus phone steering |

Bill's original three bullets were **all correct**: a pasted/inline image is shown to the model
but never written to disk; claude.ai "Project" knowledge files are a different store than a git
repo; a cloud session can't read the local filesystem. The only thing missing was the **Remote
Control** option — see the decision below.

---

## Decision log

### 2026-06-15 — Adopt **Remote Control** as the Phase-0 anchor for local file access

**Decision:** Use Claude Code **Remote Control** (`claude remote-control`) as the primary way to
give an agent access to Bill's local files, rather than installing a broad third-party
filesystem/terminal MCP. Setup checklist: `REMOTE-CONTROL-SETUP.md`.

**Why:**
- It directly closes the "it can't see my stuff" gap. Per the docs: _"Remote Control sessions run
  directly on your machine and interact with your local filesystem. The web and mobile interfaces
  are just a window into that local session."_ The agent gets the **full local environment** —
  filesystem, terminal, git history, project config, and any **local MCP servers** — and `@`
  autocompletes local paths. You steer it from claude.ai/code or the Claude phone app.
- **It supersedes Desktop Commander for this need.** Remote Control is just local Claude Code
  (which already has filesystem + terminal + your MCPs) steered remotely — no extra third-party
  MCP with broad local access sitting in the loop. Simpler **and** more secure.
- **Low risk / reversible.** Outbound HTTPS polling only, **no inbound ports** opened on the Mac;
  TLS transport; short-lived scoped credentials; optional `--sandbox` isolation. Stop the process
  and it's gone.
- **Available on Bill's Max plan** at no extra compute charge (uses normal limits). Requires a
  claude.ai login (not API-key auth) and Claude Code **v2.1.51+**.

**Caveats (honest):**
- The Mac **must stay awake** while a session runs — it ends if the `claude` process stops, and a
  network outage of ~10 min times it out. Great for "at my desk, check from the couch." For
  fire-and-forget long jobs that survive a closed laptop, use a **web session** instead.
- Remote Control only sees what's **actually on that Mac**. Since Bill's assets live across
  Mac/iCloud/Drive/phone, pair it with the canonical-folder sync in Phase 0 (below).
- **Research preview** — expect rough edges.

**Relationship to web sessions:** complementary, not either/or. Remote Control = local files +
steer from anywhere (Mac awake). Web = autonomous cloud jobs that survive the laptop closing.

---

## Stack inventory snapshot (2026-06-15)

**Already exists / in use:**
- `vibeco/courtana-mcp-server/` — a production-ready MCP server that exposes cross-repo knowledge
  (CLAUDE.md / design systems / skill files) and invokes VibeCo agents. Configured via
  `~/.claude/settings.json`. This is real Courtana MCP infrastructure already built — fold it into
  the inventory rather than re-inventing.

**Candidates only — NOT installed (evaluate later, don't kitchen-sink):**
- **Desktop Commander** — largely **unneeded** now that Remote Control covers "see my files +
  terminal." Re-evaluate only for a specific use Remote Control doesn't serve.
- **Codex / other AI platforms** — defer until there's a concrete "when to use which" need.

**Cleanup flag (not fixed here — different repo, out of scope):**
- `pickle-daas-data/CLAUDE.md` references `../BILL-OS/LESSONS.md`, which **does not exist**
  anywhere. Either create that lessons file or update the reference in a future pickle-daas session.

---

## Phase 0 (minimal — close the gap, nothing more)

1. **Enable Remote Control on the Mac.** Follow `REMOTE-CONTROL-SETUP.md`. Acceptance test: from
   the phone, get the agent to read a local design file via `@path`.
2. **One canonical local assets folder.** Create `~/BillOS/assets/` and route iCloud Photos
   exports + Google Drive desktop sync into it, so phone-origin assets land on the Mac
   automatically. Then both Remote Control (local path) and web sessions (Drive connector) have a
   single reliable place to look. Solves "assets live everywhere."
3. **Stop there.** Defer additional automations (voice-memo → notes, screenshot → asset pipeline)
   until Phase 0 has earned the next step.

---

## Open questions for the local Bill OS session

The deeper interview the starter prompt wants — answer these in a **local** Claude Code window:
- What's installed locally today (Claude Code version, which MCPs/connectors are actually on)?
- What does Bill most want an agent to *do* on his behalf this week?
- What is Bill **uncomfortable** letting an agent touch (which folders, which accounts)?
- Where should `~/BillOS/assets/` actually live, and which sync sources feed it?

---

## Next 1–2 steps

1. Bill runs `REMOTE-CONTROL-SETUP.md` on the Mac and confirms the acceptance test passes.
2. Open a **local** Claude Code session, work through the "Open questions" above, and append the
   answers + any new decisions here.
