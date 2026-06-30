import { useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Heart,
  Store,
  LayoutGrid,
  Wand2,
  Combine,
  CreditCard,
  LineChart,
  Activity,
  HelpCircle,
  Tag,
  Zap,
  Gift,
  BadgeCheck,
  MessageCircle,
  Repeat2,
  BarChart3,
  Timer,
  Star,
  Check,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { useMeetingBooking } from "@/components/MeetingBookingProvider";
import SEO from "@/components/SEO";
import WidgetsShowcaseSection from "@/components/WidgetsShowcaseSection";
import PlatformModal from "@/components/PlatformModal";
import { OrganizationSchema, SoftwareAppSchema, WebSiteSchema } from "@/components/JsonLd";

const ZID_APP_URL = "https://apps.zid.sa/application/1826";
const ENGINE_ICON = "/favicon-icon.png";

// Real merchant logos shown in the trust marquee below the hero.
const storeLogos = [
  { name: "BestClean", src: "/logos/bestclean.png" },
  { name: "Reeq Alnahl", src: "/logos/reeq-alnahl.png" },
  { name: "Altamimi", src: "/logos/altamimi.png" },
  { name: "ZUM", src: "/logos/zum.png" },
  { name: "CB", src: "/logos/cb.png" },
  { name: "12 CUPS", src: "/logos/12cups.png" },
  { name: "RIBAL", src: "/logos/ribal.png" },
  { name: "SHFT", src: "/logos/shft.png" },
  { name: "FOR HER", src: "/logos/for-her.png" },
  { name: "Abaq Alghim", src: "/logos/abaq-alghim.png" },
  { name: "FABIAN", src: "/logos/fabian.png" },
  { name: "Natural Touch", src: "/logos/natural-touch.png" },
  { name: "image_223", src: "/logos/image-223.png" },
  { name: "Mazeed", src: "/logos/mazeed.png" },
  { name: "AlSalman Oud", src: "/logos/alsalman-oud.png" },
  { name: "PC Palace", src: "/logos/pc-palace.png" },
];

type Bi<T> = { ar: T; en: T };

// One step in Ziadah's own problem→solution story. Renders an avatar with a
// connecting line down to the next step, a brand label, then the body. This is
// our framed narrative — not a real social post — so it carries no handle,
// timestamp, or engagement counts that would imply otherwise.
function ThreadTweet({
  name,
  step,
  isLast = false,
  children,
}: {
  name: string;
  step: string;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <img src={ENGINE_ICON} alt="" aria-hidden="true" className="w-10 h-10 rounded-full object-cover" />
        {!isLast && <div className="w-0.5 flex-1 bg-white/15 mt-1" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-6"}`}>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-bold text-white">{name}</span>
          <span className="text-zinc-500 num-ltr">{step}</span>
        </div>
        <div className="mt-1.5 text-[15px] leading-relaxed text-zinc-100">{children}</div>
      </div>
    </div>
  );
}

// Small circular progress "donut" shown beside each metric's score.
function ScoreRing({ score, color }: { score: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100));
  return (
    <span className="relative inline-block w-5 h-5 shrink-0 align-middle">
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(${color} ${pct}%, ${color}26 0)` }}
      />
      <span className="absolute inset-[3px] rounded-full bg-white" />
    </span>
  );
}

// Hero "offer widget" — a live preview of the upsell UI Ziadah injects into a
// store: a buy-more-save-more tier selector beside a frequently-bought-together
// set. This is literally the product output, so it doubles as the hero visual
// and a concrete demo of what shoppers see; the before/after cards below show
// the average-order-value payoff.
const OFFER_TIERS: {
  qty: Bi<string>;
  note: Bi<string>;
  price: number;
  was?: number;
  off?: number;
  selected?: boolean;
}[] = [
  { qty: { ar: "اشترِ 1", en: "Buy 1" }, note: { ar: "بدون خصم", en: "No discount" }, price: 49 },
  { qty: { ar: "اشترِ 2", en: "Buy 2" }, note: { ar: "خصم 20%", en: "20% off" }, price: 79, was: 98, off: 20 },
  {
    qty: { ar: "اشترِ 3", en: "Buy 3" },
    note: { ar: "خصم 30% + شحن مجاني", en: "30% off + free shipping" },
    price: 103,
    was: 147,
    off: 30,
    selected: true,
  },
];

const BUNDLE_ITEMS: {
  emoji: string;
  name: Bi<string>;
  rating: string;
  reviews: string;
  price: number;
  was?: number;
}[] = [
  { emoji: "👕", name: { ar: "قميص فلانيل رجالي", en: "Men's Flannel Shirt" }, rating: "4.95", reviews: "4,680", price: 240 },
  {
    emoji: "👟",
    name: { ar: "حذاء Loewy On Running Cloud", en: "Loewy On Running Cloud" },
    rating: "4.95",
    reviews: "4,984",
    price: 2451,
    was: 3154,
  },
];

function HeroOffer({ engineLabel }: { engineLabel: string }) {
  const { lang } = useLanguage();
  const tr = <T,>(v: Bi<T>): T => v[lang];
  const riyal = lang === "ar" ? "ر.س" : "SAR";
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="relative w-full mx-auto">
      {/* soft emerald glow behind the widget */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-violet-500/20 blur-3xl pointer-events-none" />

      <div className="rounded-3xl border border-white/10 bg-[#0b0f14] p-3 shadow-2xl shadow-violet-950/40">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {/* LEFT — buy more, save more tiers */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <h3 className="mb-2.5 text-end text-[13px] font-bold text-white">
              {tr({ ar: "اشترِ أكثر ووفّر أكثر", en: "Buy more, save more" })}
            </h3>
            <div className="space-y-2">
              {OFFER_TIERS.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                  className={`relative flex items-center gap-2.5 rounded-xl border p-2.5 ${
                    tier.selected
                      ? "border-violet-400/60 bg-violet-500/[0.12] ring-1 ring-violet-400/40"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  {/* radio */}
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      tier.selected ? "border-violet-400 bg-violet-400" : "border-white/25"
                    }`}
                  >
                    {tier.selected && <span className="h-1.5 w-1.5 rounded-full bg-[#0b0f14]" />}
                  </span>

                  <div className="flex-1 text-end">
                    <div className="text-[13px] font-bold text-white">{tr(tier.qty)}</div>
                    <div className="text-[11px] text-zinc-400">{tr(tier.note)}</div>
                  </div>

                  <div className="text-end num-ltr leading-tight">
                    {tier.was != null && (
                      <div className="text-[10px] text-zinc-500 line-through">{fmt(tier.was)}</div>
                    )}
                    <div className="text-[13px] font-extrabold text-white">
                      {fmt(tier.price)} <span className="text-[9px] font-semibold text-zinc-400">{riyal}</span>
                    </div>
                  </div>

                  {tier.off != null && (
                    <span className="absolute -top-2 start-2 rounded-md bg-violet-500 px-1.5 py-0.5 text-[10px] font-extrabold text-[#0b0f14] num-ltr">
                      -{tier.off}%
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl border border-violet-400/30 bg-violet-500/10 px-2.5 py-1.5 text-[11px] font-bold text-violet-300">
              <Truck className="h-3.5 w-3.5" />
              {tr({ ar: "أفضل قيمة للعملاء — شحن مجاني", en: "Best value — free shipping" })}
            </div>
          </div>

          {/* RIGHT — frequently bought together */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <h3 className="mb-2.5 text-end text-[13px] font-bold text-white">
              {tr({ ar: "منتجات يحبّها العملاء معاً", en: "Products customers love together" })}
            </h3>
            <div className="space-y-2">
              {BUNDLE_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-lg" aria-hidden="true">
                    {item.emoji}
                  </span>

                  <div className="min-w-0 flex-1 text-end">
                    <div className="truncate text-[12px] font-bold text-white">{tr(item.name)}</div>
                    <div className="mt-0.5 flex items-center justify-end gap-1 num-ltr">
                      <span className="text-[10px] text-zinc-400">
                        {fmt(Number(item.reviews.replace(/,/g, "")))} {tr({ ar: "تقييم", en: "reviews" })}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">{item.rating}</span>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="mt-0.5 num-ltr text-end">
                      {item.was != null && (
                        <span className="me-1 text-[10px] text-zinc-500 line-through">{fmt(item.was)}</span>
                      )}
                      <span className="text-[12px] font-extrabold text-white">
                        {fmt(item.price)} <span className="text-[9px] font-semibold text-zinc-400">{riyal}</span>
                      </span>
                    </div>
                  </div>

                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500 text-[#0b0f14]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              className="mt-2.5 w-full rounded-xl bg-violet-500 px-3 py-2 text-[12px] font-extrabold text-[#0b0f14] transition-colors hover:bg-violet-400"
            >
              {tr({ ar: "اشترِ الطقم كاملاً", en: "Buy the full set" })}
              {" — "}
              <span className="num-ltr">2,691 {riyal}</span>
            </button>
          </div>
        </div>

        {/* live engine badge */}
        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300 ring-1 ring-violet-400/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            {engineLabel}
            <img src={ENGINE_ICON} alt="" className="h-3.5 w-3.5 rounded-[3px] object-cover" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomeTrackflow() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  function t<T>(v: Bi<T>): T {
    return v[lang];
  }
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const { openMeetingBooking } = useMeetingBooking();
  const [revenue, setRevenue] = useState(50000);
  const [activeStep, setActiveStep] = useState(0);
  // Primary CTA is platform-neutral: opening this modal lets the merchant pick
  // Zid or Salla, so Salla merchants are not excluded by Zid-only wording.
  const [platformOpen, setPlatformOpen] = useState(false);

  const logosMarqueeTrackRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosMarqueeTrackRef);

  // Aggregate proof numbers across all stores running Ziadah.
  const stats = [
    { value: "+1,500", label: t({ ar: "متجر", en: "Stores" }) },
    { value: "+20M", label: t({ ar: "⃁ مبيعات إضافية", en: "⃁ in extra sales" }) },
    { value: "+200K", label: t({ ar: "منتج تم شراؤه", en: "Products purchased" }) },
    { value: "+40M", label: t({ ar: "ظهور ناجح", en: "Successful impressions" }) },
  ];

  // Recommendation revenue uplift: Ziadah lifts AOV/conversion, so extra revenue
  // scales with the store's monthly revenue. Conservative blended uplift ≈ 20%.
  const extraZiadah = Math.round(revenue * 0.2);
  const extraGeneric = Math.round(revenue * 0.07);
  const monthlyExtra = extraZiadah;
  const annualExtra = monthlyExtra * 12;
  const maxExtra = 500000 * 0.2;

  const engineLabel = t({ ar: "محرّك زيادة", en: "Ziadah Engine" });

  const placements = [
    { name: { ar: "صفحة المنتج", en: "Product page" }, Icon: Store, color: "#7c3aed" },
    { name: { ar: "السلة", en: "Cart" }, Icon: ShoppingCart, color: "#0ea5e9" },
    { name: { ar: "صفحة الدفع", en: "Checkout" }, Icon: CreditCard, color: "#6366f1" },
    { name: { ar: "الرئيسية", en: "Home page" }, Icon: LayoutGrid, color: "#f59e0b" },
    { name: { ar: "التصنيفات", en: "Category" }, Icon: Tag, color: "#ec4899" },
    { name: { ar: "صفحة الشكر", en: "Thank-you" }, Icon: Gift, color: "#14b8a6" },
  ];

  const storePlatforms = [
    { name: t({ ar: "زد", en: "Zid" }), brand: "Zid", color: "#7c3aed", soon: false },
    { name: t({ ar: "سلة", en: "Salla" }), brand: "Salla", color: "#0ea5e9", soon: false },
    { name: t({ ar: "ووردبريس", en: "WordPress" }), brand: "WordPress", color: "#6366f1", soon: true },
    { name: t({ ar: "متجر مخصص", en: "Custom store" }), brand: "Custom", color: "#f59e0b", soon: true },
  ];

  // Hero dashboard rows: per-metric scores as the shopper journey looks before
  // vs after Ziadah's recommendations go live.
  const beforeRows = [
    { metric: t({ ar: "متوسط قيمة الطلب", en: "Avg. order value" }), score: 3.0, badge: t({ ar: "منخفض", en: "Low" }), tone: "error" as const },
    { metric: t({ ar: "البيع المتقاطع", en: "Cross-sell rate" }), score: 2.6, badge: t({ ar: "ضعيف", en: "Weak" }), tone: "error" as const },
    { metric: t({ ar: "معدّل إضافة منتج", en: "Add-on rate" }), score: 3.2, badge: t({ ar: "منخفض", en: "Low" }), tone: "warn" as const },
  ];
  const afterRows = [
    { metric: t({ ar: "متوسط قيمة الطلب", en: "Avg. order value" }), score: 9.1, badge: t({ ar: "ممتاز", en: "Great" }) },
    { metric: t({ ar: "البيع المتقاطع", en: "Cross-sell rate" }), score: 8.6, badge: t({ ar: "قوي", en: "Strong" }) },
    { metric: t({ ar: "معدّل إضافة منتج", en: "Add-on rate" }), score: 8.9, badge: t({ ar: "ممتاز", en: "Great" }) },
  ];

  const trustItems = [
    { Icon: Timer, label: t({ ar: "تركيب بنقرة وحدة بدون أي كود", en: "One-click install, no code" }) },
    { Icon: Sparkles, label: t({ ar: "تجربة مجانية 7 أيام — بدون بطاقة", en: "7-day free trial — no card" }) },
    { Icon: Heart, label: t({ ar: "دعم عربي كامل", en: "Full Arabic support" }) },
  ];

  const steps = [
    {
      num: "01",
      title: t({ ar: "فعّل زيادة على متجرك", en: "Activate Ziadah on your store" }),
      desc: t({ ar: "تطبيق رسمي لزد وسلة — تثبيت بنقرة وحدة، بدون أي كود أو مطوّر.", en: "Official app for Zid and Salla — installs in one click, with zero code or developers." }),
      stat: t({ ar: "نقرة وحدة", en: "1 click" }),
      statLabel: t({ ar: "وقت التثبيت", en: "Install time" }),
      Icon: Zap,
      mockup: (
        <div className="space-y-2.5 num-ltr">
          {[
            { label: "Zid Store · saudi.com", state: t({ ar: "متصل", en: "connected" }), color: "#7c3aed", soon: false },
            { label: "Salla Store · uae.com", state: t({ ar: "متصل", en: "connected" }), color: "#0ea5e9", soon: false },
            { label: "WooCommerce", state: t({ ar: "قريباً", en: "soon" }), color: "#6366f1", soon: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-zinc-300">{s.label}</span>
              </div>
              <span className={`text-[10px] font-bold ${isAr ? "" : "uppercase tracking-widest"} ${s.soon ? "text-amber-400" : "text-violet-400"}`}>{s.state}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "02",
      title: t({ ar: "اختر أماكن العرض", en: "Pick your placements" }),
      desc: t({ ar: "فعّل الودجت في صفحة المنتج، السلة، الدفع، الرئيسية، والتصنيفات — كل مكان بضغطة.", en: "Enable widgets on the product page, cart, checkout, home, and category pages — each with a toggle." }),
      stat: t({ ar: "+5 أماكن", en: "5+ spots" }),
      statLabel: t({ ar: "أماكن عرض جاهزة", en: "Ready-made placements" }),
      Icon: LayoutGrid,
      mockup: (
        <div className="grid grid-cols-2 gap-2 num-ltr">
          {[
            { name: t({ ar: "صفحة المنتج", en: "Product page" }), color: "#7c3aed" },
            { name: t({ ar: "السلة", en: "Cart" }), color: "#0ea5e9" },
            { name: t({ ar: "الدفع", en: "Checkout" }), color: "#6366f1" },
            { name: t({ ar: "التصنيفات", en: "Category" }), color: "#ec4899", soon: true },
          ].map((c) => (
            <div key={c.name} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/8">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className={`text-[10px] font-bold ${isAr ? "" : "uppercase tracking-widest"} ${c.soon ? "text-amber-400" : "text-violet-400"}`}>{c.soon ? t({ ar: "قريباً", en: "soon" }) : t({ ar: "مفعّل", en: "live" })}</span>
              </div>
              <div className="text-xs text-zinc-200 font-medium">{c.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "03",
      title: t({ ar: "الذكاء يتعلّم كتالوجك وعملاءك", en: "The AI learns your catalog & customers" }),
      desc: t({ ar: "زيادة تحلّل سلوك التصفّح، الطلبات السابقة، والمنتجات اللي تُشترى معاً — وتبني اقتراحات شخصية لكل عميل.", en: "Ziadah analyzes browsing, past orders, and frequently-bought-together items — then builds personalized suggestions for each shopper." }),
      stat: t({ ar: "آلي", en: "Automatic" }),
      statLabel: t({ ar: "بدون إعداد يدوي", en: "No manual setup" }),
      Icon: Sparkles,
      mockup: (
        <div className="space-y-2 num-ltr">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/8 text-[11px] text-zinc-400 font-mono">{t({ ar: "سلوك العميل", en: "behavior" })}</span>
            <span className="text-zinc-600">→</span>
            <span className="px-2.5 py-1.5 rounded-md bg-purple-500/15 border border-purple-400/30 text-[11px] text-purple-300 font-mono">{t({ ar: "تحليل", en: "analyze" })}</span>
            <span className="text-zinc-600">→</span>
            <span className="px-2.5 py-1.5 rounded-md bg-violet-500/15 border border-violet-400/30 text-[11px] text-violet-300 font-mono">{t({ ar: "اقتراح", en: "recommend" })}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ {t({ ar: "تصفّح", en: "browsing" })}</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ {t({ ar: "طلبات سابقة", en: "past orders" })}</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ {t({ ar: "يُشترى معاً", en: "bought together" })}</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ {t({ ar: "المخزون", en: "inventory" })}</div>
          </div>
        </div>
      ),
    },
    {
      num: "04",
      title: t({ ar: "شاهد نمو السلة والمبيعات", en: "Watch carts & sales grow" }),
      desc: t({ ar: "لوحة لحظية لمتوسط قيمة الطلب، معدّل الإضافة، والإيراد الإضافي — مع تقارير قبل/بعد.", en: "Live dashboard for average order value, add-on rate, and extra revenue — with before/after reporting." }),
      stat: "+35%",
      statLabel: t({ ar: "متوسط نمو قيمة الطلب", en: "Avg. AOV lift" }),
      Icon: TrendingUp,
      mockup: (
        <div className="space-y-3 num-ltr">
          <div className="flex items-end gap-1.5 h-16">
            {[35, 52, 41, 68, 58, 80, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-600/40 to-purple-400" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>{t({ ar: "قبل", en: "before" })}</span>
            <span className="text-violet-400 font-bold">+35% {t({ ar: "قيمة الطلب", en: "AOV" })}</span>
            <span>{t({ ar: "بعد", en: "after" })}</span>
          </div>
        </div>
      ),
    },
  ];

  const pricingPlans = [
    { name: t({ ar: "الانطلاقة", en: "Starter" }), price: 29, orders: t({ ar: "5 نقاط ذكاء/شهر", en: "5 AI points/mo" }), popular: false },
    { name: t({ ar: "النمو", en: "Growth" }), price: 290, orders: t({ ar: "50 نقطة ذكاء/شهر", en: "50 AI points/mo" }), popular: true },
    { name: t({ ar: "الاحترافية", en: "Professional" }), price: 790, orders: t({ ar: "500 نقطة ذكاء/شهر", en: "500 AI points/mo" }), popular: false },
    { name: t({ ar: "الأعمال", en: "Business" }), price: 1990, orders: t({ ar: "5,000 نقطة ذكاء/شهر", en: "5,000 AI points/mo" }), popular: false },
  ];

  const planFeatures = [
    t({ ar: "اقتراحات ومبيعات غير محدودة", en: "Unlimited suggestions & sales" }),
    t({ ar: "كل الودجتات وأماكن العرض", en: "All widgets & placements" }),
    t({ ar: "تجربة مجانية 7 أيام", en: "7-day free trial" }),
    t({ ar: "دعم عربي ولوحة بالعربي", en: "Arabic support & dashboard" }),
  ];

  const faqs = [
    {
      q: t({ ar: "كيف تختلف زيادة عن الاقتراحات الجاهزة في متجري؟", en: "How is Ziadah different from my store's built-in recommendations?" }),
      a: t({
        ar: "الاقتراحات الجاهزة عادة تعرض «الأكثر مبيعاً» للجميع. زيادة تبني اقتراح شخصي لكل عميل بناءً على تصفّحه وسلّته وطلباته السابقة والمنتجات اللي تُشترى معاً — فترتفع نسبة الإضافة ومتوسط قيمة الطلب بشكل واضح.",
        en: "Built-in blocks usually show the same best-sellers to everyone. Ziadah builds a personalized set for each shopper from their browsing, cart, past orders, and frequently-bought-together items — so add-on rate and average order value rise noticeably.",
      }),
    },
    {
      q: t({ ar: "كم بترفع مبيعاتي فعلياً؟", en: "How much will it actually lift my sales?" }),
      a: t({
        ar: "المتاجر اللي تستخدم زيادة تشوف عادة ارتفاع 15–35٪ في متوسط قيمة الطلب خلال أول 30 يوم، لأن كل عميل يشوف منتجات تناسبه فعلاً. النتائج تختلف حسب القطاع وحجم الكتالوج.",
        en: "Stores using Ziadah typically see a 15–35% lift in average order value within the first 30 days, because every shopper sees products that genuinely fit them. Results vary by sector and catalog size.",
      }),
    },
    {
      q: t({ ar: "بيبطّئ متجري؟", en: "Will it slow down my store?" }),
      a: t({
        ar: "لا. الودجت خفيف ويُحمّل بشكل غير متزامن، فما يأثّر على سرعة المتجر أو تجربة التصفّح.",
        en: "No. The widget is lightweight and loads asynchronously, so it doesn't affect your store's speed or the browsing experience.",
      }),
    },
    {
      q: t({ ar: "أحتاج مطوّر للتركيب؟", en: "Do I need a developer to install it?" }),
      a: t({
        ar: "أبداً. على زد وسلة، التثبيت بنقرة وحدة من متجر التطبيقات — تفعّل الودجت وتختار أماكن العرض، وخلصت خلال دقائق.",
        en: "Not at all. On Zid and Salla it's a one-click install from the app market — enable the widget, pick your placements, and you're live in minutes.",
      }),
    },
    {
      q: t({ ar: "تدعم العربية والإنجليزية؟", en: "Does it support Arabic and English?" }),
      a: t({
        ar: "إي. الودجت واللوحة يدعمان العربية والإنجليزية مع اتجاه RTL كامل، وفريق الدعم يردّ بالعربي.",
        en: "Yes. The widget and dashboard support Arabic and English with full RTL, and our support team replies in Arabic.",
      }),
    },
    {
      q: t({ ar: "كم تكلّف؟", en: "How much does it cost?" }),
      a: t({
        ar: "الانطلاقة ⃁29/شهرياً للمتاجر الصغيرة · النمو ⃁290/شهرياً · الاحترافية ⃁790/شهرياً · الأعمال ⃁1,990/شهرياً. كل الباقات فيها تجربة مجانية 7 أيام وشاملة ضريبة القيمة المضافة.",
        en: "Starter ⃁29/mo for small stores · Growth ⃁290/mo · Professional ⃁790/mo · Business ⃁1,990/mo. All plans include a 7-day free trial and are VAT-inclusive.",
      }),
    },
    {
      q: t({ ar: "وش أول خطوة؟", en: "What's the first step?" }),
      a: t({
        ar: "فعّل زيادة من متجر تطبيقات زد. التثبيت بضغطة، وفريقنا يساعدك في الإعداد لو احتجت.",
        en: "Activate Ziadah from the Zid app market. One-click install, with guided setup from our team if you need it.",
      }),
    },
  ];

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <>
      <SEO
        titleAr="زيادة — ارفع متوسط قيمة الطلب بالذكاء الاصطناعي"
        titleEn="Ziadah — Raise your average order value with AI"
        descriptionAr="زيادة تقترح لكل عميل المنتجات المناسبة في صفحة المنتج والسلة والدفع، فترفع متوسط قيمة الطلب ومبيعاتك حتى 35٪. فعّل على زد بنقرة وحدة."
        descriptionEn="Ziadah recommends the right products to every customer across product, cart, and checkout — lifting your average order value and sales by up to 35%. One-click activation on Zid."
        canonical="/"
      />
      <OrganizationSchema />
      <SoftwareAppSchema />
      <WebSiteSchema />
      <div className="tf-home flex flex-col w-full bg-white" dir={isAr ? "rtl" : "ltr"} style={{ minHeight: "100vh" }}>
          {/* HERO */}
          <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4">
            <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />

            <div className="container mx-auto relative max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
                {/* LEFT — copy */}
                <div className="text-center lg:text-start">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 mb-7"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">
                      {t({ ar: "منصة اقتراح المنتجات بالذكاء الاصطناعي", en: "The AI product-recommendation platform" })}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-7 leading-[1.05]"
                  >
                    {isAr ? (
                      <>ارفع متوسط قيمة الطلب ومبيعاتك حتى <span className="whitespace-nowrap">35٪</span></>
                    ) : (
                      <>Raise your average order value and sales by up to <span className="whitespace-nowrap">35%</span></>
                    )}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto lg:mx-0 mb-9 leading-relaxed"
                  >
                    {t({
                      ar: "أغلب زوّار متجرك يشترون منتج واحد ويطلعون. زيادة تعرض لكل عميل المنتجات المناسبة له — في صفحة المنتج، السلة، والدفع — فيضيف أكثر، ويرتفع متوسط قيمة الطلب ومبيعاتك بدون أي إنفاق إعلاني إضافي.",
                      en: "Most of your visitors buy one item and leave. Ziadah shows each shopper the products that fit them — on the product page, cart, and checkout — so they add more, and your average order value and sales climb with no extra ad spend.",
                    })}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
                  >
                    <Button
                      size="lg"
                      onClick={() => setPlatformOpen(true)}
                      className="w-full sm:w-auto text-base h-12 px-7 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
                      data-testid="hero-start-trial"
                    >
                      {t({ ar: "فعّل الآن", en: "Activate now" })}
                      <ArrowCTA className="ms-1 w-4 h-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => openMeetingBooking()}
                      className="w-full sm:w-auto text-base h-12 px-7 border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
                      data-testid="hero-book-call"
                    >
                      <CalendarClock className="me-1 w-4 h-4" />
                      {t({ ar: "احجز عرض", en: "Book a demo" })}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mt-7 text-sm text-zinc-600"
                  >
                    {trustItems.map((item) => (
                      <span key={item.label} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        {item.label}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* RIGHT — offer widget + before/after result cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="relative w-full mt-6 lg:mt-0"
                >
                  <div className="absolute inset-x-0 -top-10 bottom-0 -z-10 bg-gradient-to-tr from-violet-200/50 via-purple-100/40 to-sky-100/40 blur-[90px] rounded-[45%] pointer-events-none" />

                  <div className="relative w-full max-w-xl mx-auto lg:me-0 lg:ms-auto">
                    <HeroOffer engineLabel={engineLabel} />

                    <div className="flex items-center justify-center gap-2.5 mt-3 mb-4">
                      <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-300" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {t({ ar: "النتيجة على متجرك", en: "The result on your store" })}
                      </span>
                      <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-300" />
                    </div>

                    <div className="relative num-ltr grid grid-cols-2 gap-3 sm:gap-4 items-stretch">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200/80">
                        <ArrowRight className="w-3.5 h-3.5 text-violet-500" />
                      </div>

                      {/* BEFORE */}
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        <div className="h-full rounded-2xl bg-white/60 backdrop-blur-sm border border-zinc-200/70 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] p-3.5 saturate-[0.92]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-[9px] font-bold uppercase tracking-wide text-rose-500">
                              <XCircle className="w-3 h-3" />
                              {t({ ar: "بدون زيادة", en: "Without Ziadah" })}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <ScoreRing score={3.0} color="#f43f5e" />
                              <span className="text-[11px] font-extrabold text-rose-500 num-ltr">3.0/10</span>
                            </div>
                          </div>
                          <div className="space-y-2.5">
                            {beforeRows.map((r, i) => (
                              <div key={r.metric}>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[12px] font-bold text-zinc-900">{r.metric}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[12px] font-bold text-rose-500 num-ltr">{r.score.toFixed(1)}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap text-white ${r.tone === "warn" ? "bg-amber-400" : "bg-rose-500"}`}>
                                      {r.badge}
                                    </span>
                                  </div>
                                </div>
                                <div className="h-1 w-full rounded-full bg-zinc-100 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(r.score / 10) * 100}%` }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* AFTER */}
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
                        className="relative z-20"
                      >
                        <div className="h-full group relative overflow-hidden rounded-2xl bg-white border border-violet-200 ring-1 ring-violet-500/10 shadow-[0_24px_50px_-16px_rgba(16,185,129,0.42)] p-3.5 transition-transform duration-300 hover:-translate-y-1">
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-50 border border-violet-100 text-[9px] font-bold uppercase tracking-wide text-violet-600">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                              </span>
                              {t({ ar: "مع زيادة", en: "With Ziadah" })}
                            </span>
                            <div className="flex items-center gap-1.5 num-ltr">
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-violet-100 text-[9px] font-extrabold text-violet-700">
                                <TrendingUp className="w-2.5 h-2.5" />
                                +6.1
                              </span>
                              <ScoreRing score={9.1} color="#8b5cf6" />
                              <span className="text-[11px] font-extrabold text-violet-600">9.1/10</span>
                            </div>
                          </div>
                          <div className="space-y-2.5">
                            {afterRows.map((r, i) => (
                              <div key={r.metric}>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[12px] font-bold text-zinc-900">{r.metric}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[12px] font-bold text-violet-600 num-ltr">{r.score.toFixed(1)}</span>
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap text-white bg-violet-500">
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                      {r.badge}
                                    </span>
                                  </div>
                                </div>
                                <div className="h-1 w-full rounded-full bg-violet-50 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-500"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(r.score / 10) * 100}%` }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.9, delay: 0.35 + i * 0.1, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PROOF — aggregate stats + merchant logo marquee */}
          <section className="pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                    className="rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 ring-1 ring-violet-500/5 p-5 sm:p-6 text-center"
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-violet-600 num-ltr">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-xs sm:text-sm font-semibold text-zinc-500">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-xs text-zinc-400 mt-4">
                {t({ ar: "أرقام تراكمية عبر +1,500 متجر يستخدم زيادة منذ الإطلاق.", en: "Cumulative figures across 1,500+ stores using Ziadah since launch." })}
              </p>

              <div className="flex items-center justify-center gap-2.5 mt-12 mb-6">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-300" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {t({ ar: "متاجر تثق بزيادة", en: "Stores that trust Ziadah" })}
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-300" />
              </div>

              <div className="logos-mask marquee-row">
                <div
                  ref={logosMarqueeTrackRef}
                  className="marquee-track marquee-rtl"
                  style={{ animationDuration: `${storeLogos.length * 1.75}s` }}
                >
                  {[0, 1, 2].map((seg) => (
                    <div key={seg} className="marquee-segment">
                      {storeLogos.map((l, i) => (
                        <div key={`${seg}-${i}`} className="lc">
                          <img
                            src={l.src}
                            alt={
                              isAr
                                ? `شعار ${l.name} — متجر يستخدم تطبيق زيادة للذكاء الاصطناعي`
                                : `${l.name} logo — Ziadah AI ecommerce merchant`
                            }
                            loading="lazy"
                            className="logo-img"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM — Ziadah's framed problem→solution story */}
          <section className="pt-24 px-4 bg-black">
            <div className="container mx-auto max-w-xl">
              <div className="text-center mb-9">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">
                  {t({ ar: "القصة باختصار", en: "The story, briefly" })}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  {t({ ar: "وين تروح مبيعاتك كل يوم؟", en: "Where do your sales go every day?" })}
                </h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-black overflow-hidden"
              >
                <div className="px-5 py-5 md:px-7 md:py-7">
                  {(() => {
                    const name = t({ ar: "زيادة", en: "Ziadah" });
                    return (
                      <>
                        <ThreadTweet name={name} step="1 / 4">
                          {t({
                            ar: (
                              <>
                                وصلك <span className="font-bold text-white num-ltr">1,000</span> زائر اليوم… واشترى منهم{" "}
                                <span className="font-bold text-white num-ltr">120</span>، أغلبهم منتج واحد بس.
                                <br />
                                <span className="font-bold text-violet-400">وين راحت بقية المبيعات؟</span>
                              </>
                            ),
                            en: (
                              <>
                                <span className="font-bold text-white num-ltr">1,000</span> visitors came today… and{" "}
                                <span className="font-bold text-white num-ltr">120</span> bought — most just one item.
                                <br />
                                <span className="font-bold text-violet-400">Where did the rest of the sales go?</span>
                              </>
                            ),
                          })}
                        </ThreadTweet>

                        <ThreadTweet name={name} step="2 / 4">
                          {t({
                            ar: (
                              <>
                                السبب؟ كل عميل يشوف نفس المنتجات — ما حد يقترح له المنتج اللي يكمّل طلبه.
                                <br />
                                في المتجر الفعلي، البائع يقول «وهذا يناسبه». أونلاين؟ ما في أحد.
                              </>
                            ),
                            en: (
                              <>
                                The cause? Every shopper sees the same products — nobody suggests the item that completes
                                their order.
                                <br />
                                In a physical store a salesperson says "this goes with it." Online? No one does.
                              </>
                            ),
                          })}
                        </ThreadTweet>

                        <ThreadTweet name={name} step="3 / 4">
                          {t({
                            ar: (
                              <>
                                وش يكلّفك هذا؟ مو بس بيعة ضايعة…
                                <br />
                                <XCircle className="inline-block w-4 h-4 text-rose-400 align-[-2px] me-1" aria-hidden="true" />
                                تدفع إعلانات عشان تجيب الزائر، وبعدها يطلع بنص سلّة
                                <br />
                                <XCircle className="inline-block w-4 h-4 text-rose-400 align-[-2px] me-1" aria-hidden="true" />
                                ومنتجات ممتازة ما حد يشوفها لأنها مدفونة في الكتالوج
                              </>
                            ),
                            en: (
                              <>
                                What does this cost you? It's not just one lost sale…
                                <br />
                                <XCircle className="inline-block w-4 h-4 text-rose-400 align-[-2px] me-1" aria-hidden="true" />
                                You pay ads to bring the visitor, then they leave with half a cart
                                <br />
                                <XCircle className="inline-block w-4 h-4 text-rose-400 align-[-2px] me-1" aria-hidden="true" />
                                and great products go unseen, buried deep in your catalog
                              </>
                            ),
                          })}
                        </ThreadTweet>

                        <ThreadTweet name={name} step="4 / 4" isLast>
                          {t({
                            ar: (
                              <>
                                الحل؟ تفعّل زيادة
                                <CheckCircle2 className="inline-block w-4 h-4 text-violet-400 align-[-2px] ms-1" aria-hidden="true" />
                                <br />
                                تقترح لكل عميل المنتج اللي يكمّل طلبه — فيضيف أكثر، ويرتفع متوسط قيمة الطلب
                                <TrendingUp className="inline-block w-4 h-4 text-violet-400 align-[-2px] mx-1" aria-hidden="true" />
                                بدون أي إعلان إضافي.
                              </>
                            ),
                            en: (
                              <>
                                The fix? Turn on Ziadah
                                <CheckCircle2 className="inline-block w-4 h-4 text-violet-400 align-[-2px] ms-1" aria-hidden="true" />
                                <br />
                                It suggests each shopper the item that completes their order — so they add more, and your
                                average order value climbs
                                <TrendingUp className="inline-block w-4 h-4 text-violet-400 align-[-2px] mx-1" aria-hidden="true" />
                                with no extra ads.
                              </>
                            ),
                          })}
                        </ThreadTweet>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CALCULATOR */}
          <section id="calculator" className="py-24 px-4 scroll-mt-20">
            <div className="container mx-auto max-w-6xl">
              <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative">
                <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative p-7 md:p-10 lg:p-12">
                  <span className="inline-block text-xs font-bold tracking-widest text-purple-400 uppercase mb-4">
                    {t({ ar: "حاسبة", en: "Calculator" })}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {t({ ar: "احسب إيرادك الإضافي مع زيادة", en: "Calculate your extra revenue with Ziadah" })}
                  </h2>
                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-3 max-w-2xl">
                    {t({
                      ar: "حرّك إيرادك الشهري وشوف كم يضيف لك رفع متوسط قيمة الطلب — كل شهر.",
                      en: "Slide your monthly revenue and see how much a higher average order value adds — every month.",
                    })}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                    {t({
                      ar: "بناءً على متاجر تستخدم زيادة، متوسط الإيراد الإضافي يصل ~20٪ من خلال رفع متوسط قيمة الطلب والبيع المتقاطع.",
                      en: "Based on stores using Ziadah, average extra revenue reaches ~20% through higher average order value and cross-sell.",
                    })}
                  </p>

                  <div className="h-px bg-white/10 my-8 lg:my-10" />

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
                    {/* left: controls */}
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                        {t({ ar: "إيراد متجرك الشهري", en: "Your monthly store revenue" })}
                      </div>
                      <div className="text-5xl md:text-6xl font-extrabold text-white mb-7 num-ltr">
                        ⃁{revenue.toLocaleString("en-US")}
                      </div>
                      <Slider
                        dir={isAr ? "rtl" : "ltr"}
                        min={5000}
                        max={500000}
                        step={5000}
                        value={[revenue]}
                        onValueChange={(v) => setRevenue(v[0])}
                        className="mb-8 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/20 [&>span:first-child>span]:bg-violet-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-violet-400 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-[0_0_0_4px_rgba(16,185,129,0.25)]"
                      />
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                        {t({ ar: "إيراد إضافي محتمل شهرياً", en: "Potential extra revenue monthly" })}
                      </div>
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 space-y-4">
                        {[
                          {
                            label: t({ ar: "بدون اقتراحات", en: "No recommendations" }),
                            value: 0,
                            pct: 0,
                            barClass: "bg-red-500/70",
                            textClass: "text-red-300",
                          },
                          {
                            label: t({ ar: "اقتراحات عامة", en: "Generic recommendations" }),
                            value: extraGeneric,
                            pct: Math.round((extraGeneric / maxExtra) * 100),
                            barClass: "bg-amber-500/70",
                            textClass: "text-amber-300",
                          },
                          {
                            label: t({ ar: "مع زيادة", en: "With Ziadah" }),
                            value: extraZiadah,
                            pct: Math.round((extraZiadah / maxExtra) * 100),
                            barClass: "bg-violet-500/80",
                            textClass: "text-violet-300",
                          },
                        ].map((row) => (
                          <div key={row.label}>
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-zinc-300">{row.label}</span>
                              <span className={`font-bold num-ltr ${row.textClass}`}>
                                ⃁{row.value.toLocaleString("en-US")}
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                              <div className={`h-full ${row.barClass} rounded-full transition-all`} style={{ width: `${row.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* right: results */}
                    <div className="rounded-2xl bg-gradient-to-br from-violet-500/[0.08] to-transparent border border-violet-500/20 p-6 md:p-8 flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-6">
                        <TrendingUp className="w-4 h-4" />
                        {t({ ar: "متوسط الإيراد الإضافي مع زيادة", en: "Average extra revenue with Ziadah" })}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-white/[0.05] border border-white/10 p-5">
                          <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">
                            {t({ ar: "سنوياً", en: "Annually" })}
                          </div>
                          <div className="text-3xl md:text-4xl font-extrabold text-white num-ltr">
                            ⃁{annualExtra.toLocaleString("en-US")}
                          </div>
                        </div>
                        <div className="rounded-xl bg-white/[0.05] border border-white/10 p-5">
                          <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">
                            {t({ ar: "شهرياً", en: "Monthly" })}
                          </div>
                          <div className="text-3xl md:text-4xl font-extrabold text-white num-ltr">
                            ⃁{monthlyExtra.toLocaleString("en-US")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-6">
                        <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                          {t({
                            ar: "تقدير متحفّظ عند 20٪ إيراد إضافي. النتائج تختلف حسب القطاع وحجم الكتالوج.",
                            en: "Conservative estimate at 20% extra revenue. Results vary by sector and catalog size.",
                          })}
                        </p>
                        <Button
                          onClick={() => setPlatformOpen(true)}
                          className="w-full h-12 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold"
                        >
                          {t({ ar: "فعّل الآن", en: "Activate now" })}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ANALOGY — static shelf vs. smart salesperson */}
          <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-4">
                  {t({ ar: "فكّر فيها كذا", en: "Think of it this way" })}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
                  {t({ ar: "رفّ ثابت، ولا بائع يعرف كل عميل؟", en: "A static shelf, or a salesperson who knows every customer?" })}
                </h2>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                  {t({
                    ar: "المتجر العادي يعرض نفس المنتجات للجميع. زيادة تشتغل مثل بائع محترف — يعرف كل عميل ويقترح له الصح.",
                    en: "An ordinary store shows the same products to everyone. Ziadah works like an expert salesperson — it knows each customer and suggests the right thing.",
                  })}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-10">
                {/* static shelf */}
                <div className="rounded-2xl border-2 border-rose-200 bg-white p-7 md:p-8 relative">
                  <div className="absolute top-5 end-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold tracking-widest uppercase">
                    <XCircle className="w-3 h-3" />
                    {t({ ar: "متجر عادي", en: "Ordinary store" })}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-5">
                    <Package className="w-6 h-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-950 mb-3">
                    {t({ ar: "رفّ ثابت", en: "A static shelf" })}
                  </h3>
                  <p className="text-zinc-700 leading-relaxed mb-5">
                    {t({
                      ar: "كل زائر يشوف نفس قائمة المنتجات، بنفس الترتيب. ما في أحد يربط بين ما يبيه العميل وما يكمّله — فيشتري قطعة وحدة ويطلع.",
                      en: "Every visitor sees the same product list in the same order. Nothing connects what the customer wants to what completes it — so they buy one item and leave.",
                    })}
                  </p>
                  <div className="space-y-2.5 text-sm">
                    {[
                      t({ ar: "نفس المنتجات للجميع", en: "Same products for everyone" }),
                      t({ ar: "منتجات ممتازة مدفونة في الكتالوج", en: "Great products buried in the catalog" }),
                      t({ ar: "سلّة صغيرة ومتوسط طلب منخفض", en: "Small carts, low average order value" }),
                    ].map((p) => (
                      <div key={p} className="flex items-start gap-2 text-zinc-700">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {t({ ar: "من كل 100 سلّة، فيها منتج إضافي", en: "Out of every 100 carts, with an add-on" })}
                    </span>
                    <span className="text-2xl font-extrabold text-rose-600 num-ltr">8</span>
                  </div>
                </div>

                {/* smart salesperson */}
                <div className="rounded-2xl mockup-card overflow-hidden shadow-card-lg relative p-7 md:p-8">
                  <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none" />
                  <div className="relative">
                    <div className="absolute top-0 end-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-bold tracking-widest uppercase">
                      <CheckCircle2 className="w-3 h-3" />
                      {t({ ar: "مع زيادة", en: "With Ziadah" })}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mb-5">
                      <Wand2 className="w-6 h-6 text-violet-300" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {t({ ar: "بائع يعرف كل عميل", en: "A salesperson who knows every customer" })}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed mb-5">
                      {t({
                        ar: "زيادة تقرأ سلوك كل عميل وتقترح له المنتج اللي يكمّل طلبه — في اللحظة الصح ومكان العرض الصح. مثل بائع يعرف الكتالوج وكل زبون.",
                        en: "Ziadah reads each customer's behavior and suggests the item that completes their order — at the right moment and placement. Like a salesperson who knows the catalog and every shopper.",
                      })}
                    </p>
                    <div className="space-y-2.5 text-sm">
                      {[
                        t({ ar: "اقتراح شخصي لكل عميل", en: "Personalized for each customer" }),
                        t({ ar: "يبرز المنتجات اللي تُشترى معاً", en: "Surfaces frequently-bought-together items" }),
                        t({ ar: "سلّة أكبر ومتوسط طلب أعلى", en: "Bigger carts, higher average order value" }),
                      ].map((p) => (
                        <div key={p} className="flex items-start gap-2 text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        {t({ ar: "من كل 100 سلّة, فيها منتج إضافي", en: "Out of every 100 carts, with an add-on" })}
                      </span>
                      <span className="text-2xl font-extrabold text-violet-300 num-ltr">34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3-WAY COMPARISON */}
          <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 mb-4">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                    {t({ ar: "السؤال اللي يسأله كل تاجر", en: "The question every merchant asks" })}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
                  {t({ ar: "100 عميل أضافوا للسلّة اليوم. كم وحدة منهم أضاف منتج إضافي؟", en: "100 customers added to cart today. How many added an extra item?" })}
                </h2>
                <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
                  {t({
                    ar: "ثلاث حالات: متجر بلا اقتراحات، متجر باقتراحات عامة، ومتجر يستخدم زيادة. كم تكسب في كل حالة.",
                    en: "Three scenarios: a store with no recommendations, one with generic recommendations, and one using Ziadah. What you gain in each.",
                  })}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    key: "none",
                    Icon: Package,
                    label: t({ ar: "بلا اقتراحات", en: "No recommendations" }),
                    badge: "bg-zinc-100 border-zinc-300 text-zinc-700",
                    border: "border-zinc-300",
                    dotColor: "bg-zinc-300",
                    visible: 8,
                    visibleLabel: t({ ar: "8٪ من السلال فيها منتج إضافي", en: "8% of carts add an extra item" }),
                    impact: t({ ar: "−مبيعات كثيرة ضايعة شهرياً", en: "−lots of sales left on the table" }),
                    impactColor: "text-rose-600",
                    lines: [
                      t({ ar: "كل عميل يشوف نفس المنتجات", en: "Every shopper sees the same products" }),
                      t({ ar: "متوسط قيمة الطلب منخفض", en: "Low average order value" }),
                      t({ ar: "منتجات ممتازة ما حد يشوفها", en: "Great products go unseen" }),
                    ],
                    verdict: t({ ar: "تترك مبيعات على الطاولة", en: "Leaving sales on the table" }),
                    verdictColor: "text-zinc-700 bg-zinc-100 border-zinc-200",
                    featured: false,
                  },
                  {
                    key: "generic",
                    Icon: LayoutGrid,
                    label: t({ ar: "اقتراحات عامة", en: "Generic recommendations" }),
                    badge: "bg-amber-100 border-amber-200 text-amber-700",
                    border: "border-amber-300",
                    dotColor: "bg-amber-400",
                    visible: 18,
                    visibleLabel: t({ ar: "18٪ من السلال فيها منتج إضافي", en: "18% of carts add an extra item" }),
                    impact: t({ ar: "+بعض الإيراد، لكن غير شخصي", en: "+some revenue, but impersonal" }),
                    impactColor: "text-amber-700",
                    lines: [
                      t({ ar: "نفس «الأكثر مبيعاً» للجميع", en: "Same best-sellers for everyone" }),
                      t({ ar: "اقتراحات ما تناسب كل عميل", en: "Suggestions don't fit each shopper" }),
                      t({ ar: "نمو محدود في قيمة الطلب", en: "Limited lift in order value" }),
                    ],
                    verdict: t({ ar: "أحسن من لا شيء، لكن أقل من الممكن", en: "Better than nothing, below potential" }),
                    verdictColor: "text-amber-700 bg-amber-100 border-amber-200",
                    featured: false,
                  },
                  {
                    key: "ziadah",
                    Icon: Wand2,
                    label: t({ ar: "مع زيادة (ذكاء اصطناعي)", en: "With Ziadah (AI)" }),
                    badge: "bg-violet-100 border-violet-200 text-violet-700",
                    border: "border-violet-400",
                    dotColor: "bg-violet-500",
                    visible: 34,
                    visibleLabel: t({ ar: "34٪ من السلال فيها منتج إضافي", en: "34% of carts add an extra item" }),
                    impact: t({ ar: "+35٪ متوسط نمو قيمة الطلب", en: "+35% avg order-value lift" }),
                    impactColor: "text-violet-600",
                    lines: [
                      t({ ar: "اقتراح شخصي لكل عميل", en: "Personalized for each shopper" }),
                      t({ ar: "يبرز المنتجات اللي تُشترى معاً", en: "Surfaces bought-together items" }),
                      t({ ar: "متوسط طلب أعلى · إيراد أكثر", en: "Higher AOV · more revenue" }),
                    ],
                    verdict: t({ ar: "كل عميل يشوف ما يناسبه فعلاً", en: "Every shopper sees what truly fits" }),
                    verdictColor: "text-violet-700 bg-violet-100 border-violet-200",
                    featured: true,
                  },
                ].map((sc, i) => (
                  <motion.div
                    key={sc.key}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`relative rounded-2xl border-2 ${sc.border} bg-white p-6 ${sc.featured ? "shadow-card-lg" : "shadow-card"}`}
                  >
                    {sc.featured && (
                      <div className="absolute -top-3 start-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                        {t({ ar: "الأعلى أثراً", en: "Best impact" })}
                      </div>
                    )}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase mb-4 ${sc.badge}`}>
                      <sc.Icon className="w-3 h-3" />
                      {sc.label}
                    </div>

                    <div className="grid grid-cols-10 gap-1 mb-3" aria-hidden="true">
                      {Array.from({ length: 100 }).map((_, idx) => (
                        <div key={idx} className={`aspect-square rounded-sm ${idx < sc.visible ? sc.dotColor : "bg-zinc-200"}`} />
                      ))}
                    </div>
                    <div className="text-xs text-zinc-600 mb-5">{sc.visibleLabel}</div>

                    <div className={`text-2xl md:text-3xl font-extrabold ${sc.impactColor} mb-4`}>{sc.impact}</div>

                    <ul className="space-y-2 mb-5 text-sm">
                      {sc.lines.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-zinc-700">
                          {sc.key === "ziadah" ? (
                            <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className={`w-4 h-4 shrink-0 mt-0.5 ${sc.key === "generic" ? "text-amber-500" : "text-zinc-400"}`} />
                          )}
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold ${sc.verdictColor}`}>{sc.verdict}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 shadow-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center md:text-start">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <TrendingDown className="w-7 h-7 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-2xl font-extrabold text-zinc-950 num-ltr">8 / 100</div>
                      <div className="text-xs text-zinc-600">
                        {t({ ar: "سلال فيها منتج إضافي بدون اقتراحات", en: "carts with an add-on, no recommendations" })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start md:border-x md:border-zinc-200 md:px-5">
                    <Activity className="w-7 h-7 text-zinc-500 shrink-0" />
                    <div>
                      <div className="text-2xl font-extrabold text-zinc-950 num-ltr">{t({ ar: "دقائق", en: "minutes" })}</div>
                      <div className="text-xs text-zinc-600">
                        {t({ ar: "حتى يبدأ الذكاء يقترح في متجرك", en: "until the AI starts recommending" })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <TrendingUp className="w-7 h-7 text-violet-500 shrink-0" />
                    <div>
                      <div className="text-2xl font-extrabold text-zinc-950 num-ltr">+15–35%</div>
                      <div className="text-xs text-zinc-600">
                        {t({ ar: "متوسط نمو قيمة الطلب مع زيادة", en: "average AOV lift with Ziadah" })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-zinc-400 mt-4">
                {t({
                  ar: "تقديرات داخلية بناءً على متاجر تستخدم زيادة؛ تختلف حسب القطاع وحجم الكتالوج.",
                  en: "Internal estimates based on stores using Ziadah; vary by sector and catalog size.",
                })}
              </p>

              <div className="text-center mt-10">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm transition-colors"
                >
                  {t({ ar: "شوف كل الودجتات والمميزات", en: "See all widgets and features" })}
                  <ArrowCTA className="w-4 h-4" />
                </Link>
                <p className="text-xs text-zinc-500 mt-3">
                  {t({ ar: "ودجتات جاهزة، أمثلة حقيقية، وأماكن عرض لكل صفحة.", en: "Ready-made widgets, real examples, and placements for every page." })}
                </p>
              </div>
            </div>
          </section>

          {/* 4 PILLARS */}
          <section className="py-24 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-4">
                  {t({ ar: "وش تسوّي زيادة بالضبط", en: "What Ziadah actually does" })}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
                  {t({ ar: "أربع وظائف، شرح بسيط، وأمثلة حقيقية", en: "Four jobs, plain language, real examples" })}
                </h2>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                  {t({
                    ar: "خلف الستار، زيادة تسوّي أربعة أشياء — كل وحدة منها ترفع سلّة عميلك ومبيعاتك.",
                    en: "Under the hood, Ziadah does four things — each one grows your customer's cart and your sales.",
                  })}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    num: "01",
                    Icon: Wand2,
                    title: t({ ar: "اقتراحات شخصية لكل عميل", en: "Personalized for each customer" }),
                    desc: t({
                      ar: "زيادة تقرأ تصفّح العميل وطلباته السابقة وتقترح له منتجات تناسبه فعلاً — مو نفس القائمة للجميع.",
                      en: "Ziadah reads each shopper's browsing and past orders and suggests products that genuinely fit — not the same list for everyone.",
                    }),
                    example: t({
                      ar: "مثال: عميل يتصفّح حذاء رياضي، زيادة تقترح له جوارب ومنظّف أحذية — لا عطور ولا منتجات ما لها علاقة.",
                      en: "Example: a shopper browsing running shoes is shown socks and shoe cleaner — not perfume or unrelated items.",
                    }),
                  },
                  {
                    num: "02",
                    Icon: Combine,
                    title: t({ ar: "حزم ومنتجات تُشترى معاً", en: "Bundles & bought-together" }),
                    desc: t({
                      ar: "تكتشف زيادة المنتجات اللي يشتريها العملاء مع بعض، وتعرضها كحزمة بضغطة وحدة — فيرتفع متوسط الطلب.",
                      en: "Ziadah finds products customers buy together and presents them as a one-click bundle — lifting the average order.",
                    }),
                    example: t({
                      ar: "مثال: «اشترِ الكاميرا + الحامل + الذاكرة معاً ووفّر 10٪» — حزمة جاهزة يضيفها العميل بنقرة.",
                      en: "Example: \"Buy the camera + tripod + memory card together and save 10%\" — a ready bundle the customer adds in one click.",
                    }),
                  },
                  {
                    num: "03",
                    Icon: ShoppingCart,
                    title: t({ ar: "ترقية السلة والدفع", en: "Cart & checkout upsell" }),
                    desc: t({
                      ar: "في لحظة الإضافة للسلة أو الدفع، تقترح زيادة ترقية أو إضافة بسيطة تكمّل الطلب — قبل ما يخلص الشراء.",
                      en: "At add-to-cart or checkout, Ziadah suggests an upgrade or small add-on that completes the order — before purchase ends.",
                    }),
                    example: t({
                      ar: "مثال: عند الدفع، «ضيف ضمان سنتين بـ ⃁19» أو «أكمل لـ ⃁200 وخذ شحن مجاني» — يرفع قيمة الطلب فوراً.",
                      en: "Example: at checkout, \"Add a 2-year warranty for ⃁19\" or \"Reach ⃁200 for free shipping\" — instantly raising order value.",
                    }),
                  },
                  {
                    num: "04",
                    Icon: LineChart,
                    title: t({ ar: "يتعلّم ويُحسّن آلياً", en: "Learns & optimizes automatically" }),
                    desc: t({
                      ar: "كل نقرة وكل طلب يغذّي محرك زيادة، فيتعلّم وش يقترح ووين يعرضه — وتتحسّن النتائج تلقائياً مع الوقت.",
                      en: "Every click and order feeds Ziadah's engine, so it learns what to suggest and where — and results improve automatically over time.",
                    }),
                    example: t({
                      ar: "مثال: زيادة تكتشف إن اقتراح «الإكسسوار» في السلة يحوّل أعلى من صفحة المنتج — فتعيد ترتيب العرض تلقائياً.",
                      en: "Example: Ziadah finds that suggesting accessories in the cart converts better than on the product page — and reorders placements automatically.",
                    }),
                  },
                ].map((p) => (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase num-ltr">{p.num}</span>
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center">
                        <p.Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-zinc-950 mb-3 leading-snug">{p.title}</h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-4">{p.desc}</p>
                    <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3.5">
                      <p className="text-xs md:text-sm text-zinc-700 leading-relaxed">{p.example}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS — interactive 4-step */}
          <section id="steps" className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200 scroll-mt-20">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-4">
                  {t({ ar: "كيف تشتغل زيادة", en: "How Ziadah works" })}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
                  {t({ ar: "من التفعيل إلى نمو المبيعات في 4 خطوات", en: "From activation to growing sales in 4 steps" })}
                </h2>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                  {t({
                    ar: "فعّل على زد أو سلة، اختر أماكن العرض، وخلّ الذكاء يقترح ويُحسّن لكل عميل.",
                    en: "Activate on Zid or Salla, pick your placements, and let the AI recommend and optimize for each shopper.",
                  })}
                </p>
              </div>

              <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
                {/* LEFT — live preview */}
                <div className="lg:col-span-2 order-2 lg:order-1 lg:sticky lg:top-24">
                  <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative">
                    <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500" />
                    <div className="relative p-6 md:p-7">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(109, 40, 217,0.45)]">
                            {(() => {
                              const ActiveIcon = steps[activeStep].Icon;
                              return <ActiveIcon className="w-5 h-5 text-white" />;
                            })()}
                            <span className={`absolute -top-1.5 ${isAr ? "-left-1.5" : "-right-1.5"} w-5 h-5 rounded-full bg-white text-purple-700 text-[10px] font-bold flex items-center justify-center num-ltr ring-2 ring-zinc-950`}>
                              {activeStep + 1}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white leading-tight truncate">{steps[activeStep].title}</div>
                            <div className="text-[10px] text-zinc-500 num-ltr">
                              {t({ ar: "الخطوة", en: "Step" })} {activeStep + 1}/{steps.length}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {steps.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              aria-label={`${t({ ar: "الخطوة", en: "Step" })} ${i + 1}`}
                              onClick={() => setActiveStep(i)}
                              className={`h-1.5 rounded-full transition-all ${i === activeStep ? "w-5 bg-violet-400" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="min-h-[150px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                          >
                            {steps[activeStep].mockup}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full rounded-full bg-violet-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex w-2 h-2 rounded-full bg-violet-400" />
                          </span>
                          <span className="text-[11px] font-bold text-violet-300">{t({ ar: "اقتراحات تُعرض الآن", en: "Recommending live" })}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 num-ltr">1,284 / hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT — timeline */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute top-7 bottom-7 start-7 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />
                    <div className="space-y-3">
                      {steps.map((s, i) => {
                        const isActive = i === activeStep;
                        return (
                          <motion.button
                            key={i}
                            type="button"
                            onClick={() => setActiveStep(i)}
                            onMouseEnter={() => setActiveStep(i)}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative w-full text-start flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all ${
                              isActive ? "border-purple-300 shadow-card-lg ring-1 ring-purple-200" : "border-zinc-100 shadow-card hover:shadow-card-lg hover:border-zinc-200"
                            }`}
                          >
                            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-purple-600" : "bg-zinc-950"}`}>
                              <s.Icon className="w-5 h-5 text-white" />
                              <span className={`absolute -top-1.5 ${isAr ? "-left-1.5" : "-right-1.5"} w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center num-ltr ring-2 ring-white transition-colors ${isActive ? "bg-zinc-950" : "bg-purple-600"}`}>
                                {i + 1}
                              </span>
                            </div>
                            <div className="flex-1 pt-0.5">
                              <div className="flex items-center justify-between gap-3 mb-1">
                                <h3 className="text-base font-bold text-zinc-950">{s.title}</h3>
                                <span className="shrink-0 text-[11px] font-bold text-purple-600 num-ltr bg-purple-50 border border-purple-100 rounded-full px-2 py-0.5">{s.stat}</span>
                              </div>
                              <p className="text-sm text-zinc-600 leading-relaxed mb-0.5">{s.desc}</p>
                              <span className="text-[11px] text-zinc-400 num-ltr">{s.statLabel}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLACEMENTS + STORES */}
          <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card">
                  <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
                    {t({ ar: "أماكن العرض", en: "Placements" })}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-6">
                    {t({ ar: "اقتراحات في كل صفحة مهمة", en: "Recommendations on every page that matters" })}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {placements.map((c) => (
                      <div key={c.name.en} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors">
                        <div className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center">
                          <c.Icon className="w-5 h-5" style={{ color: c.color }} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-950">{isAr ? c.name.ar : c.name.en}</div>
                          <div className="text-[10px] text-zinc-500">{t({ ar: "ودجت جاهز", en: "Ready widget" })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card">
                  <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
                    {t({ ar: "منصات التجارة", en: "E-commerce platforms" })}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-6">
                    {t({ ar: "اربط متجرك بنقرة وحدة", en: "Connect your store in one click" })}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {storePlatforms.map((s) => (
                      <div key={s.brand} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors">
                        <div className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center">
                          <Store className="w-5 h-5" style={{ color: s.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-950">{s.name}</span>
                            {s.soon && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full">
                                {t({ ar: "قريباً", en: "Soon" })}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-500">{s.soon ? t({ ar: "قريباً", en: "Coming soon" }) : t({ ar: "متاح الآن", en: "Available now" })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* USE-CASE WIDGETS SHOWCASE */}
          <WidgetsShowcaseSection />

          {/* PRICING TEASER */}
          <section id="pricing" className="py-24 px-4 scroll-mt-20">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-4">
                  {t({ ar: "الأسعار", en: "Pricing" })}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
                  {t({ ar: "خطط بسيطة وشفافة", en: "Simple, transparent plans" })}
                </h2>
                <p className="text-lg text-zinc-600">
                  {t({ ar: "اقتراحات ومبيعات غير محدودة في كل الباقات — شاملة الضريبة، وتجربة مجانية 7 أيام.", en: "Unlimited suggestions & sales on every plan — VAT-inclusive, with a 7-day free trial." })}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl p-6 flex flex-col ${plan.popular ? "mockup-card shadow-card-lg" : "bg-white border border-zinc-200 shadow-card"}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t({ ar: "الأكثر اختياراً", en: "Most popular" })}
                      </div>
                    )}
                    <h3 className={`text-lg font-bold mb-3 ${plan.popular ? "text-white" : "text-zinc-950"}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className={`text-4xl font-bold num-ltr ${plan.popular ? "text-white" : "text-zinc-950"}`}>
                        ⃁{plan.price.toLocaleString("en-US")}
                      </span>
                      <span className={`text-sm ${plan.popular ? "text-zinc-400" : "text-zinc-500"}`}>{t({ ar: "/شهرياً", en: "/mo" })}</span>
                    </div>
                    <div className={`text-sm mb-6 ${plan.popular ? "text-zinc-300" : "text-zinc-700"}`}>
                      <span className={`font-semibold ${plan.popular ? "text-white" : "text-zinc-950"}`}>{plan.orders}</span>
                    </div>
                    <Button
                      onClick={() => setPlatformOpen(true)}
                      className={`w-full ${plan.popular ? "bg-white text-zinc-950 hover:bg-zinc-100 font-semibold" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}
                    >
                      {t({ ar: "فعّل الآن", en: "Activate now" })}
                    </Button>

                    <div className={`flex-1 space-y-3 pt-6 mt-6 border-t ${plan.popular ? "border-white/10" : "border-zinc-100"}`}>
                      {planFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.popular ? "text-purple-400" : "text-purple-600"}`} />
                          <span className={`text-sm ${plan.popular ? "text-zinc-300" : "text-zinc-700"}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200 scroll-mt-20">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase mb-4">
                  {t({ ar: "أسئلة شائعة", en: "FAQ" })}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
                  {t({ ar: "أسئلة يسألها التجار", en: "Questions merchants ask" })}
                </h2>
                <p className="text-lg text-zinc-600">
                  {t({ ar: "كل اللي تحتاج تعرفه قبل ما تفعّل زيادة على متجرك.", en: "Everything you need to know before activating Ziadah on your store." })}
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-zinc-200 bg-white px-5 shadow-card data-[state=open]:border-zinc-300">
                    <AccordionTrigger className="text-start text-base md:text-lg font-semibold text-zinc-950 hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 leading-relaxed text-sm md:text-base pb-5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 px-4 bg-white border-t border-zinc-200">
            <div className="container mx-auto max-w-4xl">
              <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative p-10 md:p-14 text-center">
                <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                    {t({ ar: "جاهز ترفع متوسط طلبك ومبيعاتك؟", en: "Ready to raise your order value and sales?" })}
                  </h2>
                  <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
                    {t({
                      ar: "فعّل زيادة الآن على زد أو سلة، وخلّ كل عميل يشوف المنتج اللي يناسبه.",
                      en: "Activate Ziadah now on Zid or Salla, and let every customer see the product that fits them.",
                    })}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      size="lg"
                      onClick={() => setPlatformOpen(true)}
                      className="text-base h-12 px-8 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold"
                    >
                      {t({ ar: "فعّل الآن", en: "Activate now" })}
                      <ArrowCTA className="ms-1 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      {t({ ar: "تجربة مجانية 7 أيام", en: "7-day free trial" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      {t({ ar: "تركيب بنقرة وحدة", en: "One-click install" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      {t({ ar: "دعم بالعربية", en: "Arabic support" })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      <PlatformModal open={platformOpen} onClose={() => setPlatformOpen(false)} />
    </>
  );
}
