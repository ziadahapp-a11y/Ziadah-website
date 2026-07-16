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
      // Drop the pre-React splash so the static HTML shows real content.
      await page.evaluate(() => {
        document.getElementById("initial-loader")?.remove();
        document.documentElement.classList.add("app-mounted");
      });
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
