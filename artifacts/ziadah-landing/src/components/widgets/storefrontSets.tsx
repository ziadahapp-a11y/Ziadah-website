import { useLanguage } from "@/i18n/LanguageContext";
import {
  Sheet, Pill, Progress, Tiers, Option, Group, Step, AddRow, Nudge, PriceBar, Cta, Success,
} from "@/components/widgets/storefront";

/**
 * THE FIVE WIDGET SHAPES, FILLED WITH ELECTRONICS.
 *
 * One composition per frame family in the design file, built from the
 * primitives next door. The products are the six the site owns photographs
 * of, so every tile in every shape shows a real object.
 *
 * `kind` is the vocabulary the rest of the site uses to ask for one.
 */

export type WidgetKind =
  | "kit" | "steps" | "routine" | "bmsm" | "drawer"
  | "replace" | "quantity" | "addmore" | "buythemall" | "cartvalue" | "coupon" | "thankyou";

/* The order a merchant meets them in a real shop: what is on the product
   page, then what happens at add-to-cart, then the cart, then the exit, then
   after the order. */
export const WIDGET_KINDS: WidgetKind[] = [
  "replace", "quantity", "kit", "steps", "routine", "buythemall",
  "addmore", "bmsm", "cartvalue", "drawer", "coupon", "thankyou",
];

export function widgetKindLabel(kind: WidgetKind, isAr: boolean): string {
  const m: Record<WidgetKind, [string, string]> = {
    kit: ["كوّن طقمك", "Build your kit"],
    steps: ["حزمة بخطوات", "Step by step package"],
    routine: ["أقسام منسّقة", "Curated sections"],
    bmsm: ["اشتر أكثر ووفر أكثر", "Buy more, save more"],
    drawer: ["درج السلة", "Cart drawer"],
    replace: ["استبدال المنتج", "Product swap"],
    quantity: ["عرض الكميات", "Quantity offer"],
    addmore: ["أضف المزيد", "Add more"],
    buythemall: ["خذها كلها", "Buy them all"],
    cartvalue: ["رفع قيمة السلة", "Cart value"],
    coupon: ["كود الخصم", "Coupon"],
    thankyou: ["بعد الشراء", "Post-purchase"],
  };
  return isAr ? m[kind][0] : m[kind][1];
}

/**
 * WHEN EACH SHAPE APPEARS, IN ONE LINE.
 *
 * The collapsible lists on the home page and the sector pages open a row to
 * this and nothing else beside the live sheet. One line, and always the same
 * question answered: at what moment does the shopper meet this? "What it is"
 * is the sheet itself, and "why it works" lives on the page each shape links
 * to, so neither is repeated here.
 *
 * It sits next to `widgetKindLabel` so a shape's name and its moment are
 * edited in the same place and cannot drift apart across the three bands that
 * list them.
 */
