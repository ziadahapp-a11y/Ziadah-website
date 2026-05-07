import { useState } from "react";
import PageShell from "@/components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import "./zid-apps-comparison.css";

type Bilingual = { ar: string; en: string };

type CellData = boolean | "plan" | Bilingual | number;

const tx = (b: Bilingual, lang: "ar" | "en") => (lang === "ar" ? b.ar : b.en);

const COPY = {
  h1: { ar: "مقارنة تطبيقات منصة زد", en: "Zid platform apps comparison" } as Bilingual,
  dateNote: { ar: "تمت المقارنة في تاريخ 2026/5/7", en: "Comparison as of May 7, 2026" } as Bilingual,
  featureCol: { ar: "الميزة", en: "Feature" } as Bilingual,
  bannerTitle: {
    ar: "كم يضيع عليك لو رحت مع غير زيادة؟",
    en: "How much could you lose by not choosing Ziyada?",
  } as Bilingual,
  bannerSub: {
    ar: "بناءً على أثر مبيعات الخصائص الموجودة في زيادة والغير موجودة عند التطبيقات الأخرى",
    en: "Based on the sales impact of features available in Ziyada and missing in the other apps",
  } as Bilingual,
  bannerLoss: { ar: "من المبيعات", en: "of sales" } as Bilingual,
  plan: { ar: "حسب الباقة", en: "Plan-based" } as Bilingual,
  manualOnly: { ar: "يدوي", en: "Manual" } as Bilingual,
  aiManual: {
    ar: "تلقائي (ذكاء اصطناعي) + يدوي",
    en: "Automatic (AI) + manual",
  } as Bilingual,
  smallDetails: { ar: "ثيمات سموول ديتايز", en: "Small Details themes" } as Bilingual,
  comprehensive: { ar: "شامل", en: "Comprehensive" } as Bilingual,
  limited: { ar: "محدود", en: "Limited" } as Bilingual,
  customDev: { ar: "دعم تطوير خصائص مخصصة للتاجر", en: "Custom feature development for merchants" } as Bilingual,
  scrollHint: { ar: "اسحب الجدول جانباً لعرض جميع التطبيقات", en: "Swipe the table sideways to see all apps" } as Bilingual,
  closingTitle: {
    ar: "قارنت؟ الآن جرّب زيادة على متجرك",
    en: "Compared the apps? Now try Ziadah on your store",
  } as Bilingual,
  closingDesc: {
    ar: "تفعيل سريع على زد أو سلة — نفس الخصائص التي رأيتها في الجدول.",
    en: "Fast activation on Zid or Salla — the same capabilities you saw in the table.",
  } as Bilingual,
} as const;

const APPS = [
  {
    nameAr: "زيادة",
    nameEn: "Ziyada",
    tint: "rgba(124, 58, 237, 0.1)",
    cellBg: "rgba(124, 58, 237, 0.05)",
    thBg: "linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)",
  },
  {
    nameAr: "نماء",
    nameEn: "Namaa",
    tint: "rgba(20, 184, 166, 0.1)",
    cellBg: "rgba(20, 184, 166, 0.05)",
    thBg: "linear-gradient(180deg, #f0fdfa 0%, #d1fae5 100%)",
  },
  {
    nameAr: "بووست",
    nameEn: "Boost",
    tint: "rgba(163, 230, 53, 0.12)",
    cellBg: "rgba(163, 230, 53, 0.06)",
    thBg: "linear-gradient(180deg, #f7fee7 0%, #ecfccb 100%)",
  },
  {
    nameAr: "تاسك اب",
    nameEn: "TaskUp",
    tint: "rgba(236, 72, 153, 0.1)",
    cellBg: "rgba(236, 72, 153, 0.05)",
    thBg: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)",
  },
  {
    nameAr: "رقمي",
    nameEn: "Raqmi",
    tint: "rgba(79, 70, 229, 0.1)",
    cellBg: "rgba(79, 70, 229, 0.05)",
    thBg: "linear-gradient(180deg, #eef2ff 0%, #e0e7ff 100%)",
  },
] as const;

