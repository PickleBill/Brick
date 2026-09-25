#!/usr/bin/env node
/**
 * factcheck.mjs: the fact-consistency checker (CLAUDE.md: "the one automation worth building").
 *
 * Scans every .html / .js / .json file that GitHub Pages publishes against the Tier A guardrails
 * in _source/facts.md and the GATE in _source/grader.md. "What Pages publishes" is read straight
 * from the rsync --exclude lines in .github/workflows/pages.yml, plus the corpus files that
 * content/index.json lists (the staging step re-adds those for the ask-bill backend), so the two
 * can't drift apart.
 *
 *   node tools/factcheck.mjs            # scan, exit 1 on any error      (npm run factcheck)
 *   node tools/factcheck.mjs --links    # also fetch every external https link on live surfaces
 *                                       #                                (npm run factcheck:links)
 *
 * Behind a proxy (e.g. the Claude Code sandbox) Node's fetch only honours HTTPS_PROXY when
 * NODE_USE_ENV_PROXY=1. The factcheck:links npm script sets it; set it yourself if you call node
 * directly.
 *
 * Severity
 *   error, everywhere        phone number or tel: link · the Courtana raise amount ·
 *                            "11 sports" / "11+ sports" · "sub-one-year"
 *   error on live surfaces,  VP-level / director-level Google sign-off · "8-fig" on the Google
 *   warning in archive/, v3/ channel · $45M read as revenue · courtana.com links ·
 *                            assets/shots/courtana.png · résumé links that aren't resume/ or the
 *                            2026-09 PDF · Courtana framed as live / current
 *   warning                  fuzzy calls worth a human look; they never fail the build
 *
 * Output: `file:line: error|warning: message [rule]`, then a one-line summary.
 * Private values (the raise amount, phone digits) are never echoed: CI logs on a public repo are
 * public. Zero dependencies, Node 22+.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LINKS = process.argv.includes('--links');
const SCAN_EXT = /\.(html?|m?js|json)$/i;
const SITE = 'https://picklebill.github.io/Brick/';

// ─── 1. The publish set (mirrors the "Stage public site" step in pages.yml) ──────────────────────
const FALLBACK_EXCLUDES = [
  '/_site', '.git', '/.github', 'node_modules', '/_source', '/.claude', '/.impeccable', '/handoffs',
  '/design-refs', '/tools', '/source', '/content/stories', '/content/FACTS.md', '/HANDOFF.md',
  '/BUILD-LOG.md', '/PLAN.md', '/ROADMAP.md', '/INTERVIEW.md', '/PRODUCT.md', '/DESIGN.md',
  '/CLAUDE.md', '/README.md', '/package.json', '/package-lock.json', '/skills-lock.json',
  '/v3/RESEARCH.md',
];
const notes = [];

function readExcludes() {
  const wf = join(ROOT, '.github/workflows/pages.yml');
  if (existsSync(wf)) {
    const pats = [...readFileSync(wf, 'utf8').matchAll(/--exclude=(?:'([^']+)'|"([^"]+)"|([^\s\\]+))/g)]
      .map((m) => m[1] ?? m[2] ?? m[3]);
    if (pats.length) return pats;
  }
  notes.push('pages.yml has no rsync --exclude lines; using the built-in publish rules');
  return FALLBACK_EXCLUDES;
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// rsync semantics for the patterns we use: a leading "/" anchors to the site root, otherwise the
// pattern matches any path component(s); "*" matches within one component.
function rsyncMatcher(pat) {
  const anchored = pat.startsWith('/');
  const body = pat.replace(/^\/|\/$/g, '').split('*').map(escRe).join('[^/]*');
  const re = new RegExp(`${anchored ? '^' : '(?:^|/)'}${body}(?:/|$)`);
  return (rel) => re.test(rel);
}

function publishSet() {
  const matchers = readExcludes().map(rsyncMatcher);
  const excluded = (rel) => matchers.some((m) => m(rel));
  const out = new Set();
  (function walk(dir) {
    for (const ent of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      const rel = dir ? `${dir}/${ent.name}` : ent.name;
      if (ent.name === '.git' || excluded(rel)) continue;
      if (ent.isDirectory()) walk(rel);
      else if (ent.isFile()) out.add(rel);
    }
  })('');
  // The ask-bill edge function fetches content/index.json from Pages, then every file it lists.
  try {
    const manifest = JSON.parse(readFileSync(join(ROOT, 'content/index.json'), 'utf8'));
    for (const f of manifest.files || []) {
      if (typeof f !== 'string' || f.startsWith('/') || f.split('/').includes('..')) continue;
      if (existsSync(join(ROOT, f))) out.add(f);
      else notes.push(`content/index.json lists ${f}, which doesn't exist`);
    }
  } catch { /* no manifest: nothing to re-add */ }
  return [...out].sort();
}

