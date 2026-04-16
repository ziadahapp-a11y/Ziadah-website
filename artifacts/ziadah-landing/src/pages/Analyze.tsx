import { useState, useEffect, useRef } from "react";
import {
  Zap,
  CheckCircle2,
  Circle,
  Loader2,
  ArrowRight,
  TrendingUp,
  ShoppingCart,
  Package,
  Star,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Sparkles,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  Globe,
  BarChart3,
  Users,
  Target,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import { getApiSubmitOrigin } from "@/lib/apiSubmitOrigin";
import PlatformModal from "@/components/PlatformModal";
import {
  pickSuccessStoriesForIndustry,
  storyEn,
  type StoryData,
} from "@/data/successStoriesData";
import { estimateAnalyzeOpportunity } from "@/lib/analyzeValueEstimate";

const INDUSTRIES = [
  { value: "fashion", label: "Fashion & Apparel — موضة وملابس" },
  { value: "electronics", label: "Electronics — إلكترونيات" },
  { value: "beauty", label: "Beauty & Personal Care — جمال وعناية" },
  { value: "home", label: "Home & Garden — منزل وحديقة" },
  { value: "food", label: "Food & Beverage — طعام ومشروبات" },
  { value: "sports", label: "Sports & Outdoors — رياضة" },
  { value: "health", label: "Health & Wellness — صحة ولياقة" },
  { value: "toys", label: "Toys & Games — ألعاب" },
  { value: "jewelry", label: "Jewelry & Accessories — مجوهرات" },
  { value: "automotive", label: "Automotive — سيارات" },
  { value: "other", label: "Other — أخرى" },
];

type Step = "idle" | "syncing" | "analyzing" | "analyzed" | "error";

interface ProductRef {
  productId: number;
  title: string;
  imageUrl: string | null;
  price: number | null;
  productUrl: string | null;
}

interface RecProduct extends ProductRef {
  role: string;
  reason: string;
  ziadahGoal?: string;
  presentationWidget?: string;
  addonsHint?: string;
  quantityHint?: string;
}

interface AnchorGroup {
  anchor: ProductRef & {
    reason: string;
    anchorGoal?: string;
    anchorPresentation?: string;
  };
  recommendations: RecProduct[];
}

interface StatusResponse {
  storeId: number;
  status: string;
  platform: string | null;
  productCount: number;
  industry: string | null;
  currency: string;
  currencySymbol: string;
  /** Present when status is "error"; explains scrape or AI failure */
  errorMessage?: string | null;
  monthlyUsers?: number | null;
  conversionRate?: number | null;
  avgOrderValue?: number | null;
  analyzedAt?: string;
  summary?: string;
  crossSellCount?: number;
  upsellCount?: number;
  anchorGroups?: AnchorGroup[];
}

function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : "",
  );
}

const isAr = (s?: string | null) => (s ? /[\u0600-\u06FF]/.test(s) : false);

function formatPrice(price: number | null | undefined, symbol: string): string {
  if (price == null) return "";
  return `${price.toLocaleString("en-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${symbol}`;
}

function RolePill({ role }: { role: string }) {
  const { lang } = useLanguage();
  const siteT = useSiteT();
  const tr = siteT[lang].analyze;
  if (role === "cross_sell")
    return (
      <span className="analyze-pill analyze-pill--cross inline-flex items-center gap-1 text-[11px] font-bold">
        <ShoppingCart className="h-3 w-3 shrink-0" aria-hidden />
        {tr.roleCrossSell}
      </span>
    );
  return (
    <span className="analyze-pill analyze-pill--up inline-flex items-center gap-1 text-[11px] font-bold">
      <TrendingUp className="h-3 w-3 shrink-0" aria-hidden />
      {tr.roleUpsell}
    </span>
  );
}

type AnalyzeCopy = {
  widgetPreviewBadge: string;
  recGoalLabel: string;
  recAddonsLabel: string;
  recQuantityLabel: string;
  anchorGoalLabel: string;
  anchorPresentationLabel: string;
};

