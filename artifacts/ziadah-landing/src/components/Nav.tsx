import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "wouter";
import { navigateTo, navigateToHash } from "@/components/PageTransition";
import { useBlurTransition } from "@/components/BlurTransitionProvider";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import type { Translations } from "@/i18n/translations";
import { useTheme } from "@/ThemeContext";
import PlatformModal from "./PlatformModal";
import { useMeetingBooking } from "./MeetingBookingProvider";
import { MEETING_BOOKING_NAV_URL } from "@/config/meetingBooking";
import { platformSallaLogoSrc, platformZidLogoSrc } from "@/utils/platformAsset";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";


export const Logo = () => {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const logoSrc = lang === "ar" ? "/logo-ar.svg" : "/logo-en.svg";
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
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124, 58, 237,.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "unset"; }}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "5px 10px", borderRadius: 8,
        background: "unset",
        backgroundImage: "none",
        border: "none",
        color: "var(--tm)", fontSize: 12, fontWeight: 700,
        cursor: "pointer", transition: "all .2s", fontFamily: "var(--font)",
        whiteSpace: "nowrap", flexShrink: 0,
      }}
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

function LoginDropdown({ lang, theme }: { lang: "ar" | "en"; theme: "dark" | "light" }) {
  const sallaLogo = getPlatformLogoSrc("salla", lang, theme);
  const zidLogo = getPlatformLogoSrc("zid", lang, theme);
  const itemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 16px", borderRadius: 10, textDecoration: "none",
    background: "#f9fafb",
    border: "1px solid #e4e4e7",
    color: "var(--t)", fontSize: 14, fontWeight: 500,
    cursor: "pointer", transition: "background .2s",
    fontFamily: "var(--font)",
  };
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 8px)",
      insetInlineEnd: 0,
      zIndex: 950,
      minWidth: 160,
      background: "#fff",
      border: "1px solid #e4e4e7",
      borderRadius: 14,
      padding: 6,
      backdropFilter: "none",
      boxShadow: "0 16px 48px rgba(9,9,11,.14)",
      animation: "slideUpDropdown .18s cubic-bezier(.23,1,.32,1)",
    }}>
      <a
        href="https://dashboard.ziadah.app/login"
        target="_blank"
        rel="noreferrer"
        style={itemStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124, 58, 237,.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}
      >
        <img src={sallaLogo} alt="Salla" style={{ height: 18, width: "auto" }} />
        <span style={{ color: "var(--tm)", fontSize: 13 }}>{lang === "ar" ? "سلة" : "Salla"}</span>
      </a>
      <a
        href="https://web.ziadah.app/"
        target="_blank"
        rel="noreferrer"
        style={{ ...itemStyle, marginTop: 4 }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124, 58, 237,.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}
      >
        <img src={zidLogo} alt="Zid" style={{ height: 18, width: "auto" }} />
        <span style={{ color: "var(--tm)", fontSize: 13 }}>{lang === "ar" ? "زد" : "Zid"}</span>
      </a>
    </div>
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

type PlatformAppNavItem = { label: string; href: string; enabled: boolean };

function getZidPlatformAppNavItems(tr: Translations): PlatformAppNavItem[] {
  return [{ label: tr.nav.zidAppsComparison, href: "/zid-apps-comparison", enabled: true }];
}

/** Set `enabled: true` and real `href` when each Salla page is ready. */
function getSallaPlatformAppNavItems(tr: Translations): PlatformAppNavItem[] {
  return [
    { label: tr.nav.sallaAppsNavItem1, href: "#", enabled: false },
  ];
}

function PlatformAppNavItemList({ items }: { items: PlatformAppNavItem[] }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const rowHover = (el: HTMLElement, on: boolean) => {
    el.style.background = on ? "rgba(124, 58, 237,.1)" : "transparent";
  };
  return (
    <>
      {items.map((item) => {
        const key = `${item.href}-${item.label}`;
        if (!item.enabled) {
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 12,
                color: "#71717a",
                fontSize: 14,
                fontWeight: 500,
                cursor: "default",
                fontFamily: "var(--font)",
              }}
            >
              <span>{item.label}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: "#f4f4f5",
                  color: "#71717a",
                  padding: "2px 8px",
                  borderRadius: 20,
                  flexShrink: 0,
                }}
              >
                {tr.nav.comingSoon}
              </span>
            </div>
          );
        }
        const external = /^https?:\/\//i.test(item.href);
        if (external) {
          return (
            <a
              key={key}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: 12,
                textDecoration: "none",
                color: "var(--t)",
                fontSize: 14,
                fontWeight: 500,
                transition: "background .2s",
                fontFamily: "var(--font)",
              }}
              onMouseEnter={(e) => rowHover(e.currentTarget, true)}
              onMouseLeave={(e) => rowHover(e.currentTarget, false)}
            >
              {item.label}
            </a>
          );
        }
        return (
          <span
            key={key}
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
              display: "block",
              padding: "10px 14px",
              borderRadius: 12,
              color: "var(--t)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background .2s",
              fontFamily: "var(--font)",
            }}
            onMouseEnter={(e) => rowHover(e.currentTarget as HTMLElement, true)}
            onMouseLeave={(e) => rowHover(e.currentTarget as HTMLElement, false)}
          >
            {item.label}
          </span>
        );
      })}
    </>
  );
}

