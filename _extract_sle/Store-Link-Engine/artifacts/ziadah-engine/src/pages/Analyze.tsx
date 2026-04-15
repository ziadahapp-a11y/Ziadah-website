import { useState, useEffect, useRef } from "react";
import {
  Zap, CheckCircle2, Circle, Loader2, ArrowRight,
  TrendingUp, ShoppingCart, Package, Star, Copy, Check, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const INDUSTRIES = [
  { value: "fashion",     label: "Fashion & Apparel — موضة وملابس" },
  { value: "electronics", label: "Electronics — إلكترونيات" },
  { value: "beauty",      label: "Beauty & Personal Care — جمال وعناية" },
  { value: "home",        label: "Home & Garden — منزل وحديقة" },
  { value: "food",        label: "Food & Beverage — طعام ومشروبات" },
  { value: "sports",      label: "Sports & Outdoors — رياضة" },
  { value: "health",      label: "Health & Wellness — صحة ولياقة" },
  { value: "toys",        label: "Toys & Games — ألعاب" },
  { value: "jewelry",     label: "Jewelry & Accessories — مجوهرات" },
  { value: "automotive",  label: "Automotive — سيارات" },
  { value: "other",       label: "Other — أخرى" },
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
}

interface AnchorGroup {
  anchor: ProductRef & { reason: string };
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
  analyzedAt?: string;
  summary?: string;
  crossSellCount?: number;
  upsellCount?: number;
  anchorGroups?: AnchorGroup[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isAr = (s?: string | null) => s ? /[\u0600-\u06FF]/.test(s) : false;

function formatPrice(price: number | null | undefined, symbol: string): string {
  if (price == null) return "";
  return `${price.toLocaleString("en-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${symbol}`;
}

function RolePill({ role }: { role: string }) {
  if (role === "cross_sell") return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">
      <ShoppingCart className="h-3 w-3" />Cross-Sell
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full">
      <TrendingUp className="h-3 w-3" />Upsell
    </span>
  );
}

function RecCard({ rec, currencySymbol }: { rec: RecProduct; currencySymbol: string }) {
  const inner = (
    <div className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer">
      <div className="relative h-28 overflow-hidden bg-muted flex-shrink-0">
        {rec.imageUrl ? (
          <img src={rec.imageUrl} alt={rec.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-6 w-6 text-muted-foreground/25" />
          </div>
        )}
        <div className="absolute top-1.5 left-1.5">
          <RolePill role={rec.role} />
        </div>
      </div>
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <p className="text-xs font-semibold leading-snug line-clamp-2 text-foreground"
          dir={isAr(rec.title) ? "rtl" : "ltr"}>
          {rec.title}
        </p>
        {rec.price != null && (
          <p className="text-primary font-bold text-sm">{formatPrice(rec.price, currencySymbol)}</p>
        )}
        {rec.reason && (
          <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mt-auto pt-1"
            dir={isAr(rec.reason) ? "rtl" : "ltr"}>
            {rec.reason}
          </p>
        )}
      </div>
    </div>
  );
  return rec.productUrl
    ? <a href={rec.productUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">{inner}</a>
    : inner;
}

function AnchorGroupCard({ group, currencySymbol, index }: {
  group: AnchorGroup;
  currencySymbol: string;
  index: number;
}) {
  const anchor = group.anchor;
  const anchorCard = (
    <div className="group bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-2 border-amber-400/40 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "160px" }}>
        {anchor.imageUrl ? (
          <img src={anchor.imageUrl} alt={anchor.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-muted/50 flex items-center justify-center">
            <Package className="h-10 w-10 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow">
            <Star className="h-2.5 w-2.5" />Anchor {index + 1}
          </span>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="font-bold text-sm text-foreground leading-snug line-clamp-2"
          dir={isAr(anchor.title) ? "rtl" : "ltr"}>
          {anchor.title}
        </p>
        {anchor.price != null && (
          <p className="text-amber-500 font-extrabold text-base">
            {formatPrice(anchor.price, currencySymbol)}
          </p>
        )}
        {anchor.reason && (
          <p className="text-[10px] text-muted-foreground leading-snug line-clamp-3 mt-1"
            dir={isAr(anchor.reason) ? "rtl" : "ltr"}>
            {anchor.reason}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_2fr] gap-3 items-start">
        {/* Anchor product */}
        <div>
          {anchor.productUrl
            ? <a href={anchor.productUrl} target="_blank" rel="noopener noreferrer" className="block h-full">{anchorCard}</a>
            : anchorCard}
        </div>

        {/* Arrow connector */}
        <div className="hidden sm:flex flex-col items-center justify-center pt-16 gap-1">
          <ArrowRight className="h-5 w-5 text-primary/50" />
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">يُقترح</span>
        </div>

        {/* 4 recommendation cards — 2×2 grid */}
        <div className="grid grid-cols-2 gap-2 content-start">
          {group.recommendations.slice(0, 4).map((rec, i) => (
            <RecCard key={i} rec={rec} currencySymbol={currencySymbol} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressStep({ label, sublabel, state }: {
  label: string;
  sublabel?: string;
  state: "waiting" | "active" | "done";
}) {
  return (
    <div className={`flex items-start gap-4 transition-all duration-500 ${state === "waiting" ? "opacity-40" : "opacity-100"}`}>
      <div className={`mt-0.5 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all ${
        state === "done" ? "bg-emerald-500/15 text-emerald-500"
          : state === "active" ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
      }`}>
        {state === "done" ? <CheckCircle2 className="h-4 w-4" />
          : state === "active" ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Circle className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-tight ${state === "active" ? "text-foreground" : "text-muted-foreground"}`}>
          {label}
        </p>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}

function CopyReportButton({ storeId }: { storeId: number }) {
  const [copied, setCopied] = useState(false);
  const base = window.location.origin + (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const url = `${base}/report/${storeId}`;
  function copy() {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
      <Link href={`/report/${storeId}`}>
        <Button className="font-semibold gap-2">
          <ExternalLink className="h-4 w-4" />View Full Report
        </Button>
      </Link>
      <Button variant="outline" onClick={copy} className="gap-2">
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Report Link"}
      </Button>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Analyze Another Store
      </Button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Analyze() {
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
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const previewId = new URLSearchParams(window.location.search).get("preview");
    if (previewId) {
      const id = parseInt(previewId, 10);
      setStoreId(id);
      fetch(`${API_BASE}/api/submit/${id}/status`)
        .then((r) => r.json())
        .then((data: StatusResponse) => { setStatus(data); setStep("analyzed"); })
        .catch(() => {});
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  async function pollStatus(id: number) {
    try {
      const res = await fetch(`${API_BASE}/api/submit/${id}/status`);
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
    } catch { /* keep polling */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!url.trim()) { setFormError("Store URL is required"); return; }
    if (!industry) { setFormError("Industry is required"); return; }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(), industry,
          monthlyUsers: monthlyUsers ? parseInt(monthlyUsers) : null,
          conversionRate: conversionRate ? parseFloat(conversionRate) : null,
          avgOrderValue: avgOrderValue ? parseFloat(avgOrderValue) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error ?? "Something went wrong."); setSubmitting(false); return; }

      setStoreId(data.storeId);
      setStep("syncing");
      setSubmitting(false);
      pollRef.current = setInterval(() => pollStatus(data.storeId), 3000);
      pollStatus(data.storeId);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  const s1 = step === "syncing" ? "active" : ["analyzing", "analyzed"].includes(step) ? "done" : "waiting";
  const s2 = step === "analyzing" ? "active" : step === "analyzed" ? "done" : "waiting";
  const s3 = step === "analyzed" ? "done" : "waiting";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm text-foreground">Ziadah</span>
          <span className="text-muted-foreground text-sm hidden sm:block">— Product Intelligence Engine</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* ── FORM ── */}
        {step === "idle" && (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Zap className="h-3 w-3" />
                AI-Powered · Works with Shopify, Zid & Salla
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
                Unlock Your Store's<br />
                <span className="text-primary">Cross-Sell & Upsell</span> Potential
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                Enter your store URL and let our AI read your products, identify your hero products, and map the best recommendations — in seconds.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="url" className="text-sm font-semibold mb-1.5 block">
                      Store URL <span className="text-destructive">*</span>
                    </Label>
                    <Input id="url" type="url" placeholder="https://yourstore.com"
                      value={url} onChange={(e) => setUrl(e.target.value)} className="h-11" required />
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-sm font-semibold mb-1.5 block">
                      Industry <span className="text-destructive">*</span>
                    </Label>
                    <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)}
                      className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" required>
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.value} value={ind.value}>{ind.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t border-dashed border-border pt-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                      Optional — helps personalize recommendations
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="monthlyUsers" className="text-xs font-medium mb-1.5 block text-muted-foreground">Monthly Visitors</Label>
                        <Input id="monthlyUsers" type="number" min="0" placeholder="e.g. 5000"
                          value={monthlyUsers} onChange={(e) => setMonthlyUsers(e.target.value)} className="h-10 text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="conversionRate" className="text-xs font-medium mb-1.5 block text-muted-foreground">Conv. Rate (%)</Label>
                        <Input id="conversionRate" type="number" min="0" max="100" step="0.1" placeholder="e.g. 2.5"
                          value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} className="h-10 text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="avgOrderValue" className="text-xs font-medium mb-1.5 block text-muted-foreground">Avg Order (SAR)</Label>
                        <Input id="avgOrderValue" type="number" min="0" placeholder="e.g. 250"
                          value={avgOrderValue} onChange={(e) => setAvgOrderValue(e.target.value)} className="h-10 text-sm" />
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg">{formError}</div>
                  )}

                  <Button type="submit" className="w-full h-11 font-semibold text-sm" disabled={submitting}>
                    {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>
                      : <>Analyze My Store <ArrowRight className="h-4 w-4 ml-2" /></>}
                  </Button>
                </form>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-5">
                Works with any custom domain on Shopify, Zid, or Salla · No login required · Results in ~30 seconds
              </p>
            </div>
          </>
        )}

        {/* ── PROGRESS ── */}
        {(step === "syncing" || step === "analyzing") && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-7 w-7 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Analyzing your store…</h2>
              <p className="text-muted-foreground text-sm mt-1.5">
                {status?.platform
                  ? `Detected: ${status.platform.charAt(0).toUpperCase() + status.platform.slice(1)} platform`
                  : "Detecting platform…"}
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-7 space-y-6">
              <ProgressStep
                label="Reading products"
                sublabel={status?.productCount && status.productCount > 0
                  ? `${status.productCount} products found`
                  : "Connecting to your store…"}
                state={s1}
              />
              <div className="border-l-2 border-dashed border-border ml-4 h-4" />
              <ProgressStep
                label="AI Analysis"
                sublabel="Identifying anchor products, cross-sells & upsells"
                state={s2}
              />
              <div className="border-l-2 border-dashed border-border ml-4 h-4" />
              <ProgressStep
                label="Results ready"
                sublabel="Your recommendations are prepared"
                state={s3}
              />
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === "error" && (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 mb-6">
              <p className="text-lg font-semibold text-destructive mb-2">Analysis Failed</p>
              <p className="text-sm text-muted-foreground">
                We couldn't read products from your store. The platform may not be supported, or the URL may be incorrect.
              </p>
            </div>
            <Button variant="outline" onClick={() => { setStep("idle"); setStatus(null); setStoreId(null); }}>
              Try Again
            </Button>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "analyzed" && status && (() => {
          const groups = status.anchorGroups ?? [];
          const totalRecs = groups.reduce((n, g) => n + g.recommendations.length, 0);
          const crossSells = groups.reduce((n, g) => n + g.recommendations.filter((r) => r.role === "cross_sell").length, 0);
          const upsells = groups.reduce((n, g) => n + g.recommendations.filter((r) => r.role === "upsell").length, 0);

          return (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Analysis Complete
                </div>
                <h2 className="text-3xl font-extrabold text-foreground mb-2">Your Recommendations Are Ready</h2>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                  Based on {status.productCount} products from your{status.platform ? ` ${status.platform}` : ""} store
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-foreground">{status.productCount}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Products</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-amber-500">{groups.length}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Anchor Products</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-blue-400">{crossSells}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Cross-Sell Opps</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-violet-400">{upsells}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Upsell Opps</p>
                </div>
              </div>

              {/* AI Summary */}
              {status.summary && (
                <div className="bg-primary/5 border border-primary/15 rounded-xl px-5 py-4">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">AI Summary</p>
                  <p className="text-sm text-foreground leading-relaxed" dir={isAr(status.summary) ? "rtl" : "ltr"}>
                    {status.summary}
                  </p>
                </div>
              )}

              {/* 4 Anchor Groups */}
              {groups.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Anchor Products & Recommendations</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {groups.length} anchor products · {totalRecs} total recommendations
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {groups.map((group, i) => (
                      <AnchorGroupCard key={i} group={group} currencySymbol={status.currencySymbol} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Share CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-7 text-center">
                <h3 className="text-lg font-bold text-foreground mb-1.5">Share this report</h3>
                <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                  This report has a unique URL you can share with your team or clients.
                </p>
                {storeId && <CopyReportButton storeId={storeId} />}
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}