function WidgetRecCard({
  rec,
  currencySymbol,
  tr,
}: {
  rec: RecProduct;
  currencySymbol: string;
  tr: AnalyzeCopy;
}) {
  const inner = (
    <div className="group analyze-widget-use-case flex flex-col h-full min-h-0 rounded-[var(--r12)] overflow-hidden border border-[var(--b2)] bg-[var(--s1)] shadow-sm">
      <div
        className="flex items-center justify-between gap-2 px-2 py-1.5 border-b text-[10px]"
        style={{ borderColor: "var(--b2)", background: "var(--s2)" }}
      >
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: "var(--p3)" }}>
          <LayoutGrid className="h-3 w-3 shrink-0" aria-hidden />
          {tr.widgetPreviewBadge}
        </span>
        {rec.presentationWidget ? (
          <span className="line-clamp-1 font-medium" style={{ color: "var(--tm)" }} dir={isAr(rec.presentationWidget) ? "rtl" : "ltr"}>
            {rec.presentationWidget}
          </span>
        ) : null}
      </div>
      <div className="group analyze-product-card flex flex-col flex-1 min-h-0 cursor-pointer">
        <div className="relative h-24 overflow-hidden bg-[var(--s2)] flex-shrink-0">
          {rec.imageUrl ? (
            <img
              src={rec.imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-6 w-6 text-[var(--text-4)]" aria-hidden />
            </div>
          )}
          <div className="absolute top-1.5 start-1.5">
            <RolePill role={rec.role} />
          </div>
        </div>
        <div className="p-2 flex flex-col gap-1 flex-1 min-h-0">
          <p
            className="text-[11px] font-semibold leading-snug line-clamp-2"
            style={{ color: "var(--t)" }}
            dir={isAr(rec.title) ? "rtl" : "ltr"}
          >
            {rec.title}
          </p>
          {rec.price != null && (
            <p className="font-bold text-xs" style={{ color: "var(--p3)" }}>
              {formatPrice(rec.price, currencySymbol)}
            </p>
          )}
          {rec.reason && (
            <p
              className="text-[9px] leading-snug line-clamp-2"
              style={{ color: "var(--tm)" }}
              dir={isAr(rec.reason) ? "rtl" : "ltr"}
            >
              {rec.reason}
            </p>
          )}
          {(rec.ziadahGoal || rec.addonsHint || rec.quantityHint) && (
            <div className="mt-auto pt-1.5 space-y-1 border-t border-[var(--b2)]">
              {rec.ziadahGoal ? (
                <p className="text-[9px] leading-snug" style={{ color: "var(--tm)" }} dir={isAr(rec.ziadahGoal) ? "rtl" : "ltr"}>
                  <span className="font-bold text-[var(--p3)]">{tr.recGoalLabel}: </span>
                  {rec.ziadahGoal}
                </p>
              ) : null}
              {rec.addonsHint ? (
                <p className="text-[9px] leading-snug line-clamp-2" style={{ color: "var(--tm)" }} dir={isAr(rec.addonsHint) ? "rtl" : "ltr"}>
                  <span className="font-bold">{tr.recAddonsLabel}: </span>
                  {rec.addonsHint}
                </p>
              ) : null}
              {rec.quantityHint ? (
                <p className="text-[9px] leading-snug line-clamp-2" style={{ color: "var(--tm)" }} dir={isAr(rec.quantityHint) ? "rtl" : "ltr"}>
                  <span className="font-bold">{tr.recQuantityLabel}: </span>
                  {rec.quantityHint}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return rec.productUrl ? (
    <a
      href={rec.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col h-full min-h-0 rounded-[var(--r12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p)]"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

function AnalyzeStoreWidget({
  group,
  currencySymbol,
  anchorLabel,
  lang,
}: {
  group: AnchorGroup;
  currencySymbol: string;
  anchorLabel: string;
  lang: string;
}) {
  const anchor = group.anchor;
  const recs = group.recommendations.slice(0, 3);
  let hostname = "yourstore.com";
  try {
    if (anchor.productUrl) hostname = new URL(anchor.productUrl).hostname;
  } catch {}
  const isArabic = lang === "ar";
  return (
    <div className="analyze-widget-frame">
      {/* Browser chrome */}
      <div className="analyze-widget-chrome">
        <div className="analyze-widget-chrome-dots">
          <span className="analyze-widget-chrome-dot" />
          <span className="analyze-widget-chrome-dot" />
          <span className="analyze-widget-chrome-dot" />
        </div>
        <div className="flex-1 text-center text-[9px] truncate font-mono" style={{ color: "var(--tm)" }}>
          {hostname}
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold shrink-0" style={{ color: "var(--p3)" }}>
          <LayoutGrid className="h-2.5 w-2.5" aria-hidden />
          Ziadah
        </span>
      </div>

      {/* Current product row (anchor) */}
      <div className="analyze-widget-product-section">
        <div className="analyze-widget-product-img">
          {anchor.imageUrl ? (
            <img src={anchor.imageUrl} alt="" />
          ) : (
            <Package className="h-5 w-5" style={{ color: "var(--tm)" }} aria-hidden />
          )}
        </div>
        <div className="min-w-0">
          <span
            className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1"
            style={{ background: "var(--go)", color: "#1a0f00" }}
          >
            <Star className="h-2 w-2 shrink-0" aria-hidden />
            {anchorLabel}
          </span>
          <p
            className="text-[10px] font-bold leading-snug line-clamp-2"
            style={{ color: "var(--t)" }}
            dir={isAr(anchor.title) ? "rtl" : "ltr"}
          >
            {anchor.title}
          </p>
          {anchor.price != null && (
            <p className="text-[11px] font-extrabold mt-0.5" style={{ color: "var(--go)" }}>
              {formatPrice(anchor.price, currencySymbol)}
            </p>
          )}
        </div>
      </div>

      {/* Recommendations widget panel */}
      <div className="analyze-widget-rec-panel">
        <div className="analyze-widget-rec-header">
          <LayoutGrid className="h-2.5 w-2.5 shrink-0" aria-hidden />
          {isArabic ? "زيادة — توصيات ذكية" : "Ziadah — Smart Recs"}
        </div>
        {recs.map((rec, i) => (
          <div key={i} className="analyze-widget-rec-row">
            <div className="analyze-widget-rec-img">
              {rec.imageUrl ? (
                <img src={rec.imageUrl} alt="" />
              ) : (
                <Package className="h-3 w-3" style={{ color: "var(--tm)" }} aria-hidden />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] font-semibold leading-snug line-clamp-1"
                style={{ color: "var(--t)" }}
                dir={isAr(rec.title) ? "rtl" : "ltr"}
              >
                {rec.title}
              </p>
              {rec.price != null && (
                <p className="text-[10px] font-extrabold" style={{ color: "var(--p3)" }}>
                  {formatPrice(rec.price, currencySymbol)}
                </p>
              )}
            </div>
            <RolePill role={rec.role} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnchorGroupCard({
  group,
  currencySymbol,
  index,
  anchorLabel,
  tr,
  lang,
}: {
  group: AnchorGroup;
  currencySymbol: string;
  index: number;
  anchorLabel: string;
  tr: AnalyzeCopy;
  lang: string;
}) {
  const anchor = group.anchor;
  const crossCount = group.recommendations.filter((r) => r.role === "cross_sell").length;
  const upCount = group.recommendations.filter((r) => r.role === "upsell").length;

  return (
    <div className="analyze-anchor-group-card">
      {/* Header */}
      <div className="analyze-anchor-group-header">
        <span className="analyze-anchor-group-index" aria-label={anchorLabel}>
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-bold leading-snug line-clamp-2"
            style={{ color: "var(--t)" }}
            dir={isAr(anchor.title) ? "rtl" : "ltr"}
          >
            {anchor.title}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {anchor.price != null && (
              <span className="text-xs font-extrabold" style={{ color: "var(--go)" }}>
                {formatPrice(anchor.price, currencySymbol)}
              </span>
            )}
            {crossCount > 0 && (
              <span className="analyze-pill analyze-pill--cross inline-flex items-center gap-1 text-[10px]">
                <ShoppingCart className="h-2.5 w-2.5 shrink-0" aria-hidden />
                {crossCount} {lang === "ar" ? "متقاطع" : "cross-sell"}
              </span>
            )}
            {upCount > 0 && (
              <span className="analyze-pill analyze-pill--up inline-flex items-center gap-1 text-[10px]">
                <TrendingUp className="h-2.5 w-2.5 shrink-0" aria-hidden />
                {upCount} {lang === "ar" ? "ترقيعي" : "upsell"}
              </span>
            )}
          </div>
        </div>
        {anchor.productUrl && (
          <a
            href={anchor.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all hover:underline"
            style={{ color: "var(--p3)", borderColor: "rgba(124,58,237,.25)", background: "rgba(124,58,237,.06)" }}
            aria-label="open product"
          >
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
          </a>
        )}
      </div>

      {/* 2-col: Left = anchor product details / Right = widget frame */}
      <div className="analyze-anchor-group-inner">
        {/* Left: Anchor product info */}
        <div className="analyze-anchor-product-col">
          <div className="analyze-anchor-product-hero">
            <div className="analyze-anchor-product-img">
              {anchor.imageUrl ? (
                <img src={anchor.imageUrl} alt="" />
              ) : (
                <Package className="h-7 w-7" style={{ color: "var(--tm)" }} aria-hidden />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                style={{ background: "rgba(251,191,36,.15)", color: "var(--go)", border: "1px solid rgba(251,191,36,.25)" }}
              >
                <Star className="h-2.5 w-2.5 shrink-0" aria-hidden />
                {anchorLabel}
              </span>
              {anchor.reason && (
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "var(--tm)" }}
                  dir={isAr(anchor.reason) ? "rtl" : "ltr"}
                >
                  {anchor.reason}
                </p>
              )}
            </div>
          </div>
          {(anchor.anchorGoal || anchor.anchorPresentation) && (
            <div className="analyze-anchor-goals-box space-y-2">
              {anchor.anchorGoal && (
                <p className="text-[11px] leading-snug" dir={isAr(anchor.anchorGoal) ? "rtl" : "ltr"}>
                  <span className="font-bold text-[var(--p3)]">{tr.anchorGoalLabel}: </span>
                  <span style={{ color: "var(--t)" }}>{anchor.anchorGoal}</span>
                </p>
              )}
              {anchor.anchorPresentation && (
                <p className="text-[11px] leading-snug" dir={isAr(anchor.anchorPresentation) ? "rtl" : "ltr"}>
                  <span className="font-bold" style={{ color: "var(--tm)" }}>{tr.anchorPresentationLabel}: </span>
                  <span style={{ color: "var(--tm)" }}>{anchor.anchorPresentation}</span>
                </p>
              )}
            </div>
          )}
          {/* Show remaining recs (beyond the 3 shown in widget) */}
          {group.recommendations.length > 3 && (
            <div className="space-y-2">
              {group.recommendations.slice(3).map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--b1)", background: "var(--s2)" }}
                >
                  {rec.imageUrl ? (
                    <img
                      src={rec.imageUrl}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--s1)" }}
                    >
                      <Package className="h-4 w-4" style={{ color: "var(--tm)" }} aria-hidden />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[11px] font-semibold line-clamp-1"
                      style={{ color: "var(--t)" }}
                      dir={isAr(rec.title) ? "rtl" : "ltr"}
                    >
                      {rec.title}
                    </p>
                    {rec.price != null && (
                      <p className="text-[10px] font-bold" style={{ color: "var(--p3)" }}>
                        {formatPrice(rec.price, currencySymbol)}
                      </p>
                    )}
                  </div>
                  <RolePill role={rec.role} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Widget frame (store widget preview) */}
        <AnalyzeStoreWidget
          group={group}
          currencySymbol={currencySymbol}
          anchorLabel={anchorLabel}
          lang={lang}
        />
      </div>
    </div>
  );
}

function AnalyzeBreadcrumb({ home, current }: { home: string; current: string }) {
  return (
    <nav className="analyze-breadcrumb" aria-label={current}>
      <Link href="/" className="analyze-breadcrumb__a">
        {home}
      </Link>
      <ChevronRight className="analyze-breadcrumb__sep" aria-hidden />
      <span className="analyze-breadcrumb__current">{current}</span>
    </nav>
  );
}

function AnalyzeJumpNav({
  tr,
  showSummary,
  showAnchors,
}: {
  tr: {
    resultNavLabel: string;
    resultNavSummary: string;
    resultNavValue: string;
    resultNavAnchors: string;
    resultNavShare: string;
  };
  showSummary: boolean;
  showAnchors: boolean;
}) {
  return (
    <nav className="analyze-jump-nav" aria-label={tr.resultNavLabel}>
      <span className="analyze-jump-nav__label">{tr.resultNavLabel}</span>
      <div className="analyze-jump-nav__track">
        {showSummary ? (
          <a href="#analyze-summary" className="analyze-jump-nav__a">
            {tr.resultNavSummary}
          </a>
        ) : null}
        <a href="#analyze-value" className="analyze-jump-nav__a">
          {tr.resultNavValue}
        </a>
        {showAnchors ? (
          <a href="#analyze-anchors" className="analyze-jump-nav__a">
            {tr.resultNavAnchors}
          </a>
        ) : null}
        <a href="#analyze-share" className="analyze-jump-nav__a">
          {tr.resultNavShare}
        </a>
      </div>
    </nav>
  );
}

function ProgressStep({
  label,
  sublabel,
  state,
}: {
  label: string;
  sublabel?: string;
  state: "waiting" | "active" | "done";
}) {
  return (
    <div
      className={`flex items-start gap-4 transition-all duration-500 ${
        state === "waiting" ? "opacity-45" : "opacity-100"
      }`}
    >
      <div
        className="mt-0.5 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-all"
        style={{
          background:
            state === "done"
              ? "rgba(34,197,94,.14)"
              : state === "active"
                ? "rgba(124,58,237,.16)"
                : "var(--s2)",
          color:
            state === "done"
              ? "var(--gr)"
              : state === "active"
                ? "var(--p3)"
                : "var(--tm)",
        }}
        aria-hidden
      >
        {state === "done" ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : state === "active" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Circle className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: state === "active" ? "var(--t)" : "var(--tm)" }}
        >
          {label}
        </p>
        {sublabel && (
          <p className="text-xs mt-0.5" style={{ color: "var(--tm)" }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

const MEETING_CALENDAR_URL = "https://calendar.app.google/a3b18uRcuhHijZ8y5";

function AnalyzeSuccessStoryCard({
  story,
  isArLocale,
}: {
  story: StoryData;
  isArLocale: boolean;
}) {
  const en = storyEn[story.store];
  return (
    <article
      className="rounded-xl border overflow-hidden flex flex-col h-full min-h-[140px]"
      style={{ borderColor: "var(--b2)", background: "var(--s1)" }}
    >
      <div className="h-1.5 shrink-0" style={{ background: story.color }} aria-hidden />
      <div className="p-3 flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-xs font-bold line-clamp-1" style={{ color: "var(--t)" }}>
          {isArLocale ? story.store : en?.store ?? story.store}
        </p>
        <p
          className="text-[10px] leading-snug line-clamp-3"
          style={{ color: "var(--tm)" }}
          dir={isArLocale ? "rtl" : "ltr"}
        >
          {isArLocale ? story.strategy : en?.strategy ?? story.strategy}
        </p>
        <div className="mt-auto flex justify-between gap-2 text-[10px] font-semibold pt-1" style={{ color: "var(--p3)" }}>
          <span>{story.conversions}</span>
          <span>
            {story.sales} {isArLocale ? "ر.س" : "SAR"}
          </span>
        </div>
      </div>
    </article>
  );
}

function CopyReportButton({ storeId }: { storeId: number }) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const siteT = useSiteT();
  const tr = siteT[lang].analyze;
  const base = window.location.origin + (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const url = `${base}/report/${storeId}`;
  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap items-stretch sm:items-center">
      <Link
        href={`/report/${storeId}`}
        className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[44px] px-5 no-underline text-sm"
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        {tr.viewFullReport}
      </Link>
      <button
        type="button"
        onClick={copy}
        className="btn-g inline-flex items-center justify-center gap-2 min-h-[44px] px-5 text-sm"
      >
        {copied ? <Check className="h-4 w-4 text-[var(--gr)]" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copied ? tr.copied : tr.copyReportLink}
      </button>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-g inline-flex items-center justify-center gap-2 min-h-[44px] px-5 text-sm"
      >
        {tr.analyzeAnother}
      </button>
    </div>
  );
}

export default function Analyze() {
  const siteT = useSiteT();
  const { lang } = useLanguage();
  const tr = siteT[lang].analyze;
  const pk = getPageKeywords("/analyze");
  const apiBase = getApiSubmitOrigin();

  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [monthlyUsers, setMonthlyUsers] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [avgOrderValue, setAvgOrderValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [retryBusy, setRetryBusy] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const previewId = new URLSearchParams(window.location.search).get("preview");
    if (previewId) {
      const id = parseInt(previewId, 10);
      setStoreId(id);
      fetch(`${apiBase}/api/submit/${id}/status`)
        .then((r) => r.json())
        .then((data: StatusResponse) => {
          setStatus(data);
          setStep("analyzed");
        })
        .catch(() => {});
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [apiBase]);

  async function pollStatus(id: number) {
    try {
      const res = await fetch(`${apiBase}/api/submit/${id}/status`);
      if (!res.ok) return;
      const data: StatusResponse = await res.json();
      setStatus(data);
      if (data.status === "syncing" || data.status === "pending") setStep("syncing");
      else if (data.status === "analyzing") setStep("analyzing");
      else if (data.status === "analyzed") {
        setStep("analyzed");
        if (pollRef.current) clearInterval(pollRef.current);
      } else if (data.status === "error") {
        setStep("error");
        if (pollRef.current) clearInterval(pollRef.current);
      }
    } catch {
      /* keep polling */
    }
  }

  async function handleRetryPipeline() {
    if (storeId == null) return;
    setRetryBusy(true);
    setFormError(null);
    try {
      const res = await fetch(`${apiBase}/api/submit/${storeId}/retry`, { method: "POST" });
      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = text ? (JSON.parse(text) as { ok?: boolean; error?: string }) : {};
      } catch {
        setFormError(tr.formErrorNetwork);
        return;
      }
      if (!res.ok) {
        setFormError(typeof data.error === "string" ? data.error : tr.errGeneric);
        return;
      }
      setStep("syncing");
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(() => {
        if (storeId != null) pollStatus(storeId);
      }, 2500);
      void pollStatus(storeId);
    } catch {
      setFormError(tr.formErrorNetwork);
    } finally {
      setRetryBusy(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!url.trim()) {
      setFormError(tr.errUrlRequired);
      return;
    }
    if (!industry) {
      setFormError(tr.errIndustryRequired);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          industry,
          monthlyUsers: monthlyUsers ? parseInt(monthlyUsers, 10) : null,
          conversionRate: conversionRate ? parseFloat(conversionRate) : null,
          avgOrderValue: avgOrderValue ? parseFloat(avgOrderValue) : null,
        }),
      });
      const text = await res.text();
      let data: { error?: string; storeId?: number } = {};
      try {
        data = text ? (JSON.parse(text) as { error?: string; storeId?: number }) : {};
      } catch {
        setFormError(tr.formErrorNetwork);
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setFormError(typeof data.error === "string" ? data.error : tr.errGeneric);
        setSubmitting(false);
        return;
      }
      if (typeof data.storeId !== "number") {
        setFormError(tr.formErrorNetwork);
        setSubmitting(false);
        return;
      }

      const newStoreId = data.storeId;
      setStoreId(newStoreId);
      setStep("syncing");
      setSubmitting(false);
      pollRef.current = setInterval(() => pollStatus(newStoreId), 3000);
      pollStatus(newStoreId);
    } catch {
      setFormError(tr.formErrorNetwork);
      setSubmitting(false);
    }
  }

  const s1 =
    step === "syncing"
      ? "active"
      : ["analyzing", "analyzed"].includes(step)
        ? "done"
        : "waiting";
  const s2 = step === "analyzing" ? "active" : step === "analyzed" ? "done" : "waiting";
  const s3 = step === "analyzed" ? "done" : "waiting";

  const platformName = status?.platform
    ? status.platform.charAt(0).toUpperCase() + status.platform.slice(1)
    : "";

  const step1Sub =
    status?.productCount && status.productCount > 0
      ? tpl(tr.step1SubCount, { count: status.productCount })
      : tr.step1SubSync;

  return (
    <>
      <SEO
        titleAr={siteT.ar.analyze.seoTitle}
        titleEn={siteT.en.analyze.seoTitle}
        descriptionAr={siteT.ar.analyze.seoDesc}
        descriptionEn={siteT.en.analyze.seoDesc}
        canonical="/analyze"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbAnalyze, url: "/analyze" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? siteT.ar.analyze.seoTitle : siteT.en.analyze.seoTitle}
        description={lang === "ar" ? siteT.ar.analyze.seoDesc : siteT.en.analyze.seoDesc}
        url="/analyze"
      />
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />

        <main className="analyze-page-main analyze-page">
          <AnalyzeBreadcrumb home={tr.breadcrumbHome} current={tr.breadcrumbAnalyze} />

          {step === "idle" && (
            <>
              <header className="analyze-hero text-center">
                <div className="hbadge">
                  <span className="hbadge-pill">{tr.heroBadgePill}</span>
                  <span className="hbadge-txt">{tr.heroBadgeText}</span>
                </div>
                <h1 className="ht tc font-semibold">
                  {tr.heroTitleMain ? (
                    <span className="ht-line1 font-thin block">{tr.heroTitleMain}</span>
                  ) : null}
                  <span className="grad font-extrabold hero-title-grad analyze-hero-accent block">
                    {tr.heroAccent}
                  </span>
                  {tr.heroTitleRest ? (
                    <span className="block font-semibold mt-1" style={{ color: "var(--t)" }}>
                      {tr.heroTitleRest}
                    </span>
                  ) : null}
                </h1>
                <p className="ssub tc max-w-xl" style={{ marginInline: "auto" }}>
                  {tr.heroSubtitle}
                </p>
                <div className="analyze-hero-trust">
                  <span className="analyze-hero-trust-item">
                    <BarChart3 style={{ width: 13, height: 13 }} aria-hidden />
                    {lang === "ar" ? "تحليل بالذكاء الاصطناعي" : "AI Analysis"}
                  </span>
                  <span className="analyze-hero-trust-item">
                    <Target style={{ width: 13, height: 13 }} aria-hidden />
                    {lang === "ar" ? "توصيات ذكية" : "Smart Recommendations"}
                  </span>
                  <span className="analyze-hero-trust-item">
                    <Lock style={{ width: 13, height: 13 }} aria-hidden />
                    {lang === "ar" ? "بدون تسجيل دخول" : "No Login Required"}
                  </span>
                  <span className="analyze-hero-trust-item">
                    <Zap style={{ width: 13, height: 13 }} aria-hidden />
                    {lang === "ar" ? "نتائج خلال 30 ثانية" : "Results in ~30s"}
                  </span>
                </div>
              </header>

              <div className="stag rv on mx-auto mb-3 max-w-xl justify-center">
                <span className="stag-dot" aria-hidden />
                <span className="uppercase tracking-[0.1em] text-[11px] font-bold">{tr.howItWorksTag}</span>
              </div>
              <ol className="analyze-how-steps" aria-label={tr.howItWorksTag}>
                <li>
                  <span className="analyze-how-num" aria-hidden>1</span>
                  <p>{tr.howStep1}</p>
                  {/* Visual: URL input mockup */}
                  <div className="analyze-how-visual">
                    <div className="analyze-how-visual-url">
                      <Globe className="h-3 w-3 shrink-0" style={{ color: "var(--p3)" }} aria-hidden />
                      <span style={{ color: "var(--tm)" }}>https://yourstore.com</span>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="analyze-how-num" aria-hidden>2</span>
                  <p>{tr.howStep2}</p>
                  {/* Visual: Product scan grid */}
                  <div className="analyze-how-visual">
                    <div className="analyze-how-scan-grid">
                      {(["👗","👟","👜","🧴","⌚","📱"] as const).map((emoji, i) => (
                        <div
                          key={i}
                          className="analyze-how-scan-item"
                          style={{ animationDelay: `${i * 0.13}s` }}
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <span className="analyze-how-num" aria-hidden>3</span>
                  <p>{tr.howStep3}</p>
                  {/* Visual: Mini widget preview */}
                  <div className="analyze-how-visual">
                    <div className="analyze-how-widget-mini">
                      <div className="analyze-how-widget-mini-bar">
                        <LayoutGrid className="h-2.5 w-2.5 shrink-0" aria-hidden />
                        {lang === "ar" ? "زيادة — توصيات" : "Ziadah Recs"}
                      </div>
                      <div className="analyze-how-widget-mini-row">
                        <div className="analyze-how-widget-mini-img" style={{ background: "rgba(6,182,212,.15)" }}>🧴</div>
                        <div>
                          <div className="analyze-how-widget-mini-name">{lang === "ar" ? "سيروم فيتامين C" : "Vitamin C Serum"}</div>
                          <div className="analyze-how-widget-mini-price" style={{ color: "var(--c)" }}>
                            {lang === "ar" ? "↕ بيع متقاطع" : "↕ Cross-sell"}
                          </div>
                        </div>
                      </div>
                      <div className="analyze-how-widget-mini-row">
                        <div className="analyze-how-widget-mini-img" style={{ background: "rgba(124,58,237,.15)" }}>⌚</div>
                        <div>
                          <div className="analyze-how-widget-mini-name">{lang === "ar" ? "ساعة ذكية برو" : "Smart Watch Pro"}</div>
                          <div className="analyze-how-widget-mini-price" style={{ color: "var(--p4)" }}>
                            {lang === "ar" ? "↑ بيع ترقيعي" : "↑ Upsell"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>

              <div className="max-w-xl mx-auto">
                <div className="gc gc-lift analyze-form-card">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="analyze-form-section-title">{tr.formSectionPrimaryTitle}</p>
                    <div>
                      <Label htmlFor="url" className="text-sm font-semibold mb-1.5 block" style={{ color: "var(--t)" }}>
                        {tr.storeUrlLabel} <span style={{ color: "var(--pk)" }} aria-hidden>*</span>
                      </Label>
                      <div className="relative">
                        <Globe
                          className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4"
                          style={{ color: "var(--tm)", insetInlineStart: "12px" }}
                          aria-hidden
                        />
                        <Input
                          id="url"
                          type="url"
                          placeholder={tr.phStoreUrl}
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="h-11 border-[var(--b2)] bg-[var(--s1)] analyze-input-focus"
                          style={{ paddingInlineStart: "36px" }}
                          required
                          autoComplete="url"
                          inputMode="url"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="industry-select" className="text-sm font-semibold mb-1.5 block" style={{ color: "var(--t)" }}>
                        {tr.industryLabel} <span style={{ color: "var(--pk)" }} aria-hidden>*</span>
                      </Label>
                      <Select value={industry || undefined} onValueChange={setIndustry}>
                        <SelectTrigger
                          id="industry-select"
                          className="h-11 w-full border-[var(--b2)] bg-[var(--s1)] analyze-input-focus"
                        >
                          <SelectValue placeholder={tr.industryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind.value} value={ind.value}>
                              {ind.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <details className="analyze-optional-details">
                      <summary>
                        <span>{tr.optionalDetailsSummary}</span>
                        <ChevronDown className="analyze-opt-chevron h-4 w-4" aria-hidden />
                      </summary>
                      <div className="analyze-opt-body">
                        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--tm)" }}>
                          {tr.optionalSectionTitle}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="monthlyUsers" className="text-xs font-medium mb-1.5 block" style={{ color: "var(--tm)" }}>
                              {tr.monthlyVisitors}
                            </Label>
                            <Input
                              id="monthlyUsers"
                              type="number"
                              min={0}
                              placeholder={tr.phMonthlyUsers}
                              value={monthlyUsers}
                              onChange={(e) => setMonthlyUsers(e.target.value)}
                              className="h-11 text-sm border-[var(--b2)] bg-[var(--s1)] analyze-input-focus"
                            />
                          </div>
                          <div>
                            <Label htmlFor="conversionRate" className="text-xs font-medium mb-1.5 block" style={{ color: "var(--tm)" }}>
                              {tr.convRate}
                            </Label>
                            <Input
                              id="conversionRate"
                              type="number"
                              min={0}
                              max={100}
                              step="0.1"
                              placeholder={tr.phConv}
                              value={conversionRate}
                              onChange={(e) => setConversionRate(e.target.value)}
                              className="h-11 text-sm border-[var(--b2)] bg-[var(--s1)] analyze-input-focus"
                            />
                          </div>
                          <div>
                            <Label htmlFor="avgOrderValue" className="text-xs font-medium mb-1.5 block" style={{ color: "var(--tm)" }}>
                              {tr.avgOrderSar}
                            </Label>
                            <Input
                              id="avgOrderValue"
                              type="number"
                              min={0}
                              placeholder={tr.phAov}
                              value={avgOrderValue}
                              onChange={(e) => setAvgOrderValue(e.target.value)}
                              className="h-11 text-sm border-[var(--b2)] bg-[var(--s1)] analyze-input-focus"
                            />
                          </div>
                        </div>
                      </div>
                    </details>

                    {formError && (
                      <div
                        className="text-sm px-4 py-3 rounded-[var(--r12)] border"
                        style={{
                          background: "rgba(239,68,68,.08)",
                          borderColor: "rgba(239,68,68,.25)",
                          color: "var(--t)",
                        }}
                        role="alert"
                      >
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-p btn-p-hero w-full !justify-center inline-flex items-center gap-2 text-sm min-h-[48px]"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
                          {tr.submitting}
                        </>
                      ) : (
                        <>
                          {tr.submitAnalyze}
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                        </>
                      )}
                    </button>
                  </form>
                </div>
                <p className="text-center text-xs mt-5 leading-relaxed" style={{ color: "var(--tm)" }}>
                  {tr.formFooterNote}
                </p>
              </div>
            </>
          )}

          {(step === "syncing" || step === "analyzing") && (
            <div className="max-w-md mx-auto" role="status" aria-live="polite" aria-busy="true">
              <div className="text-center mb-10">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_12px_40px_rgba(124,58,237,.2)]"
                  style={{ background: "rgba(124,58,237,.12)" }}
                >
                  <Loader2 className="h-7 w-7 animate-spin" style={{ color: "var(--p3)" }} aria-hidden />
                </div>
                <h2 className="st tc mb-1" style={{ color: "var(--t)" }}>
                  {tr.progressTitle}
                </h2>
                <p className="ssub tc" style={{ marginInline: "auto", marginTop: "6px" }}>
                  {status?.platform
                    ? tpl(tr.platformLine, { platform: platformName })
                    : tr.detectingPlatform}
                </p>
                <p className="text-xs tc mt-3 max-w-md mx-auto leading-relaxed" style={{ color: "var(--tm)" }}>
                  {tr.progressEtaNote}
                </p>
              </div>
              <div className="gc analyze-progress-card space-y-6">
                <ProgressStep label={tr.step1Title} sublabel={step1Sub} state={s1} />
                <div className="analyze-progress-rule" aria-hidden />
                <ProgressStep label={tr.step2Title} sublabel={tr.step2Sub} state={s2} />
                <div className="analyze-progress-rule" aria-hidden />
                <ProgressStep label={tr.step3Title} sublabel={tr.step3Sub} state={s3} />
              </div>
            </div>
          )}

          {step === "error" && (
            <div className="max-w-md mx-auto text-center">
              <div
                className="rounded-2xl p-8 mb-6 border"
                style={{
                  background: "rgba(239,68,68,.07)",
                  borderColor: "rgba(239,68,68,.22)",
                }}
                role="alert"
              >
                <p className="text-lg font-semibold mb-2" style={{ color: "var(--t)" }}>
                  {tr.errorTitle}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--tm)" }}>
                  {(status?.productCount ?? 0) > 0 ? tr.errorBodyAnalyze : tr.errorBody}
                </p>
                {status?.errorMessage ? (
                  <div
                    className="mt-4 rounded-lg border px-3 py-2.5 text-left"
                    style={{ background: "var(--s1)", borderColor: "var(--b2)" }}
                  >
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide mb-1"
                      style={{ color: "var(--tm)" }}
                    >
                      {tr.errorDetails}
                    </p>
                    <p
                      className="text-xs break-words whitespace-pre-wrap font-mono leading-relaxed"
                      style={{ color: "var(--t)" }}
                    >
                      {status.errorMessage}
                    </p>
                  </div>
                ) : null}
                {formError ? (
                  <p className="text-sm mt-3 text-left" style={{ color: "var(--t)" }} role="alert">
                    {formError}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
                <button
                  type="button"
                  onClick={() => void handleRetryPipeline()}
                  disabled={retryBusy || storeId == null}
                  className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[44px] px-6"
                >
                  {retryBusy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
                      {tr.submitting}
                    </>
                  ) : (
                    tr.retryAnalysisServer
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormError(null);
                    setStep("idle");
                    setStatus(null);
                    setStoreId(null);
                  }}
                  className="btn-g inline-flex items-center justify-center gap-2 min-h-[44px] px-6"
                >
                  {tr.backToForm}
                </button>
              </div>
            </div>
          )}

          {step === "analyzed" &&
            status &&
            (() => {
              const groups = status.anchorGroups ?? [];
              const totalRecs = groups.reduce((n, g) => n + g.recommendations.length, 0);
              const crossSells = groups.reduce(
                (n, g) => n + g.recommendations.filter((r) => r.role === "cross_sell").length,
                0,
              );
              const upsells = groups.reduce(
                (n, g) => n + g.recommendations.filter((r) => r.role === "upsell").length,
                0,
              );

              const platformSuffix = status.platform
                ? tpl(tr.resultsSubtitlePlatform, {
                    platform: platformName,
                  })
                : "";

              const resultsSub = tpl(tr.resultsSubtitle, {
                count: status.productCount,
                platform: platformSuffix,
              });

              const pickedStories = pickSuccessStoriesForIndustry(status.industry, 3);
              const isArLocale = lang === "ar";
              const estimate = estimateAnalyzeOpportunity(
                groups.map((g) => ({
                  anchor: { price: g.anchor.price },
                  recommendations: g.recommendations.map((r) => ({ price: r.price, role: r.role })),
                })),
                status.monthlyUsers ?? null,
                status.conversionRate ?? null,
                status.avgOrderValue ?? null,
              );

              return (
                <div className="space-y-8 sm:space-y-10">
                  <header className="text-center analyze-section-head">
                    <div className="flex justify-center mb-5">
                      <div className="hbadge hbadge--success mb-0">
                        <span className="hbadge-pill inline-flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {tr.completeBadge}
                        </span>
                      </div>
                    </div>
                    <h2 className="st tc" style={{ color: "var(--t)" }}>
                      {tr.resultsTitle}
                    </h2>
                    <p className="ssub tc max-w-lg" style={{ marginInline: "auto", marginTop: "8px" }}>
                      {resultsSub}
                    </p>
                  </header>

                  <AnalyzeJumpNav
                    tr={tr}
                    showSummary={Boolean(status.summary)}
                    showAnchors={groups.length > 0}
                  />

                  <div className="analyze-sbar" role="presentation">
                    <div className="analyze-sbi">
                      <div className="analyze-sbi-icon" style={{ background: "rgba(124,58,237,.1)" }}>
                        <Package className="h-4 w-4" style={{ color: "var(--p3)" }} aria-hidden />
                      </div>
                      <p className="analyze-stat-num">{status.productCount}</p>
                      <p className="analyze-stat-label">{tr.statProducts}</p>
                    </div>
                    <div className="analyze-sbi">
                      <div className="analyze-sbi-icon" style={{ background: "rgba(251,191,36,.12)" }}>
                        <Star className="h-4 w-4" style={{ color: "var(--go)" }} aria-hidden />
                      </div>
                      <p className="analyze-stat-num analyze-stat-num--go">{groups.length}</p>
                      <p className="analyze-stat-label">{tr.statAnchors}</p>
                    </div>
                    <div className="analyze-sbi">
                      <div className="analyze-sbi-icon" style={{ background: "rgba(6,182,212,.1)" }}>
                        <ShoppingCart className="h-4 w-4" style={{ color: "var(--c)" }} aria-hidden />
                      </div>
                      <p className="analyze-stat-num analyze-stat-num--c">{crossSells}</p>
                      <p className="analyze-stat-label">{tr.statCross}</p>
                    </div>
                    <div className="analyze-sbi">
                      <div className="analyze-sbi-icon" style={{ background: "rgba(168,85,247,.1)" }}>
                        <TrendingUp className="h-4 w-4" style={{ color: "var(--p4)" }} aria-hidden />
                      </div>
                      <p className="analyze-stat-num analyze-stat-num--p">{upsells}</p>
                      <p className="analyze-stat-label">{tr.statUpsell}</p>
                    </div>
                  </div>

                  {status.summary ? (
                    <div id="analyze-summary" className="analyze-summary-box">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--p3)" }}>
                        <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
                        {tr.aiSummaryLabel}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--t)" }}
                        dir={isAr(status.summary) ? "rtl" : "ltr"}
                      >
                        {status.summary}
                      </p>
                    </div>
                  ) : null}

                  <section
                    id="analyze-value"
                    className="gc analyze-form-card space-y-4"
                    aria-labelledby="value-est-heading"
                  >
                    <div>
                      <h3 id="value-est-heading" className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--t)" }}>
                        <Sparkles className="h-5 w-5 shrink-0" style={{ color: "var(--p3)" }} aria-hidden />
                        {tr.valueEstimateTitle}
                      </h3>
                      {estimate.assumptionsNote === "partial_defaults" ? (
                        <p className="text-xs mt-1" style={{ color: "var(--tm)" }}>
                          {tr.valueAssumptionsPartial}
                        </p>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="analyze-value-card">
                        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--tm)" }}>
                          {tr.valueEstimateOrders}
                        </p>
                        <p className="text-xl font-extrabold mt-0.5" style={{ color: "var(--t)" }}>
                          {estimate.monthlyOrders.toLocaleString()}
                        </p>
                      </div>
                      <div className="analyze-value-card">
                        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--tm)" }}>
                          {tr.valueEstimateBaseline}
                        </p>
                        <p className="text-xl font-extrabold mt-0.5" style={{ color: "var(--t)" }}>
                          {Math.round(estimate.baselineMonthlyRevenue).toLocaleString()} {status.currencySymbol}
                        </p>
                      </div>
                      <div className="analyze-value-card analyze-value-card--primary">
                        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--p3)" }}>
                          {tr.valueEstimateIncremental}
                        </p>
                        <p className="text-2xl font-extrabold mt-0.5" style={{ color: "var(--p3)" }}>
                          {Math.round(estimate.estimatedIncrementalMonthly).toLocaleString()} {status.currencySymbol}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--tm)" }}>
                          +{estimate.upliftVsBaselinePercent.toFixed(1)}% {tr.valueEstimateUplift}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--tm)" }}>
                      {tr.valueEstimateDisclaimer}
                    </p>
                  </section>

                  {groups.length > 0 && (
                    <section id="analyze-anchors" className="space-y-4" aria-labelledby="anchors-heading">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <h3 id="anchors-heading" className="text-xl font-bold" style={{ color: "var(--t)" }}>
                            {tr.sectionAnchorsTitle}
                          </h3>
                          <p className="text-sm mt-0.5" style={{ color: "var(--tm)" }}>
                            {tpl(tr.sectionAnchorsSubtitle, { anchors: groups.length, recs: totalRecs })}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {groups.map((group, i) => (
                          <AnchorGroupCard
                            key={i}
                            group={group}
                            currencySymbol={status.currencySymbol}
                            index={i}
                            anchorLabel={tpl(tr.anchorBadge, { n: i + 1 })}
                            tr={tr}
                            lang={lang}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {pickedStories.length > 0 && (
                    <section className="space-y-3" aria-labelledby="succ-stories-heading">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                        <div>
                          <h3 id="succ-stories-heading" className="text-lg font-bold" style={{ color: "var(--t)" }}>
                            {tr.successStoriesTitle}
                          </h3>
                          <p className="text-sm" style={{ color: "var(--tm)" }}>
                            {tr.successStoriesSubtitle}
                          </p>
                        </div>
                        <Link
                          href="/success-stories"
                          className="text-sm font-semibold shrink-0 hover:underline"
                          style={{ color: "var(--p3)" }}
                        >
                          {tr.successStoriesAll} →
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {pickedStories.map((s) => (
                          <AnalyzeSuccessStoryCard key={s.store} story={s} isArLocale={isArLocale} />
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-xl border p-4" style={{ borderColor: "var(--b2)", background: "var(--s1)" }}>
                      <p className="text-sm font-bold mb-2" style={{ color: "var(--t)" }}>
                        {tr.agentDisclaimerTitle}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--tm)" }} dir={isArLocale ? "rtl" : "ltr"}>
                        {tr.agentDisclaimerBody}
                      </p>
                    </div>
                    <div className="rounded-xl border p-4" style={{ borderColor: "var(--b2)", background: "var(--s1)" }}>
                      <p className="text-sm font-bold mb-2" style={{ color: "var(--t)" }}>
                        {tr.agentHowTitle}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--tm)" }} dir={isArLocale ? "rtl" : "ltr"}>
                        {tr.agentHowBody}
                      </p>
                    </div>
                  </div>

                  <section id="analyze-cta" className="analyze-results-cta space-y-5">
                    <div>
                      <h3 className="text-lg font-bold tc mb-1" style={{ color: "var(--t)" }}>
                        {tr.ctaLaunch}
                      </h3>
                      <p className="ssub tc max-w-lg mx-auto" style={{ marginTop: 0 }}>
                        {tr.ctaLaunchSub}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap items-stretch sm:items-center">
                      <button
                        type="button"
                        className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[48px] px-6"
                        onClick={() => setPlatformOpen(true)}
                      >
                        <Zap className="h-4 w-4 shrink-0" aria-hidden />
                        {tr.ctaLaunch}
                      </button>
                      <button
                        type="button"
                        className="btn-g inline-flex items-center justify-center gap-2 min-h-[48px] px-6"
                        onClick={() => setPlatformOpen(true)}
                      >
                        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                        {tr.ctaActivate}
                      </button>
                      <button
                        type="button"
                        className="btn-g inline-flex items-center justify-center gap-2 min-h-[48px] px-6"
                        onClick={() => window.open(MEETING_CALENDAR_URL, "_blank", "noopener,noreferrer")}
                      >
                        <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                        {tr.ctaBookMeeting}
                      </button>
                    </div>
                  </section>

                  <div id="analyze-share" className="analyze-share-panel gc">
                    <h3 className="text-lg font-bold mb-1.5" style={{ color: "var(--t)" }}>
                      {tr.shareTitle}
                    </h3>
                    <p className="text-sm mb-5 max-w-sm mx-auto leading-relaxed" style={{ color: "var(--tm)" }}>
                      {tr.shareSubtitle}
                    </p>
                    {storeId && <CopyReportButton storeId={storeId} />}
                  </div>
                </div>
              );
            })()}
        </main>
        <PlatformModal open={platformOpen} onClose={() => setPlatformOpen(false)} />
      </PageShell>
    </>
  );
}
