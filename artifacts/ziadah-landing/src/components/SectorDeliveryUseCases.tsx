import { useState } from "react";
import { useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";

type TabId = "food" | "addons" | "bundle" | "grocery" | "pharmacy" | "rescue" | "freeship";

type VisRowDef =
  | { kind: "arrow"; textAr: string; textEn: string }
  | {
      kind: "row";
      icon?: string;
      className?: string;
      lineAr: string;
      lineEn: string;
      subAr?: string;
      subEn?: string;
      price?: string;
      tagAr?: string;
      tagEn?: string;
      tagClass?: string;
    };

type TabDef = {
  id: TabId;
  labelAr: string;
  labelEn: string;
  badgeAr: string;
  badgeEn: string;
  titleAr: string;
  titleEn: string;
  subAr: string;
  subEn: string;
  descAr: string;
  descEn: string;
  resultAr: string;
  resultEn: string;
  vis: VisRowDef[];
};

const TABS: TabDef[] = [
  {
    id: "food",
    labelAr: "طعام — بيع متقاطع",
    labelEn: "Food — Cross-sell",
    badgeAr: "بيع متقاطع — توصيل الطعام",
    badgeEn: "Cross-sell — Food Delivery",
    titleAr: "إضافة تكمّل الوجبة — في اللحظة الصح",
    titleEn: "Add-ons that complete the meal — at the right moment",
    subAr: "إكمال الوجبة في اللحظة المناسبة",
    subEn: "Completing the meal at the right moment",
    descAr:
      'عميل يشاهد بيتزا عائلية — زيادة يعرض مشروب 1 لتر + بطاطس ودجز كـ "يكمل طلبك" بزر إضافة مباشر بدون ما يغادر السياق.',
    descEn:
      'Customer views a family pizza — Ziadah shows a 1L drink + wedges as "completes your order" with a direct add button without leaving context.',
    resultAr: "الأثر: <strong>متوسط الطلب +34%</strong> — كل إضافة صغيرة تتراكم عبر آلاف الطلبات يومياً",
    resultEn: "Impact: <strong>AOV +34%</strong> — every small add-on stacks across thousands of daily orders",
    vis: [
      {
        kind: "row",
        icon: "🍕",
        className: "highlight-o",
        lineAr: "بيتزا عائلية — أُضيفت للسلة",
        lineEn: "Family pizza — added to cart",
        subAr: "الطلب الحالي",
        subEn: "Current order",
        price: "65 ر.س",
      },
      { kind: "arrow", textAr: 'زيادة يقترح: "يكمل طلبك"', textEn: 'Ziadah suggests: "completes your order"' },
      {
        kind: "row",
        icon: "🥤",
        lineAr: "مشروب 1 لتر",
        lineEn: "1L drink",
        subAr: "الأكثر طلباً مع البيتزا",
        subEn: "Most ordered with pizza",
        price: "10 ر.س",
        tagAr: "+ أضف",
        tagEn: "+ Add",
        tagClass: "tag-o",
      },
      {
        kind: "row",
        icon: "🍟",
        lineAr: "بطاطس ودجز",
        lineEn: "Wedges fries",
        subAr: "نسبة قبول 78% مع هذه الوجبة",
        subEn: "78% acceptance with this meal",
        price: "12 ر.س",
        tagAr: "+ أضف",
        tagEn: "+ Add",
        tagClass: "tag-g",
      },
    ],
  },
  {
    id: "addons",
    labelAr: "إضافات",
    labelEn: "Add-ons",
    badgeAr: "إضافات — لحظة الإضافة",
    badgeEn: "Add-ons — At cart add",
    titleAr: "إضافات فورية عند الضغط على الطلب",
    titleEn: "Instant add-ons at order press",
    subAr: "إضافات فورية في لحظة الطلب",
    subEn: "Instant add-ons at the order moment",
    descAr: "عند إضافة البرجر للسلة — تظهر إضافات سريعة (جبن إضافي، صوص خاص، بطاطس) دون مغادرة السياق.",
    descEn: "On burger add-to-cart — quick extras appear (extra cheese, special sauce, fries) without context switching.",
    resultAr: "الأثر: <strong>نسبة الإرفاق +35%</strong> على وجبات الطعام السريع",
    resultEn: "Impact: <strong>Attachment +35%</strong> on fast-food meals",
    vis: [
      { kind: "row", className: "highlight-o", lineAr: "برجر دبل — أُضيف للسلة", lineEn: "Double burger — added", subAr: "لحظة الإضافة", subEn: "Add moment", price: "35 ر.س" },
      { kind: "arrow", textAr: "إضافات تلقائية فورية", textEn: "Instant automatic add-ons" },
      { kind: "row", lineAr: "جبن إضافي", lineEn: "Extra cheese", subAr: "الأكثر إضافة", subEn: "Most added", price: "3 ر.س", tagAr: "+ أضف", tagEn: "+ Add", tagClass: "tag-o" },
      { kind: "row", lineAr: "صوص حار خاص", lineEn: "Special hot sauce", subAr: "مجاني مع كل طلب", subEn: "Free with every order", price: "0 ر.س", tagAr: "مجاني", tagEn: "Free", tagClass: "tag-g" },
    ],
  },
  {
    id: "bundle",
    labelAr: "حزمة / شراء معاً",
    labelEn: "Bundle / Buy Together",
    badgeAr: "حزمة / شراء معاً",
    badgeEn: "Bundle / Buy Together",
    titleAr: "حزمة وجبة مكتب — أكثر قيمة بسعر أقل",
    titleEn: "Office lunch bundle — more value for less",
    subAr: "حزمة غداء مكتب بسعر أفضل",
    subEn: "Office lunch bundle — better unit price",
    descAr: "سلة فردية — زيادة يقترح ترقية إلى حزمة غداء مكتب (ساندويتش + مشروب + حلى) بسعر مجمّع أفضل.",
    descEn: "Single-meal cart — Ziadah suggests upgrading to an office lunch bundle at better per-unit economics.",
    resultAr: "الأثر: <strong>متوسط الطلب +60%</strong> — الحزمة ترفع قيمة الطلب بشكل كبير",
    resultEn: "Impact: <strong>AOV +60%</strong> — bundles lift order value materially",
    vis: [
      { kind: "row", lineAr: "ساندويتش — في السلة", lineEn: "Sandwich — in cart", subAr: "الطلب الحالي", subEn: "Current order", price: "25 ر.س" },
      { kind: "arrow", textAr: "زيادة يقترح ترقية", textEn: "Ziadah suggests upgrade" },
      { kind: "row", className: "highlight-o", lineAr: "حزمة غداء مكتب — وفّر 18%", lineEn: "Office lunch bundle — save 18%", subAr: "ساندويتش + مشروب + حلى", subEn: "Sandwich + drink + dessert", tagAr: "-18%", tagEn: "-18%", tagClass: "tag-gold" },
    ],
  },
  {
    id: "grocery",
    labelAr: "بقالة — اشترِ أكثر ووفّر أكثر",
    labelEn: "Grocery — Buy More Save More",
    badgeAr: "اشترِ أكثر ووفّر أكثر — بقالة",
    badgeEn: "Buy More Save More — Grocery",
    titleAr: "خصومات الكمية في توصيل البقالة",
    titleEn: "Quantity discounts in grocery delivery",
    subAr: "عروض كمية في البقالة",
    subEn: "Quantity deals in grocery",
    descAr: "1 مشروب = سعر عادي، 2 = خصم 10%، 3 = خصم 15% + أولوية تحضير.",
    descEn: "1 drink = base, 2 = 10% off, 3 = 15% off + prep priority.",
    resultAr: "الأثر: <strong>حجم السلة +40%</strong> في منتجات الكميات",
    resultEn: "Impact: <strong>Basket size +40%</strong> on quantity SKUs",
    vis: [
      { kind: "row", lineAr: "مياه معدنية 1.5ل — واحدة", lineEn: "1.5L water — one", subAr: "السلة الحالية", subEn: "Current cart", price: "4 ر.س" },
      { kind: "arrow", textAr: "عرض كمية فوري", textEn: "Instant quantity offer" },
      { kind: "row", className: "highlight-o", lineAr: "3 عبوات — وفّر 15%", lineEn: "3 bottles — save 15%", subAr: "🔥 10.2 ر.س بدل 12 ر.س", subEn: "🔥 10.2 SAR instead of 12", tagAr: "-15%", tagEn: "-15%", tagClass: "tag-gold" },
    ],
  },
  {
    id: "pharmacy",
    labelAr: "صيدلية — منتجات ذات صلة",
    labelEn: "Pharmacy — Related",
    badgeAr: "منتجات ذات صلة — صيدلية",
    badgeEn: "Related Products — Pharmacy",
    titleAr: "منتجات يُنصح بها معاً",
    titleEn: "Products that pair clinically",
    subAr: "توصيات مكمّلة بسياق صحي",
    subEn: "Complementary health-context suggestions",
    descAr: "عميل يطلب مضاد حيوي — زيادة يقترح بروبيوتيك وفيتامين C كقيمة مكمّلة، لا كإعلان.",
    descEn: "Customer orders antibiotics — Ziadah suggests probiotics and Vitamin C as complementary value, not noise.",
    resultAr: "الأثر: <strong>نسبة الإرفاق +35%</strong> في الصيدلية",
    resultEn: "Impact: <strong>Attachment +35%</strong> in pharmacy",
    vis: [
      { kind: "row", className: "highlight-o", lineAr: "أموكسيسيلين 500مجم", lineEn: "Amoxicillin 500mg", subAr: "أُضيف للسلة", subEn: "Added to cart", price: "45 ر.س" },
      { kind: "arrow", textAr: "توصية ذكية مكمّلة", textEn: "Smart complementary suggestion" },
      { kind: "row", lineAr: "بروبيوتيك", lineEn: "Probiotic", subAr: "يُطلب مع المضاد عادة", subEn: "Often paired with antibiotics", tagAr: "+ أضف", tagEn: "+ Add", tagClass: "tag-g" },
      { kind: "row", lineAr: "فيتامين C — 1000مجم", lineEn: "Vitamin C — 1000mg", subAr: "يدعم المناعة", subEn: "Immunity support", tagAr: "+ أضف", tagEn: "+ Add", tagClass: "tag-g" },
    ],
  },
  {
    id: "rescue",
    labelAr: "استعادة السلات المتروكة",
    labelEn: "Cart rescue",
    badgeAr: "استعادة السلات المتروكة عند الحذف",
    badgeEn: "Remove-from-cart rescue",
    titleAr: "احتجز العميل قبل الحذف والخروج",
    titleEn: "Retain before removal and exit",
    subAr: "اعتراض قبل تأكيد الحذف",
    subEn: "Intercept before confirming removal",
    descAr: "عند حذف طبق رئيسي غالٍ — زيادة يقترح بديلاً أقل سعراً بنفس الفئة.",
    descEn: "When removing an expensive main — Ziadah suggests a lower-priced same-category alternative.",
    resultAr: "الأثر: <strong>استرداد 30%</strong> من جلسات الحذف",
    resultEn: "Impact: <strong>30% recovery</strong> from removal sessions",
    vis: [
      { kind: "row", className: "faded", lineAr: "ستيك لحم ممتاز", lineEn: "Premium steak", subAr: "❌ بصدد الحذف", subEn: "❌ About to remove", price: "89 ر.س" },
      { kind: "arrow", textAr: "زيادة يعترض فوراً", textEn: "Ziadah intercepts instantly" },
      { kind: "row", className: "highlight-g", lineAr: "دجاج مشوي — مواصفات قريبة", lineEn: "Grilled chicken — similar specs", subAr: "✅ وفّر 35 ر.س — تقييم 4.8", subEn: "✅ Save 35 SAR — 4.8★", price: "54 ر.س" },
    ],
  },
  {
    id: "freeship",
    labelAr: "شحن مجاني",
    labelEn: "Free delivery",
    badgeAr: "تذكير بقرب الشحن المجاني",
    badgeEn: "Free delivery nudge",
    titleAr: "يتبقى قليل للشحن المجاني — زيادة يسدّ الفجوة",
    titleEn: "Almost at free delivery — Ziadah fills the gap",
    subAr: "تجاوز عتبة الشحن",
    subEn: "Crossing the free-delivery threshold",
    descAr: "سلة 41 ر.س والحد 50 — اقتراح عنصر 9 ر.س يلغي رسوم التوصيل.",
    descEn: "Cart at 41 SAR, threshold 50 — a 9 SAR item clears the delivery fee.",
    resultAr: "الأثر: <strong>متوسط الطلب +15%</strong> — رابح للعميل وللمتجر",
    resultEn: "Impact: <strong>AOV +15%</strong> — win-win for shopper and store",
    vis: [
      { kind: "row", lineAr: "السلة — 41 ر.س", lineEn: "Cart — 41 SAR", subAr: "⚠️ أضف 9 ر.س للشحن المجاني", subEn: "⚠️ Add 9 SAR for free delivery", tagAr: "9 ر.س", tagEn: "9 SAR left", tagClass: "tag-o" },
      { kind: "arrow", textAr: "زيادة يقترح", textEn: "Ziadah suggests" },
      { kind: "row", className: "highlight-g", lineAr: "عصير طبيعي صغير", lineEn: "Small natural juice", subAr: "✅ يكسر حد الشحن المجاني", subEn: "✅ Breaks free-shipping threshold", price: "9 ر.س" },
    ],
  },
];

/** أخفّض عدد التبويبات — نفس السيناريوهات الأهم */
const TAB_ORDER: TabId[] = ["food", "addons", "grocery", "pharmacy", "rescue"];
const VISIBLE_TABS = TAB_ORDER.map((id) => TABS.find((t) => t.id === id)).filter((t): t is TabDef => t != null);

function VisRow({ row, isAr }: { row: VisRowDef; isAr: boolean }) {
  if (row.kind === "arrow") {
    return (
      <div className="sector-html-uc-arrow sh-en" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--td)", padding: "4px 0" }}>
        ↓ <span>{isAr ? row.textAr : row.textEn}</span>
      </div>
    );
  }
  const line = isAr ? row.lineAr : row.lineEn;
  const sub = isAr ? row.subAr : row.subEn;
  const tag = row.tagAr && row.tagEn ? (isAr ? row.tagAr : row.tagEn) : undefined;
  const icon = row.icon ?? "📦";
  const borderO = row.className === "highlight-o" ? "rgba(124,58,237,.35)" : row.className === "highlight-g" ? "rgba(0,212,160,.3)" : "var(--b2)";
  return (
    <div
      className={`sector-html-ucv-item ${row.className ?? ""}`.trim()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 12,
        border: `1px solid ${borderO}`,
        background: "var(--s1)",
        marginBottom: 4,
        opacity: row.className === "faded" ? 0.45 : 1,
        borderStyle: row.className === "faded" ? "dashed" : "solid",
      }}
    >
      <div style={{ fontSize: 22 }} aria-hidden>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--t)" }}>{line}</div>
        {sub ? (
          <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>{sub}</div>
        ) : null}
      </div>
      {row.price ? (
        <span className="sh-en" style={{ fontWeight: 800, color: "var(--p)", fontSize: 13 }}>
          {row.price}
        </span>
      ) : null}
      {tag ? (
        <span
          className={`sh-en sector-html-ucv-tag ${row.tagClass ?? ""}`}
          style={{
            fontSize: 11,
            padding: "3px 10px",
            borderRadius: 999,
            border: "1px solid var(--b2)",
            whiteSpace: "nowrap",
            background: row.tagClass === "tag-gold" ? "rgba(245,192,48,.12)" : row.tagClass === "tag-g" ? "rgba(0,212,160,.1)" : "rgba(124,58,237,.08)",
            color: row.tagClass === "tag-gold" ? "#f5c030" : row.tagClass === "tag-g" ? "#00d4a0" : "var(--p)",
          }}
        >
          {tag}
        </span>
      ) : null}
    </div>
  );
}

