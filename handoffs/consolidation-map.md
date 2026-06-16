# Consolidation map — main site ⇄ vSales (stop the drift)

_2026-06-16. The backbone for the next-phase "replicate or replace the root site" goal._
_Operating principle: **reuse main's proven components; don't rebuild.**_

## Where sales drifted (and the fix this pass)
| Drift | Cause | Fix |
|---|---|---|
| Flip card broke on mobile | Rebuilt as a fixed-height, absolutely-positioned 3D card instead of reusing main's | Restored the proven `ff61f78` two-photo flip (square, in-flow); added the back tagline + main's sheen/glow + a looping auto-flip teaser |
| Desktop ≠ mobile | `display:none` on badges / bar values / constellation lines / nav links at mobile breakpoints | Removed every content `display:none`; reflow instead (nav shrinks, chips wrap, badges go static, lines stay faint) |
| Over-muted color | Impeccable de-slop pass | Restored spectrum gradients on the proof numbers (per CLAUDE.md) |

## Components to reuse FROM main (`index.html` / `home.js`) — next phase
| Component | Main location | Status in sales | Action |
|---|---|---|---|
| Flip identity card | `index.html:441-502`, `home.js:40-63` | ✅ mechanics reused (this pass) | done |
| Right-side **scroll-spy** nav | `index.html:414-422`, `home.js:304-309` | ✗ absent | **port** across `/sales/` pages |
| Mobile **hamburger** nav | `index.html` nav toggle, `home.js:12-16` | partial (links shrink) | port if 4-link shrink proves tight |
| Count-up stats | `home.js:27-37` | partial | reuse on the proof numbers |
| Mesh blobs / reveal `.rv` | `index.html:47-56`, `home.js:18-25` | ✅ present | keep |
| Terminal (`ask-bill`) | `index.html:520-574`, `home.js:68-316` | ✅ adapted | keep |
| Section/design tokens | `index.html:20-38` | ✅ aligned (`--mint` vs `--sage`, near-identical) | unify token names at merge |

## Shared assets (already reused; no migration needed)
`assets/` photos (`family.jpg`, `dreamship-donate.jpg`, `portrait-sales.jpg`, …), `assets/logos/*` (18 logos), `assets/shots/*` product shots, the résumé PDF. Sales pulls from the same `assets/` dir as root.

## Consolidation path (next phase)
1. Decide root strategy: **promote `/sales/` → root** (replace) vs keep `/sales/` as the sales surface.
2. Port scroll-spy + unify nav across pages; align token names.
3. Résumé-V2 surface (`resume-v2.html`) to the sales design system.
4. Then the exhaustive Impeccable best-practices loop (critique/audit/distill/overdrive) on the consolidated site.
