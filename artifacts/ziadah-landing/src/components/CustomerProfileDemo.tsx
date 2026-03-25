import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const nasserProducts = [
  { emoji: "🎧", name: "إير بودز برو", nameEn: "AirPods Pro", price: "249", reason: "أكملها مع آيفون 17", reasonEn: "Pairs with iPhone 17" },
  { emoji: "💪", name: "بروتين رياضي", nameEn: "Sports Protein", price: "149", reason: "يناسب نمطه الرياضي", reasonEn: "Matches his sporty lifestyle" },
  { emoji: "⌚", name: "ساعة ذكية", nameEn: "Smart Watch", price: "399", reason: "تكمل ساعته القديمة", reasonEn: "Upgrades his old watch" },
  { emoji: "🎽", name: "تي شيرت برو", nameEn: "Pro T-Shirt", price: "89", reason: "اشترى نفس اللون قبلاً", reasonEn: "Bought same color before" },
];

const nouraProducts = [
  { emoji: "🌹", name: "عطر رمضان الخاص", nameEn: "Ramadan Fragrance", price: "289", reason: "جاءت من إعلان رمضان", reasonEn: "Arrived from Ramadan ad" },
  { emoji: "💆", name: "طقم عناية بالبشرة", nameEn: "Skincare Set", price: "199", reason: "تصفحت كريمات البشرة", reasonEn: "Browsed skincare section" },
  { emoji: "🎁", name: "هدية رمضانية فاخرة", nameEn: "Luxury Ramadan Gift", price: "159", reason: "شائع جداً هذا الموسم", reasonEn: "Trending this season" },
  { emoji: "💐", name: "بخور عود", nameEn: "Oud Incense", price: "99", reason: "مكمل للعطور", reasonEn: "Complements fragrances" },
];

const nasserProfile = {
  name: "ناصر",
  nameEn: "Nasser",
  label: "عميل متكرر",
  labelEn: "Returning Customer",
  tags: [
    { text: "ذكر", textEn: "Male", color: "#6366f1" },
    { text: "آيفون 17", textEn: "iPhone 17", color: "#8b5cf6" },
    { text: "رياضي", textEn: "Sporty", color: "#06b6d4" },
  ],
  stats: [
    { label: "متوسط مشترياته", labelEn: "Avg. Order", value: "261 ⃁", valueEn: "261 SAR" },
    { label: "سلته الحالية", labelEn: "Current Cart", value: "24 ⃁", valueEn: "24 SAR" },
    { label: "وقت الشراء", labelEn: "Shopping Time", value: "7:20م", valueEn: "7:20 PM" },
    { label: "يوم الشراء", labelEn: "Shopping Day", value: "الأحد", valueEn: "Sunday" },
  ],
  payment: "يستخدم تابي",
  paymentEn: "Uses Tabby (BNPL)",
  purchases: ["مطارة", "إير بودز", "شنطة", "كاب", "شماغ", "سبحة", "كريم وجه", "تي شيرت أسود", "عسل", "قهوة 250 ج", "خاتم", "ساعة"],
  purchasesEn: ["Thermos", "AirPods", "Bag", "Cap", "Shemagh", "Prayer beads", "Face cream", "Black T-shirt", "Honey", "Ground coffee 250g", "Ring", "Watch"],
  color: "#6366f1",
  products: nasserProducts,
};

const nouraProfile = {
  name: "نورة",
  nameEn: "Noura",
  label: "زيارة أولى",
  labelEn: "First Visit",
  tags: [
    { text: "أنثى", textEn: "Female", color: "#ec4899" },
    { text: "جوّال أندرويد", textEn: "Android Mobile", color: "#f97316" },
    { text: "عطور وجمال", textEn: "Fragrance & Beauty", color: "#14b8a6" },
  ],
  stats: [
    { label: "مصدر الزيارة", labelEn: "Traffic Source", value: "إعلان رمضان", valueEn: "Ramadan Ad" },
    { label: "القسم الحالي", labelEn: "Current Section", value: "العطور", valueEn: "Fragrances" },
    { label: "وقت الزيارة", labelEn: "Visit Time", value: "3:45م", valueEn: "3:45 PM" },
    { label: "المناسبة", labelEn: "Occasion", value: "رمضان", valueEn: "Ramadan" },
  ],
  payment: "زيارة أولى — بدون بيانات سابقة",
  paymentEn: "First-time visitor — no prior data",
  purchases: [],
  purchasesEn: [],
  color: "#ec4899",
  products: nouraProducts,
};

