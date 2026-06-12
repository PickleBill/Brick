# Brick — Bill Bricker's Dynamic Résumé

The living "about me" — an AI-native personal product by a GTM operator. The artifact demonstrates the claim: **sells AND builds.**

**Live site (after enabling Pages):** `https://picklebill.github.io/Brick/` → custom domain coming.

## Repo Map

| Path | What |
|------|------|
| `index.html`, `climb.html`, `work.html`, `resume*.html` | The site (static, self-contained pages) |
| `home-fn.html`, `home-warm.html`, `design-lab/` | Alternate directions & experiments |
| `content/` | The corpus: `FACTS.md` ledger + `stories/` |
| `source/` | `content.json` (rendering data) + original `HANDOVER.md` |
| `assets/` | Local screenshots, logos, OG card |
| `ROADMAP.md` / `INTERVIEW.md` / `CLAUDE.md` | Plan, corpus interview, session instructions |

## One-time setup (Bill)

1. Merge the open PR.
2. **Settings → Pages → Source: Deploy from branch → `main` / root.** That's it — the site is live.
3. When `billbricker.com` is purchased: add it under Settings → Pages → Custom domain, and update the `og:url`/`og:image` URLs in the page `<head>`s.

Migrated from `picklebill/pickle-daas-data` `showcase/v2` (lineage in `source/HANDOVER.md`).
