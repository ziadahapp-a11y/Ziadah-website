import { useEffect, useState } from "react";
import {
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Mail,
  LifeBuoy,
  Newspaper,
  Calculator,
  Scale,
  Info,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo, navigateToHash } from "@/components/PageTransition";
import PlatformModal from "@/components/PlatformModal";
import { analytics } from "@/lib/analytics";
import { Button, Pill, Shell } from "@/components/mk";
import { useMegaMenu, useDrawer } from "@/components/mk/useMenus";
import { useHeaderScrolled } from "@/motion/components";
import {
  DASHBOARDS,
  PLATFORMS,
  SUPPORT_EMAIL,
  WHATSAPP_SUPPORT_URL,
  sectorEntries,
  solutionGroups,
  type NavLink,
} from "@/lib/nav-data";

/* The site header, on the design system's architecture.

   Desktop: a fixed, fully transparent bar over the hero — one control height
   of 4.2rem, pill nav triggers, and a FLOATING mega panel (max 96rem, 2.4rem
   radius, a 2fr card grid beside a 1fr link column) rather than a full-bleed
   bar. Below 1025 the same information becomes a full-viewport panel with a
   horizontal drill-down track: levels park off-stage and slide in.

   Every destination, label and CTA is the one the previous header carried. */

type MenuKey = "solutions" | "sectors" | "platforms" | "help";

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const tr = siteTranslations[lang];
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const Drill = isAr ? ChevronLeft : ChevronRight;
  const Back = isAr ? ChevronRight : ChevronLeft;

  const headerRef = useHeaderScrolled<HTMLElement>();
  const menu = useMegaMenu();
  const drawer = useDrawer();
  const [drill, setDrill] = useState<MenuKey | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  /* A level parked off-stage is still in the document: without this its rows
     stay in the tab order and a keyboard user lands on invisible controls. */
  const rootTab = drawer.isOpen && !drill ? 0 : -1;
  const subTab = drawer.isOpen && drill ? 0 : -1;

  // Leaving the panel resets it, so re-opening always starts at the root.
  useEffect(() => {
    if (!drawer.isOpen) setDrill(null);
  }, [drawer.isOpen]);

  const closeMenus = () => {
    menu.closeAll();
    drawer.close();
  };

  const go = (path: string) => {
    analytics.navInteraction(path, "route");
    navigateTo(path);
    closeMenus();
  };
  const scrollTo = (id: string) => {
    analytics.navInteraction(`#${id}`, "section");
    navigateToHash(`/#${id}`);
    closeMenus();
  };
  const startNow = () => {
    analytics.ctaClick("nav_start", "platform_modal");
    closeMenus();
    setPlatformModalOpen(true);
  };
  const toggleLang = () => {
    const to = isAr ? "en" : "ar";
    analytics.languageSwitch(lang, to);
    setLang(to);
  };

  const solutions = solutionGroups(tr);
  const sectors = sectorEntries(lang);
  /* Flattened for the mega panel, which shows cards then a "more" column
     rather than the four grouped columns the mobile drill-down keeps.

     A card is a title over a description, so the six that get one are the six
     solutions that HAVE a description — the by-activity and by-presentation
     entries. The page and goal entries are single labels; they read correctly
     as links and would render as half-empty cards. */
  const solutionItems = solutions.flatMap((g) => g.items);
  const solutionCards = solutionItems.filter((i) => i.desc).slice(0, 6);
  const solutionMore = solutionItems.filter((i) => !solutionCards.includes(i));

  const platforms = PLATFORMS.map((p) => ({
    name: tr.nav[p.key],
    href: p.href,
    live: p.live,
  }));

  const helpItems: HelpItem[] = [
    {
      label: t("عن زيادة", "About Ziadah"),
      sub: t("ما هو زيادة، وما ليس", "What Ziadah is, and what it is not"),
      Icon: Info,
      onClick: () => go("/about"),
    },
    {
      label: t("مركز المساعدة", "Support center"),
      sub: t("أدلة وشروحات خطوة بخطوة", "Guides & step-by-step articles"),
      Icon: LifeBuoy,
      onClick: () => go("/support"),
    },
    {
      label: tr.nav.blog,
      sub: tr.nav.blogSub,
      Icon: Newspaper,
      onClick: () => go("/blog"),
    },
    {
      label: tr.nav.faq,
      sub: tr.nav.faqSub,
      Icon: HelpCircle,
      onClick: () => scrollTo("faq"),
    },
    {
      label: tr.nav.comparisonNav,
      sub: t("قارن زيادة بتطبيقات زد وسلة", "Ziadah against the Zid and Salla apps"),
      Icon: Scale,
      onClick: () => go("/zid-apps-comparison"),
    },
    {
      label: t("واتساب", "WhatsApp"),
      sub: t("رد سريع على استفساراتك", "Fast replies to your questions"),
      Icon: MessageCircle,
      href: WHATSAPP_SUPPORT_URL,
    },
    {
      label: t("البريد الإلكتروني", "Email"),
      sub: SUPPORT_EMAIL,
      Icon: Mail,
      href: `mailto:${SUPPORT_EMAIL}`,
    },
    {
      label: tr.nav.calculator,
      sub: t("قدّر أثر زيادة على مبيعاتك", "Estimate what Ziadah does to your sales"),
      Icon: Calculator,
      onClick: () => go("/calculator"),
    },
  ];

  const soon = tr.nav.comingSoon;
  const live = t("متاح", "LIVE");

  const drillLabel: Record<MenuKey, string> = {
    solutions: tr.nav.useCases,
    sectors: tr.nav.sectors,
    platforms: tr.nav.platforms,
    help: tr.nav.help,
  };

  const megaCard = (item: NavLink) => (
    <button key={item.href + item.label} className="mega-card" onClick={() => go(item.href)}>
      <span className="mega-card-title">{item.label}</span>
      {item.desc ? <span className="mega-card-desc">{item.desc}</span> : null}
    </button>
  );

  return (
    <>
      <header className="site-header" ref={headerRef} data-header>
        <Shell className="header-bar">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go("/");
            }}
            className="header-brand"
            data-testid="nav-logo"
            aria-label={t("زيادة — الصفحة الرئيسية", "Ziadah - home")}
          >
            {/* The header is transparent and runs a hit test on whatever is
                painted under it, flipping its ink on a dark ground. The mark
                is a two-tone raster, not a currentColor glyph, so it cannot
                follow — both variants ship and CSS picks by that same state. */}
            <img
              src={isAr ? "/logo-ar.svg" : "/logo-en.svg"}
              alt=""
              aria-hidden="true"
              className="header-logo header-logo--ink"
            />
            <img
              src={isAr ? "/logo-light-ar.png" : "/logo-light.png"}
              alt=""
              aria-hidden="true"
              className="header-logo header-logo--inv"
            />
          </a>

          <nav aria-label={t("التنقل الرئيسي", "Primary")}>
            <ul className="nav-row" data-menu-root {...menu.rootProps}>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    go("/");
                  }}
                  className="nav-trigger"
                >
                  {tr.nav.home}
                </a>
              </li>

              {/* Solutions — WHAT the product does, as a card grid beside a
                  link column. The mobile drill-down keeps the four groups; at
                  this width the groups are noise around twenty-one links. */}
              <li data-menu-item {...menu.itemProps("solutions")}>
                <button className="nav-trigger" data-testid="nav-solutions" {...menu.triggerProps("solutions")}>
                  {tr.nav.useCases}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </button>
                <div {...menu.panelProps("solutions")} role="region" aria-label={drillLabel.solutions}>
                  <div className="mega-cards">{solutionCards.map(megaCard)}</div>
                  <div className="mega-links">
                    <p className="mega-heading">{t("المزيد", "More")}</p>
                    {solutionMore.map((item) => (
                      <button
                        key={item.href + item.label}
                        className="mega-link"
                        onClick={() => go(item.href)}
                      >
                        {item.label}
                      </button>
                    ))}
                    <button className="mega-link" onClick={() => go("/use-cases")}>
                      {t("كل الحلول", "All solutions")}
                    </button>
                  </div>
                </div>
              </li>

              {/* WHO it is for. A first-class destination rather than a footer
                  link: the sector is how a visitor decides whether this is for
                  them, so it gets the same panel anatomy as the solutions menu. */}
              <li data-menu-item {...menu.itemProps("sectors")}>
                <button className="nav-trigger" data-testid="nav-sectors" {...menu.triggerProps("sectors")}>
                  {tr.nav.sectors}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </button>
                <div {...menu.panelProps("sectors")} role="region" aria-label={drillLabel.sectors}>
                  <div className="mega-cards">{sectors.map(megaCard)}</div>
                  <div className="mega-links">
                    <p className="mega-heading">{t("المزيد", "More")}</p>
                    <button className="mega-link" onClick={() => go("/sectors")}>
                      {t("كل القطاعات", "All sectors")}
                    </button>
                    <button className="mega-link" onClick={() => go("/success-stories")}>
                      {tr.nav.successStories}
                    </button>
                  </div>
                </div>
              </li>

              {/* WHERE it runs. */}
              <li data-menu-item {...menu.itemProps("platforms")}>
                <button className="nav-trigger" data-testid="nav-platforms" {...menu.triggerProps("platforms")}>
                  {tr.nav.platforms}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </button>
                <div
                  {...menu.panelProps("platforms", "mega--single")}
                  role="region"
                  aria-label={drillLabel.platforms}
                >
                  <div className="mega-cards">
                    {platforms.map((p) => {
                      const inner = (
                        <span className="mega-card-title">
                          {p.name}
                          <Pill tone={p.live ? "live" : "soon"}>{p.live ? live : soon}</Pill>
                        </span>
                      );
                      return p.live ? (
                        <a
                          key={p.name}
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mega-card"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={p.name} className="mega-card opacity-60 cursor-default">
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mega-links">
                    <p className="mega-heading">{t("تسجيل الدخول", "Log in")}</p>
                    {DASHBOARDS.map((d) => (
                      <a
                        key={d.key}
                        className="mega-link"
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tr.nav[d.key]}
                      </a>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <a
                  href={`/${lang}/pricing`}
                  onClick={(e) => {
                    e.preventDefault();
                    go("/pricing");
                  }}
                  className="nav-trigger"
                >
                  {tr.nav.pricing}
                </a>
              </li>

              <li data-menu-item {...menu.itemProps("help")}>
                <button className="nav-trigger" data-testid="nav-help" {...menu.triggerProps("help")}>
                  {tr.nav.help}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </button>
                <div {...menu.panelProps("help")} role="region" aria-label={drillLabel.help}>
                  <div className="mega-cards">
                    {helpItems.slice(0, 4).map((h) => (
                      <HelpCard key={h.label} item={h} />
                    ))}
                  </div>
                  <div className="mega-links">
                    <p className="mega-heading">{tr.nav.contact}</p>
                    {helpItems.slice(4).map((h) =>
                      h.href ? (
                        <a
                          key={h.label}
                          className="mega-link"
                          href={h.href}
                          target={h.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {h.label}
                        </a>
                      ) : (
                        <button key={h.label} className="mega-link" onClick={h.onClick}>
                          {h.label}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* A flexible spacer absorbs the slack so the button cluster never
              shrinks below its intrinsic width. */}
          <span className="header-spacer" />

          <div className="header-actions">
            <Button
              variant="tertiary"
              size="small"
              className="lang-desktop-only"
              onClick={toggleLang}
              aria-label={t("تغيير اللغة", "Toggle language")}
              data-testid="nav-lang-toggle"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {isAr ? "EN" : "ع"}
            </Button>
            <Button variant="primary" onClick={startNow} data-testid="nav-start">
              {tr.nav.startNow}
            </Button>
            <button
              className="nav-toggle"
              onClick={() => (drawer.isOpen ? drawer.close() : drawer.open())}
              aria-label={drawer.isOpen ? t("إغلاق القائمة", "Close menu") : tr.nav.menu}
              aria-expanded={drawer.isOpen}
              aria-controls="mobile-nav"
            >
              <span className="nav-toggle-inner">
                <span />
                <span />
              </span>
            </button>
          </div>
        </Shell>
      </header>

      {/* A full-viewport panel with a horizontal drill-down track — the root
          list slides out toward the inline start while the sub-panel slides in
          from the inline end. Both levels stay mounted so the transition has
          something to animate. */}
      <div
        id="mobile-nav"
        className={drawer.isOpen ? "mob-nav is-open" : "mob-nav"}
        ref={drawer.drawerRef as React.RefObject<HTMLDivElement>}
        aria-label={t("قائمة الجوال", "Mobile menu")}
      >
        <div className="mob-track">
          <nav
            className={`mob-level${drill ? " mob-level--out" : ""}`}
            aria-label={t("قائمة الجوال", "Mobile")}
            aria-hidden={drill ? true : undefined}
          >
            <button className="mob-row" onClick={() => go("/")} tabIndex={rootTab}>
              {tr.nav.home}
            </button>
            {(["solutions", "sectors", "platforms", "help"] as MenuKey[]).map((k) => (
              <button key={k} className="mob-row" onClick={() => setDrill(k)} tabIndex={rootTab}>
                {drillLabel[k]}
                <Drill aria-hidden="true" />
              </button>
            ))}
            <button className="mob-row" onClick={() => go("/pricing")} tabIndex={rootTab}>
              {tr.nav.pricing}
            </button>
            <button className="mob-row" onClick={() => go("/calculator")} tabIndex={rootTab}>
              {tr.nav.calculator}
            </button>
            <button className="mob-row" onClick={() => go("/success-stories")} tabIndex={rootTab}>
              {tr.nav.successStories}
            </button>
          </nav>

          <nav
            className={`mob-level${drill ? "" : " mob-level--in"}`}
            aria-label={drill ? drillLabel[drill] : undefined}
            aria-hidden={drill ? undefined : true}
          >
            <button className="mob-back" onClick={() => setDrill(null)} tabIndex={subTab}>
              <Back aria-hidden="true" />
              {drill ? drillLabel[drill] : ""}
            </button>

            {/* The four groups survive here, where there is room for them: a
                flat list of twenty-one solutions is unreadable on a phone. */}
            {drill === "solutions" && (
              <>
                {solutions.map((group) => (
                  <div key={group.title}>
                    <p className="mega-heading">{group.title}</p>
                    {group.items.map((item) => (
                      <button
                        key={item.href + item.label}
                        className="mob-row mob-sub"
                        onClick={() => go(item.href)}
                        tabIndex={subTab}
                      >
                        {item.label}
                        {item.desc ? <span className="mob-sub-desc">{item.desc}</span> : null}
                      </button>
                    ))}
                  </div>
                ))}
                <button className="mob-row" onClick={() => go("/use-cases")} tabIndex={subTab}>
                  {t("كل الحلول", "All solutions")}
                </button>
              </>
            )}

            {drill === "sectors" && (
              <>
                {sectors.map((s) => (
                  <button
                    key={s.href}
                    className="mob-row mob-sub"
                    onClick={() => go(s.href)}
                    tabIndex={subTab}
                  >
                    {s.label}
                    {s.desc ? <span className="mob-sub-desc">{s.desc}</span> : null}
                  </button>
                ))}
                <button className="mob-row" onClick={() => go("/sectors")} tabIndex={subTab}>
                  {t("كل القطاعات", "All sectors")}
                </button>
                <button className="mob-row" onClick={() => go("/success-stories")} tabIndex={subTab}>
                  {tr.nav.successStories}
                </button>
              </>
            )}

            {drill === "platforms" && (
              <>
                {platforms.map((p) =>
                  p.live ? (
                    <a
                      key={p.name}
                      className="mob-row mob-sub"
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={drawer.close}
                      tabIndex={subTab}
                    >
                      <span className="truncate">{p.name}</span>
                      <Pill tone="live">{live}</Pill>
                    </a>
                  ) : (
                    <div key={p.name} className="mob-row mob-sub opacity-60">
                      <span className="truncate">{p.name}</span>
                      <Pill tone="soon">{soon}</Pill>
                    </div>
                  ),
                )}
                <p className="mega-heading">{t("تسجيل الدخول", "Log in")}</p>
                {DASHBOARDS.map((d) => (
                  <a
                    key={d.key}
                    className="mob-row mob-sub"
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={drawer.close}
                    tabIndex={subTab}
                  >
                    {tr.nav[d.key]}
                  </a>
                ))}
              </>
            )}

            {drill === "help" &&
              helpItems.map((h) =>
                h.href ? (
                  <a
                    key={h.label}
                    className="mob-row mob-sub"
                    href={h.href}
                    target={h.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={drawer.close}
                    tabIndex={subTab}
                  >
                    <span className="inline-flex items-center gap-3 min-w-0">
                      <h.Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{h.label}</span>
                    </span>
                  </a>
                ) : (
                  <button
                    key={h.label}
                    className="mob-row mob-sub"
                    onClick={h.onClick}
                    tabIndex={subTab}
                  >
                    <span className="inline-flex items-center gap-3 min-w-0">
                      <h.Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{h.label}</span>
                    </span>
                  </button>
                ),
              )}
          </nav>
        </div>

        {/* One row, `align-items: center`, 2.4rem of top padding. The language
            switcher sits here; the primary CTA keeps its button affordance
            beside it rather than becoming a text row. */}
        <div className="mob-foot">
          <Button
            variant="tertiary"
            size="small"
            onClick={toggleLang}
            aria-label={t("تغيير اللغة", "Toggle language")}
            data-testid="nav-lang-toggle-mobile"
            tabIndex={drawer.isOpen ? 0 : -1}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            {isAr ? "EN" : "ع"}
          </Button>
          <Button variant="primary" onClick={startNow} tabIndex={drawer.isOpen ? 0 : -1}>
            {tr.nav.startNow}
            <ArrowCTA className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}

type HelpItem = {
  label: string;
  sub: string;
  Icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
};

function HelpCard({ item }: { item: HelpItem }) {
  const inner = (
    <>
      <span className="mega-card-title">{item.label}</span>
      <span className="mega-card-desc">{item.sub}</span>
    </>
  );
  return item.href ? (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="mega-card"
    >
      {inner}
    </a>
  ) : (
    <button className="mega-card" onClick={item.onClick}>
      {inner}
    </button>
  );
}
