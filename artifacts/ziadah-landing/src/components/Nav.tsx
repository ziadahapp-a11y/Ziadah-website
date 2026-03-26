import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { navigateTo, navigateToHash } from "@/components/PageTransition";
import { useBlurTransition } from "@/components/BlurTransitionProvider";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { useTheme } from "@/ThemeContext";
import PlatformModal from "./PlatformModal";
import { platformSallaLogoSrc, platformZidLogoSrc } from "@/utils/platformAsset";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const runBlur = useBlurTransition();
  const isLight = theme === "light";
  return (
    <button
      onClick={() => runBlur(() => toggleTheme())}
      title={isLight ? "تفعيل المود الليلي" : "تفعيل المود النهاري"}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, borderRadius: 10,
        background: isLight ? "rgba(124,58,237,.12)" : "rgba(255,255,255,.07)",
        border: `1px solid ${isLight ? "rgba(124,58,237,.25)" : "rgba(255,255,255,.12)"}`,
        color: isLight ? "#7c3aed" : "rgba(255,255,255,.7)",
        cursor: "pointer", transition: "all .25s", flexShrink: 0,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isLight ? "rgba(124,58,237,.2)" : "rgba(255,255,255,.13)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isLight ? "rgba(124,58,237,.12)" : "rgba(255,255,255,.07)"; }}
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )}
    </button>
  );
}

export const Logo = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const logoSrc =
    theme === "light"
      ? lang === "ar"
        ? "/logo-light-ar.png"
        : "/logo-light.png"
      : lang === "ar"
        ? "/logo-ar.png"
        : "/logo-en.png";
  return (
    <span onClick={() => navigateTo("/")} style={{ display: "flex", alignItems: "center", textDecoration: "none", cursor: "pointer" }}>
      <img src={logoSrc} alt="Ziadah" style={{ height: 30, width: "auto" }} />
    </span>
  );
};

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const runBlur = useBlurTransition();
  const { theme } = useTheme();
  const isLt = theme === "light";
  return (
    <button
      onClick={() => runBlur(() => setLang(lang === "ar" ? "en" : "ar"))}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "6px 12px", borderRadius: 8,
        background: isLt ? "rgba(0,0,0,.05)" : "rgba(255,255,255,.07)",
        border: `1px solid ${isLt ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.12)"}`,
        color: isLt ? "rgba(15,10,35,.7)" : "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 700,
        cursor: "pointer", transition: "all .2s", fontFamily: "var(--font)",
        whiteSpace: "nowrap", flexShrink: 0,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isLt ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.13)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isLt ? "rgba(0,0,0,.05)" : "rgba(255,255,255,.07)"; }}
      title={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );
}

interface UseCaseItem {
  label: string;
  href: string;
  subtitle?: string;
}

interface UseCaseSection {
  title: string;
  items: UseCaseItem[];
}

function getUseCasesDropdown(tr: typeof t.ar): { sections: UseCaseSection[] } {
  return {
    sections: [
      {
        title: tr.nav.useCaseByPage,
        items: [
          { label: tr.nav.productPage, href: "/use-cases/product-page" },
          { label: tr.nav.cartPage, href: "/use-cases/cart" },
          { label: tr.nav.checkoutPage, href: "/use-cases/checkout" },
          { label: tr.nav.thankYouPage, href: "/use-cases/thank-you" },
          { label: tr.nav.homePage, href: "/use-cases/home" },
          { label: tr.nav.categoryPage, href: "/use-cases/category" },
          { label: tr.nav.allPages, href: "/use-cases/all-pages" },
        ],
      },
      {
        title: tr.nav.useCaseByActivity,
        items: [
          { label: tr.nav.crossSell, href: "/use-cases/cross-sell", subtitle: tr.nav.crossSellSub },
          { label: tr.nav.upsell, href: "/use-cases/upsell", subtitle: tr.nav.upsellSub },
          { label: tr.nav.addToCart, href: "/use-cases/add-to-cart", subtitle: tr.nav.addToCartSub },
          { label: tr.nav.removeFromCart, href: "/use-cases/remove-from-cart", subtitle: tr.nav.removeFromCartSub },
        ],
      },
      {
        title: tr.nav.useCaseByPresentation,
        items: [
          { label: tr.nav.relatedProducts, href: "/use-cases/related-products", subtitle: tr.nav.relatedProductsSub },
          { label: tr.nav.addons, href: "/use-cases/addons", subtitle: tr.nav.addonsSub },
          { label: tr.nav.buyTogether, href: "/use-cases/buy-together", subtitle: tr.nav.buyTogetherSub },
          { label: tr.nav.bundleDeals, href: "/use-cases/bundle-deals", subtitle: tr.nav.bundleDealsSub },
          { label: tr.nav.buyMoreSaveMore, href: "/use-cases/buy-more-save-more", subtitle: tr.nav.buyMoreSaveMoreSub },
        ],
      },
      {
        title: tr.nav.useCaseByGoal,
        items: [
          { label: tr.nav.goalMoreCartItems, href: "/use-cases/more-cart-items" },
          { label: tr.nav.goalProductSwap, href: "/use-cases/upsell" },
          { label: tr.nav.goalQuantityOffers, href: "/use-cases/buy-more-save-more" },
          { label: tr.nav.goalFreeShippingDisplay, href: "/use-cases/free-shipping" },
          { label: tr.nav.goalDiscountCoupon, href: "/use-cases/discount-coupon" },
        ],
      },
      {
        title: tr.nav.useCaseByExperience,
        items: [
          {
            label: tr.nav.customerExperience,
            href: "/use-cases/customer-experience",
            subtitle: tr.nav.customerExperienceSub,
          },
        ],
      },
    ],
  };
}

