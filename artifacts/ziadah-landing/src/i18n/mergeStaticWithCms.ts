/**
 * Keys that must always follow static `translations.ts` (not CMS DB), so deploys that
 * change copy in the repo are visible without re-seeding `content_blocks`.
 */
const STATIC_ONLY_I18N_KEYS = new Set([
  "ar.landing.heroTitle1",
  "en.landing.heroTitle1",
  "ar.landing.heroTitleEm",
  "en.landing.heroTitleEm",
  "ar.landing.heroTitleGrad",
  "en.landing.heroTitleGrad",
  "ar.landing.heroSub",
  "en.landing.heroSub",
  "ar.landing.ctaPrimary",
  "en.landing.ctaPrimary",
  "ar.landing.ctaSecondary",
  "en.landing.ctaSecondary",
  "ar.landing.sectorsBriefSub",
  "en.landing.sectorsBriefSub",
  /** Home calculator H2: repo copy ships without re-seeding `content_blocks`. */
  "ar.homeCalculator.title",
  "en.homeCalculator.title",
  /** Testimonials H2: avoid stale CMS `content_blocks` hiding repo copy updates. */
  "ar.landing.testimonialsTitle",
  "en.landing.testimonialsTitle",
  /** Year bumps ship in repo; DB overrides were leaving stale © lines in the footer. */
  "ar.footer.copyright",
  "en.footer.copyright",
]);

/** Flat keys like `ar.nav.home` or `blog.post-slug.title` overlay nested static translations. */
export function applyFlatOverridesToTree<T extends Record<string, unknown>>(
  base: T,
  overrides: Record<string, string> | null | undefined,
): T {
  if (!overrides || Object.keys(overrides).length === 0) {
    return base;
  }
  const clone = structuredClone(base) as T;
  const root = clone as Record<string, unknown>;
  for (const [flatKey, value] of Object.entries(overrides)) {
    if (STATIC_ONLY_I18N_KEYS.has(flatKey)) {
      continue;
    }
    if (!flatKey.startsWith("ar.") && !flatKey.startsWith("en.")) {
      continue;
    }
    const parts = flatKey.split(".");
    setDeepString(root, parts, value);
  }
  return clone;
}

function setDeepString(
  obj: Record<string, unknown>,
  parts: string[],
  value: string,
): void {
  if (parts.length === 0) return;
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    const next = cur[k];
    if (next === undefined || typeof next !== "object" || next === null) {
      cur[k] = {};
    }
    cur = cur[k] as Record<string, unknown>;
  }
  const last = parts[parts.length - 1];
  cur[last] = value;
}

/** Flatten nested object with only string leaves (for seeding). */
export function flattenStringLeaves(
  obj: unknown,
  prefix = "",
): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj === null || typeof obj !== "object") return out;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") {
      out[p] = v;
    } else if (typeof v === "object" && v !== null) {
      Object.assign(out, flattenStringLeaves(v, p));
    }
  }
  return out;
}
