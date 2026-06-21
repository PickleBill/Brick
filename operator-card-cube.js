/* =============================================================================
   FROZEN SNAPSHOT — registers <operator-card-cube>, a byte-for-byte copy of the
   v4 cube card as it shipped before the v6 hero port. Used ONLY by playground.html
   so the original concept survives once operator-card.js is replaced by v6.
   Do not edit to evolve the design — clone a new snapshot instead.

   <operator-card-cube> — Bill Bricker's holographic identity card, as a Web Component.

   A framework-agnostic custom element (Shadow DOM, vanilla JS, no runtime deps)
   that reproduces the "Operator Card v4" design: a portrait 3:4 faux-3D cube with
   six facets (identity · the work · home · after hrs · powder · proof). Two stacked
   face panels pivot around a shared lit seam to "turn" between facets; pointer (or
   phone gyro) drives tilt-parallax across layered depth planes, with a holographic
   foil, cursor glare, resting sheen + grain. Navigate by swipe, tap (= next),
   arrow keys, or the dot rail.

   Ported from the Claude Design prototypes `Operator Card v4.dc.html` +
   `Operator Face.dc.html`. The CDN libraries those used (Atropos / GSAP / Lenis)
   are intentionally re-implemented in a tuned rAF loop so the element is
   self-contained and safe to drop into any page.

   Usage:
     <script src="operator-card.js" defer></script>
     <operator-card></operator-card>

   Optional attributes:
     asset-base="assets/"   directory holding the images/logos (default "assets/")
     tilt-max="20"          max tilt in degrees
     foil-intensity="1"     holographic foil strength (0–2.5)
     cube-depth="0.65"      how far the turn dips into Z (0.4–1.6)
     start="identity"       facet to open on (identity|work|home|vibe|powder|signal)

   Honors prefers-reduced-motion (static card, instant facet swaps) and degrades
   to tap/gyro on coarse-pointer / touch devices.
============================================================================= */
(function () {
  "use strict";
  if (customElements.get("operator-card-cube")) return;

  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

  // Ensure the three brand fonts are available to the shadow tree. Shadow DOM
  // resolves @font-face registered at the document level, so we inject the link
  // once into <head> if the host page hasn't already loaded it.
  function ensureFonts() {
    if (document.querySelector('link[data-operator-card-fonts]')) return;
    if (
      document.querySelector(
        'link[href*="Bricolage+Grotesque"][href*="JetBrains+Mono"]'
      )
    )
      return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_HREF;
    l.setAttribute("data-operator-card-fonts", "");
    document.head.appendChild(l);
  }

  var GRAIN =
    "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>";

  // ----- shared content (from Operator Face) --------------------------------
  var BARS = [
    { n: "$45M+", d: "Google ad-spend", c: "#6fefb4", glow: "rgba(111,239,180,.6)" },
    { n: "6", d: "big-tech partners", c: "#5ee0d6", glow: "rgba(94,224,214,.6)" },
    { n: "11×", d: "zero-to-one · 2020", c: "#a78bfa", glow: "rgba(167,139,250,.6)" },
    { n: "40+", d: "apps shipped solo", c: "#ff8a5c", glow: "rgba(255,138,92,.6)" }
  ];
  var DESCRIPTORS = [
    { t: "Zero → 1 Builder" },
    { t: "GTM Operator" },
    { t: "Revenue Leader" },
    { t: "AI-Native Force Multiplier" }
  ];
  var STATS = [
    { v: "27", k: "pow days", c: "#ccff00", glow: "rgba(204,255,0,.45)", bd: "rgba(204,255,0,.4)", bg: "rgba(8,10,12,.62)" },
    { v: "4/4", k: "matching fits", c: "#ff2d9b", glow: "rgba(255,45,155,.45)", bd: "rgba(255,45,155,.4)", bg: "rgba(8,10,12,.62)" },
    { v: "11.2k", k: "summit vert", c: "#ccff00", glow: "rgba(204,255,0,.45)", bd: "rgba(204,255,0,.4)", bg: "rgba(8,10,12,.62)" },
    { v: "MAX", k: "stoke level", c: "#ff2d9b", glow: "rgba(255,45,155,.45)", bd: "rgba(255,45,155,.4)", bg: "rgba(8,10,12,.62)" }
  ];
  var LOGOS = [
    "logos/google.svg", "logos/meta.svg", "logos/microsoft.svg",
    "logos/ibm.png", "logos/stripe.svg", "logos/paypal.svg",
    "logos/macys.svg", "logos/zillow.svg", "logos/payoneer.svg"
  ];
  var EQBARS = [".0s", ".12s", ".05s", ".2s", ".08s", ".16s", ".02s", ".24s", ".1s"];
  var BEATBARS = (function () {
    var a = [];
    for (var i = 0; i < 22; i++) a.push((((i * 37) % 70) / 100).toFixed(2) + "s");
    return a;
  })();

  // ----- the six facets (from Operator Card v4 FACES) -----------------------
  var FACES = [
    { key: "identity", kind: "identity", label: "identity", accent: "#6fefb4", aura: "rgba(111,239,180,.22)", core: "rgba(111,239,180,.3)", foilBoost: 1,
      img: "bb-headshot-li.jpg",
      sub: { left: "-10%", top: "-8%", width: "120%", height: "120%", pos: "50% 15%", filter: "saturate(1.03) contrast(1.02)" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.05) 0%,transparent 36%,rgba(8,9,10,.5) 58%,#08090a 80%)", vignOp: 1, scan: 0, idx: "01" },
    { key: "work", kind: "work", label: "the work", accent: "#a78bfa", aura: "rgba(167,139,250,.24)", core: "rgba(167,139,250,.32)", foilBoost: 1,
      img: "dreamship-donate.jpg",
      sub: { left: "-8%", top: "-8%", width: "116%", height: "116%", pos: "50% 42%", filter: "saturate(1.05) brightness(.82)" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.22),transparent 24%,transparent 44%,rgba(8,9,10,.8) 64%,#08090a 92%)", vignOp: 1, scan: 0, idx: "02" },
    { key: "home", kind: "bleed", label: "home", accent: "#5ee0d6", aura: "rgba(94,224,214,.24)", core: "rgba(94,224,214,.32)", foilBoost: 1,
      img: "family.jpg",
      sub: { left: "-10%", top: "-10%", width: "120%", height: "120%", pos: "50% 22%", filter: "saturate(1.04)" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.06),transparent 32%,transparent 50%,rgba(8,9,10,.86) 86%,#08090a)", vignOp: 1, scan: 0,
      title: "3× founder.", title2: "3× father.", titleFill: "#5ee0d6", titleSize: "34px",
      caption: "You can guess which really matters.", captionStyle: "color:#f4f2ec;font-weight:600;", idx: "03" },
    { key: "vibe", kind: "vibe", label: "after hrs", accent: "#ff5fa8", aura: "rgba(255,95,168,.26)", core: "rgba(255,95,168,.34)", foilBoost: 1.9,
      img: "portrait-sales.jpg",
      sub: { left: "-10%", top: "-10%", width: "120%", height: "120%", pos: "50% 22%", filter: "saturate(1.3) contrast(1.06)" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.08),transparent 28%,transparent 48%,rgba(8,9,10,.84) 84%,#08090a)", vignOp: 1, scan: 1,
      title: "DJ Billygoat", titleFill: "linear-gradient(92deg,#ff5fa8,#ffb050 42%,#5ee0d6)", titleGradient: true, titleSize: "34px",
      caption: "after hours · sets the room on fire", captionStyle: "color:rgba(244,242,236,.74);", idx: "04" },
    { key: "powder", kind: "stats", label: "powder", accent: "#ccff00", aura: "rgba(255,45,155,.22)", core: "rgba(204,255,0,.26)", foilBoost: 1.1,
      img: "family-ski.jpg",
      sub: { left: "-6%", top: "60%", width: "112%", height: "48%", pos: "50% 26%", filter: "saturate(1.22) contrast(1.05)" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.97) 0%,rgba(8,9,10,.95) 46%,rgba(8,9,10,.5) 58%,rgba(8,9,10,.22) 70%,rgba(8,9,10,.62) 90%,#08090a 100%)", vignOp: 1, scan: 0, idx: "05" },
    { key: "signal", kind: "signal", label: "proof", accent: "#36c6e0", aura: "rgba(54,198,224,.22)", core: "rgba(54,198,224,.3)", foilBoost: 1,
      img: "", sub: { left: "0", top: "0", width: "100%", height: "100%", pos: "50% 50%", filter: "none" },
      vign: "linear-gradient(180deg,rgba(8,9,10,.3),transparent 38%,rgba(8,9,10,.45))", vignOp: 1, scan: 0, idx: "06" }
  ];

  // ring-neighbour + cube-side placement + landing angle, per swipe direction
  var DIRS = {
    left:  { axis: "Y", step:  1, target: -90, place: "translateX(100%) rotateY(90deg)",   origin: "left center" },
    right: { axis: "Y", step: -1, target:  90, place: "translateX(-100%) rotateY(-90deg)", origin: "right center" },
    up:    { axis: "X", step:  1, target:  90, place: "translateY(-100%) rotateX(-90deg)", origin: "bottom center" },
    down:  { axis: "X", step: -1, target: -90, place: "translateY(100%) rotateX(90deg)",   origin: "top center" }
  };

  var STYLE = [
    ":host{display:block;width:100%;--oc-w:360px;}",
    "*{box-sizing:border-box;}",
    ".scene{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;width:100%;font-family:'Hanken Grotesk',system-ui,sans-serif;user-select:none;-webkit-user-select:none;}",
    ".aura{position:absolute;top:50%;left:50%;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;transition:background .7s ease;}",
    ".aura.halo{width:min(82%,460px);aspect-ratio:1;filter:blur(60px);animation:ocDrift 17s ease-in-out infinite;}",
    ".aura.core{width:min(56%,250px);aspect-ratio:1;filter:blur(40px);}",
    ".card{position:relative;width:min(var(--oc-w),100%);aspect-ratio:3/4;z-index:2;touch-action:pan-y;cursor:grab;outline:none;perspective:1200px;}",
    ".card:focus-visible{outline:2px solid rgba(111,239,180,.6);outline-offset:6px;border-radius:24px;}",
    ".edge{position:absolute;inset:0;pointer-events:none;z-index:6;color:rgba(255,255,255,.4);font-family:'JetBrains Mono',monospace;font-size:9px;}",
    ".edge span{position:absolute;top:50%;transform:translateY(-50%);}",
    ".edge .l{left:12px;animation:ocEdge 2.8s ease-in-out 1.4s infinite;}",
    ".edge .r{right:12px;animation:ocEdge 2.8s ease-in-out 2.1s infinite;}",
    ".tilt{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform;transition:transform .25s cubic-bezier(.22,1,.36,1);}",
    ".stage{position:absolute;inset:0;perspective:900px;transform-style:preserve-3d;will-change:transform;--px:0;--py:0;--fx:50%;--fy:50%;--fhue:0deg;--fop:.13;--gop:0;}",
    ".panel{position:absolute;inset:0;transform-style:preserve-3d;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:transform,opacity;}",
    ".panel.b{opacity:0;visibility:hidden;}",
    ".seam{position:absolute;inset:0;pointer-events:none;border-radius:22px;opacity:0;z-index:7;}",
    ".rail{display:flex;align-items:center;gap:9px;justify-content:center;z-index:2;}",
    ".rail span{height:7px;border-radius:7px;cursor:pointer;transition:all .42s cubic-bezier(.22,1,.36,1);}",
    ".hint{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.34);z-index:2;}",
    ".hint .tick{width:5px;height:5px;border-radius:50%;background:#6fefb4;animation:ocTick 2s ease-in-out infinite;}",
    "@keyframes ocDrift{0%,100%{transform:translate(-54%,-53%) scale(1)}50%{transform:translate(-45%,-46%) scale(1.16)}}",
    "@keyframes ocTick{0%,100%{opacity:.3}50%{opacity:1}}",
    "@keyframes ocEdge{0%,100%{opacity:.1}50%{opacity:.4}}",
    "@keyframes ofScan{0%{background-position:0 0}100%{background-position:0 6px}}",
    "@keyframes ofBeat{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(.72)}}",
    "@keyframes ofBeat2{0%,100%{transform:scaleY(.16)}45%{transform:scaleY(1)}70%{transform:scaleY(.46)}}",
    "@keyframes ofSweep{0%{background-position:140% 0}100%{background-position:-140% 0}}",
    "@media (prefers-reduced-motion: reduce){.aura,.edge span,.hint .tick,.tilt{animation:none!important;transition:none!important;}}"
  ].join("");

  function OperatorCardProto() {}

  class OperatorCard extends HTMLElement {
    connectedCallback() {
      if (this._mounted) return;
      this._mounted = true;
      ensureFonts();

      this.assetBase = (this.getAttribute("asset-base") || "assets/").replace(/\/?$/, "/");
      this.tiltMax = parseFloat(this.getAttribute("tilt-max")) || 20;
      this.foilI = this.hasAttribute("foil-intensity") ? parseFloat(this.getAttribute("foil-intensity")) : 1;
      this.cubeD = this.hasAttribute("cube-depth") ? parseFloat(this.getAttribute("cube-depth")) : 0.65;

      this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.coarse = matchMedia("(pointer: coarse)").matches;
      this.fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

      var startKey = this.getAttribute("start");
      var si = startKey ? FACES.findIndex(function (f) { return f.key === startKey; }) : 0;
      this.i = si >= 0 ? si : 0;
      this.j = (this.i + 1) % FACES.length;

      this.angle = 0; this.dir = null; this.busy = false;
      this.nx = 0; this.ny = 0; this.tnx = 0; this.tny = 0;
      this.idleT = 0;

      this._build();
      this._bind();
      this._renderRail();
      this._applyAura();
      this.applyTurn();

      if (!this.reduced) {
        this.running = true;
        this.raf = requestAnimationFrame(this._loop);
      }
    }

    disconnectedCallback() {
      this.running = false;
      cancelAnimationFrame(this.raf);
      if (this._tw) cancelAnimationFrame(this._tw);
      if (this._orient) window.removeEventListener("deviceorientation", this._orient);
    }

    asset(p) { return p ? this.assetBase + p : ""; }

    // ---- markup --------------------------------------------------------------
    _build() {
      var root = this.attachShadow({ mode: "open" });
      root.innerHTML =
        "<style>" + STYLE + "</style>" +
        '<div class="scene" part="scene">' +
          '<div class="aura halo" aria-hidden="true"></div>' +
          '<div class="aura core" aria-hidden="true"></div>' +
          '<div class="card" part="card" tabindex="0" role="button" ' +
              'aria-label="Identity card — swipe, tap, or use arrow keys to turn the cube to another facet.">' +
            '<div class="edge" aria-hidden="true"><span class="l">◀</span><span class="r">▶</span></div>' +
            '<div class="tilt">' +
              '<div class="stage">' +
                '<div class="panel b"></div>' +
                '<div class="panel a"></div>' +
                '<div class="seam" aria-hidden="true"></div>' +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="rail" part="rail"></div>' +
          '<div class="hint"><span class="tick"></span>swipe or tap to turn · tilt to feel the depth</div>' +
        "</div>";

      this.cardEl = root.querySelector(".card");
      this.tiltEl = root.querySelector(".tilt");
      this.stageEl = root.querySelector(".stage");
      this.panelAEl = root.querySelector(".panel.a");
      this.panelBEl = root.querySelector(".panel.b");
      this.seamEl = root.querySelector(".seam");
      this.railEl = root.querySelector(".rail");
      this.haloEl = root.querySelector(".aura.halo");
      this.coreEl = root.querySelector(".aura.core");

      this.panelAEl.innerHTML = this._faceHTML(FACES[this.i]);
      this.curFoilBoost = FACES[this.i].foilBoost || 1;
    }

    // ---- a single Operator Face, as HTML (ported from Operator Face.dc.html) --
    _faceHTML(f) {
      var s = f.sub;
      var isSignal = f.kind === "signal";
      var isWork = f.kind === "work";
      var hideSub = isSignal || isWork;
      var subStyle = hideSub
        ? "display:none;"
        : "left:" + s.left + ";top:" + s.top + ";width:" + s.width + ";height:" + s.height +
          ";background-image:url(" + this.asset(f.img) + ");background-position:" + s.pos +
          ";filter:" + (s.filter || "none") + ";";
      var bgStyle = isSignal
        ? "background:radial-gradient(120% 80% at 50% 0%,#0e1a1d,#08090a 62%);"
        : "background-image:url(" + this.asset(f.img) + ");";
      var vignStyle = "background:" + f.vign + ";opacity:" + f.vignOp + ";";
      var scanOp = f.scan ? 0.4 : 0;
      var dotStyle = "background:" + f.accent + ";box-shadow:0 0 10px " + f.accent + ";";

      var bleedTitleStyle = f.titleGradient
        ? "font-size:" + f.titleSize + ";background:" + f.titleFill + ";-webkit-background-clip:text;background-clip:text;color:transparent;"
        : "font-size:" + f.titleSize + ";color:" + f.titleFill + ";";

      var topSpacer = f.kind !== "stats";
      var bottomSpacer = f.kind === "stats" || f.kind === "signal";

      var H = "";
      H += '<div style="position:absolute;inset:0;border-radius:22px;overflow:hidden;background:#0a0c0e;border:1px solid rgba(255,255,255,.12);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 40px 100px -40px rgba(0,0,0,.95);">';

      // L1 · blurred backdrop
      H += '<div style="position:absolute;inset:-15%;background-size:cover;background-position:center;filter:blur(9px) saturate(1.12) brightness(.6);transform:translate(calc(var(--px,0)*-9px),calc(var(--py,0)*-9px)) scale(1.14);' + bgStyle + '"></div>';
      H += '<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,9,10,.12),rgba(8,9,10,.36) 56%,rgba(8,9,10,.9));"></div>';

      // holographic mesh grid (pointer-masked)
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:calc(var(--fop,.13)*1.2);background:linear-gradient(rgba(255,255,255,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.10) 1px,transparent 1px);background-size:30px 30px,30px 30px;-webkit-mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%);mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%);"></div>';

      // L2 · subject image (+ work check overlay)
      H += '<div style="position:absolute;inset:0;transform:translate(calc(var(--px,0)*15px),calc(var(--py,0)*15px));">';
      H += '<div style="position:absolute;background-size:cover;' + subStyle + '"></div>';
      if (isWork) {
        H += '<div style="position:absolute;left:7%;right:7%;top:9.5%;aspect-ratio:2/1;border-radius:7px;overflow:hidden;transform:translate(calc(var(--px,0)*9px),calc(var(--py,0)*9px));background-image:url(' + this.asset("dreamship-donate.jpg") + ');background-size:162%;background-position:49% 48%;box-shadow:0 28px 54px -18px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.16),0 0 0 6px rgba(8,9,10,.45);"></div>';
      }
      H += "</div>";

      // vignette
      H += '<div style="position:absolute;inset:0;pointer-events:none;' + vignStyle + '"></div>';
      // scanlines (vibe)
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:' + scanOp + ';background:repeating-linear-gradient(0deg,rgba(0,0,0,.4) 0 1px,transparent 1px 3px);animation:ofScan 1.1s linear infinite;"></div>';

      // L3 · foreground content
      H += '<div style="position:absolute;inset:0;padding:19px 22px;display:flex;flex-direction:column;transform:translate(calc(var(--px,0)*24px),calc(var(--py,0)*24px));">';
      H += '<div style="display:flex;align-items:center;justify-content:space-between;">';
      H += '<span style="width:8px;height:8px;border-radius:50%;' + dotStyle + '"></span>';
      H += '<span style="font-family:\'JetBrains Mono\',monospace;font-size:8.5px;letter-spacing:.22em;color:rgba(255,255,255,.42);">' + f.idx + " · 06</span>";
      H += "</div>";
      if (topSpacer) H += '<div style="flex:1;min-height:0;"></div>';

      if (f.kind === "identity") {
        H += '<div style="display:flex;flex-direction:column;gap:13px;">';
        DESCRIPTORS.forEach(function (d) {
          H += '<div style="display:flex;flex-direction:column;gap:5px;">';
          H += '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:700;font-size:19px;line-height:1;letter-spacing:-.02em;background:linear-gradient(92deg,#5ee0d6,#36c6e0 36%,#a78bfa 68%,#6fefb4);-webkit-background-clip:text;background-clip:text;color:transparent;width:max-content;max-width:100%;">' + d.t + "</div>";
          H += '<div style="height:11px;width:60%;display:flex;align-items:flex-end;gap:2.5px;transform:scaleY(.5);transform-origin:bottom;opacity:.4;">';
          EQBARS.forEach(function (b) {
            H += '<div style="flex:1;height:100%;border-radius:2px;background:linear-gradient(180deg,#6fefb4,#36c6e0);transform-origin:bottom;animation:ofBeat .9s ease-in-out infinite;animation-delay:' + b + ';"></div>';
          });
          H += "</div></div>";
        });
        H += "</div>";
      } else if (isWork) {
        H += '<div style="display:flex;flex-direction:column;gap:13px;">';
        H += '<div style="align-self:flex-start;display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;border:1px solid rgba(167,139,250,.4);background:rgba(167,139,250,.12);font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#c9b8ff;">grower + giver</div>';
        H += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px 16px;">';
        BARS.forEach(function (bar) {
          H += '<div style="display:flex;align-items:baseline;gap:8px;">';
          H += '<span style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:700;font-size:19px;line-height:1;color:' + bar.c + ";text-shadow:0 0 12px " + bar.glow + ';">' + bar.n + "</span>";
          H += '<span style="font-size:10.5px;line-height:1.2;color:rgba(255,255,255,.55);">' + bar.d + "</span></div>";
        });
        H += "</div>";
        H += '<div style="font-size:11.5px;line-height:1.45;color:#9aa0a3;">$10K to Freedom United, on behalf of the merchant community — profit and purpose, same hands.</div>';
        H += "</div>";
      } else if (f.kind === "bleed" || f.kind === "vibe") {
        H += '<div style="display:flex;flex-direction:column;gap:7px;">';
        H += '<div style="display:flex;flex-direction:column;line-height:.92;">';
        H += '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-.03em;' + bleedTitleStyle + '">' + (f.title || "") + "</div>";
        if (f.title2) H += '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-.03em;' + bleedTitleStyle + '">' + f.title2 + "</div>";
        H += "</div>";
        H += '<div style="font-size:13.5px;line-height:1.4;margin-top:4px;' + (f.captionStyle || "color:rgba(244,242,236,.72);") + '">' + (f.caption || "") + "</div>";
        if (f.kind === "vibe") {
          H += '<div style="margin-top:9px;height:24px;display:flex;align-items:flex-end;gap:3px;">';
          BEATBARS.forEach(function (b) {
            H += '<div style="flex:1;height:100%;border-radius:2px;background:linear-gradient(180deg,#ff5fa8,#ffb050);transform-origin:bottom;animation:ofBeat2 .7s ease-in-out infinite;animation-delay:' + b + ';opacity:.92;"></div>';
          });
          H += "</div>";
        }
        H += "</div>";
      } else if (f.kind === "stats") {
        H += '<div style="display:flex;flex-direction:column;gap:12px;">';
        H += '<div style="display:flex;align-items:baseline;justify-content:space-between;">';
        H += '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.03em;color:#ccff00;text-shadow:0 0 18px rgba(204,255,0,.45);">Powder day</div>';
        H += '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#ff2d9b;">season ’26</div>';
        H += "</div>";
        H += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
        STATS.forEach(function (st) {
          H += '<div style="border:1px solid ' + st.bd + ";border-radius:11px;background:" + st.bg + ';padding:11px 13px;">';
          H += '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:25px;line-height:.9;color:' + st.c + ";text-shadow:0 0 14px " + st.glow + ';">' + st.v + "</div>";
          H += '<div style="font-family:\'JetBrains Mono\',monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:6px;">' + st.k + "</div></div>";
        });
        H += "</div>";
        H += '<div><div style="display:flex;justify-content:space-between;font-family:\'JetBrains Mono\',monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:5px;"><span>overall stoke</span><span style="color:#ccff00;">99</span></div>';
        H += '<div style="height:7px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden;"><div style="width:99%;height:100%;border-radius:99px;background:linear-gradient(90deg,#ff2d9b,#ccff00);box-shadow:0 0 12px rgba(204,255,0,.5);"></div></div></div>';
        H += "</div>";
      } else if (isSignal) {
        H += '<div style="display:flex;flex-direction:column;gap:14px;">';
        H += '<div><div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.03em;color:#cfeff5;">Proof of work</div>';
        H += '<div style="font-size:12px;line-height:1.4;color:#9aa0a3;margin-top:5px;">Eleven years shipping with the giants — and the upstarts.</div></div>';
        H += '<div style="position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:9px;">';
        var self = this;
        LOGOS.forEach(function (src) {
          H += '<div style="aspect-ratio:5/2;border-radius:9px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;overflow:hidden;">';
          H += '<div style="width:62%;height:48%;background-image:url(' + self.asset(src) + ');background-size:contain;background-repeat:no-repeat;background-position:center;filter:brightness(0) invert(1);opacity:.62;"></div></div>';
        });
        H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:9px;mix-blend-mode:screen;background:linear-gradient(105deg,transparent 38%,rgba(54,198,224,.22) 50%,transparent 62%);background-size:280% 100%;animation:ofSweep 3.6s linear infinite;"></div>';
        H += "</div></div>";
      }

      if (bottomSpacer) H += '<div style="flex:1;min-height:0;"></div>';
      H += "</div>"; // /foreground

      // holographic foil
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--fop,.13);background:repeating-linear-gradient(82deg,rgba(255,255,255,.06) 0 1.5px,transparent 1.5px 4px),repeating-linear-gradient(115deg,rgba(255,70,150,.55) 0%,rgba(255,176,80,.45) 9%,rgba(111,239,180,.5) 19%,rgba(94,224,214,.5) 29%,rgba(150,130,255,.55) 40%,rgba(255,70,150,.55) 50%);background-size:200% 200%,240% 240%;background-position:var(--fx,50%) var(--fy,50%);filter:hue-rotate(var(--fhue,0deg)) saturate(1.3);-webkit-mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%);mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%);"></div>';
      // pointer glare
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--gop,0);background:radial-gradient(340px circle at var(--fx,50%) var(--fy,50%),rgba(255,255,255,.5),rgba(120,255,224,.06) 34%,transparent 62%);"></div>';
      // resting sheen + grain
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:.4;background:linear-gradient(122deg,transparent 40%,rgba(255,255,255,.08) 52%,transparent 60%);-webkit-mask:linear-gradient(180deg,#000,transparent 50%);mask:linear-gradient(180deg,#000,transparent 50%);"></div>';
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:22px;opacity:.5;mix-blend-mode:overlay;background-image:url(\'' + GRAIN + '\');background-size:120px 120px;"></div>';
      // inner sheen edge
      H += '<div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;border-radius:22px;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 0 1px rgba(255,255,255,.04);"></div>';

      H += "</div>"; // /face root
      return H;
    }

    // ---- rail + aura ---------------------------------------------------------
    _renderRail() {
      var self = this, i = this.i;
      this.railEl.innerHTML = "";
      FACES.forEach(function (ff, idx) {
        var sp = document.createElement("span");
        var active = idx === i;
        sp.style.width = active ? "24px" : "7px";
        sp.style.background = active ? ff.accent : "rgba(255,255,255,.26)";
        sp.style.boxShadow = active ? "0 0 10px " + ff.accent : "none";
        sp.setAttribute("role", "button");
        sp.setAttribute("aria-label", ff.label);
        sp.addEventListener("click", function () { self._jump(idx); });
        self.railEl.appendChild(sp);
      });
    }

    _applyAura() {
      var f = FACES[this.i];
      this.haloEl.style.background = "radial-gradient(circle," + f.aura + ",transparent 66%)";
      this.coreEl.style.background = "radial-gradient(circle," + (f.core || f.aura) + ",transparent 60%)";
    }

    // ---- events --------------------------------------------------------------
    _bind() {
      var c = this.cardEl;
      this.onDown = this.onDown.bind(this);
      this.onUp = this.onUp.bind(this);
      this.onKey = this.onKey.bind(this);
      this._loop = this._loop.bind(this);
      c.addEventListener("pointerdown", this.onDown);
      c.addEventListener("pointerup", this.onUp);
      c.addEventListener("pointercancel", this.onUp);
      c.addEventListener("keydown", this.onKey);

      if (this.fine && !this.reduced) {
        var self = this;
        c.addEventListener("pointermove", function (e) {
          if (e.pointerType === "touch") return;
          var r = c.getBoundingClientRect();
          var px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
          var py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
          self.tnx = (px - 0.5) * 2;
          self.tny = (py - 0.5) * 2;
        });
        c.addEventListener("pointerleave", function () { self.tnx = 0; self.tny = 0; });
      }

      // Phone gyroscope → tilt-parallax (best-effort; permission-gated on iOS).
      if (this.coarse && !this.reduced && window.DeviceOrientationEvent) {
        var s = this;
        this._orient = function (ev) {
          if (ev.gamma == null || ev.beta == null) return;
          s._gyro = true;
          s.tnx = Math.max(-1, Math.min(1, ev.gamma / 28));
          s.tny = Math.max(-1, Math.min(1, (ev.beta - 45) / 28));
        };
        window.addEventListener("deviceorientation", this._orient);
      }
    }

    onDown(e) {
      if (this.busy) return;
      this.downX = e.clientX; this.downY = e.clientY;
      this.downT = performance.now(); this.tracking = true;
      this.cardEl.style.cursor = "grabbing";
    }
    onUp(e) {
      if (!this.tracking) return;
      this.tracking = false;
      this.cardEl.style.cursor = "grab";
      var dx = e.clientX - this.downX, dy = e.clientY - this.downY;
      var dist = Math.hypot(dx, dy), dt = performance.now() - this.downT;
      if (dist < 8 && dt < 400) { this.turn("left"); return; } // tap → next
      if (dist < 26) return;
      var horiz = Math.abs(dx) >= Math.abs(dy);
      var name = horiz ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
      this.turn(name, dist / Math.max(1, dt));
    }
    onKey(e) {
      var map = { ArrowRight: "right", ArrowLeft: "left", ArrowUp: "up", ArrowDown: "down" };
      if (map[e.key]) { this.turn(map[e.key]); e.preventDefault(); }
      else if (e.key === "Enter" || e.key === " ") { this.turn("left"); e.preventDefault(); }
    }

    ring(step) { var N = FACES.length; return ((this.i + step) % N + N) % N; }

    _jump(idx) {
      if (idx === this.i || this.busy) return;
      this.turn(idx > this.i ? "left" : "right", 0, idx);
    }

    _setDir(name, forceIdx) {
      this.dir = name;
      var d = DIRS[name];
      this.neighbor = forceIdx != null ? forceIdx : this.ring(d.step);
      this.j = this.neighbor;
      this.panelBEl.innerHTML = this._faceHTML(FACES[this.neighbor]);
      this.panelBEl.style.transformOrigin = d.origin;
      this.panelBEl.style.transform = d.place;
      this.panelBEl.style.visibility = "visible";
    }

    // ---- the turn ------------------------------------------------------------
    turn(name, vel, forceIdx) {
      if (this.busy) return;
      this._setDir(name, forceIdx);

      if (this.reduced) { this._commit(); return; }

      var d = DIRS[name];
      this.busy = true;
      var from = 0, to = d.target;
      var dur = Math.min(900, Math.max(400, 620 - (vel || 0) * 60)); // ms
      var t0 = performance.now();
      var self = this;
      if (this._tw) cancelAnimationFrame(this._tw);
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; // power3.inOut
        self.angle = from + (to - from) * e;
        self.applyTurn();
        if (p < 1) { self._tw = requestAnimationFrame(step); }
        else { self.busy = false; self._commit(); }
      })(t0);
    }

    _commit() {
      this.i = this.neighbor;
      this.angle = 0; this.dir = null;
      this.panelBEl.style.opacity = "0";
      this.panelBEl.style.visibility = "hidden";
      this.panelAEl.innerHTML = this._faceHTML(FACES[this.i]);
      this.curFoilBoost = FACES[this.i].foilBoost || 1;
      this._renderRail();
      this._applyAura();
      this.applyTurn();
    }

    // ---- per-frame parallax + foil (ported from v4 applyTurn) -----------------
    applyTurn() {
      var st = this.stageEl; if (!st) return;
      var cd = this.cubeD, fi = this.foilI;
      var a = this.angle || 0;
      var mag = Math.min(1, Math.abs(a) / 90);
      var d = this.dir ? DIRS[this.dir] : null;
      var axis = d ? d.axis : "Y";
      var z = -Math.sin(mag * Math.PI) * 210 * cd;
      var scl = 1 - Math.sin(mag * Math.PI) * 0.1 * cd;
      var rot = axis === "X" ? "rotateX(" + a.toFixed(2) + "deg)" : "rotateY(" + a.toFixed(2) + "deg)";
      st.style.transform = "translateZ(" + z.toFixed(1) + "px) " + rot + " scale(" + scl.toFixed(3) + ")";

      if (this.panelBEl) {
        var o = Math.max(0, Math.min(1, mag * 3.4 - 0.04));
        this.panelBEl.style.opacity = o.toFixed(3);
      }

      // physical tilt rig
      if (this.tiltEl) {
        var rx = (-this.ny * this.tiltMax).toFixed(2);
        var ry = (this.nx * this.tiltMax).toFixed(2);
        this.tiltEl.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      }

      var px = this.nx + (axis === "Y" ? (a / 90) * 0.45 : 0);
      var py = this.ny + (axis === "X" ? (a / 90) * 0.45 : 0);
      st.style.setProperty("--px", px.toFixed(3));
      st.style.setProperty("--py", py.toFixed(3));
      st.style.setProperty("--fx", (50 + px * 60).toFixed(1) + "%");
      st.style.setProperty("--fy", (50 + py * 60).toFixed(1) + "%");
      st.style.setProperty("--fhue", (this.nx * 46 + a * 0.7).toFixed(1) + "deg");
      var boost = (this.curFoilBoost || 1) * fi;
      st.style.setProperty("--fop", ((0.12 + Math.abs(this.nx) * 0.2 + Math.abs(this.ny) * 0.16 + mag * 0.5) * boost).toFixed(3));
      st.style.setProperty("--gop", Math.min(0.75, (Math.abs(this.nx) + Math.abs(this.ny)) * 0.7 + mag * 0.4).toFixed(3));

      this._seam(mag, axis);
    }

    _seam(mag, axis) {
      var el = this.seamEl; if (!el) return;
      if (mag <= 0.001) { el.style.opacity = "0"; el.style.boxShadow = "none"; return; }
      el.style.opacity = "1";
      var s = Math.sin(mag * Math.PI);
      var c = "rgba(255,255,255," + (s * 0.9).toFixed(2) + ")";
      var c2 = "rgba(180,245,255," + (s * 0.6).toFixed(2) + ")";
      var pos = this.angle > 0 ? 1 : -1;
      if (axis === "Y") {
        el.style.boxShadow = pos > 0
          ? "inset 14px 0 34px -14px " + c + ", inset 3px 0 0 " + c2
          : "inset -14px 0 34px -14px " + c + ", inset -3px 0 0 " + c2;
      } else {
        el.style.boxShadow = pos > 0
          ? "inset 0 14px 34px -14px " + c + ", inset 0 3px 0 " + c2
          : "inset 0 -14px 34px -14px " + c + ", inset 0 -3px 0 " + c2;
      }
    }

    // ---- idle loop: ease tilt vars, add a gentle drift on touch ---------------
    _loop(now) {
      if (!this.running) return;
      // On touch with no real gyro yet, breathe a slow drift so depth reads.
      if (this.coarse && !this._gyro) {
        this.idleT = now || performance.now();
        this.tnx = Math.sin(this.idleT / 2600) * 0.5;
        this.tny = Math.cos(this.idleT / 3300) * 0.32;
      }
      this.nx += (this.tnx - this.nx) * 0.12;
      this.ny += (this.tny - this.ny) * 0.12;
      this.applyTurn();
      this.raf = requestAnimationFrame(this._loop);
    }
  }

  OperatorCard.prototype._proto = OperatorCardProto;
  customElements.define("operator-card-cube", OperatorCard);
})();
