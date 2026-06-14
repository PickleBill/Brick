# Website Rewrite — Hero Options + Section Plan

What changed in this PR (index.html) and the 5 hero options behind the choice.

## What I changed on the live Home page (index.html)
1. **Hero H1** — replaced adjective-soup ("Frontier tech evangelist, vibe pusher, 0→1 builder") with the falsifiable thesis **"I sell frontier tech, and I build it myself."** (the proven OG-title line). Adjective stacks are the #1 anti-pattern the reference-site research flagged.
2. **Hero lede** — now leads with the single most checkable claim (first-of-its-kind Google partnership) and adds the self-demonstrating line **"The site you're reading runs on its own AI."** (craft-as-proof).
3. **Primary CTA** — "Run the proof →" → **"Ask my résumé anything →"** (names what the terminal *is*; the terminal is the signature moment per research).
4. **Build captions** — every gallery card now carries an explicit **GTM lesson** (Bill flagged captions as critical; research says caption the build with the lesson).
5. **VibeCo framing** — reframed from generic "simulator" to **"an 11-agent simulator I built solo"** (reinforces "build it myself," not an agency pitch).
6. **Contact CTA** — qualified the primary audience: **"the right GTM/partnerships seat at a frontier AI lab or top AI startup"** + open to founder/fractional/advisory.
7. **`<title>` + meta description** — lead with the thesis + "forward-deployed GTM operator."

## The 5 hero options (meaningfully different)
Each: headline · subhead · 3 proof bullets · primary CTA · secondary CTA · best audience.

### 1. Conservative
- **H:** "Bill Bricker — I sell frontier tech, and I build it myself."
- **Sub:** Enterprise seller turned founder-CEO; 20 years from IBM/Netezza to founder to hands-on AI building.
- **Proof:** Closed Google partnership · Dreamship $35M+/11x · 40+ apps built solo.
- **CTA:** View the proof · **2nd:** Résumé.
- **Audience:** Recruiters who want legibility fast.

### 2. Founder-forward
- **H:** "I closed a first-of-its-kind Google partnership as a sub-1-year-old startup — then built the AI to do it again."
- **Sub:** Founder-operator who scales revenue and ships product.
- **Proof:** $35M+/11x · Stripe/PayPal/Meta followed Google · 40+ apps.
- **CTA:** Walk the climb · **2nd:** Run the terminal.
- **Audience:** Founders, investors, studios.

### 3. AI-forward
- **H:** "I sell frontier tech and I build it myself."
- **Sub:** 40+ apps, an 11-agent simulator, a live data pipeline — and this résumé, which runs on its own AI.
- **Proof:** 11-agent multi-model sim · 21K clips @ $0.0054 · corpus-grounded terminal.
- **CTA:** Ask my résumé anything · **2nd:** Browse the builds.
- **Audience:** Applied-AI / AI-native roles, technical interviewers.

### 4. GTM/operator-forward ★ IMPLEMENTED
- **H:** "I sell frontier tech, and I build it myself."
- **Sub:** Closed a first-of-its-kind Google partnership as a sub-1-yr-old startup; scaled Dreamship to $35M+ (11x in a year); now ships production AI daily — 40+ apps, built solo. This site runs on its own AI.
- **Proof:** Google partnership · $35M+/11x · 40+ apps solo.
- **CTA:** Ask my résumé anything → · **2nd:** Walk the climb.
- **Audience:** Frontier-lab GTM/partnerships hiring managers (the north star).

### 5. Fractional/consulting-forward
- **H:** "The operator who sells the deal and ships the product."
- **Sub:** Drop-in GTM & AI-transformation leadership — partner motions, pipeline systems, and the AI workflows to run them.
- **Proof:** Dreamship $35M+ playbook · 40+ apps · AI-ops stack he runs himself.
- **CTA:** Book a working session · **2nd:** See the work.
- **Audience:** Founders needing fractional GTM; AI-transformation buyers.

**Why #4:** it's the proven thesis line, it's falsifiable (the proof bar + builds make it checkable), it matches the north-star audience, and it fits the "the artifact proves the claim" design. #3 is the strongest *alternate* if Bill wants to foreground the builder identity.

## Recommended section order (largely already in place)
Hero (thesis + falsifiable proof) → Proof bar (count-ups) → **01 Operating companies** (Courtana + Dreamship) → **02 VibeCo** (proof-of-work, built solo) → **03 Pickle DaaS** (technical receipt) → **04 The person / Climb** → Contact. This already matches the reference-site pattern (thesis → proof → selected work → story → contact). No structural reorder needed; the wins were copy + captions + hero.

## Staged follow-ups (documented, not yet applied to HTML — see resume-upgrade.md)
- **resume-v2.html:** apply the top-5 bullet rewrites from CAREER-CORPUS/resume-upgrade.md; add a one-line "forward-deployed GTM" summary at top.
- **work.html (terminal):** add a `forward-deployed` / `why-ai-labs` command that answers the "why this role" question (interview research shows labs grade mission fit).
- These are staged as docs because they couldn't be visually verified in this environment (no browser render); low-risk to apply next.
