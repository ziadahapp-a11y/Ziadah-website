import { useState } from "react";
import SEO from "@/components/SEO";
import { OrganizationSchema, SoftwareAppSchema, WebSiteSchema } from "@/components/JsonLd";
import PlatformModal from "@/components/PlatformModal";
import WidgetsShowcaseSection from "@/components/WidgetsShowcaseSection";
import SectorsBriefSection from "@/components/SectorsBriefSection";
import { Hero } from "./home/Hero";
import { CoreSystems, Trust } from "./home/CoreSystems";
import { HowItWorks } from "./home/HowItWorks";
import { Calculator } from "./home/Calculator";
import { Pricing } from "./home/Pricing";
import { Testimonials } from "./home/Testimonials";
import { HomeFaq } from "./home/Faq";
import { BlockGrid, Disclaimer } from "./home/BlockGrid";

/**
 * Homepage composition.
 *
 * WHAT CHANGED AND WHY. The page was fourteen bands and every one of them was
 * the same shape: a centred head over N equal cards in one grid. Restyling
 * them onto the design system's card vocabulary fixed the surfaces and left
 * the rhythm alone, so at any distance the page still read as one pale wall
 * of rectangles - which is what "not 1:1" meant.
 *
 * It is ten bands now, on the reference's own composition, and the pieces
 * that composition needs were already here: `bento-board.css`,
 * `home-scenes.css` and `product-visual.css` were ported in W1.4 - ninety
 * kilobytes of board, device, surface and closing vocabulary - and had no
 * consumer in any component. The rebuild is mostly a matter of writing the
 * consumers.
 *
 * The rhythm of the page, band by band:
 *
 *   hero          VISUAL + TEXT   dark violet, the product beside the claim
 *   systems       TEXT + VISUAL   pale, a board of product surfaces
 *   widgets       VISUAL          the same systems as concrete examples
 *   trust         VISUAL + TEXT   dark, the record and what the connector reads
 *   sectors       TEXT            where it takes shape
 *   how-it-works  VISUAL          four steps beside a pinned figure
 *   reviews       TEXT            the merchants, in their own words
 *   calculator    DATA            the merchant puts their own numbers in
 *   pricing       DATA            plans
 *   faq           TEXT
 *   closing       TEXT            the three paths out
 *
 * FOUR BANDS WERE FOLDED, TWO WERE CUT.
 *
 * Folded: the four pillars and the placements pair into the systems board;
 * the aggregate stats and the merchant-logo marquee into the trust board.
 * Each was a full band restating something a card can hold, and the board is
 * what gives a card a size.
 *
 * The reviews were folded too, and folding them was wrong: a tile reading
 * "verified merchant reviews" states that reviews exist without showing one,
 * and they are the only words on the page not written by us. They have their
 * own band again, on the system's card.
 *
 * Cut: the X-thread mockup and the hundred-dot three-way comparison. Both
 * argued that a store showing everyone the same products leaves money on the
 * table - which is the hero's claim, the calculator's premise and the systems
 * board's whole subject. They were spending two screens and three hundred
 * squares to say it a fourth time.
 *
 * The platform-picker modal stays with the page rather than with a band,
 * because both the calculator and pricing open it.
 */
export default function HomeTrackflow() {
  const [platformOpen, setPlatformOpen] = useState(false);
  const openPlatforms = () => setPlatformOpen(true);

  return (
    <>
      <SEO
        titleAr="زيادة — ارفع متوسط قيمة الطلب بالذكاء الاصطناعي"
        titleEn="Ziadah — Raise your average order value with AI"
        descriptionAr="زيادة تقترح لكل عميل المنتجات المناسبة في صفحة المنتج والسلة والدفع، فترفع متوسط قيمة الطلب ومبيعاتك حتى 35٪. فعّل على زد بنقرة وحدة."
        descriptionEn="Ziadah recommends the right products to every customer across product, cart, and checkout — lifting your average order value and sales by up to 35%. One-click activation on Zid."
        canonical="/"
      />
      <OrganizationSchema />
      <SoftwareAppSchema />
      <WebSiteSchema />

      {/* `page` is the design system's own page class: it is what makes the
          first section clear the header by padding rather than by luck, and
          what gives every section below it the system's rhythm. */}
      <div className="page">
        <Hero />
        <CoreSystems />
        <WidgetsShowcaseSection />
        <Trust />
        <SectorsBriefSection />
        <HowItWorks />
        <Testimonials />
        <Calculator onActivate={openPlatforms} />
        <Pricing onActivate={openPlatforms} />
        <HomeFaq />
        <BlockGrid />
        <Disclaimer />
      </div>

      <PlatformModal open={platformOpen} onClose={() => setPlatformOpen(false)} />
    </>
  );
}
