export default function ProductPageMockups() {
  return (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 14px",
              borderRadius: 50,
              background: "rgba(168,85,247,.08)",
              border: "1px solid rgba(168,85,247,.2)",
              color: "#a855f7",
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
                background: "#a855f7",
                boxShadow: "0 0 7px #a855f7",
              }}
            />
            أمثلة حية
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
            شاهد كيف يبدو زيادة في صفحة منتجك
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
            ثلاثة سيناريوهات توضّح كيف تظهر توصيات زيادة داخل صفحة المنتج — كل
            سيناريو يرفع متوسط قيمة الطلب بطريقة مختلفة.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 32,
            justifyItems: "center",
          }}
        >
          <MockupCard
            label="Cross-sell"
            labelColor="#06b6d4"
            title="اشتر المجموعة الكاملة"
            accentColor="#06b6d4"
          >
            <CrossSellContent />
          </MockupCard>

          <MockupCard
            label="Bundle"
            labelColor="#a855f7"
            title="هذا المنتج + إضافة"
            accentColor="#a855f7"
          >
            <BundleContent />
          </MockupCard>

          <MockupCard
            label="Volume Discount"
            labelColor="#10b981"
            title="اشتر أكثر ووفر أكثر"
            accentColor="#10b981"
          >
            <VolumeContent />
          </MockupCard>
        </div>
      </div>
    </section>
  );
}

function MockupCard({
  label,
  labelColor,
  title,
  accentColor,
  children,
}: {
  label: string;
  labelColor: string;
  title: string;
  accentColor: string;
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
          background: "rgba(255,255,255,.04)",
          borderRadius: 44,
          border: "2px solid rgba(255,255,255,.1)",
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
            background: "linear-gradient(160deg,#1a1033 0%,#0f0a20 100%)",
            borderRadius: 34,
            overflow: "hidden",
            minHeight: 500,
            position: "relative",
            paddingTop: 20,
          }}
        >
          <StatusBar accentColor={accentColor} />
          <ProductHeader accentColor={accentColor} />
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
              background: "rgba(255,255,255,.2)",
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
        color: "rgba(255,255,255,.5)",
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
            border: "1px solid rgba(255,255,255,.4)",
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
              background: "rgba(255,255,255,.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductHeader({ accentColor }: { accentColor: string }) {
  return (
    <div style={{ padding: "0 12px 10px" }}>
      <div
        style={{
          background: "rgba(255,255,255,.04)",
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
            background: `linear-gradient(135deg, rgba(${colorToRgb(accentColor)},.15) 0%, rgba(168,85,247,.1) 100%)`,
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
            color: "rgba(255,255,255,.9)",
            marginBottom: 3,
            textAlign: "right",
          }}
        >
          مسبحة بكلايت أحمر
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 900, color: accentColor }}>
            200 ꜁
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Stars />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,.4)" }}>
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
  label = "أضف للسلة",
  full = false,
}: {
  color: string;
  label?: string;
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
        color: "#fff",
        cursor: "pointer",
        boxShadow: `0 4px 12px rgba(${colorToRgb(color)},.35)`,
      }}
    >
      <span style={{ fontSize: 9 }}>🛒</span> {label}
    </div>
  );
}

function CrossSellContent() {
  const relatedProducts = [
    { name: "مسبحة فضة 925", price: "150 ꜁", emoji: "🪬" },
    { name: "علبة هدايا مخملية", price: "35 ꜁", emoji: "🎁" },
    { name: "مسبحة عود طبيعي", price: "180 ꜁", emoji: "🌿" },
  ];

  return (
    <>
      <SectionDivider label="اشتر المجموعة الكاملة 🔗" color="#06b6d4" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {relatedProducts.map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,.04)",
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
                  color: "rgba(255,255,255,.85)",
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
            <AddToCartBtn color="#06b6d4" />
          </div>
        ))}
      </div>
    </>
  );
}

function BundleContent() {
  return (
    <>
      <SectionDivider label="هذا المنتج + إضافة 🎁" color="#a855f7" />
      <div
        style={{
          background: "rgba(168,85,247,.06)",
          border: "1px solid rgba(168,85,247,.2)",
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
              background: "rgba(168,85,247,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              border: "1px solid rgba(168,85,247,.2)",
            }}
          >
            📿
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>+</span>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(168,85,247,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              border: "1px dashed rgba(168,85,247,.35)",
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
              color: "rgba(255,255,255,.6)",
              marginBottom: 4,
            }}
          >
            مسبحة بكلايت أحمر + مسبحة فضة 925
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
                color: "#a855f7",
              }}
            >
              280 ꜁
            </span>
            <span
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,.3)",
                textDecoration: "line-through",
              }}
            >
              350 ꜁
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
            background: "rgba(168,85,247,.15)",
            border: "1px solid rgba(168,85,247,.3)",
            fontSize: 9,
            fontWeight: 800,
            color: "#a855f7",
            marginBottom: 8,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 9 }}>💰</span> وفر 20% عند الشراء معاً
        </div>

        <AddToCartBtn color="#a855f7" label="أضف الحزمة للسلة" full />
      </div>
    </>
  );
}

function VolumeContent() {
  const options = [
    {
      qty: "1 قطعة",
      price: "200 ꜁",
      discount: null,
      shipping: null,
      highlight: false,
    },
    {
      qty: "2 قطعتين",
      price: "320 ꜁",
      discount: "خصم 20%",
      shipping: null,
      highlight: false,
    },
    {
      qty: "3 قطع",
      price: "420 ꜁",
      discount: "خصم 30%",
      shipping: "شحن مجاني",
      highlight: true,
    },
  ];

  return (
    <>
      <SectionDivider label="اشتر أكثر ووفر أكثر 📦" color="#10b981" />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {options.map((opt, i) => (
          <div
            key={i}
            style={{
              background: opt.highlight
                ? "rgba(16,185,129,.1)"
                : "rgba(255,255,255,.03)",
              border: opt.highlight
                ? "1px solid rgba(16,185,129,.35)"
                : "1px solid rgba(255,255,255,.07)",
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
                  left: 6,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "#10b981",
                  fontSize: 7,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                الأفضل قيمة ⭐
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
                    color: opt.highlight ? "#10b981" : "rgba(255,255,255,.75)",
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
                      color: opt.highlight ? "#10b981" : "rgba(255,255,255,.85)",
                    }}
                  >
                    {opt.price}
                  </span>
                  {opt.discount && (
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 700,
                        color: "#10b981",
                        padding: "1px 4px",
                        borderRadius: 4,
                        background: "rgba(16,185,129,.12)",
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
                    ? "2px solid #10b981"
                    : "2px solid rgba(255,255,255,.2)",
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
                      background: "#10b981",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <AddToCartBtn color="#10b981" label="أضف للسلة" full />
      </div>
    </>
  );
}

function colorToRgb(color: string): string {
  const map: Record<string, string> = {
    "#a855f7": "168,85,247",
    "#06b6d4": "6,182,212",
    "#10b981": "16,185,129",
    "#f59e0b": "245,158,11",
    "#ec4899": "236,72,153",
    "#4f46e5": "79,70,229",
    "#7c3aed": "124,58,237",
    "#e11d48": "225,29,72",
    "#8b5cf6": "139,92,246",
  };
  return map[color] || "168,85,247";
}
