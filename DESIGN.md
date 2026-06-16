# DESIGN.md — Brick vSales design system

## Theme & scene
A near-black **operator console at night** — focused, premium, AI-native. Dark mode is intrinsic to the character (a terminal-native frontier-tech operator), not a default-for-cool.

## Tokens (`sales/ai-forward.css` `:root`)
- bg `#08090a` / bg2 `#0c0e10`; ink `#f4f6f7`; mute `#9aa0a8`; faint `#666d74`
- glass `rgba(255,255,255,.045)`; line `rgba(255,255,255,.09)`
- spectrum: green `#5be8a0` → cyan `#36c6e0` → violet `#8b7cf0` → coral `#ff8a6b`
- radius `22px`; blur `20px`; maxw `1120px`; ease `cubic-bezier(.22,.61,.36,1)`

## Type
- Display **Bricolage Grotesque** (700–800) · Body **Hanken Grotesk** (400–600) · Mono **JetBrains Mono** (labels/terminal).
- Display letter-spacing floor **−0.04em**. Body line length ≤ 70ch. `text-wrap: balance` on h1–h3.

## Brand signatures (KEEP — identity-preservation wins over generic anti-slop rules)
- The **spectrum gradient** is the brand mark. Use it **sparingly** (1–2 hero moments per page — the H1 accent, the contact close), NOT on every section header.
- Glass cards + mesh + grain = brand atmosphere; keep, but don't nest or over-apply.
- **Motion energy** (drift, count-ups, the flip card + teaser, constellation float, terminal typing) — keep; an all-muted pass was rejected (2026-06-13). Every animation needs a `prefers-reduced-motion` alternative.

## Anti-slop guardrails (Impeccable, reconciled with the brand)
- No gradient text beyond the 1–2 signature spots; section H2s = solid ink.
- No tiny tracked uppercase eyebrow / `01·02·03` marker on **every** section — vary the cadence; numbers only where it's a real sequence (the climb).
- **No side-stripe borders** (the stat-badge left-edge → full subtle border / leading dot).
- **No identical card grids** (the constellation replaced the logo-card grid).
- Cards ≤ 22px radius; never nest cards.
- Contrast: body ≥ 4.5:1, large ≥ 3:1; `faint` only for non-essential micro-labels.

## Key components
- **Flip identity card** — whole-card flip; front portrait / back operator profile (photo → "Zero-to-one builder · forward-deployed GTM operator" → interactive proof bars) + glow + auto-flip teaser.
- **Partner constellation** — floating logo stars over a connective starfield; Google = bright anchor.
- **Live terminal** — `ask-bill` backend; boots `whoami` on scroll.
- **Climb** — interactive 20-year story map (`sales/climb.html`).
- **Centerpiece proof stats** — Dreamship/Google.

## Responsive
Mobile integrity is **non-negotiable** ("things must show up on mobile"). Breakpoints 560 / 680 / 760 / 900. Verify every section at 390px. Heavy media (the 9.8MB video) is gated off mobile.
