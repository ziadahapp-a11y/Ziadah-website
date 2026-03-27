# Technical SEO Audit Report

## Pages updated
- `/` (head preconnect + image loading/fetch priority adjustments)
- Global head in `index.html` (preconnects)
- Global navigation images in `src/components/Nav.tsx`
- Platform modal images in `src/components/PlatformModal.tsx`

## Meta tags added per page
- No new visible copy was added or rewritten.
- Existing route-level SEO implementation already uses `react-helmet-async` through `SEO`/`BilingualSEO`.
- Existing tags confirmed in implementation: `title`, `description`, canonical, hreflang (`ar`, `en`, `x-default`), OG, Twitter, robots.

## Schema types added
- No new schema blocks added in this pass.
- Existing schema coverage already present:
  - `Organization`
  - `WebSite` + `SearchAction`
  - `SoftwareApplication`
  - `BreadcrumbList`
  - `FAQPage` (where FAQ data exists)
  - Additional existing schemas: `Article`, `ItemList`, `WebPage`, `HowTo`

## Alt tags fixed (count)
- `0` missing/empty alt fixes required in public-facing UI files changed in this pass.
- Existing decorative/admin preview images that intentionally use `alt=""` were left unchanged.

## Robots and sitemap
- `public/robots.txt` normalized to the requested minimal format.
- `public/sitemap.xml` expanded with missing production routes and key `/en` localized entries.

## Performance-related technical SEO updates
- Added `preconnect` for Google Fonts domains in `index.html`.
- Added `fetchpriority="high"` + `loading="eager"` to primary brand logo image in nav (likely above-the-fold).
- Added `loading="lazy"` to non-critical images in landing and modal/nav dropdown contexts.

## Issues requiring manual attention
- Route coverage in sitemap for all dynamic pages (e.g. every sector slug, every support article id, every blog slug in both locales) should be fully generated from source data at build time to avoid drift.
- Current canonical/OG base domain appears to use `www` while runtime redirect and some references may vary; keep one canonical host consistently across infra.
- `FAQPage` schema is currently data-driven; ensure it stays rendered only on pages with visible FAQ content (already true for main landing).