const BANNER_PCTS: (string | null)[] = [null, "-60%", "-70%", "-80%", "-80%"];

type SectionRow = { kind: "section"; title: Bilingual };
type DataRow = { kind: "row"; label: Bilingual; cells: readonly CellData[] };
type BannerRow = { kind: "banner" };

type TableRow = SectionRow | DataRow | BannerRow;

const ROWS: TableRow[] = [
  { kind: "section", title: { ar: "إعداد الاقتراحات", en: "Proposal setup" } },
  {
    kind: "row",
    label: { ar: "طريقة عمل الاقتراحات في التطبيق", en: "How suggestions work in the app" },
    cells: [COPY.aiManual, COPY.aiManual, COPY.manualOnly, COPY.manualOnly, COPY.manualOnly],
  },
  { kind: "section", title: { ar: "الأساسيات", en: "Basics" } },
  {
    kind: "row",
    label: { ar: "تجربة مجانية", en: "Free trial" },
    cells: [true, true, true, true, true],
  },
  {
    kind: "row",
    label: { ar: "اقتراحات لا محدودة", en: "Unlimited suggestions" },
    cells: [true, true, "plan", true, true],
  },
  {
    kind: "row",
    label: { ar: "مبيعات لا محدودة", en: "Unlimited sales" },
    cells: [true, "plan", true, true, true],
  },
  {
    kind: "row",
    label: { ar: "مزامنة المنتجات", en: "Product sync" },
    cells: [true, true, true, true, true],
  },
  { kind: "banner" },
  { kind: "section", title: { ar: "العروض", en: "Offers" } },
  {
    kind: "row",
    label: { ar: "عرض المنتجات المقترحة", en: "Show suggested products" },
    cells: [true, true, true, true, true],
  },
  {
    kind: "row",
    label: { ar: "عرض الكميات", en: "Show quantities" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "عرض الكوبونات", en: "Show coupons" },
    cells: [true, true, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "عرض الوصول للشحن المجاني", en: "Show free shipping threshold" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "عرض استبدال المنتجات", en: "Show product replacement" },
    cells: [true, false, false, false, false],
  },
  { kind: "section", title: { ar: "مواقع الاقتراحات", en: "Suggestion locations" } },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات في صفحة المنتج", en: "Suggestions on product page" },
    cells: [true, true, COPY.smallDetails, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات بعد إضافة للمنتج", en: "After adding a product" },
    cells: [true, true, COPY.smallDetails, false, true],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات بعد حذف المنتج", en: "After removing a product" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات في صفحة السلة", en: "On cart page" },
    cells: [true, true, COPY.smallDetails, true, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات في الصفحة الرئيسية", en: "On home page" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات في صفحة التصنيفات", en: "On categories page" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات في صفحة الدفع", en: "On checkout page" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات بعد الدفع", en: "After payment" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "اقتراح المنتجات حسب قيمة السلة", en: "Based on cart value" },
    cells: [true, false, false, false, false],
  },
  { kind: "section", title: { ar: "المنتجات المشغلة", en: "Enabled products" } },
  {
    kind: "row",
    label: { ar: "جميع المنتجات", en: "All products" },
    cells: [true, true, true, true, true],
  },
  {
    kind: "row",
    label: { ar: "منتجات محددة", en: "Specific products" },
    cells: [true, false, true, false, true],
  },
  {
    kind: "row",
    label: { ar: "قيمة السلة", en: "Cart value" },
    cells: [true, false, false, false, false],
  },
  { kind: "section", title: { ar: "تصميم الاقتراحات", en: "Suggestion design" } },
  {
    kind: "row",
    label: { ar: "الألوان", en: "Colors" },
    cells: [true, true, true, true, true],
  },
  {
    kind: "row",
    label: { ar: "تخصيص الأزرار وتفاصيل المنتجات", en: "Customize buttons & product details" },
    cells: [true, false, false, false, false],
  },
  {
    kind: "row",
    label: { ar: "أشكال المنتجات", en: "Product layouts (count)" },
    cells: [3, 2, 1, 1, 1],
  },
  {
    kind: "row",
    label: { ar: "أشكال الاقتراحات", en: "Suggestion layouts (count)" },
    cells: [8, 2, 1, 1, 1],
  },
  { kind: "section", title: { ar: "التقارير والإحصائيات", en: "Reports & statistics" } },
  {
    kind: "row",
    label: { ar: "تحليلات عامة عن أداء كل المقترحات", en: "General analytics" },
    cells: [true, true, true, true, true],
  },
  {
    kind: "row",
    label: { ar: "تحليلات مفصلة لكل مقترح حسب المنتج", en: "Per-product detailed analytics" },
    cells: [true, true, false, false, false],
  },
  { kind: "section", title: { ar: "الخصائص المتطورة", en: "Advanced features" } },
  {
    kind: "row",
    label: { ar: "دعم الثيمات المخصصة", en: "Custom theme support" },
    cells: [COPY.comprehensive, COPY.limited, COPY.smallDetails, COPY.limited, COPY.limited],
  },
  {
    kind: "row",
    label: COPY.customDev,
    cells: ["plan", false, false, false, false],
  },
];

