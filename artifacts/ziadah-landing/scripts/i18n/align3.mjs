/**
 * Cross-language alignment check. For each key, the length of its translation
 * tracks across languages (a long English sentence is long in French, German,
 * Japanese...). Take the median z-scored log-length over every language as the
 * key's expected profile and flag windows of 20 consecutive keys where a
 * language's lengths stop following it: a locally shuffled or shifted stretch.
 *   node scripts/i18n/align3.mjs [locale ...]
 */
import fs from "node:fs";
import path from "node:path";
const base = path.join(import.meta.dirname, "out");
const all = fs.readdirSync(base);
const only = process.argv.slice(2);
const z = (xs) => { const m = xs.reduce((a, b) => a + b, 0) / xs.length; const s = Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length) || 1; return xs.map((x) => (x - m) / s); };
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const corr = (a, b) => { const n = a.length, ma = a.reduce((x, y) => x + y, 0) / n, mb = b.reduce((x, y) => x + y, 0) / n; let c = 0, sa = 0, sb = 0; for (let i = 0; i < n; i++) { c += (a[i] - ma) * (b[i] - mb); sa += (a[i] - ma) ** 2; sb += (b[i] - mb) ** 2; } return sa && sb ? c / Math.sqrt(sa * sb) : 1; };
const chunks = fs.readdirSync(path.join(import.meta.dirname, "chunks")).filter((f) => /^\d+\.json$/.test(f)).sort();
let flagged = 0;
for (const f of chunks) {
  const keys = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "chunks", f), "utf8"));
  const profiles = {};
  for (const l of all) {
    const p = path.join(base, l, f);
    if (!fs.existsSync(p)) continue;
    const out = JSON.parse(fs.readFileSync(p, "utf8"));
    profiles[l] = z(keys.map((k) => Math.log(1 + (out[k] ?? "").length)));
  }
  const langs = Object.keys(profiles);
  if (langs.length < 3) continue;
  for (const l of langs) {
    if (only.length && !only.includes(l)) continue;
    const others = langs.filter((x) => x !== l);
    const expected = keys.map((_, i) => med(others.map((o) => profiles[o][i])));
    for (let i = 0; i + 20 <= keys.length; i += 10) {
      const c = corr(profiles[l].slice(i, i + 20), expected.slice(i, i + 20));
      if (c < 0.45) { flagged++; console.log(`${l}/${f}: window ${i}-${i + 20} corr ${c.toFixed(2)}`); break; }
    }
  }
}
console.log(flagged ? `${flagged} chunk(s) with a suspicious stretch` : "all stretches consistent");
