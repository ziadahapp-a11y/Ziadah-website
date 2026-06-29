import { useEffect, useState } from "react";
import {
  Zap,
  CheckCircle2,
  Package,
  ShoppingCart,
  TrendingUp,
  Star,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Loader2,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import { getApiSubmitOrigin } from "@/lib/apiSubmitOrigin";
import { t as staticSiteTranslations } from "@/i18n/translations";

interface ProductRef {
  productId: number;
  title: string;
  imageUrl: string | null;
  price: number | null;
  productUrl: string | null;
}

interface AnchorRec extends ProductRef {
  role: string;
  reason: string;
  ziadahGoal?: string;
  presentationWidget?: string;
}

interface AnchorGroup {
  anchor: ProductRef & { reason: string; anchorGoal?: string; anchorPresentation?: string };
  recommendations: AnchorRec[];
}

interface ReportData {
  storeId: number;
  reportShareToken?: string;
  status: string;
  platform: string | null;
  productCount: number;
  industry: string | null;
  currency: string;
  currencySymbol: string;
  storeName: string;
  storeUrl: string;
  analyzedAt?: string;
  summary?: string;
  crossSellCount?: number;
  upsellCount?: number;
  anchorGroups?: AnchorGroup[];
}

function isAr(s: string): boolean {
  return /[\u0600-\u06FF]/.test(s);
}

function formatPrice(price: number | null | undefined, symbol: string): string {
  if (price == null) return "";
  return `${price.toLocaleString("en-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${symbol}`;
}

function formatAnalyzedAt(iso: string, lang: string): { date: string; time: string } {
  const d = new Date(iso);
  const locale = lang === "ar" ? "ar-SA" : "en-US";
  const date = d.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Riyadh",
  });
  const time = d.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Riyadh",
  });
  return { date, time };
}

function RolePill({ role }: { role: string }) {
  const { lang } = useLanguage();
  const siteT = useSiteT();
  const tr = siteT[lang].analyze;
  if (role === "cross_sell")
    return (
      <span className="analyze-pill analyze-pill--cross inline-flex items-center gap-1 text-xs font-bold">
        <ShoppingCart className="h-3 w-3 shrink-0" aria-hidden />
        {tr.roleCrossSell}
      </span>
    );
  return (
    <span className="analyze-pill analyze-pill--up inline-flex items-center gap-1 text-xs font-bold">
      <TrendingUp className="h-3 w-3 shrink-0" aria-hidden />
      {tr.roleUpsell}
    </span>
  );
}

function ProductThumb({
  product,
  currencySymbol,
  isHero = false,
  heroLabel = "",
  variant = "default",
}: {
  product: ProductRef;
  currencySymbol: string;
  isHero?: boolean;
  heroLabel?: string;
  variant?: "default" | "report";
}) {
  const arabic = isAr(product.title);
  const report = variant === "report";
  return (
    <a
      href={product.productUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-[var(--r12)] overflow-hidden transition-all min-h-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p)] ${
        isHero ? "analyze-anchor-card" : "analyze-product-card"
      }${report ? " analyze-report-product-card" : ""}`}
    >
      <div className={`relative overflow-hidden ${isHero ? (report ? "h-40 sm:h-44" : "h-44") : report ? "h-32 sm:h-36" : "h-36"}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[var(--s2)] flex items-center justify-center">
            <Package className="h-8 w-8 text-[var(--text-4)]" aria-hidden />
          </div>
        )}
        {isHero && heroLabel ? (
          <div className="absolute top-2 start-2">
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
              style={{ background: "var(--go)", color: "var(--cursor-dark)" }}
            >
              <Star className="h-3 w-3 shrink-0" aria-hidden />
              {heroLabel}
            </span>
          </div>
        ) : null}
      </div>
      <div className={`flex flex-col flex-1 ${report ? "analyze-report-product-meta" : "p-3 gap-1"}`}>
        <p
          className={`font-semibold leading-snug line-clamp-2 ${report ? "analyze-report-product-title" : "text-xs"}`}
          style={{ color: "var(--t)" }}
          dir={arabic ? "rtl" : "ltr"}
        >
          {product.title}
        </p>
        {product.price != null && (
          <p className={`font-bold mt-auto ${report ? "analyze-report-product-price" : "text-sm"}`} style={{ color: "var(--p3)" }}>
            {formatPrice(product.price, currencySymbol)}
          </p>
        )}
      </div>
    </a>
  );
}

