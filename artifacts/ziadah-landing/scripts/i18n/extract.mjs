/**
 * Collect every English string the site can show, from the source.
 *
 * What counts as English text:
 *   - the value of any property named `en`, `*En` (titleEn, descEn ...) or
 *     `text`/`label` objects under an `en:` key (translations.ts)
 *   - the second argument of a two-string call `t("عربي", "English")`
 *   - the false branch of `isAr ? "عربي" : "English"` style ternaries
 *   - the whole `en` branch of translations.ts
 * Template literals with `${}` are skipped (they are not stable keys); the
 * runtime crawl (`collect-runtime.mjs`) picks up what only exists at render.
 *
 * Output: scripts/i18n/strings.json  (sorted, de-duplicated, normalised).
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SRC = path.join(ROOT, "src");
const out = new Set();
const HAS_AR = /[؀-ۿ]/;
const LATIN = /[A-Za-z]{2}/;
const norm = (s) => s.replace(/\s+/g, " ").trim();

function add(s) {
  if (typeof s !== "string") return;
  const n = norm(s);
  if (n.length < 2 || !LATIN.test(n) || HAS_AR.test(n)) return;
  if (/^(https?:|\/|#|\.|[a-z0-9_-]+\.[a-z]{2,4}$)/i.test(n)) return;
  if (/^[A-Za-z0-9_.:/\-]+$/.test(n) && !/\s/.test(n) && /[a-z][A-Z]|[_/]/.test(n)) return; // identifiers, paths, keys
  out.add(n);
}

const strOf = (node) =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : null;

function allStrings(node, cb) {
  const s = strOf(node);
  if (s !== null) return cb(s);
  if (ts.isArrayLiteralExpression(node)) node.elements.forEach((e) => allStrings(e, cb));
  else if (ts.isObjectLiteralExpression(node))
    node.properties.forEach((p) => ts.isPropertyAssignment(p) && allStrings(p.initializer, cb));
  else if (ts.isParenthesizedExpression(node)) allStrings(node.expression, cb);
  else if (ts.isAsExpression(node)) allStrings(node.expression, cb);
  else if (ts.isConditionalExpression(node)) { allStrings(node.whenTrue, cb); allStrings(node.whenFalse, cb); }
  else if (ts.isJsxExpression(node) && node.expression) allStrings(node.expression, cb);
}

const isArCond = (c) => {
  const t = c.getText();
  return /^(isAr|lang === "ar"|locale === "ar"|!isEn|isArabic|lang !== "en")$/.test(t) ? "ar-first" :
    /^(!isAr|lang === "en"|isEn|lang !== "ar"|!isArabic)$/.test(t) ? "en-first" : null;
};

function visit(node, inEnBranch) {
  // property en / *En
  if (ts.isPropertyAssignment(node)) {
    const name = node.name.getText().replace(/^["']|["']$/g, "");
    if (name === "en" || /[a-z]En$/.test(name) || /^En[A-Z]/.test(name)) {
      allStrings(node.initializer, add);
      // translations.ts-style: the whole en object
      if (name === "en") visit(node.initializer, true);
      else ts.forEachChild(node.initializer, (c) => visit(c, inEnBranch));
      return;
    }
  }
  if (inEnBranch) {
    const s = strOf(node);
    if (s !== null) add(s);
    if (ts.isJsxText(node)) add(node.text);
  }
  // t("ar", "en")-style
  if (ts.isCallExpression(node) && node.arguments.length >= 2) {
    const a = strOf(node.arguments[0]);
    const b = strOf(node.arguments[1]);
    if (a !== null && b !== null && HAS_AR.test(a) && !HAS_AR.test(b)) add(b);
    if (node.arguments.length === 2 && ts.isObjectLiteralExpression(node.arguments[0])) {/* handled by property rule */}
  }
  // cond ? ar : en
  if (ts.isConditionalExpression(node)) {
    const kind = isArCond(node.condition);
    if (kind === "ar-first") allStrings(node.whenFalse, add);
    if (kind === "en-first") allStrings(node.whenTrue, add);
  }
  ts.forEachChild(node, (c) => visit(c, inEnBranch));
}

function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (f.name !== "catalog" && f.name !== "node_modules") walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(f.name) || /\.d\.ts$/.test(f.name)) continue;
    const text = fs.readFileSync(p, "utf8");
    const sf = ts.createSourceFile(p, text, ts.ScriptTarget.Latest, true, p.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    visit(sf, false);
  }
}
walk(SRC);

const list = [...out];
fs.writeFileSync(path.join(import.meta.dirname, "strings.json"), JSON.stringify(list, null, 0));
const chars = list.reduce((a, s) => a + s.length, 0);
console.log(`[i18n] ${list.length} English strings, ${chars} characters -> scripts/i18n/strings.json`);
