# Website Co-Listing Improvement Spec — 2026-06-21

## Goal
Position Bill Bricker for co-listed / high-signal GTM, partnerships, and forward-deployed AI opportunities without making the site read like a developer portfolio. The homepage should make one fast promise: Bill closes the room and builds the AI operating system that compounds the close.

## Core positioning
**Forward-Deployed GTM Operator · AI-Native Builder**

Supporting language:
- Zero → 1 Builder
- GTM Operator
- Revenue Leader
- AI-Native Force Multiplier

## Homepage changes implemented
1. Reframed SEO and OG metadata around forward-deployed GTM and AI-native builder positioning.
2. Rewrote the hero headline from “big names say yes” to a more co-listable value proposition: turning frontier technology into revenue people can feel.
3. Replaced “Vibe Pusher” on the operator card with recruiter-legible labels that still match the Claude Design direction.
4. Added a direct “Start a conversation” primary CTA while keeping the interactive résumé prompt as the proof mechanism.
5. Tightened the bottom contact copy around GTM, partnerships, and forward-deployed AI work.

## Recommended next pass for Codex / Claude Code
### A. Asset update
- Replace `assets/Bill_Bricker_Resume_vFinal.pdf` with the latest resume PDF from Bill's source folder.
- If the new resume file name changes, update all homepage download links and the résumé nav surface together.

### B. Header/card visual direction
- Use the attached Claude Design “Operator Card v4” as the target for the hero card back state.
- Keep the four operator labels exactly as implemented:
  - Zero → 1 Builder
  - GTM Operator
  - Revenue Leader
  - AI-Native Force Multiplier
- Preserve the current proof-front / identity-back flip interaction; it is a strong differentiator.

### C. Copy guardrails
- Lead with sales / partnerships / GTM outcomes.
- Treat AI building as the multiplier, not the job title.
- Keep Google as the above-the-fold proof anchor.
- Keep `$45M+` clearly tied to ad spend through the channel, not revenue.
- Keep `$35M+` clearly tied to Dreamship peak revenue.
- Do not publish phone number.

### D. Conversion improvements still worth doing
- Add a short “Best fit” strip under the hero with three chips: Partnerships / GTM Leadership / Forward-Deployed AI.
- Add a recruiter skimmability row before the terminal: “Closed Google · Built Dreamship to $35M+ · Shipped 40+ AI apps.”
- Add a resume version date near download links once the final PDF is installed.
- Validate that the live site OG card still reflects the new positioning after deploy.

## Open dependency
The IDE-referenced external spec and resume files were not present inside `/workspace/Brick`; this pass used the repo facts ledger, existing resume assets, and the supplied Operator Card screenshot direction.
