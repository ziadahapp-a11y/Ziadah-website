/**
 * Static prerender for the marketing SPA.
 *
 * After `vite build`, this serves dist/public locally, opens each indexable
 * route (read from the generated sitemap.xml) in headless Chromium, waits for
 * React to mount, and writes the fully-rendered HTML back to
 * dist/public/<route>/index.html. Crawlers, link unfurlers, and no-JS clients
 * then receive real body content + JSON-LD instead of an empty <div id="root">.
 *
 * Resilient by design: if Puppeteer or Chromium is unavailable, it logs a
 * warning and exits 0 so the build never fails because of prerendering.
 *
 * Env:
 *   PRERENDER=0            skip entirely
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
  console.warn("[prerender] dist/public/index.html missing — run vite build first. Skipping.");
  process.exit(0);
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
    console.warn("[prerender] puppeteer not installed — skipping. Run `pnpm add -D puppeteer && npx puppeteer browsers install chrome` to enable.");
    return;
  }

  let routes = readRoutes();
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  if (limit > 0) routes = routes.slice(0, limit);
  const concurrency = Math.max(1, Number(process.env.PRERENDER_CONCURRENCY || 4));

  const server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    console.warn(`[prerender] could not launch Chromium — skipping. (${err.message})`);
    console.warn("[prerender] install the browser with: npx puppeteer browsers install chrome");
    server.close();
    return;
  }

  let done = 0;
  let failed = 0;

  async function renderOne(route) {
    const page = await browser.newPage();
    try {
      await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 30000 });
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
      done++;
    } catch (err) {
      failed++;
      console.warn(`[prerender] failed ${route}: ${err.message}`);
    } finally {
      await page.close();
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

  await browser.close();
  server.close();
  console.log(`[prerender] wrote ${done} route(s)${failed ? `, ${failed} failed` : ""}.`);
}

main().catch((err) => {
  // Never fail the build because of prerendering.
  console.warn(`[prerender] unexpected error — skipping: ${err.message}`);
  process.exit(0);
});
