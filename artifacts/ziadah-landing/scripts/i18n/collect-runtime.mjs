/**
 * Crawl the built site in English and record every string a page really shows
 * that the source scan did not find (data-derived text, interpolated text).
 *   node scripts/i18n/collect-runtime.mjs        (needs dist/public from `build:spa`)
 * Output: scripts/i18n/runtime-strings.json  = strings NOT already in strings.json
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = path.resolve(import.meta.dirname, "../..");
const DIST = path.join(ROOT, "dist/public");
const known = new Set(JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "strings.json"), "utf8")));
const SITE = "https://www.ziadah.app";
const xml = fs.readFileSync(path.join(ROOT, "dist/public/sitemap.xml"), "utf8");
const routes = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "")).filter((r) => r === "/en" || r.startsWith("/en/")))];

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff" };
const SHELL = fs.readFileSync(path.join(DIST, "index.html"));
const server = http.createServer((req, res) => {
  const p = decodeURIComponent((req.url || "/").split("?")[0]);
  const f = path.join(DIST, p);
  if (p !== "/" && fs.existsSync(f) && fs.statSync(f).isFile() && !f.endsWith("index.html")) {
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
    return fs.createReadStream(f).pipe(res);
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(SHELL);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const found = new Set();
const only = process.env.ROUTES ? process.env.ROUTES.split(",") : routes;
let i = 0;
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
async function one(route) {
  const page = await ctx.newPage();
  try {
    await page.goto(`${origin}${route}?i18n_collect=1`, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(600);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      // open every disclosure and tab so hidden copy is rendered once
      document.querySelectorAll("details").forEach((d) => (d.open = true));
      document.querySelectorAll('[role="tab"]').forEach((t) => t.click());
      await new Promise((r) => setTimeout(r, 200));
    });
    const seen = await page.evaluate(() => (window.__i18nSeen ? window.__i18nSeen() : []));
    for (const s of seen) found.add(s);
  } catch (e) {
    console.warn(`[collect] ${route}: ${e.message.slice(0, 80)}`);
  } finally {
    await page.close();
  }
}
const queue = [...only];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) { await one(queue.shift()); i++; if (i % 25 === 0) console.log(`[collect] ${i}/${only.length}`); } }));
await browser.close();
server.close();
const extra = [...found].filter((s) => !known.has(s)).sort();
fs.writeFileSync(path.join(import.meta.dirname, "runtime-strings.json"), JSON.stringify(extra));
console.log(`[collect] ${found.size} strings shown, ${extra.length} not in the source scan -> runtime-strings.json`);
