/* =============================================================================
   <operator-card> — Bill Bricker's identity card, as a Web Component.

   "Operator Card v6": a portrait 3:4 card holding four facets —
   Operator · Conscious Capitalist · DJ BillyGoat · 3× Father. Facets change with
   an aperture bloom (a foil-lit circular wipe that radiates from the touch
   origin), while pointer (or drift) drives tilt + parallax across the photo,
   bullets and a violet holographic foil; the card floats on a slow idle sine.

   Framework-agnostic custom element (Shadow DOM, vanilla JS, no runtime deps).
   Natively ported from the Claude Design export `design-refs/operator-card-v6.html`
   (a React/dc-runtime bundle) — re-implemented in a tuned rAF loop against the
   site's real tokens (--accent #6fefb4, --bg #08090a, Bricolage/Hanken/JetBrains
   Mono, --ease) so the element is self-contained and safe to drop into any page.
   Navigate by swipe, tap (= next), arrow keys, or the dot rail.

   Usage:
     <script src="operator-card.js" defer></script>
     <operator-card></operator-card>

   Optional attributes:
     asset-base="assets/"   directory holding the facet photos (default "assets/")
     start="operator"       facet to open on (operator|capitalist|dj|father)
     accent="#6fefb4"       brand-green accent for non-vibrant facets
     tilt="13"              max tilt in degrees (0–22)
     foil-intensity="1.1"   holographic foil strength (0–2.2)
     flip-depth="1.5"       foil-flash punch on a facet change (0.3–1.5)
     auto-advance="true"    advance once after entering view ("false" to disable)

   Honors prefers-reduced-motion (static card, instant facet swaps, no float/foil
   motion) and degrades to tap/swipe on coarse-pointer / touch devices.
============================================================================= */
(function () {
  "use strict";
  if (customElements.get("operator-card")) return;

  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

  // Ensure the three brand fonts are available to the shadow tree. Shadow DOM
  // resolves @font-face registered at the document level, so we inject the link
  // once into <head> if the host page hasn't already loaded it.
  function ensureFonts() {
    if (document.querySelector("link[data-operator-card-fonts]")) return;
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

  // ----- the four facets ------------------------------------------------------
  // `img` is a bare filename, resolved against asset-base at mount.
  var FACES = [
    {
      key: "operator", kind: "cover", img: "bb-headshot-li.jpg", pos: "50% 24%",
      aria: "Operator — zero to one operator, bridge builder, AI-native force multiplier.",
      bullets: [{ t: "0 → 1 Operator", k: "hi" }, { t: "Bridge Builder" }, { t: "AI-Native Force Multiplier" }]
    },
    {
      key: "capitalist", kind: "fit", img: "dreamship-donate.jpg", pos: "50% 4%",
      aria: "Conscious capitalist — connection capital, pay it forward. A $10,000 Dreamship donation to Freedom United.",
      bullets: [{ t: "Conscious Capitalist", k: "hi" }, { t: "Connection Capital" }, { t: "Pay It Forward" }]
    },
    {
      key: "dj", kind: "cover", img: "portrait-sales.jpg", pos: "50% 15%", vibrant: 1, accent: "#ff3fa0",
      aria: "Vibe pusher, also known as DJ BillyGoat or PickleBill — social momentum creator.",
      bullets: [{ t: "Vibe Pusher", k: "higrad" }, { t: "Aka DJ BillyGoat or PickleBill" }, { t: "Social Momentum Creator" }]
    },
    {
      key: "father", kind: "cover", img: "family.jpg", pos: "50% 42%", textPos: "top",
      aria: "Three-time father, three-time founder — guess which one matters more.",
      bullets: [{ t: "3× Father", k: "hi" }, { t: "3× Founder" }, { t: "Guess which one matters more", k: "aside" }]
    }
  ];

  var EQBARS = [
    "0s", ".18s", ".05s", ".24s", ".1s", ".3s", ".08s", ".21s", ".14s", ".27s",
    ".03s", ".16s", ".22s", ".07s", ".25s", ".12s", ".19s", ".29s", ".09s", ".15s"
  ];

  // --accent #6fefb4 — the site's real brand green (the export shipped #8be5b6).
  var ACCENT_DEFAULT = "#6fefb4";

  // The DJ color-dodge wash + equalizer markup (card-only pink/cyan/amber).
  var DJ_OVERLAY =
    '<div class="dj-wash" aria-hidden="true"></div>' +
    '<div class="dj-eq" aria-hidden="true">' +
    EQBARS.map(function (d) {
      return '<i style="animation-delay:' + d + '"></i>';
    }).join("") +
    "</div>";

  var STYLE = [
    ":host{display:block;font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-user-select:none;user-select:none}",
    "*{box-sizing:border-box}",
    ".scene{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;overflow:visible}",
    ".aura{position:absolute;top:50%;left:50%;width:64vmin;max-width:480px;height:64vmin;max-height:480px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.22),transparent 66%);filter:blur(64px);pointer-events:none;animation:v6Aura 17s ease-in-out infinite}",
    ".wrap{position:relative;width:min(360px,100%);aspect-ratio:3/4;z-index:2;touch-action:pan-y;cursor:grab;outline:none}",
    ".wrap:focus-visible{outline:2px solid #6fefb4;outline-offset:7px;border-radius:30px}",
    ".edges{position:absolute;inset:0;pointer-events:none;z-index:6;color:rgba(244,247,240,.55);font-size:15px}",
    ".edges span{position:absolute;top:50%;transform:translateY(-50%)}",
    ".edges .l{left:8px;animation:v6Edge 2.8s ease-in-out 1.4s infinite}",
    ".edges .r{right:8px;animation:v6Edge 2.8s ease-in-out 2.1s infinite}",
    ".persp{position:absolute;inset:0;perspective:1100px}",
    ".card{position:absolute;inset:0;will-change:transform;--px:0;--py:0;--fx:50%;--fy:50%;--fhue:0deg;--fop:.12;--gop:0}",
    ".body{position:absolute;inset:0;border-radius:22px;overflow:hidden;background:#08090a;border:1px solid rgba(255,255,255,.12);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 40px 100px -40px rgba(0,0,0,.95)}",
    ".layer{position:absolute;inset:0}",
    ".fwrap{position:absolute;inset:0}",
    ".backdrop{position:absolute;inset:0;background-size:cover;background-position:center}",
    ".img{position:absolute;inset:0;background-repeat:no-repeat}",
    ".scrim{position:absolute;inset:0;pointer-events:none}",
    ".bullets{position:absolute;left:0;right:0;transform:translate(calc(var(--px,0)*14px),calc(var(--py,0)*14px))}",
    ".bcol{display:flex;flex-direction:column;gap:8px;padding-left:16px}",
    ".bcol>div{font-family:'Bricolage Grotesque',system-ui,sans-serif;line-height:1.06;letter-spacing:-.015em;text-wrap:pretty}",
    ".dj-wash{position:absolute;inset:0;pointer-events:none;mix-blend-mode:color-dodge;opacity:.74;background:radial-gradient(120% 80% at 20% 16%,rgba(255,45,155,.64),transparent 52%),radial-gradient(120% 80% at 84% 28%,rgba(54,198,224,.56),transparent 54%),radial-gradient(90% 72% at 60% 98%,rgba(255,176,80,.46),transparent 60%)}",
    ".dj-eq{position:absolute;left:24px;right:24px;bottom:176px;height:44px;display:flex;align-items:flex-end;gap:4px;opacity:.92;filter:drop-shadow(0 0 8px rgba(255,79,160,.45))}",
    ".dj-eq i{flex:1;height:100%;border-radius:2px;background:linear-gradient(180deg,#ff4fa0,#ffb050 55%,#5ee0d6);transform-origin:bottom;animation:v6Beat .6s ease-in-out infinite}",
    ".incoming{position:absolute;inset:0;display:none}",
    ".incoming.on{display:block}",
    ".clip{position:absolute;inset:0}",
    ".radiate{position:absolute;width:74px;height:74px;border-radius:50%;pointer-events:none;mix-blend-mode:screen;filter:blur(2px) saturate(1.4)}",
    // violet mesh material, pointer-masked
    ".mesh-foil{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:calc(var(--fop,.12)*1.1);background:linear-gradient(rgba(167,139,250,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.10) 1px,transparent 1px);background-size:32px 32px,32px 32px;-webkit-mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%);mask:radial-gradient(120% 120% at var(--fx,50%) var(--fy,50%),#000,transparent 70%)}",
    // violet foil material
    ".foil{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--fop,.12);background:repeating-linear-gradient(82deg,rgba(255,255,255,.05) 0 1.5px,transparent 1.5px 4px),repeating-linear-gradient(115deg,rgba(150,130,255,.6) 0%,rgba(196,150,255,.5) 16%,rgba(120,110,255,.55) 32%,rgba(180,140,255,.55) 48%,rgba(150,130,255,.6) 64%,rgba(200,160,255,.5) 82%,rgba(150,130,255,.6) 100%);background-size:200% 200%,240% 240%;background-position:var(--fx,50%) var(--fy,50%);filter:hue-rotate(var(--fhue,0deg)) saturate(1.25);-webkit-mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%);mask:linear-gradient(180deg,#000,#000 52%,rgba(0,0,0,.34) 78%,transparent 96%)}",
    // charged idle sheen — held violet wavelength
    ".sheen{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;background:linear-gradient(115deg,transparent 34%,rgba(190,170,255,.10) 47%,rgba(255,255,255,.16) 50%,rgba(190,170,255,.10) 53%,transparent 66%);background-size:300% 100%;animation:v6Sheen 7.5s ease-in-out infinite}",
    ".glare{position:absolute;inset:0;pointer-events:none;border-radius:22px;mix-blend-mode:screen;opacity:var(--gop,0);background:radial-gradient(340px circle at var(--fx,50%) var(--fy,50%),rgba(255,255,255,.5),rgba(190,170,255,.08) 34%,transparent 62%)}",
    ".ring{position:absolute;inset:0;pointer-events:none;border-radius:22px;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 0 1px rgba(255,255,255,.05)}",
    ".rail{display:flex;align-items:center;gap:9px;justify-content:center;z-index:2}",
    ".rail span{height:7px;border-radius:7px;cursor:pointer;transition:all .42s cubic-bezier(.22,1,.36,1)}",
    "@keyframes v6Aura{0%,100%{transform:translate(-50%,-50%) translate(-3%,-2%) scale(1)}50%{transform:translate(-50%,-50%) translate(4%,3%) scale(1.14)}}",
    "@keyframes v6Edge{0%,100%{opacity:.12}50%{opacity:.44}}",
    "@keyframes v6Beat{0%,100%{transform:scaleY(.2)}45%{transform:scaleY(1)}72%{transform:scaleY(.5)}}",
    "@keyframes v6Radiate{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}16%{opacity:.58}46%{opacity:.18}64%{opacity:.32}100%{opacity:0;transform:translate(-50%,-50%) scale(7)}}",
    "@keyframes v6Sheen{0%{background-position:210% 0;opacity:.28}50%{background-position:-30% 0;opacity:.55}100%{background-position:-230% 0;opacity:.28}}",
    "@media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important}}"
  ].join("\n");

  function hexA(hex, a) {
    var m = hex.replace("#", "");
    var n = m.length === 3 ? m.split("").map(function (c) { return c + c; }).join("") : m;
    var r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  class OperatorCard extends HTMLElement {
    connectedCallback() {
      if (this._mounted) return;
      this._mounted = true;
      ensureFonts();

      this.assetBase = (this.getAttribute("asset-base") || "assets/").replace(/\/?$/, "/");
      this.accent = this.getAttribute("accent") || ACCENT_DEFAULT;
      this.tilt = this.hasAttribute("tilt") ? parseFloat(this.getAttribute("tilt")) : 13;
      this.foilI = this.hasAttribute("foil-intensity") ? parseFloat(this.getAttribute("foil-intensity")) : 1.1;
      this.flipDepth = this.hasAttribute("flip-depth") ? parseFloat(this.getAttribute("flip-depth")) : 0.9;
      this.autoAdvance = this.getAttribute("auto-advance") !== "false";

      this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.coarse = matchMedia("(pointer: coarse)").matches;

      var startKey = this.getAttribute("start");
      var si = startKey ? FACES.findIndex(function (f) { return f.key === startKey; }) : 0;
      this.cur = si >= 0 ? si : 0;
      this.next = null;
      this.phase = "idle"; // idle | arm | go
      this.ox = 50; this.oy = 50;

      this.px = 0; this.py = 0; this.tpx = 0; this.tpy = 0;
      this.flash = 0; this.clock = 0;
      this.dragging = false; this.moved = false;

      this._build();
      this._renderCur();
      this._renderRail();
      this.applyCard();

      if (!this.reduced) {
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
                }, 1700);
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
    }

    asset(p) { return p ? this.assetBase + p : ""; }

    // ---- markup --------------------------------------------------------------
    _build() {
      var root = this.attachShadow({ mode: "open" });
      root.innerHTML =
        "<style>" + STYLE + "</style>" +
        '<div class="scene" part="scene">' +
          '<div class="aura" aria-hidden="true"></div>' +
          '<div class="wrap" tabindex="0" role="button" aria-label="Operator card — arrow keys, swipe, or tap to change panels">' +
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
      this.railEl = root.querySelector(".rail");

      this._bind();
    }

    _bind() {
      var w = this.wrapEl, self = this;
      this.onDown = function (e) {
        if (self.phase !== "idle") return;
        self.dragging = true; self.dx = e.clientX; self.dy = e.clientY;
        self.dt = performance.now(); self.moved = false;
        w.style.cursor = "grabbing";
      };
      // A drag rotates the card (parallax follows the finger/pointer) so you can
      // grab it and look around the holographic foil; hover does the same on a
      // fine pointer. Only a quick tap changes panels — no fast swipe-flip.
      this.onMove = function (e) {
        if (self.reduced) return;
        var r = w.getBoundingClientRect();
        if (self.dragging && (Math.abs(e.clientX - self.dx) > 4 || Math.abs(e.clientY - self.dy) > 4)) self.moved = true;
        self.tpx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        self.tpy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      this.onUp = function (e) {
        if (!self.dragging) return;
        self.dragging = false;
        w.style.cursor = "grab";
        self.tpx = 0; self.tpy = 0; // spring back to rest
        var ddx = e.clientX - self.dx, ddy = e.clientY - self.dy;
        var dist = Math.hypot(ddx, ddy), dt = performance.now() - self.dt;
        if (dist < 8 && dt < 400) { var o = self._origin(e); self.go(+1, null, o.ox, o.oy); }
        // a drag just rotates and releases — it does not flip
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
      w.addEventListener("pointerleave", function () { if (!self.dragging) { self.tpx = 0; self.tpy = 0; } });
      w.addEventListener("keydown", this.onKey);
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

    // ---- per-facet decoration (mirrors the export's deco()) -------------------
    deco(f) {
      var acc = this.faceAccent(f);
      var isFit = f.kind === "fit", top = f.textPos === "top";
      var wrapStyle = isFit
        ? "transform:translate(calc(var(--px,0)*-6px),calc(var(--py,0)*-6px));"
        : "transform:translate(calc(var(--px,0)*-9px),calc(var(--py,0)*-9px)) scale(1.06);";
      var img = this.asset(f.img), backdropStyle = "display:none;", imgStyle = "";
      if (isFit) {
        backdropStyle = "background-image:url(" + img + ");filter:blur(32px) saturate(1.3) brightness(.3);transform:scale(1.5);";
        imgStyle = "background-image:url(" + img + ");background-size:contain;background-position:" + f.pos + ";";
      } else {
        var filt = f.vibrant ? "filter:saturate(1.5) contrast(1.06);" : "";
        imgStyle = "background-image:url(" + img + ");background-size:cover;background-position:" + f.pos + ";" + filt;
      }
      var scrimStyle;
      if (top) scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.9) 0%,rgba(8,9,10,.46) 20%,transparent 46%,transparent 84%,rgba(8,9,10,.4) 100%);";
      else if (isFit) scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.55) 0%,rgba(8,9,10,.12) 18%,transparent 42%,rgba(8,9,10,.6) 64%,rgba(8,9,10,.96) 100%);";
      else scrimStyle = "background:linear-gradient(180deg,rgba(8,9,10,.16) 0%,transparent 30%,rgba(8,9,10,.14) 46%,rgba(8,9,10,.64) 70%,rgba(8,9,10,.94) 100%);";
      var bulletsBox = top ? "top:0;padding:26px 26px 20px;" : "bottom:0;padding:24px 26px 28px;";
      var bullets = f.bullets.map(function (b) {
        var style;
        if (b.k === "higrad") style = "font-weight:800;font-size:29px;background:linear-gradient(92deg,#ff4fa0,#ffb050 46%,#5ee0d6);-webkit-background-clip:text;background-clip:text;color:transparent;";
        else if (b.k === "hi") style = "font-weight:800;font-size:27px;color:" + acc + ";";
        else if (b.k === "aside") style = "font-weight:500;font-size:19px;font-style:italic;color:rgba(244,247,240,.62);font-family:'Hanken Grotesk',sans-serif;";
        else style = "font-weight:600;font-size:22px;color:#f4f7f0;";
        return { t: b.t, style: style };
      });
      return {
        wrapStyle: wrapStyle, backdropStyle: backdropStyle, imgStyle: imgStyle,
        scrimStyle: scrimStyle, bulletsBox: bulletsBox, bullets: bullets,
        isDj: f.key === "dj", accentBorder: hexA(acc, 0.6)
      };
    }

    // Build the inner HTML for one facet layer (photo + scrim + dj + bullets).
    _layerHTML(f) {
      var d = this.deco(f);
      var bullets = d.bullets.map(function (b) {
        return '<div style="' + b.style + '">' + b.t + "</div>";
      }).join("");
      return (
        '<div class="fwrap" style="' + d.wrapStyle + '">' +
          '<div class="backdrop" aria-hidden="true" style="' + d.backdropStyle + '"></div>' +
          '<div class="img" aria-hidden="true" style="' + d.imgStyle + '"></div>' +
        "</div>" +
        '<div class="scrim" aria-hidden="true" style="' + d.scrimStyle + '"></div>' +
        (d.isDj ? DJ_OVERLAY : "") +
        '<div class="bullets" style="' + d.bulletsBox + '">' +
          '<div class="bcol" style="border-left:2px solid ' + d.accentBorder + '">' + bullets + "</div>" +
        "</div>"
      );
    }

    _renderCur() {
      var f = FACES[this.cur];
      this.curEl.innerHTML = this._layerHTML(f);
      this.wrapEl.setAttribute(
        "aria-label",
        f.bullets[0].t + ", panel " + (this.cur + 1) + " of " + FACES.length + ". " + f.aria + " Arrow keys to change panels."
      );
    }

    _renderRail() {
      this.railEl.innerHTML = "";
      var self = this;
      FACES.forEach(function (ff, idx) {
        var on = idx === self.cur, fa = self.faceAccent(ff);
        var s = document.createElement("span");
        s.setAttribute("role", "tab");
        s.setAttribute("aria-label", ff.bullets[0].t);
        s.setAttribute("aria-selected", on ? "true" : "false");
        s.style.cssText =
          "width:" + (on ? "24px" : "7px") + ";" +
          "background:" + (on ? fa : "rgba(244,247,240,.26)") + ";" +
          "box-shadow:" + (on ? "0 0 10px " + hexA(fa, 0.8) : "none") + ";";
        s.addEventListener("click", function () {
          if (idx === self.cur || self.phase !== "idle") return;
          self.go(idx > self.cur ? +1 : -1, idx);
        });
        self.railEl.appendChild(s);
      });
    }

    // ---- facet change: aperture bloom ----------------------------------------
    go(dir, target, ox, oy) {
      if (this.phase !== "idle") return;
      if (this._a) { clearTimeout(this._a); this._a = null; }
      if (this._t) { clearTimeout(this._t); this._t = null; }
      var next = (target != null) ? target : this.ring(dir);
      if (next === this.cur) return;

      if (this.reduced) { this.cur = next; this._renderCur(); this._renderRail(); return; }

      var cx = (ox != null) ? ox : 50, cy = (oy != null) ? oy : 50;
      this.next = next; this.ox = cx; this.oy = cy; this.phase = "arm";
      this.flash = 1;

      // incoming facet, clip closed at the touch origin
      this.clipEl.innerHTML = this._layerHTML(FACES[next]);
      var cp = "circle(0% at " + cx + "% " + cy + "%)";
      this.clipEl.style.cssText =
        "position:absolute;inset:0;clip-path:" + cp + ";-webkit-clip-path:" + cp + ";" +
        "transition:clip-path .85s cubic-bezier(.32,.72,.32,1),-webkit-clip-path .85s cubic-bezier(.32,.72,.32,1);";

      // radiating foil-light band from the origin, tinted to the incoming accent
      var rcol = this.faceAccent(FACES[next]);
      this.radiateEl.style.cssText =
        "position:absolute;left:" + cx + "%;top:" + cy + "%;width:74px;height:74px;border-radius:50%;" +
        "pointer-events:none;mix-blend-mode:screen;filter:blur(2px) saturate(1.4);" +
        "background:radial-gradient(circle, transparent 24%, " + rcol + " 44%, transparent 66%);" +
        "transform:translate(-50%,-50%) scale(.18);animation:v6Radiate .9s cubic-bezier(.3,.7,.3,1) forwards;";

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
      }, 900);
    }

    // ---- rAF: parallax lerp, idle float, foil ---------------------------------
    _loop = (ts) => {
      if (!this.running) return;
      this.clock = ts || 0;
      // On touch devices there's no hover, so give the card a gentle ambient
      // sway at rest — enough to see the foil/tilt breathe without being jumpy.
      if (this.coarse && !this.dragging && !this.reduced) {
        this.tpx = Math.sin(this.clock * 0.00037) * 0.16;
        this.tpy = Math.cos(this.clock * 0.00029) * 0.12;
      }
      this.px += (this.tpx - this.px) * 0.10;
      this.py += (this.tpy - this.py) * 0.10;
      this.flash *= 0.93; if (this.flash < 0.01) this.flash = 0; // slower decay → softer, longer bloom
      this.applyCard();
      this.raf = requestAnimationFrame(this._loop);
    };

    applyCard() {
      var c = this.cardEl; if (!c) return;
      var t = this.tilt, px = this.px || 0, py = this.py || 0;
      var fY = this.reduced ? 0 : Math.sin(this.clock * 0.0011) * 3.2;
      var fX = this.reduced ? 0 : Math.cos(this.clock * 0.0008) * 2.2;
      c.style.transform =
        "translate3d(" + fX.toFixed(2) + "px," + fY.toFixed(2) + "px,0) " +
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
      // Soft-cap the foil so a facet change is a gentle bloom, not a hard pulse.
      var fop = (0.10 + Math.abs(px) * 0.22 + Math.abs(py) * 0.16 + flash * 0.42 * fd) * fi * boost;
      c.style.setProperty("--fop", Math.min(0.78, fop).toFixed(3));
      c.style.setProperty(
        "--gop",
        Math.min(0.8, (Math.abs(px) + Math.abs(py)) * 0.6 + flash * 0.5).toFixed(3)
      );
    }
  }

  customElements.define("operator-card", OperatorCard);
})();