function ComparisonAppsGroupedDropdown({
  zidItems,
  sallaItems,
}: {
  zidItems: PlatformAppNavItem[];
  sallaItems: PlatformAppNavItem[];
}) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const panelStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    left: "auto",
    minWidth: "min(300px, calc(100vw - 24px))",
    maxWidth: "calc(100vw - 16px)",
    boxSizing: "border-box",
    background: "#fff",
    border: "1px solid #e4e4e7",
    borderRadius: 16,
    padding: "8px 6px",
    backdropFilter: "none",
    boxShadow: "0 16px 48px rgba(9,9,11,.14)",
    zIndex: 100,
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 800,
    color: "#7c3aed",
    padding: "6px 12px 2px",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "var(--font)",
  };
  return (
    <div style={panelStyle}>
      <div style={sectionTitleStyle}>{tr.nav.comparisonDropdownZid}</div>
      <PlatformAppNavItemList items={zidItems} />
      <div style={{ height: 1, background: "#e4e4e7", margin: "8px 8px 6px" }} />
      <div style={sectionTitleStyle}>{tr.nav.comparisonDropdownSalla}</div>
      <PlatformAppNavItemList items={sallaItems} />
    </div>
  );
}

function DropdownWrapper({ children, onHoverStart, onHoverEnd }: { children: React.ReactNode; onHoverStart: () => void; onHoverEnd: () => void }) {
  return (
    <div onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} style={{ position: "relative" }}>
      {children}
    </div>
  );
}

const USE_CASE_SECTION_ICONS: Record<string, string> = {
  "حسب الصفحات": "📄",
  "حسب النشاط": "⚡",
  "حسب طريقة العرض": "🎨",
  "حسب الهدف": "🎯",
  "حسب التجربة": "✨",
  "By Page": "📄",
  "By Activity": "⚡",
  "By Display Type": "🎨",
  "By Goal": "🎯",
  "By Experience": "✨",
};

