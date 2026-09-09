import type { ReactElement } from "react";
import { useState } from "react";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "@/components/PlatformModal";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/sectorHtmlPage.css";
import {
  PhoneFrame, WidgetShell, ProductList, ProductRow, WidgetButton, WidgetTag,
  WidgetHint, Totals, ProgressMeter, Price,
} from "@/components/widgets/kit";

/* ─────────────────────────────────────────────────────────────────
   Use-Case Pages Showcase
   Uses the same sector-html CSS system (phone shell, floating tags,
   scan animation, badge, hero-grid, CTA buttons).
───────────────────────────────────────────────────────────────── */

interface ShowcaseCase {
  icon: string;
  titleAr: string;
  titleEn: string;
  gradLineAr: string; // second line rendered as gradient text
  gradLineEn: string;
  tagAr: string;
  tagEn: string;
  descAr: string;
  descEn: string;
  bulletAr: string[];
  bulletEn: string[];
  float1Ar: string;
  float1En: string;
  float2Ar: string;
  float2En: string;
  accentColor: string;
  href: string;
  MockupContent: () => ReactElement;
}

/* ─── phone inner content components ─── */


/* ── PRODUCT PAGE ── */
export function ProductPageMockup() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="مسبحة باكليت حمراء"
      subtitle="اشترِ أكثر ووفّر أكثر"
      footer={<WidgetButton block>أضف للسلة</WidgetButton>}
    >
      <div className="wk-tiers">
        {[
          { q: "قطعة واحدة", p: "200", off: null as string | null, best: false },
          { q: "قطعتان", p: "320", off: "خصم 20%", best: false },
          { q: "3 قطع", p: "420", off: "خصم 30%", best: true },
        ].map((t, i) => (
          <div key={i} className={`wk-tier${t.best ? "is-sel" : ""}`}>
            <span className="wk-meta">
              <strong>{t.q}</strong>
              {t.best ? <WidgetTag tone="save">أفضل قيمة</WidgetTag> : null}
            </span>
            <span className="wk-meta">
              {t.off ? <WidgetTag>{t.off}</WidgetTag> : null}
              <Price value={t.p} currency={cur} size={13} />
            </span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

/* ── CART PAGE ── */
function CartPageContent() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="سلتك (منتجان)"
      footer={<WidgetButton block>إتمام الطلب</WidgetButton>}
    >
      <ProductList>
        <ProductRow name="مسبحة باكليت" price="200" currency={cur} />
        <ProductRow name="بخور عود أصيل" price="95" currency={cur} />
      </ProductList>
      <ProgressMeter pct={84} note="أضف 55 ر.س للشحن المجاني" />
      <WidgetHint>منتجات ذات صلة</WidgetHint>
      <ProductList>
        <ProductRow name="زيت بخور" price="75" currency={cur} />
        <ProductRow name="حقيبة هدية" price="35" currency={cur} />
      </ProductList>
    </WidgetShell>
  );
}

/* ── CHECKOUT PAGE ── */
function CheckoutPageContent() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="ملخص الطلب"
      subtitle="أضف قبل إتمام الطلب"
      footer={<WidgetButton block>إتمام الطلب الآن</WidgetButton>}
    >
      <ProductList>
        <ProductRow name="تغليف هدية فاخر" price="15" currency={cur} />
        <ProductRow name="ضمان إضافي سنة" price="25" currency={cur} />
      </ProductList>
    </WidgetShell>
  );
}

/* ── THANK YOU PAGE ── */
function ThankYouPageContent() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="تم تأكيد طلبك"
      subtitle="رقم الطلب ZD-4821"
      footer={<WidgetButton block>اطلب مجدداً</WidgetButton>}
    >
      <WidgetHint>قد يعجبك أيضاً</WidgetHint>
      <ProductList>
        <ProductRow name="بخور فاخر" price="85" currency={cur} />
        <ProductRow name="زيت أرجان طبيعي" price="120" currency={cur} />
      </ProductList>
      <Totals rows={[{ k: "رصيد نقاطك", v: <strong>580</strong>, total: true }]} />
    </WidgetShell>
  );
}

/* ── HOME PAGE ── */
function HomePageContent() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="مرحباً عمر"
      subtitle="مقترح لك بناءً على مشترياتك"
      footer={<WidgetButton block>تصفّح المقترحات</WidgetButton>}
    >
      <ProductList>
        <ProductRow name="زيت بخور" price="75" currency={cur} />
        <ProductRow name="طقم هدايا" price="150" currency={cur} />
        <ProductRow name="حرز فضة" price="90" currency={cur} />
      </ProductList>
    </WidgetShell>
  );
}

