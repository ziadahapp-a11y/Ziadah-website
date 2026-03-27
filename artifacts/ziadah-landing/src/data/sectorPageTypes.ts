/** Rich sector page blocks — unified template (hero, audience, why, AI, tracking, analytics, features, CTA) */

export type SectorPageLine = { ar: string; en: string };

export type SectorPageRich = {
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubAr: string;
  heroSubEn: string;
  phoneOrders: [SectorPageLine, SectorPageLine];
  phoneRecs: [SectorPageLine, SectorPageLine];
  audienceOwnerAr: string;
  audienceOwnerEn: string;
  audienceCustomerAr: string;
  audienceCustomerEn: string;
  whyCards: { emoji: string; textAr: string; textEn: string }[];
  aiProfileTagsAr: string;
  aiProfileTagsEn: string;
  aiRecsAr: [string, string, string];
  aiRecsEn: [string, string, string];
  aiSignalsAr: [string, string, string, string];
  aiSignalsEn: [string, string, string, string];
  analyticLinesAr: [string, string, string, string, string];
  analyticLinesEn: [string, string, string, string, string];
  analyticKpis: [SectorPageLine, SectorPageLine, SectorPageLine, SectorPageLine];
  featureHowAr: [string, string, string, string, string, string, string, string, string, string, string];
  featureHowEn: [string, string, string, string, string, string, string, string, string, string, string];
  ctaHeadlineAr: string;
  ctaHeadlineEn: string;
  ctaSubAr: string;
  ctaSubEn: string;
};