export default function CustomerProfileDemo() {
  const { isAr } = useLanguage();
  const [hoveredProductByKey, setHoveredProductByKey] = useState<{
    nasser: number | null;
    noura: number | null;
  }>({ nasser: null, noura: null });

  const customers = [
    { key: "nasser" as const, icon: "👨", profile: nasserProfile },
    { key: "noura" as const, icon: "👩", profile: nouraProfile },
  ] as const;

  return (
    <div
      style={{
        margin: "40px 0",
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(124,58,237,0.2)",
        background: "var(--s1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        fontFamily: "var(--font)",
        backdropFilter: "blur(24px)",
        transition: "var(--theme-transition)",
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--b1)",
          background: "var(--s1)",
          padding: "0 24px",
          gap: 4,
          alignItems: "center",
          transition: "var(--theme-transition)",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--td)",
            marginInlineEnd: 16,
            opacity: 0.7,
            paddingBlock: 16,
          }}
        >
          {isAr ? "اختبار العميل (جنباً إلى جنب):" : "Customer test (side-by-side):"}
        </span>
        {customers.map(({ key: customerKey, icon, profile }) => (
          <div
            key={customerKey}
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: `${profile.color}22`,
                border: `1px solid ${profile.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
              }}
            >
              {icon}
            </span>
            <span style={{ fontSize: 14, color: "var(--t)", fontWeight: 800 }}>
              {isAr ? profile.name : profile.nameEn}
            </span>
            <span
              style={{
                fontSize: 10,
                background: `${profile.color}14`,
                color: profile.color,
                padding: "2px 8px",
                borderRadius: 20,
                border: `1px solid ${profile.color}35`,
              }}
            >
              {isAr ? profile.label : profile.labelEn}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
        }}
        className="cpd-grid"
      >
        {customers.map(({ key: customerKey, icon, profile }, idx) => {
          const hoveredIndex = hoveredProductByKey[customerKey];
          const isNasser = customerKey === "nasser";

          return (
            <div
              key={customerKey}
              style={{
                borderInlineEnd: idx === 0 ? "1px solid var(--b1)" : undefined,
              }}
            >
              <div
                style={{
                  padding: "28px 24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${profile.color}44, ${profile.color}22)`,
                      border: `2px solid ${profile.color}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--td)",
                        marginBottom: 2,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {isAr ? "ملف" : "Profile"}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--t)" }}>
                      {isAr ? profile.name : profile.nameEn}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {profile.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: `${tag.color}18`,
                        border: `1px solid ${tag.color}44`,
                        color: tag.color,
                      }}
                    >
                      {isAr ? tag.text : tag.textEn}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {profile.stats.map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--s1)",
                        border: "1px solid var(--b1)",
                        borderRadius: 12,
                        padding: "12px 14px",
                        transition: "var(--theme-transition)",
                      }}
                    >
                      <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 4, lineHeight: 1.3 }}>
                        {isAr ? stat.label : stat.labelEn}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>
                        {isAr ? stat.value : stat.valueEn}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    background: `${profile.color}12`,
                    border: `1px solid ${profile.color}30`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: profile.color,
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  💳 {isAr ? profile.payment : profile.paymentEn}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--td)",
                      marginBottom: 10,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {isAr ? "مشترياته السابقة" : "Past Purchases"}
                  </div>
                  {(isAr ? profile.purchases : profile.purchasesEn).length === 0 ? (
                    <div style={{ fontSize: 13, color: "var(--td)", fontStyle: "italic" }}>
                      {isAr ? "لا توجد مشتريات سابقة (زيارة أولى)" : "No purchase history (first visit)"}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(isAr ? profile.purchases : profile.purchasesEn).map((item, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: 11,
                            padding: "3px 10px",
                            borderRadius: 20,
                            background: "var(--s1)",
                            border: "1px solid var(--b1)",
                            color: "var(--td)",
                            transition: "var(--theme-transition)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: "28px 24px" }}>
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 14px",
                      background: "rgba(168,85,247,0.12)",
                      border: "1px solid rgba(168,85,247,0.25)",
                      borderRadius: 20,
                      fontSize: 11,
                      color: "#c084fc",
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    <span>🧠</span>
                    {isAr ? "زيادة AI" : "Ziadah AI"}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--t)", lineHeight: 1.4 }}>
                    {isAr ? `ما يراه ${profile.name} الآن في متجرك` : `What ${profile.nameEn} sees in your store right now`}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {profile.products.map((prod, i) => (
                    <div
                      key={i}
                      onMouseEnter={() =>
                        setHoveredProductByKey((prev) => ({
                          ...prev,
                          [customerKey]: i,
                        }))
                      }
                      onMouseLeave={() =>
                        setHoveredProductByKey((prev) => ({
                          ...prev,
                          [customerKey]: null,
                        }))
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 16px",
                        background: hoveredIndex === i ? `${profile.color}10` : "var(--s1)",
                        border: `1px solid ${
                          hoveredIndex === i ? `${profile.color}40` : "var(--b1)"
                        }`,
                        borderRadius: 14,
                        cursor: "default",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: `${profile.color}22`,
                          border: `1px solid ${profile.color}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 800,
                          color: profile.color,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ fontSize: 22, flexShrink: 0 }}>{prod.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--t)",
                            marginBottom: 3,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {isAr ? prod.name : prod.nameEn}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--td)", lineHeight: 1.3 }}>
                          💡 {isAr ? prod.reason : prod.reasonEn}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: profile.color,
                          flexShrink: 0,
                        }}
                      >
                        {prod.price} ⃁
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 14px",
                    background: "rgba(168,85,247,0.06)",
                    border: "1px solid rgba(168,85,247,0.15)",
                    borderRadius: 12,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚡</span>
                  <p style={{ fontSize: 12, color: "var(--td)", margin: 0, lineHeight: 1.65 }}>
                    {isAr
                      ? `محرك زيادة حلّل ${
                          isNasser ? "40+ إشارة من بيانات ناصر السابقة" : "سلوك نورة في الوقت الحقيقي"
                        } وولّد هذه التوصيات في أقل من 80ms.`
                      : `Ziadah engine analyzed ${
                          isNasser ? "40+ signals from Nasser's history" : "Noura's real-time behavior"
                        } and generated these in under 80ms.`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .cpd-grid {
            grid-template-columns: 1fr !important;
          }
          .cpd-grid > div:first-child {
            border-inline-end: none !important;
            border-bottom: 1px solid var(--b1);
          }
        }
      `}</style>
    </div>
  );
}
