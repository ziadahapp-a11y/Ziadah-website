/**
 * Merge translated chunks into the runtime catalogue.
 *   node scripts/i18n/merge.mjs [locale ...]     (default: every locale with output)
 * Reads scripts/i18n/out/<locale>/NN.json, writes src/i18n/catalog/<locale>.json.
 * A locale becomes live (switcher, hreflang, sitemap, prerender) the moment its
 * catalogue file exists, so merge only when the language is complete enough to show.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.join(import.meta.dirname, "out");
const CAT = path.join(ROOT, "src/i18n/catalog");
const all = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "all.json"), "utf8"));
const wanted = process.argv.slice(2);
const locales = (wanted.length ? wanted : fs.existsSync(OUT) ? fs.readdirSync(OUT) : []).filter((l) => fs.existsSync(path.join(OUT, l)));
fs.mkdirSync(CAT, { recursive: true });
for (const l of locales) {
  const merged = {};
  for (const f of fs.readdirSync(path.join(OUT, l)).filter((x) => x.endsWith(".json")).sort()) {
    Object.assign(merged, JSON.parse(fs.readFileSync(path.join(OUT, l, f), "utf8")));
  }
  const cat = {};
  for (const k of all) if (typeof merged[k] === "string" && merged[k].length) cat[k] = merged[k];
  // Strings collected later (runtime) live in extra.json next to the chunks.
  const extra = path.join(OUT, l, "extra.json");
  if (fs.existsSync(extra)) Object.assign(cat, JSON.parse(fs.readFileSync(extra, "utf8")));
  fs.writeFileSync(path.join(CAT, `${l}.json`), JSON.stringify(cat));
  const missing = all.filter((k) => !(k in cat)).length;
  console.log(`[i18n] ${l}: ${Object.keys(cat).length} translated, ${missing} of ${all.length} still English`);
}
