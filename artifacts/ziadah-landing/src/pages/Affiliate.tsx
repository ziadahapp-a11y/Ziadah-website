import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Tag,
  Banknote,
  TrendingUp,
  Target,
  UserCog,
  ShoppingCart,
  Zap,
  Repeat2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import PageShell from "../components/PageShell";
import BilingualSEO from "../components/BilingualSEO";
import { FAQSchema, AffiliatePageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Section,
  SectionHeading,
  Card,
  StatCard,
  CtaSection,
} from "@/components/trackflow";
import { Button } from "@/components/ui/button";

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=966510131856&text=%D8%A3%D9%87%D9%84%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A3%D9%86%D8%B6%D9%85%20%D9%84%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D9%83%D8%A9%20%D9%85%D8%B9%20%D8%B2%D9%8A%D8%A7%D8%AF%D8%A9";

const PLANS = [
  { keyAr: "الانطلاقة", keyEn: "Starter", annual: 290 },
  { keyAr: "النمو", keyEn: "Growth", annual: 2990 },
  { keyAr: "الاحترافية", keyEn: "Professional", annual: 7990 },
  { keyAr: "الأعمال", keyEn: "Business", annual: 15990 },
];

function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2C5.6 2 2 5.6 2 10C2 11.4 2.4 12.8 3 14L2 18L6 17C7.2 17.6 8.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM13.5 12.5C13.3 13 12.5 13.5 12 13.5C11.3 13.5 10.8 13.3 8.5 11.5C6.5 9.7 6 8.7 6 8C6 7.5 6.2 7 6.7 6.5C7 6.2 7.3 6 7.7 6C8 6 8.3 6.5 8.7 7.3C9 7.8 9.3 8.5 9.3 8.8C9.3 9 9 9.3 8.8 9.5C8.7 9.7 8.5 9.8 8.7 10.2C9 10.7 9.5 11.3 10 11.8C10.5 12.3 11 12.7 11.5 12.8C11.8 13 12 12.8 12.3 12.5C12.5 12.2 12.8 12 13 12C13.3 12 14 12.8 13.5 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Icons mapped from the original emoji per the design-system guidance.
const HOW_ICONS: LucideIcon[] = [Handshake, Tag, Banknote];
const BENEFIT_ICONS: LucideIcon[] = [TrendingUp, Target, UserCog, ShoppingCart, Zap, Repeat2];

