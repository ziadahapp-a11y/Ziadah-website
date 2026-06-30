import {
  Zap,
  Activity,
  Database,
  Globe,
  Bell,
  LineChart,
  Users,
  Filter,
  Lock,
  Workflow,
  Radio,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Plug,
} from "lucide-react";
import type { ReactNode } from "react";

type Bilingual = { ar: string; en: string };
type TFn = <T,>(values: { ar: T; en: T }) => T;

export type FeatureItem = {
  slug: string;
  Icon: React.ComponentType<{ className?: string }>;
  groupSlug: string;
  title: Bilingual;
  desc: Bilingual;
  mockup: (t: TFn) => ReactNode;
  dedicatedRoute?: string;
};

export type FeatureGroupDef = {
  slug: string;
  title: Bilingual;
};

export const FEATURE_GROUPS: FeatureGroupDef[] = [
  { slug: "core", title: { ar: "محرّك الأحداث الأساسي", en: "Core event engine" } },
  { slug: "stores", title: { ar: "إدارة المتاجر والقنوات", en: "Stores & channels" } },
  { slug: "automation", title: { ar: "الأتمتة والتدفقات", en: "Automation & workflows" } },
  { slug: "monitoring", title: { ar: "المتابعة والذكاء", en: "Monitoring & intelligence" } },
  { slug: "security", title: { ar: "الفريق والأمان", en: "Team & security" } },
  { slug: "commerce", title: { ar: "تجارة ومدفوعات", en: "Commerce & payments" } },
];

