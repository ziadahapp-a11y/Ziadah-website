/**
 * Alignment check that needs no knowledge of the language: in a correctly
 * aligned chunk the length of each translation tracks the length of its
 * English key (correlation ~0.85+). A shifted or shuffled chunk drops to ~0.
 *   node scripts/i18n/align.mjs [locale ...]
 * Also reports windows of 40 consecutive pairs with low correlation, which
 * finds a drift that begins mid-chunk.
 */
import fs from "node:fs";
import path from "node:path";
const corr = (a, b) => {
  const n = a.length; if (n < 8) return 1;
  const ma = a.reduce((x, y) => x + y, 0) / n, mb = b.reduce((x, y) => x + y, 0) / n;
  let sab = 0, sa = 0, sb = 0;
  for (let i = 0; i < n; i++) { sab += (a[i] - ma) * (b[i] - mb); sa += (a[i] - ma) ** 2; sb += (b[i] - mb) ** 2; }
  return sa && sb ? sab / Math.sqrt(sa * sb) : 1;
};
const base = path.join(import.meta.dirname, "out");
const locales = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(base);
let bad = 0;
for (const l of locales) {
  for (const f of fs.readdirSync(path.join(base, l)).filter((x) => /^\d+\.json$/.test(x)).sort()) {
    const chunk = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "chunks", f), "utf8"));
    const out = JSON.parse(fs.readFileSync(path.join(base, l, f), "utf8"));
    const ks = chunk.map((k) => k.length), vs = chunk.map((k) => (out[k] ?? "").length);
    const whole = corr(ks, vs);
    let worst = 1, at = 0;
    for (let i = 0; i + 40 <= chunk.length; i += 20) { const c = corr(ks.slice(i, i + 40), vs.slice(i, i + 40)); if (c < worst) { worst = c; at = i; } }
    if (whole < 0.7 || worst < 0.35) { bad++; console.log(`${l}/${f}: whole ${whole.toFixed(2)}, worst window ${worst.toFixed(2)} at ${at}`); }
  }
}
console.log(bad ? `${bad} chunk(s) look misaligned` : "all chunks aligned");
