import { useState, useEffect, useRef } from "react";
import {
  Zap, CheckCircle2, Loader2, ArrowRight,
  TrendingUp, ShoppingCart, Package, Star, Copy, Check, ExternalLink,
  Globe, BarChart3, Users, Target, Sparkles, ChevronDown,
  ArrowUpRight, Store, AlertCircle, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const INDUSTRIES = [
  { value: "fashion",     label: "Fashion & Apparel",    labelAr: "موضة وملابس",    icon: "👗" },
  { value: "electronics", label: "Electronics",           labelAr: "إلكترونيات",      icon: "💻" },
  { value: "beauty",      label: "Beauty & Personal Care",labelAr: "جمال وعناية",    icon: "✨" },
  { value: "home",        label: "Home & Garden",         labelAr: "منزل وحديقة",    icon: "🏡" },
  { value: "food",        label: "Food & Beverage",       labelAr: "طعام ومشروبات",  icon: "🍽️" },
  { value: "sports",      label: "Sports & Outdoors",     labelAr: "رياضة",           icon: "⚽" },
  { value: "health",      label: "Health & Wellness",     labelAr: "صحة ولياقة",     icon: "💪" },
  { value: "toys",        label: "Toys & Games",          labelAr: "ألعاب",           icon: "🎮" },
  { value: "jewelry",     label: "Jewelry & Accessories", labelAr: "مجوهرات",         icon: "💎" },
  { value: "automotive",  label: "Automotive",            labelAr: "سيارات",          icon: "🚗" },
  { value: "other",       label: "Other",                 labelAr: "أخرى",            icon: "📦" },
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

const isAr = (s?: string | null) => s ? /[\u0600-\u06FF]/.test(s) : false;

function formatPrice(price: number | null | undefined, symbol: string): string {
  if (price == null) return "";
  return `${price.toLocaleString("en-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${symbol}`;
}

function RolePill({ role }: { role: string }) {
  if (role === "cross_sell") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/20">
      <ShoppingCart className="h-2.5 w-2.5" />Cross-Sell
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/20">
      <TrendingUp className="h-2.5 w-2.5" />Upsell
    </span>
  );
}

function RecCard({ rec, currencySymbol }: { rec: RecProduct; currencySymbol: string }) {
  const inner = (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "110px" }}>
        {rec.imageUrl ? (
          <img src={rec.imageUrl} alt={rec.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" />
        ) : (
          <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
            <Package className="h-8 w-8 text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2">
          <RolePill role={rec.role} />
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-xs font-semibold leading-snug line-clamp-2 text-white/90"
          dir={isAr(rec.title) ? "rtl" : "ltr"}>
          {rec.title}
        </p>
        {rec.price != null && (
          <p className="text-primary font-bold text-sm">{formatPrice(rec.price, currencySymbol)}</p>
        )}
        {rec.reason && (
          <p className="text-[10px] text-white/40 leading-snug line-clamp-2 mt-auto"
            dir={isAr(rec.reason) ? "rtl" : "ltr"}>
            {rec.reason}
          </p>
        )}
      </div>
      {rec.productUrl && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-6 w-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <ExternalLink className="h-3 w-3 text-white" />
          </div>
        </div>
      )}
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
  const crossSells = group.recommendations.filter(r => r.role === "cross_sell").length;
  const upsells = group.recommendations.filter(r => r.role === "upsell").length;

  const anchorCard = (
    <div className="group relative bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/25 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "180px" }}>
        {anchor.imageUrl ? (
          <img src={anchor.imageUrl} alt={anchor.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
        ) : (
          <div className="w-full h-full bg-amber-500/5 flex items-center justify-center">
            <Package className="h-12 w-12 text-amber-400/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-lg">
            <Star className="h-3 w-3 fill-white" />Anchor #{index + 1}
          </span>
        </div>
        {anchor.productUrl && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-7 w-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-bold text-sm text-white leading-snug line-clamp-2"
          dir={isAr(anchor.title) ? "rtl" : "ltr"}>
          {anchor.title}
        </p>
        {anchor.price != null && (
          <p className="text-amber-400 font-extrabold text-lg leading-none">
            {formatPrice(anchor.price, currencySymbol)}
          </p>
        )}
        <div className="flex gap-2 mt-1">
          {crossSells > 0 && (
            <span className="text-[10px] font-semibold text-sky-300/70 bg-sky-500/10 px-2 py-0.5 rounded-full">
              {crossSells} cross-sells
            </span>
          )}
          {upsells > 0 && (
            <span className="text-[10px] font-semibold text-violet-300/70 bg-violet-500/10 px-2 py-0.5 rounded-full">
              {upsells} upsells
            </span>
          )}
        </div>
        {anchor.reason && (
          <p className="text-[10px] text-white/40 leading-snug line-clamp-2 mt-auto pt-1"
            dir={isAr(anchor.reason) ? "rtl" : "ltr"}>
            {anchor.reason}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white/[0.02] border border-white/8 rounded-3xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_auto_1fr] gap-4 items-start">
        <div className="h-full">
          {anchor.productUrl
            ? <a href={anchor.productUrl} target="_blank" rel="noopener noreferrer" className="block h-full">{anchorCard}</a>
            : anchorCard}
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center pt-20 gap-2 px-1">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <ArrowRight className="h-5 w-5 text-primary/40" />
          <span className="text-[9px] text-white/25 font-semibold uppercase tracking-widest rotate-0">يُقترح</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 content-start">
          {group.recommendations.slice(0, 4).map((rec, i) => (
            <RecCard key={i} rec={rec} currencySymbol={currencySymbol} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, color, icon }: {
  value: string | number;
  label: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative bg-white/[0.03] border border-white/8 rounded-2xl p-5 overflow-hidden group hover:bg-white/[0.05] transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-black text-white tracking-tight">{value}</p>
      <p className="text-xs text-white/40 mt-1 font-medium">{label}</p>
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const badges: Record<string, { color: string; label: string }> = {
    shopify: { color: "bg-green-500/20 text-green-300 border-green-500/20", label: "Shopify" },
    zid: { color: "bg-blue-500/20 text-blue-300 border-blue-500/20", label: "Zid · زد" },
    salla: { color: "bg-orange-500/20 text-orange-300 border-orange-500/20", label: "Salla · سلة" },
  };
  const b = badges[platform.toLowerCase()] ?? { color: "bg-white/10 text-white/60 border-white/10", label: platform };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${b.color}`}>
      <Store className="h-3 w-3" />{b.label}
    </span>
  );
}

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
  const [selectOpen, setSelectOpen] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setSelectOpen(false);
      }
    }
    if (selectOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [selectOpen]);

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
    if (!industry) { setFormError("Please select your industry"); return; }

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

  const selectedIndustry = INDUSTRIES.find(i => i.value === industry);
  const isLoading = step === "syncing" || step === "analyzing";

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-sky-600/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/[0.06] backdrop-blur-sm sticky top-0 z-10 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-white">Ziadah</span>
            <span className="hidden sm:block text-xs text-white/30 font-medium">— Product Intelligence Engine</span>
          </div>
          {step === "analyzed" && (
            <button
              onClick={() => { setStep("idle"); setStatus(null); setStoreId(null); setUrl(""); setIndustry(""); }}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-6">

        {/* ── FORM ── */}
        {step === "idle" && (
          <div className="pt-16 pb-20">
            {/* Hero */}
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                AI-Powered · Works with Shopify, Zid & Salla
              </div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-5 leading-[1.05]">
                <span className="text-white">Unlock Your Store's</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Revenue Potential
                </span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
                Enter your store URL — our AI reads your catalog, identifies hero products, and maps the best cross-sell &amp; upsell opportunities.
              </p>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-6 mt-8">
                {[
                  { icon: <BarChart3 className="h-3.5 w-3.5" />, label: "AI Analysis" },
                  { icon: <Target className="h-3.5 w-3.5" />, label: "Smart Recommendations" },
                  { icon: <Users className="h-3.5 w-3.5" />, label: "No Login Required" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-white/35 font-medium">
                    <span className="text-white/25">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Form card */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl blur-xl" />
                <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl shadow-black/50">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* URL Field */}
                    <div>
                      <Label htmlFor="url" className="text-sm font-semibold mb-2 block text-white/80">
                        Store URL <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://yourstore.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="h-12 pl-10 bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.06] rounded-xl text-sm transition-all"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-white/25 mt-1.5 ml-1">Works with custom domains on Shopify, Zid, or Salla</p>
                    </div>

                    {/* Industry custom select */}
                    <div>
                      <Label htmlFor="industry" className="text-sm font-semibold mb-2 block text-white/80">
                        Industry <span className="text-red-400">*</span>
                      </Label>
                      <div ref={selectRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setSelectOpen(!selectOpen)}
                          className={`w-full h-12 px-4 rounded-xl border text-sm text-left flex items-center justify-between transition-all ${
                            selectOpen
                              ? "border-primary/50 bg-white/[0.06]"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          {selectedIndustry ? (
                            <span className="flex items-center gap-2 text-white">
                              <span className="text-base">{selectedIndustry.icon}</span>
                              <span className="font-medium">{selectedIndustry.label}</span>
                              <span className="text-white/35 text-xs">· {selectedIndustry.labelAr}</span>
                            </span>
                          ) : (
                            <span className="text-white/25">Select your industry…</span>
                          )}
                          <ChevronDown className={`h-4 w-4 text-white/30 transition-transform ${selectOpen ? "rotate-180" : ""}`} />
                        </button>

                        {selectOpen && (
                          <div className="absolute z-20 top-full mt-1.5 w-full bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                            <div className="max-h-64 overflow-y-auto py-1.5">
                              {INDUSTRIES.map((ind) => (
                                <button
                                  key={ind.value}
                                  type="button"
                                  onClick={() => { setIndustry(ind.value); setSelectOpen(false); }}
                                  className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-white/[0.05] transition-colors text-sm ${
                                    industry === ind.value ? "bg-primary/10 text-primary" : "text-white/70"
                                  }`}
                                >
                                  <span className="text-base w-6 text-center">{ind.icon}</span>
                                  <span className="font-medium">{ind.label}</span>
                                  <span className="text-white/25 text-xs ml-auto">{ind.labelAr}</span>
                                  {industry === ind.value && <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Optional fields */}
                    <div className="border-t border-white/[0.06] pt-6">
                      <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="h-px flex-1 bg-white/[0.06]" />
                        Optional — improves recommendation quality
                        <span className="h-px flex-1 bg-white/[0.06]" />
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "monthlyUsers", label: "Monthly Visitors", placeholder: "e.g. 5,000", value: monthlyUsers, set: setMonthlyUsers, icon: <Users className="h-3.5 w-3.5" /> },
                          { id: "conversionRate", label: "Conv. Rate (%)", placeholder: "e.g. 2.5", value: conversionRate, set: setConversionRate, icon: <Target className="h-3.5 w-3.5" /> },
                          { id: "avgOrderValue", label: "Avg Order (SAR)", placeholder: "e.g. 250", value: avgOrderValue, set: setAvgOrderValue, icon: <BarChart3 className="h-3.5 w-3.5" /> },
                        ].map((field) => (
                          <div key={field.id}>
                            <Label htmlFor={field.id} className="text-[11px] font-medium mb-1.5 flex items-center gap-1 text-white/35">
                              {field.icon}{field.label}
                            </Label>
                            <Input
                              id={field.id}
                              type="number"
                              min="0"
                              placeholder={field.placeholder}
                              value={field.value}
                              onChange={(e) => field.set(e.target.value)}
                              className="h-10 bg-white/[0.03] border-white/[0.07] text-white placeholder:text-white/20 focus:border-primary/40 rounded-xl text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {formError && (
                      <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />{formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/25 text-white"
                    >
                      {submitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</>
                      ) : (
                        <>Analyze My Store<ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-center text-[11px] text-white/20 mt-5">
                No account needed · Results in ~30 seconds · Data never stored permanently
              </p>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {isLoading && (
          <div className="min-h-[calc(100vh-56px)] flex items-center justify-center py-20">
            <div className="w-full max-w-lg text-center">
              {/* Animated icon */}
              <div className="relative mx-auto mb-10 w-20 h-20">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="relative h-20 w-20 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center backdrop-blur-sm">
                  <Loader2 className="h-9 w-9 text-primary animate-spin" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white mb-2">
                {step === "syncing" ? "Reading your store…" : "AI is analyzing…"}
              </h2>
              <p className="text-white/40 text-sm mb-3">
                {status?.platform ? (
                  <><PlatformBadge platform={status.platform} /></>
                ) : "Detecting platform…"}
              </p>
              {status?.productCount ? (
                <p className="text-white/30 text-sm">
                  {status.productCount} products found so far
                </p>
              ) : null}

              {/* Progress steps */}
              <div className="mt-10 bg-white/[0.03] border border-white/8 rounded-2xl p-6 text-left space-y-0">
                {[
                  {
                    label: "Reading products",
                    sublabel: status?.productCount ? `${status.productCount} products found` : "Connecting to your store…",
                    state: step === "syncing" ? "active" : "done",
                  },
                  {
                    label: "AI Analysis",
                    sublabel: "Identifying anchors, cross-sells & upsells",
                    state: step === "analyzing" ? "active" : step === "analyzed" ? "done" : "waiting",
                  },
                  {
                    label: "Results ready",
                    sublabel: "Your personalized recommendations",
                    state: "waiting" as const,
                  },
                ].map((s, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="ml-5 w-px h-6 bg-white/[0.06]" />
                    )}
                    <div className={`flex items-center gap-4 transition-all duration-500 ${s.state === "waiting" ? "opacity-30" : "opacity-100"}`}>
                      <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                        s.state === "done" ? "bg-emerald-500/15 border border-emerald-500/25"
                          : s.state === "active" ? "bg-primary/15 border border-primary/25"
                            : "bg-white/[0.03] border border-white/8"
                      }`}>
                        {s.state === "done" ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                          : s.state === "active" ? <Loader2 className="h-4.5 w-4.5 text-primary animate-spin" />
                            : <div className="h-2 w-2 rounded-full bg-white/20" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${s.state === "active" ? "text-white" : "text-white/60"}`}>{s.label}</p>
                        <p className="text-xs text-white/30 mt-0.5">{s.sublabel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-white/20 mt-6">This usually takes 20–45 seconds</p>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === "error" && (
          <div className="min-h-[calc(100vh-56px)] flex items-center justify-center py-20">
            <div className="max-w-md w-full text-center">
              <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Analysis Failed</h2>
              <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                We couldn't read products from your store. The platform may not be supported, or the URL may be incorrect. Try again with a direct store URL.
              </p>
              <button
                onClick={() => { setStep("idle"); setStatus(null); setStoreId(null); }}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-semibold text-white hover:bg-white/[0.09] transition-all"
              >
                <RefreshCw className="h-4 w-4" />Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "analyzed" && status && (() => {
          const groups = status.anchorGroups ?? [];
          const totalRecs = groups.reduce((n, g) => n + g.recommendations.length, 0);
          const crossSells = groups.reduce((n, g) => n + g.recommendations.filter((r) => r.role === "cross_sell").length, 0);
          const upsells = groups.reduce((n, g) => n + g.recommendations.filter((r) => r.role === "upsell").length, 0);

          return (
            <div className="py-12 space-y-10">

              {/* Result header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Analysis Complete
                </div>
                <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Your Recommendations</h2>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-white/40 text-sm">
                    Based on <span className="text-white/70 font-semibold">{status.productCount} products</span>
                  </span>
                  {status.platform && (
                    <>
                      <span className="text-white/20">·</span>
                      <PlatformBadge platform={status.platform} />
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  value={status.productCount}
                  label="Products Scanned"
                  color="bg-white/[0.05]"
                  icon={<Package className="h-4 w-4 text-white/40" />}
                />
                <StatCard
                  value={groups.length}
                  label="Anchor Products"
                  color="bg-amber-500/10"
                  icon={<Star className="h-4 w-4 text-amber-400 fill-amber-400/50" />}
                />
                <StatCard
                  value={crossSells}
                  label="Cross-Sell Opportunities"
                  color="bg-sky-500/10"
                  icon={<ShoppingCart className="h-4 w-4 text-sky-400" />}
                />
                <StatCard
                  value={upsells}
                  label="Upsell Opportunities"
                  color="bg-violet-500/10"
                  icon={<TrendingUp className="h-4 w-4 text-violet-400" />}
                />
              </div>

              {/* AI Summary */}
              {status.summary && (
                <div className="relative bg-gradient-to-br from-primary/8 via-primary/5 to-transparent border border-primary/15 rounded-2xl px-6 py-5 overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Sparkles className="h-4 w-4 text-primary/30" />
                  </div>
                  <p className="text-[11px] font-bold text-primary/70 uppercase tracking-widest mb-2">AI Summary</p>
                  <p className="text-sm text-white/70 leading-relaxed" dir={isAr(status.summary) ? "rtl" : "ltr"}>
                    {status.summary}
                  </p>
                </div>
              )}

              {/* Anchor groups */}
              {groups.length > 0 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white">Anchor Products &amp; Recommendations</h3>
                    <p className="text-sm text-white/35 mt-1">
                      {groups.length} anchors · {totalRecs} recommendations total
                    </p>
                  </div>
                  <div className="space-y-4">
                    {groups.map((group, i) => (
                      <AnchorGroupCard key={i} group={group} currencySymbol={status.currencySymbol} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Share CTA */}
              <div className="relative bg-gradient-to-br from-primary/10 via-violet-500/8 to-indigo-500/5 border border-primary/15 rounded-3xl p-8 text-center overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl" />
                <div className="relative">
                  <ArrowUpRight className="h-6 w-6 text-primary/50 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1.5">Share this report</h3>
                  <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">
                    This analysis has a unique link — share it with your team or clients.
                  </p>
                  {storeId && <CopyReportButton storeId={storeId} />}
                </div>
              </div>
            </div>
          );
        })()}
      </main>
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
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-sm font-semibold text-white transition-all shadow-lg shadow-primary/25">
          <ExternalLink className="h-4 w-4" />View Full Report
        </button>
      </Link>
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-semibold text-white hover:bg-white/[0.09] transition-all"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Report Link"}
      </button>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/[0.09] transition-all"
      >
        <RefreshCw className="h-4 w-4" />New Analysis
      </button>
    </div>
  );
}
