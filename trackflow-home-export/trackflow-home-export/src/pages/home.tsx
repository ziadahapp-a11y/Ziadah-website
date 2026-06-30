import { useState, type ReactNode } from "react";
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
  Server,
  Store,
  Zap,
  Database,
  Combine,
  Activity,
  Globe,
  Sparkles,
  Filter,
  Bell,
  LineChart,
  Users,
  Settings2,
  Webhook,
  Lock,
  Workflow,
  Timer,
  Layers,
  Radio,
  Eye,
  KeyRound,
  Check,
  TrendingUp,
  Camera,
  Warehouse,
  Shield,
  ClipboardCheck,
  HelpCircle,
  EyeOff,
  TrendingDown,
  BadgeCheck,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart3,
} from "lucide-react";
import { SiMeta, SiTiktok, SiSnapchat, SiGoogle, SiWordpress } from "react-icons/si";
import { useLang, useT } from "@/lib/i18n";
import { useWaitlist } from "@/components/waitlist";
import { pricingPlans as sharedPricingPlans, planFeatures as sharedPlanFeatures, ZID_APP_URL, WHATSAPP_SUPPORT_URL } from "@/lib/pricing-data";
import { ZidLogo, SallaLogo } from "@/components/brand-logos";

function MagentoBadge({ className = "" }: { className?: string }) {
  return <span className={`inline-flex items-center justify-center font-bold text-[10px] text-[#F26322] ${className}`}>M</span>;
}

// One tweet inside the founder's thread. Renders an X-style row: avatar with a
// connecting line down to the next tweet, a name/handle header, then the body.
function ThreadTweet({
  name,
  handle,
  time,
  isLast = false,
  children,
}: {
  name: string;
  handle: string;
  time: string;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      {/* avatar + connector */}
      <div className="flex flex-col items-center shrink-0">
        <img
          src="/icon.png"
          alt="راصد"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!isLast && <div className="w-0.5 flex-1 bg-white/15 mt-1" />}
      </div>
      {/* header + body */}
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-6"}`}>
        <div className="flex items-center gap-1 text-sm flex-wrap">
          <span className="font-bold text-white">{name}</span>
          <BadgeCheck className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-zinc-500">{handle}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{time}</span>
        </div>
        <div className="mt-1.5 text-[15px] leading-relaxed text-zinc-100">{children}</div>
      </div>
    </div>
  );
}

// Small circular progress "donut" shown beside each event's match score in
// the hero dashboard. `score` is 0–10; `color` fills the ring proportionally.
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

// Hero "radar" — concentric rings with ad/store platform logos orbiting a
// central Rasid engine, plus a rotating sweep. Conveys live signal capture
// across every platform; the result cards below show the match-rate payoff.
// Nodes are spaced ~evenly around the dial at slightly varied radii so the
// orbit reads deliberate rather than random.
const RADAR_NODES = [
  { Icon: SiMeta, color: "#1877F2", r: 44, a: -150 },
  { Icon: SiTiktok, color: "#111827", r: 40, a: -78 },
  { Icon: SiSnapchat, color: "#F5C400", r: 46, a: -6 },
  { Icon: SiGoogle, color: "#EA4335", r: 38, a: 66 },
  { Icon: ZidLogo, color: "#1C1A3D", r: 45, a: 138 },
];

function HeroRadar() {
  const t = useT();
  const rad = (a: number) => (a * Math.PI) / 180;
  const pos = (r: number, a: number) => ({
    left: `${50 + r * Math.cos(rad(a))}%`,
    top: `${50 + r * Math.sin(rad(a))}%`,
  });
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      {/* layered brand glow for depth */}
      <div className="absolute inset-[16%] rounded-full bg-emerald-400/20 blur-[64px] pointer-events-none" />
      <div className="absolute inset-[34%] rounded-full bg-emerald-300/25 blur-3xl pointer-events-none" />

      {/* concentric rings + crosshair, faded toward the edge with a radial mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: "radial-gradient(circle at center, #000 56%, transparent 82%)",
          maskImage: "radial-gradient(circle at center, #000 56%, transparent 82%)",
        }}
      >
        {[
          { s: 100, dashed: true },
          { s: 74, dashed: false },
          { s: 50, dashed: true },
          { s: 28, dashed: false },
        ].map(({ s, dashed }) => (
          <div
            key={s}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              dashed ? "border-dashed border-emerald-500/20" : "border-emerald-500/12"
            }`}
            style={{ width: `${s}%`, height: `${s}%` }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-emerald-500/[0.07]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-px bg-emerald-500/[0.07]" />
      </div>

      {/* connector lines + signal pulses flowing inward to the engine */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {RADAR_NODES.map((n, i) => {
          const x = 50 + n.r * Math.cos(rad(n.a));
          const y = 50 + n.r * Math.sin(rad(n.a));
          return (
            <g key={i}>
              <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(16,185,129,0.16)" strokeWidth="0.3" strokeDasharray="1 1.4" />
              <motion.circle
                r="0.9"
                fill="#10b981"
                animate={{ cx: [x, 50], cy: [y, 50], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, ease: "easeIn", times: [0, 0.12, 0.85, 1] }}
              />
            </g>
          );
        })}
      </svg>

      {/* rotating radar sweep — masked to a clean disc */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(16,185,129,0.28) 0deg, rgba(16,185,129,0.05) 38deg, transparent 80deg)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 13%, #000 14%, #000 50%, transparent 50%)",
          maskImage: "radial-gradient(circle at center, transparent 13%, #000 14%, #000 50%, transparent 50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      {/* bright leading edge of the beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-emerald-400 to-transparent" />
      </motion.div>

      {/* platform chips — glassy rounded tiles with a connected status dot */}
      {RADAR_NODES.map((n, i) => {
        const glow = n.color === "#111827" || n.color === "#1C1A3D" ? "#10b981" : n.color;
        return (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={pos(n.r, n.a)}>
            {/* signal ping */}
            <motion.span
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: `0 0 0 1.5px ${glow}` }}
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm ring-1 ring-black/[0.06]"
              style={{ boxShadow: `0 10px 22px -6px ${glow}55, 0 2px 6px -2px ${glow}30` }}
            >
              <n.Icon className="h-5 w-5" style={{ color: n.color }} />
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </motion.div>
          </div>
        );
      })}

      {/* center engine */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-emerald-500/30 blur-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* rotating scanner ring around the core */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[5.5rem] w-[5.5rem] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(16,185,129,0.7), transparent 55%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 60%, #000 61%)",
            maskImage: "radial-gradient(circle, transparent 60%, #000 61%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-emerald-300 to-emerald-600 shadow-xl shadow-emerald-500/30">
          <img
            src="/icon.png"
            alt={t({ ar: "محرك راصد", en: "Rasid Engine" })}
            className="h-16 w-16 rounded-[14px] object-cover"
          />
        </div>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-500/15 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {t({ ar: "محرك راصد", en: "Rasid Engine" })}
        </span>
      </div>
    </div>
  );
}

const adChannels = [
  { name: { ar: "ميتا", en: "Meta" }, icon: SiMeta, color: "#1877F2" },
  { name: { ar: "تيك توك", en: "TikTok" }, icon: SiTiktok, color: "#000000" },
  { name: { ar: "سناب", en: "Snap" }, icon: SiSnapchat, color: "#FFC700" },
  { name: { ar: "جوجل", en: "Google" }, icon: SiGoogle, color: "#EA4335" },
];

