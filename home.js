/* v5-app.js — Bill Bricker / bricker-os one-pager
   reveal · count-ups · flip card · live terminal */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll reveal (rect-based, iframe-safe) ----------
     CSS transitions can freeze inside throttled preview iframes, leaving
     content stuck at opacity:0. So: add .in for the smooth transition in
     real browsers, AND a per-element timeout that force-sets the final
     state with transition:none (timers fire even when transitions don't),
     which is invisible in real browsers since the transition already ran. */
  var rvEls = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  function show(el) {
    if (el._shown) return; el._shown = true;
    el.classList.add('in');
    if (reduce) { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; return; }
    setTimeout(function () {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 1000);
  }
  function revealCheck() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    rvEls.forEach(function (el) {
      if (el._shown) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) show(el);
    });
  }
  revealCheck();
  window.addEventListener('scroll', revealCheck, { passive: true });
  window.addEventListener('resize', revealCheck);
  window.addEventListener('load', revealCheck);
  // hard failsafe: nothing stays hidden
  setTimeout(function () { rvEls.forEach(show); }, 2600);

  /* ---------- count-ups ---------- */
  var counted = false;
  function countUps() {
    if (counted) return;
    var band = document.querySelector('.band');
    if (!band) return;
    var r = band.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top > vh * 0.92) return;
    counted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var t = +el.dataset.count, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      if (reduce) { el.textContent = pre + t + suf; return; }
      var c = 0, step = Math.max(1, Math.ceil(t / 32));
      el.textContent = pre + '0' + suf;
      var iv = setInterval(function () {
        c += step; if (c >= t) { c = t; clearInterval(iv); }
        el.textContent = pre + c + suf;
      }, 26);
    });
  }
  countUps();
  window.addEventListener('scroll', countUps, { passive: true });
  window.addEventListener('load', countUps);

  /* ---------- flip card ---------- */
  var flip = document.getElementById('flip');
  if (flip) {
    flip.addEventListener('click', function () { flip.classList.toggle('flipped'); });
    flip.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip.classList.toggle('flipped'); }
    });
  }

  /* =====================================================================
     TERMINAL
  ===================================================================== */
  var out = document.getElementById('termOut');
  var line = document.getElementById('termLine');
  var input = document.getElementById('termIn');
  var chips = document.getElementById('termChips');
  var history = [];

  function el(html, cls) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.innerHTML = html;
    return d;
  }
  function scroll() { if (out) out.scrollTop = out.scrollHeight; }
  function print(html, cls) { out.appendChild(el(html, cls)); scroll(); }
  function printBlock(lines) {
    var b = document.createElement('div');
    b.className = 'blk';
    lines.forEach(function (l) {
      var ln = document.createElement('div');
      ln.className = 'ln';
      ln.innerHTML = l;
      b.appendChild(ln);
    });
    out.appendChild(b); scroll();
  }
  function echo(cmd) { print('<span class="ps">→ ~</span> ' + esc(cmd), 'echo'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- command content (from FACTS.md, corrected) ---------- */
  var CMDS = {
    help: function () {
      printBlock([
        '<span class="dim">built-in commands — type or tap a chip:</span>',
        '<span class="m">whoami</span>     <span class="m">companies</span>   <span class="m">google-deal</span>   <span class="m">enterprise</span>',
        '<span class="m">builds</span>     <span class="m">pickle-daas</span> <span class="m">stats</span>         <span class="m">git log</span>',
        '<span class="m">contact</span>    <span class="m">clear</span>',
        '<span class="dim">…or just ask a real question:</span> <span class="dim">how did you close Google?</span>'
      ]);
    },
    whoami: function () {
      printBlock([
        '<span class="m">Bill Bricker</span> — AI-native founder · GTM operator · 0→1 builder.',
        'Enterprise seller turned founder-CEO. Closed &amp; ran the Google',
        'partnership at a &lt;1-yr-old startup. Now shipping production AI daily.',
        'Raleigh, NC · father of three · still walking.'
      ]);
    },
    ls: function () {
      printBlock([
        '<span class="a">companies/</span>   <span class="a">google-deal</span>   <span class="a">enterprise</span>   <span class="a">builds/</span>',
        '<span class="a">pickle-daas</span>  <span class="a">stats</span>         <span class="a">the-climb</span>   <span class="a">contact</span>'
      ]);
    },
    companies: function () {
      printBlock([
        '<span class="m">Courtana</span>  founder/CEO · 2023→now · <span class="dim">courtana.com</span>',
        '  AI smart-court SaaS — 36 courts live/piloting, 11+ sports.',
        '<span class="m">Dreamship</span> cofounder/CEO · 2018–25 · <span class="dim">dreamship.com</span>',
        '  API fulfillment — $35M+, 11x in a year, the Google partnership.',
        '<span class="dim">→ run</span> <span class="m">google-deal</span> <span class="dim">for the partnership story.</span>'
      ]);
    },
    'google-deal': function () {
      printBlock([
        '<span class="m"># The Google partnership — not an acquisition.</span>',
        'As a &lt;1-year-old startup, navigated 5–6 internal Google teams',
        '(trust &amp; safety, business integrity, commercial) to director+',
        'sign-off — a first-of-its-kind cross-division <span class="m">partnership</span>.',
        '→ 8-figure ad-spend channel, run <span class="m">5+ years</span>.',
        '→ Stripe, PayPal, Payoneer, Meta followed.',
        '<span class="dim">"Sold Google" was sales shorthand for closing the account.</span>'
      ]);
    },
    enterprise: function () {
      printBlock([
        '<span class="m"># 20 years carrying a number.</span>',
        'IBM / Netezza (2012–14) — Zillow, Avalara; 8-figure McKesson',
        '  contribution; &gt;100% quota.',
        'Northwestern Mutual — top 10 nationally; $6M+ TCV.',
        'GearLaunch — VP Sales &amp; Marketing.',
        'Then: founder-led GTM at Dreamship &amp; Courtana.'
      ]);
    },
    'sales-gtm': function () { CMDS.enterprise(); },
    builds: function () {
      printBlock([
        '<span class="m"># VibeCo</span> — 11 AI agents, multi-model (Gemini + Claude).',
        'Type an idea → business brief, build prompts, working app.',
        '<span class="m">40+ apps</span> across <span class="m">31 repos</span>, shipped solo:',
        '  Venue Connect · NaughtyData · Litigator · HeadsUpTime · +30 more',
        '<span class="dim">→ vibeco.lovable.app</span>'
      ]);
    },
    'pickle-daas': function () {
      printBlock([
        '<span class="m"># Pickle DaaS</span> — self-serve sports-data warehouse from raw video.',
        'Supabase + connectors + autonomous ingest + ground-truth loop.',
        '<span class="m">21K+ clips processed</span> · <span class="m">4,097 analyzed</span> · <span class="m">$0.0054/clip</span> (~7x cheaper).',
        '<span class="dim">→ picklebill.github.io/pickle-daas-data</span>'
      ]);
    },
    stats: function () {
      printBlock([
        '11x        revenue growth in one year',
        '$35M+      cumulative revenue led',
        '8-figure   Google channel closed &amp; run 5+ yrs',
        '40+ apps   shipped solo · 31 repos',
        '21K+       clips processed · 4,097 analyzed',
        '3          startups founded over 20 years'
      ]);
    },
    'git log': function () {
      printBlock([
        '<span class="m">2026</span>  Courtana — 36 courts live, scaling.',
        '<span class="m">2023</span>  Diagnosed; kept the pipeline moving. Started Courtana.',
        '<span class="m">2020</span>  Dreamship 11x — orders → routes → shipping trust.',
        '<span class="m">2019</span>  Closed Google. Stripe/PayPal/Meta followed.',
        '<span class="m">2012</span>  IBM/Netezza — 8-figure enterprise deals.'
      ]);
    },
    gitlog: function () { CMDS['git log'](); },
    git: function () { CMDS['git log'](); },
    contact: function () {
      printBlock([
        '<span class="a">bricker3@gmail.com</span>',
        '<span class="a">linkedin.com/in/williambricker</span>',
        '908 · 601 · 8152 · Raleigh, NC',
        '<span class="dim">open to founder / GTM / partnership / fractional / board.</span>'
      ]);
    },
    clear: function () { out.innerHTML = ''; }
  };

  /* ---------- local keyword fallback for free text ---------- */
  function localAnswer(q) {
    var s = q.toLowerCase();
    if (/google/.test(s)) return CMDS['google-deal'];
    if (/dreamship|fulfil|\$35|11x|revenue/.test(s)) return CMDS.companies;
    if (/courtana|court|pickleball|sport/.test(s)) return CMDS.companies;
    if (/build|app|vibe|ship|repo|code/.test(s)) return CMDS.builds;
    if (/data|clip|pickle|warehouse|video|cv|vision/.test(s)) return CMDS['pickle-daas'];
    if (/sell|sale|gtm|quota|ibm|enterprise|partner/.test(s)) return CMDS.enterprise;
    if (/cancer|chemo|sick|health|climb|story|walk/.test(s)) return function () {
      printBlock([
        'Diagnosed 2023; operated through chemo into 2025 — the pipeline',
        'kept moving the whole time. The Long Walk is present tense:',
        'the figuring-out-what\'s-next chapter. <span class="dim">→ run</span> <span class="m">the-climb</span>'
      ]);
    };
    if (/kid|child|family|father|three|wife|dad/.test(s)) return function () {
      printBlock(['Father of three. They are completely unimpressed by all of it.']);
    };
    if (/dj|billygoat|music|disco/.test(s)) return function () {
      printBlock(['fka <span class="m">DJ Billygoat</span> — yes, that\'s really me. Still in the room.']);
    };
    if (/hire|available|role|job|contact|email|reach/.test(s)) return CMDS.contact;
    if (/who|what.*you|about/.test(s)) return CMDS.whoami;
    return function () {
      printBlock([
        '<span class="dim">No live answer right now — try a command:</span>',
        '<span class="m">companies</span> · <span class="m">google-deal</span> · <span class="m">builds</span> · <span class="m">stats</span> · <span class="m">contact</span>'
      ]);
    };
  }

  var ASK_URL = 'https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill';
  function askBill(q) {
    var thinking = el('<span class="dim">thinking…</span>', 'blk');
    out.appendChild(thinking); scroll();
    var done = false;
    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var to = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    fetch(ASK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, history: history.slice(-6) }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error('bad');
      return r.json();
    }).then(function (d) {
      clearTimeout(to); done = true; thinking.remove();
      var ans = d.answer || d.response || d.text || d.message;
      if (ans) {
        history.push({ role: 'assistant', content: ans });
        printBlock(String(ans).split(/\n+/).map(esc));
      } else { localAnswer(q)(); }
    }).catch(function () {
      clearTimeout(to); if (done) return; thinking.remove(); localAnswer(q)();
    });
  }

  /* ---------- run a command line ---------- */
  function run(raw) {
    var cmd = (raw || '').trim();
    if (!cmd) return;
    echo(cmd);
    history.push({ role: 'user', content: cmd });
    var lc = cmd.toLowerCase();
    var askMatch = lc.match(/^ask\s+(.+)/);
    if (askMatch) { askBill(askMatch[1]); return; }
    if (CMDS[lc]) { CMDS[lc](); return; }
    // single tokens that map
    if (lc === 'the-climb' || lc === 'climb') {
      printBlock(['Twenty years, one climb. <span class="dim">→</span> <span class="a">climb.html</span>']);
      return;
    }
    // unknown → treat as a question
    askBill(cmd);
  }

  /* ---------- boot ---------- */
  function showInput() {
    if (!line) return;
    line.style.display = 'flex';
    scroll();
  }
  function typeBoot(after) {
    var lines = [
      { t: 'Bill Bricker — AI-native founder · GTM operator · 0→1 builder.', c: 'm' },
      { t: 'Enterprise seller turned founder-CEO. Closed & ran the Google', c: '' },
      { t: 'partnership at a <1-yr-old startup. Now shipping production AI daily.', c: '' },
      { t: 'Raleigh, NC · father of three · still walking.', c: '' }
    ];
    echo('whoami');
    if (reduce) {
      printBlock(lines.map(function (l) { return l.c ? '<span class="m">' + esc(l.t) + '</span>' : esc(l.t); }));
      if (after) after();
      return;
    }
    var block = document.createElement('div'); block.className = 'blk';
    out.appendChild(block);
    var li = 0;
    (function nextLine() {
      if (li >= lines.length) { if (after) after(); return; }
      var l = lines[li];
      var div = document.createElement('div'); div.className = 'ln' + (l.c ? ' ' + l.c : '');
      block.appendChild(div);
      var ci = 0;
      var iv = setInterval(function () {
        div.textContent = l.t.slice(0, ci++);
        scroll();
        if (ci > l.t.length) { clearInterval(iv); li++; setTimeout(nextLine, 130); }
      }, 12);
    })();
  }

  // deep links ?cmd= / ?q=
  function deepLink() {
    try {
      var p = new URLSearchParams(location.search);
      var c = p.get('cmd'), q = p.get('q');
      if (q) { run('ask ' + q); }
      else if (c) { run(c); }
    } catch (e) {}
  }

  // start typing when terminal enters view (or immediately if already in view)
  var booted = false;
  function bootCheck() {
    if (booted) return;
    var term = document.getElementById('term');
    if (!term) return;
    var r = term.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.85 && r.bottom > 0) {
      booted = true;
      typeBoot(function () { showInput(); deepLink(); });
      window.removeEventListener('scroll', bootCheck);
    }
  }
  bootCheck();
  window.addEventListener('scroll', bootCheck, { passive: true });
  window.addEventListener('load', bootCheck);

  // input handling
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = input.value; input.value = ''; run(v);
      }
    });
  }
  if (chips) {
    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip[data-cmd]');
      if (!btn) return;
      if (!booted) { booted = true; typeBoot(function () { showInput(); }); }
      run(btn.dataset.cmd);
      showInput();
      if (input) input.focus();
    });
  }
})();
