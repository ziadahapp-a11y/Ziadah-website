import type { ReactElement } from "react";
import { useState } from "react";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "@/components/PlatformModal";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/sectorHtmlPage.css";

/* ─────────────────────────────────────────────────────────────────
   Use-Case Pages Showcase
   Uses the same sector-html CSS system (phone shell, floating tags,
   scan animation, badge, hero-grid, CTA buttons).
───────────────────────────────────────────────────────────────── */

interface ShowcaseCase {
  icon: string;
  titleAr: string;
  titleEn: string;
  gradLineAr: string; // second line rendered as gradient text
  gradLineEn: string;
  tagAr: string;
  tagEn: string;
  descAr: string;
  descEn: string;
  bulletAr: string[];
  bulletEn: string[];
  float1Ar: string;
  float1En: string;
  float2Ar: string;
  float2En: string;
  accentColor: string;
  href: string;
  MockupContent: () => ReactElement;
}

/* ─── phone inner content components ─── */

function MiniStatusBar({ accent }: { accent: string }) {
  return (
    <div className="sector-html-phone-bar" style={{ padding: "0 2px 8px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: accent }}>9:41</div>
      <div className="sector-html-pb-time">▓▓▓</div>
    </div>
  );
}

/* ── PRODUCT PAGE ── */
export function ProductPageMockup() {
  const accent = "#7c3aed";
  const accentLight = "#c084fc";
  const surface = "linear-gradient(155deg, rgba(255,255,255,.94) 0%, rgba(248,245,255,.9) 100%)";
  const rowHi =
    "linear-gradient(90deg, rgba(124, 58, 237,.14) 0%, rgba(192, 132, 252,.09) 55%, rgba(255,255,255,.5) 100%)";
  const rowLo = "rgba(255,255,255,.72)";
  const borderSoft = "rgba(124, 58, 237,.14)";
  const borderHi = "rgba(124, 58, 237,.32)";
  return (
    <>
      <MiniStatusBar accent={accent} />
      {/* product card */}
      <div
        style={{
          background: surface,
          borderRadius: 14,
          padding: "10px 11px",
          marginBottom: 10,
          border: `1px solid ${borderSoft}`,
          boxShadow: "0 4px 16px rgba(124, 58, 237,.07), inset 0 1px 0 rgba(255,255,255,.9)",
        }}
      >
        <div
          style={{
            height: 72,
            borderRadius: 10,
            background: `linear-gradient(145deg, ${accentLight}33 0%, ${accent}22 48%, rgba(124, 58, 237,.12) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            marginBottom: 8,
            border: `1px solid ${borderSoft}`,
          }}
        >
          📿
        </div>
        <p style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          مسبحة باكليت حمراء
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: accent, fontVariantNumeric: "tabular-nums" }}>
            200 SAR
          </span>
          <span style={{ fontSize: 12, fontWeight: 700 }}>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <span style={{ color: "var(--tm)", fontWeight: 600, marginInlineStart: 4 }}>(200)</span>
          </span>
        </div>
      </div>
      {/* section divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <div
          style={{
            width: 4,
            height: 14,
            borderRadius: 3,
            background: `linear-gradient(180deg, ${accentLight}, ${accent})`,
            boxShadow: `0 0 12px ${accent}44`,
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>اشترِ أكثر ووفّر أكثر</span>
      </div>
      {[
        { label: "قطعة واحدة", price: "200 SAR", tag: null, hi: false },
        { label: "قطعتان", price: "320 SAR", tag: "خصم 20%", hi: false },
        { label: "3 قطع", price: "420 SAR", tag: "⭐ أفضل قيمة", hi: true },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            background: o.hi ? rowHi : rowLo,
            border: `1px solid ${o.hi ? borderHi : borderSoft}`,
            borderRadius: 10,
            padding: "8px 10px",
            marginBottom: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: o.hi ? "0 2px 12px rgba(124, 58, 237,.12)" : "inset 0 1px 0 rgba(255,255,255,.85)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: o.hi ? accent : "var(--tm)" }}>{o.label}</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {o.tag ? (
              <span
                style={{
                  fontSize: 12,
                  padding: "2px 7px",
                  borderRadius: 6,
                  background: o.hi ? "rgba(124, 58, 237,.2)" : "rgba(124, 58, 237,.12)",
                  color: accent,
                  fontWeight: 800,
                }}
              >
                {o.tag}
              </span>
            ) : null}
            <span style={{ fontSize: 12, fontWeight: 900, color: o.hi ? accent : "var(--t)" }}>{o.price}</span>
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 8,
          padding: "9px 0",
          borderRadius: 10,
          background: "linear-gradient(135deg,#a855f7,#7c3aed 55%,#6d28d9)",
          fontSize: 12,
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(124, 58, 237,.35), inset 0 1px 0 rgba(255,255,255,.22)",
        }}
      >
        🛒 إضافة للسلة
      </div>
    </>
  );
}

/* ── CART PAGE ── */
function CartPageContent() {
  const accent = "#06b6d4";
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 9, display: "flex", alignItems: "center", gap: 5 }}>
        <span>🛒</span> سلتك (2 منتجات)
      </div>
      {[{ emoji: "📿", name: "مسبحة باكليت", price: "200 SAR" }, { emoji: "🪔", name: "بخور عود أصيل", price: "95 SAR" }].map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 6, background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(6,182,212,.14)", borderRadius: 9, padding: "6px 8px", marginBottom: 6, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(6,182,212,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{p.emoji}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 1 }}>{p.name}</p>
            <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>{p.price}</span>
          </div>
        </div>
      ))}
      <div style={{ background: "rgba(6,182,212,.07)", border: "1px solid rgba(6,182,212,.22)", borderRadius: 9, padding: "7px 9px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>🚚 شحن مجاني عند 350 SAR</span>
          <span style={{ fontSize: 12, color: "var(--td)" }}>أضف 55 SAR</span>
        </div>
        <div style={{ height: 4, background: "rgba(6,182,212,.15)", borderRadius: 3 }}>
          <div style={{ width: "84%", height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${accent}, #22d3ee)` }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <div style={{ width: 3, height: 12, borderRadius: 2, background: accent, boxShadow: `0 0 5px ${accent}` }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>منتجات ذات صلة</span>
      </div>
      {[{ emoji: "🌿", name: "زيت بخور", price: "75 SAR" }, { emoji: "🎁", name: "حقيبة هدية", price: "35 SAR" }].map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 6, background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(6,182,212,.12)", borderRadius: 8, padding: "5px 7px", marginBottom: 5, alignItems: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(6,182,212,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{p.emoji}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 1 }}>{p.name}</p>
            <span style={{ fontSize: 12, color: accent, fontWeight: 800 }}>{p.price}</span>
          </div>
          <span className="sector-html-rbi-add" style={{ fontSize: 12 }}>+ أضف</span>
        </div>
      ))}
    </>
  );
}

/* ── CHECKOUT PAGE ── */
function CheckoutPageContent() {
  const accent = "#8b5cf6";
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 9, display: "flex", alignItems: "center", gap: 5 }}>
        <span>💳</span> إتمام الطلب
      </div>
      <div style={{ background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 10, padding: "8px 9px", marginBottom: 8 }}>
        <p style={{ fontSize: 12, color: "var(--td)", marginBottom: 6 }}>ملخص الطلب</p>
        {[["المنتجات (2)", "295 SAR"], ["الشحن", "مجاني 🎉"], ["الإجمالي", "295 SAR"]].map(([k, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 12, color: "var(--tm)" }}>{k}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: i === 2 ? accent : "var(--t)" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.28)", borderRadius: 10, padding: "8px 9px", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>✨ أضف قبل إتمام الطلب</span>
        {[{ emoji: "🎁", name: "تغليف هدية فاخر", price: "15 SAR" }, { emoji: "🛡️", name: "ضمان إضافي سنة", price: "25 SAR" }].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 5, alignItems: "center", background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(16,185,129,.1)", borderRadius: 7, padding: "5px 6px", marginTop: 5 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(16,185,129,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{a.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 1 }}>{a.name}</p>
              <span style={{ fontSize: 12, color: accent, fontWeight: 800 }}>{a.price}</span>
            </div>
            <div style={{ width: 15, height: 15, borderRadius: 4, border: "1.5px solid rgba(16,185,129,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: accent }}>+</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 0", borderRadius: 9, background: "linear-gradient(135deg,#8b5cf6,rgba(16,185,129,.7))", textAlign: "center", fontSize: 12, fontWeight: 800, color: "#fff", boxShadow: "0 4px 12px rgba(16,185,129,.4)" }}>✅ إتمام الطلب الآن</div>
    </>
  );
}

/* ── THANK YOU PAGE ── */
function ThankYouPageContent() {
  const accent = "#f59e0b";
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ textAlign: "center", padding: "8px 0 10px" }}>
        <div style={{ fontSize: 26, marginBottom: 4 }}>🎉</div>
        <p style={{ fontSize: 12, fontWeight: 900, color: "var(--t)", marginBottom: 2 }}>تم تأكيد طلبك!</p>
        <p style={{ fontSize: 12, color: "var(--td)" }}>رقم الطلب #ZD-4821</p>
      </div>
      <div style={{ height: 1, background: "rgba(245,158,11,.2)", margin: "0 0 9px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
        <div style={{ width: 3, height: 12, borderRadius: 2, background: accent, boxShadow: `0 0 5px ${accent}` }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>قد يعجبك أيضاً</span>
      </div>
      {[
        { emoji: "🪔", name: "بخور فاخر", price: "85 SAR", tag: "+13% يشترونه معاً" },
        { emoji: "🌿", name: "زيت أرجان طبيعي", price: "120 SAR", tag: "الأكثر مبيعاً" },
      ].map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 6, background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(245,158,11,.15)", borderRadius: 9, padding: "6px 8px", marginBottom: 6, alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(245,158,11,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{p.emoji}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 2 }}>{p.name}</p>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: accent, fontWeight: 800 }}>{p.price}</span>
              <span style={{ fontSize: 12, padding: "1px 4px", borderRadius: 4, background: "rgba(245,158,11,.12)", color: accent, fontWeight: 700 }}>{p.tag}</span>
            </div>
          </div>
          <span className="sector-html-rbi-add" style={{ fontSize: 12 }}>شراء</span>
        </div>
      ))}
      <div style={{ background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.2)", borderRadius: 9, padding: "7px 9px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--tm)", lineHeight: 1.5 }}>🏆 لديك <b style={{ color: accent }}>580 نقطة</b> — اطلب مجدداً للوصول إلى مكافأة 10%</p>
      </div>
    </>
  );
}

