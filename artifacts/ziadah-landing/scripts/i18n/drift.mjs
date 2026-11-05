/**
 * Find chunks where translations drifted out of line with their keys: long runs
 * of consecutive pairs whose numbers disagree (a single mis-numbered string is
 * noise, ten in a row is a shifted list).
 *   node scripts/i18n/drift.mjs <locale>
 */
import fs from "node:fs";
import path from "node:path";
const l = process.argv[2];
const dir = path.join(import.meta.dirname, "out", l);
const nums = (s) => (s.match(/\d[\d.,]*/g) || []).map((n) => n.replace(/[.,]/g, "")).sort().join("|");
for (const f of fs.readdirSync(dir).filter((x) => /^\d+\.json$/.test(x)).sort()) {
  const chunk = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "chunks", f), "utf8"));
  const out = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  let run = 0, best = 0, at = 0;
  chunk.forEach((k, i) => {
    const v = out[k] ?? "";
    // only pairs where the key carries a number can disagree
    if (/\d/.test(k) || /\d/.test(v)) {
      if (nums(k) !== nums(v)) { run++; if (run > best) { best = run; at = i; } } else run = 0;
    }
  });
  if (best >= 5) console.log(`${l}/${f}: longest run of ${best} numeric mismatches ending near index ${at}`);
}
