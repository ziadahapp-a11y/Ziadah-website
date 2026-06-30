import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang, useT } from "@/lib/i18n";
import { getFeaturedItems, featureHref } from "@/lib/features-data";
import { ZID_APP_URL } from "@/lib/pricing-data";

type NavLink = { href: string; label: string; testId: string };
type NavGroup = { label: string; testId: string; href: string; dropdown: true };
type NavEntry = NavLink | NavGroup;

const FEATURES_DROPDOWN_PATHS = ["/features", "/power-ups", "/data-enrichment", "/reports"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang } = useLang();
  const t = useT();
  const ArrowCTA = lang === "ar" ? ArrowLeft : ArrowRight;

  const BOOKING_URL = "https://calendar.app.google/PHiuLc9ofgqw4XXk6";
  const bookCall = () =>
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  const activateApp = () =>
    window.open(ZID_APP_URL, "_blank", "noopener,noreferrer");

  const navEntries: NavEntry[] = [
    { href: "/", label: t({ ar: "الرئيسية", en: "Home" }), testId: "home" },
    { href: "/how-it-works", label: t({ ar: "كيف يعمل", en: "How it works" }), testId: "how-it-works" },
    { href: "/integrations", label: t({ ar: "التكاملات", en: "Integrations" }), testId: "integrations" },
    { href: "/pricing", label: t({ ar: "الأسعار", en: "Pricing" }), testId: "pricing" },
    { href: "/#steps", label: t({ ar: "الخطوات", en: "Steps" }), testId: "steps" },
    { href: "/#calculator", label: t({ ar: "الحاسبة", en: "Calculator" }), testId: "calculator" },
  ];

  const featuresActive = FEATURES_DROPDOWN_PATHS.some(
    (p) => location === p || location.startsWith(`${p}/`),
  );

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  // wouter's <Link> pushes the URL but doesn't scroll to the #hash target,
  // so we scroll the element into view manually.
  const handleHashNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const targetPath = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (location === targetPath) {
      e.preventDefault();
      scroll();
    } else {
      // navigating from another page: scroll once the target page renders
      setTimeout(scroll, 150);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group" data-testid="nav-logo">
            <img src="/logo.png" alt="راصد Rasid" className="h-10 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navEntries.map((entry) => {
              if ("dropdown" in entry) {
                return (
                  <div key={entry.testId} className="relative group">
                    <Link
                      href={entry.href}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        featuresActive
                          ? "text-zinc-950 bg-zinc-100"
                          : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70"
                      }`}
                      data-testid="nav-features"
                    >
                      {entry.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </Link>
                    {/* invisible bridge so hover stays open while crossing the gap */}
                    <div className="absolute top-full left-0 h-2 w-full" />
                    <div
                      className="absolute top-full mt-1 ltr:left-0 rtl:right-0 w-[460px] max-w-[92vw] rounded-2xl border border-zinc-200 bg-white shadow-card-lg p-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    >
                      <ul className="grid grid-cols-2 gap-px">
                        {getFeaturedItems().map((f) => (
                          <li key={f.slug}>
                            <Link
                              href={featureHref(f)}
                              className="flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-zinc-50 transition-colors"
                              data-testid={`nav-features-${f.slug}`}
                            >
                              <f.Icon className="w-4 h-4 text-zinc-500 shrink-0" />
                              <span className="text-[13px] text-zinc-800 truncate flex-1">
                                {t(f.title)}
                              </span>
                              {f.dedicatedRoute && (
                                <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200 shrink-0">
                                  DEMO
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-zinc-100 mt-2 pt-1">
                        <Link
                          href="/features"
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-semibold text-zinc-950"
                          data-testid="nav-features-all"
                        >
                          {t({ ar: "كل المميزات", en: "All features" })}
                          <ArrowCTA className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
              const isActive = location === entry.href;
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={(e) => handleHashNav(e, entry.href)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-zinc-950 bg-zinc-100"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70"
                  }`}
                  data-testid={`nav-${entry.testId}`}
                >
                  {entry.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
            aria-label="Toggle language"
            data-testid="nav-lang-toggle"
          >
            <Globe className="w-4 h-4" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <Button
            onClick={bookCall}
            className="bg-zinc-950 text-white hover:bg-zinc-800 font-semibold h-9 px-4 rounded-md transition-colors"
            data-testid="nav-book-call"
          >
            {t({ ar: "احجز مكالمة", en: "Book a call" })}
          </Button>
          <Button
            onClick={activateApp}
            className="border-0 bg-emerald-500 text-white hover:bg-emerald-600 font-semibold h-9 px-4 rounded-md transition-colors"
            data-testid="nav-activate-app"
          >
            {t({ ar: "فعّل التطبيق", en: "Activate app" })}
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-700 border border-zinc-200"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-zinc-950 hover:bg-zinc-100 rounded-md"
            aria-label={t({ ar: "فتح القائمة", en: "Open menu" })}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-zinc-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navEntries.map((entry) => {
              if ("dropdown" in entry) {
                return (
                  <div key={entry.testId}>
                    <button
                      type="button"
                      onClick={() => setMobileFeaturesOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                    >
                      <span>{entry.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileFeaturesOpen && (
                      <div className="ltr:ml-3 rtl:mr-3 mt-1 mb-2 ltr:border-l-2 rtl:border-r-2 border-zinc-100 ltr:pl-3 rtl:pr-3 flex flex-col gap-1">
                        {getFeaturedItems().map((f) => (
                          <Link
                            key={f.slug}
                            href={featureHref(f)}
                            onClick={() => {
                              setOpen(false);
                              setMobileFeaturesOpen(false);
                            }}
                            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-700 hover:bg-zinc-50"
                          >
                            <f.Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <span className="truncate flex-1">{t(f.title)}</span>
                            {f.dedicatedRoute && (
                              <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200 shrink-0">
                                DEMO
                              </span>
                            )}
                          </Link>
                        ))}
                        <Link
                          href="/features"
                          onClick={() => {
                            setOpen(false);
                            setMobileFeaturesOpen(false);
                          }}
                          className="flex items-center justify-between px-2 py-2.5 mt-1 rounded-md text-sm font-semibold text-zinc-950 hover:bg-zinc-50 border-t border-zinc-100"
                        >
                          {t({ ar: "كل المميزات", en: "All features" })}
                          <ArrowCTA className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={(e) => {
                    setOpen(false);
                    handleHashNav(e, entry.href);
                  }}
                  className="px-3 py-2.5 rounded-md text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                >
                  {entry.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-zinc-200">
              <Button
                onClick={() => {
                  setOpen(false);
                  bookCall();
                }}
                className="bg-zinc-950 text-white hover:bg-zinc-800 font-semibold"
                data-testid="nav-book-call-mobile"
              >
                {t({ ar: "احجز مكالمة", en: "Book a call" })}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  activateApp();
                }}
                className="border-0 bg-emerald-500 text-white hover:bg-emerald-600 font-semibold"
                data-testid="nav-activate-app-mobile"
              >
                {t({ ar: "فعّل التطبيق", en: "Activate app" })}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
