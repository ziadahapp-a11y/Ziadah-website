import { useLanguage } from "@/i18n/LanguageContext";
import { DEFAULT_PACK, type ProductPack } from "@/data/sectorProductPacks";
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
  | "related" | "kit" | "steps" | "routine" | "bmsm" | "drawer"
  | "replace" | "quantity" | "addmore" | "buythemall" | "cartvalue" | "coupon" | "thankyou";

/* The order a merchant meets them in a real shop: what is on the product
   page, then what happens at add-to-cart, then the cart, then the exit, then
   after the order. */
export const WIDGET_KINDS: WidgetKind[] = [
  "related", "replace", "quantity", "kit", "steps", "routine", "buythemall",
  "addmore", "bmsm", "cartvalue", "drawer", "coupon", "thankyou",
];

export function widgetKindLabel(kind: WidgetKind, isAr: boolean): string {
  const m: Record<WidgetKind, [string, string]> = {
    related: ["منتجات ذات صلة", "Related products"],
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
/**
 * THE PAGE THAT EXPLAINS EACH SHAPE.
 *
 * The home page used to carry a second band of seven "use cases", each with a
 * link to its page. That band was the same thing as the shapes list, so it is
 * gone and its links live on the shapes instead: an open row ends with the
 * page where the shape is explained in full.
 */
export function widgetKindHref(kind: WidgetKind): string {
  const m: Record<WidgetKind, string> = {
    related: "/use-cases/related-products",
    replace: "/use-cases/upsell",
    quantity: "/use-cases/buy-more-save-more",
    kit: "/use-cases/bundle-deals",
    steps: "/use-cases/bundle-deals",
    routine: "/use-cases/cross-sell",
    buythemall: "/use-cases/buy-together",
    addmore: "/use-cases/addons",
    bmsm: "/use-cases/buy-more-save-more",
    cartvalue: "/use-cases/free-shipping",
    drawer: "/use-cases/add-to-cart",
    coupon: "/use-cases/discount-coupon",
    thankyou: "/use-cases/thank-you",
  };
  return m[kind];
}

export function widgetKindWhen(kind: WidgetKind, isAr: boolean): string {
  const m: Record<WidgetKind, [string, string]> = {
    related: [
      "صفحة المنتج، حين يتصفّح العميل منتجاً: منتجات يحبها من اشترى القطعة نفسها.",
      "On the product page, while the shopper browses: products people who bought this item also liked.",
    ],
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

/**
 * THE SHEETS, ON ANY SHELF.
 *
 * Every product, price and total below comes from a `ProductPack`, so the same
 * thirteen compositions can sit on an electronics shelf (the default, which the
 * home page and the solution pages keep) or on a sector's own. Nothing in a
 * sheet's wording names a product category: "Build your kit", not "Build your
 * device kit", so a burger and a bracelet can both stand in it.
 *
 * Totals are derived, never typed. A typed total drifts the moment a price on
 * the shelf changes, and a sheet that says "Save 55" over rows that add up to
 * 40 is the kind of thing a merchant notices.
 */
export function StorefrontWidget({ kind, pack = DEFAULT_PACK }: { kind: WidgetKind; pack?: ProductPack }) {
  const { isAr } = useLanguage();
  const t = (ar: string, en: string) => (isAr ? ar : en);
  const nm = (it: { ar: string; en: string }) => (isAr ? it.ar : it.en);
  const sar = (v: number | string) => (isAr ? `${v} ر.س` : `SAR ${v}`);
  const { main, a, b, c, up } = pack;
  const off = (total: number, pct: number) => Math.round(total * (1 - pct / 100));

  if (kind === "kit") {
    const was = main.price + a.price + b.price;
    const now = off(was, 10);
    return (
      <Sheet
        title={t("كوّن طقمك", "Build your kit")}
        sub={t("اختر قطعة من كل مجموعة، والسعر ينزل مع الطقم.", "Pick one from each group and the kit price drops.")}
        chips={<><Pill>{t("2 من 3 مختارة", "2 of 3 chosen")}</Pill><Pill tone="green">{t(`وفّرت ${was - now} ر.س`, `Save SAR ${was - now}`)}</Pill></>}
        footer={<><PriceBar label={t("سعر الطقم", "Kit price")} was={sar(was)} now={sar(now)} /><Cta>{t("أضف الطقم للسلة", "Add kit to cart")}</Cta></>}
      >
        <Progress pct={66} />
        <Group label={t("الأساسي", "The main piece")} meta={t("مطلوب · اختر 1", "Required · pick 1")}>
          <Option name={nm(main)} price={sar(main.price)} chosen />
          <Option name={nm(up)} price={sar(up.price)} />
        </Group>
        <Group label={t("يكمّله", "What goes with it")} meta={t("مطلوب · اختر 1", "Required · pick 1")}>
          <Option name={nm(a)} price={sar(a.price)} chosen />
          <Option name={nm(b)} price={sar(b.price)} />
        </Group>
        <Group label={t("يُضاف دائماً", "Always included")} meta={t("مقفل", "Locked")}>
          <Option name={nm(c)} price={t("مُضمّن", "Included")} locked />
        </Group>
      </Sheet>
    );
  }

  if (kind === "steps") {
    const was = main.price + up.price + b.price;
    const now = off(was, 15);
    return (
      <Sheet
        title={t("جهّز طلبك خطوة خطوة", "Build your order, step by step")}
        sub={t("3 خطوات، وتقدر تستبدل أي واحدة.", "Three steps, and any one can be swapped.")}
        chips={<Pill tone="grey">{t("الخطوة 2 من 3", "Step 2 of 3")}</Pill>}
        footer={<><PriceBar label={t("سعر الحزمة", "Package price")} was={sar(was)} now={sar(now)} /><Cta>{t("أكمل الخطوة الثالثة", "Continue to step 3")}</Cta></>}
      >
        <Progress pct={66} />
        <Step n={1} kicker={t("البداية", "Start")} name={nm(main)} price={sar(main.price)} swap />
        <Step n={2} kicker={t("الأفضل", "The upgrade")} name={nm(up)} price={sar(up.price)} swap />
        <AddRow name={nm(b)} meta={t("الخطوة 3 · لم تُختر بعد", "Step 3 · not chosen yet")} price={sar(b.price)} />
      </Sheet>
    );
  }

  if (kind === "routine") {
    const was = main.price + a.price + c.price;
    const now = off(was, 15);
    return (
      <Sheet
        title={t("طلبك كامل", "Your full set")}
        sub={t("اخترت الثلاث قطع كلها.", "All three pieces chosen.")}
        footer={<><PriceBar label={t("سعر الطقم كامل", "Full set price")} was={sar(was)} now={sar(now)} /><Cta>{t("أضف الطقم كامل", "Add the full set")}</Cta></>}
      >
        <Success>{t(`اكتمل الطقم، وفّرت ${was - now} ر.س`, `Set complete, you save SAR ${was - now}`)}</Success>
        <Step n={1} kicker={t("الأساسي", "Main")} name={nm(main)} price={sar(main.price)} swap />
        <Step n={2} kicker={t("يكمّله", "Goes with it")} name={nm(a)} price={sar(a.price)} swap />
        <Step n={3} kicker={t("إضافة", "Extra")} name={nm(c)} price={sar(c.price)} swap />
      </Sheet>
    );
  }

  if (kind === "bmsm") {
    const was = a.price + b.price + c.price;
    const now = off(was, 10);
    return (
      <Sheet
        title={t("اشتر أكثر ووفر أكثر", "Buy more, save more")}
        sub={t("اخلط أي منتجات تبغاها.", "Mix any products you like.")}
        footer={<><PriceBar label={t("3 قطع · خصم 10%", "3 items · 10% off")} was={sar(was)} now={sar(now)} /><Cta>{t("أضف واحدة بعد لخصم 15%", "Add 1 more for 15% off")}</Cta></>}
      >
        <div className="sf-nudge">
          <p className="sf-nudge-t">{t("أضف قطعة واحدة وتفتح خصم 15%", "Add 1 more item to unlock 15% off")}</p>
          <Progress pct={60} />
          <Tiers
            reached={2}
            tiers={[
              { label: t("2 قطع", "2 items"), off: t("5%", "5% off") },
              { label: t("3 قطع", "3 items"), off: t("10%", "10% off") },
              { label: t("4 قطع", "4 items"), off: t("15%", "15% off") },
              { label: t("5 قطع", "5 items"), off: t("20% + شحن", "20% + ship") },
            ]}
          />
        </div>
        <div className="sf-grid">
          <Option name={nm(a)} price={sar(a.price)} chosen />
          <Option name={nm(b)} price={sar(b.price)} chosen />
          <Option name={nm(c)} price={sar(c.price)} chosen />
          <Option name={nm(main)} price={sar(main.price)} />
        </div>
      </Sheet>
    );
  }

  if (kind === "replace") {
    const diff = up.price - main.price;
    return (
      <Sheet
        title={t(`بـ${diff} ر.س أكثر: الفئة الأعلى`, `For SAR ${diff} more: the higher tier`)}
        sub={t("نفس الفئة، شريحة أعلى.", "Same category, one tier up.")}
        footer={<><PriceBar label={t("الفرق", "The difference")} was={sar(main.price)} now={t(`+${diff} ر.س`, `+SAR ${diff}`)} /><Cta>{t("بدّلها بالأعلى", "Swap to the higher one")}</Cta></>}
      >
        <AddRow name={nm(main)} meta={t("ما تتصفّحه الآن", "What you are viewing")} price={sar(main.price)} action={<Pill tone="grey">{t("الحالي", "Current")}</Pill>} />
        <AddRow name={nm(up)} meta={t("الأعلى في الفئة نفسها", "The top of the same range")} price={sar(up.price)} action={<Pill>{t("الأعلى", "Upgrade")}</Pill>} />
      </Sheet>
    );
  }

  if (kind === "quantity") {
    const u = c.price;
    const tier = (n: number, pct: number) => off(u * n, pct);
    return (
      <Sheet
        title={t("خذها بالكمية وسعر الحبة ينزل", "Take the pack and the unit price drops")}
        sub={t(pack.qtyNote.ar, pack.qtyNote.en)}
        footer={<><PriceBar label={t(`3 قطع · ${Math.round(tier(3, 7) / 3)} ر.س للحبة`, `3 items · ${Math.round(tier(3, 7) / 3)} each`)} was={sar(u * 3)} now={sar(tier(3, 7))} /><Cta>{t("أضف 3", "Add 3")}</Cta></>}
      >
        <AddRow name={nm(c)} price={sar(u)} action={<Pill tone="grey">{t("حبة", "One")}</Pill>} />
        <Tiers
          reached={2}
          tiers={[
            { label: t("حبة", "1"), off: sar(u) },
            { label: t("3 قطع", "3"), off: sar(tier(3, 7)) },
            { label: t("5 قطع", "5"), off: sar(tier(5, 14)) },
            { label: t("10 قطع", "10"), off: sar(tier(10, 20)) },
          ]}
        />
      </Sheet>
    );
  }

  if (kind === "addmore") {
    return (
      <Sheet
        title={t("أكمل طلبك", "Complete your order")}
        sub={t("تظهر لحظة الإضافة للسلة، لا قبلها.", "Shown the moment it enters the cart, not before.")}
        footer={<Cta>{t("أضف الاثنين", "Add both")}</Cta>}
      >
        <AddRow name={nm(main)} meta={t("أُضيف للتو", "Just added")} price={sar(main.price)} action={<Pill tone="green">{t("أُضيف", "Added")}</Pill>} />
        <AddRow name={nm(a)} price={sar(a.price)} />
        <AddRow name={nm(b)} price={sar(b.price)} />
      </Sheet>
    );
  }

  if (kind === "related") {
    return (
      <Sheet
        title={t("منتجات ذات صلة", "Related products")}
        sub={t("يحبها من اشترى القطعة نفسها.", "Liked by people who bought this item.")}
        footer={<Cta>{t("أضف المحدد للسلة", "Add selected to cart")}</Cta>}
      >
        <div className="sf-grid">
          <Option name={nm(c)} price={sar(c.price)} />
          <Option name={nm(b)} price={sar(b.price)} />
          <Option name={nm(a)} price={sar(a.price)} />
          <Option name={nm(up)} price={sar(up.price)} />
        </div>
      </Sheet>
    );
  }

  if (kind === "buythemall") {
    const was = main.price + a.price + b.price;
    const now = off(was, 5);
    return (
      <Sheet
        title={t("الثلاثة بسعر واحد", "All three at one price")}
        sub={`${nm(main)} + ${nm(a)} + ${nm(b)}`}
        chips={<Pill tone="green">{t(`وفّرت ${was - now} ر.س`, `Save SAR ${was - now}`)}</Pill>}
        footer={<><PriceBar label={t("الطقم كامل", "The whole set")} was={sar(was)} now={sar(now)} /><Cta>{t("خذها كلها", "Buy them all")}</Cta></>}
      >
        <div className="sf-grid">
          <Option name={nm(main)} price={sar(main.price)} chosen />
          <Option name={nm(a)} price={sar(a.price)} chosen />
          <Option name={nm(b)} price={sar(b.price)} chosen />
          <Option name={nm(c)} price={sar(c.price)} />
        </div>
      </Sheet>
    );
  }

  if (kind === "cartvalue") {
    /* The gap is always smaller than either product offered to close it, so
       either one gets the shopper over the line. */
    const cart = main.price + c.price;
    const gap = Math.max(5, Math.round(Math.min(a.price, b.price) * 0.6));
    const goal = cart + gap;
    return (
      <Sheet
        title={t(`ناقص ${gap} ر.س للشحن المجاني`, `SAR ${gap} away from free delivery`)}
        sub={t("أضف أي واحدة واحذف رسوم الشحن.", "Add either one and the delivery fee goes.")}
        footer={<><PriceBar label={t("سلتك الآن", "Your cart")} now={sar(cart)} /><Cta>{t("أكمل العتبة", "Close the gap")}</Cta></>}
      >
        <Progress pct={Math.round((cart / goal) * 100)} />
        <Nudge title={t(`أضف واحدة من هذي وتوصل ${goal} ر.س`, `Add one of these to reach ${goal}`)}>
          <AddRow name={nm(a)} price={sar(a.price)} />
          <AddRow name={nm(b)} price={sar(b.price)} />
        </Nudge>
      </Sheet>
    );
  }

  if (kind === "coupon") {
    const was = main.price + a.price + b.price;
    return (
      <Sheet
        onClose
        title={t("قبل ما تطلع: خصم 10%", "Before you go: 10% off")}
        sub={t("صالح 15 دقيقة على هذه السلة.", "Valid for 15 minutes on this cart.")}
        footer={<><PriceBar label={t("بعد الخصم", "After the discount")} was={sar(was)} now={sar(off(was, 10))} /><Cta>{t("فعّل الكود", "Apply the code")}</Cta></>}
      >
        <p className="sf-code">ZIADAH10</p>
        <AddRow name={nm(main)} price={sar(main.price)} action={<Pill tone="grey">{t("في السلة", "In cart")}</Pill>} />
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
        <AddRow name={nm(c)} price={sar(c.price)} />
        <AddRow name={nm(a)} price={sar(a.price)} />
      </Sheet>
    );
  }

  const was = main.price + a.price + b.price;
  return (
    <Sheet
      onClose
      title={t("أُضيف إلى سلتك", "Added to your cart")}
      sub={t("تبقّت قطعة واحدة لخصم 15%.", "You are 1 item away from 15% off.")}
      footer={<PriceBar label={t("المجموع", "Subtotal")} was={sar(was)} now={sar(off(was, 10))} />}
    >
      <div className="sf-nudge">
        <p className="sf-nudge-t">{t("أضف قطعة واحدة وتفتح خصم 15%", "Add 1 more item to unlock 15% off")}</p>
        <Progress pct={60} />
        <Tiers
          reached={2}
          tiers={[
            { label: t("2 قطع", "2 items"), off: t("5%", "5% off") },
            { label: t("3 قطع", "3 items"), off: t("10%", "10% off") },
            { label: t("4 قطع", "4 items"), off: t("15%", "15% off") },
            { label: t("5 قطع", "5 items"), off: t("20% + شحن", "20% + ship") },
          ]}
        />
      </div>
      <AddRow
        name={nm(main)}
        meta={t("أُضيف للتو", "Just added")}
        price={sar(main.price)}
        action={<Pill tone="green">{t("أُضيف", "Just added")}</Pill>}
      />
      <Nudge title={t("أضف واحدة من هذي لتصل لخصم 15%", "Add one of these to reach 15% off")}>
        <AddRow name={nm(a)} price={sar(a.price)} />
        <AddRow name={nm(b)} price={sar(b.price)} />
      </Nudge>
    </Sheet>
  );
}
