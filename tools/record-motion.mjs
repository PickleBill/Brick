#!/usr/bin/env node
/**
 * record-motion.mjs — capture a short WebM clip of an on-page interaction so it can be watched.
 *
 *   node tools/record-motion.mjs index.html --scene hero-card --tag before
 *   node tools/record-motion.mjs index.html --scene video
 *   node tools/record-motion.mjs climb.html --scene climb --vp mobile
 *
 * Motion is ON (no reduced-motion) so animations actually play. Output: tools/videos/<name>.<scene>[.<tag>].webm
 * Scenes are scripted action sequences; update selectors here as markup evolves.
 */
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { mkdirSync, renameSync, statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(__dirname, 'videos');
mkdirSync(outDir, { recursive: true });

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
if (!target) { console.error('usage: node tools/record-motion.mjs <path> [--scene <name>] [--vp desktop|mobile] [--tag <label>]'); process.exit(1); }
const getArg = (f, d) => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : d; };
const sceneName = getArg('--scene', basename(target).replace(/\.[^.]+$/, ''));
const vp = getArg('--vp', 'desktop');
const tag = getArg('--tag', '');
const url = /^https?:\/\//.test(target) ? target : pathToFileURL(resolve(root, target)).href;
const name = basename(target).replace(/\.[^.]+$/, '') || 'page';

const VPS = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } };
const viewport = VPS[vp] || VPS.desktop;

const sleep = (p, ms) => p.waitForTimeout(ms);
const into = (p, sel, block = 'center') => p.evaluate(([s, b]) => { const el = document.querySelector(s); if (el) el.scrollIntoView({ block: b, behavior: 'instant' }); }, [sel, block]).catch(() => {});
const hover = (p, sel) => p.hover(sel, { timeout: 2500 }).catch(() => {});
const click = (p, sel) => p.click(sel, { timeout: 2500 }).catch(() => {});

// Scene library — each is async (page) => void. Keep clips ~4–8s.
const SCENES = {
  'hero-card': async (p) => {           // the identity flip card (Main)
    const box = await p.evaluate(() => { const el = document.querySelector('#flip'); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
    const pt = (fx, fy) => box ? p.mouse.move(box.x + box.w * fx, box.y + box.h * fy, { steps: 10 }) : Promise.resolve();
    await sleep(p, 800);
    await pt(0.22, 0.2); await sleep(p, 420); await pt(0.8, 0.28); await sleep(p, 420); await pt(0.5, 0.78); await sleep(p, 520); // tilt sweep (front)
    await click(p, '#flip'); await sleep(p, 1700);   // cinematic flip + light sweep
    await pt(0.3, 0.4); await sleep(p, 420); await pt(0.74, 0.68); await sleep(p, 540);                                          // tilt on back
    await click(p, '#flip'); await sleep(p, 1300);   // flip to front
    await hover(p, '#bars .bar'); await sleep(p, 800);
  },
  video: async (p) => {                  // featured video centerpiece (Main)
    await into(p, '#vidwrap', 'center'); await sleep(p, 6800);  // entrance FX (sheen + scan + reticle lock-on) then Ken-Burns drift
  },
  hovers: async (p) => {                 // opco + constellation hovers (Main)
    await into(p, '#builds', 'start'); await sleep(p, 600);
    await hover(p, '.opco-grid .opco:nth-child(1)'); await sleep(p, 1100);
    await hover(p, '.opco-grid .opco:nth-child(2)'); await sleep(p, 1100);
    await into(p, '#names', 'center'); await sleep(p, 700);
    await hover(p, '.constel-logos .star:nth-child(3)'); await sleep(p, 700);
    await hover(p, '.constel-logos .star:nth-child(6)'); await sleep(p, 900);
  },
  scroll: async (p) => {                 // full scroll-through reveal (any page)
    for (let y = 0; y < 6; y++) { await p.evaluate((n) => window.scrollTo({ top: n * window.innerHeight * 0.9, behavior: 'smooth' }), y); await sleep(p, 950); }
  },
  climb: async (p) => {                  // climb map seals + a card open (Story)
    await sleep(p, 1200);
    await hover(p, '.node .seal'); await sleep(p, 900);
    await click(p, '.node .seal'); await sleep(p, 1600);   // open field-note card
  },
  'lab-flip': async (p) => {             // card-lab concept 1: cinematic flip + tilt
    await into(p, '#flip', 'center'); await sleep(p, 700);
    const b = await p.evaluate(() => { const e = document.querySelector('#flip'); const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
    const pt = (fx, fy) => p.mouse.move(b.x + b.w * fx, b.y + b.h * fy, { steps: 10 });
    await pt(0.25, 0.25); await sleep(p, 420); await pt(0.78, 0.34); await sleep(p, 460);
    await click(p, '#flip'); await sleep(p, 1700);
    await pt(0.4, 0.62); await sleep(p, 520);
    await click(p, '#flip'); await sleep(p, 1100);
  },
  'lab-holo': async (p) => {             // card-lab concept 2: hologram tilt/parallax
    await into(p, '#holo', 'center'); await sleep(p, 700);
    const b = await p.evaluate(() => { const e = document.querySelector('#holo'); const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
    const pt = (fx, fy) => p.mouse.move(b.x + b.w * fx, b.y + b.h * fy, { steps: 12 });
    await pt(0.2, 0.2); await sleep(p, 480); await pt(0.85, 0.25); await sleep(p, 480); await pt(0.82, 0.8); await sleep(p, 480); await pt(0.2, 0.78); await sleep(p, 480); await pt(0.5, 0.5); await sleep(p, 520);
  },
  'lab-boot': async (p) => {             // card-lab concept 3: terminal-boot reveal
    await into(p, '#boot', 'center'); await sleep(p, 3000);  // auto-boot
    await click(p, '#boot'); await sleep(p, 3000);           // re-boot on tap
  },
};

const scene = SCENES[sceneName] || SCENES.scroll;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport, recordVideo: { dir: outDir, size: viewport }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
const page = await ctx.newPage();
try { await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 }); }
catch { await page.goto(url, { waitUntil: 'load', timeout: 20000 }).catch(() => {}); }
await sleep(page, 500);
await scene(page);
const video = page.video();
await ctx.close();                       // finalizes the .webm
await browser.close();

const suffix = tag ? `.${tag}` : '';
const dest = resolve(outDir, `${name}.${sceneName}${suffix}.webm`);
const src = await video.path();
renameSync(src, dest);
const kb = (statSync(dest).size / 1024).toFixed(0);
console.log(`✓ ${sceneName.padEnd(10)} ${vp.padEnd(7)} ${kb}KB  →  ${dest}`);
