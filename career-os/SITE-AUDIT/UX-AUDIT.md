# UX / Design Audit

Reviewed through a designer lens + a revenue/commercial-leader lens + the 4 adversarial counter-personas (skeptical lab HM, 6-second recruiter, role competitor, technical interviewer). Design language (near-black, green→cyan→violet→coral, glass, Bricolage/Hanken/JetBrains) is kept — Bill likes it and the all-muted "de-slop" pass was rejected. Recommendations are UX-led, not a restyle.

## 10 quick wins (high ROI, low risk)
1. ✅ **Lead the hero with a falsifiable claim** (done) — clears the 6-second recruiter bar.
2. ✅ **Caption every build with the GTM lesson** (done) — turns the gallery into proof of *how he sells*.
3. **Add a real portrait** (slot wired) — a face in the first fold beats any copy. [needs Bill]
4. **Custom domain** (billbricker.com) — biggest credibility signal gap. [needs Bill]
5. **One named reference/quote** as a glass card near the proof bar — a single vouch outweighs polish. [needs Bill]
6. **Make the proof bar numbers click through** to their evidence (Google deal → Climb pin; 21K → pickle dashboards) — "proof you can click." Currently the stats are static.
7. **Add a 60–90s Loom** in the portrait slot's sibling area — controls the narrative. [needs Bill]
8. **Tighten motion budget on slower devices** — 4 drifting blobs + sheen + floaty + flow can stack; ensure `prefers-reduced-motion` fully calms them (the media query exists; verify the rotating-bar JS interval also pauses). Keep the energy Bill wants; just don't let it jank.
9. **Add `aria-label`s** to icon-only/emoji elements (🥒 brand, SVG portrait fallback) for a11y + the technical-interviewer persona.
10. **Surface "last updated / built with" line** near the footer (the existing "built solo with the AI-native stack it describes" is great — add a date/commit for the longevity signal).

## 5 deeper design changes (worth a follow-up sprint)
1. **Make the terminal the unmistakable signature.** It's the strongest differentiator but currently one nav item among four. Consider an inline teaser on Home (a single prompt input that deep-links into work.html) so the signature moment starts above the fold.
2. **Consolidate the stat band into the hero proof** (or bind each stat to an artifact) — floating stat banners read as vanity unless attached to a thing (reference research). Binding > banner.
3. **A single narrated case study** (the Google deal: situation → moves → outcome) as its own scannable module — for senior roles one deep story beats logos. The Climb pin exists; promote a condensed version to Home.
4. **Progressive disclosure on the builds** — show 3 curated + "browse the full ecosystem" (already mostly done); ensure the 3 shown are the 3 best *GTM* stories.
5. **Mobile hero density** — at <860px the operator card stacks below; verify the falsifiable claim + one proof bullet are visible before any scroll on a 390px viewport.

## Mobile-specific
- Nav wraps to 2 rows under 600px (handled) — confirm tap targets ≥44px.
- Hero H1 `clamp(34px…)` is good; verify the gradient line doesn't orphan a word on small screens.
- Build-card captions got longer (GTM lessons) — confirm they don't overflow the card on mobile; they're short enough but verify.
- Portrait/Loom must lazy-load and not block LCP.

## Counter-persona verdicts (after this PR)
- **Skeptical lab HM:** "Claim is concrete and checkable; builds are captioned with the actual lesson. Still wants a named reference + the 4,097-vs-721 framing tightened." → OPEN-Q #5, #9.
- **6-second recruiter:** "Now I know what he does in one line. Good." ✅
- **Role competitor:** "Hard to out-position — he literally ships the thing. The forward-deployed framing is on-trend." ✅
- **Technical interviewer:** "Terminal + pipeline are real signals; wants a 'how it's built' note and a11y polish." → quick wins #9, #10.

## What NOT to do
- Don't strip the color/motion energy (Bill's explicit preference; the de-slop pass was rejected).
- Don't add a framework/build step (static-site convention).
- Don't merge the PR while career-os/ is in it (privacy — see OPEN-Q #1).
