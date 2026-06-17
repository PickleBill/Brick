/* bill@bricker-os — home behavior
   reveal · count-ups · identity card (flip + auto-cycling bars + hover logos) ·
   terminal (commands + ask-bill + hiring-manager/reference modes) ·
   cycling video stat overlay · scroll-spy · mobile nav */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* ---------- mobile nav ---------- */
  var navToggle=$('#navToggle'), navLinks=$('#navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){ var open=navLinks.classList.toggle('open'); navToggle.classList.toggle('open',open); navToggle.setAttribute('aria-expanded',open?'true':'false'); });
    navLinks.addEventListener('click', function(e){ if(e.target.closest('a')){ navLinks.classList.remove('open'); navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } });
  }

  /* ---------- reveal ---------- */
  var rvEls = [].slice.call(document.querySelectorAll('.rv'));
  function show(el){ if(el._s) return; el._s=true; el.classList.add('in');
    if(reduce){ el.style.transition='none'; el.style.opacity='1'; el.style.transform='none'; } }
  function reveal(){ var vh=innerHeight||800; rvEls.forEach(function(el){ if(el._s) return;
    var r=el.getBoundingClientRect(); if(r.top<vh*0.93 && r.bottom>0) show(el); }); }
  reveal(); addEventListener('scroll',reveal,{passive:true}); addEventListener('resize',reveal); addEventListener('load',reveal);
  setTimeout(function(){ rvEls.forEach(show); }, 2600);

  /* ---------- count-ups (green stats band) ---------- */
  var counted=false;
  function countUps(){ if(counted) return; var band=$('.statband'); if(!band) return;
    var r=band.getBoundingClientRect(), vh=innerHeight||800; if(r.top>vh*0.95) return; counted=true;
    document.querySelectorAll('.statband [data-count]').forEach(function(el){
      var t=+el.dataset.count, pre=el.dataset.pre||'', suf=el.dataset.suf||'';
      if(reduce){ el.textContent=pre+t+suf; return; }
      var c=0, step=Math.max(1,Math.ceil(t/30)); el.textContent=pre+'0'+suf;
      var iv=setInterval(function(){ c+=step; if(c>=t){ c=t; clearInterval(iv); } el.textContent=pre+c+suf; },28);
    }); }
  countUps(); addEventListener('scroll',countUps,{passive:true}); addEventListener('load',countUps);

  /* ---------- identity card: flip + auto-flip teaser + interactive bars ---------- */
  var flip=$('#flip');
  if(flip){
    var flipped=false, userTouched=false, barsOn=false;
    function setFlip(v){ flipped=v; flip.classList.toggle('flipped',v); flip.setAttribute('aria-pressed',v?'true':'false'); }
    function toggle(){ userTouched=true; setFlip(!flipped); }
    flip.addEventListener('click', toggle);
    flip.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
    if(!reduce){ setTimeout(function(){ if(userTouched) return; setFlip(true);
      setTimeout(function(){ if(userTouched) return; setFlip(false); }, 2500); }, 3400); }
    var bars=[].slice.call(document.querySelectorAll('#bars .bar'));
    var rN=$('#ringN'), rL=$('#ringL'), ai=-1, timer=null;
    function setActive(i){ bars.forEach(function(b,j){ b.classList.toggle('on',j===i); });
      if(i<0){ rN.textContent='20'; rL.textContent='years carrying a number'; }
      else { rN.textContent=bars[i].dataset.m; rL.textContent=bars[i].dataset.ml; } }
    function cycle(){ if(reduce) return; clearInterval(timer); timer=setInterval(function(){ ai=(ai+1)%bars.length; setActive(ai); }, 2600); }
    function activateBars(){ if(barsOn) return; barsOn=true;
      setTimeout(function(){ document.querySelectorAll('#bars .fill').forEach(function(f){ f.style.width=f.dataset.w+'%'; }); }, 180);
      setActive(0); ai=0; cycle(); }
    bars.forEach(function(b,i){
      b.addEventListener('mouseenter',function(){ clearInterval(timer); setActive(i); });
      b.addEventListener('mouseleave',function(){ cycle(); });
      b.addEventListener('click',function(e){ e.stopPropagation(); clearInterval(timer); ai=i; setActive(i); });
    });
    if(bars.length) activateBars();
  }

  /* ====================================================================
     TERMINAL
  ==================================================================== */
  var out=$('#termOut'), line=$('#termLine'), input=$('#termIn'), chips=$('#termChips'), booted=false, history=[];
  function el(html,cls){ var d=document.createElement('div'); if(cls)d.className=cls; d.innerHTML=html; return d; }
  function scroll(){ if(!out) return; if(out.scrollHeight-out.scrollTop-out.clientHeight<60) out.scrollTop=out.scrollHeight; }
  function print(html,cls){ out.appendChild(el(html,cls)); scroll(); }
  function block(lines){ var b=document.createElement('div'); b.className='blk';
    lines.forEach(function(l){ var d=document.createElement('div'); d.className='ln'; d.innerHTML=l; b.appendChild(d); });
    out.appendChild(b); scroll(); }
  function echo(cmd){ print('<span class="ps">→ ~</span> '+esc(cmd),'echo'); }
  function suggest(cmds){ var b=document.createElement('div'); b.className='blk';
    b.innerHTML='<span class="dim">next: </span>'+cmds.map(function(c){ return '<span class="a" data-run="'+esc(c)+'">'+esc(c)+'</span>'; }).join('  ');
    out.appendChild(b); scroll(); }

  var CMDS={
    help:function(){ block([
      '<span class="dim">ask Bill:</span> <span class="m">whoami companies google-deal builds pickle-daas stats enterprise</span>',
      '<span class="dim">hiring me:</span> <span class="am">tailor &lt;role&gt;  reference-check  why-you  the-fit  shipped-this-week</span>',
      '<span class="dim">wildcards:</span> <span style="color:#a78bfa">chuck  billygoat  surprise</span>',
      '<span class="dim">tip:</span> <span class="am">tailor Partnerships Lead at Anthropic</span> <span class="dim">— or paste a job description.</span>']); },
    whoami:function(){ block([
      '<span class="m">Bill Bricker</span> — AI-Forward Sales &amp; Partnerships Leader.',
      'I close what the biggest names in tech say yes to, then build',
      'the AI that does the work. Closed Google as a partner in year one.',
      'Raleigh, NC · father of three · still building.']); },
    companies:function(){ block([
      '<span class="m">Courtana</span>  founder/CEO · 2023→now — AI smart-court SaaS, 36 courts.',
      '<span class="m">Dreamship</span> cofounder/CEO · 2018–23 — $35M+, 11x, the Google partnership.']);
      suggest(['google-deal','builds']); },
    'google-deal':function(){ block([
      '<span class="m"># The Google partnership — not an acquisition.</span>',
      'In year one, navigated 5–6 internal Google teams to',
      'VP-level sign-off — a first-of-its-kind cross-division <span class="m">partnership</span>.',
      '→ <span class="m">$45M+ ad-spend</span> channel, run <span class="m">5+ years</span>. Stripe, PayPal, Meta followed.',
      '<span class="dim">$45M+ = ad spend through the channel — not revenue.</span>']);
      suggest(['why-you','companies']); },
    enterprise:function(){ block([
      '<span class="m"># 20 years carrying a number.</span>',
      'IBM/Netezza — Zillow, Avalara; 8-figure McKesson; achieved quota.',
      'Northwestern Mutual — top 10 nationally; $6M+ TCV. Then founder-led GTM.']); },
    builds:function(){ block([
      '<span class="m"># VibeCo</span> — 11 AI agents (Gemini + Claude). Idea → brief → working app.',
      '<span class="m">40+ apps</span> across <span class="m">31 repos</span>, shipped solo:',
      '  Venue Connect · Litigator · HeadsUpTime · +30 more.',
      '<span class="dim">→ vibeco.lovable.app</span>']);
      suggest(['pickle-daas','shipped-this-week']); },
    'pickle-daas':function(){ block([
      '<span class="m"># Pickle DaaS</span> — self-serve sports-data warehouse from raw video.',
      'Supabase + connectors + autonomous ingest + ground-truth loop.',
      '<span class="m">21K+ processed</span> · <span class="m">4,097 analyzed</span> · <span class="m">$0.0054/clip</span> (~7x cheaper).']); },
    stats:function(){ block([
      '11x        revenue growth in one year',
      '$35M+      peak revenue · Dreamship',
      '$45M+      Google ad-spend channel · 5+ yrs',
      '40+ apps   shipped solo · 31 repos',
      '21K+       clips processed · 4,097 analyzed',
      '3          startups founded over 20 years']); },
    'git log':function(){ block([
      '<span class="m">2026</span>  Courtana — 36 courts live, scaling.',
      '<span class="m">2023</span>  Diagnosed; kept the pipeline moving. Started Courtana.',
      '<span class="m">2020</span>  Dreamship 11x — orders → routes → shipping trust.',
      '<span class="m">2019</span>  Closed Google. Stripe/PayPal/Meta followed.']); },
    contact:function(){ block([
      '<span class="a" data-href="mailto:bricker3@gmail.com">bricker3@gmail.com</span>',
      '<span class="a" data-href="https://linkedin.com/in/williambricker">linkedin.com/in/williambricker</span>',
      'Raleigh, NC',
      '<span class="dim">open to founder / GTM / partnership / forward-deployed / fractional.</span>']); },
    'why-you':function(){ block([
      '<span class="am"># Why me, not a 28-year-old forward-deployed engineer?</span>',
      'They can build. Most can\'t walk into Google and leave with a',
      '<span class="m">partnership</span> — I did that, then turned it into $35M+ and 11x.',
      '20 years carrying an 8-figure number AND I ship production AI solo',
      'today (31 repos, my commits). The seam labs keep missing is my résumé.']);
      ask('Make the sharp case for why Bill is a stronger forward-deployed / GTM hire than a typical engineer, grounded in his record.', true);
      suggest(['tailor Partnerships Lead at Anthropic','reference-check']); },
    'the-fit':function(){ block([
      '<span class="am"># The frontier-lab fit.</span>',
      'Labs are hiring the <span class="m">forward-deployed / GTM engineer</span> hardest —',
      '"the line between selling and building has collapsed." That\'s the job',
      'I\'ve already been doing for two companies: close the room, then ship',
      'the integration myself. I translate frontier capability into a signed yes.']);
      suggest(['tailor GTM lead at a frontier lab','reference-check']); },
    'reference-check':function(){ block([
      '<span class="am"># Reference check — a former Dreamship colleague speaks:</span>',
      '"Would I work with Bill again? In a heartbeat. He closed Google as a',
      'partner when the rest of us thought it was impossible — then actually',
      'ran it for five years. He carries the number AND ships the product.',
      'The rare one who does both."  <span class="dim">— grounded in the record; ask for a real intro.</span>']);
      ask('Role-play a former Dreamship / Google-era colleague giving a candid, specific reference for Bill — would you hire him again, grounded only in his real record.', true);
      suggest(['tailor Partnerships Lead at Anthropic','contact']); },
    'shipped-this-week':function(){ shipped(); },
    'hire-bill':function(){ block([
      '<span class="dim">[sudo] authenticating hiring manager…</span>',
      '<span class="m">Permission granted.</span> Initiating onboarding…',
      '  ✓ carries a number   ✓ ships the product   ✓ closes the room',
      '<span class="am">→ one step left:</span> <span class="a" data-href="mailto:bricker3@gmail.com?subject=Forward-deployed%20%E2%80%94%20let\'s%20talk">email bill to complete</span>']); },
    chuck:function(){ chuck(); },
    billygoat:function(){ block([
      'fka <span class="m">DJ Billygoat</span> — yes, that\'s really me. 🐐',
      'Closed Google, shipped 40+ AI apps solo, dropped a few beats. Same guy.',
      '<span class="dim">Still in the room.</span>']); },
    surprise:function(){ var picks=[chuck,CMDS.billygoat,CMDS['git log'],function(){ block(['<span class="m">fun fact:</span> my kids think the party card game I shipped (GroupOrDare) is the most impressive thing I\'ve done. They\'re probably right.']); },CMDS['why-you']]; picks[Math.floor(Math.random()*picks.length)](); },
    clear:function(){ out.innerHTML=''; }
  };

  /* ---- hiring-manager mode: tailor the pitch to a role / pasted JD ---- */
  function tailor(role){ role=(role||'').trim();
    if(!role){ block(['<span class="am"># hiring-manager mode</span> — type e.g. <span class="m">tailor Partnerships Lead at Anthropic</span>, or paste a job description, and I\'ll make the case for that exact role.']); return; }
    block(['<span class="am"># tailoring the case for:</span> '+esc(role.slice(0,120))]);
    var q='A hiring manager is hiring for: "'+role+'". In 3-4 punchy sentences, make the SPECIFIC case for why Bill Bricker fits THAT role, grounded only in his real record (closed Google as a partner in year one; led Dreamship to $35M+ peak revenue and 11x; ships production AI solo — VibeCo, 40+ apps across 31 repos, Pickle DaaS at $0.0054/clip; 20 years carrying an enterprise number). Address the role directly; be concrete and confident; no generic filler.';
    askQuiet(q, function(){ // local fallback
      typed('For '+role.slice(0,80)+': you need someone who can close the room AND ship the product. I closed Google as a partner in year one, turned it into $35M+ peak revenue and 11x at Dreamship, and today I build production AI solo — 40+ apps across 31 repos. That\'s the forward-deployed seam most teams can\'t hire for. Let\'s talk this week.');
      suggest(['reference-check','why-you','contact']);
    }, function(){ suggest(['reference-check','why-you','contact']); });
  }

  function localAnswer(q){ var s=q.toLowerCase();
    if(/google/.test(s)) return CMDS['google-deal'];
    if(/why|better|over|hire|fde|forward|fit/.test(s)) return CMDS['why-you'];
    if(/dreamship|\$35|11x|revenue|courtana|court|company|companies/.test(s)) return CMDS.companies;
    if(/build|app|vibe|ship|repo|code|solo/.test(s)) return CMDS.builds;
    if(/data|clip|pickle|warehouse|video|vision|cost/.test(s)) return CMDS['pickle-daas'];
    if(/sell|sale|gtm|quota|ibm|enterprise|partner/.test(s)) return CMDS.enterprise;
    if(/cancer|chemo|health|climb|walk|story/.test(s)) return function(){ block(['Diagnosed 2023; operated through chemo into 2025 — the pipeline never stopped. <span class="a" data-href="../climb.html">walk the climb →</span>']); };
    if(/kid|child|family|father|three|dad/.test(s)) return function(){ block(['Father of three. They are completely unimpressed by all of it.']); };
    if(/dj|billygoat|music/.test(s)) return CMDS.billygoat;
    if(/contact|email|reach|talk|available|role|job/.test(s)) return CMDS.contact;
    if(/who|about/.test(s)) return CMDS.whoami;
    return null; }

  var ASK_URL='https://ulgoahsxkrkzoquvntei.supabase.co/functions/v1/ask-bill';
  function ask(q, quiet){ askQuiet(q, function(){ // standard fallback
      if(quiet) return; var f=localAnswer(q); if(f) f(); else block(['<span class="dim">live answer unavailable — try:</span> <span class="m">companies · google-deal · builds · stats</span>']); }); }
  function askQuiet(q, onFail, onOk){
    var thinking=el('<span class="dim">thinking…</span>','blk'); out.appendChild(thinking); scroll();
    var done=false, ctrl=('AbortController' in window)?new AbortController():null;
    var to=setTimeout(function(){ if(ctrl)ctrl.abort(); },18000);
    fetch(ASK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,history:history.slice(-6)}),signal:ctrl?ctrl.signal:undefined})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){ clearTimeout(to); done=true; thinking.remove();
        var a=d.answer||d.response||d.text||d.message;
        if(a){ history.push({role:'assistant',content:a}); typed(String(a)); if(onOk) onOk(); } else if(onFail) onFail(); })
      .catch(function(){ clearTimeout(to); if(done) return; thinking.remove(); if(onFail) onFail(); });
  }
  function typed(text){ var b=document.createElement('div'); b.className='blk'; out.appendChild(b);
    var lines=text.split(/\n+/);
    if(reduce){ b.innerHTML=lines.map(function(l){return '<div class="ln">'+esc(l)+'</div>';}).join(''); scroll(); return; }
    var speed = reduce ? 0 : 9, pause = reduce ? 0 : 80;
    var li=0; (function nl(){ if(li>=lines.length) return; var d=document.createElement('div'); d.className='ln'; b.appendChild(d);
      var t=lines[li], ci=0; var iv=setInterval(function(){ d.textContent=t.slice(0,ci++); scroll();
        if(ci>t.length){ clearInterval(iv); li++; setTimeout(nl,pause); } },speed); })(); }

  function chuck(){ var t=el('<span class="dim">fetching…</span>','blk'); out.appendChild(t); scroll();
    fetch('https://api.chucknorris.io/jokes/random').then(function(r){return r.json();}).then(function(d){
      t.remove(); block(['<span class="m"># fact:</span> '+esc(String(d.value||'').replace(/Chuck Norris/g,'Bill Bricker'))]);
    }).catch(function(){ t.remove(); block(['<span class="m"># fact:</span> Bill Bricker closed Google as a partner before his startup turned one. (API\'s napping; this one\'s true.)']); }); }

  function rel(iso){ var s=(Date.now()-new Date(iso).getTime())/1000;
    if(s<3600) return Math.max(1,Math.round(s/60))+'m ago'; if(s<86400) return Math.round(s/3600)+'h ago'; return Math.round(s/86400)+'d ago'; }
  function shipped(){ var t=el('<span class="dim">pulling recent commits…</span>','blk'); out.appendChild(t); scroll();
    fetch('https://api.github.com/users/picklebill/events/public?per_page=30').then(function(r){ if(!r.ok)throw 0; return r.json(); }).then(function(ev){
      t.remove(); var ps=ev.filter(function(e){return e.type==='PushEvent';}).slice(0,5); if(!ps.length) throw 0;
      var L=['<span class="m"># still building — recent public commits:</span>'];
      ps.forEach(function(p){ var repo=p.repo.name.split('/').pop(); var msg=((p.payload&&p.payload.commits&&p.payload.commits[0]&&p.payload.commits[0].message)||'').split('\n')[0].slice(0,44);
        L.push('<span class="dim">'+rel(p.created_at)+'</span>  <span class="m">'+esc(repo)+'</span>  '+esc(msg)); });
      L.push('<span class="dim">…live from github.com/picklebill — the build has a heartbeat.</span>'); block(L);
    }).catch(function(){ t.remove(); block(['<span class="m"># still building.</span> 40+ apps across 31 repos, shipped solo — VibeCo, Pickle DaaS, and whatever I touched today.']); }); }

  function run(raw){ var cmd=(raw||'').trim(); if(!cmd) return; echo(cmd); history.push({role:'user',content:cmd});
    var lc=cmd.toLowerCase(); var am=lc.match(/^ask\s+(.+)/); if(am){ ask(am[1]); return; }
    var tm=cmd.match(/^tailor\s+([\s\S]+)/i); if(tm){ tailor(tm[1]); return; }
    if(lc==='tailor'){ tailor(''); return; }
    if(/^(i'?m\s+hiring|we'?re\s+hiring|hiring\s+for|paste.*jd|here'?s?\s+the\s+jd)/.test(lc)){ tailor(cmd); return; }
    if(CMDS[lc]){ CMDS[lc](); return; }
    if(lc==='git'||lc==='gitlog'){ CMDS['git log'](); return; }
    if(lc==='ls'){ CMDS.help(); return; }
    if(/hire.?bill|^sudo/.test(lc)){ CMDS['hire-bill'](); return; }
    if(lc==='climb'||lc==='story'){ block(['Twenty years, one climb. <span class="a" data-href="../climb.html">→ walk it</span>']); return; }
    ask(cmd); }

  out && out.addEventListener('click', function(e){
    var a=e.target.closest('[data-href]'); if(a){ var u=a.dataset.href; if(u.indexOf('http')===0) window.open(u,'_blank','noopener'); else location.href=u; return; }
    var r=e.target.closest('[data-run]'); if(r){ run(r.dataset.run); if(input) input.focus(); } });

  /* boot */
  function showInput(){ if(line){ line.style.display='flex'; scroll(); } }
  function boot(after){ var ls=[
      {t:'brick.os — AI-forward sales console. booting…',c:'dim'},
      {t:'Bill Bricker — I close what the biggest names in tech say yes to.',c:'m'},
      {t:'Closed & ran the Google partnership in year one.',c:''},
      {t:'Now shipping production AI daily. 40+ apps, solo. Ask me anything.',c:''}];
    echo('whoami');
    var speed = reduce ? 0 : 11, pause = reduce ? 0 : 120;
    var b=document.createElement('div'); b.className='blk'; out.appendChild(b); var i=0;
    (function nl(){ if(i>=ls.length){ if(after)after(); return; } var l=ls[i], d=document.createElement('div'); d.className='ln'+(l.c?' '+l.c:''); b.appendChild(d); var ci=0;
      var iv=setInterval(function(){ d.textContent=l.t.slice(0,ci++); scroll(); if(ci>l.t.length){ clearInterval(iv); i++; setTimeout(nl,pause); } },speed); })(); }
  function bootCheck(){ if(booted) return; var term=$('#term'); if(!term) return; var r=term.getBoundingClientRect(), vh=innerHeight||800;
    if(r.top<vh*0.9 && r.bottom>0){ booted=true; boot(function(){ showInput(); }); removeEventListener('scroll',bootCheck); removeEventListener('resize',bootCheck); } }
  if('IntersectionObserver' in window){ var _t=$('#term'); if(_t){ var _io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && !booted){ booted=true; boot(function(){ showInput(); }); _io.disconnect(); } }); },{rootMargin:'0px 0px -8% 0px'}); _io.observe(_t); } }
  bootCheck(); addEventListener('scroll',bootCheck,{passive:true}); addEventListener('resize',bootCheck,{passive:true}); addEventListener('load',bootCheck);
  if(input){ input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ var v=input.value; input.value=''; run(v); } }); }
  if(chips){ chips.addEventListener('click',function(e){ var b=e.target.closest('.chip[data-cmd]'); if(!b) return;
    if(!booted){ booted=true; boot(function(){ showInput(); }); } run(b.dataset.cmd); showInput(); if(input) input.focus(); }); }

  /* ---------- video: autoplay in view + cycling glow stat badges ---------- */
  var vid=$('#cvid'), vw=$('#vidwrap');
  if(vw){
    var badges=[].slice.call(vw.querySelectorAll('.statbadge')), started=false, idx=0, bt=null;
    function cycleBadges(){ bt=setInterval(function(){
      badges[idx % badges.length].classList.add('show');
      badges[(idx + badges.length - 2) % badges.length].classList.remove('show');
      idx++; }, 1500); }
    function vCheck(){ var r=vw.getBoundingClientRect(), vh=innerHeight||800, inView=r.top<vh*0.85 && r.bottom>0;
      if(inView){ if(!started){ started=true; if(reduce){ badges.forEach(function(b){ b.classList.add('show'); }); } else { cycleBadges(); } }
        if(vid && !reduce){ var p=vid.play(); if(p&&p.catch) p.catch(function(){}); } }
      else if(vid){ vid.pause(); } }
    vCheck(); addEventListener('scroll',vCheck,{passive:true}); addEventListener('load',vCheck);
  }

  /* ---------- builds rail arrows ---------- */
  (function(){ var rail=$('#rail'); if(!rail) return; var prev=$('#railPrev'), next=$('#railNext');
    function by(d){ rail.scrollBy({left:d*Math.min(rail.clientWidth*0.82, 580), behavior:reduce?'auto':'smooth'}); }
    if(prev) prev.addEventListener('click', function(){ by(-1); });
    if(next) next.addEventListener('click', function(){ by(1); });
  })();

  /* terminal command rows: manual scroll only (auto-scroll "wheels" removed — felt janky) */

  /* ---------- VibeCo panels: swap to a motion preview on hover (seam) ---------- */
  (function(){ [].slice.call(document.querySelectorAll('.vpanel[data-gif]')).forEach(function(p){
      var gif=p.getAttribute('data-gif'); if(!gif) return; var img=p.querySelector('img'); if(!img) return; var still=img.getAttribute('src');
      p.addEventListener('pointerenter',function(){ img.src=gif; });
      p.addEventListener('pointerleave',function(){ img.src=still; });
    }); })();

  /* ---------- scroll-spy ---------- */
  var spy=$('#spy');
  if(spy){ var links=[].slice.call(spy.querySelectorAll('a')), secs=links.map(function(a){ return document.getElementById(a.dataset.s); });
    function spyCheck(){ var y=scrollY+(innerHeight||800)*0.3, best=0;
      secs.forEach(function(s,i){ if(s && s.offsetTop<=y) best=i; });
      links.forEach(function(a,i){ a.classList.toggle('on',i===best); }); }
    spyCheck(); addEventListener('scroll',spyCheck,{passive:true}); addEventListener('resize',spyCheck); }

  /* ---------- konami → billygoat ---------- */
  (function(){ var seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'], i=0;
    addEventListener('keydown',function(e){ var k=e.key.length===1?e.key.toLowerCase():e.key; i=(k===seq[i])?i+1:(k===seq[0]?1:0);
      if(i===seq.length){ i=0; if(!booted){ booted=true; boot(function(){ showInput(); }); } var t=$('#term'); if(t) t.scrollIntoView({block:'center'});
        echo('↑↑↓↓←→←→ba'); CMDS.billygoat(); } }); })();
})();
