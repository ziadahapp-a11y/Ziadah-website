/**
 * WHICH SECTORS SIT AT THE TOP, AND WHICH SIT INSIDE THE RETAIL INDEX.
 *
 * This used to be three separate lists that had to agree with each other by
 * hand: the buckets hard-coded in `pages/Sectors`, an `EXCLUDED_SLUGS` set in
 * `pages/EcommerceStoreSectors`, and a literal array in `lib/nav-data`. Three
 * copies of one fact is how the WhatsApp number ended up living in two places
 * a support line apart, so the fact lives here once and all three read it.
 *
 * A sector is top-level when it is NOT a kind of online shop. A restaurant
 * takes orders at a table, a clinic books visits, a charity collects
 * donations - filing them under "ecommerce stores" described the integration
 * rather than the business, and buried the page a restaurant owner was
 * actually looking for two levels down.
 *
 * Slugs and URLs do not change: `/sectors/restaurants-cafes` is the same page
 * it was, reachable from one level up instead of two.
 */
import { sectors, type SectorContent } from "./sectors";

/** The order they appear on `/sectors`. Retail first: it is still the biggest
 *  bucket and the one most visitors arrive for. */
export const TOP_LEVEL_SECTOR_SLUGS = [
  "restaurants-cafes",
  "beauty-care",
  "clinics",
  "charities",
  "delivery-apps",
  "ecommerce-platforms",
] as const;

export type TopLevelSectorSlug = (typeof TOP_LEVEL_SECTOR_SLUGS)[number];

const TOP_LEVEL = new Set<string>(TOP_LEVEL_SECTOR_SLUGS);

/** True when the sector has its own card on `/sectors` and is therefore kept
 *  out of the retail index. */
export function isTopLevelSector(slug: string): boolean {
  return TOP_LEVEL.has(slug);
}

/** The sectors the `/sectors/ecommerce-stores` index lists: everything that is
 *  genuinely a kind of online shop. */
export function retailSectors(): SectorContent[] {
  return sectors.filter((s) => !isTopLevelSector(s.slug));
}

/** The promoted sectors, in display order, resolved against `data/sectors` so
 *  a card and its page can never name the sector differently. */
export function topLevelSectors(): SectorContent[] {
  return TOP_LEVEL_SECTOR_SLUGS.map((slug) =>
    sectors.find((s) => s.slug === slug),
  ).filter((s): s is SectorContent => Boolean(s));
}
