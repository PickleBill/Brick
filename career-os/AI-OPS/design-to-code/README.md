# Design → Code Watcher (scaffold — INERT until installed)

> ⚠️ **This does not run yet, by design.** The workflow file lives here (NOT in `.github/workflows/`) so it cannot trigger until Bill installs it and adds secrets. Marked "needs Bill's keys" throughout.

## What it does
Drop a **Claude Design** handoff URL into a GitHub issue labeled `design-handoff` → a GitHub Action wakes the Claude Agent SDK → it fetches the design, implements it against this repo's conventions, and opens a **draft PR** linked to the issue. Human reviews + merges. (The pattern from the research PDF: "Design→Code automation.")

## Why it's high-leverage
Bill's site is a static HTML/CSS/JS surface with a strong design language. Turning a design handoff into a reviewable PR automatically is the single most repetitive build task — and it *demonstrates* the AI-ops thesis.

## Install (Bill, ~10 min)
1. Move `design-watcher.yml` → `.github/workflows/design-watcher.yml`.
2. Add repo secret `ANTHROPIC_API_KEY` (Settings → Secrets and variables → Actions). The default `GITHUB_TOKEN` covers PR creation.
3. Create the label `design-handoff` (Issues → Labels).
4. (Recommended) Keep the workflow's default-branch base = `main` and `draft: true`.
5. Test: open an issue titled "Try the watcher," label it `design-handoff`, paste a Claude Design URL in the body. The Action should open a draft PR.

## Files
- `design-watcher.yml` — the GitHub Action (issue-labeled trigger + manual `workflow_dispatch`).
- `run_design_to_code.mjs` — the Agent SDK driver (fetches the handoff URL, implements, opens the PR).
- `package.json` — minimal deps (`@anthropic-ai/claude-agent-sdk`).

## Guardrails baked in
- Opens **draft** PRs only — never pushes to `main`, never merges.
- Runs only on issues with the explicit `design-handoff` label.
- No secrets in code; reads `ANTHROPIC_API_KEY` from the Actions environment.
- Honors the repo's CLAUDE.md conventions (static site, design tokens, no framework).

## Status
**Scaffold complete; not wired.** Needs Bill's secret + the file move above to go live. Verify model IDs in `run_design_to_code.mjs` against the current Claude API before first run.
