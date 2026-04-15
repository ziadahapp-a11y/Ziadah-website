import { useEffect, useState } from "react";
import { Zap, CheckCircle2, Package, ShoppingCart, TrendingUp, Star, ArrowRight, ExternalLink, Copy, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

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
  if (role === "cross_sell") return (
    <span className="inline-flex items-center gap-1 text-xs font-bold bg-blue-500/15 text-blue-500 px-2.5 py-0.5 rounded-full">
      <ShoppingCart className="h-3 w-3" />Cross-Sell
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold bg-violet-500/15 text-violet-500 px-2.5 py-0.5 rounded-full">
      <TrendingUp className="h-3 w-3" />Upsell
    </span>
  );
}

function ProductThumb({ product, currencySymbol, isHero = false }: {
  product: ProductRef;
  currencySymbol: string;
  isHero?: boolean;
}) {
  const isArabic = /[\u0600-\u06FF]/.test(product.title);
  return (
    <a
      href={product.productUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-xl overflow-hidden border transition-all hover:shadow-md ${
        isHero ? "border-amber-400/40 bg-amber-500/5" : "border-border bg-card"
      }`}
    >
      <div className={`relative overflow-hidden ${isHero ? "h-44" : "h-36"}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Package className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
        {isHero && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow">
              <Star className="h-3 w-3" />Hero
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p
          className="text-xs font-semibold leading-snug line-clamp-2 text-foreground"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {product.title}
        </p>
        {product.price != null && (
          <p className="text-primary font-bold text-sm mt-auto">
            {formatPrice(product.price, currencySymbol)}
          </p>
        )}
      </div>
    </a>
  );
}

function PairCard({ pair, currencySymbol, index }: { pair: Pair; currencySymbol: string; index: number }) {
  const isArabic = /[\u0600-\u06FF]/.test(pair.recommendation.reason);
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Example {index + 1}</span>
        <RolePill role={pair.recommendation.role} />
      </div>

      <div className="grid grid-cols-2 gap-3 items-start">
        {/* Anchor (hero) product */}
        {pair.anchor && (
          <ProductThumb product={pair.anchor} currencySymbol={currencySymbol} isHero />
        )}

        {/* Arrow */}
        <div className="hidden" />

        {/* Recommended product */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium pl-1">
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
            {pair.recommendation.role === "cross_sell" ? "Also recommend" : "Upgrade to"}
          </div>
          <ProductThumb product={pair.recommendation} currencySymbol={currencySymbol} />
        </div>
      </div>

      {/* AI reason */}
      {pair.recommendation.reason && (
        <div className="bg-muted/50 rounded-lg px-3 py-2.5">
          <p
            className="text-xs text-muted-foreground leading-relaxed"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {pair.recommendation.reason}
          </p>
        </div>
      )}
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy Link"}
    </Button>
  );
}

export default function Report({ id }: { id: number }) {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/submit/${id}/status`);
        if (!res.ok) throw new Error("Report not found");
        const json: ReportData = await res.json();
        if (json.status !== "analyzed") throw new Error("This report is not ready yet or failed to generate.");
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm text-foreground">Ziadah</span>
            <span className="text-muted-foreground text-sm hidden sm:block">— Product Intelligence Report</span>
          </div>
          <div className="flex items-center gap-2">
            {data && <CopyLinkButton />}
            <Link href="/analyze">
              <Button size="sm" className="gap-2">
                <Zap className="h-3.5 w-3.5" />
                Analyze My Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center py-24 text-muted-foreground">Loading report…</div>
        )}

        {error && (
          <div className="text-center py-24">
            <p className="text-lg font-semibold text-destructive mb-2">Report Unavailable</p>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Link href="/analyze">
              <Button>Analyze Your Store</Button>
            </Link>
          </div>
        )}

        {data && (
          <div className="space-y-10">
            {/* Report header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />Analyzed
                  </Badge>
                  {data.platform && (
                    <Badge variant="outline" className="capitalize">{data.platform}</Badge>
                  )}
                </div>
                <h1 className="text-2xl font-extrabold text-foreground">
                  {data.storeName} — Product Intelligence Report
                </h1>
                <a
                  href={data.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {data.storeUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <CopyLinkButton />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-extrabold text-foreground">{data.productCount}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Products Analyzed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-extrabold text-foreground">{data.crossSellCount ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Cross-Sell Opportunities</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-5 w-5 text-violet-500" />
                </div>
                <p className="text-3xl font-extrabold text-foreground">{data.upsellCount ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Upsell Opportunities</p>
              </div>
            </div>

            {/* AI Summary */}
            {data.summary && (
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-6">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">AI Summary</p>
                <p
                  className="text-sm text-foreground leading-relaxed"
                  dir={/[\u0600-\u06FF]/.test(data.summary) ? "rtl" : "ltr"}
                >
                  {data.summary}
                </p>
              </div>
            )}

            {/* Recommendation pairs */}
            {data.pairs && data.pairs.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Recommendation Examples</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Each example shows the hero product paired with a recommended product — with the AI rationale.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {data.pairs.map((pair, i) => (
                    <PairCard
                      key={i}
                      pair={pair}
                      currencySymbol={data.currencySymbol}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Want this for your own store?</h3>
              <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                Analyze any Shopify, Zid, or Salla store — free, no login required.
              </p>
              <Link href="/analyze">
                <Button className="font-semibold">
                  Analyze My Store
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
