export default function CartDemoMockup() {
  const purple = "#7c3aed";
  const lightPurple = "rgba(124,58,237,0.1)";
  const borderPurple = "rgba(124,58,237,0.25)";

  const products = [
    {
      name: "شماغ الجنادرية كلاسيك رجالي",
      rating: "4.95",
      reviews: "6984",
      price: "241",
      originalPrice: "345",
      discount: "20%",
      emoji: "🧣",
      bg: "#fef2f2",
    },
    {
      name: "سبحة بكلايت بلون أزرق",
      rating: "4.95",
      reviews: "6984",
      price: "200",
      originalPrice: "254",
      discount: null,
      emoji: "🔵",
      bg: "#eff6ff",
    },
    {
      name: "سبحة بكلايت بلون أصفر",
      rating: "4.95",
      reviews: "6984",
      price: "200",
      originalPrice: "254",
      discount: null,
      emoji: "🟡",
      bg: "#fefce8",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        padding: "0 5% 80px",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 14px",
              borderRadius: 50,
              background: lightPurple,
              border: `1px solid ${borderPurple}`,
              color: purple,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: purple,
                boxShadow: `0 0 7px ${purple}`,
              }}
            />
            معاينة تفاعلية
          </div>
          <h2
            style={{
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 900,
              marginBottom: 12,
              color: "var(--t)",
            }}
          >
            كيف تبدو في متجرك؟
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--tm)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            هكذا تظهر توصيات زيادة الذكية مباشرة داخل صفحة سلة التسوق لدى
            عملائك
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="phone-mockup-wrap"
            style={{
              width: 340,
              maxWidth: "100%",
              background: "#fff",
              borderRadius: 36,
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.22), 0 0 0 10px #1a1a2e, 0 0 0 12px #2d2d4e",
              overflow: "hidden",
              position: "relative",
              fontFamily: "'Noto Sans Arabic', Tahoma, Arial, sans-serif",
            }}
          >
            <div
              style={{
                height: 28,
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 8,
                  borderRadius: 10,
                  background: "#0f0f1e",
                }}
              />
            </div>

            <div
              style={{
                background: "#f8f8fc",
                minHeight: 580,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "16px 16px 10px",
                  borderBottom: "1px solid #f0f0f5",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: purple,
                      letterSpacing: -1,
                    }}
                  >
                    السلة
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  margin: "10px 10px 0",
                  borderRadius: 14,
                  padding: 12,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 10,
                      background: "#fef2f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      flexShrink: 0,
                    }}
                  >
                    📿
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#111",
                        marginBottom: 4,
                        lineHeight: 1.4,
                      }}
                    >
                      سبحة بكلايت بلون أحمر
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#111",
                      }}
                    >
                      200{" "}
                      <span style={{ fontSize: 11, fontWeight: 700 }}>﷼</span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "default",
                      color: "#999",
                      fontSize: 16,
                      padding: "2px 6px",
                    }}
                  >
                    🗑
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#f4f4f8",
                      borderRadius: 8,
                      padding: "4px 10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#555",
                        cursor: "default",
                      }}
                    >
                      −
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#111",
                        minWidth: 16,
                        textAlign: "center",
                      }}
                    >
                      1
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#555",
                        cursor: "default",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  margin: "10px 10px 0",
                  borderRadius: 14,
                  padding: "12px 14px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#111",
                    }}
                  >
                    منتجات تهمك
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: purple,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  ضيفها بخصم خاص لك الآن
                </div>

                <div
                  style={{
                    background: "rgba(16,185,129,0.07)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    borderRadius: 8,
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#10b981" }}>✓</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>شحن مجاني</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#10b981", marginRight: 6 }}>✓</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>دفع عند الاستلام مجاني</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: 10, fontWeight: 900, color: "#10b981" }}>30 ﷼ وفر</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {products.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        paddingBottom: i < products.length - 1 ? 10 : 0,
                        borderBottom:
                          i < products.length - 1
                            ? "1px solid #f0f0f5"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 8,
                          background: p.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                          flexShrink: 0,
                        }}
                      >
                        {p.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: "#111",
                            marginBottom: 2,
                            lineHeight: 1.3,
                          }}
                        >
                          {p.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            marginBottom: 2,
                          }}
                        >
                          <span style={{ fontSize: 9, color: "#f59e0b" }}>★</span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "#444",
                            }}
                          >
                            {p.rating}
                          </span>
                          <span style={{ fontSize: 9, color: "#888" }}>
                            {p.reviews} مراجعة
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 900,
                              color: "#111",
                            }}
                          >
                            {p.price}{" "}
                            <span style={{ fontSize: 9 }}>﷼</span>
                          </span>
                          {p.originalPrice && (
                            <span
                              style={{
                                fontSize: 9,
                                color: "#aaa",
                                textDecoration: "line-through",
                              }}
                            >
                              {p.originalPrice} ﷼
                            </span>
                          )}
                          {p.discount && (
                            <span
                              style={{
                                fontSize: 8,
                                fontWeight: 700,
                                color: "#7c3aed",
                                background: "rgba(124,58,237,0.1)",
                                borderRadius: 4,
                                padding: "1px 4px",
                              }}
                            >
                              وفر {p.discount}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        style={{
                          background: purple,
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "6px 8px",
                          fontSize: 9,
                          fontWeight: 800,
                          cursor: "default",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          fontFamily: "inherit",
                        }}
                      >
                        اضف للسلة
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  margin: "10px 10px 0",
                  borderRadius: 14,
                  padding: "10px 14px 4px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 900,
                      color: "#111",
                    }}
                  >
                    1165.00{" "}
                    <span style={{ fontSize: 12 }}>ر.س</span>
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: purple,
                    }}
                  >
                    الاجمالي
                  </span>
                </div>
                <button
                  style={{
                    width: "100%",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 0",
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    marginBottom: 10,
                    fontFamily: "inherit",
                  }}
                >
                  🛍 إتمام الطلب
                </button>
              </div>

              <div style={{ height: 16 }} />
            </div>

            <div
              style={{
                height: 20,
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 5,
                  borderRadius: 10,
                  background: "#0f0f1e",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
