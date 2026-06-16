---
description: Verify a claim is grounded in the FACTS.md ledger before it ships
argument-hint: <claim or number to check>
---
Check the claim "$ARGUMENTS" against Brick's single source of truth, `content/FACTS.md`.

Rules (from CLAUDE.md):
- Nothing ships to any surface (page, terminal, PDF, OG card) unless it's in the ledger.
- ⚠️ marks unconfirmed facts — flag these; never present them as confirmed.
- Respect publicity tags: `private` content may be alluded to but never stated; `blur` is softened; only `public` is freely shown.
- If facts conflict across repos/docs, the ledger wins — surface the conflict, don't silently pick.

Report: is the claim in the ledger? What's its publicity tag and confirmation status? Is it safe to ship as written?
