# Claude automation status

Codex-added Claude automations are intentionally disabled for now.

Disabled on 2026-06-18:

- Session-start hook that advertised the Impeccable skill and `/review-site` loop.
- Repo-local Claude slash command `/review-site`.
- Repo-local Claude review agents (`design-critic`, `copy-editor`, `ux-flow`, `persona-panel`).
- Repo-local Impeccable skill bundle.

This keeps Claude Code sessions from auto-loading or invoking Codex-installed review/gate tooling while Bill is working in Claude. Re-enable only if Bill explicitly asks to bring those checks back.
