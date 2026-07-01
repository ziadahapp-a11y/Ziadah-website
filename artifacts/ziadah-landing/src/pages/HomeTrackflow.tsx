import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
  Coins,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { t as translations } from "@/i18n/translations";
import { useMeetingBooking } from "@/components/MeetingBookingProvider";
import SEO from "@/components/SEO";
import WidgetsShowcaseSection from "@/components/WidgetsShowcaseSection";
import SectorsBriefSection from "@/components/SectorsBriefSection";
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

// Logos keyed by the exact merchant name used in the testimonial data
// (translations.ts → landing.testimonialsRow1/2). Used for the avatar in each
// review card; names without a logo fall back to a colored initial.
const testimonialLogos: Record<string, string> = {
  "روبـن": "https://media.zid.store/6f05584b-ae1f-4f36-98ed-57432e185a35/9113838a-3b34-4692-8658-aee1400ea30c-200x.png",
  "Honey Dose | عسل هني دوز": "https://media.zid.store/a7ba195c-7619-4cbd-8d69-d9efcbb5b774/86116d0f-ee24-43df-96fe-eb235de88ab1-200x.png",
  "متجر عبق الغيم للبخور والمسك": "/logos/abaq-alghim.png",
  "Nahla Oil": "/logos/nahla-oil.svg",
  "FABIAN": "/logos/fabian.png",
  "تمدُّد": "https://media.zid.store/3a5300b3-8c91-48b3-973b-4a439491aa54/151fb0f1-8cfc-46c1-ac1d-6fe22805874c-200x.jpg",
  "Bestclean | بست كلين": "/logos/bestclean.png",
  "عسل رشوف": "/logos/assal-rashouf.svg",
  "سكندز": "/logos/scundz.svg",
  "الجباره": "/logos/aljabarah.svg",
  "Moknh": "https://cdn.salla.sa/gn8RmxHVzto9BHus8MQBr4ksa8bDrB67f2BN6BJX.jpg",
  "شركة اثنى عشر كوب المحدودة": "/logos/12cups.png",
  "كحيلة": "https://media.zid.store/d7a1c023-699a-4a11-9c1d-4ac3de1c541c/ec38bb4f-a97b-4335-af7e-1d01c8df1c2d-200x.png",
  "منصة التبرع لتحفيظ القران الكريم بجمعية نبأ": "https://media.zid.store/b973b0cb-4869-4bad-9f7f-7605b17db09d/7446c429-507d-4551-a04c-b3edfa8ddd21-200x.jpg",
  "تكِنو تولز": "https://cdn.salla.sa/ZYlpqp/lwHvlcLqReOzflpUYwi01YkHvBHpThYNPjO2dCsa.png",
  "skinly": "/logos/skinly.svg",
  "For Her | فور هر": "/logos/for-her.png",
  "جمعية القرآن بالزلفي": "https://media.zid.store/56594f92-bddf-4810-851b-bcdf56526fa2/516acbf9-1b79-4301-8031-c6408fe7677d-200x.png",
  "ZUM": "/logos/zum.png",
  "جمعية برهان لتحفيظ القران": "https://media.zid.store/e18c120e-c286-43cc-bed1-30006c3015e0/b585e03b-a8d5-4fe9-9317-88c771726a3a-200x.png",
  "Nutters.sa": "https://media.zid.store/12666468-7385-4e28-bcff-2fc85a98c040/f52b5768-97e0-41b0-bf02-b31ef77ff26b-200x.png",
  "احتياجات اللياقة \"FitNeeds\"": "https://media.zid.store/2e960427-9ad4-49c9-b85e-847f5cf7af6c/f810143d-457d-4b42-88f5-f5c259a2d10b-200x.png",
  "rawat": "https://media.zid.store/8518f951-6cf4-412c-8e2a-39f0f6bb6515/988a8efe-3643-4760-a43e-2741d67b0a28-200x.png",
  "KHOBRAA ALMOJTAMA": "https://media.zid.store/8a5f4b81-ebc0-44bd-9005-126976b57582/8be45245-0e6e-4ea5-96c2-4f58f844cf60-200x.png",
  "ناتشورال تاتش": "/logos/natural-touch.png",
  "Jawan": "https://cdn.salla.sa/prQbX/RwjbCA3bojdAGfDYGhnrpx470pi5ZErY3v1pOlTn.jpg",
  "مس ديزاين | Miss Designs": "https://media.zid.store/1cc0795b-d617-4e97-9a76-574a2a0246d0/e643e12c-f034-4c10-aaac-e02ace451a03-200x.jpg",
  "Ghalior paris - غاليور باريس": "https://cdn.salla.sa/AzEKGA/MxwEia9PCbIZIiAqYHFDaPCoDJPi5xTcQJI4uGvz.png",
  "متجر كاف": "https://cdn.files.salla.network/theme/263279303/c97a6a82-0fe2-4744-adbb-70ac4e86ac1c.webp",
  "Diva202511": "https://cdn.salla.sa/PdrAEK/hI9UPrP9Yxf7vffawFyLaAMb6knMuRTUSOrsGSLz.jpg",
  "كهرمان": "https://cdn.salla.sa/nWmmm/Dt8hWcCEgS4DiC3iMyUYCthlgnwNzrFbUKoMWS3g.png",
};

// Fallback avatar palette for merchants without a logo.
const TESTIMONIAL_AV_COLORS = [
  "linear-gradient(135deg,#7c3aed,#6d28d9)",
  "linear-gradient(135deg,#9333ea,#7e22ce)",
  "linear-gradient(135deg,#8b5cf6,#6366f1)",
  "linear-gradient(135deg,#8b5cf6,#9333ea)",
  "linear-gradient(135deg,#6366f1,#4f46e5)",
];

type Bi<T> = { ar: T; en: T };

