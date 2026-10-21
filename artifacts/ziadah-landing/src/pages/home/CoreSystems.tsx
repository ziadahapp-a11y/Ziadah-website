import { useRef } from "react";
import { Link } from "wouter";
import {
  BadgeCheck, CreditCard, FileText, FolderTree, Headphones, Plug, Receipt, ShieldCheck,
  ShoppingCart, Timer, Zap,
} from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { sectionTheme } from "@/sections";
import { FEATURE_COUNT } from "@/lib/features-data";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { BoardHead } from "./BentoBoard";
import { BoardArt } from "./BoardArt";

/* The merchants whose logos run under the proof band: the same claim as the
   count above them, with names on it. */
const storeLogos = [
  { name: "BestClean", src: "/logos/bestclean.png" },
  { name: "Reeq Alnahl", src: "/logos/reeq-alnahl.png" },
  { name: "Altamimi", src: "/logos/altamimi.png" },
  { name: "ZUM", src: "/logos/zum.png" },
  { name: "CB", src: "/logos/cb.png" },
  { name: "12 CUPS", src: "/logos/12cups.png" },
  { name: "RIBAL", src: "/logos/ribal.png" },
  { name: "SHFT", src: "/logos/shft.png" },
  { name: "FOR HER", src: "/logos/for-her.png" },
  { name: "Abaq Alghim", src: "/logos/abaq-alghim.png" },
  { name: "FABIAN", src: "/logos/fabian.png" },
  { name: "Natural Touch", src: "/logos/natural-touch.png" },
  { name: "image_223", src: "/logos/image-223.png" },
  { name: "Mazeed", src: "/logos/mazeed.png" },
  { name: "AlSalman Oud", src: "/logos/alsalman-oud.png" },
  { name: "PC Palace", src: "/logos/pc-palace.png" },
];

/**
 * WHAT THE APP DOES, IN THREE LAYERS.
 *
 * This was a bento: eight tiles of three different shapes and four tones
 * scattered across two offset columns, so a reader could not tell where one
 * argument ended and the next began. A capability, a statistic and a guarantee
 * all looked alike and sat wherever the grid put them.
 *
 * Now each kind of claim has one place, read top to bottom:
 *
 *   1  WHAT IT DOES    four equal cards, one row, each with its own product
 *                      surface. The only place art appears.
 *   2  PROOF           one band of four numbers, then the stores' logos.
 *   3  HOW IT FITS     three plain lists: where it appears, how it connects,
 *                      what is guaranteed. No art, no tones, just rows.
 *
 * Every claim from the bento survives; none was added. The sizes are px and
 * the shared type tokens, as on the rest of the page.
 */
