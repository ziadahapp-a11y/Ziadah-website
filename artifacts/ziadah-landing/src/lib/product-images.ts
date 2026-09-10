/**
 * Product photography for the storefront previews, keyed by the product name
 * the widget renders.
 *
 * Only names the site ACTUALLY renders are listed. That distinction cost a
 * round: the first list was built from `sectorWidgetShowcaseDemos.ts`, which
 * defines 160 products and renders none of them - the section that consumes it
 * sits behind a condition in `SectorDetail` that no sector currently meets. A
 * sweep of all 161 Arabic routes found 161 rendered names, and only these
 * overlapped. Regenerate this from a runtime sweep, never from a data file.
 *
 * Anything unmapped falls back to the initial tile in `ProductTile`, so a
 * missing entry costs nothing and the catalogue can be filled in over time.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  "مشروب غازي": "/products/delivery-06.webp",
  "Soft drink": "/products/delivery-06.webp",
  "ضمان إضافي سنة": "/products/retail-05.webp",
  "Extra 1-year warranty": "/products/retail-05.webp",
  "حقيبة يد صغيرة": "/products/fashion-03.webp",
  "Small handbag": "/products/fashion-03.webp",
  "كريم مرطب SPF 50": "/products/beauty-01.webp",
  "SPF 50 moisturizer": "/products/beauty-01.webp",
  "سيروم فيتامين C": "/products/beauty-02.webp",
  "Vitamin C serum": "/products/beauty-02.webp",
  "غسول لطيف": "/products/beauty-03.webp",
  "Gentle cleanser": "/products/beauty-03.webp",
};

/* Arabic copy varies in ways that must not miss a match: tatweel, the alef and
   yaa forms, and the diacritics an author may or may not type. */
function normalise(s: string): string {
  return s
    .trim()
    .replace(/\u0640/g, "")
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/[\u0622\u0623\u0625]/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0629/g, "\u0647")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const NORMALISED: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_IMAGES).map(([k, v]) => [normalise(k), v]),
);

export function productImage(name: string): string | null {
  return PRODUCT_IMAGES[name.trim()] ?? NORMALISED[normalise(name)] ?? null;
}
