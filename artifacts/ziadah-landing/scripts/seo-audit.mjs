/**
 * SEO audit of the BUILT site: reads the prerendered HTML in dist/public, which
 * is what a crawler or a link unfurler actually receives, not what React would
 * render in a browser.
 *
 *   node scripts/seo-audit.mjs            print a summary and exit 0
 *   node scripts/seo-audit.mjs --json     print every finding as JSON
 *   node scripts/seo-audit.mjs --strict   exit 1 if any ERROR is found
 *
 * Severity: ERROR is something that breaks a preview, an index entry or a
 * language pairing. WARN is something that costs ranking or click-through.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist", "public");
const SITE = "https://www.ziadah.app";
const args = new Set(process.argv.slice(2));

const sitemap = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
const routeSet = new Set(routes);

const findings = [];
const add = (sev, route, code, detail = "") => findings.push({ sev, route, code, detail });

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i")) || tag.match(new RegExp(`\\s${name}='([^']*)'`, "i"));
  return m ? m[1] : null;
};
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'");

const titles = new Map();
const descs = new Map();
const langOf = (route) => (route === "/en" || route.startsWith("/en/") ? "en" : "ar");
const pairOf = (route) => (langOf(route) === "en" ? route.replace(/^\/en/, "") || "/" : route === "/" ? "/en" : `/en${route}`);

for (const route of routes) {
  const file = path.join(DIST, route === "/" ? "" : route, "index.html");
  if (!fs.existsSync(file)) { add("ERROR", route, "no-html", "route is in the sitemap but was not built"); continue; }
  const html = fs.readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("</head>"));
  const lang = langOf(route);

  const tags = (re) => [...head.matchAll(re)].map((m) => m[0]);
  const metas = tags(/<meta\b[^>]*>/gi);
  const metaBy = (key, val) => metas.filter((t) => attr(t, key) === val);
  const one = (key, val, code) => {
    const found = metaBy(key, val);
    if (found.length === 0) add("ERROR", route, `missing-${code}`);
    if (found.length > 1) add("ERROR", route, `duplicate-${code}`, `${found.length} tags; a crawler reads the first`);
    return found[0] ? decode(attr(found[0], "content") ?? "") : "";
  };

  /* title */
  const titleTags = tags(/<title\b[^>]*>[\s\S]*?<\/title>/gi);
  if (titleTags.length !== 1) add("ERROR", route, "title-count", String(titleTags.length));
  const title = decode((titleTags[0] || "").replace(/<[^>]+>/g, "").trim());
  if (!title) add("ERROR", route, "missing-title");
  if (title.length > 65) add("WARN", route, "title-long", `${title.length} chars`);
  if (title.length < 15) add("WARN", route, "title-short", `${title.length} chars`);
  titles.set(title, [...(titles.get(title) ?? []), route]);

  /* description */
  const desc = one("name", "description", "description");
  if (desc && desc.length > 165) add("WARN", route, "description-long", `${desc.length} chars`);
  if (desc && desc.length < (lang === "ar" ? 45 : 55)) add("WARN", route, "description-short", `${desc.length} chars`);
  descs.set(desc, [...(descs.get(desc) ?? []), route]);

  /* language and direction of the document itself */
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  if (attr(htmlTag, "lang") !== lang) add("ERROR", route, "html-lang", `lang=${attr(htmlTag, "lang")}, route is ${lang}`);
  if (attr(htmlTag, "dir") !== (lang === "ar" ? "rtl" : "ltr")) add("ERROR", route, "html-dir", `dir=${attr(htmlTag, "dir")}`);

  /* canonical and hreflang */
  const links = tags(/<link\b[^>]*>/gi);
  const canon = links.filter((t) => attr(t, "rel") === "canonical");
  if (canon.length !== 1) add("ERROR", route, "canonical-count", String(canon.length));
  const canonUrl = canon[0] ? attr(canon[0], "href") : "";
  const selfUrl = SITE + (route === "/" ? "/" : route);
  if (canonUrl && canonUrl !== selfUrl) add("ERROR", route, "canonical-not-self", `${canonUrl} vs ${selfUrl}`);
  const alts = Object.fromEntries(links.filter((t) => attr(t, "rel") === "alternate" && attr(t, "hreflang")).map((t) => [attr(t, "hreflang"), attr(t, "href")]));
  const pair = SITE + (pairOf(route) === "/" ? "/" : pairOf(route));
  const wantAr = lang === "ar" ? selfUrl : pair;
  const wantEn = lang === "en" ? selfUrl : pair;
  if (alts.ar !== wantAr) add("ERROR", route, "hreflang-ar", `${alts.ar} vs ${wantAr}`);
  if (alts.en !== wantEn) add("ERROR", route, "hreflang-en", `${alts.en} vs ${wantEn}`);
  if (!alts["x-default"]) add("WARN", route, "hreflang-x-default");

  /* robots */
  const robots = metaBy("name", "robots").map((t) => attr(t, "content") ?? "").join(",");
  if (/noindex/i.test(robots)) add("ERROR", route, "noindex-on-indexable", robots);

  /* open graph and twitter */
  const ogTitle = one("property", "og:title", "og-title");
  const ogDesc = one("property", "og:description", "og-description");
  const ogImg = one("property", "og:image", "og-image");
  const ogUrl = one("property", "og:url", "og-url");
  const ogLocale = one("property", "og:locale", "og-locale");
  one("property", "og:type", "og-type");
  one("name", "twitter:card", "twitter-card");
  const twImg = one("name", "twitter:image", "twitter-image");
  one("name", "twitter:title", "twitter-title");
  if (ogTitle && ogTitle !== title) add("WARN", route, "og-title-differs", `${ogTitle} vs ${title}`);
  if (ogDesc && ogDesc !== desc) add("WARN", route, "og-description-differs");
  if (ogUrl && ogUrl !== selfUrl) add("ERROR", route, "og-url-not-self", ogUrl);
  if (ogLocale && ogLocale !== (lang === "ar" ? "ar_SA" : "en_US")) add("ERROR", route, "og-locale", ogLocale);
  if (ogImg && twImg && ogImg !== twImg) add("WARN", route, "og-twitter-image-differ");
  if (ogImg) {
    const rel = ogImg.replace(SITE, "").split("?")[0];
    if (!fs.existsSync(path.join(DIST, rel))) add("ERROR", route, "og-image-missing-file", rel);
    else if (rel === "/opengraph.jpg") add("WARN", route, "og-image-is-the-generic-one");
    else if (fs.statSync(path.join(DIST, rel)).size < 20000) add("ERROR", route, "og-image-blank", `${rel} is ${fs.statSync(path.join(DIST, rel)).size} bytes`);
  }

  /* one h1 */
  const h1s = (body.match(/<h1\b/gi) || []).length;
  if (h1s !== 1) add("WARN", route, "h1-count", String(h1s));

  /* structured data parses */
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!ld.length) add("WARN", route, "no-json-ld");
  for (const m of ld) {
    try { JSON.parse(m[1]); } catch { add("ERROR", route, "json-ld-invalid"); }
  }

  /* images without alt */
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => attr(t, "alt") === null);
  if (noAlt.length) add("WARN", route, "img-without-alt", `${noAlt.length} of ${imgs.length}`);

  /* a button inside a button, or a link inside a link, is invalid HTML: a
     browser parsing the page closes the outer one early and throws the rest of
     it out of #root */
  {
    let depth = { button: 0, a: 0 };
    let nested = false;
    for (const m of body.matchAll(/<(\/?)(button|a)\b/gi)) {
      const t = m[2].toLowerCase();
      if (m[1]) depth[t] = Math.max(0, depth[t] - 1);
      else if (++depth[t] > 1) { nested = true; break; }
    }
    if (nested) add("ERROR", route, "nested-interactive", "a <button> or <a> sits inside another one");
  }

  /* internal links that resolve to nothing */
  const hrefs = [...body.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/gi)].map((m) => m[1].replace(/\/$/, "") || "/");
  const dead = [...new Set(hrefs)].filter((h) => !routeSet.has(h) && !fs.existsSync(path.join(DIST, h)) && !fs.existsSync(path.join(DIST, h, "index.html")));
  if (dead.length) add("WARN", route, "dead-internal-links", dead.slice(0, 6).join(" "));
}

