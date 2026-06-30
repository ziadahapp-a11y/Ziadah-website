// Single source of truth for pricing plans + plan features.
// Both the Pricing page and the Home pricing teaser map from this, so the two
// can never drift apart. Values are bilingual { ar, en }; each consumer applies
// the i18n `t()` helper to pick the active language.

// Outbound CTA links used by the pricing plan buttons.
export const ZID_APP_URL = "https://apps.zid.sa/application/6842";
export const WHATSAPP_SUPPORT_URL = "https://wa.me/966510131856";

export type Bilingual = { ar: string; en: string };

export type PricingPlan = {
  name: Bilingual;
  monthly?: number;
  annual?: number;
  custom?: boolean;
  orders: { prefix: Bilingual; value: string };
  stores?: { prefix: Bilingual; value: Bilingual };
  popular: boolean;
};

export const ordersLabel: Bilingual = { ar: "طلب بالشهر", en: "orders/mo" };

export const pricingPlans: PricingPlan[] = [
  {
    name: { ar: "البداية", en: "Starter" },
    monthly: 1000,
    annual: 10000,
    orders: { prefix: { ar: "حتى", en: "Up to" }, value: "1200" },
    popular: false,
  },
  {
    name: { ar: "الأعمال", en: "Business" },
    monthly: 3000,
    annual: 30000,
    orders: { prefix: { ar: "حتى", en: "Up to" }, value: "3600" },
    popular: true,
  },
  {
    name: { ar: "التوسّع", en: "Scale-up" },
    monthly: 5000,
    annual: 50000,
    orders: { prefix: { ar: "حتى", en: "Up to" }, value: "6500" },
    popular: false,
  },
  {
    name: { ar: "المؤسسات", en: "Enterprise" },
    custom: true,
    orders: { prefix: { ar: "من", en: "From" }, value: "6500+" },
    stores: { prefix: { ar: "متاجر", en: "Add up to" }, value: { ar: "غير محدودة", en: "unlimited" } },
    popular: false,
  },
];

export const planFeatures: { ar: string[]; en: string[] } = {
  ar: [
    "ربط مع ميتا وتيك توك وسناب شات",
    "توجيه البيانات لحظياً",
    "إنفاق إعلاني غير محدود",
    "إيرادات غير محدودة",
  ],
  en: [
    "Integrate with Meta, TikTok & Snapchat",
    "Real-time forwarding of data",
    "Unlimited ad spend",
    "Unlimited revenue",
  ],
};