// Ledger-approved $NNNK figures (e.g. Dreamship's early lean funding) are allowed next to
// "funding" wording. Lines about the private raise are never harvested.
function ledgerKFigures() {
  const ok = new Set();
  const f = join(ROOT, '_source/facts.md');
  if (!existsSync(f)) return ok;
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    if (/private|courtana|rais/i.test(line)) continue;
    for (const m of line.matchAll(/\$\s?(\d{3})\s?K\b/gi)) ok.add(m[1]);
  }
  return ok;
}

// ─── 2. Text normalisation ───────────────────────────────────────────────────────────────────────
const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', middot: '·', bull: '•', mdash: '—',
  ndash: '–', rarr: '→', larr: '←', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”',
  ne: '≠', times: '×', eacute: 'é', plus: '+', dollar: '$', num: '#', colon: ':', period: '.',
  comma: ',', sol: '/', hyphen: '-', minus: '−', thinsp: ' ', ensp: ' ', emsp: ' ', shy: '',
  zwj: '', zwnj: '', copy: '©', trade: '™', reg: '®',
};
const fromCp = (hex, m) => { try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return m; } };
const decodeEntities = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
  if (e[0] === '#') return e[1] === 'x' || e[1] === 'X' ? fromCp(e.slice(2), m) : fromCp(Number(e.slice(1)).toString(16), m);
  return NAMED[e.toLowerCase()] ?? m;
});
const decodeJs = (s) => s
  .replace(/\\u\{([0-9a-f]+)\}|\\u([0-9a-f]{4})|\\x([0-9a-f]{2})/gi, (m, a, b, c) => fromCp(a || b || c, m))
  .replace(/\\(["'`\\/])/g, '$1')
  .replace(/\\[nrt]/g, ' ');
const norm = (s) => decodeJs(decodeEntities(s));

// Flatten a file into readable text. Block-level tags, <br>, and (inside scripts / JS / JSON)
// newlines become hard boundaries (B), so proximity rules never pair words from separate
// elements or separate strings. Text-bearing attributes (meta content, alt, title, aria-label,
// data-*) are kept as text.
const B = '\uE000';
const INLINE = new Set('a abbr b bdi bdo cite code data del dfn em font i ins kbd mark q s samp small span strong sub sup time u var wbr'.split(' '));
const TEXT_ATTRS = /\b(?:content|alt|title|aria-label|placeholder|value|data-[\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
const HTML_TOKEN = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|\n/g;
const SCRIPT_TOKEN = /<\/?([a-zA-Z][\w-]*)((?:\s[^<>\n]*)?)\/?>|\n/g;

function flatten(raw, jsFile) {
  let out = '';
  const cps = []; // [outOffset, line]
  let line = 1, pos = 0, inScript = jsFile;
  const emit = (s, ln) => {
    s = s.replace(/[ \t\r\f\v\u00A0\u2028\u2029]+/g, ' ');
    if (!s) return;
    if (s[0] === ' ' && (!out || out.endsWith(' ') || out.endsWith(B))) s = s.slice(1);
    if (!s) return;
    cps.push([out.length, ln]);
    out += s;
  };
  while (pos < raw.length) {
    const re = inScript ? SCRIPT_TOKEN : HTML_TOKEN;
    re.lastIndex = pos;
    const m = re.exec(raw);
    const end = m ? m.index : raw.length;
    if (end > pos) emit(inScript ? decodeJs(decodeEntities(raw.slice(pos, end))) : decodeEntities(raw.slice(pos, end)), line);
    if (!m) break;
    pos = re.lastIndex;
    const tok = m[0];
    if (tok === '\n') { emit(inScript ? B : ' ', line); line++; continue; }
    const at = line;
    line += (tok.match(/\n/g) || []).length;
    if (tok.startsWith('<!--')) { emit(' ', at); continue; }
    const name = m[1].toLowerCase();
    if (name === 'script' || name === 'style') { inScript = jsFile || tok[1] !== '/'; emit(B, at); continue; }
    const vals = [...(m[2] || '').matchAll(TEXT_ATTRS)].map((a) => decodeEntities(a[1] ?? a[2])).join(' ');
    emit(INLINE.has(name) ? ` ${vals} ` : `${B}${vals}${B}`, at);
  }
  const lineOf = (off) => {
    let lo = 0, hi = cps.length - 1, ln = 1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (cps[mid][0] <= off) { ln = cps[mid][1]; lo = mid + 1; } else hi = mid - 1; }
    return ln;
  };
  const segs = [];
  let start = 0;
  for (let i = 0; i <= out.length; i++) {
    if (i === out.length || out[i] === B) { if (i > start) segs.push({ text: out.slice(start, i), off: start }); start = i + 1; }
  }
  return { segs, lineOf };
}

// Quoted context for a finding. $NNNK figures and phone-shaped digits are masked so a snippet can
// never echo a private value into a public CI log.
const clip = (s, a, b, pad = 28) => {
  const t = s.slice(Math.max(0, a - pad), Math.min(s.length, b + pad)).replace(/\s+/g, ' ').trim()
    .replace(/\$\s?\d{3}(?:\s?[Kk]\b|,000\b)/g, '$•••K')
    .replace(/\d{3}(?:\s*[-.·•)]\s*|\s)\d{3}(?:\s*[-.·•]\s*|\s)\d{4}/g, '•••-•••-••••');
  return `“${a - pad > 0 ? '…' : ''}${t}${b + pad < s.length ? '…' : ''}”`;
};

// ─── 3. Rules ────────────────────────────────────────────────────────────────────────────────────
const findings = [];
const seen = new Set();
function report(file, line, sev, rule, msg, key = msg) {
  const k = `${file}:${line}:${rule}:${key}`;
  if (seen.has(k)) return;
  seen.add(k);
  findings.push({ file, line, sev, rule, msg });
}

// Tier A (error everywhere)
const TEL = /\btel:/i;
const GEOMETRY_ATTRS = /\b(?:d|points|viewBox|transform)\s*=\s*(?:"[^"]*"|'[^']*')/gi;
const PHONE = /(?<![\w$.,/#:-])(?:\+?1[\s.-]?)?(?:\(\s*[2-9]\d{2}\s*\)|[2-9]\d{2})(?:\s*[-.·•]\s*|\s)[2-9]\d{2}(?:\s*[-.·•]\s*|\s)\d{4}(?![\w-]|\.\d)/;
const PHONE_PLUS = /\+1\d{10}\b/;
const AMOUNT = /\$\s?(\d{3})(?:\s?[Kk]\b|,000\b)|\$\s?0?\.\d{1,2}\s?M\b/g;
const RAISE_CTX = /\b(?:rais(?:e|ed|es|ing)|fund(?:ing|ed|raise|raising)?|seed|pre-seed|investors?|backed|round|courtana)\b/i;
const SPORTS = /\b(?:11|eleven)\s*\+?(?:\s|<[^>]*>|&nbsp;)*sports?\b/gi;
const SUB_ONE = /\bsub[-\s\u2011]?(?:one|1)[-\s\u2011]?year\b|(?:&lt;|<)\s?1[-\s]?(?:yr|year)[-\s]?old\b/i;

// Live-surface rules
const VP_LEVEL = /\b(?:VP|vice[-\s]president|director)[-\s]level\b/gi;
const VP_SIGNOFF = /\b(?:VP|director)(?:[-\s]level)?\s+sign[-\s]?off\b/gi;
const VP_CTX = /google|sign[-\s]?off|signoff|approv/i;
const EIGHT = /\b(?:8|eight)[-\s]?fig(?:ure)?s?\b/gi;
const EIGHT_CTX = /google|channel/i;
const FORTY5 = /\$\s?45(?:\.\d)?\s?(?:M\b|million\b)\+?/gi;
const REVENUE = /\brevenue\b/gi;
const NEGATION = /(?:\bnot\b|\bnever\b|\bno\b|\bisn['’]?t\b|\bwasn['’]?t\b|\brather than\b|\binstead of\b|\bvs\.?|\bversus\b|≠|!=)[^$]{0,25}$/i;
const MONEY = /\$\s?\d/;
const AD_SPEND = /ad[-\s]?spend|advertis/i;
const CT_LINK = /(?:href|src|action)\s*=\s*["']?[^"'\s>]*courtana\.com|https?:\/\/(?:[\w-]+\.)*courtana\.com|["'`](?:\/\/)?(?:www\.)?courtana\.com\b/i;
const CT_TEXT = /\bcourtana\.com\b/i;
const CT_SHOT = /shots\/courtana\.png/i;

// Courtana framed as live / current (F-4). Checked per sentence that names Courtana.
const COURTANA = /\bcourtana\b/gi;
const LIVE_STRONG = [
  [/\bLIVE\b/g, 'LIVE badge'],
  [/\bnow[-\s]shipping\b/gi, '"now shipping"'],
  [/\b(?:19|20)\d{2}\s*(?:[-–—→]|->|to)\s*(?:present|now|today|current)\b/gi, 'date range to present'],
  [/\b(?:is|are|went|goes|still)\s+live\b/gi, '"is live"'],
  [/\blive\s+(?:across|at|in|on|with)\b/gi, '"live across/at/in"'],
  [/\b(?:courts|venues|users)\s*[·,:]?\s*live\b(?![-\s](?:video|stream))/gi, '"courts live"'],
  [/\blive\s+(?:venues?|courts?|customers?|pilots?)\b/gi, '"live venues/courts"'],
  [/\bcurrently\s+(?:building|running|shipping|live|scaling|operating|leading|at)\b/gi, '"currently building"'],
  [/\b(?:now|today),?\s+(?:I['’]m\s+|I\s+am\s+)?(?:the\s+)?(?:co-?founder|founder|ceo|building|running|scaling)\b/gi, '"now founder / building"'],
];
const LIVE_WORD = /\blive\b/gi;
const LIVE_OK = /^live\s+(?:dashboards?|demo|links?|site|terminal|llm|backend|endpoint|preview|url|apps?|ai)\b/i;
const LIVE_FEATURE = /^live[-\s](?:video|stream(?:ing|ed)?|scor(?:e|ing)|feed|replay|highlights?|data|capture)\b/i;
const CURRENTLY = /\bcurrently\b/gi;
const FUZZY_NOW = /\b(?:now|present|today|scaling)\b/gi;
const FAILURE = /\b(?:shut(?:ting)?\s+down|shutdown|closed\s+down|went\s+under|defunct|failed|wound\s+down|winding\s+down|sunset(?:ted|ting)?)\b/gi;

// Résumé links
const RESUME_WORD = /r(?:e|é|%c3%a9)sum(?:e|é|%c3%a9)/i;
const RESUME_OK = new Set(['resume', 'resume/', 'resume/index.html', 'assets/Bill_Bricker_Resume_2026-09.pdf']);
const looksLikePath = (v) => !/\s/.test(v) && (v.includes('/') || /\.(?:html?|pdf)(?:[?#]|$)/i.test(v));

function resolveSite(fromFile, v) {
  let u = v.replace(/[?#].*$/, '');
  if (/^https?:\/\//i.test(u)) {
    if (!u.toLowerCase().startsWith(SITE.toLowerCase())) return { external: true, path: v };
    u = u.slice(SITE.length);
  } else if (u.startsWith('//')) return { external: true, path: v };
  else if (u.startsWith('/Brick/')) u = u.slice('/Brick/'.length);
  else if (u.startsWith('/')) u = u.slice(1);
  else u = posix.normalize(posix.join(posix.dirname(fromFile), u));
  try { u = decodeURI(u); } catch { /* keep as is */ }
  return { external: false, path: u.replace(/^\.\//, '') };
}

function resumeRefs(line) {
  const refs = [];
  for (const m of line.matchAll(/(["'`])([^"'`\s<>]+?)\1/g)) refs.push(m[2]);
  for (const m of line.matchAll(/\b(?:href|src|action)=([^\s"'`>]+)/gi)) refs.push(m[1]);
  for (const m of line.matchAll(/\burl=([^"'\s;>]+)/gi)) refs.push(m[1]);
  return refs.filter((v) => RESUME_WORD.test(v) && looksLikePath(v) && !/^(?:#|mailto:|javascript:|tel:)/i.test(v));
}

function scanFile(file, allowK) {
  const raw = readFileSync(join(ROOT, file), 'utf8');
  const live = !/^(?:archive|v3)\//.test(file);
  const scoped = live ? 'error' : 'warning';
  const jsFile = /\.(?:m?js|json)$/i.test(file);
  const lines = raw.split('\n');
  const normLines = lines.map(norm);

  // ── line-based rules (raw text, attributes included) ──
  lines.forEach((rawLine, i) => {
    const ln = i + 1;
    const n = normLines[i];

    if (TEL.test(n)) report(file, ln, 'error', 'phone', 'phone link (tel:). No phone on any public surface');
    const geo = n.replace(GEOMETRY_ATTRS, '');
    if (PHONE.test(geo) || PHONE_PLUS.test(geo)) report(file, ln, 'error', 'phone', 'phone number (digits withheld). No phone on any public surface');

    for (const m of n.matchAll(AMOUNT)) {
      if (m[1] && allowK.has(m[1])) continue;
      const ctx = `${normLines[i - 1] || ''} ${n} ${normLines[i + 1] || ''}`;
      const at = (normLines[i - 1] || '').length + 1 + m.index;
      const around = ctx.slice(Math.max(0, at - 120), at + m[0].length + 120);
      if (RAISE_CTX.test(around)) report(file, ln, 'error', 'raise-amount', 'a $NNNK figure next to raise / funding / Courtana wording: the Courtana raise amount is private (value withheld)');
      else report(file, ln, 'warning', 'raise-amount', 'a $NNNK figure that isn\'t in _source/facts.md: make sure it isn\'t the Courtana raise amount (value withheld)');
    }

    const two = `${rawLine}\n${lines[i + 1] || ''}`;
    for (const m of two.matchAll(SPORTS)) {
      if (m.index <= rawLine.length) report(file, ln, 'error', '11-sports', '"11+ sports" is a Tier A never-render');
    }
    if (SUB_ONE.test(n)) report(file, ln, 'error', 'sub-one-year', '"sub-one-year-old" is banned: use "in year one" / "within its first year"');

    if (CT_LINK.test(n)) report(file, ln, scoped, 'courtana-link', 'links courtana.com, which is offline (F-4): use the Courtana video / work.html#courtana');
    else if (CT_TEXT.test(n)) report(file, ln, 'warning', 'courtana-link', 'mentions courtana.com (offline, F-4)');
    if (CT_SHOT.test(n)) report(file, ln, scoped, 'courtana-png', 'uses assets/shots/courtana.png (retired: the screenshot shows "11 sports")');

    for (const v of resumeRefs(n)) {
      const r = resolveSite(file, v);
      if (!r.external && (RESUME_OK.has(r.path) || r.path === file)) continue;
      report(file, ln, scoped, 'resume-link', `résumé link → ${v}: point it at resume/ (nav) or assets/Bill_Bricker_Resume_2026-09.pdf (download)`);
    }
    for (const m of n.matchAll(/<a\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/a>/gi)) {
      const text = m[2].replace(/<[^>]*>/g, ' ');
      const href = (m[1].match(/\bhref\s*=\s*["']([^"']*)["']/i) || [])[1];
      if (!href || !RESUME_WORD.test(text) || RESUME_WORD.test(href) || /^(?:#|mailto:|javascript:)/i.test(href)) continue;
      const r = resolveSite(file, href);
      if (!r.external && (RESUME_OK.has(r.path) || r.path === file)) continue;
      report(file, ln, 'warning', 'resume-link', `link labelled "Résumé" points at ${href}`);
    }
  });

  // ── text-based rules (flattened copy, per element / string) ──
  const { segs, lineOf } = flatten(raw, jsFile);
  for (const { text: s, off } of segs) {
    const L = (i) => lineOf(off + i);

    for (const m of s.matchAll(VP_LEVEL)) {
      const win = s.slice(Math.max(0, m.index - 80), m.index + m[0].length + 80);
      report(file, L(m.index), VP_CTX.test(win) ? scoped : 'warning', 'vp-level',
        `${clip(s, m.index, m.index + m[0].length)}: F-1 says five internal Google teams, no level claimed`, 'x');
    }
    for (const m of s.matchAll(VP_SIGNOFF)) {
      report(file, L(m.index), scoped, 'vp-level', `${clip(s, m.index, m.index + m[0].length)}: F-1 says five internal Google teams, no level claimed`, 'x');
    }

    for (const m of s.matchAll(EIGHT)) {
      const a = m.index, b = a + m[0].length;
      if (/mckesson/i.test(s.slice(Math.max(0, a - 25), b + 40))) continue;
      if (EIGHT_CTX.test(s.slice(Math.max(0, a - 60), b + 60))) {
        report(file, L(a), scoped, '8-fig', `${clip(s, a, b)}: "8-figure" is the McKesson deal; the Google channel is $45M+ ad spend`);
      }
    }

    for (const m of s.matchAll(FORTY5)) {
      const a = m.index, b = a + m[0].length;
      const win = s.slice(Math.max(0, a - 80), b + 80);
      if (/\bnot\s+(?:\w+\s+)?revenue\b/i.test(win)) continue;
      const labelled = AD_SPEND.test(s.slice(b, b + 30)) || AD_SPEND.test(s.slice(Math.max(0, a - 30), a));
      for (const r of s.matchAll(REVENUE)) {
        const ra = r.index, rb = ra + r[0].length;
        if (ra >= b) {
          if (ra - b > 80 || MONEY.test(s.slice(b, ra)) || NEGATION.test(s.slice(b, ra))) continue;
        } else {
          if (a - rb > 80 || MONEY.test(s.slice(Math.max(0, ra - 40), ra)) || MONEY.test(s.slice(rb, a))
            || NEGATION.test(s.slice(Math.max(0, ra - 30), ra))) continue;
        }
        report(file, L(a), labelled ? 'warning' : scoped, '45m-revenue',
          `${clip(s, Math.min(a, ra), Math.max(b, rb), 12)}: $45M+ is partner AD SPEND, never revenue${labelled ? ' (labelled ad spend, but "revenue" sits right next to it)' : ''}`);
        break;
      }
    }

    // Courtana framed as live / current: per sentence
    if (!/courtana/i.test(s)) continue;
    let sStart = 0;
    for (const sent of s.split(/(?<=[.!?])\s+/)) {
      const base = s.indexOf(sent, sStart);
      sStart = base + sent.length;
      const cts = [...sent.matchAll(COURTANA)].map((c) => c.index);
      if (!cts.length) continue;
      const near = (i, d) => cts.some((c) => Math.abs(c - i) <= d);
      const hit = (i, len, sev, why) => report(file, L(base + i), sev, 'courtana-live',
        `${clip(sent, i, i + len)}: ${why}. Courtana is past tense, about what was built (F-4)`, sev);
      let strong = false;
      for (const [re, why] of LIVE_STRONG) {
        for (const m of sent.matchAll(re)) { hit(m.index, m[0].length, scoped, `Courtana framed as live (${why})`); strong = true; }
      }
      if (!strong) {
        for (const m of sent.matchAll(LIVE_WORD)) {
          const rest = sent.slice(m.index);
          if (LIVE_OK.test(rest)) continue;
          if (LIVE_FEATURE.test(rest)) { if (near(m.index, 60)) hit(m.index, 4, 'warning', 'a "live …" product feature next to Courtana'); continue; }
          hit(m.index, 4, near(m.index, 40) ? scoped : 'warning', 'Courtana framed as live ("live")');
        }
        for (const m of sent.matchAll(CURRENTLY)) hit(m.index, m[0].length, near(m.index, 40) ? scoped : 'warning', 'Courtana framed as current ("currently")');
        for (const m of sent.matchAll(FUZZY_NOW)) if (near(m.index, 25)) hit(m.index, m[0].length, 'warning', `present-tense framing ("${m[0]}")`);
      }
      for (const m of sent.matchAll(FAILURE)) hit(m.index, m[0].length, 'warning', `failure framing ("${m[0]}"): don't over-emphasize the wind-down`);
    }
  }
}

// ─── 4. --links: every external https link on live surfaces ─────────────────────────────────────
async function checkLinks(files) {
  const urls = new Map(); // url -> { file, line, count }
  for (const file of files) {
    if (/^(?:archive|v3)\//.test(file)) continue;
    readFileSync(join(ROOT, file), 'utf8').split('\n').forEach((line, i) => {
      const preconnect = /rel=["']?(?:preconnect|dns-prefetch)/i.test(line);
      const found = [
        // quoted URLs, except prefixes that a script completes at runtime ("https://x/tag/" + id)
        ...[...line.matchAll(/["'`](https:\/\/[^"'`\s<>\\]+)["'`](?!\s*\+)/g)].map((m) => m[1]),
        ...[...line.matchAll(/\b(?:href|src|poster)=(https:\/\/[^\s"'`<>]+)/gi)].map((m) => m[1]),
      ];
      for (let u of found) {
        u = decodeEntities(u);
        if (/\$\{|\{\{/.test(u) || /\/functions\/v1\//.test(u)) continue; // templates; POST-only APIs
        if (preconnect && /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/?$/.test(u)) continue;
        const e = urls.get(u);
        if (e) e.count++; else urls.set(u, { file, line: i + 1, count: 1 });
      }
    });
  }
  const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 brick-factcheck';
  const list = [...urls.keys()];
  let next = 0;
  async function worker() {
    while (next < list.length) {
      const url = list[next++];
      const where = urls.get(url);
      const more = where.count > 1 ? ` (+${where.count - 1} more)` : '';
      let status, err;
      for (let attempt = 0; attempt < 2 && status === undefined; attempt++) { // one retry on network errors
        try {
          const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8' } });
          status = res.status;
          res.body?.cancel().catch(() => {});
        } catch (e) { err = e.cause?.code || e.cause?.message || e.message || String(e); }
      }
      if (status === undefined) report(where.file, where.line, 'error', 'dead-link', `${url} → ${err}${more}`);
      else if (status === 404 || status === 410 || (status >= 500 && status < 600)) report(where.file, where.line, 'error', 'dead-link', `${url} → HTTP ${status}${more}`);
      else if (status >= 400) report(where.file, where.line, 'warning', 'dead-link', `${url} → HTTP ${status} (bot wall or auth? check by hand)${more}`);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  return list.length;
}

// ─── 5. Run ──────────────────────────────────────────────────────────────────────────────────────
const published = publishSet();
const scanned = published.filter((f) => SCAN_EXT.test(f));
const allowK = ledgerKFigures();
for (const f of scanned) scanFile(f, allowK);
const linkCount = LINKS ? await checkLinks(scanned) : 0;

const rank = { error: 0, warning: 1 };
findings.sort((x, y) => rank[x.sev] - rank[y.sev] || x.file.localeCompare(y.file) || x.line - y.line);
for (const f of findings) console.log(`${f.file}:${f.line}: ${f.sev}: ${f.msg} [${f.rule}]`);
for (const n of notes) console.log(`note: ${n}`);

const errors = findings.filter((f) => f.sev === 'error').length;
const warnings = findings.length - errors;
const liveCount = scanned.filter((f) => !/^(?:archive|v3)\//.test(f)).length;
console.log(`factcheck: ${errors} error${errors === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'} `
  + `(${scanned.length} published files scanned: ${liveCount} live, ${scanned.length - liveCount} archive/v3`
  + `${LINKS ? `; ${linkCount} external links checked` : ''})`);
process.exit(errors ? 1 : 0);