/* uniqueness across the site */
for (const [t, rs] of titles) if (t && rs.length > 1) add("ERROR", rs.join(" "), "duplicate-title", t.slice(0, 70));
for (const [d, rs] of descs) if (d && rs.length > 1) add("WARN", rs.join(" "), "duplicate-description", d.slice(0, 70));

/* robots.txt and sitemap */
const robots = fs.existsSync(path.join(DIST, "robots.txt")) ? fs.readFileSync(path.join(DIST, "robots.txt"), "utf8") : "";
if (!/Sitemap:\s*https:\/\/www\.ziadah\.app\/sitemap\.xml/i.test(robots)) add("ERROR", "/robots.txt", "robots-no-sitemap");
if (/Disallow:\s*\/\s*$/m.test(robots)) add("ERROR", "/robots.txt", "robots-blocks-everything");

/* report */
const by = (sev) => findings.filter((f) => f.sev === sev);
if (args.has("--json")) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  const codes = {};
  for (const f of findings) (codes[`${f.sev} ${f.code}`] ??= []).push(f);
  console.log(`routes audited: ${routes.length}`);
  console.log(`errors: ${by("ERROR").length}   warnings: ${by("WARN").length}`);
  for (const [k, v] of Object.entries(codes).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${k}  (${v.length})`);
    for (const f of v.slice(0, 4)) console.log(`   ${f.route}  ${f.detail}`);
  }
}
if (args.has("--strict") && by("ERROR").length) process.exit(1);
