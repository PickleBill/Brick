/* bricker.os — AI-Forward Sales rebuild: live terminal, scroll reveals, count-ups, ring bars.
   Every number traces to content/FACTS.md + the sent résumé. Shared by the Console & Dossier directions. */
(function () {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- scroll reveal (rect-based; frozen-safe) ---------------- */
  const rv = Array.from(document.querySelectorAll('.rv'));
  if (!reduce) {
    rv.forEach((el) => el.classList.add('rv-hide'));
    function revealCheck() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const el of rv) {
        if (!el.classList.contains('rv-hide')) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.remove('rv-hide');
      }
    }
    revealCheck();
    window.addEventListener('scroll', revealCheck, { passive: true });
    window.addEventListener('resize', revealCheck);
    window.addEventListener('load', revealCheck);
    document.addEventListener('visibilitychange', revealCheck);
    setTimeout(() => rv.forEach((el) => { el.style.transition = 'none'; el.classList.remove('rv-hide'); }), 1300);
  }

  /* ---------------- count-ups ---------------- */
  function runCount(el) {
    const t = parseFloat(el.dataset.count);
    const pre = el.dataset.pre || '', suf = el.dataset.suf || '', dec = parseInt(el.dataset.dec || '0', 10);
    if (reduce) { el.textContent = pre + t.toFixed(dec) + suf; return; }
    const dur = 1100, t0 = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (t * eased).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(frame); else el.textContent = pre + t.toFixed(dec) + suf;
    }
    requestAnimationFrame(frame);
  }
  const counts = Array.from(document.querySelectorAll('[data-count]'));
  const countDone = new Set();
  function countCheck() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for (const el of counts) {
      if (countDone.has(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) { countDone.add(el); runCount(el); }
    }
  }
  countCheck();
  window.addEventListener('scroll', countCheck, { passive: true });
  window.addEventListener('load', countCheck);
  setTimeout(() => counts.forEach((el) => { if (countDone.has(el)) return; countDone.add(el); const t = parseFloat(el.dataset.count); el.textContent = (el.dataset.pre || '') + t.toFixed(parseInt(el.dataset.dec || '0', 10)) + (el.dataset.suf || ''); }), 1300);

  /* ---------------- operator bars (hover swaps ring center) ---------------- */
  const bars = Array.from(document.querySelectorAll('.bar'));
  const ringN = document.getElementById('ringN');
  const ringL = document.getElementById('ringL');
  if (bars.length && ringN) {
    let active = -1, timer = null;
    const base = { n: ringN.textContent, l: ringL.textContent };
    function set(i) {
      bars.forEach((b, j) => b.classList.toggle('on', j === i));
      if (i < 0) { ringN.textContent = base.n; ringL.textContent = base.l; }
      else { ringN.textContent = bars[i].dataset.m; ringL.textContent = bars[i].dataset.ml; }
    }
    function cycle() { if (reduce) return; let n = 0; timer = setInterval(() => { active = (active + 1) % bars.length; set(active); if (++n >= bars.length) { clearInterval(timer); active = 0; set(0); } }, 4000); }
    bars.forEach((b, i) => {
      b.addEventListener('mouseenter', () => { clearInterval(timer); set(i); });
      b.addEventListener('mouseleave', () => { set(-1); active = -1; cycle(); });
      b.addEventListener('click', () => { clearInterval(timer); active = i; set(i); });
    });
    setTimeout(() => { set(0); active = 0; cycle(); }, reduce ? 0 : 900);
    setTimeout(() => { document.querySelectorAll('.track i').forEach((i) => { i.style.width = i.dataset.w + '%'; }); }, reduce ? 0 : 350);
  }

  /* ---------------- data-warehouse overlays (pop in on scroll — mimics the original build) ---------------- */
  const vcard = document.querySelector('.vcard');
  if (vcard) {
    const badges = Array.from(vcard.querySelectorAll('.statbadge'));
    let shown = false;
    const showBadges = () => {
      if (shown) return; shown = true;
      badges.forEach((b, i) => setTimeout(() => b.classList.add('show'), reduce ? 0 : 160 + i * 230));
      const v = vcard.querySelector('video'); if (v && v.paused) { try { v.play(); } catch (e) {} }
      window.removeEventListener('scroll', badgeCheck);
    };
    function badgeCheck() {
      if (shown) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = vcard.getBoundingClientRect();
      if (r.top < vh * 0.8 && r.bottom > 0) showBadges();
    }
    badgeCheck();
    window.addEventListener('scroll', badgeCheck, { passive: true });
    window.addEventListener('load', badgeCheck);
    setTimeout(() => { if (!shown) showBadges(); }, 1500);
  }

  /* ---------------- the live terminal ---------------- */
  const term = document.getElementById('term');
  if (!term) return;
  const log = document.getElementById('termLog');
  const promptRow = document.getElementById('termPrompt');
  const input = document.getElementById('termInput');
  const chips = Array.from(document.querySelectorAll('.cmd-chip'));

  const PROMPT = '<span class="pr">bill@bricker-os</span><span class="sep">:</span><span class="pa">~</span><span class="dl">$</span> ';
  const ASK_URL = 'https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill';
  const history = [];

  // command library — sales-forward narrative; every number traces to FACTS.md / the sent résumé
  const COMMANDS = {
    whoami: [
      { c: 'sp', t: 'Bill Bricker' },
      { t: 'AI-Forward Sales & Partnerships Leader.' },
      { t: 'I close what the biggest names in tech say yes to,' },
      { t: 'then build the AI workflows that do the work.' },
      { d: 'Raleigh, NC · founder · closed Google as a partner — and ships the product too.' }
    ],
    dreamship: [
      { c: 'hd', t: 'Dreamship — the deal everything came off:' },
      { t: 'I founded it and, in year one, closed Google as a partner.' },
      { k: 'Google', t: 'director sign-off across 5\u20136 internal teams \u00b7 $45M+ channel \u00b7 ran 5+ yrs.' },
      { k: 'Scale', t: '$35M+ peak revenue \u00b7 11x in 2020 ($1.6M\u2192$17M) \u00b7 ~$85M GMV.' },
      { k: 'Profit', t: 'EBITDA-profitable four years running. Profitable today.' },
      { d: '$45M+ = ad spend *through* the channel \u2014 not our revenue.' }
    ],
    flywheel: [
      { c: 'hd', t: 'Then I made closing big tech a system:' },
      { k: 'Repeatable', t: 'Stripe \u00b7 PayPal \u00b7 Payoneer \u00b7 Meta.' },
      { k: 'Microsoft', t: 'Bing\u2013ChatGPT merchant deal \u2014 partner tier earned on volume.' },
      { d: 'one credible yes unlocked the next. Not a one-off \u2014 a flywheel.' }
    ],
    pedigree: [
      { c: 'hd', t: 'Where I cut my teeth \u2014 cold calls to closes:' },
      { t: 'Northwestern Mutual (top 10 nat\u2019l) \u2192 IBM/Netezza (7-fig, quota)' },
      { t: '\u2192 WibiData (F500) \u2192 GearLaunch \u2192 Dreamship \u2192 Courtana.' },
      { d: 'twenty years of selling complex tech to hard buyers. open story \u2192' }
    ],
    ai: [
      { c: 'hd', t: 'AI is my multiplier, not my headline:' },
      { k: 'Pickle DaaS', t: 'raw court video \u2192 player/coaching/venue intel at $0.0054/clip.' },
      { k: 'Shipped', t: '40+ apps across 31 repos \u2014 built & run solo.' },
      { d: 'I build the AI-native workflows that compress weeks of GTM into days.' }
    ],
    hire: [
      { c: 'sp', t: 'Let\u2019s talk.' },
      { k: 'email', t: 'bricker3@gmail.com' },
      { k: 'linkedin', t: 'linkedin.com/in/williambricker' },
      { d: 'AI-forward sales \u2014 I close, then build the workflows that scale it.' }
    ],
    'why-you': [
      { c: 'hd', t: 'Why me, not a forward-deployed engineer:' },
      { t: 'Plenty of people can build with AI. Far fewer can walk into' },
      { t: 'Google and close a first-of-its-kind partnership \u2014 then build' },
      { t: 'the product too. I do both; that seam is the rare part.' },
      { d: 'I close the room, then ship what it needs.' }
    ],
    billygoat: [
      { c: 'sp', t: 'DJ Billygoat \ud83d\udc10' },
      { t: 'Yes, that was me. Some closers warm up the room differently.' },
      { d: 'ask me about it sometime.' }
    ],
    surprise: [
      { c: 'hd', t: 'A few things that don\u2019t fit on a r\u00e9sum\u00e9:' },
      { t: 'Father of three. Shipped 40+ apps solo. fka DJ Billygoat.' },
      { t: 'I close the room, then build the thing it needs.' },
      { d: 'tell the best story, not the full story.' }
    ],
    help: [
      { c: 'hd', t: 'Available commands:' },
      { t: 'whoami \u00b7 dreamship \u00b7 flywheel \u00b7 pedigree \u00b7 ai \u00b7 why-you \u00b7 hire \u00b7 billygoat \u00b7 surprise \u00b7 clear' },
      { d: 'tap a chip, type a command, or ask me anything + Enter.' }
    ]
  };
  const OPEN = { pedigree: 'climb.html', ai: '#ai' };

  function lineEl(l) {
    const div = document.createElement('div');
    div.className = 'tline' + (l.c ? ' ' + l.c : '') + (l.d ? ' dim' : '') + (l.k ? ' kv' : '');
    if (l.k) {
      const k = document.createElement('span'); k.className = 'tk'; k.textContent = l.k;
      const v = document.createElement('span'); v.className = 'tv'; v.textContent = l.t;
      div.appendChild(k); div.appendChild(v);
    } else {
      div.textContent = l.t || l.d || '';
    }
    return div;
  }

  let busy = false;
  function typeCmd(name, cb) {
    const cmd = name.toLowerCase().trim();
    if (cmd === 'clear') { log.innerHTML = ''; cb && cb(); return; }
    const def = COMMANDS[cmd];
    busy = true;
    if (promptRow) promptRow.classList.add('hide');
    const echo = document.createElement('div');
    echo.className = 'tline echo';
    echo.innerHTML = PROMPT + '<span class="typed"></span><span class="tcur"></span>';
    log.appendChild(echo);
    const typed = echo.querySelector('.typed');
    const cur = echo.querySelector('.tcur');
    const full = cmd;
    let i = 0;
    const speed = reduce ? 0 : 38;
    function typeChar() {
      typed.textContent = full.slice(0, i++);
      if (i <= full.length) { setTimeout(typeChar, speed); }
      else { cur.remove(); printOut(); }
    }
    function finish() {
      busy = false;
      if (promptRow) promptRow.classList.remove('hide');
      if (input && document.activeElement !== document.body) input.focus();
      term.scrollTop = term.scrollHeight;
      cb && cb();
    }
    // free-text \u2192 live ask-bill backend; graceful canned fallback so the page never looks broken
    function askBackend(q) {
      const thinking = document.createElement('div');
      thinking.className = 'tline dim'; thinking.textContent = 'thinking\u2026';
      log.appendChild(thinking); term.scrollTop = term.scrollHeight;
      let settled = false;
      const ctrl = ('AbortController' in window) ? new AbortController() : null;
      const to = setTimeout(() => { if (ctrl) ctrl.abort(); }, 18000);
      fetch(ASK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q, history: history.slice(-6) }), signal: ctrl ? ctrl.signal : undefined })
        .then((r) => { if (!r.ok) throw 0; return r.json(); })
        .then((d) => {
          clearTimeout(to); settled = true; thinking.remove();
          const a = d.answer || d.response || d.text || d.message;
          if (!a) throw 0;
          history.push({ role: 'user', content: q }); history.push({ role: 'assistant', content: String(a) });
          const parts = String(a).split(/\n+/).map((s) => s.trim()).filter(Boolean);
          let pi = 0;
          (function nextP() {
            if (pi >= parts.length) { finish(); return; }
            log.appendChild(lineEl({ t: parts[pi] })); pi++;
            term.scrollTop = term.scrollHeight;
            setTimeout(nextP, reduce ? 0 : 55);
          })();
        })
        .catch(() => {
          clearTimeout(to); if (settled) return; thinking.remove();
          log.appendChild(lineEl({ c: 'err', t: '\u2717 not a command \u2014 try: whoami \u00b7 dreamship \u00b7 flywheel \u00b7 pedigree \u00b7 ai \u00b7 hire' }));
          finish();
        });
    }
    function printOut() {
      if (!def) { askBackend(name.trim()); return; }
      const lines = def;
      let li = 0;
      function nextLine() {
        if (li >= lines.length) {
          if (OPEN[cmd]) {
            const a = document.createElement('a');
            a.className = 'tline link'; a.href = OPEN[cmd];
            if (OPEN[cmd].startsWith('#')) { const tgt = document.querySelector(OPEN[cmd]); if (tgt) a.addEventListener('click', (e) => { e.preventDefault(); tgt.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }); }
            a.textContent = '\u2192 open ' + cmd;
            log.appendChild(a);
          }
          finish();
          return;
        }
        log.appendChild(lineEl(lines[li]));
        li++;
        term.scrollTop = term.scrollHeight;
        setTimeout(nextLine, reduce ? 0 : 90);
      }
      nextLine();
    }
    if (reduce) { typed.textContent = full; cur.remove(); printOut(); }
    else typeChar();
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => { if (busy) return; typeCmd(chip.dataset.cmd); });
  });
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !busy && input.value.trim()) { const v = input.value; input.value = ''; typeCmd(v); }
    });
  }
  let booted = false;
  function boot() { if (booted) return; booted = true; setTimeout(() => typeCmd('whoami'), reduce ? 0 : 420); }
  function bootCheck() {
    if (booted) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const r = term.getBoundingClientRect();
    if (r.top < vh * 0.72 && r.bottom > 0) { boot(); window.removeEventListener('scroll', bootCheck); }
  }
  bootCheck();
  window.addEventListener('scroll', bootCheck, { passive: true });
  window.addEventListener('load', bootCheck);
  setTimeout(boot, 4000);
})();
