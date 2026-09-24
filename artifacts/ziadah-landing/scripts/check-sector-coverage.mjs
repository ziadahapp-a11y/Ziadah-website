/**
 * EVERY SECTOR SHIPS ITS USE CASES, OR THE BUILD FAILS.
 *
 * A sector page whose use-case band renders only a heading is the worst
 * failure this site has: the band is the part that answers "where does this
 * fire in MY business", and an empty one reads as a broken page rather than a
 * missing feature. It is also silent - nothing throws, the route returns 200,
 * and the gap is only visible to someone who scrolls that one sector.
 *
 * Three facts have to hold, and nothing in the type system holds them:
 *   1. every slug in `sectors.ts` has an entry in the deep-dive registry;
 *   2. every deep-dive file carries at least MIN_CASES use cases;
 *   3. every use case carries a widget, because a use case without one is a
 *      paragraph, and the whole point of the band is the live sheet.
 *
 * This reads the sources as text rather than importing them: the data modules
 * are TypeScript with path aliases, and a structural grep needs no bundler,
 * no resolver and no dependency. It is deliberately strict about the shape it
 * greps for - one authored entry per line, at one indent - so a file that
 * drifts from that shape fails loudly here instead of quietly in the browser.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MIN_CASES = 5;

const read = (p) => readFileSync(join(root, p), "utf8");

const sectorSlugs = [...read("src/data/sectors.ts").matchAll(/^\s+slug: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
const registry = read("src/data/sectorDeepDive.ts");
const registered = new Set(
  [...registry.matchAll(/^\s+"?([a-z0-9-]+)"?:\s*\w+DeepDive,/gm)].map((m) => m[1]),
);

const errors = [];

if (sectorSlugs.length === 0) errors.push("sectors.ts: no slugs parsed - the shape this check greps for has changed.");
if (registered.size === 0) errors.push("sectorDeepDive.ts: no registry entries parsed - the shape this check greps for has changed.");

for (const slug of sectorSlugs) {
  if (!registered.has(slug)) errors.push(`${slug}: no deep dive registered, so its use-case band renders nothing.`);
}

const dir = "src/data/sectorDeepDive";
for (const file of readdirSync(join(root, dir)).filter((f) => f.endsWith(".ts"))) {
  const src = read(join(dir, file));
  const cases = (src.match(/^\s+key: "/gm) || []).length;
  const widgets = (src.match(/^\s+widget: \{/gm) || []).length;
  if (cases < MIN_CASES) errors.push(`${file}: ${cases} use case(s), below the floor of ${MIN_CASES}.`);
  if (widgets !== cases) errors.push(`${file}: ${cases} use case(s) but ${widgets} widget(s) - every use case ships a live example.`);
}

if (errors.length) {
  console.error("\nSector coverage check FAILED:\n" + errors.map((e) => "  - " + e).join("\n") + "\n");
  process.exit(1);
}

const total = readdirSync(join(root, dir))
  .filter((f) => f.endsWith(".ts"))
  .reduce((n, f) => n + (read(join(dir, f)).match(/^\s+key: "/gm) || []).length, 0);
console.log(`[sector-coverage] ${sectorSlugs.length} sectors, ${total} use cases, one live widget each.`);
