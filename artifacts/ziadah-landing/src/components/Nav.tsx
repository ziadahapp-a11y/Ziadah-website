import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { navigateTo, navigateToHash } from "@/components/PageTransition";
import { useBlurTransition } from "@/components/BlurTransitionProvider";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import type { Translations } from "@/i18n/translations";
import { useTheme } from "@/ThemeContext";
import PlatformModal from "./PlatformModal";
import { platformSallaLogoSrc, platformZidLogoSrc } from "@/utils/platformAsset";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "var(--s2)",
        border: "1px solid var(--b1)",
        borderRadius: 8,
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--tm)",
        fontSize: 16,
        flexShrink: 0,
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}


export const Logo = () => {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const logoSrc = lang === "ar" ? "/logo-ar.png" : "/logo-en.png";
  return (
    <span onClick={() => navigateTo("/")} style={{ display: "flex", alignItems: "center", textDecoration: "none", cursor: "pointer" }}>
      <img
        src={logoSrc}
        alt={tr.seo.brandLogoAlt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ height: 30, width: "auto" }}
      />
    </span>
  );
};

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const runBlur = useBlurTransition();
  return (
    <button
      type="button"
      onClick={() => runBlur(() => setLang(lang === "ar" ? "en" : "ar"))}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "6px 12px", borderRadius: 8,
        background: "rgba(255,255,255,.07)",
        border: "1px solid rgba(255,255,255,.12)",
        color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 700,
        cursor: "pointer", transition: "all .2s", fontFamily: "var(--font)",
        whiteSpace: "nowrap", flexShrink: 0,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.13)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.07)"; }}
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

function getUseCasesDropdown(tr: Translations): { sections: UseCaseSection[] } {
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

function getPlatformItems(tr: Translations) {
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
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const useCasesDropdown = getUseCasesDropdown(tr);
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 10px)",
      ...(lang === "ar" ? { right: 0, left: "auto" } : { left: 0, right: "auto" }),
      width: "min(900px, calc(100vw - 24px))",
      maxWidth: "calc(100vw - 16px)",
      minWidth: 0,
      boxSizing: "border-box",
      background: "rgba(8,6,20,.9)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: "16px 10px",
      backdropFilter: "blur(100px)", WebkitBackdropFilter: "blur(100px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))",
      gap: 8,
      overflowX: "hidden",
      overflowY: "auto",
      maxHeight: "min(70vh, 520px)",
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
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const platformItems = getPlatformItems(tr);
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, left: "auto",
      minWidth: "min(200px, calc(100vw - 24px))",
      maxWidth: "calc(100vw - 16px)",
      boxSizing: "border-box",
      background: "rgba(8,6,20,.97)",
      border: "1px solid rgba(255,255,255,.1)",
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
              alt={item.key === "zid" ? tr.seo.platformLogoAltZid : tr.seo.platformLogoAltSalla}
              loading="lazy"
              style={{ height: 18, width: "auto", display: "block" }}
            />
          </a>
        );
      })}
    </div>
  );
}

function HelpDropdown() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const helpItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor"/></svg>
      ),
      label: tr.nav.faq,
      subtitle: tr.nav.faqSub,
      href: "/#faq",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4z" fill="currentColor"/></svg>
      ),
      label: tr.nav.contact,
      subtitle: tr.nav.contactSub,
      href: "/support",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h10v2H5V5zm0 4h10v2H5V9zm0 4h6v2H5v-2z" fill="currentColor"/></svg>
      ),
      label: tr.nav.blog,
      subtitle: tr.nav.blogSub,
      href: "/blog",
    },
  ];

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, left: "auto",
      minWidth: "min(300px, calc(100vw - 24px))",
      maxWidth: "calc(100vw - 16px)",
      boxSizing: "border-box",
      background: "rgba(8,6,20,.97)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
    }}>
      {helpItems.map((item) => (
        <span
          key={item.label}
          role="button"
          tabIndex={0}
          onClick={() => item.href.includes("#") ? navigateToHash(item.href) : navigateTo(item.href)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              item.href.includes("#") ? navigateToHash(item.href) : navigateTo(item.href);
            }
          }}
          style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
            borderRadius: 12, textDecoration: "none", transition: "background .2s", cursor: "pointer",
            width: "100%", textAlign: lang === "ar" ? "right" : "left",
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
      ))}
    </div>
  );
}