export default function SectorDeliveryUseCases() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].sectorsPage;
  const isAr = lang === "ar";
  const [tab, setTab] = useState<TabId>("food");

  const active = VISIBLE_TABS.find((x) => x.id === tab) ?? VISIBLE_TABS[0]!;

  return (
    <div id="section-usecases" className="gc rv d2" style={{ padding: 0, marginBottom: 16, scrollMarginTop: 120 }}>
      <div className="shine" />
      <div style={{ padding: "18px 22px 22px" }}>
        <p className="sh-en" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--tm)", marginBottom: 8 }}>
          {isAr ? "أمثلة حية" : "Live examples"}
        </p>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--p)", marginBottom: 6, marginTop: 0 }}>{tr.sectorSectionUseCases}</h2>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--td)", lineHeight: 1.6, maxWidth: 560 }}>
          {isAr ? "أهم السيناريوهات — يمكنك استكشاف الباقي من لوحة زيادة بعد التفعيل." : "Key scenarios — explore the rest in Ziadah after activation."}
        </p>

        <div className="sector-html-uc-tabs">
          {VISIBLE_TABS.map((x) => (
            <button
              key={x.id}
              type="button"
              className={`sector-html-uc-tab ${tab === x.id ? "sector-html-uc-tab--active" : ""}`.trim()}
              onClick={() => setTab(x.id)}
            >
              {isAr ? x.labelAr : x.labelEn}
            </button>
          ))}
        </div>

        <div className="sector-html-uc-panel sector-html-uc-panel--active">
          <div
            style={{
              background: "var(--s1)",
              border: "1px solid var(--b2)",
              borderRadius: 14,
              padding: "18px 20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, var(--p), color-mix(in srgb, var(--p) 60%, #f59e0b), transparent)",
              }}
            />
            <p className="sh-en" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--p)", marginBottom: 8 }}>
              {isAr ? active.badgeAr : active.badgeEn}
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", color: "var(--t)" }}>{isAr ? active.titleAr : active.titleEn}</h3>
            <span className="sh-en" style={{ fontSize: 12, color: "var(--p)", opacity: 0.85, display: "block", marginBottom: 12 }}>
              {isAr ? active.subAr : active.subEn}
            </span>
            <p style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.7, marginBottom: 16 }}>{isAr ? active.descAr : active.descEn}</p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,212,160,.2)",
                background: "rgba(0,212,160,.06)",
              }}
            >
              <span style={{ fontSize: 20 }} aria-hidden>
                📊
              </span>
              <div
                style={{ fontSize: 13, lineHeight: 1.55, color: "var(--t)" }}
                dangerouslySetInnerHTML={{ __html: isAr ? active.resultAr : active.resultEn }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {active.vis.map((row, i) => (
              <VisRow key={i} row={row} isAr={isAr} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