function CheckIcon() {
  return (
    <span
      className="zi-check-icon"
      style={{
        color: "#047857",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "999px",
        background: "linear-gradient(145deg, rgba(16, 185, 129, 0.14) 0%, rgba(5, 150, 105, 0.08) 100%)",
        border: "1px solid rgba(16, 185, 129, 0.22)",
      }}
      aria-hidden
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function CellContent({ value, lang }: { value: CellData; lang: "ar" | "en" }) {
  if (value === true) return <CheckIcon />;
  if (value === false) {
    return (
      <span style={{ color: "rgba(15,23,42,0.32)", fontWeight: 700, fontSize: 15 }} aria-label={lang === "ar" ? "غير متوفر" : "Not available"}>
        —
      </span>
    );
  }
  if (value === "plan") {
    return (
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#6d28d9",
          padding: "4px 8px",
          borderRadius: 7,
          background: "rgba(124, 58, 237, 0.1)",
          border: "1px solid rgba(124, 58, 237, 0.18)",
        }}
      >
        {tx(COPY.plan, lang)}
      </span>
    );
  }
  if (typeof value === "number") {
    return (
      <span
        style={{
          fontWeight: 800,
          fontSize: 16,
          color: "#0f172a",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    );
  }
  return (
    <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: "#334155" }}>{tx(value, lang)}</span>
  );
}

