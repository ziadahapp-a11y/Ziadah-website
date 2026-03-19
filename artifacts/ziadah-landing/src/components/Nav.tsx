import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

const Logo = () => (
  <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <img src="/logo.png" alt="زيادة" style={{ height: 40, width: "auto" }} />
  </Link>
);

interface UseCaseItem {
  label: string;
  href: string;
  subtitle?: string;
}

interface UseCaseSection {
  title: string;
  items: UseCaseItem[];
}

const useCasesDropdown: { sections: UseCaseSection[] } = {
  sections: [
    {
      title: "حسب الصفحات",
      items: [
        { label: "صفحة المنتج", href: "/use-cases/product-page" },
        { label: "صفحة السلة", href: "/use-cases/cart" },
        { label: "صفحة الدفع", href: "/use-cases/checkout" },
        { label: "صفحة الشكر", href: "/use-cases/thank-you" },
        { label: "الصفحة الرئيسية", href: "/use-cases/home" },
        { label: "صفحة التصنيف", href: "/use-cases/category" },
        { label: "جميع الصفحات", href: "/use-cases/all-pages" },
      ],
    },
    {
      title: "حسب الأنشطة",
      items: [
        { label: "البيع المتقاطع", href: "/use-cases/cross-sell", subtitle: "اقترح منتجات مكملة لزيادة السلة" },
        { label: "البيع البديل", href: "/use-cases/upsell", subtitle: "اعرض بديل أغلى بقيمة أعلى" },
      ],
    },
    {
      title: "حسب طريقة العرض",
      items: [
        { label: "منتجات ذات صلة", href: "/use-cases/related-products", subtitle: "زر الإضافة مع كل توصية" },
        { label: "الإضافات (Add-ons)", href: "/use-cases/addons", subtitle: "اختبار متعدد لتعظيم القبول" },
        { label: "الشراء معاً", href: "/use-cases/buy-together", subtitle: "تجميع منتجات مترابطة" },
        { label: "عروض الحزم", href: "/use-cases/bundle-deals", subtitle: "أكثر من منتج بسعر مخفض" },
        { label: "اشترِ أكثر ووفّر أكثر", href: "/use-cases/buy-more-save-more", subtitle: "عروض الكميات التدريجية" },
      ],
    },
    {
      title: "حسب الأهداف",
      items: [
        { label: "زيادة متوسط السلة", href: "/use-cases/increase-aov" },
        { label: "تقليل التخلي عن السلة", href: "/use-cases/reduce-abandon" },
        { label: "رفع معدل التحويل", href: "/use-cases/increase-conversion" },
      ],
    },
  ],
};

const platformItems = [
  { label: "سلة", href: "https://apps.salla.sa", enabled: true },
  { label: "زد", href: "https://apps.zid.sa/application/1826", enabled: true },
  { label: "شوبيفاي", href: "#", enabled: false, badge: "قريباً" },
];

function DropdownWrapper({ children, onHoverStart, onHoverEnd }: { children: React.ReactNode; onHoverStart: () => void; onHoverEnd: () => void }) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}