export function widgetKindWhen(kind: WidgetKind, isAr: boolean): string {
  const m: Record<WidgetKind, [string, string]> = {
    replace: [
      "صفحة المنتج، حين يفتح العميل منتجاً له بديل أفضل أو أعلى فئة.",
      "On the product page, when the shopper opens an item that has a better or higher-tier alternative.",
    ],
    quantity: [
      "صفحة المنتج، قبل الإضافة للسلة: يختار العميل الكمية ويرى سعر الوحدة ينزل.",
      "On the product page, before add-to-cart: the shopper picks a quantity and watches the unit price drop.",
    ],
    kit: [
      "حين يحتاج المنتج مكمّلات من فئات مختلفة: يختار العميل قطعة من كل مجموعة والسعر ينزل مع الطقم.",
      "When a product needs parts from different groups: pick one from each and the kit price drops.",
    ],
    steps: [
      "حين يكون للشراء ترتيب: يبني العميل حزمته خطوة بخطوة ويرى التوفير يكبر.",
      "When a purchase has an order to it: the shopper builds the bundle a step at a time and watches the saving grow.",
    ],
    routine: [
      "حين يكون المنتج جزءاً من روتين أو مجموعة: أقسام منسّقة تعرض كل خطوة بمنتجاتها.",
      "When a product belongs to a routine or a set: curated sections show each step with its products.",
    ],
    buythemall: [
      "صفحة المنتج: منتجات تُشترى معاً تدخل السلة كلها بنقرة واحدة.",
      "On the product page: items bought together go into the cart in one click.",
    ],
    addmore: [
      "لحظة الإضافة للسلة: إضافات صغيرة تكمّل المنتج قبل أن يتابع العميل.",
      "At add-to-cart: small add-ons that complete the product before the shopper moves on.",
    ],
    bmsm: [
      "المنتج أو السلة: شرائح تدريجية، كل قطعة زيادة تفتح خصماً أكبر.",
      "On the product or in the cart: tiered discounts, every extra piece unlocks a bigger one.",
    ],
    cartvalue: [
      "في السلة: شريط يبيّن كم ناقص للشحن المجاني أو للهدية، مع منتجات تسدّ الفرق.",
      "In the cart: a bar showing how far to free shipping or a gift, with products that close the gap.",
    ],
    drawer: [
      "لحظة إضافة المنتج: يدخل درج السلة باقتراحات مرتبطة بما أُضيف للتو.",
      "The moment an item is added: the cart drawer slides in with suggestions tied to what was just added.",
    ],
    coupon: [
      "قبل الدفع: يظهر كود الخصم لمن يتردد أو يهمّ بالمغادرة، لا للجميع.",
      "Before checkout: the coupon appears for shoppers who hesitate or are about to leave, not for everyone.",
    ],
    thankyou: [
      "بعد إتمام الطلب: عرض واحد في صفحة الشكر قبل أن يغلقها العميل.",
      "After the order: one offer on the thank-you page before the shopper closes it.",
    ],
  };
  return isAr ? m[kind][0] : m[kind][1];
}

const P = {
  earbuds: { ar: "سماعات لاسلكية", en: "Wireless Earbuds" },
  wired: { ar: "سماعات سلكية", en: "Wired earphones" },
  case: { ar: "غطاء حماية الهاتف", en: "Phone Protective Case" },
  screen: { ar: "واقي شاشة زجاجي", en: "Glass Screen Protector" },
  wcharger: { ar: "شاحن لاسلكي سريع", en: "Fast Wireless Charger" },
  cable: { ar: "رأس شاحن سريع وكابل", en: "Fast charger head & cable" },
};