function getPlatformItems(tr: typeof t.ar) {
  type PlatformKey = "salla" | "zid" | "shopify";
  return [
    { key: "salla" as PlatformKey, label: tr.nav.salla, href: "https://apps.salla.sa/ar/app/1099604538", enabled: true },
    { key: "zid" as PlatformKey, label: tr.nav.zid, href: "https://apps.zid.sa/application/1826", enabled: true },
    { key: "shopify" as PlatformKey, label: tr.nav.shopify, href: "#", enabled: false, badge: tr.nav.comingSoon },
  ] as Array<{
    key: PlatformKey;
    label: string;
    href: string;
    enabled: boolean;
    badge?: string;
  }>;
}

function getPlatformLogoSrc(platformKey: "salla" | "zid", _lang: "ar" | "en", theme: "dark" | "light") {
  return platformKey === "zid" ? platformZidLogoSrc(theme) : platformSallaLogoSrc(theme);
}

function DropdownWrapper({ children, onHoverStart, onHoverEnd }: { children: React.ReactNode; onHoverStart: () => void; onHoverEnd: () => void }) {
  return (
    <div onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} style={{ position: "relative" }}>
      {children}
    </div>
  );
}

function UseCasesMegaMenu() {
  const { lang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
  const useCasesDropdown = getUseCasesDropdown(tr);
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", ...(lang === "ar" ? { right: 0 } : { left: 0, maxWidth: "calc(100vw - 32px)" }), minWidth: 900,
      background: lt ? "rgba(255,255,255,.97)" : "rgba(8,6,20,.9)",
      border: `1px solid ${lt ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"}`,
      borderRadius: 16, padding: 4,
      backdropFilter: "blur(100px)", WebkitBackdropFilter: "blur(100px)",
      boxShadow: lt ? "0 16px 50px rgba(0,0,0,.1)" : "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
      display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, overflowX: "auto",
    }}>
      {useCasesDropdown.sections.map((section) => (
        <div key={section.title} style={{ padding: "4px 6px" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: "var(--p4)", marginBottom: 6,
            paddingRight: lang === "ar" ? 6 : 0, paddingLeft: lang === "en" ? 6 : 0,
            textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font)",
          }}>
            {section.title}
          </div>
          {section.items.map((item) => (
            <span
              key={item.href + item.label}
              onClick={() => navigateTo(item.href)}
              style={{
                display: "block", padding: "10px 8px", borderRadius: 12,
                textDecoration: "none", transition: "background .2s", fontSize: 14,
                fontWeight: 700, color: "var(--t)", cursor: "pointer", fontFamily: "var(--font)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {item.label}
              {item.subtitle && (
                <span style={{ display: "block", fontSize: 12, color: "var(--td)", marginTop: 2, fontWeight: 500, lineHeight: 1.45 }}>
                  {item.subtitle}
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function PlatformsDropdown() {
  const { lang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
  const platformItems = getPlatformItems(tr);
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 200,
      background: lt ? "rgba(255,255,255,.97)" : "rgba(8,6,20,.97)",
      border: `1px solid ${lt ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"}`,
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: lt ? "0 16px 50px rgba(0,0,0,.1)" : "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
    }}>
      {platformItems.map((item) => {
        if (!item.enabled) {
          return (
            <div
              key={item.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 12, color: "var(--td)",
                fontSize: 14, fontWeight: 500, cursor: "default",
              }}
            >
              <span>{item.label}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, background: "var(--s2)",
                color: "var(--td)", padding: "2px 8px", borderRadius: 20,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 12,
              textDecoration: "none",
              color: "var(--t)",
              fontSize: 14,
              fontWeight: 500,
              transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <img
              src={getPlatformLogoSrc(item.key as "salla" | "zid", lang, theme)}
              alt={item.label}
              style={{ height: 18, width: "auto", display: "block" }}
            />
          </a>
        );
      })}
    </div>
  );
}

function FeatureRequestModal({ onClose }: { onClose: () => void }) {
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
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
        throw new Error(data.error || tr.featureModal.errorText);
      }
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch {
      setError(tr.featureModal.errorText);
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
        background: lt ? "rgba(255,255,255,.98)" : "rgba(8,6,20,.98)",
        border: `1px solid ${lt ? "rgba(124,58,237,.2)" : "rgba(124,58,237,.3)"}`,
        borderRadius: 24, padding: 40, width: "100%", maxWidth: 500,
        position: "relative", direction: dir,
        boxShadow: lt ? "0 40px 100px rgba(0,0,0,.12), 0 0 60px rgba(124,58,237,.08)" : "0 40px 100px rgba(0,0,0,.8), 0 0 60px rgba(124,58,237,.15)",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, left: 16,
            background: "var(--s2)", border: "none", color: "var(--t)",
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
            <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "var(--t)", marginBottom: 10 }}>
              {tr.featureModal.successTitle}
            </h3>
            <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>
              {tr.featureModal.successText}
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
              <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "var(--t)", marginBottom: 8 }}>
                {tr.featureModal.title}
              </h3>
              <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>
                {tr.featureModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.name}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={tr.featureModal.namePlaceholder}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: dir, boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: "ltr", textAlign: dir === "rtl" ? "right" : "left", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.descLabel}
                </label>
                <textarea
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={tr.featureModal.descPlaceholder}
                  rows={4}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: dir, resize: "vertical", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
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
                {sending ? tr.featureModal.sending : tr.featureModal.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function HelpDropdown({ onFeatureRequest }: { onFeatureRequest: () => void }) {
  const { lang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
  const helpItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor"/></svg>
      ),
      label: tr.nav.faq,
      subtitle: tr.nav.faqSub,
      href: "/#faq",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4z" fill="currentColor"/></svg>
      ),
      label: tr.nav.contact,
      subtitle: tr.nav.contactSub,
      href: "/support",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12l-6 5-6-5z" fill="currentColor"/></svg>
      ),
      label: tr.nav.email,
      subtitle: tr.nav.emailSub,
      href: "mailto:support@ziadah.app",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h10v2H5V5zm0 4h10v2H5V9zm0 4h6v2H5v-2z" fill="currentColor"/></svg>
      ),
      label: tr.nav.blog,
      subtitle: tr.nav.blogSub,
      href: "/blog",
      isModal: false,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="currentColor"/></svg>
      ),
      label: tr.nav.featureRequest,
      subtitle: tr.nav.featureRequestSub,
      href: "#",
      isModal: true,
    },
  ];

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 300,
      background: lt ? "rgba(255,255,255,.97)" : "rgba(8,6,20,.97)",
      border: `1px solid ${lt ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"}`,
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: lt ? "0 16px 50px rgba(0,0,0,.1)" : "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
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
                textAlign: lang === "ar" ? "right" : "left",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ color: "var(--p4)", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{item.subtitle}</div>
              </div>
            </button>
          );
        }
        if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
          return (
            <a
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
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{item.subtitle}</div>
              </div>
            </a>
          );
        }
        return (
          <span
            key={item.label}
            onClick={() => item.href.includes("#") ? navigateToHash(item.href) : navigateTo(item.href)}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
              borderRadius: 12, textDecoration: "none", transition: "background .2s", cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ color: "var(--p4)", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{item.subtitle}</div>
            </div>
          </span>
        );
      })}
    </div>
  );
}

