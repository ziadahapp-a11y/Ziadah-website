import { useRef } from "react";
import { Link } from "wouter";
import { BadgeCheck, CreditCard, FileText, FolderTree, Headphones, Plug, ShieldCheck, ShoppingCart, Timer } from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { sectionTheme } from "@/sections";
import { FEATURE_COUNT } from "@/lib/features-data";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { BentoBoard, BentoStrip, BoardHead, type BoardTile } from "./BentoBoard";
import { BoardArt } from "./BoardArt";

/* The merchants whose logos run under the trust board. Moved here with the
   band: the proof card states the count, and this is the same claim with
   names on it. */
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
 * The systems board: what Ziadah actually does, laid out as a composition
 * rather than as a run of identical cards.
 *
 * WHAT THIS REPLACES. Four bands that each made one point on the same grid:
 * a 100-dot three-way comparison, the four pillars as a 2x2 of equal cards,
 * a placements-and-platforms pair, and a widgets showcase. Between them they
 * argued one thing - the engine picks per shopper, and it runs everywhere -
 * across roughly four screens of identical rectangles.
 *
 * Two of the four pillars are product SURFACES here rather than descriptions
 * of them, which is the difference the board buys: a card that shows the
 * ranked suggestion with its reasons makes the argument the dot grid was
 * spending a screen on.
 *
 * The 100-dot comparison is gone rather than restyled. Its claim - a store
 * with no recommendations converts 8 carts in 100 and Ziadah converts 34 - is
 * the same claim the hero's chips, the calculator and this board's own
 * numbers each make, and it was making it with three hundred squares.
 */
