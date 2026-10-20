/**
 * THE SECTOR LANDING LAYER.
 *
 * `sectorPageRich` answers "what is this sector and why does Ziadah matter to
 * it" in one screen each. This answers the question a merchant asks next and
 * the site could not previously answer: **show me, one by one, the moments
 * this thing actually fires in MY business, and what the customer sees.**
 *
 * The unit is the MOMENT, not the feature. A restaurant owner does not shop
 * for "cross-sell"; they recognise "the table has ordered mains and nobody has
 * mentioned dessert yet". So every entry leads with the trigger and names a
 * real product from that sector in the example. A card that could be pasted
 * into another sector unchanged has failed and should be rewritten.
 */

/** Where a suggestion is rendered. Only sectors that sell outside a web
 *  storefront declare these; a jewellery shop has one surface and listing it
 *  would be noise. */
export type SectorChannel = {
  /** Matches the platform's channel codes so copy and product stay aligned. */
  code: "store" | "mobile_app" | "qr" | "kiosk" | "waiter" | "pos" | "branch";
  nameAr: string;
  nameEn: string;
  /** One line: who is holding the screen, and where they are standing. */
  descAr: string;
  descEn: string;
};

/**
 * THE LIVE PREVIEW for one moment: a real storefront sheet built from the
 * shipped widget kit, not a picture of one and not a sentence describing one.
 *
 * It carries only what a sheet actually shows - the item the shopper already
 * has, the thing Ziadah says about it, and the button - because a preview
 * that carries more than the real widget does stops being a preview.
 */
export type SectorUseCaseWidget = {
  /** The sheet's own header, in the storefront's voice. */
  titleAr: string;
  titleEn: string;
  /** The item the shopper is already looking at or already has. */
  mainAr: string;
  mainEn: string;
  mainPrice: string;
  /** The line above the suggestions. Defaults to "Ziadah suggests". */
  hintAr?: string;
  hintEn?: string;
  /** What Ziadah puts in front of them. One to three rows. */
  suggest: { ar: string; en: string; price: string; was?: string }[];
  ctaAr: string;
  ctaEn: string;
};

/**
 * THE PRODUCT'S OWN VOCABULARY, as slugs.
 *
 * These three unions are the slugs in `src/lib/features-data.ts`, repeated
 * here rather than imported so the data layer stays free of the component
 * layer's dependencies (that registry pulls in lucide icons). The repetition
 * is the dangerous kind - two lists that can drift - so the build asserts
 * they match, in `scripts/check-sector-coverage.mjs`. Change one, change both,
 * or the build stops.
 *
 * Tagging a moment with its goal and its presentation is what lets a sector
 * page PROVE its coverage rather than claim it: a merchant can see that every
 * one of the five goals and every one of the five shapes is answered here, in
 * this sector's own products, and the page can group by either.
 */
export type GoalSlug =
  | "more-products" | "quantity-offers" | "product-swap" | "cart-value" | "discount-code";

export type PresentationSlug =
  | "related-products" | "add-ons" | "bought-together" | "combo" | "buy-more-save-more";

export type PlacementSlug =
  | "product-page" | "category-page" | "cart-page" | "checkout-page" | "thank-you-page"
  | "exit-intent" | "home-page" | "search-page" | "smart-popup";

export type SectorUseCase = {
  /** Stable key for React and for deep links. */
  key: string;
  titleAr: string;
  titleEn: string;
  /** THE MOMENT. What has just happened when this fires. */
  triggerAr: string;
  triggerEn: string;
  /** What the customer actually sees or hears. */
  scenarioAr: string;
  scenarioEn: string;
  /** Why it works HERE - the sector's own economics or psychology. */
  whyAr: string;
  whyEn: string;
  /** A worked example with this sector's real products and real prices. */
  exampleAr: string;
  exampleEn: string;
  /** WHO this fires for. The fifth W, and the one a generic page never
   *  answers: not "a customer", but which customer in this sector, holding
   *  what, at what stage of their own decision. */
  whoAr?: string;
  whoEn?: string;
  /** WHERE it renders. A slug rather than prose, so the page names the
   *  placement with the same words `/features` does and a reader can follow
   *  one term across the whole site. */
  placement?: PlacementSlug;
  /** WHAT IT MOVES. One of the five goals the product publishes. */
  goal?: GoalSlug;
  /** WHAT SHAPE IT TAKES. One of the five presentations the product
   *  publishes. Together with `goal` this is what the coverage grid reads. */
  presentation?: PresentationSlug;
  /** Which channel it runs on, when the sector has more than one. */
  channel?: SectorChannel["code"];
  /** The live sheet for this moment. Every use case has one. */
  widget?: SectorUseCaseWidget;
};

export type SectorDeepDive = {
  slug: string;
  /** The band's own lede: what makes selling in this sector different. */
  introAr: string;
  introEn: string;
  channels?: SectorChannel[];
  useCases: SectorUseCase[];
};

import { restaurantsCafesDeepDive } from "./sectorDeepDive/restaurantsCafes";
import { beautyCareDeepDive } from "./sectorDeepDive/beautyCare";
import { clinicsDeepDive } from "./sectorDeepDive/clinics";
import { charitiesDeepDive } from "./sectorDeepDive/charities";
import { deliveryAppsDeepDive } from "./sectorDeepDive/deliveryApps";
import { ecommercePlatformsDeepDive } from "./sectorDeepDive/ecommercePlatforms";
import { abayasFashionDeepDive } from "./sectorDeepDive/abayasFashion";
import { healthFitnessDeepDive } from "./sectorDeepDive/healthFitness";
import { digitalProductsDeepDive } from "./sectorDeepDive/digitalProducts";
import { electronicsDeepDive } from "./sectorDeepDive/electronics";
import { jewelryDeepDive } from "./sectorDeepDive/jewelry";
import { homeSuppliesDeepDive } from "./sectorDeepDive/homeSupplies";
import { serviceDesignDeepDive } from "./sectorDeepDive/serviceDesign";
import { digitalCardsDeepDive } from "./sectorDeepDive/digitalCards";
import { goldDeepDive } from "./sectorDeepDive/gold";
import { livestockDeepDive } from "./sectorDeepDive/livestock";

/** Every sector in `data/sectors` has an entry. Keyed by the same slug the
 *  page routes on, so a sector cannot have a page without its moments. */
export const sectorDeepDiveBySlug: Record<string, SectorDeepDive> = {
  "restaurants-cafes": restaurantsCafesDeepDive,
  "beauty-care": beautyCareDeepDive,
  clinics: clinicsDeepDive,
  charities: charitiesDeepDive,
  "delivery-apps": deliveryAppsDeepDive,
  "ecommerce-platforms": ecommercePlatformsDeepDive,
  "abayas-fashion": abayasFashionDeepDive,
  "health-fitness": healthFitnessDeepDive,
  "digital-products": digitalProductsDeepDive,
  electronics: electronicsDeepDive,
  jewelry: jewelryDeepDive,
  "home-supplies": homeSuppliesDeepDive,
  "service-design": serviceDesignDeepDive,
  "digital-cards": digitalCardsDeepDive,
  gold: goldDeepDive,
  livestock: livestockDeepDive,
};

export function getSectorDeepDive(slug: string): SectorDeepDive | undefined {
  return sectorDeepDiveBySlug[slug];
}
