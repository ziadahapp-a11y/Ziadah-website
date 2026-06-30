import { useState, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import type { Translations } from "@/i18n/translations";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";

type ProductPageMockupsCopy = Translations["productPageMockups"];

export default function ProductPageMockups() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const copy = t[lang].productPageMockups;

  return (
    <div
      className="sector-html"
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(28px, 4vw, 40px) var(--page-inline-pad) clamp(40px, 7vw, 72px)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 14px",
              borderRadius: 50,
              background: "rgba(139, 92, 246,.1)",
              border: "1px solid rgba(139, 92, 246,.22)",
              color: "#7c3aed",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase" as const,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#8b5cf6",
                boxShadow: "0 0 7px #8b5cf6",
              }}
            />
            <Editable contentKey={cmsKey(lang, "productPageMockups", "badge")} label="Product mockups badge" type="text">
              {copy.badge}
            </Editable>
          </div>
          <h2
            className="rv"
            style={{
              fontSize: "clamp(24px,3.2vw,40px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 14,
            }}
          >
            <Editable contentKey={cmsKey(lang, "productPageMockups", "title")} label="Product mockups title" type="text">
              {copy.title}
            </Editable>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--tm)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            <Editable contentKey={cmsKey(lang, "productPageMockups", "subtitle")} label="Product mockups subtitle" type="text">
              {copy.subtitle}
            </Editable>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 32,
            justifyContent: "center",
          }}
        >
          <MockupCard
            label={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "labelCrossSell")} label="Cross-sell label" type="text">
                {copy.labelCrossSell}
              </Editable>
            }
            title={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "cardTitleCrossSell")} label="Cross-sell card title" type="text">
                {copy.cardTitleCrossSell}
              </Editable>
            }
            accentColor="#06b6d4"
            productName={copy.productName}
          >
            <CrossSellContent copy={copy} />
          </MockupCard>

          <MockupCard
            label={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "labelBuyTogether")} label="Buy together label" type="text">
                {copy.labelBuyTogether}
              </Editable>
            }
            title={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "cardTitleBuyTogether")} label="Buy together card title" type="text">
                {copy.cardTitleBuyTogether}
              </Editable>
            }
            accentColor="#8b5cf6"
            productName={copy.productName}
          >
            <BuyTogetherContent copy={copy} />
          </MockupCard>

          <MockupCard
            label={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "labelBundle")} label="Bundle label" type="text">
                {copy.labelBundle}
              </Editable>
            }
            title={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "cardTitleBundle")} label="Bundle card title" type="text">
                {copy.cardTitleBundle}
              </Editable>
            }
            accentColor="#7c3aed"
            productName={copy.productName}
          >
            <BundleContent copy={copy} />
          </MockupCard>

          <MockupCard
            label={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "labelVolume")} label="Volume label" type="text">
                {copy.labelVolume}
              </Editable>
            }
            title={
              <Editable contentKey={cmsKey(lang, "productPageMockups", "cardTitleVolume")} label="Volume card title" type="text">
                {copy.cardTitleVolume}
              </Editable>
            }
            accentColor="#a78bfa"
            productName={copy.productName}
          >
            <VolumeContent copy={copy} />
          </MockupCard>
        </div>
    </div>
  );
}