export function CoreSystems() {
  const t = useT();

  const left: BoardTile[] = [
    {
      key: "suggestions",
      variant: "media",
      tone: "ink",
      size: "tall",
      art: <BoardArt surface="suggestions" />,
      title: t({ ar: "اقتراح شخصي لكل عميل", en: "A personal suggestion for every shopper" }),
      support: t({
        ar: "زيادة تقرأ تصفّح العميل وطلباته السابقة وتقترح ما يناسبه فعلاً - لا نفس القائمة للجميع.",
        en: "Ziadah reads each shopper's browsing and past orders and suggests what genuinely fits - not the same list for everyone.",
      }),
    },
    {
      key: "bundle",
      variant: "media",
      tone: "pale",
      size: "short",
      art: <BoardArt surface="bundle" />,
      title: t({ ar: "منتجات تُشترى معاً، كحزمة بنقرة", en: "Bought-together items, as a one-click bundle" }),
    },
  ];

  const right: BoardTile[] = [
    {
      key: "upsell",
      variant: "heading",
      tone: "pale",
      size: "short",
      Icon: ShoppingCart,
      title: t({ ar: "ترقية في السلة والدفع", en: "An upgrade at the cart and at checkout" }),
      support: t({
        ar: "ضمان، إضافة صغيرة، أو «أكمل لـ200 وخذ شحن مجاني» - قبل ما يخلص الشراء، لا بعده.",
        en: "A warranty, a small add-on, or “reach 200 for free shipping” - before the purchase ends, not after it.",
      }),
    },
    {
      key: "performance",
      variant: "media",
      tone: "white",
      size: "tall",
      art: <BoardArt surface="performance" />,
      title: t({ ar: "يتعلّم من كل طلب ويعيد الترتيب", en: "It learns from every order and reorders itself" }),
      support: t({
        ar: "كل نقرة وكل طلب يغذّي المحرك، فيعرف أي مكان عرض يحوّل أعلى ويرفعه تلقائياً.",
        en: "Every click and order feeds the engine, so it learns which placement converts best and promotes it on its own.",
      }),
    },
  ];

  /* Where the widget runs. These are four of the nine placements in
     `features-data`; the button under the board is how a reader reaches the
     other five, rather than this strip growing into a second grid. */
  const strip: BoardTile[] = [
    { key: "product", variant: "heading", tone: "ink", size: "short", Icon: FileText,
      title: t({ ar: "صفحة المنتج", en: "Product page" }),
      support: t({ ar: "مرحلة الاهتمام", en: "The consideration moment" }) },
    { key: "cart", variant: "heading", tone: "ink", size: "short", Icon: ShoppingCart,
      title: t({ ar: "صفحة السلة", en: "Cart page" }),
      support: t({ ar: "آخر فرصة قبل الدفع", en: "The last chance before checkout" }) },
    { key: "checkout", variant: "heading", tone: "ink", size: "short", Icon: CreditCard,
      title: t({ ar: "صفحة الدفع", en: "Checkout" }),
      support: t({ ar: "العميل ملتزم بالشراء", en: "The shopper is committed" }) },
    { key: "category", variant: "heading", tone: "ink", size: "short", Icon: FolderTree,
      title: t({ ar: "صفحة الفئة", en: "Category page" }),
      support: t({ ar: "وهو يتصفّح ويقارن", en: "While they browse and compare" }) },
  ];

  return (
    <section className="bsection" id="systems" {...sectionTheme("violet", false)}>
      <div className="container">
        <BoardHead
          eyebrow={t({ ar: "وش تسوّي زيادة", en: "What Ziadah does" })}
          title={t({ ar: "أربعة أشياء ترفع سلّة عميلك", en: "Four things that grow your customer's cart" })}
          lede={t({
            ar: `${FEATURE_COUNT} قدرة بين هدف وطريقة عرض ومكان، كلها في لوحة واحدة وبدون تعديل على قالب متجرك.`,
            en: `${FEATURE_COUNT} capabilities across goals, presentations and placements - all in one dashboard, with no edit to your storefront theme.`,
          })}
        />
        <BentoBoard left={left} right={right} />
        <BentoStrip tiles={strip} />

        <div className="bsection-foot">
          <Button as={Link} href="/features" variant="primary" size="lg" data-testid="systems-all-features">
            {t({ ar: "شوف كل الودجتات والمميزات", en: "See every widget and feature" })}
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * The trust board. Its dominant card is the aggregate record - what merchants
 * running Ziadah have actually made - and its counterweight is what the
 * connector reads, because a recommendation engine reads a store's catalogue
 * and its buying behaviour and that deserves a card rather than a footnote.
 *
 * WHAT THIS REPLACES. The proof band (four stats and a logo marquee) and the
 * platform half of the placements band. Two light bands making one point, now
 * one dark one - which is also what gives the page its hard light/dark step
 * in the middle instead of a run of pale violet.
 */
export function Trust() {
  const t = useT();
  const logosRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosRef);

  const left: BoardTile[] = [
    {
      key: "proof",
      variant: "media",
      tone: "white",
      size: "tall",
      art: <BoardArt surface="proof" />,
      title: t({ ar: "أكثر من 1,500 متجر يشغّل زيادة اليوم", en: "Over 1,500 stores run Ziadah today" }),
      support: t({
        ar: "الأرقام تراكمية منذ الإطلاق عبر كل المتاجر، لا نتيجة متجر واحد.",
        en: "The figures are cumulative since launch across every store, not one store's result.",
      }),
    },
    {
      key: "install",
      variant: "media",
      tone: "pale",
      size: "short",
      art: <BoardArt surface="install" />,
      title: t({ ar: "تشتغل خلال دقائق، بدون مطوّر", en: "Running in minutes, with no developer" }),
    },
  ];

  const right: BoardTile[] = [
    {
      key: "platforms",
      variant: "heading",
      tone: "pale",
      size: "short",
      Icon: Plug,
      title: t({ ar: "موصّل جاهز لزد وسلة", en: "A ready-made connector for Zid and Salla" }),
      support: t({
        ar: "تثبيت بنقرة من لوحة المنصة نفسها، وبدون أي تغيير في قالب متجرك.",
        en: "One click from the platform's own dashboard, and no change to your storefront theme.",
      }),
    },
    {
      key: "permissions",
      variant: "media",
      tone: "ink",
      size: "tall",
      art: <BoardArt surface="permissions" />,
      title: t({ ar: "بياناتك تبقى بياناتك", en: "Your data stays yours" }),
      support: t({
        ar: "الموصّل يقرأ الكتالوج وسلوك الشراء فقط. لا يقرأ بيانات الدفع، ولا تُشارك بياناتك خارجاً.",
        en: "The connector reads the catalogue and buying behaviour, nothing else. It does not read payment data, and your data is not shared out.",
      }),
    },
  ];

  const strip: BoardTile[] = [
    /* NOT a reviews tile. The reviews have their own band now, and a tile
       saying they exist beside a band showing them is the same claim twice.
       This says the thing the page states nowhere else. */
    { key: "independent", variant: "heading", tone: "ink", size: "short", Icon: BadgeCheck,
      title: t({ ar: "منتج مستقل", en: "An independent product" }),
      support: t({ ar: "غير تابع لأي منصة ولا معتمد منها", en: "Not owned or endorsed by any platform" }) },
    { key: "support", variant: "heading", tone: "ink", size: "short", Icon: Headphones,
      title: t({ ar: "دعم بالعربية", en: "Support in Arabic" }),
      support: t({ ar: "فريق مختص، لا رد آلي", en: "A specialist team, not an auto-reply" }) },
    { key: "trial", variant: "heading", tone: "ink", size: "short", Icon: Timer,
      title: t({ ar: "تجربة مجانية ٧ أيام", en: "A 7-day free trial" }),
      support: t({ ar: "وإلغاء بأي وقت", en: "Cancel any time" }) },
    { key: "vat", variant: "heading", tone: "ink", size: "short", Icon: ShieldCheck,
      title: t({ ar: "أسعار شاملة الضريبة", en: "VAT-inclusive pricing" }),
      support: t({ ar: "بدون رسوم على المبيعات", en: "No fee on your sales" }) },
  ];

  return (
    <section className="bsection" id="trust" {...sectionTheme("violet", true)}>
      <div className="container">
        <BoardHead
          eyebrow={t({ ar: "الثقة", en: "Trust" })}
          title={t({ ar: "متاجر حقيقية، وأرقام تقدر تراجعها", en: "Real stores, and numbers you can check" })}
          lede={t({
            ar: "محرّك التوصيات يقرأ كتالوجك وسلوك الشراء في متجرك. هذا يفرض وضوحاً في ما يقرأه، وفي ما تقدر توقفه.",
            en: "A recommendation engine reads your catalogue and your store's buying behaviour. That demands clarity about what it reads, and about what you can switch off.",
          })}
        />
        <BentoBoard left={left} right={right} />
        <BentoStrip tiles={strip} />

        {/* The names behind the count on the proof card. This ran as its own
            band above the fold; it is evidence for the trust argument, so it
            belongs to it. */}
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
                        ar: `شعار ${l.name} — متجر يستخدم تطبيق زيادة`,
                        en: `${l.name} logo — a store running Ziadah`,
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
      </div>
    </section>
  );
}