export function StorefrontWidget({ kind }: { kind: WidgetKind }) {
  const { isAr } = useLanguage();
  const t = (ar: string, en: string) => (isAr ? ar : en);
  const n = (k: keyof typeof P) => (isAr ? P[k].ar : P[k].en);
  const sar = (v: number | string) => (isAr ? `${v} ر.س` : `SAR ${v}`);

  if (kind === "kit") {
    return (
      <Sheet
        title={t("كوّن طقم جهازك", "Build your device kit")}
        sub={t("اختر قطعة من كل مجموعة، والسعر ينزل مع الطقم.", "Pick one from each group and the kit price drops.")}
        chips={<><Pill>{t("٢ من ٣ مختارة", "2 of 3 chosen")}</Pill><Pill tone="green">{t("وفّرت ٥٥ ر.س", "Save SAR 55")}</Pill></>}
        footer={<><PriceBar label={t("سعر الطقم", "Kit price")} was={sar(525)} now={sar(470)} /><Cta>{t("أضف الطقم للسلة", "Add kit to cart")}</Cta></>}
      >
        <Progress pct={66} />
        <Group label={t("الصوت", "Audio")} meta={t("مطلوب · اختر ١", "Required · pick 1")}>
          <Option name={n("earbuds")} price={sar(320)} chosen />
          <Option name={n("wired")} price={sar(140)} />
        </Group>
        <Group label={t("الحماية", "Protection")} meta={t("مطلوب · اختر ١", "Required · pick 1")}>
          <Option name={n("case")} price={sar(120)} chosen />
          <Option name={n("screen")} price={sar(85)} />
        </Group>
        <Group label={t("يُضاف دائماً", "Always included")} meta={t("مقفل", "Locked")}>
          <Option name={n("cable")} price={t("مُضمّن", "Included")} locked />
          <Option name={n("wcharger")} price={t("مُضمّن", "Included")} locked />
        </Group>
      </Sheet>
    );
  }

  if (kind === "steps") {
    return (
      <Sheet
        title={t("جهّز مكتبك خطوة خطوة", "Set up your desk, step by step")}
        sub={t("٣ خطوات، وتقدر تستبدل أي واحدة.", "Three steps, and any one can be swapped.")}
        chips={<Pill tone="grey">{t("الخطوة ٢ من ٣", "Step 2 of 3")}</Pill>}
        footer={<><PriceBar label={t("سعر الحزمة", "Package price")} was={sar(545)} now={sar(465)} /><Cta>{t("أكمل الخطوة الثالثة", "Continue to step 3")}</Cta></>}
      >
        <Progress pct={66} />
        <Step n={1} kicker={t("اسمع", "Listen")} name={n("earbuds")} price={sar(320)} swap />
        <Step n={2} kicker={t("اشحن", "Charge")} name={n("wcharger")} price={sar(180)} swap />
        <AddRow name={n("screen")} meta={t("الخطوة ٣ · لم تُختر بعد", "Step 3 · not chosen yet")} price={sar(85)} />
      </Sheet>
    );
  }

  if (kind === "routine") {
    return (
      <Sheet
        title={t("جهّزك كامل", "Your full setup")}
        sub={t("اخترت الثلاث قطع كلها.", "All three pieces chosen.")}
        footer={<><PriceBar label={t("سعر الجهاز كامل", "Full setup price")} was={sar(525)} now={sar(446)} /><Cta>{t("أضف الجهاز كامل", "Add the full setup")}</Cta></>}
      >
        <Success>{t("اكتمل الجهاز، وفّرت ٧٩ ر.س", "Setup complete, you save SAR 79")}</Success>
        <Step n={1} kicker={t("الصوت", "Audio")} name={n("earbuds")} price={sar(320)} swap />
        <Step n={2} kicker={t("الحماية", "Protection")} name={n("case")} price={sar(120)} swap />
        <Step n={3} kicker={t("الشحن", "Charging")} name={n("cable")} price={sar(95)} swap />
      </Sheet>
    );
  }

  if (kind === "bmsm") {
    return (
      <Sheet
        title={t("اشتر أكثر ووفر أكثر", "Buy more, save more")}
        sub={t("اخلط أي ملحقات تبغاها.", "Mix any accessories you like.")}
        footer={<><PriceBar label={t("٣ قطع · خصم ١٠٪", "3 items · 10% off")} was={sar(525)} now={sar(472)} /><Cta>{t("أضف واحدة بعد لخصم ١٥٪", "Add 1 more for 15% off")}</Cta></>}
      >
        <div className="sf-nudge">
          <p className="sf-nudge-t">{t("أضف قطعة واحدة وتفتح خصم ١٥٪", "Add 1 more item to unlock 15% off")}</p>
          <Progress pct={60} />
          <Tiers
            reached={2}
            tiers={[
              { label: t("٢ قطع", "2 items"), off: t("٥٪", "5% off") },
              { label: t("٣ قطع", "3 items"), off: t("١٠٪", "10% off") },
              { label: t("٤ قطع", "4 items"), off: t("١٥٪", "15% off") },
              { label: t("٥ قطع", "5 items"), off: t("٢٠٪ + شحن", "20% + ship") },
            ]}
          />
        </div>
        <div className="sf-grid">
          <Option name={n("case")} price={sar(120)} chosen sizes={["S", "M", "L"]} size="M" />
          <Option name={n("screen")} price={sar(85)} chosen sizes={["S", "M", "L"]} size="L" />
          <Option name={n("cable")} price={sar(95)} chosen />
          <Option name={n("wired")} price={sar(140)} />
        </div>
      </Sheet>
    );
  }

  if (kind === "replace") {
    return (
      <Sheet
        title={t("بـ١٢٠ ر.س أكثر: شحن لاسلكي وبطارية أطول", "For 120 more: wireless charging and longer battery")}
        sub={t("نفس الفئة، شريحة أعلى.", "Same category, one tier up.")}
        footer={<><PriceBar label={t("الفرق", "The difference")} was={sar(320)} now={t("+120 ر.س", "+SAR 120")} /><Cta>{t("بدّلها بالأعلى", "Swap to the higher one")}</Cta></>}
      >
        <AddRow name={n("earbuds")} meta={t("ما تتصفّحه الآن", "What you are viewing")} price={sar(320)} action={<Pill tone="grey">{t("الحالي", "Current")}</Pill>} />
        <AddRow name={n("wcharger")} meta={t("شحن لاسلكي · بطارية أطول", "Wireless charging · longer battery")} price={sar(440)} action={<Pill>{t("الأعلى", "Upgrade")}</Pill>} />
      </Sheet>
    );
  }

  if (kind === "quantity") {
    return (
      <Sheet
        title={t("خذها بالكمية وسعر الحبة ينزل", "Take the pack and the unit price drops")}
        sub={t("الكيبل يُفقد ويُترك. من يشتري واحداً يعود بعد شهرين.", "A cable gets lost and left behind. Whoever buys one comes back in two months.")}
        footer={<><PriceBar label={t("٣ قطع · ١٠٠ ر.س للحبة", "3 items · 100 each")} was={sar(285)} now={sar(300)} /><Cta>{t("أضف ٣", "Add 3")}</Cta></>}
      >
        <AddRow name={n("cable")} price={sar(95)} action={<Pill tone="grey">{t("حبة", "One")}</Pill>} />
        <Tiers
          reached={2}
          tiers={[
            { label: t("حبة", "1"), off: sar(95) },
            { label: t("٣ قطع", "3"), off: sar(265) },
            { label: t("٥ قطع", "5"), off: sar(410) },
            { label: t("١٠ قطع", "10"), off: sar(760) },
          ]}
        />
      </Sheet>
    );
  }

  if (kind === "addmore") {
    return (
      <Sheet
        title={t("أكمل جهازك", "Complete your device")}
        sub={t("تظهر لحظة الإضافة للسلة، لا قبلها.", "Shown the moment it enters the cart, not before.")}
        footer={<Cta>{t("أضف الاثنين", "Add both")}</Cta>}
      >
        <AddRow name={n("earbuds")} meta={t("أُضيف للتو", "Just added")} price={sar(320)} action={<Pill tone="green">{t("أُضيف", "Added")}</Pill>} />
        <AddRow name={n("case")} price={sar(120)} />
        <AddRow name={n("screen")} price={sar(85)} />
      </Sheet>
    );
  }

  if (kind === "buythemall") {
    return (
      <Sheet
        title={t("الثلاثة بسعر واحد", "All three at one price")}
        sub={t("سماعات + غطاء + واقي شاشة.", "Earbuds + case + screen protector.")}
        chips={<Pill tone="green">{t("وفّرت ٢٦ ر.س", "Save SAR 26")}</Pill>}
        footer={<><PriceBar label={t("الطقم كامل", "The whole set")} was={sar(525)} now={sar(499)} /><Cta>{t("خذها كلها", "Buy them all")}</Cta></>}
      >
        <div className="sf-grid">
          <Option name={n("earbuds")} price={sar(320)} chosen />
          <Option name={n("case")} price={sar(120)} chosen />
          <Option name={n("screen")} price={sar(85)} chosen />
          <Option name={n("cable")} price={sar(95)} />
        </div>
      </Sheet>
    );
  }

  if (kind === "cartvalue") {
    return (
      <Sheet
        title={t("ناقص ٥٨ ر.س للشحن المجاني", "58 SAR away from free delivery")}
        sub={t("أضف أي واحدة واحذف رسوم الشحن.", "Add either one and the delivery fee goes.")}
        footer={<><PriceBar label={t("سلتك الآن", "Your cart")} now={sar(242)} /><Cta>{t("أكمل العتبة", "Close the gap")}</Cta></>}
      >
        <Progress pct={81} />
        <Nudge title={t("أضف واحدة من هذي وتوصل ٣٠٠ ر.س", "Add one of these to reach 300")}>
          <AddRow name={n("case")} price={sar(120)} />
          <AddRow name={n("screen")} price={sar(85)} />
        </Nudge>
      </Sheet>
    );
  }

  if (kind === "coupon") {
    return (
      <Sheet
        onClose
        title={t("قبل ما تطلع: خصم ١٠٪", "Before you go: 10% off")}
        sub={t("صالح ١٥ دقيقة على هذه السلة.", "Valid for 15 minutes on this cart.")}
        footer={<><PriceBar label={t("بعد الخصم", "After the discount")} was={sar(525)} now={sar(472)} /><Cta>{t("فعّل الكود", "Apply the code")}</Cta></>}
      >
        <p className="sf-code">ZIADAH10</p>
        <AddRow name={n("earbuds")} price={sar(320)} action={<Pill tone="grey">{t("في السلة", "In cart")}</Pill>} />
      </Sheet>
    );
  }

  if (kind === "thankyou") {
    return (
      <Sheet
        title={t("تم طلبك", "Your order is placed")}
        sub={t("يُشترى عادةً بعد هذا الطلب.", "Usually bought after this order.")}
        footer={<Cta>{t("أضفها لطلب جديد", "Add to a new order")}</Cta>}
      >
        <Success>{t("وصلك إشعار بالتفاصيل", "A confirmation is on its way")}</Success>
        <AddRow name={n("wcharger")} price={sar(180)} />
        <AddRow name={n("wired")} price={sar(140)} />
      </Sheet>
    );
  }

  return (
    <Sheet
      onClose
      title={t("أُضيف إلى سلتك", "Added to your cart")}
      sub={t("تبقّت قطعة واحدة لخصم ١٥٪.", "You are 1 item away from 15% off.")}
      footer={<PriceBar label={t("المجموع", "Subtotal")} was={sar(525)} now={sar(472)} />}
    >
      <div className="sf-nudge">
        <p className="sf-nudge-t">{t("أضف قطعة واحدة وتفتح خصم ١٥٪", "Add 1 more item to unlock 15% off")}</p>
        <Progress pct={60} />
        <Tiers
          reached={2}
          tiers={[
            { label: t("٢ قطع", "2 items"), off: t("٥٪", "5% off") },
            { label: t("٣ قطع", "3 items"), off: t("١٠٪", "10% off") },
            { label: t("٤ قطع", "4 items"), off: t("١٥٪", "15% off") },
            { label: t("٥ قطع", "5 items"), off: t("٢٠٪ + شحن", "20% + ship") },
          ]}
        />
      </div>
      <AddRow
        name={n("earbuds")}
        meta={t("أُضيف للتو", "Just added")}
        price={sar(320)}
        action={<Pill tone="green">{t("أُضيف", "Just added")}</Pill>}
      />
      <Nudge title={t("أضف واحدة من هذي لتصل لخصم ١٥٪", "Add one of these to reach 15% off")}>
        <AddRow name={n("case")} price={sar(120)} />
        <AddRow name={n("screen")} price={sar(85)} />
      </Nudge>
    </Sheet>
  );
}
