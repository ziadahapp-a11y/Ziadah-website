/** Rich sector page blocks — unified template (hero, audience, why, AI, tracking, analytics, features, CTA) */

export type SectorPageLine = { ar: string; en: string };

/** Eleven feature rows — aligned with `sectorFeatureNames` order */
export type SectorFeatureRowTuple = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type SectorAiLayer = {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

/** Compact AI column (HTML playbook) — replaces four layer cards + signals */
export type SectorAiCompactPoint = {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

export type SectorWhyCardPlain = { emoji: string; textAr: string; textEn: string };
export type SectorWhyCardSplit = {
  emoji: string;
  titleAr: string;
  titleEn: string;
  lineAr: string;
  lineEn: string;
};
export type SectorWhyCard = SectorWhyCardPlain | SectorWhyCardSplit;

export type SectorQuickTip = { num: string; ar: string; en: string };

export type SectorMetric =
  | "aov"
  | "basketAov"
  | "attachment"
  | "ctr"
  | "cvr"
  | "margin"
  | "retention"
  | "rescue"
  | "recurring"
  | "gift";

export type SectorPageKpi = {
  ar: string;
  en: string;
  metric: SectorMetric;
};

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
  whyCards: SectorWhyCard[];
  aiProfileTagsAr: string;
  aiProfileTagsEn: string;
  aiRecsAr: [string, string, string];
  aiRecsEn: [string, string, string];
  aiSignalsAr?: [string, string, string, string];
  aiSignalsEn?: [string, string, string, string];
  analyticLinesAr?: [string, string, string, string, string];
  analyticLinesEn?: [string, string, string, string, string];
  /** The four headline numbers. `metric` names WHICH measure each one is, as
      data rather than as something to be guessed from the prose: the render
      used to sniff the string for keywords, and because the discriminating
      word ("Combo", "Bundle") only ever appeared in the English, the Arabic
      page fell through to the default and printed the same label twice. */
  analyticKpis: [SectorPageKpi, SectorPageKpi, SectorPageKpi, SectorPageKpi];
  featureHowAr: SectorFeatureRowTuple;
  featureHowEn: SectorFeatureRowTuple;
  ctaHeadlineAr: string;
  ctaHeadlineEn: string;
  ctaSubAr: string;
  ctaSubEn: string;

  /** Optional HTML-playbook layout (hero grid, phone mockup, AI layers, 4-col table, bars) */
  htmlLayout?: boolean;
  /** Phone mockup top bar label (defaults to delivery-app copy if omitted) */
  heroPhoneBarAr?: string;
  heroPhoneBarEn?: string;
  /** First hero CTA scroll target (default: section-how-to; delivery uses section-usecases) */
  heroPrimaryCtaTargetId?: string;
  heroBadgeAr?: string;
  heroBadgeEn?: string;
  /** Split headline: line 1 (plain) + line 2 (gradient). If omitted, single `heroHeadline*` is used. */
  heroHeadlineLine1Ar?: string;
  heroHeadlineLine1En?: string;
  heroHeadlineLine2Ar?: string;
  heroHeadlineLine2En?: string;
  heroFloatTag1Ar?: string;
  heroFloatTag1En?: string;
  heroFloatTag2Ar?: string;
  heroFloatTag2En?: string;
  audienceOwnerEyebrowAr?: string;
  audienceOwnerEyebrowEn?: string;
  audienceOwnerTitleAr?: string;
  audienceOwnerTitleEn?: string;
  audienceCustomerEyebrowAr?: string;
  audienceCustomerEyebrowEn?: string;
  audienceCustomerTitleAr?: string;
  audienceCustomerTitleEn?: string;
  audienceOwnerEmoji?: string;
  audienceCustomerEmoji?: string;
  /** Left column: four numbered AI layers (legacy HTML playbook) */
  aiLayers?: [SectorAiLayer, SectorAiLayer, SectorAiLayer, SectorAiLayer];
  /** Right column: three compact points; when set with htmlLayout, replaces aiLayers + signals */
  aiCompactPoints?: [SectorAiCompactPoint, SectorAiCompactPoint, SectorAiCompactPoint];
  /** Third column in feature table — activation touchpoints (same 11 rows as featureHow) */
  featureActivationAr?: SectorFeatureRowTuple;
  featureActivationEn?: SectorFeatureRowTuple;
  /** Bar chart values 0–100 for AOV / CTR / CVR / Margin (optional) */
  analyticBarPcts?: [number, number, number, number];
  /** Limit feature table rows (default: all 11) — keeps long pages scannable */
  featureTableLimit?: number;
  /** Show first 6 rows + toggle for 7–11 (overrides simple featureTableLimit when true) */
  featureTableExpandable?: boolean;
  /** Three tips above CTA (slim playbook) */
  quickTips?: [SectorQuickTip, SectorQuickTip, SectorQuickTip];
  /** When true, SectorDetail hides help/best/experience blocks; phase cards trim to 2 bullets */
  slimSectorPage?: boolean;
};