export default function ZidAppsComparison() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const pk = getPageKeywords("/zid-apps-comparison");
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  return (
    <>
      <SEO
        titleAr={t.ar.zidAppsComparisonPage.seoTitle}
        titleEn={t.en.zidAppsComparisonPage.seoTitle}
        descriptionAr={t.ar.zidAppsComparisonPage.seoDesc}
        descriptionEn={t.en.zidAppsComparisonPage.seoDesc}
        canonical="/zid-apps-comparison"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema
        items={[
          { name: isAr ? "الرئيسة" : "Home", url: "/" },
          { name: tx(COPY.h1, lang), url: "/zid-apps-comparison" },
        ]}
      />
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />
        <section
          className="zi-wrap zi-compare-shell"
          data-nav-backdrop="light"
          style={{
            position: "relative",
            zIndex: 2,
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(167, 139, 250, 0.22) 0%, transparent 55%), linear-gradient(180deg, #ede9fe 0%, #faf8ff 42%, #f5f3ff 78%, #f1f5f9 100%)",
            direction: dir,
          }}
        >
          <div className="page-hero-viewport page-hero-viewport--center">
            <div className="wrap" style={{ maxWidth: 1140, marginInline: "auto" }}>
              <header
              style={{
                marginBottom: 0,
                textAlign: "center",
              }}
            >
              <h1
                className="zi-compare-hero-title"
                style={{
                  fontSize: "clamp(28px, 3.8vw, 46px)",
                  fontWeight: 900,
                  margin: "0 0 14px",
                  letterSpacing: isAr ? 0 : -0.5,
                  color: "#1e1b4b",
                  lineHeight: 1.2,
                  textShadow: "0 1px 0 rgba(255,255,255,0.5), 0 18px 48px rgba(124, 58, 237, 0.12)",
                }}
              >
                {tx(COPY.h1, lang)}
              </h1>
              <div
                className="zi-compare-date-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  margin: 0,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6d28d9",
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.18)",
                  borderRadius: 999,
                  boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)",
                }}
              >
                {tx(COPY.dateNote, lang)}
              </div>
            </header>
          </div>
          </div>
          <div
            style={{
              paddingInline: "var(--page-inline-pad)",
              paddingBottom: "clamp(56px, 10vw, 88px)",
              position: "relative",
              zIndex: 2,
            }}
          >
          <div className="wrap" style={{ maxWidth: 1140, marginInline: "auto" }}>
            <div className="zi-compare-mobile-bleed">
            <p className="zi-compare-scroll-hint" style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: "#64748b", textAlign: "center", lineHeight: 1.4 }}>
              {tx(COPY.scrollHint, lang)}
            </p>

            <div
              className="zi-compare-scroll"
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "min(75vh, calc(100vh - 200px))",
                WebkitOverflowScrolling: "touch",
                borderRadius: 20,
                border: "1px solid rgba(124, 58, 237, 0.14)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.6) inset, 0 4px 6px rgba(30, 27, 75, 0.04), 0 20px 50px rgba(49, 46, 129, 0.1)",
                background: "linear-gradient(180deg, #ffffff 0%, #fafbff 100%)",
                padding: "clamp(6px, 1.5vw, 14px)",
              }}
            >
              <table
                className="zi-compare-table"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font)",
                  fontSize: 13,
                  lineHeight: 1.45,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "16px 14px",
                        textAlign: isAr ? "right" : "left",
                        fontWeight: 800,
                        color: "#475569",
                        fontSize: 12,
                        letterSpacing: isAr ? 0 : "0.02em",
                        textTransform: isAr ? "none" : "uppercase",
                        background: "linear-gradient(180deg, #f8fafc 0%, #e8eef5 100%)",
                        borderBottom: "2px solid rgba(124, 58, 237, 0.18)",
                        width: 200,
                        position: "sticky",
                        top: 0,
                        right: isAr ? 0 : "auto",
                        left: isAr ? "auto" : 0,
                        zIndex: 5,
                        boxShadow: isAr ? "-3px 0 12px rgba(15,23,42,0.06)" : "3px 0 12px rgba(15,23,42,0.06)",
                      }}
                    >
                      {tx(COPY.featureCol, lang)}
                    </th>
                    {APPS.map((app) => (
                      <th
                        key={app.nameAr}
                        style={{
                          padding: "16px 10px",
                          textAlign: "center",
                          fontWeight: 800,
                          color: "#312e81",
                          fontSize: 13,
                          letterSpacing: isAr ? 0 : "0.04em",
                          background: app.thBg,
                          borderBottom: "2px solid rgba(124, 58, 237, 0.18)",
                          minWidth: 100,
                          position: "sticky",
                          top: 0,
                          zIndex: 4,
                          boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.45), 0 2px 0 rgba(124, 58, 237, 0.1)",
                        }}
                      >
                        {lang === "ar" ? app.nameAr : app.nameEn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => {
                    if (row.kind === "section") {
                      return (
                        <tr key={`s-${ri}`}>
                          <td
                            colSpan={6}
                            style={{
                              padding: "16px 16px 16px 18px",
                              fontWeight: 800,
                              fontSize: 14,
                              color: "#4c1d95",
                              background: "linear-gradient(90deg, rgba(167, 139, 250, 0.22) 0%, rgba(237, 233, 254, 0.55) 48%, rgba(226, 232, 240, 0.35) 100%)",
                              borderTop: ri > 0 ? "1px solid rgba(124,58,237,0.12)" : undefined,
                              textAlign: isAr ? "right" : "left",
                              borderInlineStart: "4px solid #7c3aed",
                              letterSpacing: isAr ? 0 : "0.01em",
                            }}
                          >
                            {tx(row.title, lang)}
                          </td>
                        </tr>
                      );
                    }
                    if (row.kind === "banner") {
                      return (
                        <tr key={`b-${ri}`}>
                          <td colSpan={6} style={{ padding: 0, border: "none" }}>
                            <div
                              className="zi-compare-banner"
                              style={{
                                background: "linear-gradient(145deg, #312e81 0%, #1e0a3b 40%, #0f172a 100%)",
                                color: "#fff",
                                margin: "12px 4px",
                                padding: "28px 18px 24px",
                                textAlign: "center",
                                borderRadius: 16,
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 32px rgba(15, 23, 42, 0.35)",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0 0 10px",
                                  fontSize: "clamp(18px, 2.6vw, 24px)",
                                  fontWeight: 900,
                                  lineHeight: 1.35,
                                  textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                                }}
                              >
                                {tx(COPY.bannerTitle, lang)}
                              </p>
                              <p
                                style={{
                                  margin: "0 0 22px",
                                  fontSize: 13,
                                  opacity: 0.92,
                                  lineHeight: 1.65,
                                  maxWidth: 620,
                                  marginInline: "auto",
                                }}
                              >
                                {tx(COPY.bannerSub, lang)}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                  gap: 12,
                                  maxWidth: 920,
                                  marginInline: "auto",
                                }}
                              >
                                {APPS.map((app, i) => (
                                  <div
                                    key={app.nameAr}
                                    style={{
                                      textAlign: "center",
                                      flex: "1 1 72px",
                                      minWidth: 72,
                                      maxWidth: 140,
                                      padding: "10px 8px",
                                      borderRadius: 12,
                                      background: "rgba(255,255,255,0.06)",
                                      border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                  >
                                    {BANNER_PCTS[i] ? (
                                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fca5a5" }}>{BANNER_PCTS[i]}</div>
                                    ) : (
                                      <div style={{ fontSize: 13, opacity: 0.5 }}>—</div>
                                    )}
                                    <div style={{ fontSize: 10, opacity: 0.78, marginTop: 5 }}>{tx(COPY.bannerLoss, lang)}</div>
                                    <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 8, opacity: 0.95 }}>
                                      {lang === "ar" ? app.nameAr : app.nameEn}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    const zebra = ri % 2 === 0 ? "rgba(249, 250, 251, 0.92)" : "rgba(255, 255, 255, 0.96)";
                    return (
                      <tr key={`r-${ri}`} style={{ background: zebra, transition: "background 0.12s ease" }}>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontWeight: 600,
                            color: "#334155",
                            fontSize: 13,
                            borderBottom: "1px solid rgba(15,23,42,0.07)",
                            verticalAlign: "middle",
                            textAlign: isAr ? "right" : "left",
                            background: zebra,
                            position: "sticky",
                            right: isAr ? 0 : "auto",
                            left: isAr ? "auto" : 0,
                            zIndex: 2,
                            boxShadow: isAr ? "-4px 0 12px rgba(15,23,42,0.05)" : "4px 0 12px rgba(15,23,42,0.05)",
                          }}
                        >
                          {tx(row.label, lang)}
                        </td>
                        {row.cells.map((cell, ci) => (
                          <td
                            key={ci}
                            style={{
                              padding: "13px 10px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              borderBottom: "1px solid rgba(15,23,42,0.07)",
                              background: APPS[ci].cellBg,
                            }}
                          >
                            <CellContent value={cell} lang={lang} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            </div>
          </div>
          </div>
        </section>
        <PageClosingCta
          title={tx(COPY.closingTitle, lang)}
          description={tx(COPY.closingDesc, lang)}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
