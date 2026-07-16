# SEO Strategy

## In scope
- Public marketing pages on `artifacts/ziadah-landing`
- Blog index and blog post pages
- Support hub and support article pages
- Pricing, features, sectors, success stories, affiliate, calculator, and use-case landing pages
- Public utility share-report URLs only for crawlability/indexation checks

## Out of scope
- Authenticated/internal application flows behind the API
- Admin and CMS-only editing concerns
- API endpoints except where they affect public crawlability or share-page indexing

## Target audience
- Ecommerce merchants using Zid and Salla
- Store owners and growth teams in Saudi Arabia and the GCC

## Primary keywords
- Ziadah
- AI product recommendations
- Zid app
- Salla app
- Ecommerce upsell
- Cross-sell automation
- Increase average order value
- Ecommerce conversion optimization

## Dismissed categories
- (None yet)

## Notes
- Public frontend is a React + Vite app using Wouter routing and `react-helmet-async` for per-route metadata.
- Build includes a sitemap generator and a Puppeteer-based prerender step intended to emit static HTML snapshots for indexable routes.
- Any route-level SEO that depends on prerendering must be treated as fragile unless the build guarantees that prerender succeeds.
- `/report/:shareToken` URLs are public utility/share pages, not intended organic landing pages, so future scans should continue checking them for `noindex` rather than content-quality optimization.
- Legal pages should only remain in the sitemap when they are actually routable in `App.tsx` and contain finalized publication-ready copy.
