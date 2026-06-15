# REMOTE-CONTROL-SETUP.md — enable Claude Code Remote Control (macOS)

> Run this **on the Mac** (a web/cloud session can't — the command starts a session on your
> machine). Takes ~2 minutes. Decision + rationale live in `BILL-OS.md`.
> Source: https://code.claude.com/docs/en/remote-control

**What you get:** a Claude Code session that runs on your Mac — with full access to your local
filesystem, terminal, git history, and local MCP servers — that you steer from claude.ai/code or
the Claude phone app. The web/phone is just a window into the local session. This is what closes
the "the agent can't see my files" gap.

---

## Prereqs (one-time)

- [ ] **Plan:** Pro / Max / Team / Enterprise. (Bill = **Max** ✓.) Remote Control does **not** work
      with API-key-only auth. On Team/Enterprise an admin must enable the Remote Control toggle.
- [ ] **Login via claude.ai:** run `claude`, then `/login` and sign in through claude.ai (not an
      API key).
- [ ] **Workspace trust:** run `claude` once inside your project dir and accept the trust dialog.
- [ ] **Version:** `claude --version` must be **≥ v2.1.51**. Update Claude Code if it's older.
      (VS Code extension needs **≥ v2.1.79**; mobile push notifications need **≥ v2.1.110**.)

---

## Start a session

Pick one. **Server mode** is the recommended default (handles multiple concurrent sessions).

```bash
# Server mode — long-running, serves multiple remote sessions
cd ~/path/to/your/project        # e.g. the Brick repo
claude remote-control

# Single interactive session with Remote Control on
claude --remote-control "My Project Name"

# …or turn it on from inside an existing session
/remote-control My Project Name
```

Useful flags for `claude remote-control`:
- `--name "Brick site"` — custom session title shown on web/mobile
- `--spawn same-dir|worktree|session` — how new remote sessions are created (default `same-dir`)
- `--capacity <N>` — max concurrent sessions (default 32)
- `--sandbox` / `--no-sandbox` — filesystem + network isolation (default off)
- `--verbose` — detailed logs

On start you'll see a **session URL** and a **QR code**. In server mode, press **spacebar** to
toggle the QR.

## Connect from phone or another browser

- **Phone:** scan the QR with the Claude iOS/Android app (install/link via the `/mobile` command),
  or find the session by name in the app.
- **Browser:** open the session URL, or find the session by name at claude.ai/code.

---

## Security summary (why this is safe to run)

- **No inbound ports** are opened on the Mac. Your session makes **outbound HTTPS** requests only —
  it registers with the Anthropic API and polls for work.
- All traffic is **TLS**, routed through the Anthropic API (same transport as any Claude Code
  session). Connections use **multiple short-lived, single-purpose credentials**.
- Elevated actions (`npm install`, `git push`, file writes) still hit the **normal permission
  prompts** — answered locally. Add `--sandbox` for filesystem/network isolation if you want it.

## Gotchas

- **Mac must stay awake.** Close the terminal / quit the process / let the machine sleep → the
  session ends. A network outage of **~10 min** also times it out.
- **CLI-only commands:** interactive pickers like `/plugin` and `/resume` work only from the
  terminal. Text-output commands (`/compact`, `/clear`, `/context`, `/usage`, `/exit`, `/recap`,
  …) work from web/mobile.
- **Ultraplan** disconnects an active Remote Control session.

---

## First test — prove the gap is closed

1. `cd` into the **Brick** repo on the Mac and run `claude remote-control`.
2. Connect from your **phone** (scan the QR).
3. From the phone, ask: _"read `@<some local design file>` and summarize it"_ — `@` should
   autocomplete local paths.
4. If the agent reads the file, the "it can't see my stuff" problem is **solved**. (Try a file
   that is **not** in the git repo — e.g. something in `~/Downloads` — to prove it's true local
   access, not just the repo.)

---

## Asset-sync companion (because your assets live everywhere)

Remote Control only sees what's **actually on the Mac**. Your photos/design files live across
Mac/iCloud/Drive/phone, so give everything one landing spot:

```bash
mkdir -p ~/BillOS/assets
```

- Point **Google Drive desktop** sync at (or into) `~/BillOS/assets/` so Drive files are local.
- Export **iCloud / Apple Photos** picks into it (or keep a synced subfolder).
- Anything captured on the **phone** → AirDrop/iCloud/Drive into this folder so it lands on the Mac.

Result: both Remote Control (local path `~/BillOS/assets/…`) and web sessions (Drive connector)
have **one reliable place** to find your assets. This is Phase-0 step 2 in `BILL-OS.md`.