const MAIN_SECTOR_NAV = [
  { href: "/sectors/ecommerce-stores", icon: "🛍️", titleAr: "المتاجر الإلكترونية", titleEn: "Ecommerce Stores" },
  { href: "/sectors/delivery-apps", icon: "🛵", titleAr: "تطبيقات التوصيل", titleEn: "Delivery Apps" },
  { href: "/sectors/ecommerce-platforms", icon: "🧩", titleAr: "منصات التسوق الإلكترونية", titleEn: "Ecommerce Platforms" },
] as const;

/** Stroke icons for mobile bottom nav — uses currentColor from parent */
function MobileNavIcon({ name, size = 20 }: { name: string; size?: number }) {
  const s = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...s} aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "useCases":
      return (
        <svg {...s} aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...s} aria-hidden>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="12" y2="14" />
          <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      );
    case "platforms":
      return (
        <svg {...s} aria-hidden>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "sectors":
      return (
        <svg {...s} aria-hidden>
          <path d="M3 9l12-7 9 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case "pricing": {
      /* U+20C1 — saudi_riyal glyph reads smaller than stroke icons at equal px; scale to match ~24×24 visual weight in a size box */
      const riyalFont = Math.round(size * 1.52);
      return (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: size,
            height: size,
            fontFamily: "var(--font)",
            fontSize: riyalFont,
            fontWeight: 700,
            lineHeight: 1,
            color: "currentColor",
          }}
        >
          {"\u20C1"}
        </span>
      );
    }
    case "more":
      return (
        <svg {...s} aria-hidden>
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      );
    case "successStories":
      return (
        <svg {...s} aria-hidden>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "help":
      return (
        <svg {...s} aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "meeting":
      return (
        <svg {...s} aria-hidden>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "startNow":
      return (
        <svg {...s} aria-hidden>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "langTheme":
      return (
        <svg {...s} aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "back":
      return (
        <svg {...s} aria-hidden>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );
    case "backRtl":
      return (
        <svg {...s} aria-hidden>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    default:
      return (
        <svg {...s} aria-hidden>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

function SectorsDropdown() {
  const { lang } = useLanguage();
  const allSectorsLabel = lang === "ar" ? "كل القطاعات" : "All Sectors";

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, left: "auto",
      minWidth: "min(280px, calc(100vw - 24px))",
      maxWidth: "calc(100vw - 16px)",
      maxHeight: 420, overflowY: "auto",
      boxSizing: "border-box",
      background: "rgba(8,6,20,.97)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 16, padding: 8, backdropFilter: "blur(32px)",
      boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100,
    }}>
      <span
        role="button"
        tabIndex={0}
        onClick={() => navigateTo("/sectors")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateTo("/sectors");
          }
        }}
        style={{
          display: "block",
          padding: "10px 14px",
          borderRadius: 12,
          color: "var(--p)",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "background .2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {allSectorsLabel}
      </span>
      <div style={{ height: 1, background: "var(--b2)", margin: "6px 8px" }} />
      {MAIN_SECTOR_NAV.map((item) => (
        <span
          key={item.href}
          role="button"
          tabIndex={0}
          onClick={() => navigateTo(item.href)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigateTo(item.href);
            }
          }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 12,
            color: "var(--t)", fontSize: 14, fontWeight: 500,
            cursor: "pointer", transition: "background .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: 17, lineHeight: 1 }}>{item.icon}</span>
          <span>{lang === "ar" ? item.titleAr : item.titleEn}</span>
        </span>
      ))}
    </div>
  );
}

function MobileMoreDropdown({
  onClose,
  onStartNow,
  initialOpenSection,
}: {
  onClose: () => void;
  onStartNow?: () => void;
  initialOpenSection?: string | null;
}) {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const useCasesDropdown = getUseCasesDropdown(tr);
  const platformItems = getPlatformItems(tr);

  const [openSection, setOpenSection] = useState<string | null>(initialOpenSection ?? null);
  const toggleSection = (section: string) => setOpenSection(prev => prev === section ? null : section);

  // Sync with parent prop when bottom-nav opens "More" or switches sections.
  useEffect(() => {
    setOpenSection(initialOpenSection ?? null);
  }, [initialOpenSection]);

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
    borderRadius: 14, background: "rgba(255,255,255,.04)", textDecoration: "none",
    border: "1px solid rgba(255,255,255,.08)",
    color: "var(--tm)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font)",
    marginBottom: 6,
  };

  const subLinkStyle: React.CSSProperties = {
    display: "block", padding: "10px 12px", borderRadius: 10,
    background: "rgba(255,255,255,.04)", textDecoration: "none",
    border: "1px solid rgba(255,255,255,.07)",
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
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h10v2H5V5zm0 4h10v2H5V9zm0 4h6v2H5v-2z" fill="currentColor"/></svg>,
      label: tr.nav.blog,
      href: "/blog",
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
          left: 12,
          right: 12,
          maxWidth: 540,
          marginInline: "auto",
          zIndex: 950,
          background: "rgba(8,6,20,.98)",
          border: "1px solid rgba(255,255,255,.1)",
          borderBottom: "none",
          borderRadius: "22px 22px 0 0",
          padding: "10px 14px 8px",
          backdropFilter: "blur(32px)",
          boxShadow: "0 -8px 40px rgba(0,0,0,.6)",
          maxHeight: "80vh",
          overflowY: "auto",
          animation: "slideUpDropdown .25s cubic-bezier(.23,1,.32,1)",
          direction: dir,
        }}
      >
        <div style={{
          width: 44,
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,.2)",
          margin: "2px auto 10px",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--td)", letterSpacing: 0.8, textTransform: "uppercase" }}>{tr.nav.menu}</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,.07)", border: "none", color: "var(--tm)",
              width: 32, height: 32, borderRadius: 10, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: 8, border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "4px 8px", background: "rgba(255,255,255,.02)" }}>
          <button
            type="button"
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
              <div key={section.title} style={{ marginBottom: 10, paddingBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 6, paddingRight: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{section.title}</div>
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

        <div style={{ marginBottom: 8, border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "4px 8px", background: "rgba(255,255,255,.02)" }}>
          <button
            type="button"
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
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 8 }}>
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
                      loading="lazy"
                      style={{ height: 18, width: "auto", display: "block" }}
                    />
                  </a>
                ) : (
                  <div
                    key={item.label}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 12px", borderRadius: 10,
                      background: "rgba(255,255,255,.04)", color: "var(--td)",
                      border: "1px solid rgba(255,255,255,.07)",
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

        <div style={{ marginBottom: 8, border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "4px 8px", background: "rgba(255,255,255,.02)" }}>
          <button
            type="button"
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
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 8 }}>
              {mobileHelpItems.map((item) => {
                const itemStyle: React.CSSProperties = {
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                  borderRadius: 10, background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  textDecoration: "none", color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                };
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8, marginTop: 6 }}>
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
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 4, marginBottom: 2 }}>
            <span onClick={() => { navigateTo("/sectors"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0, justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l12-7 9 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>
              {tr.nav.sectors}
            </span>
            {MAIN_SECTOR_NAV.map((item) => (
              <span
                key={item.href}
                role="button"
                tabIndex={0}
                onClick={() => { navigateTo(item.href); onClose(); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigateTo(item.href);
                    onClose();
                  }
                }}
                style={{
                  ...subLinkStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
                {lang === "ar" ? item.titleAr : item.titleEn}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10, marginTop: 4 }}>
          <a href="https://calendar.app.google/a3b18uRcuhHijZ8y5" target="_blank" rel="noreferrer" onClick={onClose} style={{
            flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
            border: "1px solid rgba(255,255,255,.16)", background: "transparent",
            color: "var(--t)", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font)",
          }}>
            {tr.nav.bookMeeting}
          </a>
          <button type="button" onClick={() => { onClose(); onStartNow?.(); }} style={{
            flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
            background: "var(--p)", color: "#fff", fontSize: 14, fontWeight: 700,
            fontFamily: "var(--font)", border: "none", cursor: "pointer",
          }}>
            {tr.nav.startNow}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 4 }}>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}

export default function Nav() {
  const t = useSiteT();
  const { lang, setLang } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const runBlur = useBlurTransition();
  const isRtl = lang === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<"menu1" | "menu2">("menu1");
  const [mobileOpenDrop, setMobileOpenDrop] = useState<"useCases" | "platforms" | "sectors" | "help" | "langTheme" | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [location] = useLocation();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpenDrop(null);
    setMobileOpenDrop(null);
  }, [location]);

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

  const navLinkLiStyle: React.CSSProperties = {
    display: "flex", justifyContent: "center", alignItems: "center",
  };

  const chevron = (isOpen: boolean) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .25s" }}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const useCasesDropdown = getUseCasesDropdown(tr);
  const platformItems = getPlatformItems(tr);
  const mobileHelpItems = [
    {
      label: tr.nav.faq,
      href: "/#faq",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: tr.nav.contact,
      href: "/support",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: tr.nav.blog,
      href: "/blog",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h10v2H5V5zm0 4h10v2H5V9zm0 4h6v2H5v-2z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />

      {/* DESKTOP NAV */}
      <nav className="desktop-nav" style={{
        position: "fixed", top: 16, left: "50%", right: "auto", zIndex: 900,
        transform: "translateX(-50%)", width: "min(92%, 1200px)", maxWidth: 1200,
        background: scrolled ? "rgba(3,3,11,.2)" : "rgba(3,3,11,.1)",
        border: "none",
        borderColor: "rgba(0, 0, 0, 0)",
        borderImage: "none",
        boxShadow: scrolled
          ? "0px 8px 40px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 1px 0px rgba(255, 255, 255, 0.2)"
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
          <ul className="nav-links-inline" style={{ display: "flex", alignItems: "center", gap: 4, listStyle: "none", margin: 0, position: "relative" }}>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "home")} label="Nav Home">
                  {tr.nav.home}
                </Editable>
              </span>
            </li>

            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "usecases")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "useCases")} label="Nav Use Cases">
                    {tr.nav.useCases}
                  </Editable>{" "}
                  {chevron(openDrop === "usecases")}
                </button>
                {openDrop === "usecases" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>

            <li style={{ ...navLinkLiStyle, width: "fit-content" }}>
              <span onClick={() => navigateTo("/success-stories")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0px", borderRadius: 10,
                color: location === "/success-stories" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer", width: "fit-content",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/success-stories") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "successStories")} label="Nav Success Stories">
                  {tr.nav.successStories}
                </Editable>
              </span>
            </li>

            <li style={{ ...navLinkLiStyle, justifyContent: "flex-start" }}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("sectors")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "sectors" || location === "/sectors" || location.startsWith("/sectors/"))}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "sectors")} label="Nav Sectors">
                    {tr.nav.sectors}
                  </Editable>{" "}
                  {chevron(openDrop === "sectors")}
                </button>
                {openDrop === "sectors" && <SectorsDropdown />}
              </DropdownWrapper>
            </li>

            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "platforms")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "platforms")} label="Nav Platforms">
                    {tr.nav.platforms}
                  </Editable>{" "}
                  {chevron(openDrop === "platforms")}
                </button>
                {openDrop === "platforms" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>

            <li style={navLinkLiStyle}>
              <span onClick={() => navigateToHash("/#pricing")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--tm)"}
              >
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "pricing")} label="Nav Pricing">
                  {tr.nav.pricing}
                </Editable>
              </span>
            </li>

            <li style={{ ...navLinkLiStyle, width: "fit-content" }}>
              <span onClick={() => navigateTo("/calculator")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer", width: "fit-content",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/calculator") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "calculator")} label="Nav Calculator">
                  {lang === "en" ? "ROI" : tr.nav.calculator}
                </Editable>
              </span>
            </li>

            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "help")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "help")} label="Nav Help">
                    {tr.nav.help}
                  </Editable>{" "}
                  {chevron(openDrop === "help")}
                </button>
                {openDrop === "help" && (
                  <HelpDropdown />
                )}
              </DropdownWrapper>
            </li>
          </ul>
          </div>

          <div className="nav-ctas" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <LanguageSwitcher />
            <a href="https://calendar.app.google/a3b18uRcuhHijZ8y5" target="_blank" rel="noreferrer" className="nb nav-cta-outline">
              <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "bookMeeting")} label="Nav Book Meeting">
                {tr.nav.bookMeeting}
              </Editable>
            </a>
            <button type="button" onClick={() => setPlatformModalOpen(true)} className="nb nav-cta-fill" style={{ cursor: "pointer", border: "none", fontFamily: "var(--font)" }}>
              <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "startNow")} label="Nav Start Now">
                {tr.nav.startNow}
              </Editable>
            </button>
          </div>
        </div>

        {/* Second row: nav links (tablet breakpoint only, injected via CSS) */}
        <div className="nav-links-row2" style={{ display: "none" }}>
          <ul style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 4, listStyle: "none", margin: 0, padding: "4px 0 8px", position: "relative" }}>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "home")} label="Nav Home">
                  {tr.nav.home}
                </Editable>
              </span>
            </li>
            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("usecases2")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "usecases2")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "useCases")} label="Nav Use Cases">
                    {tr.nav.useCases}
                  </Editable>{" "}
                  {chevron(openDrop === "usecases2")}
                </button>
                {openDrop === "usecases2" && <UseCasesMegaMenu />}
              </DropdownWrapper>
            </li>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/success-stories")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/success-stories" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "successStories")} label="Nav Success Stories">
                  {tr.nav.successStories}
                </Editable>
              </span>
            </li>
            <li style={{ ...navLinkLiStyle, justifyContent: "flex-start" }}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("sectors2")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "sectors2" || location === "/sectors" || location.startsWith("/sectors/"))}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "sectors")} label="Nav Sectors">
                    {tr.nav.sectors}
                  </Editable>{" "}
                  {chevron(openDrop === "sectors2")}
                </button>
                {openDrop === "sectors2" && <SectorsDropdown />}
              </DropdownWrapper>
            </li>
            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("platforms2")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "platforms2")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "platforms")} label="Nav Platforms">
                    {tr.nav.platforms}
                  </Editable>{" "}
                  {chevron(openDrop === "platforms2")}
                </button>
                {openDrop === "platforms2" && <PlatformsDropdown />}
              </DropdownWrapper>
            </li>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateToHash("/#pricing")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "pricing")} label="Nav Pricing">
                  {tr.nav.pricing}
                </Editable>
              </span>
            </li>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/calculator")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/calculator" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/calculator" ? "rgba(124,58,237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "calculator")} label="Nav Calculator">
                  {tr.nav.calculator}
                </Editable>
              </span>
            </li>
            <li style={navLinkLiStyle}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("help2")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "help2")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "help")} label="Nav Help">
                    {tr.nav.help}
                  </Editable>{" "}
                  {chevron(openDrop === "help2")}
                </button>
                {openDrop === "help2" && (
                  <HelpDropdown />
                )}
              </DropdownWrapper>
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className="mobile-top-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: "rgba(3,3,11,.88)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
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
        background: "rgba(6,4,18,.97)",
        borderTop: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(32px)", paddingBottom: "env(safe-area-inset-bottom)",
        transition: "background .3s, border-color .3s",
      }}>
        {mobileOpenDrop && (
          <div style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: "calc(64px + env(safe-area-inset-bottom) + 8px)",
            zIndex: 920,
            borderRadius: 16,
            padding: 8,
            maxHeight: "48vh",
            overflowY: "auto",
            background: "rgba(8,6,20,.97)",
            border: "1px solid rgba(255,255,255,.1)",
            backdropFilter: "blur(32px)",
            boxShadow: "0 24px 60px rgba(0,0,0,.6)",
            animation: "slideUpDropdown .22s cubic-bezier(.23,1,.32,1)",
          }}>
            {mobileOpenDrop === "useCases" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {useCasesDropdown.sections.map((section) => (
                  <div key={section.title}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 4, paddingInline: 4, textTransform: "uppercase" }}>
                      {section.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {section.items.map((item) => (
                        <span
                          key={item.href + item.label}
                          onClick={() => { navigateTo(item.href); setMobileOpenDrop(null); }}
                          style={{
                            display: "block", padding: "10px 12px", borderRadius: 10,
                            background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                            border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                            color: "var(--t)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                          }}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {mobileOpenDrop === "platforms" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {platformItems.map((item) => item.enabled ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileOpenDrop(null)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8,
                      padding: "10px 12px", borderRadius: 10, textDecoration: "none",
                      background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                    }}
                  >
                    <img src={getPlatformLogoSrc(item.key as "salla" | "zid", lang, theme)} alt={item.label} loading="lazy" style={{ height: 18, width: "auto", display: "block" }} />
                  </a>
                ) : (
                  <div
                    key={item.label}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 12px", borderRadius: 10,
                      background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                      color: "var(--td)", fontSize: 13, fontWeight: 500,
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span style={{ fontSize: 10, color: "var(--td)", background: "var(--s2)", padding: "2px 8px", borderRadius: 20 }}>{item.badge}</span>}
                  </div>
                ))}
              </div>
            )}
            {mobileOpenDrop === "sectors" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  onClick={() => { navigateTo("/sectors"); setMobileOpenDrop(null); }}
                  style={{
                    display: "block", padding: "10px 12px", borderRadius: 10,
                    background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                    border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                    color: "var(--p)", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {lang === "ar" ? "كل القطاعات" : "All Sectors"}
                </span>
                {MAIN_SECTOR_NAV.map((item) => (
                  <span
                    key={item.href}
                    onClick={() => { navigateTo(item.href); setMobileOpenDrop(null); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "10px 12px", borderRadius: 10,
                      background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                      color: "var(--t)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
                    {lang === "ar" ? item.titleAr : item.titleEn}
                  </span>
                ))}
              </div>
            )}
            {mobileOpenDrop === "help" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {mobileHelpItems.map((item) => (
                  <span
                    key={item.label}
                    onClick={() => {
                      item.href.includes("#") ? navigateToHash(item.href) : navigateTo(item.href);
                      setMobileOpenDrop(null);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 10,
                      background: isLight ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${isLight ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.07)"}`,
                      color: "var(--t)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "var(--p4)", flexShrink: 0, display: "flex" }}>{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            )}
            {mobileOpenDrop === "langTheme" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button
                  type="button"
                  onClick={() => {
                    runBlur(() => setLang(lang === "ar" ? "en" : "ar"));
                    setMobileOpenDrop(null);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.07)",
                    color: "var(--t)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "var(--font)",
                  }}
                >
                  <span>{lang === "ar" ? "اللغة" : "Language"}</span>
                  <span>{lang === "ar" ? "EN" : "عربي"}</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ position: "relative", overflow: "hidden", height: 64 }}>
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            opacity: mobileMenu === "menu1" ? 1 : 0,
            transform: mobileMenu === "menu1" ? "translateX(0)" : (isRtl ? "translateX(18px)" : "translateX(-18px)"),
            pointerEvents: mobileMenu === "menu1" ? "auto" : "none",
            transition: "opacity .22s ease, transform .22s ease",
          }}>
            {[
              { key: "home", iconKey: "home" as const, label: tr.nav.home, cmsContentKey: cmsKey(lang, "nav", "home"), action: () => { setMobileOpenDrop(null); navigateTo("/"); }, active: location === "/" },
              { key: "solutions", iconKey: "useCases" as const, dropKey: "useCases" as const, label: tr.nav.useCases, cmsContentKey: cmsKey(lang, "nav", "useCases"), action: () => setMobileOpenDrop((prev) => prev === "useCases" ? null : "useCases"), active: location.startsWith("/use-cases/"), hasDrop: true },
              { key: "calculator", iconKey: "calculator" as const, label: tr.nav.calculator, cmsContentKey: cmsKey(lang, "nav", "calculator"), action: () => { setMobileOpenDrop(null); navigateTo("/calculator"); }, active: location === "/calculator" },
              { key: "platforms", iconKey: "platforms" as const, dropKey: "platforms" as const, label: tr.nav.platforms, cmsContentKey: cmsKey(lang, "nav", "platforms"), action: () => setMobileOpenDrop((prev) => prev === "platforms" ? null : "platforms"), active: false, hasDrop: true },
              { key: "sectors", iconKey: "sectors" as const, dropKey: "sectors" as const, label: tr.nav.sectors, cmsContentKey: cmsKey(lang, "nav", "sectors"), action: () => setMobileOpenDrop((prev) => prev === "sectors" ? null : "sectors"), active: location === "/sectors" || location.startsWith("/sectors/"), hasDrop: true },
              { key: "pricing", iconKey: "pricing" as const, label: tr.nav.pricing, cmsContentKey: cmsKey(lang, "nav", "pricing"), action: () => { setMobileOpenDrop(null); navigateToHash("/#pricing"); }, active: false },
              { key: "more", iconKey: "more" as const, label: tr.nav.more, cmsContentKey: cmsKey(lang, "nav", "more"), action: () => { setMobileOpenDrop(null); setMobileMenu("menu2"); }, active: false },
            ].map((item) => {
              const dropOpen = !!(item.hasDrop && item.dropKey != null && mobileOpenDrop === item.dropKey);
              const accent = item.active || dropOpen;
              return (
              <button
                type="button"
                key={item.key}
                onClick={item.action}
                style={{
                  flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 3, background: "none", border: "none",
                  color: accent ? "#a855f7" : "var(--tm)",
                  fontFamily: "var(--font)", fontSize: 11, fontWeight: 500, cursor: "pointer",
                  transition: "color .2s",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, minHeight: 26 }}>
                  <MobileNavIcon name={item.iconKey} size={20} />
                </span>
                <span style={{ whiteSpace: "normal", textAlign: "center", lineHeight: 1.05, width: "fit-content" }}>
                  <Editable allowClickThrough contentKey={item.cmsContentKey} label={item.label}>
                    {item.label}
                  </Editable>
                </span>
              </button>
            );})}
          </div>

          <div style={{
            position: "absolute", inset: 0, display: "flex",
            opacity: mobileMenu === "menu2" ? 1 : 0,
            transform: mobileMenu === "menu2" ? "translateX(0)" : (isRtl ? "translateX(-18px)" : "translateX(18px)"),
            pointerEvents: mobileMenu === "menu2" ? "auto" : "none",
            transition: "opacity .22s ease, transform .22s ease",
          }}>
            {[
              { key: "stories", iconKey: "successStories" as const, label: tr.nav.successStories, cmsContentKey: cmsKey(lang, "nav", "successStories"), action: () => { setMobileOpenDrop(null); navigateTo("/success-stories"); }, active: location === "/success-stories" },
              { key: "help", iconKey: "help" as const, dropKey: "help" as const, label: tr.nav.help, cmsContentKey: cmsKey(lang, "nav", "help"), action: () => setMobileOpenDrop((prev) => prev === "help" ? null : "help"), active: false, hasDrop: true },
              { key: "meeting", iconKey: "meeting" as const, label: tr.nav.bookMeeting, cmsContentKey: cmsKey(lang, "nav", "bookMeeting"), action: () => { setMobileOpenDrop(null); window.open("https://calendar.app.google/a3b18uRcuhHijZ8y5", "_blank", "noopener,noreferrer"); }, active: false },
              { key: "startNow", iconKey: "startNow" as const, label: tr.nav.startNow, cmsContentKey: cmsKey(lang, "nav", "startNow"), action: () => { setMobileOpenDrop(null); setPlatformModalOpen(true); }, active: false },
              { key: "langTheme", iconKey: "langTheme" as const, dropKey: "langTheme" as const, label: lang === "ar" ? "اللغة/الوضع" : "Lang/Mode", cmsContentKey: cmsKey(lang, "nav", "more"), action: () => setMobileOpenDrop((prev) => prev === "langTheme" ? null : "langTheme"), active: false, hasDrop: true },
              { key: "back", iconKey: "back" as const, label: lang === "ar" ? "رجوع" : "Back", cmsContentKey: cmsKey(lang, "nav", "more"), action: () => { setMobileOpenDrop(null); setMobileMenu("menu1"); }, active: false },
            ].map((item) => {
              const dropOpen = !!(item.hasDrop && item.dropKey != null && mobileOpenDrop === item.dropKey);
              const accent = item.active || dropOpen;
              const iconName = item.key === "back" ? (isRtl ? "backRtl" : "back") : item.iconKey;
              return (
              <button
                type="button"
                key={item.key}
                onClick={item.action}
                style={{
                  flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 3, background: "none", border: "none",
                  color: accent ? "#a855f7" : "var(--tm)",
                  fontFamily: "var(--font)", fontSize: 11, fontWeight: 500, cursor: "pointer",
                  transition: "color .2s",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, minHeight: 26 }}>
                  <MobileNavIcon name={iconName} size={20} />
                </span>
                <span style={{ whiteSpace: "normal", textAlign: "center", lineHeight: 1.05, width: "fit-content" }}>
                  <Editable allowClickThrough contentKey={item.cmsContentKey} label={item.label}>
                    {item.label}
                  </Editable>
                </span>
              </button>
            );})}
          </div>
        </div>
      </div>
    </>
  );
}