export default function Home() {
  const { lang } = useLang();
  const t = useT();
  const ArrowCTA = lang === "ar" ? ArrowLeft : ArrowRight;
  const [spend, setSpend] = useState(10000);
  const [activeStep, setActiveStep] = useState(0);
  const monthlyRecovery = Math.round(spend * 0.22);
  const annualRecovery = monthlyRecovery * 12;
  const lossNoTracking = Math.round(spend * 0.50);
  const lossPixelOnly = Math.round(spend * 0.35);
  const lossWithRasid = Math.round(spend * 0.13);
  // Scale bar widths against the worst-case loss at max spend so they fill
  // proportionally as the slider moves (250000 = slider max).
  const maxLoss = 250000 * 0.5;
  const storePlatforms = [
    { name: t({ ar: "زد", en: "Zid" }), brand: "Zid", Comp: ZidLogo, color: "#1C1A3D", soon: false },
    { name: t({ ar: "سلة", en: "Salla" }), brand: "Salla", Comp: SallaLogo, color: "#1A7E8C", soon: true },
    { name: "Magento", brand: "Magento", Comp: MagentoBadge, color: "#F26322", soon: true },
    { name: "WordPress", brand: "WordPress", Comp: SiWordpress, color: "#21759B", soon: true },
    { name: t({ ar: "متجر مخصص", en: "Custom" }), brand: "Custom", Comp: Webhook, color: "#7C3AED", soon: true },
  ];

  // Hero dashboard rows: per-event match scores as the ad platform sees them.
  // `beforeRows` = weak scores + errors/warnings without Rasid; `afterRows` =
  // high scores + Great/Good once Rasid streams clean server-side events.
  const beforeRows = [
    { event: t({ ar: "شراء", en: "Purchase" }), events: "240", score: 2.8, badge: t({ ar: "4 أخطاء", en: "4 Errors" }), tone: "error" as const },
    { event: t({ ar: "مشاهدة منتج", en: "View Item" }), events: "50K", score: 2.9, badge: t({ ar: "3 تحذيرات", en: "3 Warnings" }), tone: "warn" as const },
    { event: t({ ar: "زيارة صفحة", en: "Page View" }), events: "1.3M", score: 3.1, badge: t({ ar: "خطآن", en: "2 Errors" }), tone: "error" as const },
  ];
  const afterRows = [
    { event: t({ ar: "شراء", en: "Purchase" }), events: "1.3K", score: 9.2, badge: t({ ar: "ممتاز", en: "Great" }), tone: "great" as const },
    { event: t({ ar: "إضافة للسلة", en: "Add To Cart" }), events: "23K", score: 8.5, badge: t({ ar: "جيد", en: "Good" }), tone: "good" as const },
    { event: t({ ar: "تسجيل", en: "Sign Up" }), events: "23K", score: 8.7, badge: t({ ar: "جيد", en: "Good" }), tone: "good" as const },
    { event: t({ ar: "مشاهدة منتج", en: "View Item" }), events: "58K", score: 7.4, badge: t({ ar: "جيد", en: "Good" }), tone: "good" as const },
    { event: t({ ar: "بدء الدفع", en: "Start Checkout" }), events: "2.1K", score: 8.9, badge: t({ ar: "ممتاز", en: "Great" }), tone: "great" as const, faded: true },
  ];

  // The problem → fix pairs shown in the hero diagram: what tracking looks like
  // without Rasid (left) vs. what Rasid turns each issue into (right).
  const beforeAfter = [
    { bad: t({ ar: "بيانات ناقصة", en: "Incomplete data" }), good: t({ ar: "بيانات كاملة ومثراة", en: "Complete, enriched data" }) },
    { bad: t({ ar: "أحداث مكررة", en: "Duplicate events" }), good: t({ ar: "إزالة تكرار آلية", en: "Auto-deduplicated" }) },
    { bad: t({ ar: "تتبع محجوب (iOS وحاجبات)", en: "Tracking gets blocked" }), good: t({ ar: "تتبع خادمي ما ينحجب", en: "Unblockable server-side" }) },
    { bad: t({ ar: "إسناد غير دقيق", en: "Inaccurate attribution" }), good: t({ ar: "إسناد دقيق وعائد أعلى", en: "Accurate attribution, higher ROAS" }) },
  ];

  const steps = [
    {
      num: "01",
      title: t({ ar: "اربط متجرك", en: "Connect your store" }),
      desc: t({ ar: "تطبيق رسمي لزد بنقرة وحدة. سلة، ووردبريس، ماجنتو، والمتجر المخصص (Webhook) قريباً.", en: "One-click official app for Zid. Salla, WordPress, Magento, and custom (Webhook) stores coming soon." }),
      stat: "15 min",
      statLabel: t({ ar: "متوسط وقت التركيب", en: "Avg. setup time" }),
      Icon: Database,
      mockup: (
        <div className="space-y-2.5 num-ltr">
          {[
            { label: "Zid Store · saudi.com", state: t({ ar: "متصل", en: "connected" }), color: "#a78bfa", soon: false },
            { label: "Salla Store · uae.com", state: t({ ar: "قريباً", en: "soon" }), color: "#a3e635", soon: true },
            { label: "Magento · multi-region", state: t({ ar: "قريباً", en: "soon" }), color: "#fb923c", soon: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-zinc-300">{s.label}</span>
              </div>
              <span className={`text-[10px] font-bold ${lang === "ar" ? "" : "uppercase tracking-widest"} ${s.soon ? "text-amber-400" : "text-emerald-400"}`}>{s.state}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "02",
      title: t({ ar: "أضف قنوات إعلاناتك", en: "Add your ad channels" }),
      desc: t({ ar: "الصق معرّف البكسل ورمز وصول Conversions API لميتا وتيك توك وسناب — مع رمز حدث الاختبار لميتا وتيك توك. راصد يتحقق من بياناتك على طول.", en: "Paste your Pixel ID and Conversions API access token for Meta, TikTok, and Snap — plus a test event code for Meta & TikTok. Rasid verifies your credentials on the spot." }),
      stat: "3 APIs",
      statLabel: t({ ar: "تكاملات مدمجة", en: "Native integrations" }),
      Icon: Radio,
      mockup: (
        <div className="grid grid-cols-2 gap-2 num-ltr">
          {[
            { name: "Meta CAPI", color: "#1877F2" },
            { name: "TikTok Events", color: "#ec4899" },
            { name: "Snap CAPI", color: "#facc15" },
            { name: "Google Enhanced", color: "#ea4335", soon: true },
          ].map((c) => (
            <div key={c.name} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/8">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                {c.soon ? (
                  <span className={`text-[10px] font-bold ${lang === "ar" ? "" : "uppercase tracking-widest"} text-amber-400`}>{t({ ar: "قريباً", en: "soon" })}</span>
                ) : (
                  <span className={`text-[10px] font-bold ${lang === "ar" ? "" : "uppercase tracking-widest"} text-emerald-400`}>{t({ ar: "مباشر", en: "live" })}</span>
                )}
              </div>
              <div className="text-xs text-zinc-200 font-medium">{c.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "03",
      title: t({ ar: "إثراء وتوجيه آلي", en: "Automatic enrich & route" }),
      desc: t({ ar: "محرك راصد يستقبل الأحداث، يثريها بـ Geo IP والـ PII المُشفّر، يشيل التكرار، ويوجّهها مباشرة لكل منصة.", en: "Rasid's engine receives events, enriches them with Geo IP and hashed PII, deduplicates them, and routes them to each ad platform." }),
      stat: "+34%",
      statLabel: t({ ar: "تحسّن في جودة المطابقة", en: "Match quality lift" }),
      Icon: Workflow,
      mockup: (
        <div className="space-y-2 num-ltr">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/8 text-[11px] text-zinc-400 font-mono">{t({ ar: "حدث خام", en: "raw event" })}</span>
            <span className="text-zinc-600">→</span>
            <span className="px-2.5 py-1.5 rounded-md bg-green-500/15 border border-green-400/30 text-[11px] text-green-300 font-mono">{t({ ar: "مُثرى", en: "enriched" })}</span>
            <span className="text-zinc-600">→</span>
            <span className="px-2.5 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-[11px] text-emerald-300 font-mono">{t({ ar: "تم التسليم", en: "delivered" })}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ Geo IP</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ SHA-256</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ event_id</div>
            <div className="p-2 rounded-md bg-white/[0.04] border border-white/8 text-zinc-400">+ session</div>
          </div>
        </div>
      ),
    },
    {
      num: "04",
      title: t({ ar: "تابع وحسّن العائد", en: "Monitor & optimize ROAS" }),
      desc: t({ ar: "لوحة لحظية لكل حدث، EMQ لكل منصة، تنبيهات فورية لمّا يصير خلل، وتقارير ROAS قبل/بعد.", en: "Real-time per-event dashboard, EMQ per platform, instant failure alerts, and before/after ROAS reporting." }),
      stat: "3.2x",
      statLabel: t({ ar: "متوسط ROAS بعد 30 يوم", en: "Avg. ROAS after 30 days" }),
      Icon: LineChart,
      mockup: (
        <div className="space-y-3 num-ltr">
          <div className="flex items-end gap-1.5 h-16">
            {[35, 52, 41, 68, 58, 80, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-green-600/40 to-green-400" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>{t({ ar: "قبل", en: "before" })}</span>
            <span className="text-emerald-400 font-bold">+78% ROAS</span>
            <span>{t({ ar: "بعد", en: "after" })}</span>
          </div>
        </div>
      ),
    },
  ];

  const pricingPlans = sharedPricingPlans.map((p) => ({
    name: t(p.name),
    price: p.monthly,
    custom: p.custom,
    orders: `${t(p.orders.prefix)} ${p.orders.value}`,
    popular: p.popular,
  }));

  const planFeatures = t(sharedPlanFeatures);


  const faqs = [
    {
      q: t({ ar: "عندي بكسل ميتا شغّال، ليه أحتاج راصد؟", en: "I already have a Meta pixel running — why do I need Rasid?" }),
      a: t({
        ar: "البكسل التقليدي يشتغل من المتصفح، وراصد يشتغل من الخادم. الاثنين مع بعض = تغطية كاملة. البكسل لحاله يضيّع 30–40٪ من بياناتك بسبب iOS وحاجبات الإعلانات وإعدادات الخصوصية. راصد يرجّع لك البيانات الضايعة ويكمّل اللي يعجز عنه البكسل — ولمّا تشغّلهم مع بعض، راصد يتولّى إزالة التكرار آلي.",
        en: "The standard pixel runs from the browser. Rasid runs from the server. Together = full coverage. The pixel alone loses 30–40% of your data to iOS, ad-blockers, and privacy settings. Rasid recovers what the pixel misses — and when both run side-by-side, Rasid handles deduplication automatically.",
      }),
    },
    {
      q: t({ ar: "كم بأكسب فعلياً؟ وش الفرق العملي؟", en: "What's the practical difference? How much do I actually gain?" }),
      a: t({
        ar: "التجار اللي انتقلوا للتتبع الخادمي شافوا تحسّن ROAS بين 15–35٪ — لأن ميتا وتيك توك بدت تشوف بيانات أكثر، فحسّنت استهداف إعلاناتك بدقة أعلى. وفي أول 30 يوم، عادة نشوف استرجاع 20–35٪ من التحويلات الضايعة بسبب iOS وحاجبات الإعلانات.",
        en: "Merchants who switched to server-side tracking see ROAS lift between 15–35% — because Meta and TikTok start seeing more data and optimize targeting much more accurately. In the first 30 days, we typically see 20–35% recovery of conversions previously lost to iOS and ad-blockers.",
      }),
    },
    {
      q: t({ ar: "بيبطّئ موقعي؟", en: "Will it slow down my store?" }),
      a: t({
        ar: "لا — بالعكس تماماً. السكربت خفيف مرة، ومعظم الشغل ينتقل من المتصفح إلى الخادم، فيصير متجرك أسرع. ومن غير ما تحمّل بكسلات ثقيلة من خوادم خارجية.",
        en: "No — quite the opposite. The script is lightweight, and most of the work moves from the browser to the server, so your store actually gets faster. No heavy third-party pixel scripts loading from external servers.",
      }),
    },
    {
      q: t({ ar: "بيانات عملائي آمنة؟", en: "Is my customer data safe?" }),
      a: t({
        ar: "إيميلات وأرقام جوالات العملاء ما تنحفظ أبداً بصيغتها الأصلية. نحوّلها لرمز مشفّر (SHA-256 hash) قبل ما نرسلها لميتا — حتى إحنا ما نقدر نقراها. ملتزمين بنظام حماية البيانات الشخصية (PDPL) السعودي و GDPR الأوروبي، وخوادمنا في المنطقة، مع اتفاقيات DPA جاهزة.",
        en: "Customer emails and phone numbers are never stored in their original form. We convert them into an encrypted SHA-256 hash before sending to Meta — even we cannot read them. Fully compliant with Saudi PDPL and EU GDPR, with regional servers and DPAs available on request.",
      }),
    },
    {
      q: t({ ar: "لو ميتا صار فيها خلل تقني، بأخسر بياناتي؟", en: "If Meta has a technical issue, does my data get lost?" }),
      a: t({
        ar: "لا. البيانات تنحفظ على خوادمنا في صف انتظار، وترجع تنرسل آلي أول ما ترجع ميتا. ما يضيع أي حدث، حتى لو تأخّر التسليم كم دقيقة.",
        en: "No. Data is held in a queue on our side and re-sent automatically once Meta is back online. Nothing is lost — even if delivery is delayed by a few minutes.",
      }),
    },
    {
      q: t({ ar: "كم يكلّف الاشتراك؟", en: "How much does it cost?" }),
      a: t({
        ar: "البداية: ⃁1000/شهرياً للمتاجر الصغيرة · الأعمال: ⃁3000/شهرياً للمتاجر المتوسطة · التوسّع: ⃁5000/شهرياً للمتاجر اللي عندها حركة عالية. كل الباقات فيها تجربة مجانية، والاشتراك عادة يغطّي نفسه من التحويلات اللي ترجع في أول 30 يوم.",
        en: "Starter ⃁1,000/month for small stores · Business ⃁3,000/month for mid-size stores · Scale-up ⃁5,000/month for high-volume stores. All plans include a free trial, and the subscription typically pays for itself within the first 30 days of recovered conversions.",
      }),
    },
    {
      q: t({ ar: "يدعم ميتا وتيك توك وسناب في نفس الوقت؟", en: "Does it support Meta, TikTok, and Snapchat all at once?" }),
      a: t({
        ar: "إي. كل المنصات تشتغل مع بعض من تركيب واحد بس — Meta CAPI، TikTok Events API، و Snap CAPI. ما تحتاج تجهّز كل منصة لحالها.",
        en: "Yes. Meta CAPI, TikTok Events API, and Snap CAPI all run from a single install. No need to configure each platform separately.",
      }),
    },
    {
      q: t({ ar: "أستخدم تطبيق تتبّع على متجري — بيتعارض مع راصد؟", en: "What if I already use a tracking app on my store?" }),
      a: t({
        ar: "معظم تطبيقات التتبع على المتاجر ترسل البيانات من المتصفح، مو من الخادم. راصد يشتغل على مستوى الخادم — يعني يلتقط اللي تفوّته هذي التطبيقات. في أغلب الحالات يشتغلون مع بعض، مو ضد بعض، وراصد يتولّى إزالة التكرار آلي.",
        en: "Most store tracking apps send data from the browser, not the server. Rasid works at the server level — meaning it captures what those apps miss. In most cases the two run together, not against each other, with Rasid automatically deduplicating.",
      }),
    },
    {
      q: t({ ar: "كيف التركيب؟ أحتاج مطوّر؟", en: "How is it installed? Do I need a developer?" }),
      a: t({
        ar: "على زد: تطبيق بنقرة وحدة من متجر التطبيقات — تدخّل Pixel ID و Access Token، وخلصت. سلة، ووردبريس، ماجنتو، والمتجر المخصص قريباً. الوقت اللي يبيه: 10 دقايق، حتى من غير أي خبرة تقنية.",
        en: "On Zid: one-click app from the app store — enter your Pixel ID and Access Token, done. Salla, WordPress, Magento, and custom stores are coming soon. Time required: 10 minutes — even with zero technical experience.",
      }),
    },
    {
      q: t({ ar: "في دعم بالعربي؟", en: "Is there Arabic support?" }),
      a: t({
        ar: "إي. لوحة التحكم متوفرة بالعربي كامل، وفريق الدعم عندنا يردّ بالعربي — مع توثيق كامل بالعربي وقنوات تواصل عبر واتساب والإيميل.",
        en: "Yes. The dashboard is fully available in Arabic, our support team responds in Arabic, and we provide complete Arabic documentation with WhatsApp and email support channels.",
      }),
    },
    {
      q: t({ ar: "متى بأشوف الأثر على حملاتي؟", en: "How fast can I see an impact?" }),
      a: t({
        ar: "البيانات توصل لمنصات الإعلانات من أول لحظة للتركيب. الأثر على الخوارزمية يبيّن عادة خلال 7–14 يوم — وقت يكفي المنصة عشان تعيد التعلّم من إشاراتك النظيفة الجديدة. خلال أول 30 يوم، تشوف EMQ يرتفع من ~6 إلى 8.5–9.5، وتحسّن ROAS بنسبة 15–40٪ حسب القناة وحجم الإنفاق.",
        en: "Data starts streaming to ad platforms the moment install completes. Algorithm impact usually shows within 7–14 days — enough time for the platform to re-learn against your cleaner signals. Within the first 30 days, EMQ typically climbs from ~6 to 8.5–9.5, and ROAS lifts 15–40% depending on channel and spend.",
      }),
    },
    {
      q: t({ ar: "وش أول خطوة؟", en: "What's the first step?" }),
      a: t({
        ar: "فعّل راصد من متجر تطبيقات زد. التركيب بضغطة، وفريقنا يدعمك في الإعداد.",
        en: "Activate Rasid from the Zid app market. One-click install, with guided setup from our team.",
      }),
    },
  ];

  const trustItems = [
    { Icon: Timer, label: t({ ar: "ربط مباشر بأقل من 10 دقائق لجميع المنصات", en: "Connect all platforms in under 10 minutes" }) },
    { Icon: Sparkles, label: t({ ar: "من غير أي كود أو خبرة تقنية", en: "No code or tech skills" }) },
    { Icon: Bell, label: t({ ar: "دعم عربي كامل", en: "Full Arabic support" }) },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 px-4">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60 -z-10" />

        <div className="container mx-auto relative max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* LEFT — copy */}
          <div className="text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 mb-7"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-semibold text-green-700">
              {t({ ar: "منصة التتبع الخادمي للتجار", en: "The Server-Side Tracking Platform" })}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-7 leading-[1.05]"
          >
            {lang === "ar" ? (
              <>مبيعات إعلانك بتكون صحيحة والعائد يرتفع 40٪</>
            ) : (
              <>Your ad sales become accurate and your return rises 40%</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto lg:mx-0 mb-9 leading-relaxed"
          >
            {t({
              ar: "حالياً 40٪ من ميزانيتك الإعلانية ضايع لسببين: كل منصة تنسب البيعة لنفسها وتقول «هذي مني»، وكل منصة تواجه صعوبة توصل للعملاء المناسبين لك. راصد يبيّن لك البيعة الصحيحة ويرسلها للمنصة الصح — وبكذا مبيعاتك تطلع صحيحة، والمنصّات تعرف مين العملاء اللي يشترون منك ومين يناسبك.",
              en: "Right now, 40% of your ad budget is wasted for two reasons: every platform claims the sale as its own, and every platform struggles to reach the right customers for you. Rasid shows you the real sale and sends it to the right platform — so your sales are accurate, and the platforms learn who actually buys from you and who fits you best.",
            })}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-base h-12 px-7 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
              data-testid="hero-start-trial"
            >
              <a
                href="https://apps.zid.sa/application/6842"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t({ ar: "فعّل على زد الآن", en: "Activate on Zid now" })}
                <ArrowCTA className="ms-1 w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base h-12 px-7 border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
              data-testid="hero-book-call"
            >
              <a
                href="https://calendar.app.google/PHiuLc9ofgqw4XXk6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarClock className="me-1 w-4 h-4" />
                {t({ ar: "احجز مكالمة", en: "Book a call" })}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mt-7 text-sm text-zinc-600"
          >
            {trustItems.map((item) => (
              <span key={item.label as string} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero image — live "radar" capturing signals across every platform,
            with the before/after match-rate result cards shown beneath it as
            the payoff of routing those clean signals through Rasid. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative w-full mt-6 lg:mt-0"
        >
          {/* ambient brand glow */}
          <div className="absolute inset-x-0 -top-10 bottom-0 -z-10 bg-gradient-to-tr from-emerald-200/50 via-green-100/40 to-rose-100/40 blur-[90px] rounded-[45%] pointer-events-none" />

          <div className="relative w-full max-w-md mx-auto lg:me-0 lg:ms-auto">
            {/* RADAR — multi-platform signal capture */}
            <HeroRadar />

            {/* connector label: radar → results */}
            <div className="flex items-center justify-center gap-2.5 mt-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                {t({ ar: "النتيجة على منصاتك", en: "The result on your platforms" })}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-300" />
            </div>

            {/* RESULT cards — before/after match-rate snapshots styled as a live
                dashboard, centered under the radar with the After card lifted
                in front. Each row carries a proportional score bar. */}
            <div className="relative num-ltr grid grid-cols-2 gap-3 sm:gap-4 items-stretch">
              {/* center connector — before → after */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200/80">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              </div>

              {/* BEFORE — left card, weak match rates. Lower contrast so the
                  After card on the right clearly wins. */}
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
                      {t({ ar: "قبل راصد", en: "Before Rasid" })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <ScoreRing score={3.0} color="#f43f5e" />
                      <span className="text-[11px] font-extrabold text-rose-500 num-ltr">3.0/10</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {beforeRows.map((r, i) => (
                      <div key={r.event}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[12px] font-bold text-zinc-900">{r.event}</span>
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

              {/* AFTER — right card, high match rates. Hover-lifts and carries
                  a glowing top accent to read as the active, winning state. */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
                className="relative z-20"
              >
                <div className="h-full group relative overflow-hidden rounded-2xl bg-white border border-emerald-200 ring-1 ring-emerald-500/10 shadow-[0_24px_50px_-16px_rgba(16,185,129,0.42)] p-3.5 transition-transform duration-300 hover:-translate-y-1">
                  {/* glowing top accent */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {t({ ar: "بعد راصد", en: "After Rasid" })}
                    </span>
                    <div className="flex items-center gap-1.5 num-ltr">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-[9px] font-extrabold text-emerald-700">
                        <TrendingUp className="w-2.5 h-2.5" />
                        +6.2
                      </span>
                      <ScoreRing score={9.2} color="#10b981" />
                      <span className="text-[11px] font-extrabold text-emerald-600">9.2/10</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {afterRows.slice(0, 3).map((r, i) => (
                      <div key={r.event}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[12px] font-bold text-zinc-900">{r.event}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-bold text-emerald-600 num-ltr">{r.score.toFixed(1)}</span>
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap text-white bg-emerald-500">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {r.badge}
                            </span>
                          </div>
                        </div>
                        <div className="h-1 w-full rounded-full bg-emerald-50 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
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

      {/* FOUNDER'S MESSAGE — X / Twitter thread */}
      <section className="pt-24 px-4 bg-black">
        <div className="container mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-black overflow-hidden"
          >
            <div className="px-5 py-5 md:px-7 md:py-7">
              {(() => {
                const name = t({ ar: "راصد", en: "Rasid" });
                const handle = "@rasid";
                return (
                  <>
                    <ThreadTweet name={name} handle={handle} time={t({ ar: "٢س", en: "2h" })}>
                      {t({
                        ar: (
                          <>
                            تشوف مبيعات إعلاناتك من المنصات{" "}
                            <span className="font-bold text-white num-ltr">5,000</span>… بس الواقع في متجرك إنها{" "}
                            <span className="font-bold text-white num-ltr">3,000</span>.
                            <br />
                            <span className="font-bold text-emerald-400">وين اختفت الـ 2,000؟</span> 👇
                          </>
                        ),
                        en: (
                          <>
                            Your ad platforms report{" "}
                            <span className="font-bold text-white num-ltr">5,000</span> in sales… but your store's
                            reality is <span className="font-bold text-white num-ltr">3,000</span>.
                            <br />
                            <span className="font-bold text-emerald-400">Where did the other 2,000 go?</span> 👇
                          </>
                        ),
                      })}
                    </ThreadTweet>

                    <ThreadTweet name={name} handle={handle} time={t({ ar: "٢س", en: "2h" })}>
                      {t({
                        ar: (
                          <>
                            السبب؟ كل منصة تقول «هذي البيعة مني».
                            <br />
                            البيعة اللي تسجّلت في سناب هي نفسها اللي تسجّلت في ميتا… سناب تقول أنا اللي جبتها، وميتا نفس
                            الشي 🤷
                          </>
                        ),
                        en: (
                          <>
                            The cause? Every platform claims "this sale is mine."
                            <br />
                            The sale logged in Snap is the same one logged in Meta — Snap says it brought it, Meta says
                            the exact same thing 🤷
                          </>
                        ),
                      })}
                    </ThreadTweet>

                    <ThreadTweet name={name} handle={handle} time={t({ ar: "٢س", en: "2h" })}>
                      {t({
                        ar: (
                          <>
                            ليش يصير هذا؟
                            <br />
                            نظام التتبّع عند المنصات غير دقيق — وما يقدرون يضبطونه بأنفسهم.
                            <br />
                            السبب: تحديات تقنية خارجة عن تحكّمهم.
                          </>
                        ),
                        en: (
                          <>
                            Why does this happen?
                            <br />
                            The platforms' own tracking is inaccurate — and they can't fix it themselves.
                            <br />
                            The reason: technical limits outside their control.
                          </>
                        ),
                      })}
                    </ThreadTweet>

                    <ThreadTweet name={name} handle={handle} time={t({ ar: "١س", en: "1h" })}>
                      {t({
                        ar: (
                          <>
                            وش أثر هذا عليك؟ مو بس اختلاف أرقام…
                            <br />
                            ❌ سناب يحسب عليك بيعة ما جت عن طريقه
                            <br />
                            ❌ ويجيب لك عملاء «شبيهين» بناس ما اشتروا منك فعلاً
                            <br />
                            النتيجة: هدر مالي + تشتّت، وما تعرف أي منصة تناسبك.
                          </>
                        ),
                        en: (
                          <>
                            What does this cost you? It's not just mismatched numbers…
                            <br />
                            ❌ Snap charges you for a sale it never brought
                            <br />
                            ❌ then sources lookalikes of people who never actually bought
                            <br />
                            The result: wasted money + confusion about which platform fits you.
                          </>
                        ),
                      })}
                    </ThreadTweet>

                    <ThreadTweet name={name} handle={handle} time={t({ ar: "١س", en: "1h" })}>
                      {t({
                        ar: (
                          <>
                            الحل؟ تفعّل راصد ✅
                            <br />
                            يرصد لك كل حاجة، يعرّفك البيعة الصح، ويرسل لسناب وغيرها البيعة الصحيحة من العميل الصحيح.
                          </>
                        ),
                        en: (
                          <>
                            The fix? Turn on Rasid ✅
                            <br />
                            It watches everything, identifies the true sale, and sends Snap and the rest the right sale
                            from the right customer.
                          </>
                        ),
                      })}
                    </ThreadTweet>

                    <ThreadTweet name={name} handle={handle} time={t({ ar: "٥٩د", en: "59m" })} isLast>
                      {t({
                        ar: (
                          <>
                            هل بيصير فوري؟ أكيد لا — يحتاج وقت.
                            <br />
                            خوارزمية إعلاناتك لها شهور أو سنوات على بيانات خطأ، وفجأة تجيها بيانات صحيحة تصلّح السابق كله.
                            <br />
                            لكن الأكيد: بتشوف نمو في الـ ROAS 📈 وبكذا مبيعاتك تفرق.
                          </>
                        ),
                        en: (
                          <>
                            Does it happen instantly? Of course not — it takes time.
                            <br />
                            Your ad algorithm spent months or years on wrong data; suddenly clean data arrives and
                            corrects all of it.
                            <br />
                            But what's certain: you'll see your ROAS grow 📈 — and that's when sales truly change.
                          </>
                        ),
                      })}
                      {/* engagement bar */}
                      <div className="flex items-center gap-7 text-zinc-500 mt-4">
                        <span className="flex items-center gap-1.5 text-[13px] num-ltr">
                          <MessageCircle className="w-[18px] h-[18px]" />312
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] num-ltr">
                          <Repeat2 className="w-[18px] h-[18px]" />1.2K
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] num-ltr">
                          <Heart className="w-[18px] h-[18px]" />4.8K
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] num-ltr">
                          <BarChart3 className="w-[18px] h-[18px]" />98K
                        </span>
                      </div>
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative p-7 md:p-10 lg:p-12">
              {/* heading */}
              <span className="inline-block text-xs font-bold tracking-widest text-green-400 uppercase mb-4">
                {t({ ar: "حاسبة", en: "Calculator" })}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {t({
                  ar: "احسب إنفاقك الإعلاني الضايع",
                  en: "Calculate your wasted ad spend",
                })}
              </h2>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-3 max-w-2xl">
                {t({
                  ar: "تنبيه: الرقم أكبر مما تتوقّع. مع راصد، ترجّع جزء منه كل شهر.",
                  en: "Spoiler alert: it's more than you think. Rasid recovers a slice of it every month.",
                })}
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                {t({
                  ar: "بناءً على بيانات متاجر استخدمت راصد، المعلنين يرجّعون 22٪ من قيمة التحويلات الضايعة في أول 30 يوم — عبر إسناد أدقّ وتقليل الإنفاق على جمهور غلط.",
                  en: "Based on data from stores using Rasid, advertisers recover an average of 22% of lost conversion value in the first 30 days — via cleaner attribution and less waste on the wrong audience.",
                })}
              </p>

              <div className="h-px bg-white/10 my-8 lg:my-10" />

              {/* body — controls + results */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
                {/* left: controls */}
                <div className="flex flex-col">
                  <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                    {t({ ar: "إنفاقك الإعلاني الشهري", en: "Your monthly ad spend" })}
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-7 num-ltr">
                    ⃁{spend.toLocaleString("en-US")}
                  </div>
                  <Slider
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    min={1000}
                    max={250000}
                    step={1000}
                    value={[spend]}
                    onValueChange={(v) => setSpend(v[0])}
                    className="mb-8 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/20 [&>span:first-child>span]:bg-emerald-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-emerald-400 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-[0_0_0_4px_rgba(16,185,129,0.25)]"
                  />
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                    {t({ ar: "الإنفاق الضايع شهرياً", en: "Monthly ad spend wasted" })}
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 space-y-4">
                    {[
                      {
                        label: t({ ar: "من غير تتبّع", en: "Without tracking" }),
                        value: lossNoTracking,
                        pct: Math.round((lossNoTracking / maxLoss) * 100),
                        barClass: "bg-red-500/70",
                        textClass: "text-red-300",
                      },
                      {
                        label: t({ ar: "بكسل بس (وضعك الحين)", en: "Pixel only (you today)" }),
                        value: lossPixelOnly,
                        pct: Math.round((lossPixelOnly / maxLoss) * 100),
                        barClass: "bg-amber-500/70",
                        textClass: "text-amber-300",
                      },
                      {
                        label: t({ ar: "مع راصد", en: "With Rasid" }),
                        value: lossWithRasid,
                        pct: Math.round((lossWithRasid / maxLoss) * 100),
                        barClass: "bg-emerald-500/80",
                        textClass: "text-emerald-300",
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
                          <div
                            className={`h-full ${row.barClass} rounded-full transition-all`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* right: results */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/[0.08] to-transparent border border-emerald-500/20 p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-6">
                    <TrendingUp className="w-4 h-4" />
                    {t({ ar: "متوسط الإيراد الإضافي مع راصد", en: "Average additional revenue with Rasid" })}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/[0.05] border border-white/10 p-5">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5">
                        {t({ ar: "سنوياً", en: "Annually" })}
                      </div>
                      <div className="text-3xl md:text-4xl font-extrabold text-white num-ltr">
                        ⃁{annualRecovery.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/[0.05] border border-white/10 p-5">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5">
                        {t({ ar: "شهرياً", en: "Monthly" })}
                      </div>
                      <div className="text-3xl md:text-4xl font-extrabold text-white num-ltr">
                        ⃁{monthlyRecovery.toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
                      {t({
                        ar: "تقدير متحفّظ مبني على 22٪ استرداد. النتائج تختلف حسب القناة وحجم الإنفاق.",
                        en: "Conservative estimate at 22% recovery. Results vary by channel and ad-spend volume.",
                      })}
                    </p>
                    <Button
                      onClick={() => window.open(ZID_APP_URL, "_blank", "noopener,noreferrer")}
                      className="w-full h-12 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold"
                    >
                      {t({ ar: "فعّل الآن على زد", en: "Activate now on Zid" })}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALOGY — Camera at the door vs Employee in the warehouse */}
      <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-4">
              {t({ ar: "فكّر فيها كذا", en: "Think of it this way" })}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
              {t({
                ar: "كاميرا على الباب، ولا موظّف جوّه المستودع؟",
                en: "A camera at the door, or an employee inside the warehouse?",
              })}
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              {t({
                ar: "البكسل التقليدي واقف على الباب. راصد يشتغل من جوّه — مكان ما تصير المبيعات فعلياً.",
                en: "The browser pixel watches from the doorway. Rasid works inside the store — where sales actually happen.",
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {/* Pixel = camera */}
            <div className="rounded-2xl border-2 border-rose-200 bg-white p-7 md:p-8 relative">
              <div className="absolute top-5 end-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold tracking-widest uppercase">
                <XCircle className="w-3 h-3" />
                {t({ ar: "البكسل التقليدي", en: "Browser pixel" })}
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-5">
                <Camera className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-zinc-950 mb-3">
                {t({ ar: "كاميرا على الباب", en: "A camera at the door" })}
              </h3>
              <p className="text-zinc-700 leading-relaxed mb-5">
                {t({
                  ar: "تخيّل عندك متجر وتبي تعرف كم زبون دخل وكم اشترى. أول حلّ يجيك على بالك: تركّب كاميرا على الباب — وهذي بالضبط مثل بكسل المتصفح.",
                  en: "Imagine you run a store and want to know how many people walked in and bought something. Your first idea is putting a camera at the door — that's exactly what the browser pixel is.",
                })}
              </p>
              <div className="space-y-2.5 text-sm">
                {[
                  t({ ar: "بعض الناس يغطّون الكاميرا (حاجبات الإعلانات)", en: "Some people cover the camera (ad blockers)" }),
                  t({ ar: "بعضهم يدخل من باب جانبي (Safari على iPhone)", en: "Some enter through a side door (Safari on iPhone)" }),
                  t({ ar: "بعضهم يطفّي الإضاءة (إعدادات الخصوصية)", en: "Some turn off the lights (privacy settings)" }),
                ].map((p) => (
                  <div key={p} className="flex items-start gap-2 text-zinc-700">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {t({ ar: "ميتا تشوف من كل 100 عملية بيع", en: "Out of every 100 sales, Meta sees" })}
                </span>
                <span className="text-2xl font-extrabold text-rose-600 num-ltr">40</span>
              </div>
            </div>

            {/* Rasid = warehouse employee */}
            <div className="rounded-2xl mockup-card overflow-hidden shadow-card-lg relative p-7 md:p-8">
              <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-green-500/15 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative">
                <div className="absolute top-0 end-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  {t({ ar: "راصد (خادمي)", en: "Rasid (server-side)" })}
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                  <Warehouse className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {t({ ar: "موظّف جوّه المستودع", en: "An employee inside the warehouse" })}
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-5">
                  {t({
                    ar: "بدل الكاميرا على الباب، نحط موظّف جوّه المستودع يسجّل كل عملية من السجلات الداخلية مباشرة. لمّا أحمد يشتري، الخادم يخبر ميتا على طول — مهما كانت إعداداته أو جهازه.",
                    en: "Instead of a camera at the door, we put an employee inside the warehouse who logs every transaction straight from the store's internal records. When Ahmed buys, the server tells Meta directly — regardless of his settings or device.",
                  })}
                </p>
                <div className="space-y-2.5 text-sm">
                  {[
                    t({ ar: "ما تأثّر بحاجبات الإعلانات", en: "Unaffected by ad blockers" }),
                    t({ ar: "يشتغل على كل جهاز ومتصفح، حتى Safari و iOS", en: "Works on every device & browser — Safari and iOS too" }),
                    t({ ar: "إعدادات الخصوصية ما توقفه", en: "Privacy settings can't stop it" }),
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    {t({ ar: "ميتا تشوف من كل 100 عملية بيع", en: "Out of every 100 sales, Meta sees" })}
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-300 num-ltr">95</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IS THE PIXEL ENOUGH — 3-way comparison */}
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
              {t({
                ar: "متجرك سجّل 100 عملية بيع اليوم. كم وحدة شافت ميتا؟",
                en: "Your store made 100 sales today. How many did Meta see?",
              })}
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
              {t({
                ar: "ثلاث حالات حقيقية: متجر من غير بكسل، متجر ببكسل المتصفح بس، ومتجر يستخدم راصد. كم تخسر، وكم تربح، في كل حالة.",
                en: "Three real scenarios: a store with no pixel, a store with browser pixel only, and a store using Rasid. What you lose and what you gain in each.",
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                key: "none",
                Icon: EyeOff,
                label: t({ ar: "من غير بكسل", en: "No pixel" }),
                badge: "bg-zinc-100 border-zinc-300 text-zinc-700",
                border: "border-zinc-300",
                dotColor: "bg-zinc-300",
                visible: 0,
                visibleLabel: t({ ar: "0٪ من المبيعات تشوفها ميتا", en: "0% of sales visible to Meta" }),
                impact: t({ ar: "−40٪ ميزانية تروح هدر شهرياً", en: "−40% of budget wasted monthly" }),
                impactColor: "text-rose-600",
                lines: [
                  t({ ar: "ميتا تعرف بس مين نقر، مو مين اشترى", en: "Meta knows who clicked, not who bought" }),
                  t({ ar: "الخوارزمية بلا بوصلة — استهداف عشوائي", en: "Algorithm has no compass — random targeting" }),
                  t({ ar: "ROAS ما تقدر تقيسه", en: "ROAS cannot be measured" }),
                ],
                verdict: t({ ar: "إنت تطير في الظلام", en: "You're flying blind" }),
                verdictColor: "text-zinc-700 bg-zinc-100 border-zinc-200",
                featured: false,
              },
              {
                key: "pixel",
                Icon: Camera,
                label: t({ ar: "ببكسل المتصفح بس", en: "Browser pixel only" }),
                badge: "bg-amber-100 border-amber-200 text-amber-700",
                border: "border-amber-300",
                dotColor: "bg-amber-400",
                visible: 40,
                visibleLabel: t({ ar: "40٪ من المبيعات تشوفها ميتا", en: "40% of sales visible to Meta" }),
                impact: t({ ar: "−22٪ تحويلات ضايعة من القياس", en: "−22% of conversions invisible to reporting" }),
                impactColor: "text-amber-700",
                lines: [
                  t({ ar: "ROAS أقل من الحقيقة بـ 60٪", en: "ROAS undercounted by 60%" }),
                  t({ ar: "تقصّ حملات ناجحة بناءً على بيانات ناقصة", en: "Cutting winning campaigns on partial data" }),
                  t({ ar: "Lookalikes مبنية على نص الصورة", en: "Lookalikes built on half the picture" }),
                ],
                verdict: t({ ar: "تشوف نص الصورة بس", en: "Half the picture, full confidence" }),
                verdictColor: "text-amber-700 bg-amber-100 border-amber-200",
                featured: false,
              },
              {
                key: "rased",
                Icon: Warehouse,
                label: t({ ar: "مع راصد (بكسل + خادمي)", en: "With Rasid (pixel + server-side)" }),
                badge: "bg-emerald-100 border-emerald-200 text-emerald-700",
                border: "border-emerald-400",
                dotColor: "bg-emerald-500",
                visible: 95,
                visibleLabel: t({ ar: "95٪ من المبيعات تشوفها ميتا", en: "95% of sales visible to Meta" }),
                impact: t({ ar: "+22٪ متوسط استرداد إيرادات شهرياً", en: "+22% avg revenue recovered monthly" }),
                impactColor: "text-emerald-600",
                lines: [
                  t({ ar: "ROAS الظاهر = ROAS الحقيقي", en: "Visible ROAS = real ROAS" }),
                  t({ ar: "خوارزمية تتعلّم من مشترين حقيقيين", en: "Algorithm learns from actual buyers" }),
                  t({ ar: "Lookalikes دقيقة · ROAS أعلى 15–35٪", en: "Precise lookalikes · 15–35% higher ROAS" }),
                ],
                verdict: t({ ar: "الصورة الكاملة، وقرارات مبنية على الواقع", en: "Full picture, decisions on reality" }),
                verdictColor: "text-emerald-700 bg-emerald-100 border-emerald-200",
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
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                    {t({ ar: "التغطية الكاملة", en: "Full coverage" })}
                  </div>
                )}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase mb-4 ${sc.badge}`}>
                  <sc.Icon className="w-3 h-3" />
                  {sc.label}
                </div>

                <div className="grid grid-cols-10 gap-1 mb-3">
                  {Array.from({ length: 100 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-sm ${idx < sc.visible ? sc.dotColor : "bg-zinc-200"}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-zinc-600 mb-5">{sc.visibleLabel}</div>

                <div className={`text-2xl md:text-3xl font-extrabold ${sc.impactColor} mb-4`}>
                  {sc.impact}
                </div>

                <ul className="space-y-2 mb-5 text-sm">
                  {sc.lines.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-zinc-700">
                      {sc.key === "rased" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className={`w-4 h-4 shrink-0 mt-0.5 ${sc.key === "pixel" ? "text-amber-500" : "text-zinc-400"}`} />
                      )}
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold ${sc.verdictColor}`}>
                  {sc.verdict}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center md:text-start">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <TrendingDown className="w-7 h-7 text-rose-500 shrink-0" />
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 num-ltr">−⃁2,200</div>
                  <div className="text-xs text-zinc-600">
                    {t({ ar: "خسارة شهرية بالبكسل لحاله عند إنفاق ⃁10K", en: "Monthly loss with pixel only at ⃁10K spend" })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start md:border-x md:border-zinc-200 md:px-5">
                <Activity className="w-7 h-7 text-zinc-500 shrink-0" />
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 num-ltr">7–14 {t({ ar: "يوم", en: "days" })}</div>
                  <div className="text-xs text-zinc-600">
                    {t({ ar: "لين تتعلّم الخوارزمية من بيانات راصد", en: "for the algorithm to re-learn with Rasid" })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <TrendingUp className="w-7 h-7 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 num-ltr">+15–35%</div>
                  <div className="text-xs text-zinc-600">
                    {t({ ar: "متوسط تحسّن ROAS مع راصد", en: "average ROAS lift with Rasid" })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm transition-colors"
            >
              {t({ ar: "شوف التحليل الكامل والأثر بالأرقام", en: "See the full breakdown and dollar impact" })}
              <ArrowCTA className="w-4 h-4" />
            </Link>
            <p className="text-xs text-zinc-500 mt-3">
              {t({
                ar: "حاسبة تفاعلية، أمثلة حقيقية، وردود على الاعتراضات اللي تتكرر.",
                en: "Interactive calculator, real examples, and answers to common objections.",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* 4 PILLARS — What Rasid actually does */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-4">
              {t({ ar: "وش يسوّي راصد بالضبط", en: "What Rasid actually does" })}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
              {t({ ar: "أربع وظائف، شرح بسيط، وأمثلة حقيقية", en: "Four jobs, plain English, real examples" })}
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              {t({
                ar: "خلف الستار، راصد يسوّي أربعة أشياء — كل وحدة منها ترجّع لك جزء من إنفاقك الإعلاني.",
                en: "Under the hood, Rasid does four things — and each one wins back a slice of your ad spend.",
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                num: "01",
                Icon: Server,
                title: t({ ar: "يلتقط الأحداث من الخادم", en: "Captures events from the server" }),
                desc: t({
                  ar: "كل اللي يصير في متجرك (زيارة، إضافة لسلة، شراء) ينرسل مباشرة لمنصات الإعلانات من غير ما يمرّ عبر المتصفح.",
                  en: "Everything that happens in your store (page view, add to cart, purchase) is sent straight to ad platforms — without going through the browser.",
                }),
                example: t({
                  ar: "مثال: أحمد كمّل طلب بقيمة 480 ر.س على Safari مع iOS 17. البكسل ما وصل، لكن خادم متجرك أرسل الحدث لميتا في 12ms.",
                  en: "Example: Ahmed completes a 480 SAR order on Safari iOS 17. The pixel never fires — but your server pushes the event to Meta in 12ms.",
                }),
              },
              {
                num: "02",
                Icon: ClipboardCheck,
                title: t({ ar: "يُثري البيانات قبل إرسالها", en: "Enriches data before sending" }),
                desc: t({
                  ar: "لمّا يكتمل الطلب، راصد ياخذ إيميل العميل ورقم جواله، ينسّقها بالصيغة الصحيحة، ويشفّرها بـ SHA-256 ثم يرسلها لميتا — عشان تطابقها بقاعدة بياناتها وتعرف العميل بالضبط.",
                  en: "When an order completes, Rasid takes the customer's email and phone, formats them correctly, hashes them with SHA-256, then sends them to Meta — so Meta can match the customer in its database and identify them precisely.",
                }),
                example: t({
                  ar: "مثال: \"  Ahmed.Ali@Gmail.com\" يتحوّل تلقائي إلى \"ahmed.ali@gmail.com\" ثم إلى hash، ورقم \"0501234567\" إلى صيغة E.164 الدولية \"+966501234567\".",
                  en: "Example: \"  Ahmed.Ali@Gmail.com\" is auto-normalized to \"ahmed.ali@gmail.com\" then hashed; \"0501234567\" is normalized to E.164 \"+966501234567\" — exactly the shape Meta expects.",
                }),
              },
              {
                num: "03",
                Icon: Combine,
                title: t({ ar: "يمنع التكرار آلياً", en: "Prevents duplicate counting" }),
                desc: t({
                  ar: "لو أرسل البكسل والخادم نفس الطلب، راصد يكشف التكرار ويلغي النسخة الزايدة. ميتا تستلم العملية مرة وحدة بس، لا أكثر ولا أقل.",
                  en: "If the browser pixel and the server both send the same order, Rasid detects the duplicate and removes it. Meta receives the order once and only once.",
                }),
                example: t({
                  ar: "مثال: طلب #20891 يدخل عبر البكسل ثم عبر الخادم خلال 6 ثوانٍ. راصد يربطهم بنفس event_id ويرسل واحد بس — لا تضخّم في ROAS، ولا فقد في الإسناد.",
                  en: "Example: Order #20891 fires from the pixel and the server within 6 seconds. Rasid ties them with the same event_id and sends only one — no inflated ROAS, no broken attribution.",
                }),
              },
              {
                num: "04",
                Icon: Shield,
                title: t({ ar: "يتجاوز حاجبات الإعلانات", en: "Bypasses ad blockers" }),
                desc: t({
                  ar: "السكربت يشتغل من نطاق متجرك نفسه (مثل track.yourstore.com)، مو من خادم خارجي. حاجبات الإعلانات ما تقدر تتعرّف عليه أو تحجبه.",
                  en: "The script runs from your store's own subdomain (e.g. track.yourstore.com), not from an external server. Ad blockers have no way to identify or block it.",
                }),
                example: t({
                  ar: "مثال: 42٪ من زوّارك يستخدمون حاجب إعلانات. مع راصد، طلباتهم توصل لميتا مثل أي زائر ثاني — كأن الحاجب مو موجود.",
                  en: "Example: 42% of your visitors use an ad blocker. With Rasid, their orders reach Meta exactly like any other visitor — as if the blocker wasn't there.",
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
                  <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase num-ltr">
                    {p.num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center">
                    <p.Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-zinc-950 mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3.5">
                  <p className="text-xs md:text-sm text-zinc-700 leading-relaxed">
                    {p.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      {/* HOW IT WORKS — pre-built CAPI integrations + 4-step process (combined) */}
      <section id="steps" className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-4">
              {t({ ar: "تكاملات CAPI جاهزة · كيف يشتغل راصد", en: "Pre-built CAPI integrations · How it works" })}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
              {t({ ar: "من الإعداد إلى الإسناد الكامل في 4 خطوات", en: "From setup to full attribution in 4 steps" })}
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              {t({
                ar: "اربط ميتا وجوجل وتيك توك وسناب — فعّل، أضف البكسلات والتوكن، وخلّ راصد يجمع ويُثري ويوجّه كل حدث.",
                en: "Connect Meta, Google, TikTok & Snapchat — activate, add your pixels and token, then let Rasid collect, enrich, and route every event.",
              })}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* LEFT — live preview that reflects the active step */}
            <div className="lg:col-span-2 order-2 lg:order-1 lg:sticky lg:top-24">
              <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative">
                <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-green-500/15 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500" />
                <div className="relative p-6 md:p-7">
                  {/* Header: active step identity + progress dots */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(22,163,74,0.45)]">
                        {(() => {
                          const ActiveIcon = steps[activeStep].Icon;
                          return <ActiveIcon className="w-5 h-5 text-white" />;
                        })()}
                        <span className={`absolute -top-1.5 ${lang === "ar" ? "-left-1.5" : "-right-1.5"} w-5 h-5 rounded-full bg-white text-green-700 text-[10px] font-bold flex items-center justify-center num-ltr ring-2 ring-zinc-950`}>
                          {activeStep + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white leading-tight truncate">
                          {steps[activeStep].title}
                        </div>
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
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeStep ? "w-5 bg-emerald-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Animated mockup body for the active step */}
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

                  {/* Live streaming footer */}
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-[11px] font-bold text-emerald-300">
                        {t({ ar: "يتم بثّ الأحداث الآن", en: "Streaming events live" })}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 num-ltr">1,284 / hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — interactive 4-step timeline */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="relative">
                {/* Vertical connector running through the step badges */}
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
                          isActive
                            ? "border-green-300 shadow-card-lg ring-1 ring-green-200"
                            : "border-zinc-100 shadow-card hover:shadow-card-lg hover:border-zinc-200"
                        }`}
                      >
                        <div
                          className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive ? "bg-green-600" : "bg-zinc-950"
                          }`}
                        >
                          <s.Icon className="w-5 h-5 text-white" />
                          <span
                            className={`absolute -top-1.5 ${lang === "ar" ? "-left-1.5" : "-right-1.5"} w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center num-ltr ring-2 ring-white transition-colors ${
                              isActive ? "bg-zinc-950" : "bg-green-600"
                            }`}
                          >
                            {i + 1}
                          </span>
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <h3 className="text-base font-bold text-zinc-950">{s.title}</h3>
                            <span className="shrink-0 text-[11px] font-bold text-green-600 num-ltr bg-green-50 border border-green-100 rounded-full px-2 py-0.5">
                              {s.stat}
                            </span>
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

      {/* CHANNELS + STORES */}
      <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card">
              <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-3">
                {t({ ar: "قنوات الإعلانات", en: "Ad channels" })}
              </span>
              <h3 className="text-2xl font-bold text-zinc-950 mb-6">
                {t({ ar: "يشتغل مع كل المنصات المهمة", en: "Works with every platform that matters" })}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {adChannels.map((c) => (
                  <div
                    key={c.name.en}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center">
                      <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-950">{lang === "ar" ? c.name.ar : c.name.en}</div>
                      <div className="text-[10px] text-zinc-500">CAPI / Events API</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card">
              <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-3">
                {t({ ar: "منصات التجارة", en: "E-commerce platforms" })}
              </span>
              <h3 className="text-2xl font-bold text-zinc-950 mb-6">
                {t({ ar: "اربط متجرك بنقرة وحدة", en: "Connect your store in one click" })}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {storePlatforms.map((s) => {
                  const Comp = s.Comp as any;
                  return (
                    <div
                      key={s.brand}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center">
                        <Comp className="w-5 h-5" style={{ color: s.color }} />
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
                        <div className="text-[10px] text-zinc-500">
                          {s.soon ? t({ ar: "قريباً", en: "Coming soon" }) : t({ ar: "متاح الآن", en: "Available now" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-4">
              {t({ ar: "الأسعار", en: "Pricing" })}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
              {t({ ar: "خطط بسيطة وشفافة", en: "Simple, transparent plans" })}
            </h2>
            <p className="text-lg text-zinc-600">
              {t({
                ar: "تدفع ثمنها في أول 30 يوم من التحويلات اللي ترجع لك.",
                en: "Pays for itself in the first 30 days of recovered conversions.",
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.popular
                    ? "mockup-card shadow-card-lg"
                    : "bg-white border border-zinc-200 shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t({ ar: "الأكثر اختياراً", en: "Most popular" })}
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-3 ${plan.popular ? "text-white" : "text-zinc-950"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-5">
                  {plan.custom ? (
                    <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-zinc-950"}`}>
                      {t({ ar: "مخصّص", en: "Custom" })}
                    </span>
                  ) : (
                    <>
                      <span className={`text-4xl font-bold num-ltr ${plan.popular ? "text-white" : "text-zinc-950"}`}>
                        ⃁{plan.price!.toLocaleString("en-US")}
                      </span>
                      <span className={`text-sm ${plan.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                        {t({ ar: "/شهرياً", en: "/mo" })}
                      </span>
                    </>
                  )}
                </div>
                <div className={`text-sm mb-6 ${plan.popular ? "text-zinc-300" : "text-zinc-700"}`}>
                  <span className={`font-semibold ${plan.popular ? "text-white" : "text-zinc-950"}`}>{plan.orders}</span>{" "}
                  {t({ ar: "طلب بالشهر", en: "orders/mo" })}
                </div>
                <Button
                  onClick={() =>
                    window.open(plan.custom ? WHATSAPP_SUPPORT_URL : ZID_APP_URL, "_blank", "noopener,noreferrer")
                  }
                  className={`w-full ${
                    plan.popular
                      ? "bg-white text-zinc-950 hover:bg-zinc-100 font-semibold"
                      : "bg-zinc-950 text-white hover:bg-zinc-800"
                  }`}
                >
                  {plan.custom
                    ? t({ ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" })
                    : t({ ar: "فعّل الآن على زد", en: "Activate now on Zid" })}
                </Button>

                <div className={`flex-1 space-y-3 pt-6 mt-6 border-t ${plan.popular ? "border-white/10" : "border-zinc-100"}`}>
                  {planFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.popular ? "text-green-400" : "text-green-600"}`} />
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
      <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-4">
              {t({ ar: "أسئلة شائعة", en: "FAQ" })}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
              {t({ ar: "أسئلة يسألها التجار", en: "Questions merchants ask" })}
            </h2>
            <p className="text-lg text-zinc-600">
              {t({
                ar: "كل اللي تحتاج تعرفه قبل ما تربط متجرك بقنوات إعلاناتك.",
                en: "Everything you need to know before connecting your store to your ad channels.",
              })}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-zinc-200 bg-white px-5 shadow-card data-[state=open]:border-zinc-300"
              >
                <AccordionTrigger className="text-start text-base md:text-lg font-semibold text-zinc-950 hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed text-sm md:text-base pb-5">
                  {f.a}
                </AccordionContent>
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {t({
                  ar: "جاهز ترجّع تحويلاتك الضايعة؟",
                  en: "Ready to recover your lost conversions?",
                })}
              </h2>
              <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
                {t({
                  ar: "فعّل راصد الآن من متجر تطبيقات زد وابدأ تربط كل تحويل بإعلانه.",
                  en: "Activate Rasid now from the Zid app market and start linking every conversion to its ad.",
                })}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => window.open(ZID_APP_URL, "_blank", "noopener,noreferrer")}
                  className="text-base h-12 px-8 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold"
                >
                  {t({ ar: "فعّل الآن على زد", en: "Activate now on Zid" })}
                  <ArrowCTA className="ms-1 w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {t({ ar: "من غير بطاقة ائتمانية", en: "No credit card" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {t({ ar: "تركيب 15 دقيقة", en: "15-min setup" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {t({ ar: "دعم بالعربية", en: "Arabic support" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
