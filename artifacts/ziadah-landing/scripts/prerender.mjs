/**
 * Static prerender for the marketing SPA.
 *
 * After `vite build`, this serves dist/public locally, opens each indexable
 * route (read from the generated sitemap.xml) in headless Chromium, waits for
 * React to mount, and writes the fully-rendered HTML back to
 * dist/public/<route>/index.html. Crawlers, link unfurlers, and no-JS clients
 * then receive real body content + JSON-LD instead of an empty <div id="root">.
 *
 * Fails the build (non-zero exit) if indexable routes cannot be prerendered:
 * missing build output, missing Puppeteer/Chromium, a browser launch failure,
 * or any route failing to render all cause a non-zero exit. This ensures a
 * production deploy never silently ships bare SPA shells to crawlers.
 *
 * Env:
 *   PRERENDER=0            skip entirely (explicit opt-out, still exits 0)
 *   PRERENDER_CONCURRENCY  parallel tabs (default 4)
 *   PRERENDER_LIMIT        only prerender the first N routes (for quick checks)
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist", "public");
const SITE = "https://www.ziadah.app";

if (process.env.PRERENDER === "0") {
  console.log("[prerender] PRERENDER=0 — skipping.");
  process.exit(0);
}

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("[prerender] dist/public/index.html missing — run vite build first. Failing build.");
  process.exit(1);
}

// --- Resolve routes from the generated sitemap (fallback to "/") ------------
function readRoutes() {
  const sitemap = path.join(DIST, "sitemap.xml");
  if (!fs.existsSync(sitemap)) return ["/"];
  const xml = fs.readFileSync(sitemap, "utf8");
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE, "").trim())
    .filter((p) => p.startsWith("/"))
    .map((p) => (p === "" ? "/" : p));
  return [...new Set(routes.length ? routes : ["/"])];
}

// --- Per-page social preview image ------------------------------------------
// One 1200x630 card per route and language, drawn from the page's OWN head
// (its title and description, after react-helmet has applied them), so the
// preview says what the page says and in the page's language. Slack, WhatsApp,
// X and LinkedIn read it from `og:image`, which `BilingualSEO` points at the
// same path (see `ogImagePath` in src/seo/meta.ts: keep the two in step).
function ogFile(route) {
  const slug = route === "/" ? "index" : route.replace(/^\//, "").replace(/\/$/, "");
  return `og/${slug}.png`;
}

const OG_TYPES = {
  ar: { sectors: "قطاع", "use-cases": "حل", features: "ميزة", blog: "مقال", support: "مركز المساعدة", pricing: "الأسعار", platforms: "المنصات", calculator: "الحاسبة", "success-stories": "قصص نجاح", about: "عن زيادة", affiliate: "الشركاء", default: "تطبيق زيادة" },
  en: { sectors: "Industry", "use-cases": "Solution", features: "Feature", blog: "Article", support: "Help centre", pricing: "Pricing", platforms: "Platforms", calculator: "Calculator", "success-stories": "Success stories", about: "About Ziadah", affiliate: "Partners", default: "Ziadah app" },
};

function ogCard({ route, lang, title, description, image, origin }) {
  const OG_CSS = globalThis.OG_CSS;
  const isAr = lang === "ar";
  const first = route.replace(/^\/en(\/|$)/, "/").split("/").filter(Boolean)[0] || "";
  const kind = (OG_TYPES[lang][first] ?? OG_TYPES[lang].default);
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const clean = (t) => t.replace(/\s*[|\-\u2013\u2014]\s*(Ziadah|زيادة)\s*$/i, "").trim();
  const t = esc(clean(title).slice(0, 90));
  const d = esc(description.replace(/\s+/g, " ").slice(0, 150));
  const panel = image
    ? `<div class="tile"><img src="${esc(image)}" alt=""></div>`
    : `<div class="stack"><i></i><i></i><i></i></div>`;
  return `<!doctype html><html lang="${lang}" dir="${isAr ? "rtl" : "ltr"}"><head><meta charset="utf-8"><base href="${origin}/">
<link rel="stylesheet" href="/assets/${OG_CSS}">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#12002b}
body{font-family:'Rubik','IBM Plex Sans Arabic','Tajawal',system-ui,sans-serif;color:#fff;display:flex;position:relative;
 background:radial-gradient(900px 600px at ${isAr ? "15%" : "85%"} 110%,#8700ff 0%,rgba(135,0,255,0) 60%),linear-gradient(135deg,#12002b 0%,#2a0059 55%,#480085 100%)}
.col{flex:1 1 0;min-width:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.chip{align-self:flex-start;padding:10px 22px;border-radius:999px;background:rgba(255,255,255,.14);font-size:26px;font-weight:600;letter-spacing:.01em}
h1{font-size:${(clean(title).length > 48 ? 56 : 68)}px;line-height:1.25;font-weight:700;margin-top:28px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
p{font-size:28px;line-height:1.55;color:rgba(255,255,255,.78);margin-top:20px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.foot{display:flex;align-items:center;gap:20px;font-size:26px;color:rgba(255,255,255,.7)}
.foot img{height:52px;width:auto}
.side{flex:none;width:380px;display:flex;align-items:center;justify-content:center;padding-inline-end:56px}
.tile{width:340px;height:340px;border-radius:36px;background:#fff;display:grid;place-items:center;box-shadow:0 30px 80px rgba(0,0,0,.35)}
.tile img{width:84%;height:84%;object-fit:contain}
.stack{position:relative;width:300px;height:360px}
.stack i{position:absolute;inset-inline-start:0;top:0;width:240px;height:320px;border-radius:32px;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}
.stack i:nth-child(1){transform:translate(${isAr ? "-60px" : "60px"},40px) rotate(${isAr ? "-8deg" : "8deg"});opacity:.5}
.stack i:nth-child(2){transform:translate(${isAr ? "-30px" : "30px"},20px) rotate(${isAr ? "-4deg" : "4deg"});opacity:.75}
.stack i:nth-child(3){background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.35)}
</style></head><body>
<div class="col"><div><span class="chip">${esc(kind)}</span><h1>${t}</h1><p>${d}</p></div>
<div class="foot"><img src="/logo-white-${isAr ? "ar" : "en"}.png" alt=""><span>ziadah.app</span></div></div>
<div class="side">${panel}</div></body></html>`;
}

// --- Minimal static server with SPA fallback --------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

function createServer() {
  return http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = path.join(DIST, urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      // SPA fallback — serve the app shell so the client router can render the route.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(path.join(DIST, "index.html")).pipe(res);
    } catch {
      res.writeHead(500);
      res.end("error");
    }
  });
}

async function main() {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.error("[prerender] puppeteer not installed — failing build. Run `pnpm add -D puppeteer && npx puppeteer browsers install chrome` to enable.");
    process.exit(1);
  }

  let routes = readRoutes();
  const offset = Number(process.env.PRERENDER_OFFSET || 0);
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  if (offset > 0) routes = routes.slice(offset);
  if (limit > 0) routes = routes.slice(0, limit);
  const concurrency = Math.max(1, Number(process.env.PRERENDER_CONCURRENCY || 2));
  // Periodically closing/relaunching the browser mid-run is itself a source of
  // instability (a race during the close/relaunch transition can take down
  // in-flight pages). Only relaunch reactively when the browser actually
  // disconnects/crashes; keep proactive recycling off by default.
  const restartEvery = Math.max(1, Number(process.env.PRERENDER_RESTART_EVERY || Infinity));

  const OG_CSS_FILE = fs.readdirSync(path.join(DIST, "assets")).find((f) => /^index-.*\.css$/.test(f));
  globalThis.OG_CSS = OG_CSS_FILE;
  const server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;

  const LAUNCH_ARGS = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-extensions",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--js-flags=--max-old-space-size=256",
  ];

  async function launchBrowser() {
    try {
      return await puppeteer.launch({ headless: true, args: LAUNCH_ARGS });
    } catch (err) {
      console.error(`[prerender] could not launch Chromium — failing build. (${err.message})`);
      console.error("[prerender] install the browser with: npx puppeteer browsers install chrome");
      server.close();
      process.exit(1);
    }
  }

  let browser = await launchBrowser();
  let pagesSinceLaunch = 0;

  let done = 0;
  let failed = 0;
  const failedRoutes = [];

  const ogPages = {};
  const ogPool = [];
  async function writeOg(route, meta) {
    const lang = route === "/en" || route.startsWith("/en/") ? "en" : "ar";
    const html = ogCard({ route, lang, title: meta.title, description: meta.description, image: meta.image, origin });
    const pg = ogPool.pop() || (await browser.newPage());
    try {
      await pg.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
      await pg.setContent(html, { waitUntil: "load", timeout: 20000 });
      await pg.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
      });
      const out = path.join(DIST, ogFile(route));
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await pg.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
    } finally {
      ogPool.push(pg);
    }
  }

  async function renderOnce(route) {
    const outDirCheck = route === "/" ? DIST : path.join(DIST, route);
    if (process.env.PRERENDER_SKIP_EXISTING === "1" && fs.existsSync(path.join(outDirCheck, "index.html"))) {
      return;
    }
    const page = await browser.newPage();
    try {
      await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Wait for React to mount (app-mounted is added after first paint).
      await page
        .waitForFunction(
          "document.documentElement.classList.contains('app-mounted') || document.querySelector('#root')?.childElementCount > 0",
          { timeout: 15000 },
        )
        .catch(() => {});
      // react-helmet-async applies the head on the frame AFTER mount. Serialising
      // before it lands shipped every page with index.html's own head, so every
      // preview was the home page's. Wait for the tags it owns.
      await page.waitForFunction("document.head.querySelector('[data-rh]')", { timeout: 8000 }).catch(() => {});
      // Drop the pre-React splash so the static HTML shows real content.
      await page.evaluate(() => {
        document.getElementById("initial-loader")?.remove();
        document.documentElement.classList.add("app-mounted");
      });
      // index.html carries a head of its own (title, description, canonical,
      // og/twitter). Helmet adds the page's tags BESIDE them rather than over
      // them, and a crawler reads the first one it meets, which is the static
      // one. Where Helmet owns a tag, the static twin goes.
      const meta = await page.evaluate(() => {
        const head = document.head;
        const key = (el) => {
          const n = el.tagName.toLowerCase();
          if (n === "title") return "title";
          if (n === "meta") return "meta:" + (el.getAttribute("name") || el.getAttribute("property") || el.getAttribute("charset") || "");
          if (n === "link") {
            const rel = el.getAttribute("rel");
            if (rel === "canonical") return "link:canonical";
            if (rel === "alternate" && el.getAttribute("hreflang")) return "link:alt:" + el.getAttribute("hreflang");
          }
          return null;
        };
        const owned = new Set([...head.querySelectorAll("[data-rh]")].map(key).filter(Boolean));
        [...head.children].forEach((el) => {
          if (el.hasAttribute("data-rh")) return;
          const k = key(el);
          if (k && owned.has(k)) el.remove();
        });
        const get = (sel, attr = "content") => document.head.querySelector(sel)?.getAttribute(attr) || "";
        return {
          title: document.title,
          description: get('meta[name="description"]'),
          lang: document.documentElement.getAttribute("lang") || "ar",
          image: document.querySelector(".pz-hero img")?.getAttribute("src") || "",
        };
      });
      if (!ogPages[route]) ogPages[route] = meta;
      await writeOg(route, meta);
      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
      return true;
    } finally {
      await page.close().catch(() => {});
    }
  }

  async function renderOne(route, isRetry = false) {
    try {
      await renderOnce(route);
      done++;
    } catch (err) {
      const disconnected = !browser.connected;
      if (disconnected) {
        console.warn(`[prerender] browser disconnected while rendering ${route} — relaunching.`);
        browser = await launchBrowser();
        pagesSinceLaunch = 0;
      }
      if (!isRetry) {
        console.warn(`[prerender] retrying ${route} after error: ${err.message}`);
        return renderOne(route, true);
      }
      failed++;
      failedRoutes.push(route);
      console.warn(`[prerender] failed ${route}: ${err.message}`);
    } finally {
      pagesSinceLaunch++;
      if (pagesSinceLaunch >= restartEvery && browser.connected) {
        pagesSinceLaunch = 0;
        await browser.close().catch(() => {});
        browser = await launchBrowser();
      }
    }
  }

  // Simple concurrency pool.
  const queue = [...routes];
  async function worker() {
    while (queue.length) {
      const route = queue.shift();
      await renderOne(route);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, worker));

  await browser.close().catch(() => {});
  server.close();
  console.log(`[prerender] wrote ${done} route(s)${failed ? `, ${failed} failed` : ""}.`);

  if (failed > 0) {
    console.error(`[prerender] ${failed} route(s) failed to prerender — failing build: ${failedRoutes.join(", ")}`);
    process.exit(1);
  }

  // Verify every expected route actually produced an index.html on disk.
  const missing = routes.filter((route) => {
    const outDir = route === "/" ? DIST : path.join(DIST, route);
    return !fs.existsSync(path.join(outDir, "index.html"));
  });
  if (missing.length > 0) {
    console.error(
      `[prerender] missing output for ${missing.length} route(s): ${missing.join(", ")} — failing build.`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`[prerender] unexpected error — failing build: ${err.message}`);
  process.exit(1);
});
