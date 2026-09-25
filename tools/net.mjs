/**
 * net.mjs — make headless Chromium load remote assets (Google Fonts, CDN images) behind a
 * TLS-re-terminating proxy, e.g. the Claude Code cloud sandbox.
 *
 * Chromium there doesn't trust the proxy CA, so every https request fails and pages render
 * in fallback fonts. Node does trust it (NODE_EXTRA_CA_CERTS), so we hand https requests to
 * Playwright's Node-side fetch, which verifies TLS normally. No-op when HTTPS_PROXY is unset
 * (e.g. running locally), so renders there are unchanged.
 *
 *   const ctx = await browser.newContext({ ...proxyOpts(), viewport: ... });
 *   await trustedNet(ctx);
 */
export const proxyOpts = () =>
  process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } } : {};

export async function trustedNet(ctx) {
  if (!process.env.HTTPS_PROXY) return;
  await ctx.route(/^https:/, async (route) => {
    try {
      await route.fulfill({ response: await route.fetch() });
    } catch {
      await route.abort().catch(() => {});
    }
  });
}
