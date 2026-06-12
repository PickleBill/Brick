# The Corpus Interview

Purpose: extract the stories, facts, and voice that make the dynamic résumé singular. Bill answers in whatever form is easiest — voice memo transcripts, bullet dumps, half-sentences. Claude sessions transform answers into `content/stories/*.md` and update `content/FACTS.md`.

**How to run it:** one arc per session. Don't answer everything; answer the questions that light up. Skip anything that doesn't. Mark anything sensitive with how public it can be: `[public]`, `[blur the number]`, `[private — terminal can allude, never state]`.

---

## Arc 1 — The Bridge (Dreamship → Courtana → The Long Walk)

The most important untold story on the site. An interviewer *will* probe the transition; right now the site is silent.

1. Walk me through the moment you decided to step back from CEO to Board Chair at Dreamship. What was happening with the Google deal, and what was happening with your health, and in what order?
2. What did treatment actually look like alongside operating? A specific scene — a call taken from a chair, a deal closed between appointments — beats any summary.
3. Why pickleball? Of all the things to build *next*, while still walking the long walk — what pulled you to courts and cameras?
4. What does "still walking" mean to you now, in 2026? Is it a past-tense story or a present-tense one?
5. If a hiring manager asks "tell me about the gap," what's the one-paragraph answer you *wish* you could give without flinching?
6. How public do you want this? Options: a quiet Climb pin; a full essay; terminal-only (the story appears when someone asks); or family-knows-only.

## Arc 2 — The Google Deal (the crown jewel)

Currently 6 terminal lines. Should be a full case-study page.

1. Origin: who made first contact, and what did Dreamship have that Google wanted? (The honest version, not the press-release version.)
2. Timeline: first conversation → LOI → close. How long, and where did it almost die?
3. Your specific role in the room. What did *you* do that a different founder wouldn't have?
4. The 11x year — what actually drove it? Channel, product, market timing, a single decision?
5. Numbers you can publish vs. numbers to blur: $35M+ revenue, deal size, earnout structure, headcount at exit.
6. What did Google teach you about how big companies buy? (This is catnip for frontier-lab GTM interviews.)

## Arc 3 — The Builder Turn

How a career seller became a 65-project ecosystem operator.

1. What was the first thing you ever vibe-coded, and what did it feel like the first time it worked?
2. The 65+ projects / 40+ apps / 31 repos — what's the real organizing logic? Portfolio bets, learning reps, or compulsion?
3. Pickle DaaS: explain $0.0054/clip like you're telling the story at dinner. What's the defensible clip number — 4,097 analyzed, 20K+ collected? Define each precisely once.
4. Which three builds are you proudest of, and which one taught you the most by failing?
5. What's your actual daily stack and rhythm with Claude/Lovable? (This becomes a "How I Work" terminal answer — labs love it.)

## Arc 4 — The Manifesto

1. "Who can I introduce you to?" — when did that become the operating principle? Was there an inciting incident in 2015?
2. The best introduction you ever made — what happened downstream?
3. What do most people get wrong about networking?
4. Is there a written Networking Manifesto draft anywhere (doc, email, old post) we can harvest?

## Arc 5 — Origin Texture (the human stuff)

1. DJ Billygoat — full story. Where, when, what did you spin, why did it end? (Currently an unexplained easter egg.)
2. Northwestern Mutual at top-10 nationally — what does a 20-something learn doing $6M+ TCV across 150+ accounts?
3. One IBM/Netezza war story: Zillow, Avalara, or the 8-figure McKesson contribution. Pick the one with the best scene.
4. Father of three — what do your kids think you do? What's the thing you're actually optimizing your career for now?
5. Raleigh — why there, what does it give you?
6. GroupOrDare, GearLaunch, WibiData, IntroStellar — one honest sentence each. What's worth a pin, what's a footnote?

## Arc 6 — Facts Reconciliation

Go through `content/FACTS.md` and for each flagged item give: the defensible number, the source, and the publicity tag.

## Arc 7 — Voice Calibration

1. Three writers or speakers whose voice feels like yours on a good day.
2. Three phrases you actually say all the time (these go in the terminal's mouth).
3. Anything the terminal should *never* say or claim on your behalf.

---

## Output Convention

Each completed arc becomes `content/stories/<arc-slug>.md` with frontmatter:

```yaml
---
arc: bridge
status: draft | approved
publicity: public | blur | private
surfaces: [climb-pin, terminal, case-study, essay]
---
```

`FACTS.md` is updated in the same commit. The terminal system prompt is rebuilt from `content/` whenever stories change.
