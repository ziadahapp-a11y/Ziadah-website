import type { SectorPageRich } from "../sectorPageTypes";
import { deliveryAppsRich } from "./deliveryApps";
import { ecommercePlatformsRich } from "./ecommercePlatforms";
import { abayasFashionRich } from "./abayasFashion";
import { healthFitnessRich } from "./healthFitness";
import { digitalProductsRich } from "./digitalProducts";
import { electronicsRich } from "./electronics";
import { jewelryRich } from "./jewelry";
import { beautyCareRich } from "./beautyCare";
import { restaurantsCafesRich } from "./restaurantsCafes";
import { homeSuppliesRich } from "./homeSupplies";
import { serviceDesignRich } from "./serviceDesign";
import { charitiesRich } from "./charities";
import { clinicsRich } from "./clinics";
import { digitalCardsRich } from "./digitalCards";
import { goldRich } from "./gold";
import { livestockRich } from "./livestock";

export const sectorPageRichBySlug: Record<string, SectorPageRich> = {
  "delivery-apps": deliveryAppsRich,
  "ecommerce-platforms": ecommercePlatformsRich,
  "abayas-fashion": abayasFashionRich,
  "health-fitness": healthFitnessRich,
  "digital-products": digitalProductsRich,
  electronics: electronicsRich,
  jewelry: jewelryRich,
  "beauty-care": beautyCareRich,
  "restaurants-cafes": restaurantsCafesRich,
  "home-supplies": homeSuppliesRich,
  "service-design": serviceDesignRich,
  charities: charitiesRich,
  clinics: clinicsRich,
  "digital-cards": digitalCardsRich,
  gold: goldRich,
  livestock: livestockRich,
};

export function getSectorPageRich(slug: string): SectorPageRich | undefined {
  return sectorPageRichBySlug[slug];
}
