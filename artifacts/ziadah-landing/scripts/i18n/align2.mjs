/**
 * Pair-level alignment check from language-independent features: the last
 * punctuation mark, whether the text has a quote, a question mark, a colon, a
 * percent sign, emoji, and the multiset of numbers. An aligned pair agrees on
 * almost all of them; a pair that belongs to another key rarely does. A window
 * of 30 pairs where more than a third disagree is a shuffled or shifted stretch.
 *   node scripts/i18n/align2.mjs [locale ...]
 */
import fs from "node:fs";
import path from "node:path";
const base = path.join(import.meta.dirname, "out");
const feat = (s) => {
  const t = s.trim();
  const last = t.slice(-1);
  const end = /[.。．]/.test(last) ? "." : /[:：]/.test(last) ? ":" : /[?？]/.test(last) ? "?" : /[!！]/.test(last) ? "!" : /[…]/.test(last) ? "…" : /[)）\]」”"']/.test(last) ? "q" : "-";
  return {
    end,
    quote: /["“”「」«»‘’„]/.test(t),
    ask: /[?？¿]/.test(t),
    pct: /[%％]/.test(t),
    emoji: (t.match(/\p{Extended_Pictographic}/gu) || []).length,
    nums: (t.match(/\d[\d.,]*/g) || []).map((n) => n.replace(/[.,]/g, "")).sort().join("|"),
    arrow: /[→←↔⇒➜>]/.test(t),
  };
};
const agree = (a, b) => {
  let bad = 0, n = 0;
  for (const k of ["quote", "ask", "pct", "arrow"]) { n++; if (a[k] !== b[k]) bad++; }
  n++; if (a.emoji !== b.emoji) bad++;
  n++; if (a.nums !== b.nums && !/[一二三四五六七八九十]/.test("")) bad++;
  return bad / n;
};
const locales = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(base);
let flagged = 0;
for (const l of locales) {
  for (const f of fs.readdirSync(path.join(base, l)).filter((x) => /^\d+\.json$/.test(x)).sort()) {
    const chunk = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "chunks", f), "utf8"));
    const out = JSON.parse(fs.readFileSync(path.join(base, l, f), "utf8"));
    const d = chunk.map((k) => agree(feat(k), feat(out[k] ?? "")));
    let worst = 0, at = 0;
    for (let i = 0; i + 30 <= d.length; i += 10) {
      const m = d.slice(i, i + 30).reduce((x, y) => x + y, 0) / 30;
      if (m > worst) { worst = m; at = i; }
    }
    const whole = d.reduce((x, y) => x + y, 0) / d.length;
    if (worst > 0.16) { flagged++; console.log(`${l}/${f}: whole ${(whole * 100).toFixed(0)}%, worst window ${(worst * 100).toFixed(0)}% at ${at}`); }
  }
}
console.log(flagged ? `${flagged} window(s) suspicious` : "no suspicious windows");
