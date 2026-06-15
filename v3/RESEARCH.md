# Deep Research — AI-lab GTM market + standout personal sites (June 2026)

_Method: 9 parallel research/advisory agents, fan-out web search → source fetch → synthesis. Citations inline. Skeptical flags kept. Scoped to general market + design intelligence (no private targeting)._

## Executive summary
1. **The market wants Bill's exact profile.** Frontier labs are hiring GTM harder than any other function, and the role they want most is the **Forward-Deployed / GTM Engineer — someone who sells *and* builds.** "The line between selling and building has collapsed."
2. **Proof beats credentials.** Résumé trust is falling; a **live, interactive artifact** + cold outreach converts "orders of magnitude" better. The website should *be* the artifact you forward.
3. **Shareable ≠ flashy.** The sites that get forwarded have **one bold gimmick where the medium is the proof**, executed with restraint, fast, accessible, and grounded — not the Inter-+-purple-gradient "AI slop" stack.
4. **AI-native, done honestly, is the unlock.** A corpus-grounded "ask my résumé," cite-every-claim, page-aware assistant simultaneously demonstrates the "builds AI" thesis and converts recruiters.

---

## 1 · The 2026 market: GTM / FDE at frontier labs
- GTM is the single biggest hiring category: **~1-in-5 open roles at OpenAI, ~20% at Anthropic** — more than any other dept; OpenAI plans to ~double headcount toward 8,000 in 2026. ([gtmnow](https://gtmnow.com/anthropic-and-openai-are-hiring-gtm-roles-more-than-anything-else/))
- The most-aggressively-hired role is the **Forward-Deployed Engineer / GTM Engineer** — "part engineer, part operator, part account owner," paid as a hybrid sales+eng function with revenue accelerators. ([getperspective](https://getperspective.ai/blog/why-every-ai-startup-needs-forward-deployed-engineering-function-2026), [paraform](https://www.paraform.com/blog/forward-deployed-ai-engineer))
- Labs explicitly hire *against* the pitch-deck seller who can't engage technical buyers; they want people who "credibly discuss technical product concepts while translating capability into business outcomes." ([bettsrecruiting](https://bettsrecruiting.com/blog/top-10-gtm-roles-in-ai-for-2026/))
- Comp signals (recruiter market ranges, not lab-disclosed): Enterprise AE $300–350K OTE; FDE $230–360K OTE; broad AI-GTM $200–500K+. ([bettsrecruiting](https://bettsrecruiting.com/blog/top-10-gtm-roles-in-ai-for-2026/), [superinterviews](https://superinterviews.substack.com/p/ai-gtm-vs-ai-native-gtm-your-2025))
- Partnerships roles are scoped as **owning a named relationship end-to-end** and combining two companies into one plain-language joint story — exactly the Google-partnership motion. ([builtinnyc](https://www.builtinnyc.com/job/amazon-gtm-partnership-startups/4701718), [introw](https://www.introw.io/blog/gtm-partnerships))
- **AI-native fluency is a closing-window "unfair advantage"** (~6–12 mo as of late 2025) before even "traditional" GTM expects it. ([superinterviews](https://superinterviews.substack.com/p/ai-gtm-vs-ai-native-gtm-your-2025))
- _Skeptic flags: the $47B run-rate / "20% of roles" come from one secondary newsletter (directional); comp bands are recruiter-published, not lab pay data; DeepMind "partnerships" skew strategic-alliance, xAI's GTM is explicitly immature._

## 2 · How "sells-and-builds" / founder candidates break in
- **Cold applications barely work** (OpenAI: hundreds of thousands of apps for hundreds of roles). The paths that work: **referrals, public signals, and "being found."** ([hirearcher](https://hirearcher.com/blog/how-to-get-hired-at-an-ai-startup-in-2025))
- **"Cold outreach + a real artifact of your thinking gets a response rate orders of magnitude higher than a résumé alone."** A direct, personalized note to the hiring manager (not the portal) hits 25–50% response. ([hirearcher](https://hirearcher.com/blog/how-to-get-hired-at-an-ai-startup-in-2025), [interviewing.io](https://interviewing.io/blog/how-to-get-in-the-door-at-top-companies-cold-out-reach-to-hiring-managers-part-2))
- Credential trust is falling: **only ~37% of employers** still see traditional credentials as reliable; 40%+ are ditching résumé-first hiring; a shipped artifact is "harder to fake at scale" than an AI-generated résumé. ([developia](https://developia.substack.com/p/the-ai-hiring-revolution-why-resumes))
- **Showing *how* you used AI to build** converts a 2026 red flag into a green one. ([developia](https://developia.substack.com/p/the-ai-hiring-revolution-why-resumes))
- _Skeptic flag: "got hired from a project/tweet" stories are mostly promotional, no base rates — a public artifact demonstrably helps you get **noticed**; the hire-rate lift is unquantified._

## 3 · Personal-site best practices + anti-patterns
- **The AI-slop fingerprint:** Inter + purple→blue gradient + uniform 16px cards + 3-col grid + soft shadows + vague hero copy ("build the future of work"). Break at least the font and the gradient; use specific, falsifiable claims. ([925studios](https://www.925studios.co/blog/ai-slop-web-design-guide), [standardbeagle](https://standardbeagle.com/the-year-ai-generated-interfaces-took-over/))
- **Build interaction into discovery** — the act of browsing should demonstrate the skill; align the concept to your identity (a "personal OS" for a GTM-builder makes an unconventional layout feel intentional). ([figma](https://www.figma.com/resource-library/portfolio-website-examples/))
- **Native scroll-driven animation** (`animation-timeline: view()`), one "touch of gold" per section, **all motion gated behind `prefers-reduced-motion`** (AI-built UIs pass WCAG only ~⅓ of the time — handling it well is a taste signal). ([joshwcomeau](https://www.joshwcomeau.com/animation/scroll-driven-animations/))
- **Core Web Vitals as a flex:** LCP<2.5s, INP<200ms, CLS<0.1; only ~48% of mobile pages pass — passing differentiates to a technical audience. ([owdt](https://owdt.com/insight/how-to-improve-core-web-vitals/), [corewebvitals](https://www.corewebvitals.io/core-web-vitals))
- **3–5 polished real artifacts beat 10+ thin ones;** 84% of employers want live/working demos; show process, not just results. ([zencoder](https://zencoder.ai/blog/how-to-create-software-engineer-portfolio), [interviewnode](https://www.interviewnode.com/post/ml-engineer-portfolio-projects-that-will-get-you-hired-in-2025))

## 4 · AI-native + interactive features (and the APIs)
- The dominant pattern is **RAG "chat with my CV" grounded in your own corpus** with a strict no-hallucination / respect-tags prompt + streaming; reference impls exist (ChatCV; rye.dev's per-page-aware "Ask"). ([ChatCV](https://github.com/FinnBehrendt/ChatCV), [rye.dev](https://rye.dev/blog/building-ask-rag-portfolio-chatbot/), [Vercel AI SDK](https://sdk.vercel.ai/docs/guides/rag-chatbot))
- **It demonstrably converts:** ChatJC (Joshua Curry) and VAi (Priyam Patil) are real job-seeker résumé bots reported to beat cold applications. ([CNBC](https://www.cnbc.com/2026/04/30/these-2-job-seekers-built-ai-chatbots-to-talk-to-recruiters-for-them.html))
- **Audience-tailored / generative UI** — pages that detect intent and re-surface the most relevant proof (the <3-min recruiter reality). ([stan.vision](https://www.stan.vision/journal/ux-ui-trends-shaping-digital-products))
- **Fun, no-auth terminal endpoints** (all CORS-friendly): Chuck Norris (`api.chucknorris.io`), Advice Slip, dad jokes, GitHub stats, weather (`open-meteo`/`wttr.in`), now-playing. ([no-auth API list](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/))
- **Pitfalls + mitigations:** cost (semantic caching ~20–30%, token caps), abuse/injection (IP rate-limit, strict system prompt, input guards), latency (stream + typing indicator), hallucination (tight grounding + curated ledger), a11y (semantic fallback, reduced-motion, ARIA-live), privacy (coarse geo, no storage). ([upstash](https://upstash.com/blog/degree-guru), [ChatCV](https://github.com/FinnBehrendt/ChatCV))

## 5 · Standout named examples
- **Bruno Simon** (bruno-simon.com) — drivable 3D car; the site *is* the Three.js demo. The canonical "you have to try this."
- **Robby Leonardi** — side-scrolling platformer résumé; the original "résumé as a game."
- **rye.dev "Ask"** — per-page-aware RAG chatbot, injection-hardened, framed as "expert system about my work," not a clone.
- **Vishal Bakshi** — a "portfolio you can chat with" + an **open-sourced eval harness** (the rigor is the flex).
- **Adham Dannaway** — split-screen "designer / developer" toggle that resolves "can you do both?" instantly.
- **VS Code-skin portfolios / `npx <name>` résumés** — developer-native metaphors that travel in dev communities.
- **Brittany Chiang** — clean dev portfolio whose open-source repo (8,200★) became the default fork — distribution as credibility.

### What makes people forward a site
"You have to try this" (interactive novelty) · "it runs in my terminal" (a medium they use daily) · "ask it — it actually knows his work" (grounded, not slop) · "they proved the number" (a stat to repeat to their boss) · "it answers the exact doubt I had" (resolves a hiring objection). ([figma](https://www.figma.com/resource-library/portfolio-website-examples/), [theinterviewguys](https://blog.theinterviewguys.com/portfolio-website-examples/))

---

## Ranked recommendations (→ what v3 implements)
1. **Position explicitly as the Forward-Deployed / "sells-AND-builds" hire**, in the labs' own language. → ✅ hero + FDE line + sells/builds split.
2. **Make the live, grounded console the hero;** the site = the artifact you forward. → ✅ self-booting ask-bill terminal.
3. **Tailor to the reader** (the signature). → ✅ Hiring-Manager Mode.
4. **Cite every claim; ledger in the open.** → ✅ prove-it receipts + drawer.
5. **One-click, present-tense "book / forward me."** → ✅ close + copyable forward line.
6. **Live "still building" signal + playful endpoints.** → ✅ GitHub heartbeat, `chuck`, konami, `sudo hire-bill`.
7. **Anti-slop craft:** break font+gradient, reduced-motion, edge states, CWV. → ✅ mono/instrument system, spectrum reserved, graceful fallbacks.
8. **Menu for next** (not yet built): reference-check roleplay, mock negotiation, lens toggle, eval harness, `npx billbricker`, particle field, voice. → see `V3-NOTES.md`.