function MockupCard({
  label,
  title,
  accentColor,
  productName,
  children,
}: {
  label: ReactNode;
  title: ReactNode;
  accentColor: string;
  productName: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rv"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 14px",
          borderRadius: 50,
          background: `rgba(${colorToRgb(accentColor)},.09)`,
          border: `1px solid rgba(${colorToRgb(accentColor)},.25)`,
          fontSize: 11,
          fontWeight: 800,
          color: accentColor,
          letterSpacing: 0.5,
          textTransform: "uppercase" as const,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 6px ${accentColor}`,
          }}
        />
        {label}
      </div>

      <div
        className="phone-mockup-wrap"
        style={{
          width: 270,
          maxWidth: "100%",
          background: "var(--s1)",
          borderRadius: 44,
          border: "2px solid var(--b1)",
          boxShadow: `0 0 40px rgba(${colorToRgb(accentColor)},.12), 0 20px 60px rgba(0,0,0,.5)`,
          padding: "14px 10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 24,
            background: "rgba(0,0,0,.5)",
            borderRadius: "0 0 16px 16px",
            zIndex: 10,
          }}
        />
        <div
          style={{
            background: "var(--bg)",
            borderRadius: 34,
            overflow: "hidden",
            minHeight: 528,
            position: "relative",
            paddingTop: 20,
          }}
        >
          <StatusBar accentColor={accentColor} />
          <ProductHeader accentColor={accentColor} productName={productName} />
          <div style={{ padding: "0 12px 16px" }}>{children}</div>
        </div>
        <div
          style={{
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: 90,
              height: 5,
              borderRadius: 3,
              background: "var(--s3)",
            }}
          />
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "var(--t)",
            marginBottom: 4,
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

function StatusBar({ accentColor }: { accentColor: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px 8px",
        fontSize: 9,
        color: "var(--tm)",
        fontWeight: 600,
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <div
          style={{
            width: 12,
            height: 6,
            borderRadius: 2,
            border: "1px solid var(--b2)",
            padding: "1px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "100%",
              borderRadius: 1,
              background: accentColor,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -3,
              top: "50%",
              transform: "translateY(-50%)",
              width: 2,
              height: 4,
              borderRadius: 1,
              background: "var(--s3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductHeader({
  accentColor,
  productName,
}: {
  accentColor: string;
  productName: string;
}) {
  return (
    <div style={{ padding: "0 12px 10px" }}>
      <div
        style={{
          background: "var(--s1)",
          borderRadius: 14,
          padding: "10px 12px",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 90,
            borderRadius: 10,
            background: `linear-gradient(135deg, rgba(${colorToRgb(accentColor)},.15) 0%, rgba(139, 92, 246,.1) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
            border: `1px solid rgba(${colorToRgb(accentColor)},.15)`,
          }}
        >
          <span style={{ fontSize: 32 }}>📿</span>
        </div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--t)",
            marginBottom: 3,
            textAlign: "start",
          }}
        >
          {productName}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 900, color: accentColor }}>
            200 SAR
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Stars />
            <span style={{ fontSize: 8, color: "var(--td)" }}>
              (200)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ fontSize: 8, color: "#f59e0b" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function SectionDivider({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
        marginTop: 4,
      }}
    >
      <div
        style={{
          width: 3,
          height: 14,
          borderRadius: 2,
          background: color,
          boxShadow: `0 0 6px ${color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: color,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function AddToCartBtn({
  color,
  label,
  full = false,
}: {
  color: string;
  label: string;
  full?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: full ? "7px 0" : "5px 10px",
        width: full ? "100%" : "auto",
        borderRadius: 8,
        background: `linear-gradient(135deg, ${color} 0%, rgba(${colorToRgb(color)},.75) 100%)`,
        fontSize: 9,
        fontWeight: 800,
        color: "var(--t)",
        cursor: "pointer",
        boxShadow: `0 4px 12px rgba(${colorToRgb(color)},.35)`,
      }}
    >
      <span style={{ fontSize: 9 }}>🛒</span> {label}
    </div>
  );
}

function BuyTogetherContent({ copy }: { copy: ProductPageMockupsCopy }) {
  const accent = "#7c3aed";
  const rgb = colorToRgb(accent);
  const prices = [200, 95];
  const originalPrices: (number | null)[] = [null, 120];
  const [checked, setChecked] = useState([true, true]);
  const total = prices.reduce((s, p, i) => (checked[i] ? s + p : s), 0);
  const items = [
    {
      emoji: "📿",
      name: copy.productName,
      reviews: copy.buyTogetherReviews1,
      price: prices[0],
      orig: originalPrices[0],
      tag: copy.buyTogetherTagThis,
    },
    {
      emoji: "🪔",
      name: copy.buyTogetherItem2Name,
      reviews: copy.buyTogetherReviews2,
      price: prices[1],
      orig: originalPrices[1],
      tag: null as string | null,
    },
  ];

  const toggle = (idx: number) => {
    setChecked((prev) => prev.map((c, i) => (i === idx ? !c : c)));
  };

  return (
    <>
      <SectionDivider label={copy.dividerBuyTogether} color={accent} />
      <div
        style={{
          fontSize: 8,
          color: "var(--td)",
          marginBottom: 8,
          lineHeight: 1.35,
        }}
      >
        {copy.buyTogetherDesc}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((p, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              display: "flex",
              gap: 6,
              padding: "6px 7px",
              borderRadius: 10,
              background: checked[i]
                ? `rgba(${rgb},.12)`
                : "var(--s1)",
              border: checked[i]
                ? `1px solid rgba(${rgb},.35)`
                : "1px solid var(--b1)",
              alignItems: "center",
              cursor: "pointer",
              transition: "background .15s ease, border-color .15s ease",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: checked[i] ? `rgba(${rgb},.55)` : "var(--b1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {checked[i] && (
                <span style={{ color: "#fff", fontSize: 8, fontWeight: 900 }}>
                  ✓
                </span>
              )}
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: `rgba(${rgb},.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {p.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: "var(--t)",
                    lineHeight: 1.25,
                  }}
                >
                  {p.name}
                </span>
                {p.tag && (
                  <span
                    style={{
                      fontSize: 6,
                      padding: "1px 5px",
                      borderRadius: 20,
                      background: `rgba(${rgb},.2)`,
                      color: "#c084fc",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {p.tag}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 7, color: "#f59e0b", marginTop: 1 }}>
                {p.reviews}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <span
                  style={{ fontSize: 10, fontWeight: 800, color: "var(--t)" }}
                >
                  {p.price} SAR
                </span>
                {p.orig != null && (
                  <span
                    style={{
                      fontSize: 7,
                      color: "var(--td)",
                      textDecoration: "line-through",
                    }}
                  >
                    {p.orig} SAR
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        <AddToCartBtn
          color={accent}
          label={`${copy.buyTogetherBtn} — ${total} SAR`}
          full
        />
      </div>
    </>
  );
}

function CrossSellContent({ copy }: { copy: ProductPageMockupsCopy }) {
  const relatedProducts = [
    { name: copy.related1, price: "150 SAR", emoji: "🪬" },
    { name: copy.related2, price: "35 SAR", emoji: "🎁" },
    { name: copy.related3, price: "180 SAR", emoji: "🌿" },
  ];

  return (
    <>
      <SectionDivider label={copy.dividerCrossSell} color="#06b6d4" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {relatedProducts.map((p, i) => (
          <div
            key={i}
            style={{
              background: "var(--s1)",
              border: "1px solid rgba(6,182,212,.12)",
              borderRadius: 10,
              padding: "7px 9px",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(6,182,212,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {p.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--t)",
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </p>
              <span style={{ fontSize: 9, color: "#06b6d4", fontWeight: 800 }}>
                {p.price}
              </span>
            </div>
            <AddToCartBtn color="#06b6d4" label={copy.addToCart} />
          </div>
        ))}
      </div>
    </>
  );
}

function BundleContent({ copy }: { copy: ProductPageMockupsCopy }) {
  return (
    <>
      <SectionDivider label={copy.dividerBundle} color="#8b5cf6" />
      <div
        style={{
          background: "rgba(139, 92, 246,.06)",
          border: "1px solid rgba(139, 92, 246,.2)",
          borderRadius: 12,
          padding: "10px 10px 8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(139, 92, 246,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              border: "1px solid rgba(139, 92, 246,.2)",
            }}
          >
            📿
          </div>
          <span style={{ fontSize: 12, color: "var(--td)" }}>+</span>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(139, 92, 246,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              border: "1px dashed rgba(139, 92, 246,.35)",
            }}
          >
            🪬
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <p
            style={{
              fontSize: 9,
              color: "var(--tm)",
              marginBottom: 4,
            }}
          >
            {copy.bundleCombo}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "#8b5cf6",
              }}
            >
              280 SAR
            </span>
            <span
              style={{
                fontSize: 9,
                color: "var(--td)",
                textDecoration: "line-through",
              }}
            >
              350 SAR
            </span>
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 8px",
            borderRadius: 6,
            background: "rgba(139, 92, 246,.15)",
            border: "1px solid rgba(139, 92, 246,.3)",
            fontSize: 9,
            fontWeight: 800,
            color: "#8b5cf6",
            marginBottom: 8,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 9 }}>💰</span> {copy.bundleSave}
        </div>

        <AddToCartBtn color="#8b5cf6" label={copy.addBundleToCart} full />
      </div>
    </>
  );
}

function VolumeContent({ copy }: { copy: ProductPageMockupsCopy }) {
  const options = [
    {
      qty: copy.qty1,
      price: "200 SAR",
      discount: null as string | null,
      shipping: null as string | null,
      highlight: false,
    },
    {
      qty: copy.qty2,
      price: "320 SAR",
      discount: copy.discount20,
      shipping: null as string | null,
      highlight: false,
    },
    {
      qty: copy.qty3,
      price: "420 SAR",
      discount: copy.discount30,
      shipping: copy.freeShipping,
      highlight: true,
    },
  ];

  return (
    <>
      <SectionDivider label={copy.dividerVolume} color="#8b5cf6" />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {options.map((opt, i) => (
          <div
            key={i}
            style={{
              background: opt.highlight
                ? "rgba(139, 92, 246,.1)"
                : "var(--s1)",
              border: opt.highlight
                ? "1px solid rgba(139, 92, 246,.35)"
                : "1px solid var(--b1)",
              borderRadius: 10,
              padding: "7px 9px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {opt.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "#8b5cf6",
                  fontSize: 7,
                  fontWeight: 800,
                  color: "var(--t)",
                }}
              >
                ⭐ {copy.bestValue}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: opt.highlight ? 14 : 0,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: opt.highlight ? "#8b5cf6" : "var(--tm)",
                    marginBottom: 2,
                  }}
                >
                  {opt.qty}
                </p>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      color: opt.highlight ? "#8b5cf6" : "var(--t)",
                    }}
                  >
                    {opt.price}
                  </span>
                  {opt.discount && (
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 700,
                        color: "#8b5cf6",
                        padding: "1px 4px",
                        borderRadius: 4,
                        background: "rgba(139, 92, 246,.12)",
                      }}
                    >
                      {opt.discount}
                    </span>
                  )}
                </div>
                {opt.shipping && (
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: "#f59e0b",
                      marginTop: 2,
                      display: "block",
                    }}
                  >
                    🚚 {opt.shipping}
                  </span>
                )}
              </div>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: opt.highlight
                    ? "2px solid #8b5cf6"
                    : "2px solid var(--b2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {opt.highlight && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#8b5cf6",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <AddToCartBtn color="#8b5cf6" label={copy.addToCart} full />
      </div>
    </>
  );
}

function colorToRgb(color: string): string {
  const map: Record<string, string> = {
    "#8b5cf6": "139, 92, 246",
    "#06b6d4": "6,182,212",
    "#f59e0b": "245,158,11",
    "#ec4899": "236,72,153",
    "#4f46e5": "79,70,229",
    "#7c3aed": "124, 58, 237",
    "#e11d48": "225,29,72",
  };
  return map[color] || "139, 92, 246";
}
