import { useState, useEffect } from "react";
import PageShell from "../components/PageShell";
import BilingualSEO from "../components/BilingualSEO";
import { FAQSchema, AffiliatePageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const priceExVat = Math.round(plan.annual / 1.15);  // strip 15% VAT
  const totalAnnual = stores * priceExVat;
  const yourComm = totalAnnual * 0.1;
  const monthly = yourComm / 12;
  const clientSave = totalAnnual * 0.1;

  return (
    <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
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
        <section className="aff-hero page-hero-viewport page-hero-viewport--center">
          <div className="aff-hero-glow" aria-hidden />
          <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>

            <div className="stag" style={{ margin: "0 auto 24px" }}>
              <span className="stag-dot" />
              {c.tag}
            </div>

            <h1 className="aff-hero-title">{c.heroTitle}</h1>
            <p className="ssub" style={{ margin: "0 auto 20px", textAlign: "center" }}>{c.heroDesc}</p>

            <a href={WA_LINK} target="_blank" rel="noreferrer" className="aff-wa-btn">
              <WaIcon size={22} />
              {c.ctaMain}
            </a>
            <p className="aff-cta-sub">{c.ctaSub}</p>

            {/* Stats row */}
            <div className="aff-stats">
              {c.stats.map((s, i) => (
                <div key={i} className="gc aff-stat rv" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="aff-stat-val">{s.val}</div>
                  <div className="aff-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <section>
          <div className="wrap">
            <div className="aff-sec-head">
              <div className="stag" style={{ margin: "0 auto 16px" }}>
                <span className="stag-dot" />
                {c.howTag}
              </div>
              <h2 className="st" style={{ textAlign: "center" }}>{c.howTitle}</h2>
            </div>
            <div className="aff-steps">
              {c.howSteps.map((step, i) => (
                <div key={i} className={`gc aff-step rv d${i + 1}`}>
                  <div className="aff-step-num">{step.num}</div>
                  <div className="aff-step-icon">{step.icon}</div>
                  <div className="aff-step-title">{step.title}</div>
                  <div className="aff-step-desc">{step.desc}</div>
                  {i < c.howSteps.length - 1 && (
                    <div className="aff-step-connector" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ BENEFITS ══════════ */}
        <section style={{ background: "rgba(124,58,237,.04)" }}>
          <div className="wrap">
            <div className="aff-sec-head">
              <div className="stag" style={{ margin: "0 auto 16px" }}>
                <span className="stag-dot" />
                {c.benefitsTag}
              </div>
              <h2 className="st" style={{ textAlign: "center" }}>{c.benefitsTitle}</h2>
            </div>
            <div className="aff-benefits">
              {c.benefits.map((b, i) => (
                <div key={i} className={`gc aff-benefit rv d${(i % 3) + 1}`}>
                  <div className="aff-benefit-icon">{b.icon}</div>
                  <div className="aff-benefit-title">{b.title}</div>
                  <div className="aff-benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CALCULATOR ══════════ */}
        <section>
          <div className="wrap">
            <div className="aff-sec-head">
              <div className="stag" style={{ margin: "0 auto 16px" }}>
                <span className="stag-dot" />
                {c.calcTag}
              </div>
              <h2 className="st" style={{ textAlign: "center" }}>{c.calcTitle}</h2>
              <p className="ssub" style={{ textAlign: "center", margin: "0 auto 20px" }}>{c.calcDesc}</p>
            </div>

            <div className="gc aff-calc">
              {/* Controls */}
              <div className="aff-calc-controls">
                {/* Stores slider */}
                <div className="aff-calc-field">
                  <label className="aff-calc-label">
                    {c.calcStores}
                    <span className="aff-calc-badge">
                      {isAr ? fmt(stores) + " متجر" : stores + " stores"}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={stores}
                    onChange={(e) => setStores(Number(e.target.value))}
                    className="aff-slider"
                  />
                  <div className="aff-slider-labels">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Plan selector */}
                <div className="aff-calc-field">
                  <label className="aff-calc-label">{c.calcPlan}</label>
                  <div className="aff-plan-tabs">
                    {PLANS.map((p, i) => (
                      <button
                        key={i}
                        className={`aff-plan-tab${planIdx === i ? " aff-plan-tab--on" : ""}`}
                        onClick={() => setPlanIdx(i)}
                      >
                        {isAr ? p.keyAr : p.keyEn}
                        <span className="aff-plan-tab-price">
                          {fmt(p.annual)} {isAr ? "⃁" : "SAR"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="aff-calc-results">
                <div className="aff-calc-res aff-calc-res--main">
                  <span className="aff-calc-res-label">{c.calcYourComm}*</span>
                  <span className="aff-calc-res-val">
                    {fmt(yourComm)} {isAr ? "⃁" : "SAR"}
                  </span>
                </div>
                <div className="aff-calc-res">
                  <span className="aff-calc-res-label">{c.calcMonthlyComm}</span>
                  <span className="aff-calc-res-val aff-calc-res-val--sm">
                    {fmt(Math.round(monthly))} {isAr ? "⃁" : "SAR"}
                  </span>
                </div>
                <div className="aff-calc-res">
                  <span className="aff-calc-res-label">{c.calcAnnualTotal}</span>
                  <span className="aff-calc-res-val aff-calc-res-val--sm">
                    {fmt(totalAnnual)} {isAr ? "⃁" : "SAR"}
                  </span>
                </div>
                <div className="aff-calc-res aff-calc-res--client">
                  <span className="aff-calc-res-label">{c.calcClientSave}</span>
                  <span className="aff-calc-res-val aff-calc-res-val--sm">
                    {fmt(clientSave)} {isAr ? "⃁" : "SAR"}
                  </span>
                </div>
              </div>

              <p className="aff-calc-footnote">
                {isAr
                  ? "* العمولة محسوبة على سعر الاشتراك غير شامل ضريبة القيمة المضافة."
                  : "* Commission is calculated on the subscription price excluding VAT."}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════ FAQ ══════════ */}
        <section style={{ background: "rgba(124,58,237,.04)" }}>
          <div className="wrap" style={{ maxWidth: 780 }}>
            <div className="aff-sec-head">
              <div className="stag" style={{ margin: "0 auto 16px" }}>
                <span className="stag-dot" />
                {c.faqTag}
              </div>
              <h2 className="st" style={{ textAlign: "center" }}>{c.faqTitle}</h2>
            </div>
            <div className="aff-faqs">
              {c.faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`gc aff-faq${openFaq === i ? " aff-faq--open" : ""}`}
                >
                  <button
                    className="aff-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <svg
                      className="aff-faq-chevron"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 7l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="aff-faq-a">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FINAL CTA ══════════ */}
        <section className="aff-final">
          <div className="aff-final-glow" aria-hidden />
          <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 className="st" style={{ textAlign: "center", marginBottom: 16 }}>{c.finalTitle}</h2>
            <p className="ssub" style={{ textAlign: "center", margin: "0 auto 20px" }}>{c.finalDesc}</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="aff-wa-btn aff-wa-btn--lg">
              <WaIcon size={24} />
              {c.ctaMain}
            </a>
          </div>
        </section>

      </div>
    </PageShell>
  );
}
