import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { Section, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import {
  PhoneFrame, WidgetShell, ProductList, ProductRow, CheckRow,
  WidgetButton, WidgetTag, WidgetHint, Totals, Price,
} from "@/components/widgets/kit";

/**
 * The four product-page placements, each shown on a phone.
 *
 * REBUILT. What this replaced was 988 lines of inline style drawing, per
 * mockup, a phone with a coloured glow and a fake battery, a product "photo"
 * that was a 📿 on a pastel gradient, a five-gold-star rating with an invented
 * review count, prices written "SAR 200" on an Arabic page, and a full-width
 * cyan "إضافة للسلة 🛒" repeated once per row. Four mockups, four different
 * accent colours - violet, cyan, violet, violet - so one page carried three
 * palettes.
 *
 * It is the widget kit inside a neutral phone now: one accent for the whole
 * set, drawn tiles instead of emoji, the price as the largest thing on a row,
 * one solid button per screen, and no ratings at all.
 */
export default function ProductPageMockups() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const copy = t[lang].productPageMockups;
  const isAr = lang === "ar";
  const cur = isAr ? "ر.س" : "SAR";

  /* One accent for all four. The mockups used to carry three between them,
     which reads as three products rather than four placements of one. */
  const mockups = [
    {
      key: "together",
      label: copy.labelBuyTogether,
      title: copy.cardTitleBuyTogether,
      screen: <BuyTogether copy={copy} cur={cur} />,
    },
    {
      key: "cross",
      label: copy.labelCrossSell,
      title: copy.cardTitleCrossSell,
      screen: <CrossSell copy={copy} cur={cur} />,
    },
    {
      key: "bundle",
      label: copy.labelBundle,
      title: copy.cardTitleBundle,
      screen: <Bundle copy={copy} cur={cur} />,
    },
    {
      key: "volume",
      label: copy.labelVolume,
      title: copy.cardTitleVolume,
      screen: <Volume copy={copy} cur={cur} />,
    },
  ];

  return (
    <Section family="grey">
      <Shell>
        <SectionHead center kicker={copy.badge} title={copy.title} lead={copy.subtitle} />
        <div className="ppm-grid">
          {mockups.map((m) => (
            <figure key={m.key} className="ppm-item rv">
              <PhoneFrame label={copy.productName}>{m.screen}</PhoneFrame>
              <figcaption className="ppm-cap">
                <span className="card-eyebrow">{m.label}</span>
                <span className="t-sm-med">{m.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

type Copy = (typeof siteTranslations)["ar"]["productPageMockups"];

function BuyTogether({ copy, cur }: { copy: Copy; cur: string }) {
  return (
    <WidgetShell
      title={copy.dividerBuyTogether}
      subtitle={copy.buyTogetherDesc}
      footer={
        <WidgetButton block>
          {copy.buyTogetherBtn}
          <span className="wk-btn-num">
            <bdi>295</bdi> {cur}
          </span>
        </WidgetButton>
      }
    >
      <ProductList>
        <CheckRow
          name={copy.productName}
          price="200"
          currency={cur}
          tag={<WidgetTag>{copy.buyTogetherTagThis}</WidgetTag>}
          checked
        />
        <CheckRow name={copy.buyTogetherItem2Name} price="95" was="120" currency={cur} checked />
      </ProductList>
    </WidgetShell>
  );
}

function CrossSell({ copy, cur }: { copy: Copy; cur: string }) {
  const items = [
    { name: copy.related1, price: "150" },
    { name: copy.related2, price: "35" },
    { name: copy.related3, price: "180" },
  ];
  return (
    <WidgetShell
      title={copy.dividerCrossSell}
      footer={<WidgetButton block>{copy.addToCart}</WidgetButton>}
    >
      <ProductList>
        {items.map((p, i) => (
          <ProductRow key={i} name={p.name} price={p.price} currency={cur} />
        ))}
      </ProductList>
    </WidgetShell>
  );
}

function Bundle({ copy, cur }: { copy: Copy; cur: string }) {
  return (
    <WidgetShell
      title={copy.dividerBundle}
      subtitle={copy.bundleCombo}
      footer={<WidgetButton block>{copy.addBundleToCart}</WidgetButton>}
    >
      <ProductList>
        <ProductRow name={copy.productName} price="200" currency={cur} />
        <ProductRow name={copy.buyTogetherItem2Name} price="120" currency={cur} />
      </ProductList>
      <Totals
        rows={[
          {
            k: (
              <span className="wk-meta">
                {copy.bundleCombo}
                <WidgetTag tone="save">{copy.bundleSave}</WidgetTag>
              </span>
            ),
            v: <Price value="280" currency={cur} size={16} />,
            total: true,
          },
        ]}
      />
    </WidgetShell>
  );
}

function Volume({ copy, cur }: { copy: Copy; cur: string }) {
  const tiers = [
    { qty: copy.qty1, price: "200", off: null as string | null, best: false },
    { qty: copy.qty2, price: "320", off: copy.discount20, best: false },
    { qty: copy.qty3, price: "420", off: copy.discount30, best: true },
  ];
  return (
    <WidgetShell
      title={copy.dividerVolume}
      footer={<WidgetButton block>{copy.addToCart}</WidgetButton>}
    >
      <div className="wk-tiers">
        {tiers.map((tr, i) => (
          <div key={i} className={`wk-tier${tr.best ? " is-sel" : ""}`}>
            <span className="wk-meta">
              <strong>{tr.qty}</strong>
              {tr.best ? <WidgetTag tone="save">{copy.bestValue}</WidgetTag> : null}
            </span>
            <span className="wk-meta">
              {tr.off ? <WidgetTag>{tr.off}</WidgetTag> : null}
              <Price value={tr.price} currency={cur} size={13} />
            </span>
          </div>
        ))}
      </div>
      <WidgetHint>{copy.freeShipping}</WidgetHint>
    </WidgetShell>
  );
}
