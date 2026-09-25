#!/usr/bin/env node
/**
 * resume-pdf.mjs — render the web résumé (resume/index.html) to the downloadable PDF, so the
 * page and the PDF match word for word.
 *
 *   node tools/resume-pdf.mjs              # writes assets/Bill_Bricker_Resume_2026-09.pdf, prints page count
 *   node tools/resume-pdf.mjs --preview    # also writes tools/screens/resume.print.png
 *                                          # (print media at 816px = Letter width, full page)
 *
 * Uses the page's own print CSS (@page Letter, .5in margins). Fonts load through tools/net.mjs so
 * the real Bricolage / Hanken / JetBrains faces embed. Exits non-zero unless the PDF is exactly
 * two pages and all three site fonts loaded.
 *
 * Static fonts for the PDF: Google Fonts serves variable woff2 to modern browsers, and Chromium
 * embeds variable fonts as Type3 outlines, which résumé parsers (ATS) and some viewers handle
 * badly. The Fonts CSS request is re-sent with a plain user agent, which gets static per-weight
 * TTFs that embed as ordinary TrueType. The web page itself is unchanged.
 */
import { chromium } from 'playwright';
import { proxyOpts, trustedNet } from './net.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, relative } from 'node:path';
import { mkdirSync, statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'resume/index.html');
const out = resolve(root, 'assets/Bill_Bricker_Resume_2026-09.pdf');
const preview = process.argv.includes('--preview');
const EXPECT_PAGES = 2;
const FONTS = ['Bricolage Grotesque', 'Hanken Grotesk', 'JetBrains Mono'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...proxyOpts(), viewport: { width: 816, height: 1056 } });
await trustedNet(ctx);
// Registered after trustedNet, so it runs first for the Fonts CSS (Playwright: last route wins).
await ctx.route('https://fonts.googleapis.com/css2**', async (route) => {
  const headers = { ...route.request().headers(), 'user-agent': 'Mozilla/5.0' };
  await route.fulfill({ response: await route.fetch({ headers }) });
});
const page = await ctx.newPage();
await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle', timeout: 30000 });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => document.fonts.ready);

// Every family must have at least one face actually loaded, or the PDF embeds fallbacks.
const loaded = await page.evaluate(() =>
  [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))]
);
const missing = FONTS.filter((f) => !loaded.includes(f));

const pdf = await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
// Count page objects ("/Type /Page"), not the "/Type /Pages" tree node.
const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page(?![A-Za-z])/g) || []).length;

if (preview) {
  const shots = resolve(__dirname, 'screens');
  mkdirSync(shots, { recursive: true });
  const png = resolve(shots, 'resume.print.png');
  await page.screenshot({ path: png, fullPage: true });
  console.log(`preview  → ${relative(root, png)}`);
}
await browser.close();

const kb = Math.round(statSync(out).size / 1024);
console.log(`pdf      → ${relative(root, out)} (${kb} KB)`);
console.log(`pages    : ${pages}${pages === EXPECT_PAGES ? '' : `  ✗ expected ${EXPECT_PAGES}`}`);
console.log(`fonts    : ${missing.length ? `✗ missing ${missing.join(', ')}` : FONTS.join(' · ')}`);
if (pages !== EXPECT_PAGES || missing.length) process.exitCode = 1;
