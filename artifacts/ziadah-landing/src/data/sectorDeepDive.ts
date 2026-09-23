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
  /** Which channel it runs on, when the sector has more than one. */
  channel?: SectorChannel["code"];
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
