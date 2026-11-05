/**
 * Sanity-check translated chunks: same keys, and per pair the things that must
 * not change (numbers, brand names, {placeholders}) are still there. Pairs that
 * fail are listed; a misaligned chunk shows up as a wall of failures.
 *   node scripts/i18n/validate.mjs <locale>
 */
import fs from "node:fs";
import path from "node:path";
const l = process.argv[2];
const dir = path.join(import.meta.dirname, "out", l);
const BRANDS = ["Ziadah", "Zid", "Salla", "Shopify", "WhatsApp"];
let bad = 0, total = 0;
for (const f of fs.readdirSync(dir).filter((x) => /^\d+\.json$/.test(x)).sort()) {
  const chunk = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "chunks", f), "utf8"));
  const out = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  let fb = 0;
  // A chunk whose values mostly equal their English keys was never translated.
  const words = chunk.filter((k) => /[A-Za-z]{4,}\s+[A-Za-z]{3,}/.test(k));
  const same = words.filter((k) => out[k] === k).length;
  if (words.length > 20 && same / words.length > 0.3) console.log(`  !! ${f}: ${same}/${words.length} phrases identical to English, chunk looks untranslated`);
  for (const k of chunk) {
    total++;
    const v = out[k];
    if (typeof v !== "string" || !v) { fb++; continue; }
    const nums = (s) => (s.match(/\d[\d.,]*/g) || []).map((n) => n.replace(/[.,]/g, "")).sort().join("|");
    const placeholders = (s) => (s.match(/\{[^}]+\}/g) || []).sort().join("|");
    let ok = placeholders(k) === placeholders(v);
    for (const b of BRANDS) if (k.includes(b) && !v.includes(b)) ok = false;
    if (nums(k) !== nums(v) && !/\b(am|pm|AM|PM)\b/.test(k)) ok = false;
    if (!ok) { fb++; if (process.env.SHOW) console.log(`  ${f}: ${k.slice(0, 60)}  =>  ${v.slice(0, 60)}`); }
  }
  bad += fb;
  console.log(`${f}: ${chunk.length} strings, ${fb} flagged`);
}
console.log(`[${l}] ${total} checked, ${bad} flagged`);
