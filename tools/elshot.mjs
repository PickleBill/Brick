#!/usr/bin/env node
/** elshot.mjs — screenshot a single element (optionally after running some JS first).
 *   node tools/elshot.mjs index.html ".hero-card" front
 *   node tools/elshot.mjs index.html ".hero-card" back "document.getElementById('flip').classList.add('flipped')"
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const [target, sel, tag, evalStr] = process.argv.slice(2);
const url = pathToFileURL(resolve(target)).href;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 920 }, deviceScaleFactor: 2, reducedMotion: 'no-preference' });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'load' });
await p.waitForTimeout(900);
await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel);
if (evalStr) { await p.evaluate(evalStr); await p.waitForTimeout(1200); } else { await p.waitForTimeout(700); }
await p.locator(sel).screenshot({ path: `tools/screens/el-${tag || 'shot'}.png` });
await b.close();
console.log('ok el-' + (tag || 'shot'));
