# LEARNING LOG — how this overnight run was built (so you can reuse it)

Plain-English explanations of the non-trivial AI/agent techniques I used tonight, why each worked, and how you (Bill) reuse them. This is the "level up your AI operating" deliverable.

## Techniques used

### 1. Plan-first, then execute (PLAN.md as the contract)
Before building anything I wrote a plan, got your sign-off on two real forks (scope; how aggressive on the site), and only then executed. **Why it worked:** it front-loaded the two decisions that would've wasted the whole night if wrong, and gave every later step a contract to check against. **Reuse:** never let an agent "just start" on a big task — make it write the plan and confirm the 1–2 load-bearing choices first.

### 2. Parallel sub-agent fan-out
Instead of researching 50 companies serially, I launched independent research agents that each owned a slice (GTM positioning, outreach, interview loops, collateral, reference sites, and target-map sub-categories), then I synthesized. **Why it worked:** wall-clock speed + each agent kept a clean, focused context. **Caveat I hit:** some agents spawned *their own* agents (a cascade) and a couple returned a status note instead of the finished report — so always (a) tell sub-agents "your final message IS the deliverable, write the whole thing," and (b) check that each actually returned content. **Reuse:** fan out independent work; converge by hand.

### 3. Counter-personas (adversarial review)
I critiqued the site through four hostile readers — a skeptical lab hiring manager, a 6-second recruiter, a competitor for the role, a technical interviewer — plus a designer and a commercial leader. **Why it worked:** it catches the "sounds good to me" trap; each persona surfaces a different failure (vague claim, slow scan, weak proof, no a11y). **Reuse:** before shipping any collateral, ask the model to attack it as the specific people who'll judge it.

### 4. Ledger discipline (a single source of truth for facts)
Every number traced to FACTS.md; anything unconfirmed got a ⚠️ and went to OPEN-QUESTIONS instead of onto a public surface. **Why it worked:** it's the difference between "confident and checkable" and "caught overstating." A skeptic who finds one inflated number distrusts all of them. **Reuse:** keep one facts file; make every surface render from it; never let an agent invent a number.

### 5. Confidence-flagged, cited research
Research claims carry [strong]/[moderate]/[speculation] + a source URL; named people are "role-level only" unless a public source confirms them. **Why it worked:** you can act on the strong stuff and verify the soft stuff, and nobody's name/title was fabricated. **Reuse:** demand citations + confidence flags from any research agent; treat unflagged claims as unverified.

### 6. Artifact-as-you-go + continuous logs
Each objective ended in a file; DECISIONS.md and OPEN-QUESTIONS.md were updated throughout. **Why it worked:** when the session hit a limit mid-run, almost nothing was lost — the work was already on disk. **Reuse:** write to files continuously; never hoard output for one big final dump.

### 7. Guardrails for an autonomous agent with real permissions
Draft-never-send, no live merges, private content kept off the public repo, park-don't-guess on irreversible calls. **Why it worked:** full permissions + overnight autonomy is only safe with hard rules the agent won't cross. **Reuse:** write the guardrails into the prompt explicitly; the agent should refuse to email/apply/merge on its own.

## Curriculum — 5 things to learn next to operate AI like a pro
1. **The PLAN.md / task-queue loop.** Practice: take a real Courtana task, write a `PLAN.md`, and run an agent that does one step → tests → updates the file → exits. (See AI-OPS/roadmap.md.)
2. **MCP servers.** Practice: add the GitHub + Firecrawl MCP to your daily Claude Code; have it open a PR and scrape a competitor page without you copy-pasting.
3. **Multi-model routing.** Practice: consciously send a JSON-extraction task to a schema-strong model and a video task to Gemini; notice the cost/quality difference. (You already do this in VibeCo — make it explicit.)
4. **Eval loops (EXP-018).** Practice: on Pickle DaaS tagging, flag 10 wrong outputs, feed them back to a strong model to rewrite the prompt, measure the lift.
5. **Counter-persona review as a habit.** Practice: before sending any outreach from `templates.md`, have the model role-play the recipient and poke holes; revise until they'd reply.

## Meta-lesson
The most valuable output tonight wasn't any single file — it was the *system*: plan → fan out → verify against a ledger → adversarially review → artifact-as-you-go. That system is also the "I build it myself" proof a frontier lab is hiring for. Operating it in the open is the move.
