#!/usr/bin/env node
/**
 * shoot.mjs — render a local page to PNG at desktop + mobile for Rule 4 verification.
 *
 *   node tools/shoot.mjs sales/index.html
 *   node tools/shoot.mjs sales/index.html --tag before
 *   node tools/shoot.mjs index.html --motion        # allow animations (default: reduced)
 *
 * Emulates prefers-reduced-motion: reduce by default so scroll-reveal (.rv) content is shown
 * and animations are frozen — what you screenshot is what the spec should be checked against.
 * Output: tools/screens/<name>.<viewport>[.<tag>].png
 */
import { chromium } from 'playwright';
import { proxyOpts, trustedNet } from './net.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(__dirname, 'screens');
mkdirSync(outDir, { recursive: true });

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
if (!target) {
  console.error('usage: node tools/shoot.mjs <path-or-url> [--tag <label>] [--motion]');
  process.exit(1);
}
const tagIdx = args.indexOf('--tag');
const tag = tagIdx > -1 ? args[tagIdx + 1] : '';
const reduce = !args.includes('--motion');

const url = /^https?:\/\//.test(target) ? target : pathToFileURL(resolve(root, target)).href;
const name = basename(target).replace(/\.[^.]+$/, '') || 'page';
const suffix = tag ? `.${tag}` : '';

const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900, dsf: 1 },
  { id: 'laptop', width: 1280, height: 800, dsf: 1 },
  { id: 'mobile', width: 375, height: 812, dsf: 2 },
];

const browser = await chromium.launch();
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    ...proxyOpts(),
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.dsf,
    reducedMotion: reduce ? 'reduce' : 'no-preference',
  });
  await trustedNet(ctx);
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
  }
  await page.waitForTimeout(1500); // let count-ups / reveals settle
  // full-page captures don't scroll, so lazy images below the fold never load: force them,
  // then walk the page once so scroll-triggered sections (terminal boot, reveals) fire
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0);
    await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
  });
  await page.waitForTimeout(600);
  const file = resolve(outDir, `${name}.${v.id}${suffix}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`✓ ${v.id.padEnd(7)} ${v.width}×${v.height}  →  ${file}`);
  await ctx.close();
}
await browser.close();