function AnchorGroupSection({
  group,
  index,
  currencySymbol,
  lang,
  tr,
}: {
  group: AnchorGroup;
  index: number;
  currencySymbol: string;
  lang: string;
  tr: typeof staticSiteTranslations.ar.analyze;
}) {
  const crossCount = group.recommendations.filter((r) => r.role === "cross_sell").length;
  const upCount = group.recommendations.filter((r) => r.role === "upsell").length;
  const anchorLabel = lang === "ar" ? `مرساة ${index + 1}` : `Anchor ${index + 1}`;

  return (
    <div className="analyze-anchor-group-card analyze-anchor-group-card--report">
      <div className="analyze-anchor-group-header">
        <span className="analyze-anchor-group-index" aria-label={anchorLabel}>
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-bold leading-snug line-clamp-2"
            style={{ color: "var(--t)" }}
            dir={isAr(group.anchor.title) ? "rtl" : "ltr"}
          >
            {group.anchor.title}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {group.anchor.price != null && (
              <span className="text-xs font-extrabold" style={{ color: "var(--go)" }}>
                {formatPrice(group.anchor.price, currencySymbol)}
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
                {upCount} {lang === "ar" ? "أعلى" : "upsell"}
              </span>
            )}
          </div>
        </div>
        {group.anchor.productUrl && (
          <a
            href={group.anchor.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all hover:underline"
            style={{ color: "var(--p3)", borderColor: "rgba(34, 197, 125,.25)", background: "rgba(34, 197, 125,.06)" }}
          >
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
          </a>
        )}
      </div>

      {group.anchor.reason && (
        <div className="analyze-report-anchor-reason">
          <p style={{ color: "var(--t)" }} dir={isAr(group.anchor.reason) ? "rtl" : "ltr"}>
            {group.anchor.reason}
          </p>
        </div>
      )}

      <div className="analyze-report-product-grid">
        {group.anchor.productUrl || group.anchor.imageUrl ? (
          <div className="analyze-report-anchor-hero">
            <ProductThumb
              product={group.anchor}
              currencySymbol={currencySymbol}
              isHero
              heroLabel={anchorLabel}
              variant="report"
            />
          </div>
        ) : null}
        {group.recommendations.map((rec, ri) => (
          <div key={ri} className="analyze-report-rec-col">
            <RolePill role={rec.role} />
            <ProductThumb product={rec} currencySymbol={currencySymbol} variant="report" />
            {rec.reason && (
              <p className="analyze-report-rec-reason" style={{ color: "var(--tm)" }} dir={isAr(rec.reason) ? "rtl" : "ltr"}>
                {rec.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : "",
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const siteT = useSiteT();
  const tr = siteT[lang].analyze;
  function copy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <Button variant="outline" size="sm" onClick={copy} className="analyze-report-copy-btn gap-2 border-[var(--b2)] bg-[var(--s1)]">
      {copied ? <Check className="h-3.5 w-3.5 text-[var(--gr)]" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? tr.copied : tr.copyLink}
    </Button>
  );
}

function isPlausibleShareToken(s: string): boolean {
  const t = s.trim();
  return t.length >= 32 && t.length <= 128 && /^[A-Za-z0-9_-]+$/.test(t);
}

/** Legacy `/report/123` or opaque share token */
function isValidReportParam(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (/^\d+$/.test(t) && t.length >= 1 && t.length <= 12) return true;
  return isPlausibleShareToken(t);
}

export default function AnalyzeReport({ shareToken }: { shareToken: string }) {
  const siteT = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = siteT[lang].analyze;
  const ld = siteT[lang].landing;
  const pk = getPageKeywords("/analyze");
  const apiBase = getApiSubmitOrigin();

  const invalidToken = !isValidReportParam(shareToken);

  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(!invalidToken);
  const [errorKind, setErrorKind] = useState<"notfound" | "notready" | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  useEffect(() => {
    if (invalidToken) {
      setLoading(false);
      return;
    }
    setErrorKind(null);
    setData(null);
    setLoading(true);
    async function load() {
      try {
        let token = shareToken.trim();
        const looksLegacyNumeric = /^\d+$/.test(token);
        if (looksLegacyNumeric) {
          const legacyRes = await fetch(`${apiBase}/api/submit/${token}/status`);
          if (legacyRes.ok) {
            const legacyJson = (await legacyRes.json()) as ReportData;
            if (typeof legacyJson.reportShareToken === "string" && legacyJson.reportShareToken) {
              token = legacyJson.reportShareToken;
            }
          } else if (legacyRes.status === 403) {
            const body = (await legacyRes.json().catch(() => null)) as { reportShareToken?: string } | null;
            if (body && typeof body.reportShareToken === "string" && isPlausibleShareToken(body.reportShareToken)) {
              token = body.reportShareToken;
              const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
              window.history.replaceState(null, "", `${base}/report/${encodeURIComponent(token)}`);
            }
          }
        }
        const res = await fetch(`${apiBase}/api/submit/share/${encodeURIComponent(token)}/status`);
        if (!res.ok) throw new Error("notfound");
        const json: ReportData = await res.json();
        if (json.status !== "analyzed") throw new Error("notready");
        setData(json);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "";
        setErrorKind(msg === "notready" ? "notready" : "notfound");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [shareToken, apiBase, invalidToken]);

  const canonicalPath = `/report/${encodeURIComponent(shareToken.trim())}`;

  if (invalidToken) {
    return (
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <div className="analyze-report-shell-inner w-full space-y-5 sm:space-y-6">
          <DsPageBackdrop />
          <main className="analyze-page-main analyze-page analyze-report-page analyze-report-page--centered w-full self-stretch text-center">
            <div className="analyze-report-container analyze-report-state analyze-report-state--invalid">
              <p className="analyze-report-state__title" style={{ color: "var(--pk)" }}>
                {tr.invalidReportLink}
              </p>
              <Link
                href="/analyze"
                className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[48px] px-6 no-underline"
              >
                {tr.ctaAnalyzeStore}
              </Link>
            </div>
          </main>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <SEO
        titleAr={siteT.ar.analyze.reportSeoTitle}
        titleEn={siteT.en.analyze.reportSeoTitle}
        descriptionAr={siteT.ar.analyze.reportSeoDesc}
        descriptionEn={siteT.en.analyze.reportSeoDesc}
        canonical={canonicalPath}
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <WebPageSchema
        name={lang === "ar" ? siteT.ar.analyze.reportSeoTitle : siteT.en.analyze.reportSeoTitle}
        description={lang === "ar" ? siteT.ar.analyze.reportSeoDesc : siteT.en.analyze.reportSeoDesc}
        url={canonicalPath}
      />
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <div className="analyze-report-shell-inner w-full space-y-5 sm:space-y-6">
          <DsPageBackdrop />
          <main
            className={`analyze-page-main analyze-page analyze-report-page w-full self-stretch${
              loading || errorKind ? " analyze-report-page--centered" : ""
            }`}
          >
          {loading && (
            <div className="analyze-report-container analyze-report-state analyze-report-state--loading">
              <div className="analyze-report-loading" style={{ color: "var(--tm)" }} role="status" aria-live="polite">
                <Loader2 className="analyze-report-loading__icon animate-spin" style={{ color: "var(--p3)" }} aria-hidden />
                <span className="analyze-report-loading__text">{tr.reportLoading}</span>
              </div>
            </div>
          )}

          {errorKind && (
            <div className="analyze-report-container analyze-report-state analyze-report-state--error">
              <div className="analyze-report-error-panel">
                <p className="analyze-report-error-panel__title" style={{ color: "var(--pk)" }}>
                  {tr.reportUnavailable}
                </p>
                <p className="analyze-report-error-panel__body" style={{ color: "var(--tm)" }}>
                  {errorKind === "notready" ? tr.reportNotReady : tr.reportUnavailable}
                </p>
                <Link
                  href="/analyze"
                  className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[44px] px-5 no-underline text-sm"
                >
                  {tr.ctaAnalyzeStore}
                </Link>
              </div>
            </div>
          )}

          {data && (() => {
            const groups = data.anchorGroups ?? [];
            const totalRecs = groups.reduce((n, g) => n + g.recommendations.length, 0);
            const ts = data.analyzedAt ? formatAnalyzedAt(data.analyzedAt, lang) : null;

            return (
              <div className="analyze-report-container analyze-report-stack">
                {/* Toolbar */}
                <div className="analyze-report-toolbar">
                  <nav className="analyze-breadcrumb analyze-report-toolbar__nav" aria-label={tr.breadcrumbAnalyze}>
                    <Link href="/" className="analyze-breadcrumb__a">
                      {tr.breadcrumbHome}
                    </Link>
                    <span className="analyze-breadcrumb__sep" aria-hidden>
                      <ArrowRight className="h-3.5 w-3.5 opacity-45" />
                    </span>
                    <Link href="/analyze" className="analyze-breadcrumb__a">
                      {tr.breadcrumbAnalyze}
                    </Link>
                  </nav>
                  <div className="analyze-report-toolbar__actions">
                    <CopyLinkButton />
                    <Link
                      href="/analyze"
                      className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[40px] px-4 text-sm no-underline shadow-sm"
                    >
                      <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {tr.ctaAnalyzeStore}
                    </Link>
                  </div>
                </div>

                {/* Hero: identity + KPIs */}
                <div className="analyze-report-hero">
                  <header className="analyze-report-header analyze-report-hero__intro">
                    <div className="analyze-report-meta">
                      <div className="analyze-done-badge">
                        <div className="analyze-done-badge__glow" aria-hidden />
                        <div className="analyze-done-badge__icon" aria-hidden>
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                        </div>
                        <span>{tr.analyzedBadge}</span>
                        {data.platform ? (
                          <span
                            className="text-[11px] font-semibold capitalize px-2 py-0.5 rounded-full ms-1"
                            style={{ background: "rgba(34,197,94,.12)", color: "rgba(34,197,94,.75)" }}
                          >
                            {data.platform}
                          </span>
                        ) : null}
                      </div>

                      <h1 className="analyze-report-title" style={{ color: "var(--t)" }}>
                        {data.storeName} {tr.reportTitleSuffix}
                      </h1>

                      <div className="analyze-report-hero__meta-row">
                        <a
                          href={data.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="analyze-report-store-url analyze-report-store-url--hero"
                        >
                          <Globe className="h-3.5 w-3.5 shrink-0 flex-shrink-0" aria-hidden />
                          <span className="break-all">{data.storeUrl}</span>
                          <ExternalLink className="h-3 w-3 shrink-0 flex-shrink-0 opacity-60" aria-hidden />
                        </a>
                        {ts ? (
                          <div className="analyze-report-timestamp analyze-report-timestamp--inline">
                            <div className="analyze-report-timestamp__icon" aria-hidden>
                              <Calendar className="h-3.5 w-3.5" />
                            </div>
                            <div className="analyze-report-timestamp__body">
                              <span className="analyze-report-timestamp__date">{ts.date}</span>
                              <span className="analyze-report-timestamp__sep" aria-hidden>
                                —
                              </span>
                              <span className="analyze-report-timestamp__time">
                                <Clock
                                  className="h-3 w-3 shrink-0 inline-block align-[-1px] me-1 opacity-60"
                                  aria-hidden
                                />
                                {ts.time}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </header>

                  <div className="analyze-report-hero__stats" role="presentation">
                    <div className="analyze-sbar analyze-sbar--3 analyze-sbar--report-hero">
                      <div className="analyze-sbi">
                        <div className="analyze-sbi-icon" style={{ background: "rgba(34, 197, 125,.1)" }}>
                          <Package className="h-5 w-5" style={{ color: "var(--p3)" }} aria-hidden />
                        </div>
                        <p className="analyze-stat-num">{data.productCount}</p>
                        <p className="analyze-stat-label">{tr.statProductsAnalyzed}</p>
                      </div>
                      <div className="analyze-sbi">
                        <div className="analyze-sbi-icon" style={{ background: "rgba(6,182,212,.1)" }}>
                          <ShoppingCart className="h-5 w-5" style={{ color: "var(--c)" }} aria-hidden />
                        </div>
                        <p className="analyze-stat-num analyze-stat-num--c">{data.crossSellCount ?? 0}</p>
                        <p className="analyze-stat-label">{tr.statCrossOpps}</p>
                      </div>
                      <div className="analyze-sbi">
                        <div className="analyze-sbi-icon" style={{ background: "rgba(52, 211, 153,.12)" }}>
                          <TrendingUp className="h-5 w-5" style={{ color: "var(--p4)" }} aria-hidden />
                        </div>
                        <p className="analyze-stat-num analyze-stat-num--p">{data.upsellCount ?? 0}</p>
                        <p className="analyze-stat-label">{tr.statUpsellOpps}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                {data.summary && (
                  <div className="analyze-summary-box analyze-summary-box--report">
                    <div className="analyze-summary-label-row">
                      <div className="analyze-summary-label-icon" aria-hidden>
                        <Star className="h-3.5 w-3.5" />
                      </div>
                      <span className="analyze-summary-label-text">{tr.aiSummaryLabel}</span>
                    </div>
                    <p
                      className="analyze-summary-box--report__body"
                      style={{ color: "var(--t)" }}
                      dir={isAr(data.summary) ? "rtl" : "ltr"}
                    >
                      {data.summary}
                    </p>
                  </div>
                )}

                {/* Anchor Groups — full results */}
                {groups.length > 0 && (
                  <section className="analyze-report-reco-section" aria-labelledby="reco-groups-heading">
                    <div className="analyze-report-section-head">
                      <h2 id="reco-groups-heading" className="analyze-report-section-title">
                        {tr.recoExamplesTitle}
                      </h2>
                      <p className="analyze-report-section-sub">
                        {tpl(tr.sectionAnchorsSubtitle ?? "{{anchors}} anchor groups · {{recs}} recommendations", {
                          anchors: groups.length,
                          recs: totalRecs,
                        })}
                      </p>
                    </div>
                    <div className="analyze-report-reco-list">
                      {groups.map((group, i) => (
                        <AnchorGroupSection
                          key={i}
                          group={group}
                          index={i}
                          currencySymbol={data.currencySymbol}
                          lang={lang}
                          tr={tr}
                        />
                      ))}
                    </div>
                  </section>
                )}

                <PageClosingCta
                  title={tr.ctaFooterTitle}
                  description={tr.ctaFooterSub}
                  buttonLabel={ld.ctaBtn}
                  onActivate={() => setPlatformModalOpen(true)}
                />
              </div>
            );
          })()}
        </main>
        </div>
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