export const FEATURES: FeatureItem[] = [
  // ─── Core event engine ───────────────────────────────────────
  {
    slug: "real-time-event-routing",
    Icon: Zap,
    groupSlug: "core",
    title: { ar: "توجيه أحداث لحظي", en: "Real-time event routing" },
    desc: {
      ar: "كل عملية تصير في متجرك — زيارة، إضافة للسلة، شراء — توصل لمنصات إعلاناتك فوراً وبدون ما يضيع منها شي.",
      en: "Server-to-server delivery under 50ms, with smart retry logic and a durable queue.",
    },
    mockup: (t) => (
      <div className="font-mono text-xs num-ltr space-y-1.5">
        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded-md border border-white/8">
          <span className="text-green-300">POST /events/purchase</span>
          <span className="text-emerald-400">200 OK · 12ms</span>
        </div>
        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded-md border border-white/8">
          <span className="text-green-300">POST /events/add_to_cart</span>
          <span className="text-emerald-400">200 OK · 18ms</span>
        </div>
        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded-md border border-white/8">
          <span className="text-green-300">POST /events/initiate_checkout</span>
          <span className="text-emerald-400">200 OK · 14ms</span>
        </div>
      </div>
    ),
  },
  {
    slug: "event-match-quality",
    Icon: Activity,
    groupSlug: "core",
    title: { ar: "جودة مطابقة الأحداث", en: "Event match quality (EMQ)" },
    desc: {
      ar: "اعرف قد إيش بيانات عملائك مطابقة في كل منصة إعلانية، عشان إعلاناتك توصل للناس الصح وتجيب نتائج أحسن.",
      en: "Real-time EMQ per platform with a per-signal breakdown (email, phone, IP, click ID).",
    },
    mockup: (t) => (
      <div className="space-y-2.5">
        <div className="flex justify-between items-end">
          <span className="text-xs font-medium text-zinc-300">{t({ ar: "حدث الشراء", en: "Purchase EMQ" })}</span>
          <span className="text-xl font-bold text-emerald-400 num-ltr">8.4/10</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-400 w-[84%] h-full rounded-full" />
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-[10px] text-zinc-400 num-ltr">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center">em ✓</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center">ph ✓</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center">ip ✓</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center">fbc ✓</span>
        </div>
      </div>
    ),
  },
  {
    slug: "data-enrichment",
    Icon: Globe,
    groupSlug: "core",
    dedicatedRoute: "/data-enrichment",
    title: { ar: "إثراء البيانات", en: "Data enrichment" },
    desc: {
      ar: "نكمّل بيانات كل عملية بمعلومات إضافية تلقائياً، عشان ترفع جودة المطابقة وتطلع نتائج إعلاناتك أدق.",
      en: "Geo IP, email normalization, SHA-256 hashing, and session unification to lift match rates.",
    },
    mockup: (t) => (
      <div className="flex items-center justify-between text-xs text-zinc-400 gap-2">
        <div className="px-2.5 py-1.5 bg-white/[0.04] rounded-md border border-white/8">{t({ ar: "خام", en: "Raw" })}</div>
        <div className="h-[1px] flex-1 bg-white/10" />
        <div className="px-2.5 py-1.5 bg-green-500/15 text-green-300 rounded-md border border-green-500/30">{t({ ar: "إثراء", en: "Enrich" })}</div>
        <div className="h-[1px] flex-1 bg-white/10" />
        <div className="px-2.5 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-md border border-emerald-500/30">{t({ ar: "تسليم", en: "Deliver" })}</div>
      </div>
    ),
  },

  // ─── Stores & channels ───────────────────────────────────────
  {
    slug: "multi-store-management",
    Icon: Database,
    groupSlug: "stores",
    title: { ar: "إدارة متعددة المتاجر", en: "Multi-store management" },
    desc: {
      ar: "تحكم بكل متاجرك على زد من مكان واحد بدل ما تنقّل بين كل متجر.",
      en: "Centralize pixel config across your Zid stores — with Sandbox and production environments.",
    },
    mockup: (t) => (
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: t({ ar: "متجر السعودية", en: "Saudi Store" }), status: t({ ar: "نشط", en: "Active" }) },
          { name: t({ ar: "متجر الإمارات", en: "UAE Store" }), status: t({ ar: "نشط", en: "Active" }) },
          { name: t({ ar: "متجر الكويت", en: "Kuwait Store" }), status: t({ ar: "نشط", en: "Active" }) },
          { name: "Sandbox", status: t({ ar: "اختبار", en: "Testing" }) },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/8 p-2.5 rounded-md flex flex-col gap-1">
            <span className="text-[10px] text-zinc-400">{s.name}</span>
            <span className="text-xs font-bold text-emerald-400">{s.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "ad-channel-management",
    Icon: Radio,
    groupSlug: "stores",
    title: { ar: "إدارة قنوات الإعلانات", en: "Ad channel management" },
    desc: {
      ar: "اربط Meta و TikTok و Snap عبر معرّف البكسل ورمز وصول Conversions API، وتحكم بكل قناة لحالها.",
      en: "Connect Meta, TikTok, and Snap via Pixel ID and Conversions API access token — with independent settings per channel.",
    },
    mockup: (t) => (
      <div className="space-y-1.5">
        {[
          { name: "Meta CAPI", state: t({ ar: "متصل", en: "Connected" }), soon: false },
          { name: "TikTok Events API", state: t({ ar: "متصل", en: "Connected" }), soon: false },
          { name: "Snap CAPI", state: t({ ar: "متصل", en: "Connected" }), soon: false },
          { name: "Google Enhanced", state: t({ ar: "قريباً", en: "Soon" }), soon: true },
        ].map((c) => (
          <div key={c.name} className="flex justify-between items-center bg-white/[0.04] p-2 rounded-md border border-white/8">
            <span className="text-xs text-zinc-300">{c.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${c.soon ? "bg-amber-500/15 text-amber-300 border-amber-500/30" : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"}`}>{c.state}</span>
          </div>
        ))}
      </div>
    ),
  },

  // ─── Automation & workflows ──────────────────────────────────
  {
    slug: "power-ups",
    Icon: Plug,
    groupSlug: "automation",
    dedicatedRoute: "/power-ups",
    title: { ar: "الإضافات (Power-Ups)", en: "Power-Ups" },
    desc: {
      ar: "أكثر من 18 إضافة تشغّلها بضغطة زر عشان توصل بياناتك أكثر وترفع دقة تتبعك، كل وحدة تفعّلها وقت ما تحتاجها.",
      en: "18 toggleable add-ons: ad-blocker bypass, Cookie Keeper, bot detection, Click ID restorer, POAS, and more.",
    },
    mockup: (t) => (
      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
        {[
          { name: t({ ar: "Ad-Blocker Bypass", en: "Ad-Blocker Bypass" }), on: true },
          { name: t({ ar: "Cookie Keeper", en: "Cookie Keeper" }), on: true },
          { name: t({ ar: "Bot Detection", en: "Bot Detection" }), on: true },
          { name: t({ ar: "GEO Headers", en: "GEO Headers" }), on: true },
          { name: t({ ar: "Click ID Restorer", en: "Click ID Restorer" }), on: false },
          { name: t({ ar: "User Agent Parser", en: "User Agent Parser" }), on: true },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between bg-white/[0.04] p-1.5 rounded-md border border-white/8">
            <span className="text-zinc-300 truncate">{p.name}</span>
            <span className={`w-6 h-3 rounded-full flex items-center ${p.on ? "bg-violet-500" : "bg-zinc-700"}`}>
              <span className={`w-2.5 h-2.5 rounded-full bg-white ${p.on ? "ml-auto mr-0.5" : "ml-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "event-workflows",
    Icon: Workflow,
    groupSlug: "automation",
    title: { ar: "تدفقات أحداث آلية", en: "Event workflows" },
    desc: {
      ar: "حدّد الخطوات اللي تبي تتابعها — زيارة، سلة، سداد، شراء — وراصد يرسلها لمنصاتك تلقائياً.",
      en: "Model Purchase, Add to Cart, Initiate Checkout, Order Complete, and more — with per-event field mapping.",
    },
    mockup: (t) => (
      <div className="flex items-center gap-1.5 text-[10px] flex-wrap">
        {[
          t({ ar: "زيارة", en: "View" }),
          t({ ar: "سلة", en: "Cart" }),
          t({ ar: "سداد", en: "Checkout" }),
          t({ ar: "شراء", en: "Purchase" }),
        ].map((label, i, arr) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="px-2 py-1 bg-green-500/15 text-green-300 rounded border border-green-500/30">{label}</span>
            {i < arr.length - 1 && <span className="text-zinc-500">→</span>}
          </span>
        ))}
      </div>
    ),
  },
  {
    slug: "event-rules-filters",
    Icon: Filter,
    groupSlug: "automation",
    title: { ar: "قواعد ومرشحات الأحداث", en: "Event rules & filters" },
    desc: {
      ar: "حط قواعدك الخاصة على البيانات اللي ترسلها — مثلاً ترسل بس الطلبات فوق 100 ريال، أو تستبعد طلبات موظفينك.",
      en: "Build custom logic — e.g. 'only send events with value > 100 SAR' or 'exclude staff IPs'.",
    },
    mockup: (t) => (
      <div className="space-y-1.5 text-[11px]">
        <div className="flex items-center gap-2 bg-white/[0.04] p-2 rounded-md border border-white/8">
          <span className="text-zinc-400">{t({ ar: "إذا", en: "IF" })}</span>
          <span className="px-1.5 py-0.5 bg-green-500/15 text-green-300 rounded font-mono">value &gt; 100</span>
          <span className="text-zinc-400">{t({ ar: "أرسل لـ", en: "send to" })}</span>
          <span className="text-emerald-400 font-semibold">Meta + TikTok</span>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] p-2 rounded-md border border-white/8">
          <span className="text-zinc-400">{t({ ar: "استبعد", en: "EXCLUDE" })}</span>
          <span className="px-1.5 py-0.5 bg-rose-500/15 text-rose-300 rounded font-mono">ip in staff_list</span>
        </div>
      </div>
    ),
  },

  // ─── Monitoring & intelligence ───────────────────────────────
  {
    slug: "live-event-stream",
    Icon: Radio,
    groupSlug: "monitoring",
    title: { ar: "بث الأحداث المباشر", en: "Live event stream" },
    desc: {
      ar: "شاشة حية تشوف فيها كل عملية تصير في متجرك لحظة بلحظة وحالة وصولها لمنصات الإعلانات.",
      en: "Live feed of every event entering the system with status, latency, EMQ, and full payload.",
    },
    mockup: (t) => (
      <div className="font-mono text-[10px] text-zinc-300 num-ltr space-y-1">
        {["Purchase · SAR 349 · 89/100", "ATC · SAR 120 · 85/100", "Lead · — · 78/100"].map((row, i) => (
          <div key={i} className="flex items-center gap-2 p-1.5 bg-white/[0.04] rounded-md border border-white/8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {row}
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "smart-alerts",
    Icon: Bell,
    groupSlug: "monitoring",
    title: { ar: "تنبيهات ذكية", en: "Smart alerts" },
    desc: {
      ar: "ينبّهك على Slack أو SMS أو الإيميل أول ما يصير خلل في التتبع أو ينقص عدد العمليات عن المعتاد.",
      en: "Slack, SMS, and email alerts when EMQ drops, delivery fails, or event volume falls below baseline.",
    },
    mockup: (t) => (
      <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-md flex gap-2">
        <Bell className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
        <p className="text-xs text-rose-200">
          {t({
            ar: "تنبيه: Meta API يرجّع 500. حوّلنا للحدث لصف إعادة المحاولة.",
            en: "Alert: Meta API returning 500s. Falling back to retry queue.",
          })}
        </p>
      </div>
    ),
  },
  {
    slug: "reporting-attribution",
    Icon: LineChart,
    groupSlug: "monitoring",
    dedicatedRoute: "/reports",
    title: { ar: "تقارير وإسناد متقدم", en: "Advanced reporting & attribution" },
    desc: {
      ar: "تقارير واضحة تقارن أداء قنواتك الإعلانية وتبيّن لك عائد إعلاناتك (ROAS) والطلبات اللي استرجعها لك راصد.",
      en: "Before/after ROAS timeline, channel comparison, UTM tracking, and recovered-conversions table per channel.",
    },
    mockup: (t) => (
      <div className="flex items-end gap-1.5 h-14 pt-2">
        {[40, 60, 45, 80, 70, 100].map((h, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-green-500/40 to-green-400 rounded-t-sm" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },

  // ─── Team & security ─────────────────────────────────────────
  {
    slug: "team-permissions",
    Icon: Users,
    groupSlug: "security",
    title: { ar: "صلاحيات الفرق", en: "Team permissions" },
    desc: {
      ar: "أضف فريقك وحدد صلاحية كل واحد — مين يدير ومين يطّلع بس — لكل متجر وقناة على حدة.",
      en: "Owner, Admin, Analyst, and Viewer roles — scoped per store and per channel.",
    },
    mockup: (t) => (
      <div className="space-y-1.5">
        {[
          { name: t({ ar: "مالك", en: "Owner" }), badge: t({ ar: "كامل", en: "Full" }) },
          { name: t({ ar: "محلل", en: "Analyst" }), badge: t({ ar: "قراءة", en: "Read" }) },
        ].map((u) => (
          <div key={u.name} className="flex items-center justify-between bg-white/[0.04] p-2 rounded-md border border-white/8">
            <span className="text-xs text-zinc-300">{u.name}</span>
            <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded text-zinc-200">{u.badge}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "privacy-compliance",
    Icon: Lock,
    groupSlug: "security",
    title: { ar: "خصوصية وامتثال", en: "Privacy & compliance" },
    desc: {
      ar: "بيانات عملائك مشفّرة ومحمية ومتوافقة مع أنظمة حماية البيانات في المملكة و GDPR، وخوادمنا إقليمية.",
      en: "SHA-256 hashing of PII before transmission, full GDPR & Saudi PDPL compliance, and regional servers.",
    },
    mockup: (t) => (
      <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
        {["SHA-256", "GDPR", "PDPL", t({ ar: "خوادم إقليمية", en: "Regional servers" })].map((tag) => (
          <span key={tag} className="px-2 py-1 bg-green-500/15 text-green-300 border border-green-500/30 rounded-full font-medium">{tag}</span>
        ))}
      </div>
    ),
  },
  {
    slug: "unified-customer-identity",
    Icon: Sparkles,
    groupSlug: "security",
    title: { ar: "هوية العميل الموحدة", en: "Unified customer identity" },
    desc: {
      ar: "راصد يعرف إنه نفس العميل حتى لو دخل مرة من جواله ومرة من لابتوبه، عشان إسناد مبيعاتك يطلع أدق.",
      en: "Stitch events across sessions and devices into one customer identity to improve attribution quality.",
    },
    mockup: (t) => (
      <div className="text-[11px] text-zinc-300 num-ltr space-y-1">
        <div className="bg-white/[0.04] p-1.5 rounded-md border border-white/8">📱 mobile-session · 09:14</div>
        <div className="bg-white/[0.04] p-1.5 rounded-md border border-white/8">💻 desktop-session · 21:42</div>
        <div className="text-center text-emerald-400">↓ {t({ ar: "نفس العميل", en: "same customer" })}</div>
      </div>
    ),
  },

  // ─── Commerce & payments ─────────────────────────────────────
  {
    slug: "multi-stage-commerce-tracking",
    Icon: ShoppingBag,
    groupSlug: "commerce",
    title: { ar: "تتبع المتاجر متعدد المراحل", en: "Multi-stage commerce tracking" },
    desc: {
      ar: "شوف رحلة الشراء كاملة بالأرقام — كم واحد تصفّح، كم أضاف للسلة، وكم أتمّ الطلب — لكل منصة.",
      en: "Full shopper journey tracking — from view_product to add_to_cart to purchase — for every platform.",
    },
    mockup: (t) => (
      <div className="text-[11px] num-ltr space-y-1.5">
        {[
          { e: "view_product", v: "12,341" },
          { e: "add_to_cart", v: "3,422" },
          { e: "initiate_checkout", v: "1,205" },
          { e: "purchase", v: "642" },
        ].map((r) => (
          <div key={r.e} className="flex justify-between bg-white/[0.04] p-1.5 rounded-md border border-white/8">
            <span className="text-zinc-400">{r.e}</span>
            <span className="text-white font-bold">{r.v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "purchase-recovery",
    Icon: CreditCard,
    groupSlug: "commerce",
    title: { ar: "استعادة طلبات الشراء", en: "Purchase recovery" },
    desc: {
      ar: "نسترجع لك طلبات الشراء المؤكدة من متجرك مباشرة، حتى لو ضاع تتبعها لحظة الدفع — فلا تخسر أي عملية.",
      en: "Recover confirmed purchases directly from the store database — even if the pixel fails at checkout.",
    },
    mockup: (t) => (
      <div className="text-[11px] text-zinc-300 space-y-1">
        <div className="flex justify-between bg-white/[0.04] p-1.5 rounded-md border border-white/8">
          <span>{t({ ar: "طلبات مستعادة (30 يوم)", en: "Orders recovered (30d)" })}</span>
          <span className="text-emerald-400 font-bold num-ltr">+312</span>
        </div>
        <div className="flex justify-between bg-white/[0.04] p-1.5 rounded-md border border-white/8">
          <span>{t({ ar: "قيمة مستعادة", en: "Value recovered" })}</span>
          <span className="text-emerald-400 font-bold num-ltr">SAR 41,820</span>
        </div>
      </div>
    ),
  },
];

export function getFeatureBySlug(slug: string): FeatureItem | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

export function getFeaturesByGroup(groupSlug: string): FeatureItem[] {
  return FEATURES.filter((f) => f.groupSlug === groupSlug);
}

export function getGroup(slug: string): FeatureGroupDef | undefined {
  return FEATURE_GROUPS.find((g) => g.slug === slug);
}

// Highlight features shown in the Navbar dropdown (merchant-focused subset).
// The full list still lives on the /features page.
export const FEATURED_SLUGS = [
  "real-time-event-routing",
  "multi-store-management",
  "ad-channel-management",
  "data-enrichment",
  "power-ups",
  "reporting-attribution",
  "multi-stage-commerce-tracking",
  "purchase-recovery",
];

export function getFeaturedItems(): FeatureItem[] {
  return FEATURED_SLUGS.map(getFeatureBySlug).filter((f): f is FeatureItem => Boolean(f));
}

export function featureHref(f: FeatureItem): string {
  return f.dedicatedRoute ?? `/features/${f.slug}`;
}