const AR = {
  seoTitle: "برنامج الشراكة والأفيليت | زيادة",
  seoDesc: "اشترك في برنامج أفيليت زيادة — عمولة 10% على كل اشتراك سنوي، وخصم 10% لعملائك.",
  tag: "برنامج الشراكة",
  heroTitle: "اربح مع كل متجر تنمّيه",
  heroDesc:
    "برنامج أفيليت مصمم للوكالات التسويقية والمستشارين الرقميين — شارك كودك مع عملائك، واكسب عمولة ثابتة على كل اشتراك سنوي طوال فترة الاشتراك.",
  ctaMain: "ابدأ الشراكة الآن عبر واتساب",
  ctaSub: "يرد عليك فريقنا خلال دقائق",
  stats: [
    { val: "10%", label: "عمولتك على كل اشتراك*" },
    { val: "10%", label: "خصم لعملائك" },
    { val: "12 شهراً", label: "مدة احتساب العمولة" },
    { val: "فوري", label: "كود إحالة خاص بك" },
  ],
  howTag: "آلية العمل",
  howTitle: "كيف يعمل البرنامج؟",
  howSteps: [
    { num: "01", icon: "🤝", title: "سجّل كشريك", desc: "تواصل معنا عبر واتساب وأخبرنا عن وكالتك. سنرسل لك كود الإحالة الخاص بك فوراً." },
    { num: "02", icon: "🏷️", title: "شارك كودك", desc: "عملاؤك يشتركون في زيادة بإدخال كودك عند الاشتراك ويحصلون تلقائياً على خصم 10%." },
    { num: "03", icon: "💰", title: "اكسب عمولتك", desc: "تحصل على 10% من قيمة كل اشتراك سنوي طوال مدة بقاء العميل." },
  ],
  benefitsTag: "المزايا",
  benefitsTitle: "لماذا تشارك معنا؟",
  benefits: [
    { icon: "📈", title: "عمولة تنمو معك", desc: "لا سقف للعمولة — كلما أحلت أكثر، كسبت أكثر." },
    { icon: "🎯", title: "منتج يبيع نفسه", desc: "نتائج ملموسة لأصحاب المتاجر — المبيعات تتكلم عن نفسها." },
    { icon: "🧑‍💼", title: "دعم مخصص", desc: "مدير حساب خاص يساعدك في الإجابة على أسئلة عملائك." },
    { icon: "🛒", title: "تكامل مع سلة وزد", desc: "المنصتان الأكثر انتشاراً في السوق السعودي." },
    { icon: "⚡", title: "إعداد في دقيقتين", desc: "عميلك يفعّل التطبيق بنفسه بدون تدخل تقني." },
    { icon: "🔄", title: "عمولة متكررة", desc: "تحصل على عمولتك في كل تجديد — ليس فقط أول اشتراك." },
  ],
  calcTag: "الحاسبة",
  calcTitle: "احسب أرباحك",
  calcDesc: "حرّك المقياس وشاهد عمولتك تنمو",
  calcStores: "عدد المتاجر المُحالة",
  calcPlan: "الباقة",
  calcAnnualTotal: "إجمالي الاشتراكات السنوية",
  calcYourComm: "عمولتك السنوية (10%)",
  calcMonthlyComm: "عمولتك الشهرية",
  calcClientSave: "مدخرات عملائك (خصم 10%)",
  faqTag: "الأسئلة الشائعة",
  faqTitle: "أسئلة شائعة",
  faqs: [
    { q: "من يحق له الانضمام للبرنامج؟", a: "البرنامج مفتوح للوكالات التسويقية والمستشارين الرقميين وأي شخص لديه شبكة من أصحاب المتاجر الإلكترونية." },
    { q: "متى أحصل على عمولتي؟", a: "تُحتسب العمولة بعد إتمام الاشتراك وانتهاء فترة الاسترداد (7 أيام)، وتُصرف شهرياً عبر التحويل البنكي." },
    { q: "هل العمولة لمرة واحدة أم متكررة؟", a: "متكررة — تحصل على 10% طوال مدة اشتراك العميل. وإذا جدّد، تحصل على عمولة التجديد أيضاً." },
    { q: "هل الخصم يُطبق على جميع الباقات؟", a: "نعم، خصم 10% يُطبق على جميع الباقات السنوية عند الاشتراك بإدخال كودك." },
    { q: "كيف يستخدم عميلي كودي؟", a: "يُدخل عميلك الكود عند إتمام الاشتراك في زيادة، فيُطبَّق الخصم تلقائياً وتُحتسب العمولة لحسابك." },
  ],
  finalTitle: "مستعد تبدأ؟",
  finalDesc: "تواصل معنا الآن عبر واتساب ونساعدك تنطلق كشريك معتمد في أقل من 24 ساعة.",
};

