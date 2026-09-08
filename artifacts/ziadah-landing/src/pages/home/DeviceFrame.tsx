import { useT } from "@/lib/i18n";

/**
 * The hero device: a phone showing Ziadah's own product surface.
 *
 * The anatomy is the reference's, verbatim from `home-scenes.css` - a 4.8rem
 * radius, `--general-black-light` body on a `--general-black-mid` border, a
 * topbar, a headline figure, one action, and a labelled list under it. The
 * frame is FIXED dark on every section rather than reading the section pair,
 * which is what stops it becoming a bright empty slab on the inverted hero.
 *
 * The CONTENT is Ziadah's, because the two products are not the same thing.
 * The reference shows a customer wallet - a balance, and the activity that
 * moved it - because that is what a loyalty platform does. Ziadah is a
 * recommendation engine, so its equivalent surface is the moment the engine
 * acts on: a cart on a product page, the suggestion under it, and the order
 * value the suggestion moves. Same slots, Ziadah's subject.
 *
 * Drawn in CSS, not a screenshot: it is a depiction of the product, and it
 * has to stay legible at 270px on a phone and readable in both scripts.
 */
export function DeviceFrame() {
  const t = useT();
  const riyal = t({ ar: "ر.س", en: "SAR" });

  /* The three suggestions the engine puts under the cart. Each carries the
     reason it was chosen, because "why this product" is the entire claim -
     a list of three names with prices is what a generic recommender shows. */
  const rows = [
    {
      key: "socks",
      label: t({ ar: "جوارب رياضية", en: "Sports socks" }),
      why: t({ ar: "يُشترى مع الحذاء", en: "Bought with the shoe" }),
      amount: `+45 ${riyal}`,
    },
    {
      key: "cleaner",
      label: t({ ar: "منظّف أحذية", en: "Shoe cleaner" }),
      why: t({ ar: "نفس الفئة", en: "Same category" }),
      amount: `+35 ${riyal}`,
    },
    {
      key: "insole",
      label: t({ ar: "نعل داخلي", en: "Insole" }),
      why: t({ ar: "تصفّحه قبل قليل", en: "Browsed just now" }),
      amount: `+60 ${riyal}`,
    },
  ];

  return (
    <div
      className="device"
      role="img"
      aria-label={t({
        ar: "سلة عميل في متجر، وتحتها ثلاثة منتجات يقترحها زيادة مع سبب اختيار كل واحد",
        en: "A shopper's cart in a store, with three products Ziadah suggests under it and the reason each was chosen",
      })}
    >
      <div className="device-screen">
        <div className="device-topbar">
          <span className="device-dot" aria-hidden="true" />
          <span className="device-title">{t({ ar: "سلة العميل", en: "Customer cart" })}</span>
        </div>

        <p className="device-label">{t({ ar: "قيمة الطلب", en: "Order value" })}</p>
        <p className="device-balance num-ltr">490.00</p>
        <div className="device-cta">{t({ ar: "أضف المقترحات", en: "Add suggestions" })}</div>

        <p className="device-label device-label--sub">
          {t({ ar: "يُشترى معه عادة", en: "Frequently bought together" })}
        </p>
        <ul className="device-rows">
          {rows.map((r) => (
            <li key={r.key} className="device-row">
              <span className="device-row-mark" aria-hidden="true" />
              <span className="device-row-text">
                <span className="device-row-label">{r.label}</span>
                <span className="device-row-when">{r.why}</span>
              </span>
              <span className="device-row-amount num-ltr">{r.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
