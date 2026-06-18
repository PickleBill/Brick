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
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.dsf,
    reducedMotion: reduce ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
  }
  await page.waitForTimeout(1500); // let count-ups / reveals settle
  const file = resolve(outDir, `${name}.${v.id}${suffix}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`✓ ${v.id.padEnd(7)} ${v.width}×${v.height}  →  ${file}`);
  await ctx.close();
}
await browser.close();