const EN = {
  seoTitle: "Affiliate & Partner Program | Ziadah",
  seoDesc: "Join Ziadah's affiliate program — earn 10% commission on every annual subscription, and give your clients a 10% discount.",
  tag: "Partner Program",
  heroTitle: "Earn with every store you grow",
  heroDesc:
    "An affiliate program built for marketing agencies and digital consultants — share your code with clients, earn a fixed commission on every annual subscription.",
  ctaMain: "Start Partnering via WhatsApp",
  ctaSub: "Our team replies within minutes",
  stats: [
    { val: "10%", label: "Your commission per subscription*" },
    { val: "10%", label: "Discount for your clients" },
    { val: "12 months", label: "Commission duration" },
    { val: "Instant", label: "Your unique referral code" },
  ],
  howTag: "How it works",
  howTitle: "How it works",
  howSteps: [
    { num: "01", icon: "🤝", title: "Register as a partner", desc: "Reach out via WhatsApp. We'll send you your personal referral code right away." },
    { num: "02", icon: "🏷️", title: "Share your code", desc: "Clients enter your code at checkout and automatically get a 10% discount." },
    { num: "03", icon: "💰", title: "Earn monthly", desc: "You receive 10% of every annual subscription for as long as the client stays." },
  ],
  benefitsTag: "Benefits",
  benefitsTitle: "Why partner with us?",
  benefits: [
    { icon: "📈", title: "Unlimited earnings", desc: "No commission cap — the more you refer, the more you earn." },
    { icon: "🎯", title: "A product that sells itself", desc: "Ziadah delivers measurable results — the numbers speak." },
    { icon: "🧑‍💼", title: "Dedicated support", desc: "A dedicated account manager helps you close deals." },
    { icon: "🛒", title: "Salla & Zid integration", desc: "The two most popular e-commerce platforms in Saudi Arabia." },
    { icon: "⚡", title: "2-minute setup", desc: "Clients activate the app themselves — no technical help needed." },
    { icon: "🔄", title: "Recurring commission", desc: "Earn on every renewal, not just the first subscription." },
  ],
  calcTag: "Calculator",
  calcTitle: "Calculate your earnings",
  calcDesc: "Move the slider and watch your commission grow",
  calcStores: "Referred stores",
  calcPlan: "Plan",
  calcAnnualTotal: "Total annual subscriptions",
  calcYourComm: "Your annual commission (10%)",
  calcMonthlyComm: "Your monthly commission",
  calcClientSave: "Client savings (10% discount)",
  faqTag: "FAQ",
  faqTitle: "Frequently asked questions",
  faqs: [
    { q: "Who can join the program?", a: "Marketing agencies, digital consultants, and anyone with a network of online store owners." },
    { q: "When do I get paid?", a: "After the 7-day refund period ends, commissions are paid monthly via bank transfer." },
    { q: "Is the commission one-time or recurring?", a: "Recurring — you earn 10% for the full duration of the client's subscription and on renewals." },
    { q: "Does the discount apply to all plans?", a: "Yes, the 10% discount applies to all annual plans when clients enter your referral code at checkout." },
    { q: "How does my client use my code?", a: "Your client enters your referral code when subscribing to Ziadah. The discount is applied automatically and the commission is credited to your account." },
  ],
  finalTitle: "Ready to get started?",
  finalDesc: "Reach out via WhatsApp now and we'll help you launch as a certified partner in less than 24 hours.",
};

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export default function Affiliate() {
  const { lang } = useLanguage();
  const c = lang === "ar" ? AR : EN;
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stores, setStores] = useState(5);
  const [planIdx, setPlanIdx] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".aff-root .rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const plan = PLANS[planIdx];
  const priceExVat = Math.round(plan.annual / 1.15); // strip 15% VAT
  const totalAnnual = stores * priceExVat;
  const yourComm = totalAnnual * 0.1;
  const monthly = yourComm / 12;
  const clientSave = totalAnnual * 0.1;

  const riyal = isAr ? "⃁" : "SAR";

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
      <BilingualSEO
        titleAr={AR.seoTitle}
        titleEn={EN.seoTitle}
        descriptionAr={AR.seoDesc}
        descriptionEn={EN.seoDesc}
        canonical="/affiliate"
        keywordsAr="برنامج أفيليت، شراكة زيادة، عمولة، كود إحالة، وكالة تسويق، زد، سلة"
        keywordsEn="Ziadah affiliate, partner program, referral code, commission, marketing agency"
      />
      <AffiliatePageSchema />
      <FAQSchema faqs={c.faqs} />

      <div className="aff-root" dir={dir}>

        {/* ══════════ HERO ══════════ */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-28 px-4">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 mb-7"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-green-700">{c.tag}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-7 leading-[1.05]"
            >
              {c.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-9 leading-relaxed"
            >
              {c.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <Button
                asChild
                size="lg"
                className="text-base h-12 px-7 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
              >
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  <WaIcon size={20} />
                  <span className="ms-2">{c.ctaMain}</span>
                </a>
              </Button>
              <p className="mt-3 text-sm text-zinc-500">{c.ctaSub}</p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-14">
              {c.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                  <StatCard value={s.val} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <Section band="muted">
          <SectionHeading eyebrow={c.howTag} title={c.howTitle} />
          <div className="grid md:grid-cols-3 gap-5">
            {c.howSteps.map((step, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <Card key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase num-ltr">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-950 mb-3 leading-snug">{step.title}</h3>
                  <p className="text-sm md:text-base text-zinc-600 leading-relaxed">{step.desc}</p>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ══════════ BENEFITS ══════════ */}
        <Section band="white">
          <SectionHeading eyebrow={c.benefitsTag} title={c.benefitsTitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <Card key={i}>
                  <div className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2.5 leading-snug">{b.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{b.desc}</p>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ══════════ CALCULATOR ══════════ */}
        <Section band="muted">
          <SectionHeading eyebrow={c.calcTag} title={c.calcTitle} subtitle={c.calcDesc} />

          <div className="rounded-2xl border border-zinc-200 bg-white p-7 md:p-10 shadow-card">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Controls */}
              <div className="flex flex-col gap-7">
                {/* Stores slider */}
                <div>
                  <label className="flex items-center justify-between gap-3 mb-4 text-sm font-bold text-zinc-950">
                    <span>{c.calcStores}</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-200 text-xs font-bold text-green-700 num-ltr">
                      {isAr ? fmt(stores) + " متجر" : stores + " stores"}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={stores}
                    onChange={(e) => setStores(Number(e.target.value))}
                    className="aff-slider w-full accent-green-600"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-zinc-400 num-ltr">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Plan selector */}
                <div>
                  <label className="block mb-4 text-sm font-bold text-zinc-950">{c.calcPlan}</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PLANS.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPlanIdx(i)}
                        className={`flex flex-col items-start gap-1 rounded-xl border p-3.5 text-start transition-all ${
                          planIdx === i
                            ? "border-emerald-500 bg-green-50 ring-1 ring-emerald-500/20"
                            : "border-zinc-200 bg-white hover:border-zinc-300"
                        }`}
                      >
                        <span className="text-sm font-bold text-zinc-950">{isAr ? p.keyAr : p.keyEn}</span>
                        <span className="text-xs text-zinc-500 num-ltr">
                          {fmt(p.annual)} {riyal}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl mockup-card overflow-hidden shadow-card-lg relative p-6 text-center">
                  <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[140px] bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
                  <div className="relative">
                    <div className="text-sm text-zinc-400 mb-1.5">{c.calcYourComm}*</div>
                    <div className="text-4xl md:text-5xl font-extrabold text-white num-ltr">
                      {fmt(yourComm)} <span className="text-base font-semibold text-zinc-400">{riyal}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                    <span className="text-sm text-zinc-600">{c.calcMonthlyComm}</span>
                    <span className="text-base font-bold text-zinc-950 num-ltr">
                      {fmt(Math.round(monthly))} {riyal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                    <span className="text-sm text-zinc-600">{c.calcAnnualTotal}</span>
                    <span className="text-base font-bold text-zinc-950 num-ltr">
                      {fmt(totalAnnual)} {riyal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50/60 p-4">
                    <span className="text-sm text-green-700">{c.calcClientSave}</span>
                    <span className="text-base font-bold text-green-700 num-ltr">
                      {fmt(clientSave)} {riyal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-zinc-400 text-center">
              {isAr
                ? "* العمولة محسوبة على سعر الاشتراك غير شامل ضريبة القيمة المضافة."
                : "* Commission is calculated on the subscription price excluding VAT."}
            </p>
          </div>
        </Section>

        {/* ══════════ FAQ ══════════ */}
        <Section band="white" containerClassName="max-w-3xl">
          <SectionHeading eyebrow={c.faqTag} title={c.faqTitle} />
          <div className="flex flex-col gap-3">
            {c.faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border bg-white transition-colors ${
                    open ? "border-zinc-300 shadow-card" : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-5 text-start"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className="text-base font-bold text-zinc-950">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && <div className="px-5 pb-5 text-sm text-zinc-600 leading-relaxed">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ══════════ FINAL CTA ══════════ */}
        <CtaSection title={c.finalTitle} subtitle={c.finalDesc}>
          <Button
            asChild
            size="lg"
            className="bg-white text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
          >
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <WaIcon size={22} />
              <span className="ms-2">{c.ctaMain}</span>
            </a>
          </Button>
        </CtaSection>

      </div>
    </PageShell>
  );
}
