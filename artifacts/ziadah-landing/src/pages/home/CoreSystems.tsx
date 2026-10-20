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
 * ONE BOARD, NOT TWO.
 *
 * This file used to export two bands - `CoreSystems` ("what Ziadah does") and
 * `Trust` ("real stores, real numbers") - rendered one after the other with
 * the widgets band between them. They were the same component twice: head,
 * two-column bento, four-tile strip. Measured at 1440 they were 1,654 and
 * 1,704px, so 3,358px of the home page, and at 1024 they were 3,094 and
 * 3,166px because every size in the board was authored in rem.
 *
 * Two heads is what made it read as two pages. Nobody arriving at a landing
 * page needs "what it does" and "why trust it" announced as separate
 * arguments - they are one argument, and a merchant weighs the capability and
 * the proof of it in the same breath.
 *
 * So: one head, one board of eight tiles in two columns of four, and both
 * strips kept. NOTHING WAS DELETED - every tile, every claim and the logo
 * marquee all survive the merge. What went is one head, one board wrapper and
 * one section's worth of vertical padding, which is about 1,000px at 1440 and
 * considerably more at 1024.
 *
 * The dark step the two bands used to give the page (light board, then
 * inverted board) is now carried inside the band by the two `ink` strips,
 * which is where it was doing its work anyway.
 *
 * WHAT THIS REPLACED EARLIER. Four bands that each made one point on the same
 * grid: a 100-dot three-way comparison, the four pillars as a 2x2 of equal
 * cards, a placements-and-platforms pair, and a widgets showcase. The dot
 * comparison is gone rather than restyled - its claim is the same one the
 * hero's chips, the calculator and this board's own numbers each make, and it
 * was making it with three hundred squares.
 */
export function CoreSystems() {
  const t = useT();
  const logosRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosRef);

  /* FOUR PER COLUMN, ALTERNATING CAPABILITY AND PROOF.
     The two boards' tiles are interleaved rather than concatenated: a reader
     going down the left column meets what Ziadah does, then the record of it
     doing that, then the next thing it does. Stacking all four capability
     tiles and then all four proof tiles would have kept the two-page reading
     this merge exists to end. */
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
      key: "upsell",
      variant: "heading",
      tone: "pale",
      size: "short",
      Icon: ShoppingCart,
      title: t({ ar: "ترقية في السلة والدفع", en: "An upgrade at the cart and at checkout" }),
      support: t({
        ar: "ضمان، إضافة صغيرة، أو «أكمل لـ200 وخذ شحن مجاني» - قبل ما يخلص الشراء، لا بعده.",
        en: "A warranty, a small add-on, or \u201creach 200 for free shipping\u201d - before the purchase ends, not after it.",
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

  /* Where the widget runs. These are four of the nine placements in
     `features-data`; the button under the board is how a reader reaches the
     other five, rather than this strip growing into a second grid. */
  const placements: BoardTile[] = [
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

  const assurances: BoardTile[] = [
    /* NOT a reviews tile. The reviews have their own band; a tile saying they
       exist beside a band showing them is the same claim twice. */
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
    <section className="bsection" id="systems" {...sectionTheme("violet", false)}>
      <div className="container">
        {/* ONE HEAD FOR BOTH ARGUMENTS. The two it replaces were "what Ziadah
            does" and "real stores, and numbers you can check" - a capability
            claim and its evidence, which is one sentence, not two bands. */}
        <BoardHead
          eyebrow={t({ ar: "وش تسوّي زيادة", en: "What Ziadah does" })}
          title={t({ ar: "يرفع سلّة عميلك، وبأرقام تقدر تراجعها", en: "It grows your customer's cart, with numbers you can check" })}
          lede={t({
            ar: `${FEATURE_COUNT} قدرة بين هدف وطريقة عرض ومكان، كلها في لوحة واحدة وبدون تعديل على قالب متجرك - ويشغّلها أكثر من 1,500 متجر اليوم.`,
            en: `${FEATURE_COUNT} capabilities across goals, presentations and placements, all in one dashboard and with no edit to your storefront theme - and over 1,500 stores run it today.`,
          })}
        />
        <BentoBoard left={left} right={right} />
        {/* Two strips, both kept. They answer different questions - where the
            widget runs, and what you are signing up to - and at 160px a row
            neither is worth the argument it would cost to cut. */}
        <BentoStrip tiles={placements} />
        <BentoStrip tiles={assurances} />

        {/* The names behind the count on the proof card. */}
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

        <div className="bsection-foot">
          <Button as={Link} href="/features" variant="primary" size="lg" data-testid="systems-all-features">
            {t({ ar: "شوف كل حالات الاستخدام والمميزات", en: "See every use case and feature" })}
          </Button>
        </div>
      </div>
    </section>
  );
}
