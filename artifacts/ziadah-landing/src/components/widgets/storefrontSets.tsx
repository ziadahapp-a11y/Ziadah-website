import { useLanguage } from "@/i18n/LanguageContext";
import { DEFAULT_PACK, type ProductPack } from "@/data/sectorProductPacks";
import {
  FmOverlay, FmModal, FmHead, FmStat, FmList, FmCard, FmCopy, FmTotal, FmActions, FmAddAll, FmFoot, FmDeal, FmValue,
} from "@/components/widgets/fm";
import { FwPage, FwHead, FwH, FwChips, FwCards, FwCard, FwNote, FwTotal, FwOk, FwStep, FwHero, FwTitles, FwPill, FwPills, FwBar, FwGroup, FwProg, FwSizeCard, FwOverlay, FwHandle, FwSheetHead, FwItem, FwAmber, FwSubTotal, FwLink, FwCta, FwPerk, FwFoot } from "@/components/widgets/fw";
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
  | "replace" | "quantity" | "addmore" | "buythemall" | "cartvalue";

/* The order a merchant meets them in a real shop: what is on the product
   page, then what happens at add-to-cart, then the cart, then the exit, then
   after the order. */
export const WIDGET_KINDS: WidgetKind[] = [
  "related", "replace", "quantity", "kit", "steps", "routine", "buythemall",
  "addmore", "bmsm", "cartvalue", "drawer",
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
  /* The modal family's product card: the struck price is what 20% off came from. */
  const was20 = (v: number) => Math.round(v / 0.8);
  const card = (it: { ar: string; en: string; price: number }, action: string, actionEn: string, on?: boolean) => (
    <FmCard
      name={nm(it)}
      tag={nm(pack.tag)}
      was={sar(was20(it.price))}
      now={sar(it.price)}
      off="20%"
      reviews={t("21 تقييم", "21 reviews")}
      action={t(action, actionEn)}
      on={on}
    />
  );
  const modalHead = (
    <>
      <FmHead title={t("أضف منتجات أكثر", "Add more products")} sub={t("اكتشف هذه المنتجات قبل إتمام الطلب.", "Explore these great items before you checkout.")} />
      <FmStat amount={sar(250)} label={t("رصيد التسعير", "Pricing balance")} perks={[t("شحن مجاني", "Free Shipping"), t("الدفع عند الاستلام", "Cash on Delivery")]} />
    </>
  );
  const modalFoot = (
    <FmFoot label={t("لا تُظهر هذا مرة ثانية", "Do not show again")} skip={t("تخطّي", "Skip")} />
  );

  if (kind === "kit") {
    /* The In-progress frame: photo, titles, two pills, a bar, a card per
       group (required, pick-up-to, locked) and the kit price. */
    const was = main.price + a.price + b.price + c.price;
    const now = off(was, 12);
    return (
      <FwPage>
        <FwHero name={nm(main)} />
        <FwTitles
          title={t("كوّن طقمك", "Build your kit")}
          sub={t("قطعة أساسية، حتى قطعتين تكمّلانها، وإضافة مضمّنة.", "One main piece, up to 2 that go with it, and an included extra.")}
        />
        <FwPills>
          <FwPill tone="tint">{t("3 من 5 مختارة", "3 of 5 chosen")}</FwPill>
          <FwPill tone="green">{t(`وفّرت ${was - now} ر.س`, `Save SAR ${was - now}`)}</FwPill>
        </FwPills>
        <FwBar pct={60} />
        <FwGroup title={t("الأساسي", "The main piece")} rule={t("مطلوب · اختر 1", "Required · pick 1")}>
          <FwCard fluid name={nm(main)} price={sar(main.price)} on action={t("مختار", "Chosen")} />
          <FwCard fluid name={nm(up)} price={sar(up.price)} action={t("أضف", "Add")} />
        </FwGroup>
        <FwGroup title={t("يكمّله", "Goes with it")} rule={t("اختر حتى 2", "Pick up to 2")}>
          <FwCard fluid name={nm(a)} price={sar(a.price)} on action={t("مختار", "Chosen")} />
          <FwCard fluid name={nm(b)} price={sar(b.price)} on action={t("مختار", "Chosen")} />
        </FwGroup>
        <FwGroup panel title={t("يُضاف دائماً", "Always included")} rule={t("مقفل", "Locked")}>
          <FwCard fluid locked name={nm(c)} price={t("مُضمّن", "Included")} />
        </FwGroup>
        <FwTotal label={t("سعر الطقم", "Kit price")} was={sar(was)} now={sar(now)} cta={t("أضف الطقم للسلة", "Add kit to cart")} />
      </FwPage>
    );
  }

  if (kind === "steps") {
    /* The Step 02 frame: four step chips, the open step's two options, an
       aside about the optional step, and the package total. */
    const was = main.price + a.price + b.price + c.price;
    const now = off(was, 12);
    return (
      <FwPage>
        <FwHead
          title={t("جهّز طلبك خطوة خطوة", "Build your order, step by step")}
          sub={t("أربع خطوات، خصم 12% على الطقم كامل.", "Four steps, 12% off the whole set.")}
        />
        <FwChips
          steps={[
            { n: "01", label: nm(main), state: "done" },
            { n: "02", label: nm(a), state: "on" },
            { n: "03", label: nm(b), state: "todo" },
            { n: "04", label: nm(c), state: "todo" },
          ]}
        />
        <FwH>{t("الخطوة 02 · اختر قطعتك الثانية", "Step 02 · Choose your second piece")}</FwH>
        <FwCards>
          <FwCard name={nm(a)} price={sar(a.price)} action={t("أضف", "Add")} />
          <FwCard name={nm(b)} price={sar(b.price)} on action={t("مختار", "Chosen")} />
        </FwCards>
        <FwNote text={t("الخطوة 04 اختيارية.", "Step 04 is optional.")} action={t("تخطّي", "Skip")} />
        <FwTotal
          label={t("سعر الحزمة", "Package total")}
          was={sar(was)}
          now={sar(now)}
          cta={t("أكمل للخطوة 03", "Continue to step 03")}
        />
      </FwPage>
    );
  }

  if (kind === "routine") {
    const was = main.price + a.price + c.price;
    const now = off(was, 15);
    return (
      <FwPage>
        <FwHead title={t("طلبك كامل", "Build your set")} sub={t("اخترت الخطوات الثلاث كلها.", "All 3 steps chosen.")} />
        <FwOk>{t(`اكتمل الطقم، وفّرت ${was - now} ر.س`, `Set complete, you save SAR ${was - now}`)}</FwOk>
        <FwStep kicker={t("1 · الأساسي", "1 · Main")} name={nm(main)} price={sar(main.price)} action={t("استبدل", "Swap")} />
        <FwStep kicker={t("2 · يكمّله", "2 · Goes with it")} name={nm(a)} price={sar(a.price)} action={t("استبدل", "Swap")} />
        <FwStep kicker={t("3 · إضافة", "3 · Extra")} name={nm(c)} price={sar(c.price)} action={t("استبدل", "Swap")} />
        <FwTotal tint label={t("سعر الطقم", "Set price")} was={sar(was)} now={sar(now)} cta={t("أضف الطقم للسلة", "Add set to cart")} />
      </FwPage>
    );
  }

  if (kind === "bmsm") {
    /* The In-progress frame: the tier card on top, the products with their
       size rows, and the price for what is in the cart. */
    const was = a.price + b.price + c.price;
    const now = off(was, 10);
    const sizes = pack.sizes;
    const sz = sizes?.[1];
    return (
      <FwPage>
        <FwHead title={t("اشتر أكثر ووفر أكثر", "Buy more, save more")} sub={t("اخلط أي منتجات تبغاها.", "Mix any items you like.")} />
        <FwProg
          title={t("أضف قطعة واحدة وتفتح خصم 15%", "Add 1 more item to unlock 15% off")}
          count={t("3 في السلة", "3 in cart")}
          pct={60}
          tiers={[
            { label: t("2 قطع", "2 items"), off: t("خصم 5%", "5% off"), on: true },
            { label: t("3 قطع", "3 items"), off: t("خصم 10%", "10% off"), on: true },
            { label: t("4 قطع", "4 items"), off: t("خصم 15%", "15% off") },
            { label: t("5 قطع", "5 items"), off: t("20% + شحن", "20% + ship") },
          ]}
        />
        <FwCards>
          <FwSizeCard name={nm(a)} price={sar(a.price)} on sizes={sizes} size={sz} />
          <FwSizeCard name={nm(b)} price={sar(b.price)} on sizes={sizes} size={sz} />
          <FwSizeCard name={nm(c)} price={sar(c.price)} on sizes={sizes} size={sz} />
          <FwSizeCard name={nm(main)} price={sar(main.price)} sizes={sizes} />
        </FwCards>
        <FwTotal r20 label={t("3 قطع · خصم 10%", "3 items · 10% off")} was={sar(was)} now={sar(now)} cta={t("أضف واحدة بعد لخصم 15%", "Add 1 more for 15% off")} />
      </FwPage>
    );
  }

  if (kind === "replace") {
    /* Replace Added Product: the added card, two to swap with, the total. */
    const sum = main.price + a.price;
    return (
      <FmOverlay>
        <FmModal>
          {modalHead}
          <FmList>
            {card(main, "أُضيف", "Added", true)}
            {card(a, "استبدل", "Replace")}
            {card(b, "استبدل", "Replace")}
            <FmTotal label={t("مجموع المنتجات (2)", "Total items (2)")} was={sar(was20(sum))} now={sar(sum)} save={t("وفّر 20%", "Save 20%")} />
            <FmActions cart={t("السلة", "Cart")} amount={sar(sum + c.price)} checkout={t("إتمام الطلب", "Checkout")} />
          </FmList>
          {modalFoot}
        </FmModal>
      </FmOverlay>
    );
  }

  if (kind === "quantity") {
    /* Add more save more: a radio list of deals, the open one carries the button. */
    const u = c.price;
    const deal = (n: number, pct: number) => ({ was: u * n, now: off(u * n, pct) });
    const d1 = deal(1, 0), d3 = deal(3, 7), d5 = deal(5, 14);
    return (
      <FmOverlay>
        <FmModal>
          <FmHead title={t("اشتر أكثر ووفر أكثر", "Add more save more")} sub={t(pack.qtyNote.ar, pack.qtyNote.en)} />
          <FmList>
            <FmDeal name={nm(c)} note={t("حبة واحدة", "One piece")} was={sar(was20(u))} now={sar(d1.now)} off="-20%" />
            <FmDeal name={t("3 قطع", "Pack of 3")} note={t("سعر الحبة أقل", "A lower price each")} was={sar(d3.was)} now={sar(d3.now)} off="-7%" ship={t("شحن مجاني", "Free shipping")} />
            <FmDeal on name={t("5 قطع", "Pack of 5")} note={t("أفضل سعر للحبة", "The best price each")} was={sar(d5.was)} now={sar(d5.now)} off="-14%" ship={t("شحن مجاني", "Free shipping")} cta={t("أضف للسلة", "Add to Cart")} />
          </FmList>
        </FmModal>
      </FmOverlay>
    );
  }

  if (kind === "addmore") {
    /* Bought Together + Add-ons: the added card, then products with options. */
    const sum = main.price + a.price;
    return (
      <FmOverlay>
        <FmModal>
          {modalHead}
          <FmList>
            {card(main, "أُضيف", "Added", true)}
            <FmCopy />
            {card(a, "الخيارات", "See options")}
            <FmCopy />
            {card(b, "الخيارات", "See options")}
            <FmTotal label={t("مجموع المنتجات (2)", "Total items (2)")} was={sar(was20(sum))} now={sar(sum)} save={t("وفّر 20%", "Save 20%")} />
            <FmAddAll>{t("أضف الكل", "Add all")}</FmAddAll>
          </FmList>
          {modalFoot}
        </FmModal>
      </FmOverlay>
    );
  }

  if (kind === "related") {
    /* Related Products: three cards to add, then the cart line. */
    return (
      <FmOverlay>
        <FmModal>
          {modalHead}
          <FmList>
            {card(a, "أضف", "Add")}
            {card(b, "أضف", "Add")}
            {card(c, "أضف", "Add")}
            <FmActions cart={t("السلة", "Cart")} amount={sar(main.price)} checkout={t("إتمام الطلب", "Checkout")} />
          </FmList>
          {modalFoot}
        </FmModal>
      </FmOverlay>
    );
  }

  if (kind === "buythemall") {
    /* The Buy-them-all frame: a bottom sheet with the perk line, one row per
       product, the set price and one button. */
    const was = main.price + a.price + b.price;
    const now = off(was, 20);
    return (
      <FwOverlay>
        <FwPage sheet>
          <FwSheetHead
            title={t(`أكمل طقم ${nm(main)}`, `Complete the ${nm(main)} set`)}
            sub={t("ثلاثة منتجات بسعر واحد.", "Three products, one price.")}
          />
          <FwPerk>{t("شحن مجاني واسترداد 20 ر.س", "Free shipping and SAR 20 cashback")}</FwPerk>
          <FwItem name={nm(main)} note={sar(main.price)} price={sar(main.price)} />
          <FwItem name={nm(a)} note={sar(a.price)} price={sar(a.price)} />
          <FwItem name={nm(b)} note={sar(b.price)} price={sar(b.price)} />
          <FwSubTotal label={t("3 قطع", "3 items")} was={sar(was)} now={sar(now)} />
          <FwCta>{t("أضف الكل للسلة", "Add all to cart")}</FwCta>
          <FwFoot label={t("لا تُظهر هذا مرة ثانية", "Do not show again")} skip={t("تخطّي", "Skip")} />
        </FwPage>
      </FwOverlay>
    );
  }

  if (kind === "cartvalue") {
    /* Cart Value, embedded: the products to add and the milestone card. */
    const gap = Math.max(5, Math.round(Math.min(a.price, b.price) * 0.4));
    return (
      <FmOverlay>
        <FmModal close={false}>
          {modalHead}
          <FmList>
            {card(main, "أُضيف", "Added", true)}
            {card(a, "أضف", "Add")}
            {card(b, "أضف", "Add")}
          </FmList>
          <FmValue
            title={t("ارفع قيمة سلتك", "Increase Cart Value")}
            sub={t("أكمل المراحل بالأسفل لتحصل على أفضل قيمة للسلة.", "Complete the milestones below to get the best cart value.")}
            hint={t(`أضف ${gap} ر.س واحصل على خصم 20%`, `Add ${gap} SAR and get 20% off`)}
            tiers={["05%", "10%", t("شحن مجاني", "Free shipping"), t("هدية", "Gift")]}
            done={1}
            checkout={t("إتمام الطلب", "Checkout")}
          />
        </FmModal>
      </FmOverlay>
    );
  }

  /* The cart drawer: a bottom sheet over the dark ground, with the tier card,
     the item that was just added, the amber panel, subtotal and checkout. */
  const was = main.price + a.price + b.price;
  const sizes = pack.sizes;
  return (
    <FwOverlay>
      <FwPage sheet>
        <FwHandle />
        <FwSheetHead title={t("أُضيف إلى سلتك", "Added to your cart")} sub={t("تبقّت قطعة واحدة لخصم 15%.", "You are 1 item away from 15% off.")} />
        <FwProg
          title={t("أضف قطعة واحدة وتفتح خصم 15%", "Add 1 more item to unlock 15% off")}
          count={t("3 في السلة", "3 in cart")}
          pct={60}
          tiers={[
            { label: t("2 قطع", "2 items"), off: t("خصم 5%", "5% off"), on: true },
            { label: t("3 قطع", "3 items"), off: t("خصم 10%", "10% off"), on: true },
            { label: t("4 قطع", "4 items"), off: t("خصم 15%", "15% off") },
            { label: t("5 قطع", "5 items"), off: t("20% + شحن", "20% + ship") },
          ]}
        />
        <FwItem
          name={nm(main)}
          note={sizes ? t(`المقاس ${sizes[0]} · 1`, `Size ${sizes[0]} · 1`) : t("الكمية 1", "Qty 1")}
          price={sar(main.price)}
          tag={t("أُضيف للتو", "Just added")}
          tone="green"
        />
        <FwAmber title={t("أضف واحدة من هذي لتصل لخصم 15%", "Add one of these to reach 15% off")}>
          <FwItem name={nm(a)} note={sizes ? t("أي مقاس", "Any size") : t("متوفر", "In stock")} price={sar(a.price)} tag={t("أضف", "Add")} />
          <FwItem name={nm(b)} note={sizes ? t("أي مقاس", "Any size") : t("متوفر", "In stock")} price={sar(b.price)} tag={t("أضف", "Add")} />
        </FwAmber>
        <FwSubTotal label={t("المجموع", "Subtotal")} was={sar(was)} now={sar(off(was, 10))} />
        <FwCta>{t("إتمام الطلب", "Checkout")}</FwCta>
        <FwLink>{t("تابع التسوق", "Keep shopping")}</FwLink>
      </FwPage>
    </FwOverlay>
  );
}
