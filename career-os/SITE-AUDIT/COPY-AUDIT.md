# Copy Audit — Current → Problem → Fix

Severity: 🔴 high (hurts conversion/credibility) · 🟡 medium · 🟢 polish. ✅ = applied in this PR.

| # | Location | Current copy | Problem | Severity | Replacement | Why |
|---|---|---|---|---|---|---|
| 1 | Home H1 | "Frontier tech evangelist, vibe pusher, 0→1 builder." | Adjective soup; unfalsifiable; "vibe pusher" reads unserious to a lab HM | 🔴 ✅ | "I sell frontier tech, and I build it myself." | First-person falsifiable thesis; the #1 reference-site pattern |
| 2 | Home lede | "I closed Google as a partner…build Courtana while shipping production AI daily." | Strong but buried "Courtana"; no self-proof | 🔴 ✅ | Leads with "first-of-its-kind Google partnership"; adds "This site runs on its own AI"; "40+ apps, built solo" | Lead with the most checkable claim; craft-as-proof |
| 3 | Home primary CTA | "Run the proof →" | Vague — proof of what? where? | 🟡 ✅ | "Ask my résumé anything →" | Names the terminal (the signature moment) |
| 4 | Build captions ×3 | "Next-gen sales asset…", "CTO rebrand…", "Mass-arbitration intelligence…" | Describe *what* not *what it proves about how he sells* | 🔴 ✅ | Each now carries a "GTM lesson:" line | Captions are the proof layer (Bill's emphasis + research) |
| 5 | VibeCo vvp | "The simulator that lets one operator ship like a team" | Could read as agency pitch | 🟡 ✅ | "An 11-agent simulator I built solo…" | Reframe as personal proof-of-work, not "hire us" |
| 6 | Contact sub | "Open to founder, GTM & partnership leadership, fractional, board, and the right partners." | Scattered; doesn't qualify the primary audience | 🟡 ✅ | "Looking for the right GTM/partnerships seat at a frontier AI lab or top AI startup — and open to founder, fractional, advisory." | Singular audience-qualifying CTA |
| 7 | `<title>` | "Founder · GTM Operator · AI-Native Builder" | Title-stack, not a claim | 🟡 ✅ | "I sell frontier tech, and I build it myself" | Matches OG; falsifiable |
| 8 | Pickle DaaS metric | "21K clips processed" + "$0.0054 per clip · ~7x cheaper" | Fine per ledger, BUT public repo shows ~721 analysis JSONs — a skeptic could catch the gap | 🟡 (park) | Keep "21K processed"; optionally add "4,097 deep-analyzed" precision | Honors ledger; see OPEN-Q #9 (Bill to decide framing) |
| 9 | Eyebrow | "Pickle-Bill Bricker · fka DJ Billygoat" | None — keep | 🟢 | (keep) | One specific true personality detail = anti-slop signal |
| 10 | Résumé hero (resume-v2.html) | gradient headline only | No one-line forward-deployed summary | 🟡 (staged) | Add summary line + apply top-5 bullet rewrites (resume-upgrade.md) | Senior résumé wants a crisp opening summary |
| 11 | Terminal (work.html) | no explicit "why AI labs / mission-fit" answer | Labs grade mission alignment (interview research) | 🟡 (staged) | Add `why-ai-labs` / `forward-deployed` command | Pre-empts the interview's values bar |

## Tone rules applied (from Clarify + Anthropic prose research)
- Verb-first, first-person, concrete numbers, no filler.
- One idea per sentence; kill adjectives that aren't load-bearing.
- Every claim traces to FACTS.md; ⚠️ items not surfaced.
- "Crisp, data-backed, devoid of fluff" — the same discipline labs grade in the written exercise.