export function CoreSystems() {
  const t = useT();
  const logosRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosRef);

  const caps = [
    {
      key: "suggestions",
      title: t({ ar: "اقتراح شخصي لكل عميل", en: "A personal suggestion for every shopper" }),
      support: t({
        ar: "تطبيق زيادة يقرأ تصفّح العميل وطلباته السابقة ويقترح ما يناسبه فعلاً - لا نفس القائمة للجميع.",
        en: "The Ziadah app reads each shopper's browsing and past orders and suggests what genuinely fits - not the same list for everyone.",
      }),
    },
    {
      key: "bundle",
      title: t({ ar: "منتجات تُشترى معاً، كحزمة بنقرة", en: "Bought-together items, as a one-click bundle" }),
      support: t({
        ar: "المنتجات التي تُشترى مع بعضها في متجرك تُعرض كحزمة بسعر واحد.",
        en: "Items that sell together in your store are shown as one bundle at one price.",
      }),
    },
    {
      key: "placements",
      title: t({ ar: "ترقية في السلة والدفع", en: "An upgrade at the cart and at checkout" }),
      support: t({
        ar: "ضمان، إضافة صغيرة، أو «أكمل لـ200 وخذ شحن مجاني» - قبل ما يخلص الشراء، لا بعده.",
        en: "A warranty, a small add-on, or \u201creach 200 for free shipping\u201d - before the purchase ends, not after it.",
      }),
    },
    {
      key: "performance",
      title: t({ ar: "يتعلّم من كل طلب ويعيد الترتيب", en: "It learns from every order and reorders itself" }),
      support: t({
        ar: "كل نقرة وكل طلب يغذّي التطبيق، فيعرف أي مكان عرض يحوّل أعلى ويرفعه تلقائياً.",
        en: "Every click and order feeds the app, so it learns which placement converts best and promotes it on its own.",
      }),
    },
  ];

  const stats = [
    { v: "+1,500", k: t({ ar: "متجر يشغّل زيادة اليوم", en: "stores run Ziadah today" }) },
    { v: t({ ar: "+20M ر.س", en: "+SAR 20M" }), k: t({ ar: "مبيعات إضافية للتجار", en: "extra sales for merchants" }) },
    { v: "+200K", k: t({ ar: "طلب فيه منتج مقترح", en: "orders with a suggested item" }) },
    { v: "+40M", k: t({ ar: "مرة عُرض فيها اقتراح", en: "times a suggestion was shown" }) },
  ];

  type Row = { Icon: typeof FileText; title: string; support: string };
  const cols: { title: string; rows: Row[] }[] = [
    {
      title: t({ ar: "أين يظهر", en: "Where it appears" }),
      rows: [
        { Icon: FileText, title: t({ ar: "صفحة المنتج", en: "Product page" }), support: t({ ar: "مرحلة الاهتمام", en: "The consideration moment" }) },
        { Icon: ShoppingCart, title: t({ ar: "صفحة السلة", en: "Cart page" }), support: t({ ar: "آخر فرصة قبل الدفع", en: "The last chance before checkout" }) },
        { Icon: CreditCard, title: t({ ar: "صفحة الدفع", en: "Checkout" }), support: t({ ar: "العميل ملتزم بالشراء", en: "The shopper is committed" }) },
        { Icon: FolderTree, title: t({ ar: "صفحة الفئة", en: "Category page" }), support: t({ ar: "وهو يتصفّح ويقارن", en: "While they browse and compare" }) },
      ],
    },
    {
      title: t({ ar: "كيف يتصل", en: "How it connects" }),
      rows: [
        { Icon: Plug, title: t({ ar: "موصّل جاهز لزد وسلة", en: "A ready-made connector for Zid and Salla" }), support: t({ ar: "تثبيت بنقرة من لوحة المنصة، وبدون تغيير في قالب متجرك", en: "One click from the platform's dashboard, no change to your theme" }) },
        { Icon: Zap, title: t({ ar: "يشتغل خلال دقائق", en: "Running in minutes" }), support: t({ ar: "بدون مطوّر", en: "With no developer" }) },
        { Icon: ShieldCheck, title: t({ ar: "بياناتك تبقى بياناتك", en: "Your data stays yours" }), support: t({ ar: "يقرأ الكتالوج وسلوك الشراء فقط، لا بيانات الدفع", en: "Reads the catalogue and buying behaviour only, never payment data" }) },
      ],
    },
    {
      title: t({ ar: "ما تضمنه", en: "What you can count on" }),
      rows: [
        { Icon: BadgeCheck, title: t({ ar: "منتج مستقل", en: "An independent product" }), support: t({ ar: "غير تابع لأي منصة ولا معتمد منها", en: "Not owned or endorsed by any platform" }) },
        { Icon: Headphones, title: t({ ar: "دعم بالعربية", en: "Support in Arabic" }), support: t({ ar: "فريق مختص، لا رد آلي", en: "A specialist team, not an auto-reply" }) },
        { Icon: Timer, title: t({ ar: "تجربة مجانية ٧ أيام", en: "A 7-day free trial" }), support: t({ ar: "وإلغاء بأي وقت", en: "Cancel any time" }) },
        { Icon: Receipt, title: t({ ar: "أسعار شاملة الضريبة", en: "VAT-inclusive pricing" }), support: t({ ar: "بدون رسوم على المبيعات", en: "No fee on your sales" }) },
      ],
    },
  ];

  return (
    <section className="bsection" id="systems" {...sectionTheme("violet", false)}>
      <div className="container">
        <BoardHead
          eyebrow={t({ ar: "وش يسوّي تطبيق زيادة", en: "What the Ziadah app does" })}
          title={t({ ar: "يرفع سلّة عميلك، وبأرقام تقدر تراجعها", en: "It grows your customer's cart, with numbers you can check" })}
          lede={t({
            ar: `${FEATURE_COUNT} قدرة بين هدف وطريقة عرض ومكان، كلها في لوحة واحدة وبدون تعديل على قالب متجرك.`,
            en: `${FEATURE_COUNT} capabilities across goals, presentations and placements, all in one dashboard and with no edit to your storefront theme.`,
          })}
        />

        {/* 1 - WHAT IT DOES */}
        <div className="cs-caps">
          {caps.map((c) => (
            <article key={c.key} className="cs-cap">
              <div className="cs-cap-art" aria-hidden="true"><BoardArt surface={c.key} /></div>
              <div className="cs-cap-body">
                <h3 className="cs-cap-t">{c.title}</h3>
                <p className="cs-cap-s">{c.support}</p>
              </div>
            </article>
          ))}
        </div>

        {/* 2 - PROOF */}
        <div className="cs-proof">
          <ul className="cs-stats">
            {stats.map((s, i) => (
              <li key={i} className="cs-stat">
                <span className="cs-stat-v">{s.v}</span>
                <span className="cs-stat-k">{s.k}</span>
              </li>
            ))}
          </ul>
          <p className="cs-proof-note">
            {t({
              ar: "الأرقام تراكمية منذ الإطلاق عبر كل المتاجر، لا نتيجة متجر واحد.",
              en: "The figures are cumulative since launch across every store, not one store's result.",
            })}
          </p>
        </div>

        <div className="logos-mask marquee-row bsection-layers">
          <div
            ref={logosRef}
            className="marquee-track marquee-rtl"
            style={{ animationDuration: `${storeLogos.length * 1.75}s` }}
          >
            {[0, 1, 2].map((seg) => (
              <div key={seg} className="marquee-segment">
                {storeLogos.map((l, i) => (
                  <div key={`${seg}-${i}`} className="lc">
                    <img
                      src={l.src}
                      alt={t({
                        ar: `شعار ${l.name} - متجر يستخدم تطبيق زيادة`,
                        en: `${l.name} logo - a store running Ziadah`,
                      })}
                      loading="lazy"
                      className="logo-img"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3 - HOW IT FITS */}
        <div className="cs-cols">
          {cols.map((c) => (
            <div key={c.title} className="cs-col">
              <h3 className="cs-col-t">{c.title}</h3>
              <ul className="cs-rows">
                {c.rows.map((r) => (
                  <li key={r.title} className="cs-row">
                    <span className="cs-row-ico" aria-hidden="true"><r.Icon /></span>
                    <span className="cs-row-main">
                      <span className="cs-row-t">{r.title}</span>
                      <span className="cs-row-s">{r.support}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bsection-foot">
          <Button as={Link} href="/features" variant="primary" size="lg" data-testid="systems-all-features">
            {t({ ar: "شوف كل حالات الاستخدام والمميزات", en: "See every use case and feature" })}
          </Button>
        </div>
      </div>
    </section>
  );
}
