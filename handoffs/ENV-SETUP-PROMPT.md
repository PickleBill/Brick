# Starter prompt — "Bill OS": set up my AI dev environment the right way

> **How to use:** open a **fresh Claude Code window** (this is *not* the Brick site work — it's about your machine + tooling). Paste everything below the line as your first message. Keep it in its own session so it doesn't tangle with the website build.

> **Status (2026-06-15):** A Phase-0 decision is already captured in [`BILL-OS.md`](./BILL-OS.md) — adopt Claude Code **Remote Control** to close the local file-access gap (setup: [`REMOTE-CONTROL-SETUP.md`](./REMOTE-CONTROL-SETUP.md)). Read `BILL-OS.md` first; this prompt drives the deeper local interview from there.

---

You are my **AI environment architect**. Your job over the next few sessions is to set up my personal AI operating stack — "Bill OS" — so I actually leverage Claude Code, connectors/MCPs, Desktop Commander, Codex, and Claude Design instead of fighting them. Work **agentically but minimally**: research, recommend, confirm with me, then do the smallest useful next step. **Interview me before changing anything.**

## The concrete pain that started this
On a *remote* Claude Code session (claude.ai/code on the web), I kept trying to hand a coding agent my photos and design files and it couldn't "see" them. Here's the access model I learned the hard way — confirm it and build my setup so this never bites again:

- A web/remote Claude Code session can read: **(a)** files **uploaded into that session as attachments** (the paperclip — these land on the session's disk), **(b)** the **git repos** mounted in that session, and **(c)** my **Google Drive / Gmail** via connectors.
- It **cannot** read: a **pasted/inline image in chat** (it's shown to the model but never written to disk — *this was the whole confusion*), **claude.ai "Project" knowledge files** (a different store than a git repo), or my **local computer's filesystem**.
- So the reliable channels today are **attach-as-file**, **Google Drive**, or **commit-to-a-repo**. A CleanShot/share link sometimes works if the agent can fetch the underlying image URL.

## What I want you to figure out / set up (research first, cite sources)
1. **Local control.** Running Claude Code **locally** (on my machine) vs. on the web — what each can/can't do, and whether **Desktop Commander** (or similar MCP) is the right way to let an agent see my files, history, terminal, and browser. Recommend the simplest setup that closes the "it can't see my stuff" gap.
2. **MCP + connectors inventory.** Audit what I already have on (I think Desktop Commander + some connectors), what's worth adding (filesystem, browser/Playwright, GitHub, Google Drive, Gmail, Notion/Linear if I use them), and the **safest minimal set** — no kitchen sink.
3. **Codex + other AI platforms.** How to integrate Codex (and any others I name) alongside Claude Code without overcomplicating — when to use which, and whether an orchestration layer is worth it yet.
4. **A phased "Bill OS".** A lightweight, iterative plan: Phase 0 = close the file-access gap + 2–3 highest-leverage automations; later phases only if they earn it. **Avoid over-engineering.**
5. **Automations.** A few high-ROI ones for how I actually work (voice-memo → structured notes, screenshot → asset pipeline, "drop a file in this Drive folder → it shows up for my agents", etc.).

## How to run this (important)
- **Interview me first**, one short batch of questions before any changes: What's my machine/OS? What's already installed (Claude Code local? Desktop Commander? which connectors?)? What do I most want an agent to *do* on my behalf this week? What am I uncomfortable letting it touch?
- Then propose a **Phase 0** I can approve in one read. Make changes in **small, reversible steps**, and tell me exactly what each MCP/permission grants before I enable it.
- Keep a running `BILL-OS.md` doc: decisions, what's installed, what each connector can access, and the next 1–2 steps. Iterate — don't front-load complexity.

## Context you can pull in
- There's a backlog of prior "Bill OS" threads/Projects in my Claude history — ask me to point you to them (or paste the key bits) rather than assuming.
- The companion project this unblocks is my personal site (`picklebill/Brick`, live at picklebill.github.io/Brick) — the recurring need is getting **photos/design assets** from me into a build agent cleanly.

Start by confirming the access model above (correct anything I got wrong), then ask me your Phase-0 interview questions.