/* ── CATEGORY PAGE ── */
function CategoryPageContent() {
  const cur = "ر.س";
  return (
    <WidgetShell
      title="تكمّل بعضها — اشترِ معاً"
      subtitle="مسبحة + بخور معاً"
      footer={
        <WidgetButton block>
          أضف الطقم
          <span className="wk-btn-num">
            <bdi>385</bdi> {cur}
          </span>
        </WidgetButton>
      }
    >
      <ProductList>
        <ProductRow name="مسبحة كهرمان" price="320" currency={cur} selected />
        <ProductRow name="حرز فضة" price="180" currency={cur} />
        <ProductRow name="سجادة صلاة" price="95" currency={cur} />
        <ProductRow name="بخور عربي" price="65" currency={cur} />
      </ProductList>
    </WidgetShell>
  );
}

/* ── ALL PAGES ── */
function AllPagesContent() {
  const pages = [
    "الصفحة الرئيسية",
    "صفحة التصنيف",
    "صفحة المنتج",
    "السلة",
    "الدفع",
    "صفحة الشكر",
  ];
  return (
    <WidgetShell title="منطق واحد — تغطية كاملة" subtitle="نفس المحرّك على كل صفحة">
      <ul className="wk-facts">
        {pages.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </WidgetShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CASE DATA
───────────────────────────────────────────── */
const CASES: ShowcaseCase[] = [
  {
    icon: "",
    titleAr: "صفحة المنتج",
    titleEn: "Product Page",
    gradLineAr: "أعلى نقطة تأثير",
    gradLineEn: "Highest-impact moment",
    tagAr: "في لحظة تأمّل المنتج",
    tagEn: "While browsing products",
    descAr: "في اللحظة التي يتأمل فيها العميل المنتج، تبدأ زيادة بتقديم عرض يكمّل تجربته ويرفع قيمة طلبه — تلقائياً وبدون تدخل.",
    descEn: "The moment a customer views a product, Ziadah suggests the perfect complement to lift order value — automatically.",
    bulletAr: ["اشترِ أكثر ووفّر أكثر — عروض كمية ذكية", "اشترِ معاً — منتجات متوافقة في عرض واحد", "Bundle Deals — كومبو بسعر خاص", "Upsell — اقترح الخيار الأعلى قيمة"],
    bulletEn: ["Buy More Save More — smart quantity offers", "Buy Together — compatible items in one deal", "Bundle Deals — combo at a special price", "Upsell — recommend the higher-value option"],
    float1Ar: "+32% متوسط السلة",
    float1En: "+32% avg order value",
    float2Ar: "اشترِ أكثر ووفّر",
    float2En: "Buy More Save More",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/product-page",
    MockupContent: ProductPageMockup,
  },
  {
    icon: "",
    titleAr: "صفحة السلة",
    titleEn: "Cart Page",
    gradLineAr: "قبل إتمام الطلب",
    gradLineEn: "Before checkout",
    tagAr: "آخر فرصة لرفع القيمة",
    tagEn: "Last chance to lift AOV",
    descAr: "السلة هي آخر فرصة لرفع قيمة الطلب قبل الإتمام — نعرض منتجات ذات صلة وشريط الشحن المجاني لتحفيز الإضافة.",
    descEn: "The cart is the last chance to increase order value — we show related products and a free-shipping nudge to encourage adding more.",
    bulletAr: ["شريط الشحن المجاني — وضّح المسافة المتبقية", "منتجات ذات صلة — اقتراحات مباشرة في السلة", "كوبونات الخصم — احتفظ بالعميل داخل السلة"],
    bulletEn: ["Free shipping bar — show the remaining threshold", "Related products — contextual in-cart suggestions", "Discount coupons — keep the customer engaged"],
    float1Ar: "شحن مجاني عند 350 ر.س",
    float1En: "Free shipping at 350 SAR",
    float2Ar: "+18% قيمة الطلب",
    float2En: "+18% order value",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/cart",
    MockupContent: CartPageContent,
  },
  {
    icon: "",
    titleAr: "صفحة الدفع",
    titleEn: "Checkout Page",
    gradLineAr: "اللحظة الأخيرة",
    gradLineEn: "Last-step offers",
    tagAr: "إضافات بنقرة واحدة",
    tagEn: "One-tap add-ons",
    descAr: "في لحظة إتمام الدفع، نعرض إضافات خفيفة وخدمات تكميلية تُضاف بنقرة واحدة — دون الخروج من تدفق الدفع.",
    descEn: "At the checkout moment, we surface light add-ons and services added with a single tap — without leaving the payment flow.",
    bulletAr: ["Add-ons — خيارات إضافية بنقرة واحدة", "تغليف الهدايا والضمان — خدمات تكميلية", "عروض الشحن السريع — تحفيز اتخاذ القرار"],
    bulletEn: ["Add-ons — one-tap extras", "Gift wrap & warranty — upsell services", "Express shipping offers — decision nudge"],
    float1Ar: "Add-ons بنقرة",
    float1En: "One-tap add-ons",
    float2Ar: "إتمام أسرع",
    float2En: "Faster checkout",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/checkout",
    MockupContent: CheckoutPageContent,
  },
  {
    icon: "",
    titleAr: "صفحة الشكر",
    titleEn: "Thank-You Page",
    gradLineAr: "بعد الشراء",
    gradLineEn: "Post-purchase",
    tagAr: "العميل في قمة رضاه",
    tagEn: "Customer satisfaction peak",
    descAr: "بعد إتمام الطلب العميل في قمة رضاه — هذه هي اللحظة المثالية لاقتراح ما يُكمل مشتراه ويبني علاقة طويلة الأمد.",
    descEn: "After purchase, satisfaction is at its peak — the perfect moment to suggest complementary products and build loyalty.",
    bulletAr: ["منتجات مقترحة بناءً على ما اشتراه", "برامج الولاء — بناء علاقة مستدامة", "عروض الشراء المتكرر — حوّله لعميل دائم"],
    bulletEn: ["Post-purchase recommendations", "Loyalty programs — build lasting relationships", "Repeat purchase offers — turn buyers into regulars"],
    float1Ar: "ولاء وتكرار",
    float1En: "Loyalty & retention",
    float2Ar: "⭐ اقتراحات ذكية",
    float2En: "⭐ Smart suggestions",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/thank-you",
    MockupContent: ThankYouPageContent,
  },
  {
    icon: "",
    titleAr: "الصفحة الرئيسية",
    titleEn: "Home Page",
    gradLineAr: "أول انطباع مخصص",
    gradLineEn: "Personalized first touch",
    tagAr: "كل زائر يرى ما يناسبه",
    tagEn: "Every visitor sees their own",
    descAr: "كل زائر يرى نسخة مخصصة من الصفحة الرئيسية — توصيات تعكس اهتماماته وسلوكه السابق لزيادة التفاعل من اللحظة الأولى.",
    descEn: "Every visitor sees a tailored home page — recommendations reflecting their interests and history to drive engagement from the first second.",
    bulletAr: ["توصيات مخصصة حسب سلوك الزائر", "بانرات موسمية ذكية تتكيف تلقائياً", "منتجات العودة — لمن زار ولم يشترِ"],
    bulletEn: ["Personalized recommendations per visitor", "Smart seasonal banners that auto-adapt", "Return-visit products — for browsers who didn't buy"],
    float1Ar: "تخصيص آني",
    float1En: "Real-time personalization",
    float2Ar: "كل زائر مختلف",
    float2En: "Every visitor is unique",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/home",
    MockupContent: HomePageContent,
  },
  {
    icon: "",
    titleAr: "صفحة التصنيف",
    titleEn: "Category Page",
    gradLineAr: "في منتصف رحلة الاكتشاف",
    gradLineEn: "Mid-discovery journey",
    tagAr: "الاكتشاف يفتح الباب للتوصيات",
    tagEn: "Discovery opens the door",
    descAr: "في لحظة تصفح التصنيف يكون العميل منفتحاً على الاكتشاف — نعرض منتجات تكمّل بعضها وعروض اشترِ معاً لرفع قيمة الاختيار.",
    descEn: "Category browsers are open to discovery — we surface complementary bundles and Buy Together offers to lift basket value.",
    bulletAr: ["اشترِ معاً — توصيات مترابطة داخل التصنيف", "منتجات مقترحة حسب الفئة المختارة", "عروض الحزمة في بطاقة المنتج مباشرة"],
    bulletEn: ["Buy Together — cross-category recommendations", "Suggestions based on the selected category", "Bundle offer shown directly in product cards"],
    float1Ar: "اشترِ معاً",
    float1En: "Buy Together",
    float2Ar: "+24% قيمة الاختيار",
    float2En: "+24% basket value",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/category",
    MockupContent: CategoryPageContent,
  },
  {
    icon: "",
    titleAr: "جميع الصفحات",
    titleEn: "All Pages",
    gradLineAr: "تغطية شاملة",
    gradLineEn: "Full-store coverage",
    tagAr: "منطق واحد — كل صفحة",
    tagEn: "One logic — every page",
    descAr: "منطق واحد يُفعَّل عبر كامل المتجر — من الصفحة الرئيسية حتى الشكر — لضمان تجربة متسقة في كل نقطة تماس مع العميل.",
    descEn: "One logic layer activated across your full store — from home to thank-you — ensuring a consistent experience at every touchpoint.",
    bulletAr: ["قاعدة واحدة تعمل في كل صفحة", "تحكم مركزي — لوحة إدارة موحدة", "تقارير مجمّعة لأداء كل صفحة"],
    bulletEn: ["One rule works across every page", "Central control — unified dashboard", "Aggregated reports for every page's performance"],
    float1Ar: "منطق واحد",
    float1En: "One unified logic",
    float2Ar: "تغطية كاملة",
    float2En: "Full-store coverage",
    accentColor: "var(--ziadah-violet)",
    href: "/use-cases/all-pages",
    MockupContent: AllPagesContent,
  },
];

/* ─────────────────────────────────────────────────────────────────
   ROW — uses sector-html-hero-grid + sector-html-phone-wrap
───────────────────────────────────────────── */
function UseCaseRow({
  c, idx, isAr, onActivate,
}: {
  c: ShowcaseCase;
  idx: number;
  isAr: boolean;
  onActivate: () => void;
}) {
  const title = isAr ? c.titleAr : c.titleEn;
  const gradLine = isAr ? c.gradLineAr : c.gradLineEn;
  const tag = isAr ? c.tagAr : c.tagEn;
  const desc = isAr ? c.descAr : c.descEn;
  const bullets = isAr ? c.bulletAr : c.bulletEn;
  const float1 = isAr ? c.float1Ar : c.float1En;
  const float2 = isAr ? c.float2Ar : c.float2En;
  const learnMore = isAr ? "تفاصيل" : "Details";
  const activateLabel = isAr ? "فعّل الآن" : "Activate";
  const reverse = idx % 2 === 1;

  return (
    <div
      className={`rv d${(idx % 3) + 1}`}
      style={{
        borderBottom: "1px solid var(--b1)",
        padding: "clamp(40px,5vw,72px) 0",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <div
        className="sector-html-hero-grid"
        style={{ maxWidth: "100%" }}
      >
        {/* ── TEXT column ── */}
        <div style={{ order: reverse ? 2 : 1 }}>
          <div className="sector-html-badge">
            {c.icon} {tag}
          </div>

          <h3 className="sector-html-hero-h">
            {title}
            <br />
            <span className="sector-html-grad">{gradLine}</span>
          </h3>

          <p className="sector-html-hero-sub">{desc}</p>

          {/* bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 28 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: "color-mix(in srgb, var(--p) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--p) 28%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  <span style={{ fontSize: 12, color: "var(--p)" }}>✓</span>
                </div>
                <span style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>

          <div className="sector-html-cta-row">
            <button
              type="button"
              className="sector-html-btn sector-html-btn--fire"
              onClick={onActivate}
            >
              🚀 {activateLabel}
            </button>
            <button
              type="button"
              className="sector-html-btn sector-html-btn--ghost"
              onClick={() => navigateTo(c.href)}
            >
              {learnMore} →
            </button>
          </div>
        </div>

        {/* ── VISUAL column (phone + floating tags) ── */}
        <div style={{ order: reverse ? 1 : 2 }}>
          <div className="sector-html-phone-wrap">
            {/* floating tag 1 */}
            <div className="sector-html-ftag sector-html-ftag--1">
              <span className="sector-html-fdot sector-html-fdot--g" />
              <span>{float1}</span>
            </div>

            {/* phone shell */}
            <div className="sector-html-phone">
              <div className="sector-html-phone-inner">
                <c.MockupContent />
              </div>
            </div>

            {/* floating tag 2 */}
            <div className="sector-html-ftag sector-html-ftag--2">
              <span className="sector-html-fdot sector-html-fdot--gold" />
              <span>{float2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO PHONE WRAPPER — for use as heroVisual in individual pages
   Wraps content in sector-html-phone + floating tags
───────────────────────────────────────────── */
export function PageHeroPhone({
  children,
  float1,
  float2,
}: {
  children: React.ReactNode;
  float1?: string;
  float2?: string;
}) {
  /* The frame is the kit's now. What it used to be: `.sector-html-phone`,
     which carries a gold-to-cyan gradient strip across its top edge and a
     coloured glow behind the device, wrapping a body whose own rows were grey
     on grey. The two floating tags stay - they are the one thing on this
     composition that states a number - but they are captions, not glowing
     pills with a coloured dot. */
  return (
    <div className="ucp-stage">
      {float1 ? <p className="ucp-float ucp-float--1">{float1}</p> : null}
      <PhoneFrame>{children}</PhoneFrame>
      {float2 ? <p className="ucp-float ucp-float--2">{float2}</p> : null}
    </div>
  );
}

/** Generic in-phone preview when a use-case page has no custom `heroVisual`. */
export function UseCaseGenericHeroMock({
  hero,
  stats,
}: {
  hero: { icon: string; title: string; tagline: string };
  stats: Array<{ value: string; label: string; color?: string }>;
}) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  /* `hero.icon` is deliberately unread. It is an emoji, and a 28px emoji at
     the top of a storefront screen is the tell this whole pass is removing.
     The headline says what the screen is. */
  return (
    <WidgetShell
      title={hero.title}
      subtitle={hero.tagline}
      footer={<WidgetButton block>{isEn ? "Smart offers on" : "فعّل العروض الذكية"}</WidgetButton>}
    >
      <WidgetHint>{isEn ? "Live insights" : "مؤشرات مباشرة"}</WidgetHint>
      <Totals
        rows={stats.slice(0, 2).map((st) => ({ k: st.label, v: <strong>{st.value}</strong> }))}
      />
    </WidgetShell>
  );
}

/** Default hero phone + tags for any solution page without a custom visual. */
export function DefaultUseCaseHeroPhone({
  hero,
  stats,
}: {
  hero: { icon: string; title: string; tagline: string };
  stats: Array<{ value: string; label: string; color?: string }>;
}) {
  /* No floating tags here. They were built from `stats[0]` and `stats[1]`,
     which is exactly what the phone below renders - so every solution page
     stated each number twice, once inside the screen and once on a pill
     beside it. The phone is the product; a pill repeating its contents is
     noise. `PageHeroPhone` keeps the floats optional for the pages that have
     something else to say. */
  return (
    <PageHeroPhone>
      <UseCaseGenericHeroMock hero={hero} stats={stats} />
    </PageHeroPhone>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
export default function UseCasePagesShowcase({ isAr }: { isAr: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const isArLang = lang === "ar";
  const effectiveIsAr = isAr ?? isArLang;

  return (
    <>
    <section
      className="sector-html"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "0 var(--page-inline-pad) 80px",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        {/* heading */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="sector-html-badge" style={{ margin: "0 auto 16px" }}>
            {effectiveIsAr ? "حالات الاستخدام — حسب الصفحة" : "Use Cases — By Page"}
          </div>
          <h2
            className="sector-html-hero-h"
            style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 14px" }}
          >
            {effectiveIsAr ? "كيف تعمل زيادة في" : "How Ziadah Works on"}
            <span className="sector-html-grad">
              {effectiveIsAr ? "كل صفحة من متجرك" : "Every Page of Your Store"}
            </span>
          </h2>
          <p
            className="sector-html-hero-sub"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: 560 }}
          >
            {effectiveIsAr
              ? "من أول لحظة يدخل فيها العميل حتى بعد إتمام طلبه — لكل صفحة دور واضح في رفع قيمة التجربة."
              : "From the first visit to post-checkout — every page plays a clear role in lifting experience value."}
          </p>
        </div>

        {/* rows */}
        {CASES.map((c, i) => (
          <UseCaseRow key={c.href} c={c} idx={i} isAr={effectiveIsAr} onActivate={() => setModalOpen(true)} />
        ))}
      </div>
    </section>
    <PlatformModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
