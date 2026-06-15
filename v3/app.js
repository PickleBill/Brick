/* bricker.os — the live operator console
   content layer + terminal engine + hiring-manager mode + receipts + live data
   Static, vanilla. Grounded in the FACTS ledger. Honors prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* =========================================================================
     CONTENT LAYER — receipts trace to content/FACTS.md (ledger-true).
     ⚠️ values are surfaced as the design intends; see BUILD-LOG for confirms.
  ========================================================================= */
  var RECEIPTS = {
    google:   { k:'The Google partnership', v:'Partner, not sold', c:'As a <b>sub-one-year-old startup</b>, navigated 5–6 internal Google teams (trust &amp; safety, business integrity, commercial) to director+ sign-off — a first-of-its-kind cross-division <b>partnership</b> (not an acquisition). An 8-figure ad-spend channel that ran <b>5+ years</b>; Stripe, PayPal, Meta &amp; Payoneer followed off it.', src:'Dreamship · 2018–23', tag:'"closed as a partner" — never "sold"', link:{u:'https://dreamship.com',t:'dreamship.com ↗'} },
    revenue:  { k:'Revenue led', v:'$35M+', c:'Led Dreamship as cofounder/CEO to <b>$35M+ revenue</b>, ~$85M GMV, 2.3M+ units — on $2.2M raised, profitable at step-back and every year since.', src:'Dreamship · cofounder &amp; CEO', tag:'durable, not a spike' },
    eleven:   { k:'Growth', v:'11x', c:'<b>11x revenue in a single year</b> — orders → supply routes → reliable shipping trust, compounded by a COVID tailwind and execution.', src:'Dreamship · the breakout year' },
    enterprise:{k:'Enterprise pedigree', v:'8-figure', c:'IBM / Netezza (2012–14): high-six-figure deals with Zillow &amp; Avalara, part of an <b>8-figure McKesson</b> contribution, &gt;100% of quota. Northwestern Mutual: top-10 nationally, <b>$6M+ TCV</b>. Twenty years carrying — and beating — a number.', src:'IBM/Netezza · Northwestern Mutual' },
    apps:     { k:'Shipped solo', v:'40+ apps', c:'<b>40+ apps across 31 repos</b>, built by one operator — enterprise tools, GTM collateral that closed a venue partner, consumer products. Quantity anchored to real, openable things.', src:'2025 → now · the AI build engine' },
    repos:    { k:'On the commits', v:'31 repos', c:'<b>31 repositories with my name on the commits.</b> Not no-code, not a demo account — designed and shipped production AI systems myself.', src:'github.com/picklebill' },
    clip:     { k:'Unit economics', v:'$0.0054', c:'Pickle DaaS analyzes video at <b>$0.0054 per clip</b> (~7x cheaper than the obvious approach) — the measured unit-cost instinct a forward-deployed role runs on.', src:'Pickle DaaS · verified Apr 2026' },
    daas:     { k:'Data pipeline', v:'21K+', c:'A self-serve sports-data warehouse spun from raw video: <b>21K+ clips processed</b>, <b>4,097 analyzed</b> — Supabase, autonomous ingest, a ground-truth validation loop. A working system, not a slide.', src:'Pickle DaaS', link:{u:'https://picklebill.github.io/pickle-daas-data/dashboards/investor-walkthrough-v4.html',t:'walkthrough ↗'} },
    courts:   { k:'Now shipping', v:'36 courts', c:'Courtana — AI smart-court SaaS — concept to <b>36 courts live or piloting</b> across 11+ sports, with a 44-court LOI, on $350K raised. The current live peak of the climb.', src:'Courtana · 2023 → now', link:{u:'https://courtana.com',t:'courtana.com ↗'} },
    years:    { k:'The career', v:'20 yrs', c:'<b>Twenty years</b> translating frontier/complex tech into a "yes" — enterprise data, then a platform, now the models themselves. The only thing that changed is I now build what I sell.', src:'2006 → now' }
  };
  var SELLS_R = ['google','revenue','eleven','enterprise'];
  var BUILD_R = ['apps','repos','clip','daas'];
  var LEDGER  = ['revenue','eleven','google','apps','daas','clip','courts','years'];

  /* =========================================================================
     RECEIPT DRAWER (prove-it)
  ========================================================================= */
  var scrim = $('#drawerScrim');
  function openReceipt(id){
    var r = RECEIPTS[id]; if(!r) return;
    $('#dK').textContent = r.k;
    $('#dV').textContent = r.v;
    $('#dC').innerHTML = r.c;
    var src = '<span class="tag">'+esc(r.tag||'fact ledger')+'</span><span>'+esc(r.src||'')+'</span>';
    if(r.link) src += '<a href="'+r.link.u+'" target="_blank" rel="noopener">'+esc(r.link.t)+'</a>';
    $('#dSrc').innerHTML = src;
    scrim.classList.add('on');
    $('#drawerX').focus();
  }
  function closeReceipt(){ scrim.classList.remove('on'); }
  $('#drawerX').addEventListener('click', closeReceipt);
  scrim.addEventListener('click', function(e){ if(e.target===scrim) closeReceipt(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeReceipt(); });

  function rcptBtn(id){
    var r = RECEIPTS[id];
    return '<button class="rcpt-btn" data-rcpt="'+id+'"><span class="v">'+esc(r.v)+'</span><span class="k">'+esc(r.k)+' · prove it →</span></button>';
  }
  $('#rcptsSells').innerHTML = SELLS_R.map(rcptBtn).join('');
  $('#rcptsBuild').innerHTML = BUILD_R.map(rcptBtn).join('');
  $('#ledger').innerHTML = LEDGER.map(rcptBtn).join('');
  document.body.addEventListener('click', function(e){
    var b = e.target.closest('[data-rcpt]'); if(b) openReceipt(b.dataset.rcpt);
  });

  /* =========================================================================
     BOOT REVEAL (failsafe so nothing sticks at opacity:0)
  ========================================================================= */
  var rvEls = [].slice.call(document.querySelectorAll('.rv'));
  function show(el){ if(el._s) return; el._s=true; el.classList.add('in');
    if(reduce){ el.style.transition='none'; el.style.opacity='1'; el.style.transform='none'; } }
  function reveal(){ var vh=innerHeight||800; rvEls.forEach(function(el){ if(el._s) return;
    var r=el.getBoundingClientRect(); if(r.top<vh*0.94 && r.bottom>0) show(el); }); }
  reveal(); addEventListener('scroll',reveal,{passive:true}); addEventListener('resize',reveal);
  setTimeout(function(){ rvEls.forEach(show); }, 2600);

  /* =========================================================================
     TERMINAL ENGINE
  ========================================================================= */
  var out=$('#termOut'), line=$('#termLine'), input=$('#termIn'), chips=$('#termChips');
  var history=[], booted=false;
  function el(html,cls){ var d=document.createElement('div'); if(cls)d.className=cls; d.innerHTML=html; return d; }
  function scroll(){ out.scrollTop=out.scrollHeight; }
  function print(html,cls){ out.appendChild(el(html,cls)); scroll(); }
  function block(lines){ var b=document.createElement('div'); b.className='blk';
    lines.forEach(function(l){ var d=document.createElement('div'); d.className='ln'; d.innerHTML=l; b.appendChild(d); });
    out.appendChild(b); scroll(); return b; }
  function echo(cmd){ print('<span class="ps">→ ~</span> '+esc(cmd),'echo'); }
  function rc(id){ return '<span class="rcpt" data-rcpt="'+id+'">▸ receipt: '+esc(RECEIPTS[id].k)+'</span>'; }
  function suggest(cmds){ // follow-up chips after an answer
    var b=document.createElement('div'); b.className='blk';
    b.innerHTML='<span class="dim">next: </span>'+cmds.map(function(c){
      return '<span class="rcpt" data-run="'+esc(c)+'">'+esc(c)+'</span>'; }).join(' ');
    out.appendChild(b); scroll();
  }

  var CMDS = {
    help: function(){ block([
      '<span class="dim">commands — type or tap a chip:</span>',
      '<span class="m">whoami</span>   <span class="m">companies</span>   <span class="m">google-deal</span>   <span class="m">enterprise</span>   <span class="m">builds</span>',
      '<span class="m">pickle-daas</span>   <span class="m">stats</span>   <span class="m">git log</span>   <span class="m">contact</span>   <span class="m">clear</span>',
      '<span class="dim">fun:</span> <span class="m">chuck</span>  <span class="m">advice</span>  <span class="m">billygoat</span>  <span class="m">sudo hire-bill</span>  <span class="dim">(and ↑↑↓↓←→←→ba)</span>',
      '<span class="dim">…or ask a real question:</span> <span class="dim">"how did you close Google?"</span> — answered from the ledger.'
    ]); },
    whoami: function(){ block([
      '<span class="m">Bill Bricker</span> — forward-deployed operator. I sell frontier tech AND I build it.',
      'Enterprise seller turned founder-CEO. Closed &amp; ran the Google partnership',
      'at a &lt;1-yr-old startup. Now shipping production AI daily — 40+ apps, solo.',
      'Raleigh, NC · father of three · fka DJ Billygoat · still walking.',
      rc('years')
    ]); },
    'why-you': function(){ block([
      '<span class="am"># Why me over a 28-year-old forward-deployed engineer?</span>',
      'They can build. Most can\'t walk into Google and leave with a',
      '<span class="m">partnership</span> — I did that, then turned it into $35M+ and 11x.',
      'I\'ve carried an 8-figure number for 20 years AND I ship production AI',
      'solo today (31 repos, my commits). The rare seam labs keep missing —',
      'someone who closes the room <span class="m">and</span> reads the codebase — is just my résumé.',
      rc('google')+' '+rc('repos')
    ]); ask('Make the sharp case for why Bill is a stronger forward-deployed / GTM hire than a typical engineer, grounded in his record.', true); },
    'shipped-this-week': function(){ shippedThisWeek(); },
    companies: function(){ block([
      '<span class="m">Courtana</span>  founder/CEO · 2023→now · <span class="dim">courtana.com</span>',
      '  AI smart-court SaaS — 36 courts live/piloting, 11+ sports.',
      '<span class="m">Dreamship</span> cofounder/CEO · 2018–23 · <span class="dim">dreamship.com</span>',
      '  API fulfillment — $35M+, 11x in a year, the Google partnership.',
      rc('courts')+' '+rc('revenue')
    ]); suggest(['google-deal','builds']); },
    'google-deal': function(){ block([
      '<span class="m"># The Google partnership — not an acquisition.</span>',
      'As a &lt;1-year-old startup, navigated 5–6 internal Google teams',
      '(trust &amp; safety, business integrity, commercial) to director+ sign-off —',
      'a first-of-its-kind cross-division <span class="m">partnership</span>.',
      '→ 8-figure ad-spend channel, run <span class="m">5+ years</span>.',
      '→ Stripe, PayPal, Meta &amp; Payoneer followed off it.',
      '<span class="dim">"Sold Google" was always sales shorthand for closing the account.</span>',
      rc('google')
    ]); suggest(['why-you','companies']); },
    enterprise: function(){ block([
      '<span class="m"># 20 years carrying a number.</span>',
      'IBM / Netezza (2012–14) — Zillow, Avalara; 8-figure McKesson',
      '  contribution; &gt;100% quota.',
      'Northwestern Mutual — top 10 nationally; $6M+ TCV.',
      'GearLaunch — VP Sales &amp; Marketing. Then: founder-led GTM.',
      rc('enterprise')
    ]); },
    builds: function(){ block([
      '<span class="m"># VibeCo</span> — 11 AI agents, multi-model (Gemini + Claude).',
      'Type an idea → business brief, build prompts, working app.',
      '<span class="m">40+ apps</span> across <span class="m">31 repos</span>, shipped solo:',
      '  Venue Connect · NaughtyData · Litigator · HeadsUpTime · +30 more',
      '<span class="dim">→ vibeco.lovable.app</span>',
      rc('apps')+' '+rc('repos')
    ]); suggest(['pickle-daas','shipped-this-week']); },
    'pickle-daas': function(){ block([
      '<span class="m"># Pickle DaaS</span> — self-serve sports-data warehouse from raw video.',
      'Supabase + connectors + autonomous ingest + ground-truth loop.',
      '<span class="m">21K+ processed</span> · <span class="m">4,097 analyzed</span> · <span class="m">$0.0054/clip</span> (~7x cheaper).',
      '<span class="dim">→ picklebill.github.io/pickle-daas-data</span>',
      rc('daas')+' '+rc('clip')
    ]); },
    stats: function(){ block([
      '11x        revenue growth in one year',
      '$35M+      cumulative revenue led',
      '8-figure   Google channel closed &amp; run 5+ yrs',
      '40+ apps   shipped solo · 31 repos',
      '21K+       clips processed · 4,097 analyzed',
      '3          startups founded over 20 years'
    ]); },
    'git log': function(){ block([
      '<span class="m">2026</span>  Courtana — 36 courts live, scaling.',
      '<span class="m">2023</span>  Diagnosed; kept the pipeline moving. Started Courtana.',
      '<span class="m">2020</span>  Dreamship 11x — orders → routes → shipping trust.',
      '<span class="m">2019</span>  Closed Google. Stripe/PayPal/Meta followed.',
      '<span class="m">2012</span>  IBM/Netezza — 8-figure enterprise deals.'
    ]); },
    contact: function(){ block([
      '<span class="a" data-href="mailto:bricker3@gmail.com">bricker3@gmail.com</span>',
      '<span class="a" data-href="https://linkedin.com/in/williambricker">linkedin.com/in/williambricker</span>',
      '908 · 601 · 8152 · Raleigh, NC',
      '<span class="dim">open to founder / GTM / partnership / forward-deployed / fractional.</span>'
    ]); },
    chuck: function(){ chuck(); },
    advice: function(){ advice(); },
    billygoat: function(){ block([
      'fka <span class="m">DJ Billygoat</span> — yes, that\'s really me.',
      'Closed Google, beat cancer, shipped 40 AI apps. Same guy.',
      '<span class="dim">Still in the room. 🐐</span>'
    ]); },
    'sudo hire-bill': function(){ block([
      '<span class="dim">[sudo] authenticating hiring manager…</span>',
      '<span class="m">Permission granted.</span> Initiating onboarding sequence…',
      '  ✓ carries a number   ✓ ships the product   ✓ closes the room',
      '<span class="am">→ one step left:</span> <span class="a" data-href="mailto:bricker3@gmail.com?subject=Forward-deployed%20%E2%80%94%20let\'s%20talk">email bill to complete</span>'
    ]); },
    sudo: function(){ CMDS['sudo hire-bill'](); },
    clear: function(){ out.innerHTML=''; }
  };

  /* ---- local keyword fallback for free text ---- */
  function localAnswer(q){
    var s=q.toLowerCase();
    if(/google/.test(s)) return CMDS['google-deal'];
    if(/why|better|over|hire you|instead|vs|fde|forward/.test(s)) return CMDS['why-you'];
    if(/dreamship|\$35|11x|revenue|fulfil/.test(s)) return CMDS.companies;
    if(/courtana|court|pickleball|sport/.test(s)) return CMDS.companies;
    if(/build|app|vibe|ship|repo|code|solo/.test(s)) return CMDS.builds;
    if(/data|clip|pickle|warehouse|video|vision|cost/.test(s)) return CMDS['pickle-daas'];
    if(/sell|sale|gtm|quota|ibm|enterprise|partner/.test(s)) return CMDS.enterprise;
    if(/cancer|chemo|health|climb|walk|story/.test(s)) return function(){ block([
      'Diagnosed 2023; operated through chemo into 2025 — the pipeline kept',
      'moving the whole time. The Long Walk is present tense: the',
      'figuring-out-what\'s-next chapter. <span class="a" data-href="../climb.html">walk the climb →</span>']); };
    if(/kid|child|family|father|three|dad/.test(s)) return function(){ block(['Father of three. They are completely unimpressed by all of it.']); };
    if(/dj|billygoat|music/.test(s)) return CMDS.billygoat;
    if(/hire|available|role|job|contact|email|reach|talk/.test(s)) return CMDS.contact;
    if(/who|what.*you|about/.test(s)) return CMDS.whoami;
    return null;
  }

  /* ---- ask-bill (corpus-grounded) with graceful fallback ---- */
  var ASK_URL='https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill';
  function ask(q, quiet){
    var thinking=el('<span class="dim">thinking…</span>','blk'); out.appendChild(thinking); scroll();
    var done=false, ctrl=('AbortController' in window)?new AbortController():null;
    var to=setTimeout(function(){ if(ctrl)ctrl.abort(); },18000);
    fetch(ASK_URL,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question:q,history:history.slice(-6)}),signal:ctrl?ctrl.signal:undefined})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){ clearTimeout(to); done=true; thinking.remove();
        var a=d.answer||d.response||d.text||d.message;
        if(a){ history.push({role:'assistant',content:a}); typed(String(a)); }
        else fallback(); })
      .catch(function(){ clearTimeout(to); if(done) return; thinking.remove(); fallback(); });
    function fallback(){ if(quiet) return; var f=localAnswer(q); if(f) f(); else block([
      '<span class="dim">live answer unavailable right now — try a command:</span>',
      '<span class="m">companies</span> · <span class="m">google-deal</span> · <span class="m">builds</span> · <span class="m">stats</span>']); }
  }
  function typed(text){ // typewriter reveal of a streamed-feeling answer
    var b=document.createElement('div'); b.className='blk'; out.appendChild(b);
    var lines=text.split(/\n+/);
    if(reduce){ b.innerHTML=lines.map(function(l){return '<div class="ln">'+esc(l)+'</div>';}).join(''); scroll(); return; }
    var li=0;
    (function nextLine(){ if(li>=lines.length) return;
      var d=document.createElement('div'); d.className='ln'; b.appendChild(d);
      var t=lines[li], ci=0;
      var iv=setInterval(function(){ d.textContent=t.slice(0,ci++); scroll();
        if(ci>t.length){ clearInterval(iv); li++; setTimeout(nextLine,90); } }, 9);
    })();
  }

  /* ---- fun endpoints ---- */
  function chuck(){
    var t=el('<span class="dim">fetching…</span>','blk'); out.appendChild(t); scroll();
    fetch('https://api.chucknorris.io/jokes/random').then(function(r){return r.json();}).then(function(d){
      t.remove(); var j=String(d.value||'').replace(/Chuck Norris/g,'Bill Bricker');
      block(['<span class="m"># fact:</span> '+esc(j)]);
    }).catch(function(){ t.remove(); block(['<span class="m"># fact:</span> Bill Bricker closed Google as a partner before his startup turned one. (the API is napping; this one\'s true.)']); });
  }
  function advice(){
    var t=el('<span class="dim">…</span>','blk'); out.appendChild(t); scroll();
    fetch('https://api.adviceslip.com/advice?t='+Date.now()).then(function(r){return r.json();}).then(function(d){
      t.remove(); block(['<span class="dim">advice:</span> '+esc(d.slip.advice)]);
    }).catch(function(){ t.remove(); block(['<span class="dim">advice:</span> Sell the thing by building the thing.']); });
  }
  function shippedThisWeek(){
    var t=el('<span class="dim">pulling recent commits…</span>','blk'); out.appendChild(t); scroll();
    fetch('https://api.github.com/users/picklebill/events/public?per_page=30').then(function(r){ if(!r.ok)throw 0; return r.json(); }).then(function(ev){
      t.remove();
      var pushes=ev.filter(function(e){return e.type==='PushEvent';}).slice(0,6);
      if(!pushes.length){ throw 0; }
      var lines=['<span class="m"># still building — recent public commits:</span>'];
      pushes.forEach(function(p){
        var repo=p.repo.name.split('/').pop();
        var msg=(p.payload&&p.payload.commits&&p.payload.commits[0]&&p.payload.commits[0].message||'').split('\n')[0].slice(0,46);
        lines.push('<span class="dim">'+rel(p.created_at)+'</span>  <span class="m">'+esc(repo)+'</span>  '+esc(msg));
      });
      lines.push('<span class="dim">…this is live from github.com/picklebill — the build has a heartbeat.</span>');
      block(lines); block(['']);
    }).catch(function(){ t.remove(); block([
      '<span class="m"># still building.</span> 40+ apps across 31 repos, shipped solo —',
      'VibeCo, Pickle DaaS, Venue Connect, and whatever I touched today.',
      '<span class="dim">(live commit feed rate-limited; the receipts hold.)</span>', rc('apps')]); });
  }

  /* ---- run a command line ---- */
  function run(raw){
    var cmd=(raw||'').trim(); if(!cmd) return;
    echo(cmd); history.push({role:'user',content:cmd});
    var lc=cmd.toLowerCase();
    var am=lc.match(/^ask\s+(.+)/); if(am){ ask(am[1]); return; }
    if(CMDS[lc]){ CMDS[lc](); return; }
    if(lc==='git'||lc==='gitlog'||lc==='git-log'){ CMDS['git log'](); return; }
    if(lc==='ls'){ CMDS.help(); return; }
    if(lc==='climb'||lc==='the-climb'||lc==='story'){ block(['Twenty years, one climb. <span class="a" data-href="../climb.html">→ walk it</span>']); return; }
    if(/hire-bill|hire bill/.test(lc)){ CMDS['sudo hire-bill'](); return; }
    ask(cmd); // unknown → treat as a real question
  }

  /* clickable links + suggestions inside the terminal */
  out.addEventListener('click', function(e){
    var a=e.target.closest('[data-href]'); if(a){ var u=a.dataset.href; if(u.indexOf('http')===0){ window.open(u,'_blank','noopener'); } else { location.href=u; } return; }
    var rcr=e.target.closest('[data-run]'); if(rcr){ run(rcr.dataset.run); if(input) input.focus(); }
  });

  /* ---- boot ---- */
  function showInput(){ if(line){ line.style.display='flex'; scroll(); } }
  function boot(after){
    var ls=[
      {t:'bricker.os — forward-deployed operator console. booting…',c:'dim'},
      {t:'Bill Bricker — I sell frontier tech AND I build it myself.',c:'m'},
      {t:'Closed & ran the Google partnership at a <1-yr-old startup.',c:''},
      {t:'Now shipping production AI daily — 40+ apps, solo. Ask me anything.',c:''}
    ];
    echo('whoami');
    if(reduce){ block(ls.map(function(l){return l.c?'<span class="'+l.c+'">'+esc(l.t)+'</span>':esc(l.t);})); if(after)after(); return; }
    var b=document.createElement('div'); b.className='blk'; out.appendChild(b); var i=0;
    (function nl(){ if(i>=ls.length){ if(after)after(); return; }
      var l=ls[i], d=document.createElement('div'); d.className='ln'+(l.c?' '+l.c:''); b.appendChild(d); var ci=0;
      var iv=setInterval(function(){ d.textContent=l.t.slice(0,ci++); scroll();
        if(ci>l.t.length){ clearInterval(iv); i++; setTimeout(nl,120); } }, 11);
    })();
  }
  function bootCheck(){ if(booted) return; var term=$('#term'); if(!term) return;
    var r=term.getBoundingClientRect(), vh=innerHeight||800;
    if(r.top<vh*0.9 && r.bottom>0){ booted=true; boot(function(){ showInput(); }); removeEventListener('scroll',bootCheck); } }
  bootCheck(); addEventListener('scroll',bootCheck,{passive:true}); addEventListener('load',bootCheck);

  if(input){ input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ var v=input.value; input.value=''; run(v); } }); }
  chips.addEventListener('click',function(e){ var b=e.target.closest('.chip[data-cmd]'); if(!b) return;
    if(!booted){ booted=true; boot(function(){ showInput(); }); }
    run(b.dataset.cmd); showInput(); if(input) input.focus(); });

  /* =========================================================================
     HIRING-MANAGER MODE — re-tailors the pitch to the visitor's role
  ========================================================================= */
  function tailor(roleRaw){
    var role=(roleRaw||'').trim(); if(!role) { $('#hmInput').focus(); return; }
    document.getElementById('term').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    if(!booted){ booted=true; boot(function(){ showInput(); }); }
    setTimeout(function(){
      echo('tailor "'+role+'"');
      block(['<span class="am"># tailoring the case for: '+esc(role)+'</span>']);
      var q='A hiring manager is hiring for "'+role+'". In 3-4 punchy sentences, make the specific case for why Bill Bricker is a strong fit for THAT role, grounded only in his real record (closed Google as a partner at a <1yr startup; Dreamship $35M+ and 11x; ships production AI solo — VibeCo, 40+ apps/31 repos, Pickle DaaS at $0.0054/clip). Address the role directly, be confident and concrete, no generic filler.';
      var fired=false;
      var fb=setTimeout(function(){ if(fired) return; fired=true; tailorFallback(role); }, 18500);
      // use ask(); if it fails it falls back internally — but provide a tailored local fallback too
      askTailor(q, role, function(){ fired=true; clearTimeout(fb); });
    }, reduce?0:350);
  }
  function askTailor(q, role, onResolve){
    var thinking=el('<span class="dim">thinking…</span>','blk'); out.appendChild(thinking); scroll();
    var done=false, ctrl=('AbortController' in window)?new AbortController():null;
    var to=setTimeout(function(){ if(ctrl)ctrl.abort(); },18000);
    fetch(ASK_URL,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question:q,history:[]}),signal:ctrl?ctrl.signal:undefined})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){ clearTimeout(to); done=true; thinking.remove(); onResolve&&onResolve();
        var a=d.answer||d.response||d.text||d.message;
        if(a){ typed(String(a)); suggest(['why-you','google-deal','book the 20 min']); } else tailorFallback(role); })
      .catch(function(){ clearTimeout(to); if(done) return; thinking.remove(); onResolve&&onResolve(); tailorFallback(role); });
  }
  function tailorFallback(role){
    typed('For '+role+': you need someone who can close the room and ship the product. '+
      'I closed Google as a partner at a sub-one-year-old startup, turned it into $35M+ and 11x at Dreamship, '+
      'and today I build production AI solo — 40+ apps across 31 repos, a data pipeline at $0.0054/clip. '+
      'That\'s the forward-deployed seam most teams can\'t hire for. Let\'s talk this week.');
    suggest(['why-you','google-deal','book the 20 min']);
  }
  $('#hmGo').addEventListener('click', function(){ tailor($('#hmInput').value); });
  $('#hmInput').addEventListener('keydown', function(e){ if(e.key==='Enter') tailor($('#hmInput').value); });
  [].slice.call(document.querySelectorAll('.hm-eg button')).forEach(function(b){
    b.addEventListener('click', function(){ $('#hmInput').value=b.dataset.eg; tailor(b.dataset.eg); }); });
  // "book the 20 min" suggestion
  document.addEventListener('click', function(e){ var r=e.target.closest('[data-run="book the 20 min"]');
    if(r){ location.href='mailto:bricker3@gmail.com?subject=Forward-deployed%20%E2%80%94%20let\'s%20talk'; } });

  /* =========================================================================
     LIVE DATA — github heartbeat (last shipped) + footer commit
  ========================================================================= */
  function rel(iso){ var s=(Date.now()-new Date(iso).getTime())/1000;
    if(s<3600) return Math.max(1,Math.round(s/60))+'m ago';
    if(s<86400) return Math.round(s/3600)+'h ago';
    return Math.round(s/86400)+'d ago'; }
  (function liveHeartbeat(){
    try{
      var cache=sessionStorage.getItem('bos_push');
      if(cache){ apply(JSON.parse(cache)); return; }
    }catch(e){}
    fetch('https://api.github.com/users/picklebill/repos?per_page=100&sort=pushed').then(function(r){ if(!r.ok)throw 0; return r.json(); }).then(function(repos){
      if(!repos.length) throw 0;
      var latest=repos[0].pushed_at, info={last:rel(latest), commit:repos[0].name+' · '+rel(latest)};
      try{ sessionStorage.setItem('bos_push',JSON.stringify(info)); }catch(e){}
      apply(info);
    }).catch(function(){ /* keep static fallbacks */ });
    function apply(info){ var ls=$('#lastShip'); if(ls) ls.textContent=info.last;
      var fc=$('#footCommit'); if(fc) fc.textContent='last commit: '+info.commit; }
  })();

  /* =========================================================================
     FORWARD-LINE COPY + KONAMI
  ========================================================================= */
  $('#fwdCopy').addEventListener('click', function(){
    var t=$('#fwdLine').textContent.replace(/^"|"$/g,'');
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){
      var b=$('#fwdCopy'); b.textContent='copied ✓'; setTimeout(function(){ b.textContent='copy'; },1600);
    }).catch(function(){ var b=$('#fwdCopy'); b.textContent='select & copy'; });
  });
  (function konami(){
    var seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'], i=0;
    addEventListener('keydown', function(e){
      var k=e.key.length===1?e.key.toLowerCase():e.key;
      i=(k===seq[i])?i+1:(k===seq[0]?1:0);
      if(i===seq.length){ i=0; document.getElementById('term').scrollIntoView();
        if(!booted){ booted=true; boot(function(){ showInput(); }); }
        echo('↑↑↓↓←→←→ba');
        block(['<span class="m">🐐 DJ BILLYGOAT MODE UNLOCKED</span>',
          'Closed Google. Beat cancer. Shipped 40 AI apps. Dropped beats.',
          '<span class="dim">same guy. the spectrum is yours now —</span>']);
        document.documentElement.style.setProperty('--mint','#36c6e0');
        setTimeout(function(){ document.documentElement.style.setProperty('--mint','#6fefb4'); }, 4000);
      }
    });
  })();
})();
