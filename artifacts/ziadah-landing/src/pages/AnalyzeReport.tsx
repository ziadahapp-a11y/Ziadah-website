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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import { getApiSubmitOrigin } from "@/lib/apiSubmitOrigin";

interface ProductRef {
  productId: number;
  title: string;
  imageUrl: string | null;
  price: number | null;
  productUrl: string | null;
}

interface Pair {
  anchor: ProductRef | null;
  recommendation: ProductRef & { role: string; reason: string };
}

interface ReportData {
  storeId: number;
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
  mainProduct?: (ProductRef & { reason: string }) | null;
  crossSellCount?: number;
  upsellCount?: number;
  pairs?: Pair[];
}

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
}: {
  product: ProductRef;
  currencySymbol: string;
  isHero?: boolean;
  /** Shown on hero / anchor tile only */
  heroLabel?: string;
}) {
  const isArabic = /[\u0600-\u06FF]/.test(product.title);
  return (
    <a
      href={product.productUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-[var(--r12)] overflow-hidden transition-all min-h-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p)] ${
        isHero ? "analyze-anchor-card" : "analyze-product-card"
      }`}
    >
      <div className={`relative overflow-hidden ${isHero ? "h-44" : "h-36"}`}>
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
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p
          className="text-xs font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--t)" }}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {product.title}
        </p>
        {product.price != null && (
          <p className="font-bold text-sm mt-auto" style={{ color: "var(--p3)" }}>
            {formatPrice(product.price, currencySymbol)}
          </p>
        )}
      </div>
    </a>
  );
}

function PairCard({
  pair,
  currencySymbol,
  exampleLabel,
  alsoLabel,
  upgradeLabel,
  heroLabel,
}: {
  pair: Pair;
  currencySymbol: string;
  exampleLabel: string;
  alsoLabel: string;
  upgradeLabel: string;
  heroLabel: string;
}) {
  const isArabic = /[\u0600-\u06FF]/.test(pair.recommendation.reason);
  const recLabel = pair.recommendation.role === "cross_sell" ? alsoLabel : upgradeLabel;

  return (
    <div className="gc analyze-form-card flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full border"
          style={{ color: "var(--tm)", borderColor: "var(--b2)", background: "var(--s1)" }}
        >
          {exampleLabel}
        </span>
        <RolePill role={pair.recommendation.role} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {pair.anchor ? (
          <ProductThumb
            product={pair.anchor}
            currencySymbol={currencySymbol}
            isHero
            heroLabel={heroLabel}
          />
        ) : null}

        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-medium ps-1" style={{ color: "var(--tm)" }}>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--p3)" }} aria-hidden />
            {recLabel}
          </div>
          <ProductThumb product={pair.recommendation} currencySymbol={currencySymbol} />
        </div>
      </div>

      {pair.recommendation.reason ? (
        <div className="rounded-[var(--r12)] px-3 py-2.5 border" style={{ background: "var(--s1)", borderColor: "var(--b1)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--tm)" }} dir={isArabic ? "rtl" : "ltr"}>
            {pair.recommendation.reason}
          </p>
        </div>
      ) : null}
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
    <Button variant="outline" size="sm" onClick={copy} className="gap-2 border-[var(--b2)] bg-[var(--s1)]">
      {copied ? <Check className="h-3.5 w-3.5 text-[var(--gr)]" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? tr.copied : tr.copyLink}
    </Button>
  );
}

export default function AnalyzeReport({ id }: { id: number }) {
  const siteT = useSiteT();
  const { lang } = useLanguage();
  const tr = siteT[lang].analyze;
  const pk = getPageKeywords("/analyze");
  const apiBase = getApiSubmitOrigin();

  const invalidId = !Number.isFinite(id) || id < 1;

  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(!invalidId);
  const [errorKind, setErrorKind] = useState<"notfound" | "notready" | null>(null);

  useEffect(() => {
    if (invalidId) {
      setLoading(false);
      return;
    }
    setErrorKind(null);
    setData(null);
    setLoading(true);
    async function load() {
      try {
        const res = await fetch(`${apiBase}/api/submit/${id}/status`);
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
  }, [id, apiBase, invalidId]);

  const canonicalPath = `/report/${id}`;

  if (invalidId) {
    return (
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />
        <main className="analyze-page-main analyze-page text-center py-20">
          <p className="text-lg font-semibold mb-4" style={{ color: "var(--pk)" }}>
            {tr.invalidReportLink}
          </p>
          <Link
            href="/analyze"
            className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[48px] px-6 no-underline"
          >
            {tr.ctaAnalyzeStore}
          </Link>
        </main>
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
        <DsPageBackdrop />
        <main className="analyze-page-main analyze-page">
          {loading && (
            <div className="text-center py-24 flex flex-col items-center gap-4" style={{ color: "var(--tm)" }} role="status" aria-live="polite">
              <Loader2 className="h-10 w-10 animate-spin" style={{ color: "var(--p3)" }} aria-hidden />
              <span>{tr.reportLoading}</span>
            </div>
          )}

          {errorKind && (
            <div className="text-center py-20 max-w-md mx-auto">
              <p className="text-lg font-semibold mb-2" style={{ color: "var(--pk)" }}>
                {tr.reportUnavailable}
              </p>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--tm)" }}>
                {errorKind === "notready" ? tr.reportNotReady : tr.reportUnavailable}
              </p>
              <Link
                href="/analyze"
                className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[44px] px-5 no-underline text-sm"
              >
                {tr.ctaAnalyzeStore}
              </Link>
            </div>
          )}

          {data && (
            <div className="space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div />
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <CopyLinkButton />
                  <Link
                    href="/analyze"
                    className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[40px] px-4 text-sm no-underline"
                  >
                    <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {tr.ctaAnalyzeStore}
                  </Link>
                </div>
              </div>

              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="hbadge mb-3 w-fit max-w-full">
                    <span className="hbadge-pill inline-flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden />
                      {tr.analyzedBadge}
                    </span>
                    {data.platform ? (
                      <span className="hbadge-txt capitalize font-semibold">{data.platform}</span>
                    ) : null}
                  </div>
                  <h1
                    className="text-2xl sm:text-[1.65rem] font-extrabold tracking-tight leading-snug mb-1"
                    style={{ color: "var(--t)" }}
                  >
                    {data.storeName} {tr.reportTitleSuffix}
                  </h1>
                  <a
                    href={data.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 mt-2 break-all hover:opacity-90 transition-opacity"
                    style={{ color: "var(--tm)" }}
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {data.storeUrl}
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                  </a>
                </div>
              </header>

              <div className="analyze-sbar analyze-sbar--3" role="presentation">
                <div className="analyze-sbi">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-1"
                    style={{ background: "rgba(124,58,237,.12)" }}
                  >
                    <Package className="h-5 w-5" style={{ color: "var(--p3)" }} aria-hidden />
                  </div>
                  <p className="analyze-stat-num">{data.productCount}</p>
                  <p className="analyze-stat-label">{tr.statProductsAnalyzed}</p>
                </div>
                <div className="analyze-sbi">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-1"
                    style={{ background: "rgba(6,182,212,.1)" }}
                  >
                    <ShoppingCart className="h-5 w-5" style={{ color: "var(--c)" }} aria-hidden />
                  </div>
                  <p className="analyze-stat-num analyze-stat-num--c">{data.crossSellCount ?? 0}</p>
                  <p className="analyze-stat-label">{tr.statCrossOpps}</p>
                </div>
                <div className="analyze-sbi">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-1"
                    style={{ background: "rgba(168,85,247,.12)" }}
                  >
                    <TrendingUp className="h-5 w-5" style={{ color: "var(--p4)" }} aria-hidden />
                  </div>
                  <p className="analyze-stat-num analyze-stat-num--p">{data.upsellCount ?? 0}</p>
                  <p className="analyze-stat-label">{tr.statUpsellOpps}</p>
                </div>
              </div>

              {data.summary && (
                <div className="analyze-summary-box">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--p3)" }}>
                    {tr.aiSummaryLabel}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--t)" }}
                    dir={/[\u0600-\u06FF]/.test(data.summary) ? "rtl" : "ltr"}
                  >
                    {data.summary}
                  </p>
                </div>
              )}

              {data.pairs && data.pairs.length > 0 && (
                <section aria-labelledby="reco-examples-heading">
                  <div className="mb-6 analyze-section-head">
                    <h2 id="reco-examples-heading" className="st" style={{ color: "var(--t)" }}>
                      {tr.recoExamplesTitle}
                    </h2>
                    <p className="ssub mt-2" style={{ maxWidth: "42rem" }}>
                      {tr.recoExamplesSub}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {data.pairs.map((pair, i) => (
                      <PairCard
                        key={i}
                        pair={pair}
                        currencySymbol={data.currencySymbol}
                        exampleLabel={tpl(tr.exampleN, { n: i + 1 })}
                        alsoLabel={tr.alsoRecommend}
                        upgradeLabel={tr.upgradeTo}
                        heroLabel={tr.productHeroBadge}
                      />
                    ))}
                  </div>
                </section>
              )}

              <div className="analyze-share-panel gc">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--t)" }}>
                  {tr.ctaFooterTitle}
                </h3>
                <p className="text-sm mb-5 max-w-md mx-auto leading-relaxed" style={{ color: "var(--tm)" }}>
                  {tr.ctaFooterSub}
                </p>
                <Link
                  href="/analyze"
                  className="btn-p btn-p-hero inline-flex items-center justify-center gap-2 min-h-[48px] px-6 no-underline"
                >
                  {tr.ctaAnalyzeStore}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </main>
      </PageShell>
    </>
  );
}