function MobileMoreDropdown({ onClose, onFeatureRequest, onStartNow }: { onClose: () => void; onFeatureRequest?: () => void; onStartNow?: () => void }) {
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
  const useCasesDropdown = getUseCasesDropdown(tr);
  const platformItems = getPlatformItems(tr);

  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (section: string) => setOpenSection(prev => prev === section ? null : section);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const directLinkStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
    borderRadius: 14, background: "var(--s1)", textDecoration: "none",
    color: "var(--tm)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font)",
    marginBottom: 6,
  };

  const subLinkStyle: React.CSSProperties = {
    display: "block", padding: "9px 12px", borderRadius: 10,
    background: "var(--s1)", textDecoration: "none",
    color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
  };

  const mobileHelpItems = [
    {
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor"/></svg>,
      label: tr.nav.faq,
      href: "/#faq",
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4z" fill="currentColor"/></svg>,
      label: tr.nav.contact,
      href: "/support",
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12l-6 5-6-5z" fill="currentColor"/></svg>,
      label: tr.nav.email,
      href: "mailto:support@ziadah.app",
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="currentColor"/></svg>,
      label: tr.nav.featureRequest,
      href: "#",
    },
  ];

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 940,
          background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)",
        }}
      />
      <div
        ref={ref}
        style={{
          position: "fixed",
          bottom: "calc(64px + env(safe-area-inset-bottom))",
          left: 0,
          right: 0,
          zIndex: 950,
          background: lt ? "rgba(255,255,255,.98)" : "rgba(8,6,20,.98)",
          border: `1px solid ${lt ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"}`,
          borderBottom: "none",
          borderRadius: "20px 20px 0 0",
          padding: "16px 16px 8px",
          backdropFilter: "blur(32px)",
          boxShadow: lt ? "0 -8px 40px rgba(0,0,0,.1)" : "0 -8px 40px rgba(0,0,0,.6)",
          maxHeight: "80vh",
          overflowY: "auto",
          animation: "slideUpDropdown .25s cubic-bezier(.23,1,.32,1)",
          direction: dir,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--td)", letterSpacing: 1, textTransform: "uppercase" }}>{tr.nav.menu}</span>
          <button
            onClick={onClose}
            style={{
              background: "var(--s2)", border: "none", color: "var(--tm)",
              width: 32, height: 32, borderRadius: 10, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: 6 }}>
          <button
            onClick={() => toggleSection("useCases")}
            aria-expanded={openSection === "useCases"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "var(--p4)", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.useCases}</span>
            <span style={{ fontSize: 10, color: "var(--td)", transition: "transform .25s", transform: openSection === "useCases" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: openSection === "useCases" ? "2000px" : "0px",
            opacity: openSection === "useCases" ? 1 : 0,
            transition: "max-height .3s cubic-bezier(.23,1,.32,1), opacity .25s ease",
          }}>
            {useCasesDropdown.sections.map((section) => (
              <div key={section.title} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 4, paddingRight: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{section.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {section.items.map((item) => (
                    <span key={item.href} onClick={() => { navigateTo(item.href); onClose(); }} style={{ ...subLinkStyle, cursor: "pointer" }}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 6 }}>
          <button
            onClick={() => toggleSection("platforms")}
            aria-expanded={openSection === "platforms"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "var(--p4)", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.platforms}</span>
            <span style={{ fontSize: 10, color: "var(--td)", transition: "transform .25s", transform: openSection === "platforms" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: openSection === "platforms" ? "2000px" : "0px",
            opacity: openSection === "platforms" ? 1 : 0,
            transition: "max-height .3s cubic-bezier(.23,1,.32,1), opacity .25s ease",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 8 }}>
              {platformItems.map((item) =>
                item.enabled ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                    style={{ ...subLinkStyle, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}
                  >
                    <img
                      src={getPlatformLogoSrc(item.key as "salla" | "zid", lang, theme)}
                      alt={item.label}
                      style={{ height: 18, width: "auto", display: "block" }}
                    />
                  </a>
                ) : (
                  <div
                    key={item.label}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 12px", borderRadius: 10,
                      background: "var(--s1)", color: "var(--td)",
                      fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span style={{ fontSize: 10, color: "var(--td)", background: "var(--s2)", padding: "2px 8px", borderRadius: 20 }}>{item.badge}</span>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 6 }}>
          <button
            onClick={() => toggleSection("help")}
            aria-expanded={openSection === "help"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "var(--p4)", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.help}</span>
            <span style={{ fontSize: 10, color: "var(--td)", transition: "transform .25s", transform: openSection === "help" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: openSection === "help" ? "2000px" : "0px",
            opacity: openSection === "help" ? 1 : 0,
            transition: "max-height .3s cubic-bezier(.23,1,.32,1), opacity .25s ease",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 8 }}>
              {mobileHelpItems.map((item) => {
                const isExternal = item.href.startsWith("mailto:") || item.href.startsWith("http");
                const isFeatureRequest = item.href === "#" && item.label === tr.nav.featureRequest;
                const itemStyle: React.CSSProperties = {
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                  borderRadius: 10, background: "var(--s1)",
                  textDecoration: "none", color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                };
                if (isFeatureRequest && onFeatureRequest) {
                  return (
                    <span key={item.label} onClick={() => { onClose(); onFeatureRequest(); }} style={{ ...itemStyle, cursor: "pointer" }}>
                      <span style={{ color: "var(--p4)", flexShrink: 0 }}>{item.icon}</span>
                      {item.label}
                    </span>
                  );
                }
                if (isExternal) {
                  return (
                    <a key={item.label} href={item.href} onClick={onClose} style={itemStyle}>
                      <span style={{ color: "var(--p4)", flexShrink: 0 }}>{item.icon}</span>
                      {item.label}
                    </a>
                  );
                }
                return (
                  <span key={item.label} onClick={() => { item.href.includes("#") ? navigateToHash(item.href) : navigateTo(item.href); onClose(); }} style={{ ...itemStyle, cursor: "pointer" }}>
                    <span style={{ color: "var(--p4)", flexShrink: 0 }}>{item.icon}</span>
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6, marginTop: 6 }}>
          <span onClick={() => { navigateTo("/success-stories"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {tr.nav.successStories}
          </span>
          <span onClick={() => { navigateTo("/calculator"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
            {tr.nav.calculator}
          </span>
          <span onClick={() => { navigateToHash("/#pricing"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            {tr.nav.pricing}
          </span>
          <span onClick={() => { navigateTo("/blog"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
            {tr.nav.blog}
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8, marginTop: 4 }}>
          <a href="https://calendar.app.google/a3b18uRcuhHijZ8y5" target="_blank" rel="noreferrer" onClick={onClose} style={{
            flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
            border: "1px solid var(--b2)", background: "transparent",
            color: "var(--t)", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font)",
          }}>
            {tr.nav.bookMeeting}
          </a>
          <button onClick={() => { onClose(); onStartNow?.(); }} style={{
            flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
            background: "var(--p)", color: "#fff", fontSize: 14, fontWeight: 700,
            fontFamily: "var(--font)", border: "none", cursor: "pointer",
          }}>
            {tr.nav.startNow}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 4 }}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}

export default function Nav() {
  const { lang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
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
    border: "none", color: isOpen ? "var(--t)" : "var(--tm)",
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
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />

      {/* DESKTOP NAV */}
      <nav className="desktop-nav" style={{
        position: "fixed", top: 16, right: "4%", left: "4%", zIndex: 900,
        background: isLight
          ? (scrolled ? "rgba(241,245,249,.1)" : "rgba(241,245,249,.88)")
          : (scrolled ? "rgba(3,3,11,.2)" : "rgba(3,3,11,.1)"),
        border: "none",
        borderColor: "rgba(0, 0, 0, 0)",
        borderImage: "none",
        boxShadow: scrolled
          ? (isLight
            ? "0 8px 40px rgba(0,0,0,.12)"
            : "0px 8px 40px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 1px 0px rgba(255, 255, 255, 0.2)")
          : "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.2)",
        borderRadius: 18, padding: "0 24px",
        backdropFilter: "blur(32px)", transition: "all .4s",
      }}>
        {/* Top row: nav links + CTAs (always visible) */}
        <div className="nav-top-row" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 58,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Logo />
          <ul className="nav-links-inline" style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, position: "relative" }}>
            <li>
              <span onClick={() => navigateTo("/")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                {tr.nav.home}
              </span>
            </li>

            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "usecases")}>
                  {tr.nav.useCases} {chevron(openDrop === "usecases")}
                </button>
                {openDrop === "usecases" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>

            <li>
              <span onClick={() => navigateTo("/success-stories")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/success-stories" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/success-stories") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                {tr.nav.successStories}
              </span>
            </li>

            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "platforms")}>
                  {tr.nav.platforms} {chevron(openDrop === "platforms")}
                </button>
                {openDrop === "platforms" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>

            <li>
              <span onClick={() => navigateToHash("/#pricing")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--tm)"}
              >
                {tr.nav.pricing}
              </span>
            </li>

            <li>
              <span onClick={() => navigateTo("/calculator")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/calculator") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                {tr.nav.calculator}
              </span>
            </li>

            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "help")}>
                  {tr.nav.help} {chevron(openDrop === "help")}
                </button>
                {openDrop === "help" && (
                  <HelpDropdown onFeatureRequest={() => { setOpenDrop(null); setFeatureModalOpen(true); }} />
                )}
              </DropdownWrapper>
            </li>
          </ul>
          </div>

          <div className="nav-ctas" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <ThemeToggle />
            <LanguageSwitcher />
            <a href="https://calendar.app.google/a3b18uRcuhHijZ8y5" target="_blank" rel="noreferrer" className="nb nav-cta-outline">{tr.nav.bookMeeting}</a>
            <button onClick={() => setPlatformModalOpen(true)} className="nb nav-cta-fill" style={{ cursor: "pointer", border: "none", fontFamily: "var(--font)" }}>{tr.nav.startNow}</button>
          </div>
        </div>

        {/* Second row: nav links (tablet breakpoint only, injected via CSS) */}
        <div className="nav-links-row2" style={{ display: "none" }}>
          <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, listStyle: "none", margin: 0, padding: "4px 0 8px", position: "relative" }}>
            <li>
              <span onClick={() => navigateTo("/")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                {tr.nav.home}
              </span>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "usecases2")}>
                  {tr.nav.useCases} {chevron(openDrop === "usecases2")}
                </button>
                {openDrop === "usecases2" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>
            <li>
              <span onClick={() => navigateTo("/success-stories")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/success-stories" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                {tr.nav.successStories}
              </span>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "platforms2")}>
                  {tr.nav.platforms} {chevron(openDrop === "platforms2")}
                </button>
                {openDrop === "platforms2" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>
            <li>
              <span onClick={() => navigateToHash("/#pricing")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s", cursor: "pointer",
              }}>
                {tr.nav.pricing}
              </span>
            </li>
            <li>
              <span onClick={() => navigateTo("/calculator")} style={{
                display: "block", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                {tr.nav.calculator}
              </span>
            </li>
            <li>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help2")} onHoverEnd={handleHoverEnd}>
                <button style={navBtnStyle(openDrop === "help2")}>
                  {tr.nav.help} {chevron(openDrop === "help2")}
                </button>
                {openDrop === "help2" && (
                  <HelpDropdown onFeatureRequest={() => { setOpenDrop(null); setFeatureModalOpen(true); }} />
                )}
              </DropdownWrapper>
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className="mobile-top-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: isLight ? "rgba(241,245,249,.92)" : "rgba(3,3,11,.88)",
        borderBottom: `1px solid ${isLight ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.08)"}`,
        backdropFilter: "blur(32px)",
        alignItems: "center", justifyContent: "center",
        height: 52,
        padding: "0 20px",
        transition: "background .3s, border-color .3s",
      }}>
        <Logo />
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900,
        background: isLight ? "rgba(241,245,249,.97)" : "rgba(6,4,18,.97)",
        borderTop: `1px solid ${isLight ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.08)"}`,
        backdropFilter: "blur(32px)", paddingBottom: "env(safe-area-inset-bottom)",
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{ display: "flex", height: 64 }}>
          {[
            {
              key: "home", label: tr.nav.home, icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              ), action: () => navigateTo("/"),
            },
            {
              key: "stories", label: tr.nav.successStories.split(" ")[0], icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ), action: () => navigateTo("/success-stories"),
            },
            {
              key: "more", label: lang === "ar" ? "المزيد" : "More", icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                </svg>
              ), action: () => { setMoreOpen(true); },
            },
          ].map((item) => {
            const isActive = item.key === "home" ? location === "/" : item.key === "stories" ? location === "/success-stories" : false;
            return (
              <button
                key={item.key}
                onClick={item.action}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 4, background: "none", border: "none",
                  color: isActive ? "#a855f7" : "var(--tm)",
                  fontFamily: "var(--font)", fontSize: 11, fontWeight: 500, cursor: "pointer",
                  transition: "color .2s",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {moreOpen && (
        <MobileMoreDropdown
          onClose={() => setMoreOpen(false)}
          onFeatureRequest={() => { setMoreOpen(false); setFeatureModalOpen(true); }}
          onStartNow={() => { setMoreOpen(false); setPlatformModalOpen(true); }}
        />
      )}
    </>
  );
}