function UseCasesMegaMenu() {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 760,
      background: "rgba(8,6,20,.97)", border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: 20, backdropFilter: "blur(32px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
    }}>
      {useCasesDropdown.sections.map((section) => (
        <div key={section.title}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 10, paddingRight: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            {section.title}
          </div>
          {section.items.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              style={{
                display: "block", padding: "8px 8px", borderRadius: 10,
                textDecoration: "none", transition: "background .2s", fontSize: 13,
                fontWeight: 500, color: "#fff",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {item.label}
              {item.subtitle && (
                <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 2 }}>
                  {item.subtitle}
                </span>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

function PlatformsDropdown() {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 200,
      background: "rgba(8,6,20,.97)", border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
    }}>
      {platformItems.map((item) => {
        if (!item.enabled) {
          return (
            <div
              key={item.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 12, color: "rgba(255,255,255,.3)",
                fontSize: 14, fontWeight: 500, cursor: "default",
              }}
            >
              <span>{item.label}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,.08)",
                color: "rgba(255,255,255,.35)", padding: "2px 8px", borderRadius: 20,
              }}>
                {item.badge}
              </span>
            </div>
          );
        }
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block", padding: "10px 14px", borderRadius: 12,
              textDecoration: "none", color: "#fff", fontSize: 14, fontWeight: 500,
              transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

function FeatureRequestModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const baseUrl = import.meta.env.BASE_URL || "/";
      const res = await fetch(`${baseUrl}api/feature-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "فشل الإرسال");
      }
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch {
      setError("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{
        background: "rgba(8,6,20,.98)", border: "1px solid rgba(124,58,237,.3)",
        borderRadius: 24, padding: 40, width: "100%", maxWidth: 500,
        position: "relative", direction: "rtl",
        boxShadow: "0 40px 100px rgba(0,0,0,.8), 0 0 60px rgba(124,58,237,.15)",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, left: 16,
            background: "rgba(255,255,255,.08)", border: "none", color: "#fff",
            width: 36, height: 36, borderRadius: 10, fontSize: 18,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28,
            }}>
              ✓
            </div>
            <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10 }}>
              تم الإرسال بنجاح!
            </h3>
            <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
              شكراً لمشاركتك فكرتك معنا. سنراجعها ونتواصل معك قريباً.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="rgba(168,85,247,.8)"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                طلب ميزة جديدة
              </h3>
              <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
                شاركنا أفكارك لتطوير المنصة وسنعمل على إضافة أفضل الاقتراحات.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: 8 }}>
                  الاسم
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="اسمك الكريم"
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12, color: "#fff", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: "rtl", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: 8 }}>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12, color: "#fff", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: "ltr", textAlign: "right", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: 8 }}>
                  وصف الميزة المطلوبة
                </label>
                <textarea
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="اشرح الميزة التي تودّ إضافتها وكيف ستفيد متجرك..."
                  rows={4}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12, color: "#fff", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: "rtl", resize: "vertical", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"}
                />
              </div>

              {error && (
                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
                  color: "#f87171", fontFamily: "var(--font)", fontSize: 13,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%", padding: "14px",
                  background: sending ? "rgba(124,58,237,.4)" : "linear-gradient(135deg,#7c3aed,#5b21b6)",
                  border: "none", borderRadius: 50, color: "#fff",
                  fontFamily: "var(--font)", fontSize: 15, fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "all .25s", marginTop: 4,
                  boxShadow: sending ? "none" : "0 0 30px rgba(124,58,237,.4)",
                }}
              >
                {sending ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function HelpDropdown({ onFeatureRequest }: { onFeatureRequest: () => void }) {
  const helpItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor"/></svg>
      ),
      label: "الأسئلة الشائعة",
      subtitle: "إجابات لأكثر الأسئلة تكراراً",
      href: "/#faq",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4z" fill="currentColor"/></svg>
      ),
      label: "تواصل معنا",
      subtitle: "فريق الدعم جاهز لمساعدتك",
      href: "/support",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12l-6 5-6-5z" fill="currentColor"/></svg>
      ),
      label: "البريد الإلكتروني",
      subtitle: "راسلنا وسنرد خلال 24 ساعة",
      href: "mailto:support@ziadah.app",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="currentColor"/></svg>
      ),
      label: "طلب ميزة جديدة",
      subtitle: "شاركنا أفكارك لتطوير المنصة",
      href: "#",
      isModal: true,
    },
  ];

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 300,
      background: "rgba(8,6,20,.97)", border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
    }}>
      {helpItems.map((item) => {
        if (item.isModal) {
          return (
            <button
              key={item.label}
              onClick={onFeatureRequest}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
                borderRadius: 12, background: "transparent", border: "none",
                cursor: "pointer", width: "100%", transition: "background .2s",
                textAlign: "right",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ color: "var(--p4)", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{item.subtitle}</div>
              </div>
            </button>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
              borderRadius: 12, textDecoration: "none", transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ color: "var(--p4)", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{item.subtitle}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

const mobileNavItems = [
  { label: "الرئيسة", href: "/", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: "حالات الاستخدام", href: "/features", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label: "قصص النجاح", href: "/success-stories", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { label: "حاسبة الأثر", href: "/calculator", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg> },
];

function MobileMoreDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: "calc(64px + env(safe-area-inset-bottom))",
        left: 0,
        right: 0,
        zIndex: 950,
        background: "rgba(8,6,20,.98)",
        border: "1px solid rgba(255,255,255,.1)",
        borderBottom: "none",
        borderRadius: "20px 20px 0 0",
        padding: "16px 16px 8px",
        backdropFilter: "blur(32px)",
        boxShadow: "0 -8px 40px rgba(0,0,0,.6)",
        maxHeight: "70vh",
        overflowY: "auto",
        animation: "slideUpDropdown .25s cubic-bezier(.23,1,.32,1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: 1, textTransform: "uppercase" }}>القائمة</span>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,.08)", border: "none", color: "rgba(255,255,255,.6)",
            width: 32, height: 32, borderRadius: 10, fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>حسب الصفحات</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
        {useCasesDropdown.sections[0].items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "block", padding: "10px 12px", borderRadius: 12,
              background: "rgba(255,255,255,.04)", textDecoration: "none",
              color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>حسب الأنشطة</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {useCasesDropdown.sections[1].items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "block", padding: "10px 12px", borderRadius: 12,
              background: "rgba(255,255,255,.04)", textDecoration: "none",
              color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>حسب طريقة العرض</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
        {useCasesDropdown.sections[2].items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "block", padding: "10px 12px", borderRadius: 12,
              background: "rgba(255,255,255,.04)", textDecoration: "none",
              color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>حسب الأهداف</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {useCasesDropdown.sections[3].items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "block", padding: "10px 12px", borderRadius: 12,
              background: "rgba(255,255,255,.04)", textDecoration: "none",
              color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>المنصات</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {platformItems.map((item) => (
          item.enabled ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1, display: "block", padding: "10px 12px", borderRadius: 12, textAlign: "center",
                background: "rgba(255,255,255,.04)", textDecoration: "none",
                color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
              }}
            >
              {item.label}
            </a>
          ) : (
            <div
              key={item.label}
              style={{
                flex: 1, padding: "10px 12px", borderRadius: 12, textAlign: "center",
                background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.3)",
                fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
              }}
            >
              {item.label}
              <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,.25)" }}>{item.badge}</span>
            </div>
          )
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>روابط سريعة</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
        <a
          href="/#pricing"
          onClick={onClose}
          style={{
            display: "block", padding: "10px 12px", borderRadius: 12,
            background: "rgba(255,255,255,.04)", textDecoration: "none",
            color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)", textAlign: "center",
          }}
        >
          الأسعار
        </a>
        <Link
          href="/calculator"
          onClick={onClose}
          style={{
            display: "block", padding: "10px 12px", borderRadius: 12,
            background: "rgba(255,255,255,.04)", textDecoration: "none",
            color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)", textAlign: "center",
          }}
        >
          حاسبة الأثر
        </Link>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6, paddingRight: 4 }}>المساعدة</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {helpItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 12, background: "rgba(255,255,255,.04)",
              textDecoration: "none",
            }}
          >
            <div style={{ color: "var(--p4)", flexShrink: 0 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.label}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <a href="#" onClick={onClose} style={{
          flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
          border: "1px solid rgba(255,255,255,.2)", background: "transparent",
          color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font)",
        }}>
          احجز اجتماع
        </a>
        <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer" style={{
          flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
          background: "var(--p)", color: "#fff", fontSize: 14, fontWeight: 700,
          textDecoration: "none", fontFamily: "var(--font)", border: "none",
        }}>
          ابدأ الآن
        </a>
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [location] = useLocation();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpenDrop(null); setMoreOpen(false); }, [location]);

  const handleHoverStart = (label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDrop(label);
  };

  const handleHoverEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpenDrop(null), 150);
  };

  const navBtnStyle = (isOpen: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 5, padding: "8px 14px",
    borderRadius: 10, background: isOpen ? "rgba(124,58,237,.12)" : "transparent",
    border: "none", color: isOpen ? "#fff" : "rgba(255,255,255,.55)",
    fontFamily: "var(--font)", fontSize: 14, fontWeight: 500, cursor: "pointer",
    transition: "all .2s", whiteSpace: "nowrap",
  });

  const chevron = (isOpen: boolean) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .25s" }}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      {featureModalOpen && <FeatureRequestModal onClose={() => setFeatureModalOpen(false)} />}

      {/* DESKTOP NAV */}
      <nav className="desktop-nav" style={{
        position: "fixed", top: 16, right: "4%", left: "4%", zIndex: 900,
        background: scrolled ? "rgba(3,3,11,.97)" : "rgba(3,3,11,.82)",
        border: `1px solid ${scrolled ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.07)"}`,
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,.5)" : "none",
        borderRadius: 18, padding: "0 24px",
        backdropFilter: "blur(32px)", transition: "all .4s",
      }}>
        {/* Top row: logo + CTAs (always visible) */}
        <div className="nav-top-row" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 58,
        }}>
          <Logo />
          <ul className="nav-links-inline" style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, position: "relative" }}>
            {/* الرئيسة */}
            <li>
              <Link href="/" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => { if (location !== "/") e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                الرئيسة
              </Link>
            </li>

            {/* حالات الاستخدام */}
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "usecases")}>
                  حالات الاستخدام {chevron(openDrop === "usecases")}
                </button>
                {openDrop === "usecases" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>

            {/* قصص النجاح */}
            <li>
              <Link href="/success-stories" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/success-stories" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => { if (location !== "/success-stories") e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                قصص النجاح
              </Link>
            </li>

            {/* المنصات */}
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "platforms")}>
                  المنصات {chevron(openDrop === "platforms")}
                </button>
                {openDrop === "platforms" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>

            {/* الأسعار */}
            <li>
              <a href="/#pricing" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}
              >
                الأسعار
              </a>
            </li>

            {/* حاسبة الأثر */}
            <li>
              <Link href="/calculator" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => { if (location !== "/calculator") e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                حاسبة الأثر
              </Link>
            </li>

            {/* المساعدة */}
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "help")}>
                  المساعدة {chevron(openDrop === "help")}
                </button>
                {openDrop === "help" && (
                  <HelpDropdown onFeatureRequest={() => { setOpenDrop(null); setFeatureModalOpen(true); }} />
                )}
              </DropdownWrapper>
            </li>
          </ul>

          <div className="nav-ctas" style={{ display: "flex", gap: 10 }}>
            <a href="#" className="nb nav-cta-outline">احجز اجتماع</a>
            <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer" className="nb nav-cta-fill">ابدأ الآن</a>
          </div>
        </div>

        {/* Second row: nav links (tablet breakpoint only, injected via CSS) */}
        <div className="nav-links-row2" style={{ display: "none" }}>
          <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, listStyle: "none", margin: 0, padding: "4px 0 8px", position: "relative" }}>
            <li>
              <Link href="/" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}>
                الرئيسة
              </Link>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "usecases2")}>
                  حالات الاستخدام {chevron(openDrop === "usecases2")}
                </button>
                {openDrop === "usecases2" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>
            <li>
              <Link href="/success-stories" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/success-stories" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}>
                قصص النجاح
              </Link>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "platforms2")}>
                  المنصات {chevron(openDrop === "platforms2")}
                </button>
                {openDrop === "platforms2" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>
            <li>
              <a href="/#pricing" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s",
              }}>
                الأسعار
              </a>
            </li>
            <li>
              <Link href="/calculator" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}>
                حاسبة الأثر
              </Link>
            </li>
            <li>
              <Link href="/blog" style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/blog" || location.startsWith("/blog/") ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/blog" || location.startsWith("/blog/") ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s",
              }}>
                المدونة
              </Link>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "help2")}>
                  المساعدة {chevron(openDrop === "help2")}
                </button>
                {openDrop === "help2" && <HelpDropdown />}
              </DropdownWrapper>
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => {
          const isActive = location === item.href || (item.href === "/" && location === "/");
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3, flex: 1, textDecoration: "none",
                color: isActive ? "var(--p)" : "rgba(255,255,255,.45)",
                fontSize: 10, fontWeight: 600, fontFamily: "var(--font)",
                padding: "6px 0", transition: "color .2s",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(v => !v)}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 3, flex: 1, background: "none", border: "none",
            color: moreOpen ? "var(--p)" : "rgba(255,255,255,.45)",
            fontSize: 10, fontWeight: 600, fontFamily: "var(--font)",
            padding: "6px 0", cursor: "pointer", transition: "color .2s",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
          </svg>
          <span>المزيد</span>
        </button>
      </nav>

      {/* MOBILE MORE DROPDOWN */}
      {moreOpen && <MobileMoreDropdown onClose={() => setMoreOpen(false)} />}
    </>
  );
}
