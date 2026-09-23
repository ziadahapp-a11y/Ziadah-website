# Ziadah website: content, UX and visual audit

Reviewed 23 September 2026 against the production commit `1787e1d` and the Vercel project `ziadah-website`. The website is an Arabic-first React/Vite application with English routes and dozens of use-case and feature pages. This document distinguishes implemented changes from remaining work.

## Critical: accuracy of product claims

- The home hero, homepage SEO, feature index, feature detail template and use-case template displayed precise uplift percentages without a linked study, date, sample size or methodology. This change removes these prominent unsupported claims from those shared surfaces.
- The use-case source pages still contain result percentages, examples written as realized outcomes and claims about automated margin calculation or A/B testing. Some custom artwork and showcases render numbers independently of the shared template. Audit every such claim against actual product capability and evidence before displaying it. Treat hypothetical examples explicitly as examples.
- The homepage trust board asserted 1,500 stores, SAR 20M of extra sales, 200K orders and 40M recommendations. This change replaces that board with a product illustration and capability-based copy. Reinstate figures only with a verifiable reporting source and a defined period.
- Pricing, trials, installation methods and platform availability need confirmation against the current product and billing configuration. Marketing should never imply Shopify support or an automatic AI action where the integration does not currently do it.

## Information architecture and conversion

| Area | Current observation | Recommended next improvement |
| --- | --- | --- |
| Home | Long sequence: hero, systems, widgets, trust, sectors, process, reviews, calculator, pricing, FAQ, closing | Show the three core outcomes near the top, lead into an actual widget demo, then proof, setup and plans. Remove repeated explanations after measuring engagement. |
| Features index | Goals, presentations, placements and sectors are grouped in tabs; many entries | Provide a short “choose by goal” path and preserve deep links to each capability. Make the tab panels keyboard operable and announce changes. |
| Feature details | Shared scroll layout and interactive previews work well, but goal data includes unsupported uplift figures | Show trigger, data used, merchant controls, storefront preview, eligibility and a precise CTA. Distinguish current capabilities from planned ones. |
| Use cases | Dozens of pages share a layout; some have custom interactive storefront demos | Consolidate overlapping pages into clear goal, placement and offer-type paths. Mark simulated carts and prices as examples, and review all embedded performance claims. |
| Pricing and calculator | Both are conversion-critical and appear on the homepage and dedicated routes | Compare plan entitlements from one source of truth; explain calculator assumptions and never present its estimates as measured customer results. |
| Sectors and platforms | Separate navigation categories with several detail pages | Confirm actual integration status and supported events per platform. Give each sector a concrete journey and a relevant storefront demo. |
| Stories, blog and support | Separate discovery, evidence and help areas | Distinguish approved testimonials from illustrative examples; add dates, sources and product version context to help content. |
| About and affiliate | Trust and partner routes | Make legal entity, contact, payout terms and eligibility easy to find; avoid unsupported partner or merchant counts. |

## Design and implementation direction

- Keep the purple identity and Arabic RTL as the base. Use real storefront interactions, product photography and consistent illustrations; pair each image with the actual feature it explains. A generated composition is illustrative and must not be mistaken for an app screenshot.
- Add responsive checks at 360, 390, 768 and 1440 px on the home, features, pricing, platform, sector, support and use-case templates. Check long Arabic labels, menu focus, modal focus and 200% text zoom.
- Reduce motion for `prefers-reduced-motion`, and keep content visible if GSAP or intersection observers fail. Ensure the menu, tablist and carousels are operable by keyboard.
- Audit page weight: defer below-the-fold images, size images for actual display, avoid loading product photos and animation scripts unnecessarily, and measure Core Web Vitals on production.
- Verify canonical and hreflang tags, sitemap routes, Open Graph imagery and structured data against the content that is actually visible. Check real indexing and analytics events rather than inferring results from code.

## Implemented in this branch

- Reworded the home hero and metadata to describe the recommendation mechanism without guaranteed uplift.
- Removed unsupported statistics from the common use-case results band and its default phone artwork, and from the feature index and goal details.
- Replaced the homepage aggregate proof artwork and claim with an original product illustration. Added the artwork to the feature overview.
- Corrected an empty line in the Arabic hero title.

## Verification and release gate

TypeScript checking passed locally. A Vite build and visual QA should pass before merging. The remaining hard-coded claims in individual use-case files require product-owner review and should be addressed before positioning the entire site as evidence-backed.
