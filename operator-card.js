/* =============================================================================
   <operator-card> — Bill Bricker's identity card, as a Web Component.

   "Operator Card v6.5": a portrait 3:4 foil card holding SIX facets of one
   operator — Builder · Connector Capital · 3× Father · Vibe Pusher · GTM ·
   Community. Facets change with an aperture bloom (a circular clip-path wipe
   that radiates from the touch origin); a "live wire" of accent light travels
   the border at rest and surges on a flip; pointer / drag / gyro drive tilt +
   parallax across the photo, text, and a violet holographic foil; the card
   floats on a slow idle sine.

   Framework-agnostic custom element (Shadow DOM, vanilla JS, no runtime deps).
   Ported natively from the Claude Design v6.5 source
   (`design_handoff_operator_card/reference/operator-card-v6.5-source.dc.html`,
   a dc-runtime component) — re-implemented in a tuned rAF loop against the
   site's real tokens (--accent #6fefb4, --bg #08090a, Bricolage / Hanken /
   JetBrains Mono, --ease) so the element is self-contained and safe to drop
   into any page. Per-frame motion is done by mutating refs + CSS vars (never
   re-rendering) so tilt tracks the cursor without jank.

   Navigate by tap (= next), swipe, arrow keys, or the dot rail.

   Usage:
     <script src="operator-card.js" defer></script>
     <operator-card start="builder" auto-advance="true"></operator-card>

   Optional attributes (defaults match the v6.5 spec's Tweaks):
     asset-base="assets/"    directory holding the facet photos (default "assets/")
     start="builder"         facet to open on (builder|payforward|father|dj|gtm|community)
     text-density="Medium"   text shown (Full · Medium · Off)
     flip-mode="Tap"         how facets change (Tap · Swipe · Buttons)
     flip-speed="Quick"      bloom duration (Quick · Calm · Luxe)
     parallax="9"            tilt strength 1–10 (→ up to 22° of tilt)
     motion="Auto"           Auto (honor OS reduced-motion) · Full (force on) · Off
     accent="#6fefb4"        global green accent (facet 4 / DJ overrides to pink)
     foil-intensity="1"      holographic foil strength (0–2)
     flip-depth="0.8"        foil-flash punch on a facet change (0–1.4)
     auto-advance="false"    advance once after entering view ("true" to enable)
     tilt="…"                optional hard override of max tilt in degrees

   Honors prefers-reduced-motion (static card, instant facet swaps, no float /
   foil / wire travel) under motion="Auto", and degrades to tap/swipe on
   coarse-pointer / touch devices (with gyro tilt where available).
============================================================================= */
(function () {
  "use strict";
  if (customElements.get("operator-card")) return;

  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

  // Shadow DOM resolves @font-face registered at document level, so inject the
  // brand-font link once into <head> if the host page hasn't already loaded it.
  function ensureFonts() {
    if (document.querySelector("link[data-operator-card-fonts]")) return;
    if (document.querySelector('link[href*="Bricolage+Grotesque"][href*="JetBrains+Mono"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_HREF;
    l.setAttribute("data-operator-card-fonts", "");
    document.head.appendChild(l);
  }

  // ----- the six facets (v6.5) ------------------------------------------------
  // `img` is a bare filename, resolved against asset-base at mount. Accent is
  // green (#6fefb4, the site token) on all facets except DJ, which is pink.
  var FACES = [
    {
      key: "builder", kind: "cover", img: "bb-headshot-li.jpg", pos: "50% 24%",
      head: "0 → 1 Builder", sub: "AI-Native Force Multiplier",
      full: ["0 → 1 Builder", "AI-Native Force Multiplier"],
      aria: "Zero to one builder — AI-native force multiplier."
    },
    {
      key: "payforward", kind: "fit", img: "dreamship-donate.jpg", pos: "50% 4%",
      head: "Connector Capital", sub: "Pay it forward",
      full: ["Connector Capital", "Connection capital", "Pay it forward"],
      aria: "Connector capital — pay it forward. A Dreamship donation to Freedom United."
    },
    {
      key: "father", kind: "cover", img: "family.jpg", pos: "50% 30%", textPos: "top",
      head: "3 × Father", sub: "Guess which one matters more", subRole: "aside",
      full: ["3 × Father", "3 × Founder", "Guess which one matters more"],
      aria: "Three-time father, three-time founder — guess which one matters more."
    },
    {
      key: "dj", kind: "cover", img: "portrait-sales.jpg", pos: "50% 15%", vibrant: 1, accent: "#ff3fa0",
      head: "Vibe Pusher", sub: "Social Catalyst", headRole: "grad",
      full: ["Vibe Pusher", "aka DJ BillyGoat / PickleBill", "Social Catalyst"],
      aria: "Vibe pusher, also known as DJ BillyGoat or PickleBill — social catalyst."
    },
    {
      key: "gtm", kind: "cover", img: "family-luau.jpg", pos: "50% 26%",
      head: "GTM Operator", sub: "Closes the room",
      full: ["GTM Operator", "Closes the room"],
      aria: "GTM operator — closes the room."
    },
    {
      key: "community", kind: "cover", img: "community-rooftop.jpg", pos: "50% 50%", textPos: "top",
      head: "Community Curator", sub: "Brings the room together",
      full: ["Community Curator", "Brings the room together"],
      aria: "Community curator — brings the room together."
    }
  ];

  var EQBARS = [
    "0s", ".18s", ".05s", ".24s", ".1s", ".3s", ".08s", ".21s", ".14s", ".27s",
    ".03s", ".16s", ".22s", ".07s", ".25s", ".12s", ".19s", ".29s", ".09s", ".15s"
  ];

  // --accent #6fefb4 — the site's real brand green. PORT DECISION (C2 #1): the
  // v6.5 design used #8BE48A; we default to the LIVE token for one consistent
  // global green. One-token change if Bill prefers the design green.
  var ACCENT_DEFAULT = "#6fefb4";
  var LS_KEY = "opcard_v65_panel";

  // The DJ color-dodge wash + equalizer markup (card-only pink/cyan/amber).
  var DJ_OVERLAY =
    '<div class="dj-wash" aria-hidden="true"></div>' +
    '<div class="dj-eq" aria-hidden="true">' +
    EQBARS.map(function (d) { return '<i style="animation-delay:' + d + '"></i>'; }).join("") +
    "</div>";

  // Live wire — a resting current that travels the card edge (the v6.5 signature).
  var WIRE_SVG =
    '<svg class="wire" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">' +
      '<rect x="2" y="2" width="296" height="396" rx="20" ry="20" pathLength="1000" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1.1" vector-effect="non-scaling-stroke"></rect>' +
      '<rect class="wire-live" x="2" y="2" width="296" height="396" rx="20" ry="20" pathLength="1000" fill="none" stroke="#6fefb4" stroke-width="1.8" stroke-linecap="round" vector-effect="non-scaling-stroke" stroke-dasharray="58 942"></rect>' +
    "</svg>";

  var STYLE = [
    ":host{display:block;font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-user-select:none;user-select:none}",
    "*{box-sizing:border-box}",
    ".scene{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;overflow:visible}",
    ".aura{position:absolute;top:50%;left:50%;width:64vmin;max-width:480px;height:64vmin;max-height:480px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.22),transparent 66%);filter:blur(64px);pointer-events:none;animation:v6Aura 22s ease-in-out infinite}",
    ".wrap{position:relative;width:min(360px,100%);aspect-ratio:3/4;z-index:2;touch-action:pan-y;cursor:grab;outline:none}",
    ".wrap:focus-visible{outline:2px solid #6fefb4;outline-offset:7px;border-radius:30px}",
    ".edges{position:absolute;inset:0;pointer-events:none;z-index:7;color:rgba(244,247,240,.5);font-size:15px}",
    ".edges span{position:absolute;top:50%;transform:translateY(-50%)}",
    ".edges .l{left:8px;animation:v6Edge 3.6s ease-in-out 1.6s infinite}",
    ".edges .r{right:8px;animation:v6Edge 3.6s ease-in-out 2.5s infinite}",
    ".persp{position:absolute;inset:0;perspective:1100px}",
    ".card{position:absolute;inset:0;will-change:transform;--px:0;--py:0;--fx:50%;--fy:50%;--fhue:0deg;--fop:.12;--gop:0}",
    ".body{position:absolute;inset:0;border-radius:22px;overflow:hidden;background:#0a0c0e;border:1px solid rgba(255,255,255,.12);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 40px 100px -40px rgba(0,0,0,.95)}",
    ".fwrap{position:absolute;inset:0}",
    ".backdrop{position:absolute;inset:0;background-size:cover;background-position:center}",
    ".img{position:absolute;inset:0;background-repeat:no-repeat}",
    ".scrim{position:absolute;inset:0;pointer-events:none}",
    ".bullets{position:absolute;left:0;right:0;transform:translate(calc(var(--px,0)*14px),calc(var(--py,0)*14px))}",
    ".bcol{display:flex;flex-direction:column;gap:6px;padding-left:16px}",
    ".bcol>div{font-family:'Bricolage Grotesque',system-ui,sans-serif;line-height:1.06;letter-spacing:-.015em;text-wrap:pretty}",
    ".dj-wash{position:absolute;inset:0;pointer-events:none;mix-blend-mode:color-dodge;opacity:.82;background:radial-gradient(120% 80% at 20% 16%,rgba(255,45,155,.72),transparent 52%),radial-gradient(120% 80% at 84% 28%,rgba(54,198,224,.6),transparent 54%),radial-gradient(90% 72% at 60% 98%,rgba(255,176,80,.5),transparent 60%)}",
    ".dj-eq{position:absolute;left:24px;right:24px;bottom:176px;height:50px;display:flex;align-items:flex-end;gap:4px;opacity:.96;filter:drop-shadow(0 0 10px rgba(255,79,160,.5))}",
    ".dj-eq i{flex:1;height:100%;border-radius:2px;background:linear-gradient(180deg,#ff4fa0,#ffb050 55%,#5ee0d6);transform-origin:bottom;animation:v6Beat .7s ease-in-out infinite}",
    ".incoming{position:absolute;inset:0;display:none}",
    ".incoming.on{display:block}",
    ".clip{position:absolute;inset:0}",
    ".radiate{position:absolute;width:80px;height:80px;border-radius:50%;pointer-events:none;mix-blend-mode:screen;filter:blur(2px) saturate(1.4);z-index:5}",
    ".mesh-foil{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:calc(var(--fop,.12)*1.1);background:linear-gradient(rgba(167,139,250,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.10) 1px,transparent 1px);background-size:32px 32px,32px 32px;-webkit-mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%);mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%)}",
    ".foil{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--fop,.12);background:repeating-linear-gradient(82deg,rgba(255,255,255,.05) 0 1.5px,transparent 1.5px 4px),repeating-linear-gradient(115deg,rgba(150,130,255,.6) 0%,rgba(196,150,255,.5) 16%,rgba(120,110,255,.55) 32%,rgba(180,140,255,.55) 48%,rgba(150,130,255,.6) 64%,rgba(200,160,255,.5) 82%,rgba(150,130,255,.6) 100%);background-size:200% 200%,240% 240%;background-position:var(--fx,50%) var(--fy,50%);filter:hue-rotate(var(--fhue,0deg)) saturate(1.25);-webkit-mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%);mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%)}",
    ".sheen{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;background:linear-gradient(115deg,transparent 34%,rgba(190,170,255,.10) 47%,rgba(255,255,255,.16) 50%,rgba(190,170,255,.10) 53%,transparent 66%);background-size:300% 100%;animation:v6Sheen 10s ease-in-out infinite}",
    ".glare{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--gop,0);background:radial-gradient(340px circle at var(--fx,50%) var(--fy,50%),rgba(255,255,255,.5),rgba(190,170,255,.08) 34%,transparent 62%)}",
    ".wire{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:6}",
    ".wire-live{filter:drop-shadow(0 0 4px currentColor)}",
    ".ring{position:absolute;inset:0;pointer-events:none;border-radius:22px;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 0 1px rgba(255,255,255,.05);z-index:6}",
    ".rail{display:flex;align-items:center;gap:9px;justify-content:center;z-index:2}",
    ".rail span{height:7px;border-radius:50%;cursor:pointer;transition:all .4s ease}",
    "@keyframes v6Aura{0%,100%{transform:translate(-50%,-50%) translate(-3%,-2%) scale(1)}50%{transform:translate(-50%,-50%) translate(4%,3%) scale(1.14)}}",
    "@keyframes v6Edge{0%,100%{opacity:.1}50%{opacity:.4}}",
    "@keyframes v6Beat{0%,100%{transform:scaleY(.2)}45%{transform:scaleY(1)}72%{transform:scaleY(.5)}}",
    "@keyframes v6Radiate{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}16%{opacity:.95}46%{opacity:.26}62%{opacity:.5}100%{opacity:0;transform:translate(-50%,-50%) scale(11)}}",
    "@keyframes v6Sheen{0%{background-position:210% 0;opacity:.24}50%{background-position:-30% 0;opacity:.5}100%{background-position:-230% 0;opacity:.24}}",
    "@media (prefers-reduced-motion: reduce){.aura,.sheen,.dj-eq i,.edges span{animation:none !important}}"
  ].join("\n");

  function hexA(hex, a) {
    var m = (hex || ACCENT_DEFAULT).replace("#", "");
    var n = m.length === 3 ? m.split("").map(function (c) { return c + c; }).join("") : m;
    var r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  class OperatorCard extends HTMLElement {
    connectedCallback() {
      if (this._mounted) return;
      this._mounted = true;
      ensureFonts();

      // ---- settings (attributes → props, defaults per the v6.5 Tweaks spec) --
      this.assetBase = (this.getAttribute("asset-base") || "assets/").replace(/\/?$/, "/");
      this.accent = this.getAttribute("accent") || ACCENT_DEFAULT;
      this.textDensity = this.getAttribute("text-density") || "Medium";  // Full · Medium · Off
      this.flipMode = this.getAttribute("flip-mode") || "Tap";            // Tap · Swipe · Buttons
      this.flipSpeed = this.getAttribute("flip-speed") || "Quick";        // Quick · Calm · Luxe
      this.motionMode = this.getAttribute("motion") || "Auto";            // Auto · Full · Off
      this.parallax = this.hasAttribute("parallax") ? parseFloat(this.getAttribute("parallax")) : 9;
      this.foilI = this.hasAttribute("foil-intensity") ? parseFloat(this.getAttribute("foil-intensity")) : 1;
      this.flipDepth = this.hasAttribute("flip-depth") ? parseFloat(this.getAttribute("flip-depth")) : 0.8;
      this.tiltOverride = this.hasAttribute("tilt") ? parseFloat(this.getAttribute("tilt")) : null;
      this.autoAdvance = this.getAttribute("auto-advance") === "true";

      this.osReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.coarse = matchMedia("(pointer: coarse)").matches;

      // ---- starting facet: localStorage > start attr > 0 ---------------------
      var saved = -1;
      try { var v = parseInt(localStorage.getItem(LS_KEY), 10); if (v >= 0 && v < FACES.length) saved = v; } catch (e) {}
      if (saved < 0) {
        var startKey = this.getAttribute("start");
        var si = startKey ? FACES.findIndex(function (f) { return f.key === startKey; }) : 0;
        saved = si >= 0 ? si : 0;
      }
      this.cur = saved;
      this.next = null;
      this.phase = "idle"; // idle | arm | go
      this.ox = 50; this.oy = 50;

      // per-frame scalars (mutated in the rAF loop, never via re-render)
      this.px = 0; this.py = 0; this.tpx = 0; this.tpy = 0;
      this.dragOX = 0; this.dragOY = 0; this.tdragX = 0; this.tdragY = 0;
      this.flash = 0; this.clock = 0; this.wireOff = 0;
      this.dragging = false; this.moved = false; this.gyroActive = false;

      this._build();
      this._renderCur();
      this._renderRail();
      this.applyCard();

      // bind gyro directly where no permission gate is required (Android etc.)
      var needPerm = (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function");
      if (!needPerm) window.addEventListener("deviceorientation", this.onOrient);

      if (!this.isReduced()) {
        this.running = true;
        this.raf = requestAnimationFrame(this._loop);
        if (this.autoAdvance && "IntersectionObserver" in window) {
          var self = this;
          this.io = new IntersectionObserver(function (ents) {
            ents.forEach(function (e) {
              if (e.isIntersecting && !self.didAuto) {
                self.didAuto = true;
                self.io.disconnect();
                self._a = setTimeout(function () {
                  if (self.running && self.phase === "idle" && !self.dragging) self.go(+1);
                }, 2000);
              }
            });
          }, { threshold: 0.5 });
          this.io.observe(this.wrapEl);
        }
      }
    }

    disconnectedCallback() {
      this.running = false;
      cancelAnimationFrame(this.raf);
      if (this._t) clearTimeout(this._t);
      if (this._a) clearTimeout(this._a);
      if (this.io) this.io.disconnect();
      window.removeEventListener("deviceorientation", this.onOrient);
    }

    asset(p) { return p ? this.assetBase + p : ""; }

    // motion gate — Auto honors the OS setting; Full forces on; Off forces off.
    isReduced() {
      if (this.motionMode === "Full") return false;
      if (this.motionMode === "Off") return true;
      return !!this.osReduced;
    }
    // A6-tuned flip durations (snappier defaults than the source).
    flipMs() { var s = this.flipSpeed; return s === "Luxe" ? 1120 : (s === "Calm" ? 880 : 670); }
    // max tilt in degrees: parallax 1–10 → up to 22°; damped on small viewports (A6).
    tiltMax() {
      var base = this.tiltOverride != null ? this.tiltOverride : (this.parallax / 10) * 22;
      return base * (window.innerWidth < 480 ? 0.86 : 1);
    }

    // ---- markup --------------------------------------------------------------
    _build() {
      var root = this.attachShadow({ mode: "open" });
      root.innerHTML =
        "<style>" + STYLE + "</style>" +
        '<div class="scene" part="scene">' +
          '<div class="aura" aria-hidden="true"></div>' +
          '<div class="wrap" tabindex="0" role="button" aria-label="Operator card — tap to flip, drag to move, arrow keys to change panels">' +
            '<div class="edges" aria-hidden="true"><span class="l">‹</span><span class="r">›</span></div>' +
            '<div class="persp">' +
              '<div class="card">' +
                '<div class="body">' +
                  '<div class="layer cur"></div>' +
                  '<div class="incoming"><div class="clip"></div><div class="radiate"></div></div>' +
                  '<div class="mesh-foil" aria-hidden="true"></div>' +
                  '<div class="foil" aria-hidden="true"></div>' +
                  '<div class="sheen" aria-hidden="true"></div>' +
                  '<div class="glare" aria-hidden="true"></div>' +
                  WIRE_SVG +
                  '<div class="ring" aria-hidden="true"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="rail" role="tablist" aria-label="Card panels"></div>' +
        '</div>';

      this.wrapEl = root.querySelector(".wrap");
      this.cardEl = root.querySelector(".card");
      this.curEl = root.querySelector(".layer.cur");
      this.incomingEl = root.querySelector(".incoming");
      this.clipEl = root.querySelector(".clip");
      this.radiateEl = root.querySelector(".radiate");
      this.wireEl = root.querySelector(".wire-live");
      this.railEl = root.querySelector(".rail");

      this._bind();
    }

    _bind() {
      var w = this.wrapEl, self = this;
      this.onDown = function (e) {
        self.requestGyro();
        if (self.phase !== "idle") return;
        self.dragging = true; self.dx = e.clientX; self.dy = e.clientY;
        self.dt = performance.now(); self.moved = false;
        try { w.setPointerCapture(e.pointerId); } catch (err) {}
        w.style.cursor = "grabbing";
      };
      // Hover/drag rotates the card (parallax follows the pointer); a drag also
      // physically carries it a little, springing back on release. Tap or swipe
      // (per flip-mode) changes facets.
      this.onMove = function (e) {
        if (self.isReduced()) return;
        var r = w.getBoundingClientRect();
        var nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        var ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (self.dragging) {
          var ddx = e.clientX - self.dx, ddy = e.clientY - self.dy;
          if (Math.abs(ddx) > 4 || Math.abs(ddy) > 4) self.moved = true;
          self.tpx = nx * 0.8; self.tpy = ny * 0.8;            // tilt dampened during carry
          self.tdragX = Math.max(-44, Math.min(44, ddx * 0.22));
          self.tdragY = Math.max(-44, Math.min(44, ddy * 0.22));
          return;
        }
        self.tpx = nx; self.tpy = ny;
      };
      this.onUp = function (e) {
        if (!self.dragging) return;
        self.dragging = false;
        try { w.releasePointerCapture(e.pointerId); } catch (err) {}
        w.style.cursor = "grab";
        if (!self.gyroActive) { self.tpx = 0; self.tpy = 0; }  // spring back to rest
        self.tdragX = 0; self.tdragY = 0;
        var ddx = e.clientX - self.dx, ddy = e.clientY - self.dy;
        var dist = Math.hypot(ddx, ddy), dt = performance.now() - self.dt;
        var mode = self.flipMode;
        if (mode === "Buttons") return;                         // dots / keys only
        var o = self._origin(e);
        if (dist < 10 && dt < 500) { if (mode === "Tap") self.go(+1, null, o.ox, o.oy); return; }
        var thresh = mode === "Swipe" ? 28 : 36;                // a deliberate throw
        if (dist < thresh) return;
        if (Math.abs(ddx) >= Math.abs(ddy)) self.go(ddx < 0 ? +1 : -1, null, o.ox, o.oy);
        else self.go(ddy < 0 ? +1 : -1, null, o.ox, o.oy);
      };
      this.onKey = function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") { self.go(+1); e.preventDefault(); }
        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { self.go(-1); e.preventDefault(); }
        else if (e.key === "Enter" || e.key === " ") { self.go(+1); e.preventDefault(); }
      };
      w.addEventListener("pointerdown", this.onDown);
      w.addEventListener("pointermove", this.onMove);
      w.addEventListener("pointerup", this.onUp);
      w.addEventListener("pointercancel", this.onUp);
      w.addEventListener("pointerleave", function () { if (!self.dragging && !self.gyroActive) { self.tpx = 0; self.tpy = 0; } });
      w.addEventListener("keydown", this.onKey);
    }

    onOrient = (e) => {
      if (!e || e.gamma == null || e.beta == null || this.isReduced() || this.dragging) return;
      this.tpx = Math.max(-1, Math.min(1, (e.gamma || 0) / 22));
      this.tpy = Math.max(-1, Math.min(1, ((e.beta || 0) - 38) / 22));
      this.gyroActive = true;
    };
    requestGyro() {
      if (this._gyroAsked || this.isReduced()) return;
      this._gyroAsked = true;
      try {
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
          var self = this;
          DeviceOrientationEvent.requestPermission().then(function (s) {
            if (s === "granted") window.addEventListener("deviceorientation", self.onOrient);
          }).catch(function () {});
        }
      } catch (err) {}
    }

    _origin(e) {
      var r = this.wrapEl.getBoundingClientRect();
      return {
        ox: Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)),
        oy: Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100))
      };
    }

    ring(s) { var n = FACES.length; return ((this.cur + s) % n + n) % n; }
    faceAccent(f) { return (f && f.accent) || this.accent || ACCENT_DEFAULT; }

    // ---- per-facet copy by text density --------------------------------------
    styleFor(role, acc) {
      if (role === "grad") return "font-weight:800;font-size:30px;background:linear-gradient(92deg,#ff4fa0,#ffb050 46%,#5ee0d6);-webkit-background-clip:text;background-clip:text;color:transparent;";
      if (role === "aside") return "font-weight:500;font-size:19px;font-style:italic;color:rgba(244,247,240,.7);font-family:'Hanken Grotesk',sans-serif;";
      if (role === "mid") return "font-weight:600;font-size:21px;color:#f4f7f0;";
      return "font-weight:800;font-size:28px;color:" + acc + ";"; // head
    }
    buildLines(f, acc) {
      var density = this.textDensity;
      if (density === "Off") return [];
      var self = this;
      if (density === "Full") {
        var arr = f.full || [f.head, f.sub];
        return arr.map(function (t, i) {
          var role = i === 0 ? (f.headRole || "head") : "mid";
          if (i === arr.length - 1 && f.subRole === "aside") role = "aside";
          return { t: t, style: self.styleFor(role, acc) };
        });
      }
      // Medium = headline + one-liner under
      var out = [{ t: f.head, style: this.styleFor(f.headRole || "head", acc) }];
      if (f.sub) out.push({ t: f.sub, style: this.styleFor(f.subRole || "mid", acc) });
      return out;
    }

    // ---- per-facet decoration (mirrors the v6.5 source deco()) ----------------
    deco(f) {
      var acc = this.faceAccent(f);
      var isFit = f.kind === "fit", top = f.textPos === "top";
      var img = this.asset(f.img), wrapStyle, backdropStyle = "display:none;", imgStyle = "";
      if (isFit) {
        wrapStyle = "transform:translate(calc(var(--px,0)*-6px),calc(var(--py,0)*-6px));";
        backdropStyle = "background-image:url(" + img + ");filter:blur(32px) saturate(1.3) brightness(.3);transform:scale(1.5);";
        imgStyle = "background-image:url(" + img + ");background-size:contain;background-position:" + f.pos + ";";
      } else {
        wrapStyle = "transform:translate(calc(var(--px,0)*-9px),calc(var(--py,0)*-9px)) scale(1.06);";
        var filt = f.vibrant ? "filter:saturate(1.5) contrast(1.06);" : "";
        imgStyle = "background-image:url(" + img + ");background-size:cover;background-position:" + f.pos + ";" + filt;
      }
      var scrimStyle;
      if (top) scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.9) 0%,rgba(8,9,10,.46) 20%,transparent 46%,transparent 84%,rgba(8,9,10,.4) 100%);";
      else if (isFit) scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.55) 0%,rgba(8,9,10,.12) 18%,transparent 42%,rgba(8,9,10,.6) 64%,rgba(8,9,10,.96) 100%);";
      else scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.16) 0%,transparent 30%,rgba(8,9,10,.14) 46%,rgba(8,9,10,.64) 70%,rgba(8,9,10,.94) 100%);";
      var bulletsBox = top ? "top:0;padding:26px 26px 20px;" : "bottom:0;padding:24px 26px 28px;";
      var bullets = this.buildLines(f, acc);
      return {
        wrapStyle: wrapStyle, backdropStyle: backdropStyle, imgStyle: imgStyle,
        scrimStyle: scrimStyle, bulletsBox: bulletsBox, bullets: bullets,
        showText: bullets.length > 0, isDj: !!f.vibrant, accentBorder: hexA(acc, 0.55)
      };
    }

    _layerHTML(f) {
      var d = this.deco(f);
      var bullets = d.bullets.map(function (b) { return '<div style="' + b.style + '">' + b.t + "</div>"; }).join("");
      return (
        '<div class="fwrap" style="' + d.wrapStyle + '">' +
          '<div class="backdrop" aria-hidden="true" style="' + d.backdropStyle + '"></div>' +
          '<div class="img" aria-hidden="true" style="' + d.imgStyle + '"></div>' +
        "</div>" +
        '<div class="scrim" aria-hidden="true" style="' + d.scrimStyle + '"></div>' +
        (d.isDj ? DJ_OVERLAY : "") +
        (d.showText
          ? '<div class="bullets" style="' + d.bulletsBox + '"><div class="bcol" style="border-left:2px solid ' + d.accentBorder + '">' + bullets + "</div></div>"
          : "")
      );
    }

    _renderCur() {
      var f = FACES[this.cur];
      this.curEl.innerHTML = this._layerHTML(f);
      this.wrapEl.setAttribute(
        "aria-label",
        f.head + ", panel " + (this.cur + 1) + " of " + FACES.length + ". " + f.aria + " Tap to flip, drag to move, arrow keys to change panels."
      );
    }

    _renderRail() {
      this.railEl.innerHTML = "";
      var self = this;
      FACES.forEach(function (ff, idx) {
        var on = idx === self.cur, fa = self.faceAccent(ff);
        var s = document.createElement("span");
        s.setAttribute("role", "tab");
        s.setAttribute("aria-label", ff.head);
        s.setAttribute("aria-selected", on ? "true" : "false");
        s.style.cssText =
          "width:" + (on ? "9px" : "7px") + ";height:" + (on ? "9px" : "7px") + ";" +
          "background:" + (on ? fa : "rgba(244,247,240,.26)") + ";" +
          "box-shadow:" + (on ? "0 0 9px " + hexA(fa, 0.85) : "none") + ";";
        s.addEventListener("click", function () {
          if (idx === self.cur || self.phase !== "idle") return;
          self.go(idx > self.cur ? +1 : -1, idx);
        });
        self.railEl.appendChild(s);
      });
    }

    persist(i) { try { localStorage.setItem(LS_KEY, String(i)); } catch (e) {} }

    // ---- facet change: aperture bloom ----------------------------------------
    go(dir, target, ox, oy) {
      if (this.phase !== "idle") return;
      if (this._a) { clearTimeout(this._a); this._a = null; }
      if (this._t) { clearTimeout(this._t); this._t = null; }
      var next = (target != null) ? target : this.ring(dir);
      if (next === this.cur) return;

      if (this.isReduced()) { this.cur = next; this._renderCur(); this._renderRail(); this.persist(next); return; }

      var cx = (ox != null) ? ox : 50, cy = (oy != null) ? oy : 50;
      var ms = this.flipMs();
      this.next = next; this.ox = cx; this.oy = cy; this.phase = "arm";
      this.flash = 1;

      // incoming facet, clip closed at the touch origin
      this.clipEl.innerHTML = this._layerHTML(FACES[next]);
      var cp = "circle(0% at " + cx + "% " + cy + "%)";
      this.clipEl.style.cssText =
        "position:absolute;inset:0;clip-path:" + cp + ";-webkit-clip-path:" + cp + ";" +
        "transition:clip-path " + ms + "ms cubic-bezier(.4,.72,.24,1),-webkit-clip-path " + ms + "ms cubic-bezier(.4,.72,.24,1);";

      // radiating foil-light band from the origin, tinted to the incoming accent
      var rcol = this.faceAccent(FACES[next]);
      this.radiateEl.style.cssText =
        "position:absolute;left:" + cx + "%;top:" + cy + "%;width:80px;height:80px;border-radius:50%;" +
        "pointer-events:none;mix-blend-mode:screen;filter:blur(2px) saturate(1.4);z-index:5;" +
        "background:radial-gradient(circle, transparent 24%, " + rcol + " 44%, transparent 66%);" +
        "transform:translate(-50%,-50%) scale(.18);animation:v6Radiate " + ms + "ms cubic-bezier(.3,.7,.3,1) forwards;";

      this.incomingEl.classList.add("on");

      var self = this;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (!self.running || self.phase !== "arm") return;
          self.phase = "go";
          var op = "circle(175% at " + cx + "% " + cy + "%)";
          self.clipEl.style.clipPath = op;
          self.clipEl.style.webkitClipPath = op;
        });
      });

      this._t = setTimeout(function () {
        self.cur = next; self.next = null; self.phase = "idle";
        self._renderCur();
        self._renderRail();
        self.incomingEl.classList.remove("on");
        self.radiateEl.style.animation = "none";
        self.persist(next);
      }, ms + 20);
    }

    // ---- rAF: parallax lerp, idle float, foil, live wire ----------------------
    _loop = (ts) => {
      if (!this.running) return;
      this.clock = ts || 0;
      // touch devices have no hover — give a gentle ambient sway at rest so the
      // foil/tilt breathe (unless the gyro is already driving it).
      if (this.coarse && !this.dragging && !this.gyroActive && !this.isReduced()) {
        this.tpx = Math.sin(this.clock * 0.00037) * 0.16;
        this.tpy = Math.cos(this.clock * 0.00029) * 0.12;
      }
      this.px += (this.tpx - this.px) * 0.14;                 // C2: snappier tracking
      this.py += (this.tpy - this.py) * 0.14;
      this.dragOX += ((this.tdragX || 0) - this.dragOX) * 0.16;
      this.dragOY += ((this.tdragY || 0) - this.dragOY) * 0.16;
      this.flash *= 0.91; if (this.flash < 0.01) this.flash = 0;  // A6: cleaner bloom decay

      if (this.wireEl) {
        var acc = this.faceAccent(FACES[this.next != null ? this.next : this.cur]);
        this.wireEl.style.stroke = acc;
        this.wireEl.style.color = acc; // drives the drop-shadow glow
        this.wireOff -= (0.42 + this.flash * 7);
        this.wireEl.style.strokeDashoffset = this.wireOff.toFixed(1);
        this.wireEl.style.opacity = (0.7 + this.flash * 0.3).toFixed(2);
      }

      this.applyCard();
      this.raf = requestAnimationFrame(this._loop);
    };

    applyCard() {
      var c = this.cardEl; if (!c) return;
      var t = this.tiltMax(), px = this.px || 0, py = this.py || 0;
      var fY = Math.sin(this.clock * 0.0008) * 3.0;
      var fX = Math.cos(this.clock * 0.0006) * 2.0;
      var dox = this.dragOX || 0, doy = this.dragOY || 0;
      c.style.transform =
        "translate3d(" + (fX + dox).toFixed(2) + "px," + (fY + doy).toFixed(2) + "px,0) " +
        "rotateX(" + (-py * t).toFixed(2) + "deg) rotateY(" + (px * t).toFixed(2) + "deg)";
      c.style.setProperty("--px", px.toFixed(3));
      c.style.setProperty("--py", py.toFixed(3));
      c.style.setProperty("--fx", (50 + px * 60).toFixed(1) + "%");
      c.style.setProperty("--fy", (50 + py * 60).toFixed(1) + "%");
      c.style.setProperty("--fhue", (px * 30).toFixed(1) + "deg");
      var fi = this.foilI, fd = this.flipDepth;
      var cur = FACES[this.cur];
      var boost = cur && cur.vibrant ? 1.8 : 1;
      var flash = this.flash || 0;
      // A6: a flip's foil punch is flash*0.72; idle foil stays light. Soft-capped.
      var fop = (0.10 + Math.abs(px) * 0.22 + Math.abs(py) * 0.16 + flash * 0.72 * fd) * fi * boost;
      c.style.setProperty("--fop", Math.min(0.72, fop).toFixed(3));
      c.style.setProperty("--gop", Math.min(0.8, (Math.abs(px) + Math.abs(py)) * 0.6 + flash * 0.5).toFixed(3));
    }
  }

  customElements.define("operator-card", OperatorCard);
})();