function UseCasesMegaMenu() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const useCasesDropdown = getUseCasesDropdown(tr);
  const panelWidth = "min(1200px, calc(100vw - 32px))";
  return (
    <div
      className="use-cases-mega-menu"
      style={{
      position: "fixed",
      top: 68,
      left: "50%",
      transform: "translateX(-50%)",
      width: panelWidth,
      maxWidth: panelWidth,
      minWidth: 0,
      boxSizing: "border-box",
      background: "#fff",
      border: "1px solid #e4e4e7",
      borderRadius: 18,
      padding: "20px 16px",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      boxShadow: "0 24px 64px rgba(9,9,11,.16)",
      zIndex: 1000,
      overflowX: "hidden",
      overflowY: "auto",
      maxHeight: "min(75dvh, 560px)",
      overscrollBehavior: "contain",
      WebkitOverflowScrolling: "touch",
      animation: "megaMenuIn .2s cubic-bezier(.23,1,.32,1)",
    }}
    >
      {useCasesDropdown.sections.map((section, i) => (
        <div
          key={section.title}
          className="use-cases-mega-menu__col"
          style={{
            padding: "4px 10px",
            borderInlineEnd: i < useCasesDropdown.sections.length - 1
              ? `1px solid #e4e4e7`
              : "none",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 10, fontWeight: 800, color: "#7c3aed", marginBottom: 10,
            paddingBottom: 8,
            borderBottom: "1px solid #e4e4e7",
            textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "var(--font)",
          }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>
              {USE_CASE_SECTION_ICONS[section.title] ?? "▸"}
            </span>
            {section.title}
          </div>
          {section.items.map((item) => (
            <span
              key={item.href + item.label}
              onClick={() => navigateTo(item.href)}
              style={{
                display: "block", padding: "9px 10px", borderRadius: 10,
                textDecoration: "none", transition: "background .18s, color .18s", fontSize: 13.5,
                fontWeight: 600, color: "var(--t)", cursor: "pointer", fontFamily: "var(--font)",
                overflowWrap: "anywhere", wordBreak: "break-word", marginBottom: 2,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(124, 58, 237,.1)";
                (e.currentTarget as HTMLElement).style.color = "#7c3aed";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--t)";
              }}
            >
              {item.label}
              {item.subtitle && (
                <span style={{ display: "block", fontSize: 11.5, color: "var(--tm)", marginTop: 2, fontWeight: 400, lineHeight: 1.4, overflowWrap: "anywhere", wordBreak: "break-word" }}>
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
      background: "#fff",
      border: "1px solid #e4e4e7",
      borderRadius: 16, padding: 8, backdropFilter: "none",
      boxShadow: "0 16px 48px rgba(9,9,11,.14)", zIndex: 100,
    }}>
      {platformItems.map((item) => {
        if (!item.enabled) {
          return (
            <div
              key={item.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 12, color: "#71717a",
                fontSize: 14, fontWeight: 500, cursor: "default",
              }}
            >
              <span>{item.label}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, background: "#f4f4f5",
                color: "#71717a", padding: "2px 8px", borderRadius: 20,
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
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(124, 58, 237,.1)")}
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

// Shared contact endpoints — kept in sync with the sister sites' Help menus.
const ZIADAH_WHATSAPP_URL = "https://wa.me/966544357555";
const ZIADAH_SUPPORT_EMAIL = "support@ziadah.app";

type HelpNavItem = {
  label: string;
  subtitle: string;
  icon: ReactNode;
  kind: "route" | "external" | "book";
  href?: string;
};

// Canonical Help menu shared across Raasid / Shaa / Ziadah:
// Support center, Blog, FAQ, WhatsApp, Email, Book a call.
function getHelpNavItems(tr: Translations[keyof Translations], lang: "ar" | "en"): HelpNavItem[] {
  return [
    {
      label: lang === "ar" ? "مركز المساعدة" : "Support center",
      subtitle: lang === "ar" ? "أدلة وشروحات خطوة بخطوة" : "Guides & step-by-step articles",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm0 3a5.5 5.5 0 015.5 5.5c0 .5-.06.98-.18 1.44l-2.6-1.06A2.5 2.5 0 0010 8a2.5 2.5 0 00-2.72 2.38l-2.6 1.06A5.5 5.5 0 0110 4.5zm0 11a5.5 5.5 0 01-4.32-2.1l2.6-1.06A2.5 2.5 0 0010 13.5a2.5 2.5 0 001.72-.66l2.6 1.06A5.5 5.5 0 0110 15.5z" fill="currentColor"/></svg>
      ),
      kind: "route",
      href: "/support",
    },
    {
      label: tr.nav.blog,
      subtitle: tr.nav.blogSub,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h10v2H5V5zm0 4h10v2H5V9zm0 4h6v2H5v-2z" fill="currentColor"/></svg>
      ),
      kind: "route",
      href: "/blog",
    },
    {
      label: tr.nav.faq,
      subtitle: tr.nav.faqSub,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm1-4.5v.5a1 1 0 01-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 01-2 0A3.5 3.5 0 1111 9.5z" fill="currentColor"/></svg>
      ),
      kind: "route",
      href: "/#faq",
    },
    {
      label: lang === "ar" ? "واتساب" : "WhatsApp",
      subtitle: lang === "ar" ? "رد سريع على استفساراتك" : "Fast replies to your questions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.7a8.3 8.3 0 00-7.1 12.6L1.7 18.3l4.1-1.1A8.3 8.3 0 1010 1.7zm0 15a6.7 6.7 0 01-3.4-.93l-.24-.14-2.43.64.65-2.37-.16-.25A6.7 6.7 0 1110 16.7zm3.7-5c-.2-.1-1.2-.6-1.38-.66-.19-.07-.32-.1-.46.1-.14.2-.53.66-.65.8-.12.13-.24.15-.44.05-.2-.1-.85-.31-1.62-1-.6-.53-1-1.19-1.12-1.39-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.46-1.1-.63-1.51-.16-.4-.33-.34-.46-.35h-.39c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66 0 .98.72 1.93.82 2.06.1.13 1.4 2.14 3.4 3 .48.2.85.33 1.14.42.48.15.92.13 1.26.08.39-.06 1.2-.49 1.36-.96.17-.47.17-.87.12-.96-.05-.09-.18-.14-.38-.24z" fill="currentColor"/></svg>
      ),
      kind: "external",
      href: ZIADAH_WHATSAPP_URL,
    },
    {
      label: lang === "ar" ? "البريد الإلكتروني" : "Email",
      subtitle: ZIADAH_SUPPORT_EMAIL,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0l6 4 6-4H4zm12 2.2l-6 4-6-4V15h12V7.2z" fill="currentColor"/></svg>
      ),
      kind: "external",
      href: `mailto:${ZIADAH_SUPPORT_EMAIL}`,
    },
    {
      label: lang === "ar" ? "احجز مكالمة" : "Book a call",
      subtitle: lang === "ar" ? "جلسة تعريفية مجانية" : "Free intro session",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H8V2H6zM4 8h12v8H4V8z" fill="currentColor"/></svg>
      ),
      kind: "book",
    },
  ];
}

// Fire a Help item consistently from any (desktop or mobile) renderer.
function runHelpItem(
  item: HelpNavItem,
  openMeetingBooking: (bookingUrl?: string) => void,
  close: () => void,
) {
  if (item.kind === "book") {
    openMeetingBooking(MEETING_BOOKING_NAV_URL);
  } else if (item.kind === "external") {
    window.open(item.href!, "_blank", "noopener,noreferrer");
  } else if (item.href!.includes("#")) {
    navigateToHash(item.href!);
  } else {
    navigateTo(item.href!);
  }
  close();
}

function HelpDropdown() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const { openMeetingBooking } = useMeetingBooking();
  const tr = t[lang];
  const helpItems = getHelpNavItems(tr, lang);

  const activate = (item: HelpNavItem) => runHelpItem(item, openMeetingBooking, () => {});

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, left: "auto",
      minWidth: "min(300px, calc(100vw - 24px))",
      maxWidth: "calc(100vw - 16px)",
      boxSizing: "border-box",
      background: "#fff",
      border: "1px solid #e4e4e7",
      borderRadius: 16, padding: 8, backdropFilter: "none",
      boxShadow: "0 16px 48px rgba(9,9,11,.14)", zIndex: 100,
    }}>
      {helpItems.map((item) => (
        <span
          key={item.label}
          role="button"
          tabIndex={0}
          onClick={() => activate(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              activate(item);
            }
          }}
          style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
            borderRadius: 12, textDecoration: "none", transition: "background .2s", cursor: "pointer",
            width: "100%", textAlign: lang === "ar" ? "right" : "left",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124, 58, 237,.1)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{ color: "#7c3aed", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{item.subtitle}</div>
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
    case "analyze":
      return (
        <svg {...s} aria-hidden>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
    case "login":
      return (
        <svg {...s} aria-hidden>
          <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
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
      background: "#fff",
      border: "1px solid #e4e4e7",
      borderRadius: 16, padding: 8, backdropFilter: "none",
      boxShadow: "0 16px 48px rgba(9,9,11,.14)", zIndex: 100,
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
          color: "#7c3aed",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "background .2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(124, 58, 237,.1)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {allSectorsLabel}
      </span>
      <div style={{ height: 1, background: "#e4e4e7", margin: "6px 8px" }} />
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
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124, 58, 237,.1)")}
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
  const { openMeetingBooking } = useMeetingBooking();
  const useCasesDropdown = getUseCasesDropdown(tr);
  const platformItems = getPlatformItems(tr);
  const zidPlatformAppNavItems = getZidPlatformAppNavItems(tr);
  const sallaPlatformAppNavItems = getSallaPlatformAppNavItems(tr);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  const directLinkStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
    borderRadius: 14, background: "#f9fafb", textDecoration: "none",
    border: "1px solid #e4e4e7",
    color: "var(--tm)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font)",
    marginBottom: 6,
  };

  const subLinkStyle: React.CSSProperties = {
    display: "block", padding: "10px 12px", borderRadius: 10,
    background: "#f9fafb", textDecoration: "none",
    border: "1px solid #e4e4e7",
    color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
  };

  const mobileHelpItems = getHelpNavItems(tr, lang);

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
          background: "#fff",
          border: "1px solid #e4e4e7",
          borderBottom: "none",
          borderRadius: "22px 22px 0 0",
          padding: "10px 14px 8px",
          backdropFilter: "none",
          boxShadow: "0 -8px 40px rgba(9,9,11,.18)",
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
          background: "#d4d4d8",
          margin: "2px auto 10px",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#71717a", letterSpacing: 0.8, textTransform: "uppercase" }}>{tr.nav.menu}</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#f4f4f5", border: "none", color: "var(--tm)",
              width: 32, height: 32, borderRadius: 10, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: 8, border: "1px solid #e4e4e7", borderRadius: 14, padding: "4px 8px", background: "#fafafa" }}>
          <button
            type="button"
            onClick={() => toggleSection("useCases")}
            aria-expanded={openSection === "useCases"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.useCases}</span>
            <span style={{ fontSize: 10, color: "#71717a", transition: "transform .25s", transform: openSection === "useCases" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: openSection === "useCases" ? "2000px" : "0px",
            opacity: openSection === "useCases" ? 1 : 0,
            transition: "max-height .3s cubic-bezier(.23,1,.32,1), opacity .25s ease",
          }}>
            {useCasesDropdown.sections.map((section) => (
              <div key={section.title} style={{ marginBottom: 10, paddingBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#71717a", marginBottom: 6, paddingInlineEnd: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{section.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {section.items.map((item) => (
                    <span
                      key={item.href}
                      onClick={() => { navigateTo(item.href); onClose(); }}
                      style={{ ...subLinkStyle, cursor: "pointer" }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 8, border: "1px solid #e4e4e7", borderRadius: 14, padding: "4px 8px", background: "#fafafa" }}>
          <button
            type="button"
            onClick={() => toggleSection("platforms")}
            aria-expanded={openSection === "platforms"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.platforms}</span>
            <span style={{ fontSize: 10, color: "#71717a", transition: "transform .25s", transform: openSection === "platforms" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
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
                      background: "#f9fafb", color: "#71717a",
                      border: "1px solid #e4e4e7",
                      fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span style={{ fontSize: 10, color: "#71717a", background: "#f4f4f5", padding: "2px 8px", borderRadius: 20 }}>{item.badge}</span>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 8, border: "1px solid #e4e4e7", borderRadius: 14, padding: "4px 8px", background: "#fafafa" }}>
          <button
            type="button"
            onClick={() => toggleSection("comparisonApps")}
            aria-expanded={openSection === "comparisonApps"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "comparisonNav")} label="Nav Comparison">
              {tr.nav.comparisonNav}
            </Editable>
            <span style={{ fontSize: 10, color: "#71717a", transition: "transform .25s", transform: openSection === "comparisonApps" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: openSection === "comparisonApps" ? "2000px" : "0px",
            opacity: openSection === "comparisonApps" ? 1 : 0,
            transition: "max-height .3s cubic-bezier(.23,1,.32,1), opacity .25s ease",
          }}>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#71717a", padding: "8px 8px 4px", letterSpacing: 0.6 }}>{tr.nav.comparisonDropdownZid}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {zidPlatformAppNavItems.map((item) =>
                  item.enabled ? (
                    <span
                      key={item.href + item.label}
                      onClick={() => {
                        navigateTo(item.href);
                        onClose();
                      }}
                      style={{ ...subLinkStyle, cursor: "pointer" }}
                    >
                      <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "zidAppsComparison")} label="Nav Zid apps comparison">
                        {item.label}
                      </Editable>
                    </span>
                  ) : null,
                )}
              </div>
              <div style={{ height: 1, background: "#e4e4e7", margin: "10px 4px 8px" }} />
              <div style={{ fontSize: 10, fontWeight: 800, color: "#71717a", padding: "4px 8px 4px", letterSpacing: 0.6 }}>{tr.nav.comparisonDropdownSalla}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sallaPlatformAppNavItems.map((item) =>
                  item.enabled ? (
                    <span
                      key={item.href + item.label}
                      onClick={() => {
                        navigateTo(item.href);
                        onClose();
                      }}
                      style={{ ...subLinkStyle, cursor: "pointer" }}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <div
                      key={item.href + item.label}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "9px 12px", borderRadius: 10,
                        background: "#f9fafb", color: "#71717a",
                        border: "1px solid #e4e4e7",
                        fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                      }}
                    >
                      <Editable
                        allowClickThrough
                        contentKey={cmsKey(lang, "nav", "sallaAppsNavItem1")}
                        label="Nav Salla slot 1"
                      >
                        {item.label}
                      </Editable>
                      <span style={{ fontSize: 10, color: "#71717a", background: "#f4f4f5", padding: "2px 8px", borderRadius: 20 }}>{tr.nav.comingSoon}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 8, border: "1px solid #e4e4e7", borderRadius: 14, padding: "4px 8px", background: "#fafafa" }}>
          <button
            type="button"
            onClick={() => toggleSection("help")}
            aria-expanded={openSection === "help"}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", padding: "10px 4px",
              fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5,
              textTransform: "uppercase", fontFamily: "var(--font)",
            }}
          >
            <span>{tr.nav.help}</span>
            <span style={{ fontSize: 10, color: "#71717a", transition: "transform .25s", transform: openSection === "help" ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
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
                  borderRadius: 10, background: "#f9fafb",
                  border: "1px solid #e4e4e7",
                  textDecoration: "none", color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)",
                };
                return (
                  <span key={item.label} onClick={() => runHelpItem(item, openMeetingBooking, onClose)} style={{ ...itemStyle, cursor: "pointer" }}>
                    <span style={{ color: "#7c3aed", flexShrink: 0 }}>{item.icon}</span>
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
          <span onClick={() => { navigateTo("/analyze"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            {tr.nav.analyze}
          </span>
          <span onClick={() => { navigateTo("/pricing"); onClose(); }} style={{ ...directLinkStyle, cursor: "pointer", margin: 0 }}>
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
          <button
            type="button"
            onClick={() => {
              onClose();
              openMeetingBooking(MEETING_BOOKING_NAV_URL);
            }}
            style={{
              flex: 1, display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 12,
              border: "1px solid #e4e4e7", background: "transparent",
              color: "var(--t)", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font)",
              cursor: "pointer",
            }}
          >
            {tr.nav.bookMeeting}
          </button>
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
  const { openMeetingBooking } = useMeetingBooking();
  const runBlur = useBlurTransition();
  const isRtl = lang === "ar";
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenDrop, setMobileOpenDrop] = useState<"useCases" | "platforms" | "sectors" | "help" | "langTheme" | "login" | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [location] = useLocation();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpenDrop(null);
    setMobileOpenDrop(null);
    setMobileMenuOpen(false);
  }, [location]);

  // Lock background scroll while the mobile hamburger panel is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileOpenDrop(null);
  };

  const handleHoverStart = (label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDrop(label);
  };

  const handleHoverEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpenDrop(null), 150);
  };

  const navBtnStyle = (isOpen: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 5, padding: "7px 13px",
    borderRadius: 10,
    background: isOpen ? "rgba(124, 58, 237,.15)" : "transparent",
    border: "none",
    color: isOpen ? "var(--t)" : "var(--tm)",
    fontFamily: "var(--font)", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
    transition: "all .18s", whiteSpace: "nowrap",
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
  const zidPlatformAppNavItems = getZidPlatformAppNavItems(tr);
  const sallaPlatformAppNavItems = getSallaPlatformAppNavItems(tr);
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
        position: "fixed", top: 0, left: "50%", right: "auto", zIndex: 900,
        transform: "translateX(-50%)", display: "flex", flexDirection: "column",
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(250, 250, 251, 0.96)",
        backgroundImage: "none",
        border: "1px solid rgba(124, 58, 237, 0.18)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.14)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        color: "var(--tm)",
        borderRadius: 0,
        padding: "0 20px",
        transition: "background .22s ease, box-shadow .22s ease, border-color .22s ease",
      }}>
        {/* Top row: nav links + CTAs (always visible) */}
        <div className="nav-top-row" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 58,
          paddingLeft: 16,
          paddingRight: 16,
          width: "100%",
          gap: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Logo />
          <ul className="nav-links-inline" style={{ display: "flex", alignItems: "center", gap: 4, listStyle: "none", margin: 0, position: "relative" }}>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/" ? "rgba(124, 58, 237,.1)" : "transparent",
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
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124, 58, 237,.1)" : "transparent",
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
              <span onClick={() => navigateTo("/pricing")} style={{
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
                textDecoration: "none", background: location === "/calculator" ? "rgba(124, 58, 237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer", width: "fit-content",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t)"}
                onMouseLeave={e => { if (location !== "/calculator") (e.currentTarget as HTMLElement).style.color = "var(--tm)"; }}
              >
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "calculator")} label="Nav Calculator">
                  {lang === "en" ? "Calculator" : tr.nav.calculator}
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

          <div className="nav-ctas" style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <LanguageSwitcher />
            <div style={{ position: "relative" }}>
              <DropdownWrapper onHoverStart={() => handleHoverStart("login")} onHoverEnd={handleHoverEnd}>
                <button
                  type="button"
                  className="nb nav-cta-outline"
                  style={{ cursor: "pointer", fontFamily: "var(--font)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}
                >
                  {lang === "ar" ? "تسجيل الدخول" : "Login"}
                  {chevron(openDrop === "login")}
                </button>
                {openDrop === "login" && <LoginDropdown lang={lang} theme={theme} />}
              </DropdownWrapper>
            </div>
            <button
              type="button"
              className="nb nav-cta-outline"
              onClick={() => openMeetingBooking(MEETING_BOOKING_NAV_URL)}
              style={{ cursor: "pointer", fontFamily: "var(--font)", fontSize: 12 }}
            >
              <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "bookMeeting")} label="Nav Book Meeting">
                {tr.nav.bookMeeting}
              </Editable>
            </button>
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
                textDecoration: "none", background: location === "/" ? "rgba(124, 58, 237,.1)" : "transparent",
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
                textDecoration: "none", background: location === "/success-stories" ? "rgba(124, 58, 237,.1)" : "transparent",
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
              <DropdownWrapper onHoverStart={() => handleHoverStart("comparisonNav2")} onHoverEnd={handleHoverEnd}>
                <button type="button" style={navBtnStyle(openDrop === "comparisonNav2" || location === "/zid-apps-comparison")}>
                  <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "comparisonNav")} label="Nav Comparison">
                    {tr.nav.comparisonNav}
                  </Editable>{" "}
                  {chevron(openDrop === "comparisonNav2")}
                </button>
                {openDrop === "comparisonNav2" && (
                  <ComparisonAppsGroupedDropdown zidItems={zidPlatformAppNavItems} sallaItems={sallaPlatformAppNavItems} />
                )}
              </DropdownWrapper>
            </li>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/pricing")} style={{
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
                textDecoration: "none", background: location === "/calculator" ? "rgba(124, 58, 237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "calculator")} label="Nav Calculator">
                  {tr.nav.calculator}
                </Editable>
              </span>
            </li>
            <li style={navLinkLiStyle}>
              <span onClick={() => navigateTo("/analyze")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 14px", borderRadius: 10,
                color: location === "/analyze" ? "var(--t)" : "var(--tm)",
                fontFamily: "var(--font)", fontSize: 14, fontWeight: 500,
                textDecoration: "none", background: location === "/analyze" ? "rgba(124, 58, 237,.1)" : "transparent",
                transition: "all .2s", cursor: "pointer",
              }}>
                <Editable allowClickThrough contentKey={cmsKey(lang, "nav", "analyze")} label="Nav Analyze">
                  {tr.nav.analyze}
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

      {/* MOBILE TOP BAR (logo + language + hamburger) */}
      <div className="mobile-top-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: "rgba(250, 250, 251,.88)",
        borderBottom: "1px solid #e4e4e7",
        backdropFilter: "blur(32px)",
        alignItems: "center", justifyContent: "space-between",
        height: 52,
        padding: "0 16px",
        transition: "background .3s, border-color .3s",
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            aria-label="Toggle language"
            onClick={() => runBlur(() => setLang(lang === "ar" ? "en" : "ar"))}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 36, padding: "0 12px", borderRadius: 10,
              border: "1px solid #e4e4e7", background: "transparent",
              color: "var(--t)", fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button
            type="button"
            aria-label={lang === "ar" ? "القائمة" : "Menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => { setMobileMenuOpen((v) => !v); setMobileOpenDrop(null); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, borderRadius: 10,
              border: "1px solid #e4e4e7", background: "transparent",
              color: "var(--t)", cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL (hamburger) */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={closeMobileMenu}
            style={{ position: "fixed", top: 52, left: 0, right: 0, bottom: 0, zIndex: 895, background: "rgba(9,9,11,.35)" }}
          />
          <div className="mobile-menu-panel" style={{
            position: "fixed", top: 52, left: 0, right: 0, zIndex: 899,
            maxHeight: "calc(100vh - 52px)", overflowY: "auto", WebkitOverflowScrolling: "touch",
            background: "#fff", borderBottom: "1px solid #e4e4e7",
            boxShadow: "0 16px 48px rgba(9,9,11,.16)",
            padding: "12px 14px 20px", display: "flex", flexDirection: "column", gap: 2,
            animation: "slideDownPanel .2s ease",
          }}>
            <button type="button" className="mnav-row" onClick={() => { navigateTo("/"); closeMobileMenu(); }}>
              <span>{tr.nav.home}</span>
            </button>
            <button type="button" className="mnav-row" onClick={() => setMobileOpenDrop((p) => p === "useCases" ? null : "useCases")}>
              <span>{tr.nav.useCases}</span>
              <svg className={`mnav-chev${mobileOpenDrop === "useCases" ? " open" : ""}`} width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {mobileOpenDrop === "useCases" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {useCasesDropdown.sections.map((section) => (
                  <div key={section.title}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#71717a", marginBottom: 4, paddingInline: 4, textTransform: "uppercase" }}>
                      {section.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {section.items.map((item) => (
                        <span
                          key={item.href + item.label}
                          onClick={() => { navigateTo(item.href); setMobileOpenDrop(null); }}
                          style={{
                            display: "block", padding: "10px 12px", borderRadius: 10,
                            background: "#f9fafb",
                            border: "1px solid #e4e4e7",
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
            <button type="button" className="mnav-row" onClick={() => setMobileOpenDrop((p) => p === "platforms" ? null : "platforms")}>
              <span>{tr.nav.platforms}</span>
              <svg className={`mnav-chev${mobileOpenDrop === "platforms" ? " open" : ""}`} width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
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
                      background: "#f9fafb",
                      border: "1px solid #e4e4e7",
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
                      background: "#f9fafb",
                      border: "1px solid #e4e4e7",
                      color: "#71717a", fontSize: 13, fontWeight: 500,
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span style={{ fontSize: 10, color: "#71717a", background: "#f4f4f5", padding: "2px 8px", borderRadius: 20 }}>{item.badge}</span>}
                  </div>
                ))}
              </div>
            )}
            <button type="button" className="mnav-row" onClick={() => setMobileOpenDrop((p) => p === "sectors" ? null : "sectors")}>
              <span>{tr.nav.sectors}</span>
              <svg className={`mnav-chev${mobileOpenDrop === "sectors" ? " open" : ""}`} width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {mobileOpenDrop === "sectors" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  onClick={() => { navigateTo("/sectors"); setMobileOpenDrop(null); }}
                  style={{
                    display: "block", padding: "10px 12px", borderRadius: 10,
                    background: "#f9fafb",
                    border: "1px solid #e4e4e7",
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
                      background: "#f9fafb",
                      border: "1px solid #e4e4e7",
                      color: "var(--t)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
                    {lang === "ar" ? item.titleAr : item.titleEn}
                  </span>
                ))}
              </div>
            )}
            <button type="button" className="mnav-row" onClick={() => { navigateTo("/success-stories"); closeMobileMenu(); }}>
              <span>{tr.nav.successStories}</span>
            </button>
            <button type="button" className="mnav-row" onClick={() => { navigateTo("/pricing"); closeMobileMenu(); }}>
              <span>{tr.nav.pricing}</span>
            </button>
            <button type="button" className="mnav-row" onClick={() => { navigateTo("/calculator"); closeMobileMenu(); }}>
              <span>{tr.nav.calculator}</span>
            </button>
            <button type="button" className="mnav-row" onClick={() => setMobileOpenDrop((p) => p === "help" ? null : "help")}>
              <span>{tr.nav.help}</span>
              <svg className={`mnav-chev${mobileOpenDrop === "help" ? " open" : ""}`} width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {mobileOpenDrop === "help" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {mobileHelpItems.map((item) => (
                  <span
                    key={item.label}
                    onClick={() => runHelpItem(item, openMeetingBooking, () => setMobileOpenDrop(null))}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 10,
                      background: "#f9fafb",
                      border: "1px solid #e4e4e7",
                      color: "var(--t)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#7c3aed", flexShrink: 0, display: "flex" }}>{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            )}
            <button type="button" className="mnav-row" onClick={() => setMobileOpenDrop((p) => p === "login" ? null : "login")}>
              <span>{lang === "ar" ? "تسجيل الدخول" : "Login"}</span>
              <svg className={`mnav-chev${mobileOpenDrop === "login" ? " open" : ""}`} width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {mobileOpenDrop === "login" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <a
                  href="https://dashboard.ziadah.app/login"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpenDrop(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 10, textDecoration: "none",
                    background: "#f9fafb",
                    border: "1px solid #e4e4e7",
                  }}
                >
                  <img src={getPlatformLogoSrc("salla", lang as "ar" | "en", theme as "dark" | "light")} alt="Salla" loading="lazy" style={{ height: 18, width: "auto" }} />
                  <span style={{ color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)" }}>{lang === "ar" ? "سلة" : "Salla"}</span>
                </a>
                <a
                  href="https://web.ziadah.app/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpenDrop(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 10, textDecoration: "none",
                    background: "#f9fafb",
                    border: "1px solid #e4e4e7",
                  }}
                >
                  <img src={getPlatformLogoSrc("zid", lang as "ar" | "en", theme as "dark" | "light")} alt="Zid" loading="lazy" style={{ height: 18, width: "auto" }} />
                  <span style={{ color: "var(--t)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font)" }}>{lang === "ar" ? "زد" : "Zid"}</span>
                </a>
              </div>
            )}
            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10, paddingTop: 14, borderTop: "1px solid #e4e4e7" }}>
              <button
                type="button"
                onClick={() => { closeMobileMenu(); openMeetingBooking(MEETING_BOOKING_NAV_URL); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  height: 46, borderRadius: 12, cursor: "pointer",
                  background: "transparent", border: "1px solid #e4e4e7",
                  color: "var(--t)", fontFamily: "var(--font)", fontSize: 15, fontWeight: 600,
                }}
              >
                {tr.nav.bookMeeting}
              </button>
              <button
                type="button"
                onClick={() => { closeMobileMenu(); setPlatformModalOpen(true); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  height: 46, borderRadius: 12, cursor: "pointer",
                  background: "#7c3aed", border: "1px solid #7c3aed",
                  color: "#fff", fontFamily: "var(--font)", fontSize: 15, fontWeight: 700,
                }}
              >
                {tr.nav.startNow}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
