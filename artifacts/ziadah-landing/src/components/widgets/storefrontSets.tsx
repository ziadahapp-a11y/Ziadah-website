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

export type WidgetKind = "kit" | "steps" | "routine" | "bmsm" | "drawer";

export const WIDGET_KINDS: WidgetKind[] = ["kit", "steps", "routine", "bmsm", "drawer"];

export function widgetKindLabel(kind: WidgetKind, isAr: boolean): string {
  const m: Record<WidgetKind, [string, string]> = {
    kit: ["كوّن طقمك", "Build your kit"],
    steps: ["حزمة بخطوات", "Step by step package"],
    routine: ["أقسام منسّقة", "Curated sections"],
    bmsm: ["اشتر أكثر ووفر أكثر", "Buy more, save more"],
    drawer: ["درج السلة", "Cart drawer"],
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
