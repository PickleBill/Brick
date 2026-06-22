/* =============================================================================
   site-config.js — one place to turn the site's conversion + analytics on.

   Fill in the four values below and everything wires itself. Until a value is
   set, the site falls back gracefully:
     • "Grab 20 minutes" / book buttons → open email (never dead)
     • the tiny capture form           → opens a pre-filled email
     • analytics                       → stays off (no scripts loaded)

   Everything here is off-the-shelf and privacy-light. No backend.
     - calendlyUrl     : your Calendly event link  (e.g. https://calendly.com/billbricker/20min)
     - formEndpoint    : Formspree endpoint        (e.g. https://formspree.io/f/abcdwxyz)
     - plausibleDomain : the domain Plausible is configured for (e.g. picklebill.github.io)
     - clarityId       : Microsoft Clarity project id
============================================================================= */
(function () {
  "use strict";

  var CONFIG = {
    calendlyUrl: "https://calendly.com/bricker3-idwj/30min",     // ← Calendly event link
    formEndpoint: "",    // ← paste Formspree endpoint
    plausibleDomain: "", // ← e.g. "picklebill.github.io"
    clarityId: ""        // ← Microsoft Clarity project id
  };

  var EMAIL = "mailto:bricker3@gmail.com?subject=Let%27s%20talk";

  // ---- primary CTA: book a call (fallback: email) --------------------------
  var bookEls = document.querySelectorAll('[data-cta="book"]');
  for (var i = 0; i < bookEls.length; i++) {
    var a = bookEls[i];
    if (CONFIG.calendlyUrl) {
      a.setAttribute("href", CONFIG.calendlyUrl);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    } else if (!a.getAttribute("href")) {
      a.setAttribute("href", EMAIL);
    }
  }

  // ---- tiny capture form (fallback: open a pre-filled email) ---------------
  var form = document.querySelector("[data-capture]");
  if (form) {
    if (CONFIG.formEndpoint) {
      form.setAttribute("action", CONFIG.formEndpoint);
      form.setAttribute("method", "POST");
    } else {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = (form.querySelector("[name=email]") || {}).value || "";
        var note = (form.querySelector("[name=note]") || {}).value || "";
        var body = (note ? note + "\n\n" : "") + "— sent from your site by " + email;
        window.location.href =
          "mailto:bricker3@gmail.com?subject=" +
          encodeURIComponent("Intro via your site") +
          "&body=" + encodeURIComponent(body);
      });
    }
  }

  // ---- analytics: Plausible (cookieless) + Microsoft Clarity (replay) ------
  if (CONFIG.plausibleDomain) {
    var p = document.createElement("script");
    p.defer = true;
    p.setAttribute("data-domain", CONFIG.plausibleDomain);
    p.src = "https://plausible.io/js/script.outbound-links.tagged-events.js";
    document.head.appendChild(p);
    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  }
  if (CONFIG.clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CONFIG.clarityId);
  }
})();