/* ── HOME PAGE ── */
function HomePageContent() {
  const accent = "#7c3aed";
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
        <span style={{ fontSize: 12, fontWeight: 900, color: "var(--t)" }}>متجر النخبة</span>
        <span style={{ fontSize: 13 }}>🛒</span>
      </div>
      <div style={{ background: "rgba(124, 58, 237,.1)", border: "1px solid rgba(124, 58, 237,.22)", borderRadius: 10, padding: "9px 10px", marginBottom: 9 }}>
        <p style={{ fontSize: 12, color: accent, fontWeight: 700, marginBottom: 3 }}>✨ مرحباً عمر، عاد موسمك المفضل!</p>
        <p style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 5 }}>عطور ومسابح رمضان 🌙</p>
        <div style={{ display: "flex", gap: 5 }}>
          {["📿", "🕌", "🪔"].map((e, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(124, 58, 237,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, border: "1px solid rgba(124, 58, 237,.18)" }}>{e}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
        <div style={{ width: 3, height: 12, borderRadius: 2, background: accent, boxShadow: `0 0 5px ${accent}` }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>مقترح لك بناءً على مشترياتك</span>
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "clip" }}>
        {[{ emoji: "🌿", name: "زيت بخور", price: "75 SAR" }, { emoji: "🎁", name: "طقم هدايا", price: "150 SAR" }, { emoji: "🪬", name: "حرز فضة", price: "90 SAR" }].map((p, i) => (
          <div key={i} style={{ minWidth: 68, background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(124, 58, 237,.14)", borderRadius: 9, padding: "6px 5px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ height: 38, borderRadius: 6, background: "rgba(124, 58, 237,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 4 }}>{p.emoji}</div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 2 }}>{p.name}</p>
            <span style={{ fontSize: 12, color: accent, fontWeight: 800 }}>{p.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── CATEGORY PAGE ── */
function CategoryPageContent() {
  const accent = "#4f46e5";
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
        <span>🗂️</span> تصنيف: مسابح وتراث
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {["الكل", "مسابح", "عطور", "هدايا"].map((f, i) => (
          <div key={i} style={{ padding: "3px 8px", borderRadius: 20, background: i === 0 ? accent : "color-mix(in srgb, var(--bg) 55%, transparent)", border: `1px solid ${i === 0 ? accent : "rgba(79,70,229,.2)"}`, fontSize: 12, fontWeight: 700, color: i === 0 ? "#fff" : "var(--tm)" }}>{f}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
        {[{ emoji: "📿", name: "مسبحة كهرمان", price: "320 SAR" }, { emoji: "🪬", name: "حرز فضة", price: "180 SAR" }, { emoji: "🕌", name: "سجادة صلاة", price: "95 SAR" }, { emoji: "🌿", name: "بخور عربي", price: "65 SAR" }].map((p, i) => (
          <div key={i} style={{ background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(79,70,229,.14)", borderRadius: 9, padding: "7px 6px" }}>
            <div style={{ height: 38, borderRadius: 6, background: "rgba(79,70,229,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 4 }}>{p.emoji}</div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 1 }}>{p.name}</p>
            <span style={{ fontSize: 12, color: accent, fontWeight: 800 }}>{p.price}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <div style={{ width: 3, height: 12, borderRadius: 2, background: accent, boxShadow: `0 0 5px ${accent}` }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: accent }}>تكمّل بعضها — اشترِ معاً</span>
      </div>
      <div style={{ background: "rgba(79,70,229,.07)", border: "1px solid rgba(79,70,229,.22)", borderRadius: 9, padding: "7px 9px", display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ fontSize: 12 }}>📿</span>
        <span style={{ fontSize: 12, color: "var(--td)" }}>+</span>
        <span style={{ fontSize: 12 }}>🌿</span>
        <div style={{ flex: 1, marginInlineStart: 3 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 1 }}>مسبحة + بخور معاً</p>
          <span style={{ fontSize: 12, color: accent, fontWeight: 700 }}>385 SAR — وفّر 15%</span>
        </div>
      </div>
    </>
  );
}

/* ── ALL PAGES ── */
function AllPagesContent() {
  const accent = "#ec4899";
  const rows = [
    { icon: "🏠", label: "الصفحة الرئيسية", status: "نشط", ok: true },
    { icon: "📄", label: "صفحة المنتج", status: "نشط", ok: true },
    { icon: "🛒", label: "صفحة السلة", status: "نشط", ok: true },
    { icon: "💳", label: "صفحة الدفع", status: "مجدوَل", ok: false },
    { icon: "🙏", label: "صفحة الشكر", status: "نشط", ok: true },
    { icon: "🗂️", label: "صفحة التصنيف", status: "نشط", ok: true },
  ];
  return (
    <>
      <MiniStatusBar accent={accent} />
      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
        <span>🌐</span> كل صفحات متجرك
      </div>
      {rows.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid rgba(236,72,153,.12)", borderRadius: 8, padding: "5px 8px", marginBottom: 5 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(236,72,153,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{p.icon}</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", flex: 1 }}>{p.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.ok ? "#00d4a0" : "#f59e0b", boxShadow: `0 0 5px ${p.ok ? "#00d4a0" : "#f59e0b"}` }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: p.ok ? "#00d4a0" : "#f59e0b" }}>{p.status}</span>
          </div>
        </div>
      ))}
      <div style={{ background: "rgba(236,72,153,.07)", border: "1px solid rgba(236,72,153,.22)", borderRadius: 8, padding: "7px 9px", textAlign: "center", marginTop: 2 }}>
        <span style={{ fontSize: 12, color: accent, fontWeight: 700 }}>⚡ منطق واحد — تغطية كاملة</span>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CASE DATA
───────────────────────────────────────────── */
const CASES: ShowcaseCase[] = [
  {
    icon: "📄",
    titleAr: "صفحة المنتج",
    titleEn: "Product Page",
    gradLineAr: "أعلى نقطة تأثير",
    gradLineEn: "Highest-impact moment",
    tagAr: "في لحظة تأمّل المنتج",
    tagEn: "While browsing products",
    descAr: "في اللحظة التي يتأمل فيها العميل المنتج، تبدأ زيادة بتقديم عرض يكمّل تجربته ويرفع قيمة طلبه — تلقائياً وبدون تدخل.",
    descEn: "The moment a customer views a product, Ziadah suggests the perfect complement to lift order value — automatically.",
    bulletAr: ["اشترِ أكثر ووفّر أكثر — عروض كمية ذكية", "اشترِ معاً — منتجات متوافقة في عرض واحد", "Bundle Deals — كومبو بسعر خاص", "Upsell — اقترح الخيار الأعلى قيمة"],
    bulletEn: ["Buy More Save More — smart quantity offers", "Buy Together — compatible items in one deal", "Bundle Deals — combo at a special price", "Upsell — recommend the higher-value option"],
    float1Ar: "📈 +32% متوسط السلة",
    float1En: "📈 +32% avg order value",
    float2Ar: "🛒 اشترِ أكثر ووفّر",
    float2En: "🛒 Buy More Save More",
    accentColor: "#a855f7",
    href: "/use-cases/product-page",
    MockupContent: ProductPageMockup,
  },
  {
    icon: "🛒",
    titleAr: "صفحة السلة",
    titleEn: "Cart Page",
    gradLineAr: "قبل إتمام الطلب",
    gradLineEn: "Before checkout",
    tagAr: "آخر فرصة لرفع القيمة",
    tagEn: "Last chance to lift AOV",
    descAr: "السلة هي آخر فرصة لرفع قيمة الطلب قبل الإتمام — نعرض منتجات ذات صلة وشريط الشحن المجاني لتحفيز الإضافة.",
    descEn: "The cart is the last chance to increase order value — we show related products and a free-shipping nudge to encourage adding more.",
    bulletAr: ["شريط الشحن المجاني — وضّح المسافة المتبقية", "منتجات ذات صلة — اقتراحات مباشرة في السلة", "كوبونات الخصم — احتفظ بالعميل داخل السلة"],
    bulletEn: ["Free shipping bar — show the remaining threshold", "Related products — contextual in-cart suggestions", "Discount coupons — keep the customer engaged"],
    float1Ar: "🚚 شحن مجاني عند 350 SAR",
    float1En: "🚚 Free shipping at 350 SAR",
    float2Ar: "📦 +18% قيمة الطلب",
    float2En: "📦 +18% order value",
    accentColor: "#06b6d4",
    href: "/use-cases/cart-page",
    MockupContent: CartPageContent,
  },
  {
    icon: "💳",
    titleAr: "صفحة الدفع",
    titleEn: "Checkout Page",
    gradLineAr: "اللحظة الأخيرة",
    gradLineEn: "Last-step offers",
    tagAr: "إضافات بنقرة واحدة",
    tagEn: "One-tap add-ons",
    descAr: "في لحظة إتمام الدفع، نعرض إضافات خفيفة وخدمات تكميلية تُضاف بنقرة واحدة — دون الخروج من تدفق الدفع.",
    descEn: "At the checkout moment, we surface light add-ons and services added with a single tap — without leaving the payment flow.",
    bulletAr: ["Add-ons — خيارات إضافية بنقرة واحدة", "تغليف الهدايا والضمان — خدمات تكميلية", "عروض الشحن السريع — تحفيز اتخاذ القرار"],
    bulletEn: ["Add-ons — one-tap extras", "Gift wrap & warranty — upsell services", "Express shipping offers — decision nudge"],
    float1Ar: "✨ Add-ons بنقرة",
    float1En: "✨ One-tap add-ons",
    float2Ar: "💳 إتمام أسرع",
    float2En: "💳 Faster checkout",
    accentColor: "#8b5cf6",
    href: "/use-cases/checkout-page",
    MockupContent: CheckoutPageContent,
  },
  {
    icon: "🙏",
    titleAr: "صفحة الشكر",
    titleEn: "Thank-You Page",
    gradLineAr: "بعد الشراء",
    gradLineEn: "Post-purchase",
    tagAr: "العميل في قمة رضاه",
    tagEn: "Customer satisfaction peak",
    descAr: "بعد إتمام الطلب العميل في قمة رضاه — هذه هي اللحظة المثالية لاقتراح ما يُكمل مشتراه ويبني علاقة طويلة الأمد.",
    descEn: "After purchase, satisfaction is at its peak — the perfect moment to suggest complementary products and build loyalty.",
    bulletAr: ["منتجات مقترحة بناءً على ما اشتراه", "برامج الولاء — بناء علاقة مستدامة", "عروض الشراء المتكرر — حوّله لعميل دائم"],
    bulletEn: ["Post-purchase recommendations", "Loyalty programs — build lasting relationships", "Repeat purchase offers — turn buyers into regulars"],
    float1Ar: "🏆 ولاء وتكرار",
    float1En: "🏆 Loyalty & retention",
    float2Ar: "⭐ اقتراحات ذكية",
    float2En: "⭐ Smart suggestions",
    accentColor: "#f59e0b",
    href: "/use-cases/thank-you-page",
    MockupContent: ThankYouPageContent,
  },
  {
    icon: "🏠",
    titleAr: "الصفحة الرئيسية",
    titleEn: "Home Page",
    gradLineAr: "أول انطباع مخصص",
    gradLineEn: "Personalized first touch",
    tagAr: "كل زائر يرى ما يناسبه",
    tagEn: "Every visitor sees their own",
    descAr: "كل زائر يرى نسخة مخصصة من الصفحة الرئيسية — توصيات تعكس اهتماماته وسلوكه السابق لزيادة التفاعل من اللحظة الأولى.",
    descEn: "Every visitor sees a tailored home page — recommendations reflecting their interests and history to drive engagement from the first second.",
    bulletAr: ["توصيات مخصصة حسب سلوك الزائر", "بانرات موسمية ذكية تتكيف تلقائياً", "منتجات العودة — لمن زار ولم يشترِ"],
    bulletEn: ["Personalized recommendations per visitor", "Smart seasonal banners that auto-adapt", "Return-visit products — for browsers who didn't buy"],
    float1Ar: "✨ تخصيص آني",
    float1En: "✨ Real-time personalization",
    float2Ar: "👤 كل زائر مختلف",
    float2En: "👤 Every visitor is unique",
    accentColor: "#7c3aed",
    href: "/use-cases/home-page",
    MockupContent: HomePageContent,
  },
  {
    icon: "🗂️",
    titleAr: "صفحة التصنيف",
    titleEn: "Category Page",
    gradLineAr: "في منتصف رحلة الاكتشاف",
    gradLineEn: "Mid-discovery journey",
    tagAr: "الاكتشاف يفتح الباب للتوصيات",
    tagEn: "Discovery opens the door",
    descAr: "في لحظة تصفح التصنيف يكون العميل منفتحاً على الاكتشاف — نعرض منتجات تكمّل بعضها وعروض اشترِ معاً لرفع قيمة الاختيار.",
    descEn: "Category browsers are open to discovery — we surface complementary bundles and Buy Together offers to lift basket value.",
    bulletAr: ["اشترِ معاً — توصيات مترابطة داخل التصنيف", "منتجات مقترحة حسب الفئة المختارة", "عروض الحزمة في بطاقة المنتج مباشرة"],
    bulletEn: ["Buy Together — cross-category recommendations", "Suggestions based on the selected category", "Bundle offer shown directly in product cards"],
    float1Ar: "🤝 اشترِ معاً",
    float1En: "🤝 Buy Together",
    float2Ar: "📊 +24% قيمة الاختيار",
    float2En: "📊 +24% basket value",
    accentColor: "#4f46e5",
    href: "/use-cases/category-page",
    MockupContent: CategoryPageContent,
  },
  {
    icon: "🌐",
    titleAr: "جميع الصفحات",
    titleEn: "All Pages",
    gradLineAr: "تغطية شاملة",
    gradLineEn: "Full-store coverage",
    tagAr: "منطق واحد — كل صفحة",
    tagEn: "One logic — every page",
    descAr: "منطق واحد يُفعَّل عبر كامل المتجر — من الصفحة الرئيسية حتى الشكر — لضمان تجربة متسقة في كل نقطة تماس مع العميل.",
    descEn: "One logic layer activated across your full store — from home to thank-you — ensuring a consistent experience at every touchpoint.",
    bulletAr: ["قاعدة واحدة تعمل في كل صفحة", "تحكم مركزي — لوحة إدارة موحدة", "تقارير مجمّعة لأداء كل صفحة"],
    bulletEn: ["One rule works across every page", "Central control — unified dashboard", "Aggregated reports for every page's performance"],
    float1Ar: "⚡ منطق واحد",
    float1En: "⚡ One unified logic",
    float2Ar: "🌐 تغطية كاملة",
    float2En: "🌐 Full-store coverage",
    accentColor: "#ec4899",
    href: "/use-cases/all-pages",
    MockupContent: AllPagesContent,
  },
];

/* ─────────────────────────────────────────────────────────────────
   ROW — uses sector-html-hero-grid + sector-html-phone-wrap
───────────────────────────────────────────── */
function UseCaseRow({
  c, idx, isAr, onActivate,
}: {
  c: ShowcaseCase;
  idx: number;
  isAr: boolean;
  onActivate: () => void;
}) {
  const title = isAr ? c.titleAr : c.titleEn;
  const gradLine = isAr ? c.gradLineAr : c.gradLineEn;
  const tag = isAr ? c.tagAr : c.tagEn;
  const desc = isAr ? c.descAr : c.descEn;
  const bullets = isAr ? c.bulletAr : c.bulletEn;
  const float1 = isAr ? c.float1Ar : c.float1En;
  const float2 = isAr ? c.float2Ar : c.float2En;
  const learnMore = isAr ? "تفاصيل" : "Details";
  const activateLabel = isAr ? "فعّل الآن" : "Activate";
  const reverse = idx % 2 === 1;

  return (
    <div
      className={`rv d${(idx % 3) + 1}`}
      style={{
        borderBottom: "1px solid var(--b1)",
        padding: "clamp(40px,5vw,72px) 0",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <div
        className="sector-html-hero-grid"
        style={{ maxWidth: "100%" }}
      >
        {/* ── TEXT column ── */}
        <div style={{ order: reverse ? 2 : 1 }}>
          <div className="sector-html-badge">
            {c.icon} {tag}
          </div>

          <h3 className="sector-html-hero-h">
            {title}
            <br />
            <span className="sector-html-grad">{gradLine}</span>
          </h3>

          <p className="sector-html-hero-sub">{desc}</p>

          {/* bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 28 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: "color-mix(in srgb, var(--p) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--p) 28%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  <span style={{ fontSize: 12, color: "var(--p)" }}>✓</span>
                </div>
                <span style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>

          <div className="sector-html-cta-row">
            <button
              type="button"
              className="sector-html-btn sector-html-btn--fire"
              onClick={onActivate}
            >
              🚀 {activateLabel}
            </button>
            <button
              type="button"
              className="sector-html-btn sector-html-btn--ghost"
              onClick={() => navigateTo(c.href)}
            >
              {learnMore} →
            </button>
          </div>
        </div>

        {/* ── VISUAL column (phone + floating tags) ── */}
        <div style={{ order: reverse ? 1 : 2 }}>
          <div className="sector-html-phone-wrap">
            {/* floating tag 1 */}
            <div className="sector-html-ftag sector-html-ftag--1">
              <span className="sector-html-fdot sector-html-fdot--g" />
              <span>{float1}</span>
            </div>

            {/* phone shell */}
            <div className="sector-html-phone">
              <div className="sector-html-phone-inner">
                <c.MockupContent />
              </div>
            </div>

            {/* floating tag 2 */}
            <div className="sector-html-ftag sector-html-ftag--2">
              <span className="sector-html-fdot sector-html-fdot--gold" />
              <span>{float2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO PHONE WRAPPER — for use as heroVisual in individual pages
   Wraps content in sector-html-phone + floating tags
───────────────────────────────────────────── */
export function PageHeroPhone({
  children,
  float1,
  float2,
}: {
  children: React.ReactNode;
  float1: string;
  float2: string;
}) {
  return (
    <div className="sector-html sector-html-phone-wrap" style={{ margin: "0 auto" }}>
      <div className="sector-html-ftag sector-html-ftag--1">
        <span className="sector-html-fdot sector-html-fdot--g" />
        <span>{float1}</span>
      </div>
      <div className="sector-html-phone">
        <div className="sector-html-phone-inner">{children}</div>
      </div>
      <div className="sector-html-ftag sector-html-ftag--2">
        <span className="sector-html-fdot sector-html-fdot--gold" />
        <span>{float2}</span>
      </div>
    </div>
  );
}

function trimFloat(s: string, max: number) {
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

/** Generic in-phone preview when a use-case page has no custom `heroVisual`. */
export function UseCaseGenericHeroMock({
  hero,
  stats,
}: {
  hero: { icon: string; title: string; tagline: string };
  stats: Array<{ value: string; label: string; color?: string }>;
}) {
  const { dir, lang } = useLanguage();
  const isEn = lang === "en";
  const accent = "var(--p)";
  const chip = (s: (typeof stats)[0], i: number) => (
    <div
      key={i}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        padding: "7px 9px",
        borderRadius: 10,
        marginBottom: 6,
        border: `1px solid color-mix(in srgb, ${s.color || accent} 35%, transparent)`,
        background: `color-mix(in srgb, ${s.color || accent} 8%, transparent)`,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 800, color: s.color || accent }}>{s.value}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--td)", lineHeight: 1.35, textAlign: dir === "rtl" ? "right" : "left" }}>
        {s.label}
      </span>
    </div>
  );

  return (
    <div dir={dir} style={{ fontFamily: "var(--font, system-ui)", padding: "0 2px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, fontWeight: 700, marginBottom: 10, color: "var(--td)" }}>
        <span>9:41</span>
        <span aria-hidden>📶 🔋</span>
      </div>
      <div
        style={{
          borderRadius: 14,
          padding: "12px 11px",
          border: "1px solid color-mix(in srgb, var(--p) 22%, transparent)",
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }}>{hero.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: "var(--t)", lineHeight: 1.35, marginBottom: 6 }}>
          {hero.title}
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--tm)", lineHeight: 1.55 }}>{hero.tagline}</div>
      </div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--p)", marginBottom: 6, letterSpacing: "0.04em" }}>
        {isEn ? "LIVE INSIGHTS" : "مؤشرات مباشرة"}
      </div>
      {stats.slice(0, 2).map((s, i) => chip(s, i))}
      <button
        type="button"
        style={{
          width: "100%",
          marginTop: 4,
          border: "none",
          borderRadius: 10,
          padding: "9px 0",
          fontSize: 11,
          fontWeight: 900,
          cursor: "default",
          color: "#fff",
          background: "linear-gradient(135deg, #a855f7, #7c3aed)",
        }}
      >
        {isEn ? "Smart offers on" : "عروض ذكية على"}
      </button>
    </div>
  );
}

/** Default hero phone + tags for any solution page without a custom visual. */
export function DefaultUseCaseHeroPhone({
  hero,
  stats,
}: {
  hero: { icon: string; title: string; tagline: string };
  stats: Array<{ value: string; label: string; color?: string }>;
}) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const float1 = stats[0]
    ? trimFloat(`${stats[0].value} · ${stats[0].label}`, 34)
    : isEn
      ? "AI offers live"
      : "عروض ذكية فوراً";
  const float2 = stats[1]
    ? trimFloat(`${stats[1].value} · ${stats[1].label}`, 34)
    : trimFloat(hero.tagline, 36);

  return (
    <PageHeroPhone float1={float1} float2={float2}>
      <UseCaseGenericHeroMock hero={hero} stats={stats} />
    </PageHeroPhone>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
export default function UseCasePagesShowcase({ isAr }: { isAr: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const isArLang = lang === "ar";
  const effectiveIsAr = isAr ?? isArLang;

  return (
    <>
    <section
      className="sector-html"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "0 var(--page-inline-pad) 80px",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        {/* heading */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="sector-html-badge" style={{ margin: "0 auto 16px" }}>
            {effectiveIsAr ? "حالات الاستخدام — حسب الصفحة" : "Use Cases — By Page"}
          </div>
          <h2
            className="sector-html-hero-h"
            style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 14px" }}
          >
            {effectiveIsAr ? "كيف تعمل زيادة في " : "How Ziadah Works on "}
            <span className="sector-html-grad">
              {effectiveIsAr ? "كل صفحة من متجرك" : "Every Page of Your Store"}
            </span>
          </h2>
          <p
            className="sector-html-hero-sub"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: 560 }}
          >
            {effectiveIsAr
              ? "من أول لحظة يدخل فيها العميل حتى بعد إتمام طلبه — لكل صفحة دور واضح في رفع قيمة التجربة."
              : "From the first visit to post-checkout — every page plays a clear role in lifting experience value."}
          </p>
        </div>

        {/* rows */}
        {CASES.map((c, i) => (
          <UseCaseRow key={c.href} c={c} idx={i} isAr={effectiveIsAr} onActivate={() => setModalOpen(true)} />
        ))}
      </div>
    </section>
    <PlatformModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