// The X (formerly Twitter) wordmark logo. lucide dropped its Twitter glyph, so
// we inline the official "X" so the story card reads unmistakably as an X thread.
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// One post in Ziadah's problem→solution story, styled as a tweet inside an X
// thread: avatar with the connecting reply-line, name + verified badge + handle,
// the body, then the reply / repost / like / views engagement row. The numbers
// are illustrative — this is a framed narrative, not a scrape of a live post.
function ThreadTweet({
  name,
  handle,
  step,
  isLast = false,
  stats,
  children,
}: {
  name: string;
  handle: string;
  step: string;
  isLast?: boolean;
  stats?: { replies: string; reposts: string; likes: string; views: string };
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <img src={ENGINE_ICON} alt="" aria-hidden="true" className="w-10 h-10 rounded-full object-cover" />
        {!isLast && <div className="w-0.5 flex-1 bg-white/15 mt-1" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-4"}`}>
        <div className="flex items-center gap-1.5 text-sm flex-wrap">
          <span className="font-bold text-white">{name}</span>
          <BadgeCheck className="w-[18px] h-[18px] text-violet-400 shrink-0" aria-hidden="true" />
          <span className="text-zinc-500 num-ltr">{handle}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-500 num-ltr">{step}</span>
        </div>
        <div className="mt-1.5 text-[15px] leading-relaxed text-zinc-100">{children}</div>
        {stats && (
          <div className="mt-3 flex items-center justify-between max-w-[340px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5 text-xs">
              <MessageCircle className="w-[18px] h-[18px]" aria-hidden="true" />
              <span className="num-ltr">{stats.replies}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs">
              <Repeat2 className="w-[18px] h-[18px]" aria-hidden="true" />
              <span className="num-ltr">{stats.reposts}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs">
              <Heart className="w-[18px] h-[18px]" aria-hidden="true" />
              <span className="num-ltr">{stats.likes}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs">
              <BarChart3 className="w-[18px] h-[18px]" aria-hidden="true" />
              <span className="num-ltr">{stats.views}</span>
            </span>
          </div>
        )}
      </div>
    </div>
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
      {/* soft violet glow behind the widget */}
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

// ── Personalization demo: AI reads customer + store data → dynamic offers ──
type DemoProduct = { emoji: string; name: string; price: number; selected?: boolean };
type DemoTier = { qty: string; sub: string; price: number; was?: number; best?: boolean };
type DemoScenario = {
  customer: { name: string; avatar: string; signals: string[] };
  offer: "addons" | "bundle" | "buymore";
  icon: typeof Gift;
  title: string;
  products?: DemoProduct[];
  tiers?: DemoTier[];
  bundleTotal?: number;
};

function DemoFlowSection({ isAr }: { isAr: boolean }) {
  const money = (n: number) => (isAr ? `${n} ر.س` : `SAR ${n}`);

  const scenarios: DemoScenario[] = [
    {
      customer: {
        name: isAr ? "نورة" : "Noura",
        avatar: "/avatar-female.webp",
        signals: isAr
          ? ["اشترت عطراً مؤخراً", "تتصفّح منتجات التجميل", "السلة بها كريم مرطب"]
          : ["Bought perfume recently", "Browsing beauty", "Cart has a moisturizer"],
      },
      offer: "addons",
      icon: Gift,
      title: isAr ? "إضافات تكمل مكياجها" : "Add-ons that complete her look",
      products: [
        { emoji: "💄", name: isAr ? "باليت مكياج" : "Makeup Palette", price: 289, selected: true },
        { emoji: "🖌️", name: isAr ? "فرش مكياج" : "Makeup Brushes", price: 129, selected: true },
        { emoji: "🪞", name: isAr ? "مرآة LED" : "LED Mirror", price: 89 },
        { emoji: "🧴", name: isAr ? "مزيل مكياج" : "Makeup Remover", price: 59 },
      ],
    },
    {
      customer: {
        name: isAr ? "ناصر" : "Nasser",
        avatar: "/avatar-male.webp",
        signals: isAr
          ? ["يتصفّح المستلزمات الرياضية", "السلة بها مشروب بروتين", "اشترى حذاء قبل شهر"]
          : ["Browsing athletic gear", "Cart has a protein drink", "Bought sneakers last month"],
      },
      offer: "bundle",
      icon: Combine,
      title: isAr ? "اشترِ الطقم الرياضي كاملاً" : "Buy the full sports kit",
      products: [
        { emoji: "👟", name: isAr ? "حذاء Ultra Pro" : "Ultra Pro Sneakers", price: 349 },
        { emoji: "🎧", name: isAr ? "سماعات JBL" : "JBL Earbuds", price: 219 },
        { emoji: "🥤", name: isAr ? "بروتين Whey" : "Whey Protein", price: 149 },
        { emoji: "🧦", name: isAr ? "جوارب رياضية" : "Sports Socks", price: 39 },
      ],
      bundleTotal: 756,
    },
    {
      customer: {
        name: isAr ? "لمى" : "Lama",
        avatar: "/avatar-female.webp",
        signals: isAr
          ? ["تهتم بالعناية بالبشرة", "اشترت غسولاً مؤخراً", "تبحث عن سيروم"]
          : ["Into skincare", "Bought a cleanser recently", "Searching for a serum"],
      },
      offer: "buymore",
      icon: Tag,
      title: isAr ? "اشترِ أكثر ووفّر أكثر" : "Buy more, save more",
      tiers: [
        { qty: isAr ? "اشترِ 1" : "Buy 1", sub: isAr ? "بدون خصم" : "No discount", price: 99 },
        { qty: isAr ? "اشترِ 2" : "Buy 2", sub: isAr ? "خصم 15%" : "15% off", price: 168, was: 198 },
        { qty: isAr ? "اشترِ 3" : "Buy 3", sub: isAr ? "خصم 25%" : "25% off", price: 223, was: 297 },
        { qty: isAr ? "اشترِ 4" : "Buy 4", sub: isAr ? "خصم 35% + شحن مجاني" : "35% off + free shipping", price: 257, was: 396, best: true },
      ],
    },
  ];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % 3), 4400);
    return () => clearInterval(id);
  }, []);

  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1400);
    return () => clearInterval(id);
  }, []);

  const sc = scenarios[idx];
  const steps = isAr
    ? ["يقرأ البيانات", "يحلّل", "يجهّز العرض", "يعرض المنتجات"]
    : ["Reading data", "Analyzing", "Preparing", "Presenting"];
  // Ties the connector-line glow and input-card highlight to the same 4-step
  // cycle as the engine badge text, so the flow visibly "moves" from
  // read → analyze → prepare → present in sync with what the badge says.
  const leftActive = step === 0;
  const rightActive = step === 1;
  const prepareActive = step === 2;
  const outputActive = step === 3;

  const storeRows = [
    { icon: LayoutGrid, label: isAr ? "الكتالوج" : "Catalog", value: "240" },
    { icon: Package, label: isAr ? "الطلبات" : "Orders", value: isAr ? "١٫٨ ألف" : "1.8k" },
    { icon: Combine, label: isAr ? "اقترانات" : "Pairings", value: "320" },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto lg:me-0 lg:ms-auto">
      <div className="rounded-3xl border border-violet-100 bg-white p-4 sm:p-5 shadow-[0_24px_60px_-24px_rgba(124, 58, 237,0.35)] ring-1 ring-violet-500/5">
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-700">
            <Sparkles className="w-3.5 h-3.5" />
            {isAr ? "محرّك زيادة" : "Ziadah Engine"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
            </span>
            {isAr ? "تحليل مباشر" : "Live"}
          </span>
        </div>

        {/* INPUTS — customer data (dynamic) + store data */}
        <div className="relative mt-4 grid grid-cols-2 gap-2.5 items-stretch">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={sc.customer.name}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: leftActive ? 1.02 : 1,
                borderColor: leftActive ? "rgba(167,139,250,0.6)" : "rgba(244,244,245,1)",
                boxShadow: leftActive ? "0 0 0 3px rgba(167,139,250,0.18)" : "0 0 0 0px rgba(167,139,250,0)",
              }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.3, ease: "easeInOut" }, default: { duration: 0.3, ease: "easeInOut" } }}
              className="rounded-2xl border bg-zinc-50/70 p-2.5"
            >
              <div className="flex items-center gap-2">
                <img src={sc.customer.avatar} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
                <div className="min-w-0 text-start">
                  <div className="text-[12px] font-bold text-zinc-900 leading-tight truncate">{sc.customer.name}</div>
                  <div className="text-[9.5px] text-zinc-500 leading-tight">{isAr ? "بيانات العميل" : "Customer data"}</div>
                </div>
              </div>
              <ul className="mt-2 space-y-1">
                {sc.customer.signals.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[10.5px] text-zinc-600">
                    <span className="h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={{
              scale: rightActive ? 1.02 : 1,
              borderColor: rightActive ? "rgba(167,139,250,0.6)" : "rgba(244,244,245,1)",
              boxShadow: rightActive ? "0 0 0 3px rgba(167,139,250,0.18)" : "0 0 0 0px rgba(167,139,250,0)",
            }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border bg-zinc-50/70 p-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Store className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 text-start">
                <div className="text-[12px] font-bold text-zinc-900 leading-tight truncate">{isAr ? "متجرك" : "Your store"}</div>
                <div className="text-[9.5px] text-zinc-500 leading-tight">{isAr ? "بيانات المتجر" : "Store data"}</div>
              </div>
            </div>
            <ul className="mt-2 space-y-1">
              {storeRows.map((r, i) => (
                <li key={i} className="flex items-center justify-between gap-1 text-[10.5px] text-zinc-600">
                  <span className="flex items-center gap-1.5 truncate">
                    <r.icon className="h-3 w-3 text-zinc-400 shrink-0" />
                    {r.label}
                  </span>
                  <span className="font-bold text-zinc-800 num-ltr shrink-0">{r.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* connector lines — animated dashes travel from each input card
              down into the engine badge, brightening on the active side so
              the flow visibly tracks which input the "AI" is reading */}
          <svg
            className="absolute -bottom-6 left-0 w-full h-8 pointer-events-none overflow-visible"
            viewBox="0 0 300 32"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M 75 0 C 75 16, 150 16, 150 32" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
            <path d="M 225 0 C 225 16, 150 16, 150 32" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
            <motion.path
              d="M 75 0 C 75 16, 150 16, 150 32"
              fill="none"
              strokeLinecap="round"
              strokeWidth={2.5}
              strokeDasharray="6 14"
              stroke={leftActive ? "#7c3aed" : "#c4b5fd"}
              animate={{ pathOffset: [0, 1], opacity: leftActive ? 1 : 0.55 }}
              transition={{ pathOffset: { duration: 1, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
            />
            <motion.path
              d="M 225 0 C 225 16, 150 16, 150 32"
              fill="none"
              strokeLinecap="round"
              strokeWidth={2.5}
              strokeDasharray="6 14"
              stroke={rightActive ? "#7c3aed" : "#c4b5fd"}
              animate={{ pathOffset: [0, 1], opacity: rightActive ? 1 : 0.55 }}
              transition={{ pathOffset: { duration: 1, repeat: Infinity, ease: "linear", delay: 0.3 }, opacity: { duration: 0.3 } }}
            />
          </svg>
        </div>

        {/* AI ENGINE — all 4 steps shown together as a numbered progress
            stepper; the active step glows/scales up while completed steps
            fill in solid, so the whole pipeline is visible at once instead
            of swapping one line of text. */}
        <div className="relative mt-6 mb-3">
          <div className="absolute top-3 start-[12.5%] end-[12.5%] h-0.5 bg-zinc-100" aria-hidden="true">
            <motion.div
              className="h-0.5 bg-gradient-to-r from-violet-500 to-violet-400"
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="relative flex items-stretch justify-between">
            {steps.map((label, i) => {
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-violet-400"
                        animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden="true"
                      />
                    )}
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#7c3aed" : isDone ? "#ede9fe" : "#f4f4f5",
                        color: isActive ? "#ffffff" : isDone ? "#7c3aed" : "#a1a1aa",
                        scale: isActive ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.25 }}
                      className="relative flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold num-ltr"
                    >
                      {isDone ? <Check className="h-3 w-3" /> : i + 1}
                    </motion.div>
                  </div>
                  <span
                    className={`text-center text-[9px] font-semibold leading-tight transition-colors ${
                      isActive ? "text-violet-600" : isDone ? "text-violet-400" : "text-zinc-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <ArrowDownFlow active={prepareActive || outputActive} />
        </div>

        {/* OUTPUT — dynamic offer (add-ons / bundle / buy-more) */}
        <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${idx}-${sc.offer}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: outputActive ? 1.015 : 1,
            boxShadow: outputActive ? "0 12px 28px -12px rgba(124,58,237,0.35)" : "0 0px 0px 0px rgba(124,58,237,0)",
          }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.3, ease: "easeInOut" }, default: { duration: 0.3, ease: "easeInOut" } }}
          className="rounded-2xl border border-violet-100 bg-violet-50/40 p-2.5"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-violet-700">
              <sc.icon className="h-3.5 w-3.5" />
              {sc.title}
            </span>
            <span className="shrink-0 rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-bold text-violet-700">
              {sc.offer === "addons"
                ? isAr ? "إضافات" : "Add-ons"
                : sc.offer === "bundle"
                  ? isAr ? "اشترِ معاً" : "Bundle"
                  : isAr ? "كمية" : "Tiered"}
            </span>
          </div>

          {/* ADD-ONS — pick & add */}
          {sc.offer === "addons" && (
            <>
              <div className="space-y-1.5">
                {sc.products!.map((p, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 rounded-xl border p-2 ${p.selected ? "border-violet-300 bg-white ring-1 ring-violet-200" : "border-violet-100 bg-white"}`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-base" aria-hidden="true">{p.emoji}</span>
                    <div className="min-w-0 flex-1 text-start">
                      <div className="text-[11.5px] font-bold text-zinc-900 leading-tight">{p.name}</div>
                      <div className="text-[11px] font-extrabold text-violet-600 num-ltr">{money(p.price)}</div>
                    </div>
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${p.selected ? "border-violet-500 bg-violet-500 text-white" : "border-zinc-300 bg-white"}`}>
                      {p.selected && <Check className="h-3 w-3" />}
                    </span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-violet-600 py-2 text-[12px] font-extrabold text-white transition-colors hover:bg-violet-500">
                <ShoppingCart className="h-3.5 w-3.5" />
                {isAr ? "أضف الإضافات المختارة للسلة" : "Add selected to cart"}
              </button>
            </>
          )}

          {/* BUNDLE — add them all */}
          {sc.offer === "bundle" && (
            <>
              <div className="space-y-1.5">
                {sc.products!.map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-xl border border-violet-100 bg-white p-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-base" aria-hidden="true">{p.emoji}</span>
                    <div className="min-w-0 flex-1 text-start text-[11.5px] font-bold text-zinc-900">{p.name}</div>
                    <span className="shrink-0 text-[11px] font-extrabold text-violet-600 num-ltr">{money(p.price)}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-violet-600 py-2 text-[12px] font-extrabold text-white transition-colors hover:bg-violet-500">
                <ShoppingCart className="h-3.5 w-3.5" />
                {isAr ? "أضف الكل للسلة —" : "Add all to cart —"} <span className="num-ltr">{money(sc.bundleTotal!)}</span>
              </button>
            </>
          )}

          {/* BUY MORE, SAVE MORE — tiers */}
          {sc.offer === "buymore" && (
            <>
              <div className="space-y-1.5">
                {sc.tiers!.map((tr, i) => (
                  <div
                    key={i}
                    className={`relative flex items-center gap-2.5 rounded-xl border p-2 ${tr.best ? "border-violet-400 bg-violet-500/[0.07] ring-1 ring-violet-300" : "border-violet-100 bg-white"}`}
                  >
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${tr.best ? "border-violet-500 bg-violet-500" : "border-zinc-300 bg-white"}`}>
                      {tr.best && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <div className="min-w-0 flex-1 text-start">
                      <div className="text-[11.5px] font-bold text-zinc-900 leading-tight">{tr.qty}</div>
                      <div className="text-[10px] text-zinc-500 leading-tight">{tr.sub}</div>
                    </div>
                    <div className="shrink-0 text-end num-ltr leading-tight">
                      {tr.was != null && <div className="text-[9px] text-zinc-400 line-through">{tr.was}</div>}
                      <div className="text-[12px] font-extrabold text-violet-600">{money(tr.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5 rounded-[10px] border border-violet-200 bg-violet-50 py-1.5 text-[10.5px] font-bold text-violet-700">
                <Truck className="h-3.5 w-3.5" />
                {isAr ? "أفضل قيمة — شحن مجاني عند شراء 4" : "Best value — free shipping at 4"}
              </div>
            </>
          )}
        </motion.div>
        </AnimatePresence>

        {/* scenario dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {scenarios.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`scenario ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-violet-500" : "w-1.5 bg-violet-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Vertical connector below the engine badge: a soft gradient line with a
// glowing dot that travels down it on loop, showing data actively flowing
// from the engine into the generated offer. Brightens when `active` (i.e.
// the badge is on its "building the offer" step) to reinforce the sync.
function ArrowDownFlow({ active = false }: { active?: boolean }) {
  return (
    <div className="relative h-6 w-px my-0.5" aria-hidden="true">
      <div
        className="absolute inset-0 w-px mx-auto bg-gradient-to-b from-violet-300 to-violet-200/10 transition-opacity"
        style={{ opacity: active ? 1 : 0.6 }}
      />
      <motion.span
        className="absolute start-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_6px_2px_rgba(139,92,246,0.55)]"
        style={{ backgroundColor: active ? "#7c3aed" : "#a78bfa" }}
        animate={{ top: ["0%", "92%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Snap a raw slider value back onto its discrete step so the displayed/computed
// numbers stay clean (e.g. 1000-unit visitor steps, 0.1% conversion steps).
function snapToStep(v: number, min: number, step: number): number {
  if (step <= 0) return v;
  const snapped = min + Math.round((v - min) / step) * step;
  return Number(snapped.toPrecision(12));
}

interface CalcSliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatDisplay: (n: number) => string;
  formatTick: (n: number) => string;
}

// One labelled slider control inside the dark calculator card: muted uppercase
// label, violet value chip, the shared slider, and min/max tick labels.
function CalcSliderCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatDisplay,
  formatTick,
  dir,
}: CalcSliderConfig & { dir: "rtl" | "ltr" }) {
  const apply = useCallback(
    (raw: number) => onChange(snapToStep(raw, min, step)),
    [onChange, min, step],
  );

  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
        <span className="num-ltr rounded-md bg-violet-500/15 border border-violet-500/30 px-3 py-1 text-sm font-extrabold text-violet-300">
          {formatDisplay(value)}
        </span>
      </div>
      <Slider
        dir={dir}
        min={min}
        max={max}
        step={step}
        value={[value]}
        aria-label={label}
        onValueChange={(v) => apply(v[0])}
        className="[&>span:first-child]:h-2 [&>span:first-child]:bg-white/20 [&>span:first-child>span]:bg-violet-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-violet-400 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-[0_0_0_4px_rgba(139, 92, 246,0.25)]"
      />
      <div className="num-ltr mt-3 flex justify-between text-[11px] text-zinc-500">
        <span>{formatTick(min)}</span>
        <span>{formatTick(max)}</span>
      </div>
    </div>
  );
}

export default function HomeTrackflow() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  // Currency label — matches the hero offer widget (ر.س / SAR). The official
  // SAR glyph (U+20C1) isn't reliably covered by the loaded font, so we use the
  // text abbreviation everywhere for one consistent, always-rendering symbol.
  const riyal = isAr ? "ر.س" : "SAR";
  function t<T>(v: Bi<T>): T {
    return v[lang];
  }
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const { openMeetingBooking } = useMeetingBooking();
  const [visitors, setVisitors] = useState(50000);
  const [convRate, setConvRate] = useState(2.5);
  const [aov, setAov] = useState(250);
  const [activeStep, setActiveStep] = useState(0);
  // Primary CTA is platform-neutral: opening this modal lets the merchant pick
  // Zid or Salla, so Salla merchants are not excluded by Zid-only wording.
  const [platformOpen, setPlatformOpen] = useState(false);

  const logosMarqueeTrackRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosMarqueeTrackRef);

  // Merchant reviews ("آراء التجار") — verified testimonials sourced from the
  // shared translations so we don't duplicate the copy. Each row scrolls as its
  // own marquee (top RTL, bottom LTR); the logo lookup falls back to a colored
  // initial when a merchant has no logo.
  const testimonialsMarquee1Ref = useRef<HTMLDivElement>(null);
  const testimonialsMarquee2Ref = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(testimonialsMarquee1Ref);
  useMarqueeShiftSync(testimonialsMarquee2Ref);
  const buildTestimonials = (
    rows: { text: string; name: string; role: string }[],
  ) =>
    rows.map((r, i) => ({
      ...r,
      logo: testimonialLogos[r.name],
      av: r.name.trim().charAt(0),
      col: TESTIMONIAL_AV_COLORS[i % TESTIMONIAL_AV_COLORS.length],
    }));
  const testimonialsRow1 = buildTestimonials(
    translations[lang].landing.testimonialsRow1 as { text: string; name: string; role: string }[],
  );
  const testimonialsRow2 = buildTestimonials(
    translations[lang].landing.testimonialsRow2 as { text: string; name: string; role: string }[],
  );

  // Aggregate proof numbers across all stores running Ziadah.
  const stats = [
    { value: "+1,500", label: t({ ar: "متجر", en: "Stores" }) },
    { value: "+20M", label: t({ ar: "مبيعات إضافية (ر.س)", en: "in extra sales (SAR)" }) },
    { value: "+200K", label: t({ ar: "منتج تم شراؤه", en: "Products purchased" }) },
    { value: "+40M", label: t({ ar: "ظهور ناجح", en: "Successful impressions" }) },
  ];

  // Recommendation revenue uplift: a share of orders accept the suggestion
  // (acceptRate) and lift their order value by aovUplift, raising the effective
  // AOV and total revenue without extra traffic.
  const aovUplift = 30;
  const acceptRate = 20;
  const fmtN = (n: number, decimals = 0) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  const fmtCur = (n: number) => `${fmtN(Math.round(n))} ${riyal}`;
  const fmtP = (n: number, decimals = 1) => `+${fmtN(n, decimals)}%`;

  const calc = useCallback(() => {
    const orders = visitors * (convRate / 100);
    const baseRevenue = orders * aov;

    const accepting = orders * (acceptRate / 100);
    const notAccepting = orders - accepting;
    const revenueAccepting = accepting * (aov * (1 + aovUplift / 100));
    const revenueNotAccepting = notAccepting * aov;
    const newRevenue = revenueAccepting + revenueNotAccepting;
    const effectiveAov = orders > 0 ? newRevenue / orders : 0;

    const addRevenue = newRevenue - baseRevenue;
    const revGrowth = baseRevenue > 0 ? ((newRevenue - baseRevenue) / baseRevenue) * 100 : 0;
    const aovIncrease = effectiveAov - aov;

    return { orders, baseRevenue, newRevenue, effectiveAov, addRevenue, revGrowth, aovIncrease };
  }, [visitors, convRate, aov]);

  const r = calc();

  const calcSliders: CalcSliderConfig[] = [
    {
      label: t({ ar: "الزوار شهرياً", en: "Monthly visitors" }),
      value: visitors,
      min: 1000,
      max: 500000,
      step: 1000,
      onChange: setVisitors,
      formatDisplay: (n) => fmtN(n),
      formatTick: (n) => fmtN(n),
    },
    {
      label: t({ ar: "معدّل التحويل", en: "Conversion rate" }),
      value: convRate,
      min: 0.5,
      max: 15,
      step: 0.1,
      onChange: setConvRate,
      formatDisplay: (n) => `${fmtN(n, 1)}%`,
      formatTick: (n) => `${fmtN(n, 1)}%`,
    },
    {
      label: t({ ar: "متوسط قيمة الطلب", en: "Average order value" }),
      value: aov,
      min: 50,
      max: 5000,
      step: 10,
      onChange: setAov,
      formatDisplay: (n) => fmtCur(n),
      formatTick: (n) => fmtCur(n),
    },
  ];

  const calcImpactStats = [
    { Icon: Coins, label: t({ ar: "إيراد إضافي", en: "Additional revenue" }), value: `+${fmtCur(r.addRevenue)}`, sub: t({ ar: "شهرياً", en: "per month" }) },
    { Icon: TrendingUp, label: t({ ar: "نمو الإيراد", en: "Revenue growth" }), value: fmtP(r.revGrowth), sub: t({ ar: "نسبة النمو", en: "growth rate" }) },
    { Icon: ArrowUpRight, label: t({ ar: "زيادة متوسط الطلب", en: "AOV increase" }), value: `+${fmtCur(r.aovIncrease)}`, sub: t({ ar: "لكل طلب", en: "per order" }) },
  ];

  const engineLabel = t({ ar: "محرّك زيادة", en: "Ziadah Engine" });

  const placements = [
    { name: { ar: "صفحة المنتج", en: "Product page" }, Icon: Store, color: "#7c3aed" },
    { name: { ar: "السلة", en: "Cart" }, Icon: ShoppingCart, color: "#0ea5e9" },
    { name: { ar: "صفحة الدفع", en: "Checkout" }, Icon: CreditCard, color: "#6366f1" },
    { name: { ar: "الرئيسية", en: "Home page" }, Icon: LayoutGrid, color: "#f59e0b" },
    { name: { ar: "التصنيفات", en: "Category" }, Icon: Tag, color: "#ec4899" },
    { name: { ar: "صفحة الشكر", en: "Thank-you" }, Icon: Gift, color: "#8b5cf6" },
  ];

  const storePlatforms = [
    { name: t({ ar: "زد", en: "Zid" }), brand: "Zid", color: "#7c3aed", soon: false },
    { name: t({ ar: "سلة", en: "Salla" }), brand: "Salla", color: "#0ea5e9", soon: false },
    { name: t({ ar: "ووردبريس", en: "WordPress" }), brand: "WordPress", color: "#6366f1", soon: true },
    { name: t({ ar: "متجر مخصص", en: "Custom store" }), brand: "Custom", color: "#f59e0b", soon: true },
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
            { label: "Zid Store", sub: "saudi.com", brand: "ZID", state: t({ ar: "متصل", en: "connected" }), color: "#7c3aed", soon: false },
            { label: "Salla Store", sub: "uae.com", brand: "SLA", state: t({ ar: "متصل", en: "connected" }), color: "#0ea5e9", soon: false },
            { label: "WooCommerce", sub: "wordpress.org", brand: "WOO", state: t({ ar: "قريباً", en: "soon" }), color: "#6366f1", soon: true },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                s.soon ? "bg-white/[0.02] border-white/8" : "bg-white/[0.05] border-white/10"
              }`}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[9px] font-black tracking-tight ring-1 ring-inset ring-white/10 shrink-0"
                style={{ backgroundColor: `${s.color}22`, color: s.color }}
              >
                {s.brand}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-zinc-100 leading-tight">{s.label}</div>
                <div className="text-[10px] text-zinc-500 truncate">{s.sub}</div>
              </div>
              {s.soon ? (
                <span className="text-[10px] font-bold text-amber-400 shrink-0">{s.state}</span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold text-violet-300 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {s.state}
                </span>
              )}
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
        <div className="space-y-2.5 num-ltr">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-semibold text-zinc-400">{t({ ar: "أماكن العرض", en: "Placements" })}</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-violet-300 num-ltr">
              <BadgeCheck className="w-3.5 h-3.5" />3/4 {t({ ar: "مفعّل", en: "live" })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { name: t({ ar: "صفحة المنتج", en: "Product page" }), Icon: Package, color: "#7c3aed" },
              { name: t({ ar: "السلة", en: "Cart" }), Icon: ShoppingCart, color: "#0ea5e9" },
              { name: t({ ar: "الدفع", en: "Checkout" }), Icon: CreditCard, color: "#6366f1" },
              { name: t({ ar: "التصنيفات", en: "Category" }), Icon: Tag, color: "#ec4899", soon: true },
            ].map((c) => (
              <div
                key={c.name}
                className={`group relative overflow-hidden p-3 rounded-xl border transition-all duration-300 ${
                  c.soon
                    ? "bg-white/[0.02] border-white/8"
                    : "bg-white/[0.05] border-white/10 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.07]"
                }`}
              >
                {!c.soon && (
                  <span
                    className="absolute -right-5 -top-5 w-14 h-14 rounded-full blur-xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                    style={{ backgroundColor: c.color }}
                  />
                )}
                <div className="relative flex items-center justify-between mb-2.5">
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg ring-1 ring-inset ring-white/10"
                    style={{ backgroundColor: `${c.color}26`, color: c.color }}
                  >
                    <c.Icon className="w-3.5 h-3.5" />
                  </span>
                  <span
                    className={`relative inline-flex items-center w-8 h-[18px] rounded-full transition-colors duration-300 ${
                      c.soon ? "bg-white/10" : "bg-violet-500/90 shadow-[0_0_10px_rgba(139,92,246,0.55)]"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        c.soon ? "left-0.5" : "left-4"
                      }`}
                    />
                  </span>
                </div>
                <div className="relative text-xs text-zinc-100 font-semibold leading-tight">{c.name}</div>
                <div
                  className={`relative mt-1 flex items-center gap-1 text-[9px] font-bold ${isAr ? "" : "uppercase tracking-widest"} ${
                    c.soon ? "text-amber-400/90" : "text-violet-300"
                  }`}
                >
                  {!c.soon && <span className="w-1 h-1 rounded-full bg-violet-400" />}
                  {c.soon ? t({ ar: "قريباً", en: "soon" }) : t({ ar: "مفعّل", en: "live" })}
                </div>
              </div>
            ))}
          </div>
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
        <div className="space-y-3 num-ltr">
          <div className="flex items-center gap-1.5">
            <span className="flex-1 text-center px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-[10px] text-zinc-400 font-mono">{t({ ar: "سلوك", en: "behavior" })}</span>
            <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-violet-500/15 border border-violet-400/30 text-[10px] text-violet-300 font-mono">
              <Wand2 className="w-3 h-3" />
              {t({ ar: "تحليل", en: "analyze" })}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-violet-500/15 border border-violet-400/30 text-[10px] text-violet-300 font-mono">
              <Sparkles className="w-3 h-3" />
              {t({ ar: "اقتراح", en: "suggest" })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t({ ar: "تصفّح", en: "browsing" }), Icon: Activity },
              { label: t({ ar: "طلبات سابقة", en: "past orders" }), Icon: Repeat2 },
              { label: t({ ar: "يُشترى معاً", en: "bought together" }), Icon: Combine },
              { label: t({ ar: "المخزون", en: "inventory" }), Icon: Package },
            ].map((it) => (
              <div key={it.label} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/8">
                <it.Icon className="w-3.5 h-3.5 text-violet-300/80 shrink-0" />
                <span className="flex-1 text-[10px] text-zinc-400 truncate">{it.label}</span>
                <Check className="w-3 h-3 text-violet-400 shrink-0" />
              </div>
            ))}
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
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-zinc-500">{t({ ar: "متوسط قيمة الطلب", en: "Avg. order value" })}</div>
              <div className="text-xl font-bold text-white tabular-nums leading-tight">+35%</div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-violet-300 bg-violet-500/10 border border-violet-400/20 rounded-full px-2.5 py-1">
              <ArrowUpRight className="w-3 h-3" />
              {t({ ar: "نمو مستمر", en: "trending up" })}
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-16 rounded-lg bg-white/[0.02] border border-white/8 p-2">
            {[35, 52, 41, 68, 58, 80, 92].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all ${
                  i >= 4 ? "bg-gradient-to-t from-violet-600 to-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.4)]" : "bg-gradient-to-t from-white/10 to-white/20"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">{t({ ar: "قبل زيادة", en: "before Ziadah" })}</span>
            <span className="text-violet-300 font-bold">{t({ ar: "بعد زيادة", en: "after Ziadah" })}</span>
          </div>
        </div>
      ),
    },
  ];

  const pricingPlans = [
    { name: t({ ar: "الانطلاقة", en: "Starter" }), price: 29, orders: t({ ar: "5 نقاط ذكاء/شهر", en: "5 AI points/mo" }), popular: false },
    { name: t({ ar: "النمو", en: "Growth" }), price: 290, orders: t({ ar: "50 نقطة ذكاء/شهر", en: "50 AI points/mo" }), popular: false },
    { name: t({ ar: "الاحترافية", en: "Professional" }), price: 790, orders: t({ ar: "500 نقطة ذكاء/شهر", en: "500 AI points/mo" }), popular: true },
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
        ar: "الانطلاقة 29 ر.س/شهرياً للمتاجر الصغيرة · النمو 290 ر.س/شهرياً · الاحترافية 790 ر.س/شهرياً · الأعمال 1,990 ر.س/شهرياً. كل الباقات فيها تجربة مجانية 7 أيام وشاملة ضريبة القيمة المضافة.",
        en: "Starter SAR 29/mo for small stores · Growth SAR 290/mo · Professional SAR 790/mo · Business SAR 1,990/mo. All plans include a 7-day free trial and are VAT-inclusive.",
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

            <div className="container mx-auto relative max-w-7xl mt-[120px] mb-[1px]">
              <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
                {/* LEFT — copy */}
                <div className="text-center lg:text-start">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-7"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    <span className="text-xs font-semibold text-violet-700">
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
                      <>
                        زيادة متوسط قيمة طلباتك
                        <br />
                        باقتراح منتجات بالذكاء الاصطناعي
                        <br />
                        مخصصة لكل عميل في متجرك
                      </>
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
                        <CheckCircle2 className="w-4 h-4 text-violet-600" />
                        {item.label}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* RIGHT — AI engine analyzes shoppers → personalized recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="relative w-full mt-6 lg:mt-0"
                >
                  <div className="absolute inset-x-0 -top-10 bottom-0 -z-10 bg-gradient-to-tr from-violet-500/25 via-violet-500/15 to-violet-500/15 blur-[90px] rounded-[45%] pointer-events-none" />

                  <DemoFlowSection isAr={isAr} />
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
          <section className="py-24 px-4 bg-black">
            <div className="container mx-auto max-w-xl">
              <div className="text-center mb-9">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">
                  {t({ ar: "القصة باختصار", en: "The story, briefly" })}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
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
                <div className="flex items-center justify-between px-5 py-3 md:px-7 border-b border-white/10">
                  <span className="text-sm font-bold text-zinc-400">{t({ ar: "سلسلة تغريدات", en: "Thread" })}</span>
                  <XLogo className="w-5 h-5 text-white" />
                </div>
                <div className="px-5 py-5 md:px-7 md:py-7">
                  {(() => {
                    const name = t({ ar: "زيادة", en: "Ziadah" });
                    const handle = "@ziadah";
                    return (
                      <>
                        <ThreadTweet
                          name={name}
                          handle={handle}
                          step="1 / 4"
                          stats={{ replies: "48", reposts: "96", likes: "412", views: "18K" }}
                        >
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

                        <ThreadTweet
                          name={name}
                          handle={handle}
                          step="2 / 4"
                          stats={{ replies: "22", reposts: "54", likes: "287", views: "12K" }}
                        >
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

                        <ThreadTweet
                          name={name}
                          handle={handle}
                          step="3 / 4"
                          stats={{ replies: "31", reposts: "73", likes: "340", views: "14K" }}
                        >
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

                        <ThreadTweet
                          name={name}
                          handle={handle}
                          step="4 / 4"
                          isLast
                          stats={{ replies: "64", reposts: "210", likes: "980", views: "26K" }}
                        >
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/15 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative p-7 md:p-10 lg:p-12">
                  <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-4">
                    {t({ ar: "حاسبة", en: "Calculator" })}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                    {t({ ar: "احسب إيرادك الإضافي مع زيادة", en: "Calculate your extra revenue with Ziadah" })}
                  </h2>
                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-3 max-w-2xl">
                    {t({
                      ar: "حرّك زوارك ومعدّل التحويل ومتوسط قيمة الطلب، وشوف كم يضيف لك رفع متوسط الطلب — كل شهر.",
                      en: "Adjust your visitors, conversion rate, and average order value to see how much a higher AOV adds — every month.",
                    })}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                    {t({
                      ar: "بناءً على متاجر تستخدم زيادة، نفترض أن ~20٪ من الطلبات تقبل الاقتراح فترتفع قيمتها ~30٪.",
                      en: "Based on stores using Ziadah, we assume ~20% of orders accept the suggestion, lifting their value ~30%.",
                    })}
                  </p>

                  <div className="h-px bg-white/10 my-8 lg:my-10" />

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* left: controls */}
                    <div className="flex flex-col gap-4" style={{ unicodeBidi: "isolate" }}>
                      {calcSliders.map((s) => (
                        <CalcSliderCard key={s.label} {...s} dir={isAr ? "rtl" : "ltr"} />
                      ))}
                    </div>

                    {/* right: results */}
                    <div className="flex flex-col gap-5" style={{ unicodeBidi: "isolate" }}>
                      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* without recommendations */}
                        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 transition-colors">
                          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">
                            {t({ ar: "بدون اقتراحات", en: "Without recommendations" })}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "الطلبات شهرياً", en: "Monthly orders" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={Math.round(r.orders)}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl font-extrabold text-white num-ltr"
                                >
                                  {fmtN(Math.round(r.orders))}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                            <div>
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "متوسط الطلب", en: "Avg. order" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={aov}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl font-extrabold text-white num-ltr"
                                >
                                  {fmtCur(aov)}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                            <div className="pt-3 border-t border-white/10">
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "الإيراد شهرياً", en: "Monthly revenue" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={Math.round(r.baseRevenue)}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl font-extrabold text-white num-ltr"
                                >
                                  {fmtCur(r.baseRevenue)}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* connector: flows from "without" into the elevated "with Ziadah" card */}
                        <div
                          className="hidden sm:flex absolute top-1/2 start-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_0_0_5px_rgba(9,9,11,1),0_0_20px_rgba(139,92,246,0.6)]"
                          style={{ insetInlineStart: "50%" }}
                          aria-hidden="true"
                        >
                          <ArrowCTA className="w-4 h-4" />
                        </div>

                        {/* with Ziadah */}
                        <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/[0.14] to-transparent border border-violet-500/40 p-6 shadow-[0_0_40px_-10px_rgba(139,92,246,0.35)] sm:scale-[1.02]">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-5">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                            </span>
                            {t({ ar: "مع زيادة", en: "With Ziadah" })}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "الطلبات شهرياً", en: "Monthly orders" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={Math.round(r.orders)}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl font-extrabold text-violet-300 num-ltr"
                                >
                                  {fmtN(Math.round(r.orders))}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                            <div>
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "متوسط الطلب الفعلي", en: "Effective avg. order" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={Math.round(r.effectiveAov)}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="num-ltr flex items-center gap-2 flex-wrap"
                                >
                                  <span className="text-xl font-extrabold text-violet-300">
                                    {fmtCur(r.effectiveAov)}
                                  </span>
                                  <span className="rounded-md bg-violet-500/18 border border-violet-500/35 px-1.5 py-0.5 text-[11px] font-extrabold text-violet-300">
                                    +{fmtCur(r.aovIncrease)}
                                  </span>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                            <div className="pt-3 border-t border-violet-500/20">
                              <div className="text-[11px] text-zinc-500 mb-1">{t({ ar: "الإيراد شهرياً", en: "Monthly revenue" })}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={Math.round(r.newRevenue)}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl font-extrabold text-violet-300 num-ltr"
                                >
                                  {fmtCur(r.newRevenue)}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* impact summary */}
                      <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/[0.08] to-transparent border border-violet-500/20 p-6 md:p-7">
                        <div
                          className="hidden sm:block absolute -top-3 start-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/50 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-6">
                          <BarChart3 className="w-4 h-4" />
                          {t({ ar: "ملخّص الأثر", en: "Impact summary" })}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {calcImpactStats.map((s, i) => (
                            <motion.div
                              key={s.label}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.3 }}
                              className="rounded-xl bg-white/[0.05] border border-white/10 p-4 text-center transition-colors hover:bg-white/[0.07] hover:border-violet-500/30"
                            >
                              <s.Icon className="w-4 h-4 text-violet-400 mx-auto mb-2" />
                              <div className="text-[11px] font-semibold text-zinc-500 mb-1.5">{s.label}</div>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={s.value}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xl md:text-2xl font-extrabold text-violet-300 num-ltr leading-tight"
                                >
                                  {s.value}
                                </motion.div>
                              </AnimatePresence>
                              <div className="text-[11px] text-zinc-500 mt-1">{s.sub}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* disclaimer */}
                      <div className="rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 text-xs text-zinc-400 leading-relaxed">
                        {t({
                          ar: "تقدير متحفّظ؛ النتائج الفعلية تختلف حسب القطاع وحجم الكتالوج وسلوك العملاء.",
                          en: "Conservative estimate; actual results vary by sector, catalog size, and shopper behavior.",
                        })}
                      </div>

                      {/* CTA */}
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
          </section>

          {/* ANALOGY — static shelf vs. smart salesperson */}
          <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
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
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-500/15 blur-[100px] rounded-full pointer-events-none" />
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
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
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
                      ar: "مثال: عند الدفع، «ضيف ضمان سنتين بـ 19 ر.س» أو «أكمل لـ 200 ر.س وخذ شحن مجاني» — يرفع قيمة الطلب فوراً.",
                      en: "Example: at checkout, \"Add a 2-year warranty for SAR 19\" or \"Reach SAR 200 for free shipping\" — instantly raising order value.",
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
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
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
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-500/15 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500" />
                    <div className="relative p-6 md:p-7">
                      {/* app top-bar */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                          <span className="ms-2 text-[10px] font-bold tracking-wide text-zinc-500">{t({ ar: "زيادة · معاينة", en: "Ziadah · Preview" })}</span>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 px-2 py-1">
                          <span className="relative flex w-1.5 h-1.5">
                            <span className="absolute inline-flex w-full h-full rounded-full bg-violet-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-violet-400" />
                          </span>
                          <span className="text-[9px] font-bold tracking-widest text-violet-300 uppercase">{t({ ar: "مباشر", en: "live" })}</span>
                        </span>
                      </div>

                      {/* all-steps stepper */}
                      <div className="flex items-center mb-5">
                        {steps.map((s, i) => {
                          const done = i < activeStep;
                          const active = i === activeStep;
                          const StepIcon = s.Icon;
                          return (
                            <div key={i} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
                              <button
                                type="button"
                                onClick={() => setActiveStep(i)}
                                aria-label={`${t({ ar: "الخطوة", en: "Step" })} ${i + 1}`}
                                className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 ${
                                  active
                                    ? "w-10 h-10 bg-violet-600 shadow-[0_0_18px_rgba(124,58,237,0.55)]"
                                    : done
                                    ? "w-9 h-9 bg-violet-500/20 ring-1 ring-inset ring-violet-400/30"
                                    : "w-9 h-9 bg-white/[0.06] ring-1 ring-inset ring-white/10 hover:bg-white/[0.1]"
                                }`}
                              >
                                {done ? (
                                  <Check className="w-3.5 h-3.5 text-violet-300" />
                                ) : (
                                  <StepIcon className={active ? "w-4 h-4 text-white" : "w-3.5 h-3.5 text-zinc-400"} />
                                )}
                                {active && (
                                  <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-white text-violet-700 text-[9px] font-bold flex items-center justify-center num-ltr ring-2 ring-zinc-950">
                                    {i + 1}
                                  </span>
                                )}
                              </button>
                              {i < steps.length - 1 && (
                                <span className={`mx-1.5 h-px flex-1 rounded-full transition-colors duration-300 ${done ? "bg-violet-400/50" : "bg-white/10"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* active step title */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white leading-tight truncate">{steps[activeStep].title}</div>
                          <div className="text-[10px] text-zinc-500 num-ltr mt-0.5">
                            {t({ ar: "الخطوة", en: "Step" })} {activeStep + 1}/{steps.length}
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-bold text-violet-300 num-ltr bg-violet-500/10 border border-violet-400/20 rounded-full px-2.5 py-1">
                          {steps[activeStep].stat}
                        </span>
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

                      <div className="mt-5 grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl bg-white/[0.03] border border-white/8 px-3 py-2.5">
                          <div className="text-[9px] text-zinc-500 mb-1">{t({ ar: "اقتراحات / ساعة", en: "Suggestions / hr" })}</div>
                          <div className="flex items-center gap-1.5 num-ltr">
                            <span className="text-sm font-bold text-white tabular-nums">1,284</span>
                            <TrendingUp className="w-3 h-3 text-violet-300" />
                          </div>
                        </div>
                        <div className="rounded-xl bg-gradient-to-br from-violet-500/15 to-violet-500/[0.04] border border-violet-400/20 px-3 py-2.5">
                          <div className="text-[9px] text-zinc-400 mb-1">{t({ ar: "الحالة", en: "Status" })}</div>
                          <div className="flex items-center gap-1.5">
                            <span className="relative flex w-2 h-2">
                              <span className="absolute inline-flex w-full h-full rounded-full bg-violet-400 opacity-75 animate-ping" />
                              <span className="relative inline-flex w-2 h-2 rounded-full bg-violet-400" />
                            </span>
                            <span className="text-[11px] font-bold text-violet-200">{t({ ar: "تعمل الآن", en: "Active now" })}</span>
                          </div>
                        </div>
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
                              isActive ? "border-violet-300 shadow-card-lg ring-1 ring-violet-200" : "border-zinc-100 shadow-card hover:shadow-card-lg hover:border-zinc-200"
                            }`}
                          >
                            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-violet-600" : "bg-zinc-950"}`}>
                              <s.Icon className="w-5 h-5 text-white" />
                              <span className={`absolute -top-1.5 ${isAr ? "-left-1.5" : "-right-1.5"} w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center num-ltr ring-2 ring-white transition-colors ${isActive ? "bg-zinc-950" : "bg-violet-600"}`}>
                                {i + 1}
                              </span>
                            </div>
                            <div className="flex-1 pt-0.5">
                              <div className="flex items-center justify-between gap-3 mb-1">
                                <h3 className="text-base font-bold text-zinc-950">{s.title}</h3>
                                <span className="shrink-0 text-[11px] font-bold text-violet-600 num-ltr bg-violet-50 border border-violet-100 rounded-full px-2 py-0.5">{s.stat}</span>
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
                  <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
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
                  <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
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

          {/* SECTORS — حلول مخصّصة لمجال تجارتك */}
          <SectorsBriefSection />

          {/* TESTIMONIALS — آراء التجار: verified merchant reviews, two marquees */}
          <section
            id="testimonials"
            className="py-24 bg-zinc-50/60 border-y border-zinc-200 scroll-mt-20 overflow-x-clip"
          >
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
                  {translations[lang].landing.testimonialsTag}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4">
                  {translations[lang].landing.testimonialsTitle}
                </h2>
                <p className="text-lg text-zinc-600">
                  {translations[lang].landing.testimonialsSub}
                </p>
              </div>
            </div>

            {[
              { ref: testimonialsMarquee1Ref, data: testimonialsRow1, dir: "marquee-rtl", mb: "mb-5" },
              { ref: testimonialsMarquee2Ref, data: testimonialsRow2, dir: "marquee-ltr", mb: "" },
            ].map((row, ri) => (
              <div key={ri} className={`marquee-row ${row.mb}`}>
                <div
                  ref={row.ref}
                  className={`marquee-track ${row.dir}`}
                  style={{ animationDuration: `${row.data.length * 4}s` }}
                >
                  {[0, 1, 2].map((seg) => (
                    <div key={seg} className="marquee-segment">
                      {row.data.map((t, i) => (
                        <div
                          key={`${seg}-${i}`}
                          dir={isAr ? "rtl" : "ltr"}
                          className="shrink-0 w-[280px] sm:w-[320px] me-4 flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-card text-start"
                        >
                          <div className="flex gap-0.5 mb-3" dir="ltr">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-violet-500 text-violet-500" aria-hidden="true" />
                            ))}
                          </div>
                          <p className="flex-1 text-sm leading-relaxed text-zinc-700 mb-4 line-clamp-5">
                            {t.text}
                          </p>
                          <div className="flex items-center gap-2.5 mt-auto">
                            <div
                              className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center overflow-hidden text-xs font-extrabold text-white"
                              style={{ background: t.logo ? "#fff" : t.col }}
                            >
                              {t.logo ? (
                                <img
                                  src={t.logo}
                                  alt={t.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const img = e.currentTarget;
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.style.background = t.col;
                                      parent.textContent = t.av;
                                    }
                                  }}
                                />
                              ) : (
                                t.av
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-zinc-900 truncate">{t.name}</div>
                              <div className="text-xs text-zinc-500 truncate">{t.role}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* PRICING TEASER */}
          <section id="pricing" className="py-24 px-4 scroll-mt-20">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
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
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t({ ar: "الأكثر اختياراً", en: "Most popular" })}
                      </div>
                    )}
                    <h3 className={`text-lg font-bold mb-3 ${plan.popular ? "text-white" : "text-zinc-950"}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className={`text-4xl font-bold num-ltr ${plan.popular ? "text-white" : "text-zinc-950"}`}>
                        {plan.price.toLocaleString("en-US")}
                        <span className="text-base font-semibold align-middle ms-1 opacity-70">{riyal}</span>
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
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.popular ? "text-violet-400" : "text-violet-600"}`} />
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
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
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
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                      {t({ ar: "تجربة مجانية 7 أيام", en: "7-day free trial" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                      {t({ ar: "تركيب بنقرة وحدة", en: "One-click install" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
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
