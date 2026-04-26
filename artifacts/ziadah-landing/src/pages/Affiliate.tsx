import PageShell from "../components/PageShell";
import SEO from "../components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";

const WA_LINK = "https://api.whatsapp.com/send/?phone=966510131856&text=%D8%A3%D9%87%D9%84%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A3%D9%86%D8%B6%D9%85%20%D9%84%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D9%83%D8%A9%20%D9%85%D8%B9%20%D8%B2%D9%8A%D8%A7%D8%AF%D8%A9";

const AR = {
  seoTitle: "برنامج الشراكة والأفيليت | زيادة",
  seoDesc: "اشترك في برنامج أفيليت زيادة — عمولة 10٪ على كل اشتراك سنوي، وخصم 10٪ لعملائك. مخصص للوكالات التسويقية والمستشارين.",
  tag: "برنامج الشراكة",
  heroTitle: "اربح مع كل متجر تنمّيه",
  heroDesc: "برنامج أفيليت مصمم للوكالات التسويقية والمستشارين الرقميين — شارك زيادة مع عملائك، واكسب عمولة ثابتة على كل اشتراك سنوي طوال فترة الاشتراك.",
  ctaMain: "ابدأ الشراكة الآن عبر واتساب",
  ctaSub: "يرد عليك فريقنا خلال دقائق",
  stats: [
    { val: "10٪", label: "عمولتك على كل اشتراك سنوي" },
    { val: "10٪", label: "خصم لعميلك على الباقة السنوية" },
    { val: "12 شهراً", label: "مدة احتساب العمولة على الاشتراك" },
    { val: "فوري", label: "رابط تتبع خاص بك" },
  ],
  howTitle: "كيف يعمل البرنامج؟",
  howSteps: [
    {
      num: "01",
      title: "سجّل كشريك",
      desc: "تواصل معنا عبر واتساب وأخبرنا عن وكالتك أو نشاطك التسويقي. سنرسل لك رابط الإحالة الخاص بك فوراً.",
    },
    {
      num: "02",
      title: "شارك رابطك مع عملائك",
      desc: "عملاؤك يشتركون في زيادة من خلال رابطك ويحصلون تلقائياً على خصم 10٪ على الباقة السنوية.",
    },
    {
      num: "03",
      title: "اكسب عمولتك شهرياً",
      desc: "تحصل على 10٪ من قيمة الاشتراك السنوي لكل عميل أحلته — طوال مدة اشتراكه.",
    },
  ],
  benefitsTitle: "لماذا تشارك معنا؟",
  benefits: [
    {
      icon: "💰",
      title: "عمولة تنمو معك",
      desc: "كلما زاد عدد العملاء الذين تُحيلهم، زاد دخلك الشهري. لا سقف للعمولة.",
    },
    {
      icon: "🎯",
      title: "منتج يبيع نفسه",
      desc: "زيادة تحقق نتائج ملموسة لمتاجر التجزئة الإلكتروني — نسب التحويل والمبيعات تتكلم عن نفسها.",
    },
    {
      icon: "🤝",
      title: "دعم مخصص للشركاء",
      desc: "مدير حساب خاص يساعدك في الإجابة على أسئلة عملائك وإتمام عمليات البيع.",
    },
    {
      icon: "📊",
      title: "تقارير شفافة",
      desc: "لوحة تحكم لتتبع إحالاتك ومبالغ عمولاتك المتراكمة في الوقت الفعلي.",
    },
    {
      icon: "🔗",
      title: "تكامل سلس",
      desc: "زيادة تتكامل مع سلة وزد — المنصتين الأكثر انتشاراً في السوق السعودي.",
    },
    {
      icon: "⚡",
      title: "إعداد في دقيقتين",
      desc: "عميلك يفعّل التطبيق بنفسه دون الحاجة لتدخل تقني — مما يقلل العبء عنك وعنه.",
    },
  ],
  exampleTitle: "مثال على أرباحك",
  exampleDesc: "لنفترض أنك أحلت 10 متاجر على باقة النمو السنوية:",
  exampleRows: [
    { label: "سعر باقة النمو السنوية", val: "2,600 ⃁" },
    { label: "عدد المتاجر المُحالة", val: "10 متاجر" },
    { label: "إجمالي الاشتراكات", val: "26,000 ⃁" },
    { label: "عمولتك (10٪)", val: "2,600 ⃁ سنوياً" },
  ],
  exampleNote: "* مع نمو عدد إحالاتك وترقي عملائك لباقات أعلى، تزداد أرباحك تلقائياً.",
  faqTitle: "أسئلة شائعة",
  faqs: [
    {
      q: "من يحق له الانضمام للبرنامج؟",
      a: "البرنامج مفتوح للوكالات التسويقية والمستشارين الرقميين ومديري متاجر التجارة الإلكترونية وأي شخص لديه شبكة من أصحاب المتاجر الإلكترونية.",
    },
    {
      q: "متى أحصل على عمولتي؟",
      a: "تُحتسب العمولة بعد إتمام عملية الاشتراك وانتهاء فترة الاسترداد (7 أيام)، وتُصرف بشكل شهري عبر التحويل البنكي.",
    },
    {
      q: "هل العمولة لمرة واحدة أم متكررة؟",
      a: "العمولة متكررة — تحصل على 10٪ طوال مدة اشتراك العميل السنوي. إذا جدّد اشتراكه، تحصل على عمولة التجديد أيضاً.",
    },
    {
      q: "هل للخصم حد أدنى للباقة؟",
      a: "الخصم 10٪ يُطبق على جميع الباقات السنوية (الانطلاقة، النمو، الاحترافية، الأعمال) عند الاشتراك عبر رابطك.",
    },
    {
      q: "كيف أتابع إحالاتي وعمولاتي؟",
      a: "نوفر لك لوحة تحكم خاصة تُظهر عدد النقرات والتسجيلات والاشتراكات المكتملة والعمولات المستحقة.",
    },
  ],
  finalTitle: "مستعد تبدأ؟",
  finalDesc: "تواصل معنا الآن عبر واتساب ونساعدك تنطلق كشريك معتمد في أقل من 24 ساعة.",
};

const EN = {
  seoTitle: "Affiliate & Partner Program | Ziadah",
  seoDesc: "Join Ziadah's affiliate program — earn 10% commission on every annual subscription, and give your clients a 10% discount. Designed for marketing agencies and consultants.",
  tag: "Partner Program",
  heroTitle: "Earn with every store you grow",
  heroDesc: "An affiliate program built for marketing agencies and digital consultants — share Ziadah with your clients, earn a fixed commission on every annual subscription for as long as they stay subscribed.",
  ctaMain: "Start Partnering via WhatsApp",
  ctaSub: "Our team replies within minutes",
  stats: [
    { val: "10%", label: "Your commission on every annual plan" },
    { val: "10%", label: "Discount for your client on annual plans" },
    { val: "12 months", label: "Commission duration per subscription" },
    { val: "Instant", label: "Unique tracking link for you" },
  ],
  howTitle: "How does it work?",
  howSteps: [
    {
      num: "01",
      title: "Register as a partner",
      desc: "Reach out via WhatsApp and tell us about your agency or marketing activity. We'll send you your personal referral link right away.",
    },
    {
      num: "02",
      title: "Share your link with clients",
      desc: "Your clients subscribe to Ziadah through your link and automatically receive a 10% discount on their annual plan.",
    },
    {
      num: "03",
      title: "Earn your commission monthly",
      desc: "You receive 10% of the annual subscription value for every client you refer — for the entire duration of their subscription.",
    },
  ],
  benefitsTitle: "Why partner with us?",
  benefits: [
    {
      icon: "💰",
      title: "Commission that grows with you",
      desc: "The more clients you refer, the higher your monthly income. No commission cap.",
    },
    {
      icon: "🎯",
      title: "A product that sells itself",
      desc: "Ziadah delivers measurable results for e-commerce stores — conversion rates and sales speak for themselves.",
    },
    {
      icon: "🤝",
      title: "Dedicated partner support",
      desc: "A dedicated account manager helps you answer client questions and close deals.",
    },
    {
      icon: "📊",
      title: "Transparent reporting",
      desc: "A dashboard to track your referrals and accumulated commissions in real time.",
    },
    {
      icon: "🔗",
      title: "Seamless integration",
      desc: "Ziadah integrates with Salla and Zid — the two most popular e-commerce platforms in the Saudi market.",
    },
    {
      icon: "⚡",
      title: "2-minute setup",
      desc: "Your client activates the app themselves without any technical help — reducing the burden on both of you.",
    },
  ],
  exampleTitle: "Your potential earnings",
  exampleDesc: "Say you refer 10 stores on the Growth annual plan:",
  exampleRows: [
    { label: "Growth annual plan price", val: "2,600 SAR" },
    { label: "Referred stores", val: "10 stores" },
    { label: "Total subscriptions", val: "26,000 SAR" },
    { label: "Your commission (10%)", val: "2,600 SAR/year" },
  ],
  exampleNote: "* As the number of referrals grows and clients upgrade to higher plans, your income grows automatically.",
  faqTitle: "Frequently asked questions",
  faqs: [
    {
      q: "Who can join the program?",
      a: "The program is open to marketing agencies, digital consultants, e-commerce store managers, and anyone with a network of online store owners.",
    },
    {
      q: "When do I get paid?",
      a: "Commissions are calculated after subscription completion and the 7-day refund period, and are paid monthly via bank transfer.",
    },
    {
      q: "Is the commission one-time or recurring?",
      a: "It's recurring — you earn 10% for the full duration of the client's annual subscription. If they renew, you earn the renewal commission too.",
    },
    {
      q: "Is the discount available on all plans?",
      a: "The 10% discount applies to all annual plans (Starter, Growth, Professional, Business) when subscribing through your link.",
    },
    {
      q: "How do I track my referrals and commissions?",
      a: "We provide a dedicated dashboard showing clicks, registrations, completed subscriptions, and earned commissions.",
    },
  ],
  finalTitle: "Ready to get started?",
  finalDesc: "Reach out via WhatsApp now and we'll help you launch as a certified partner in less than 24 hours.",
};

export default function Affiliate() {
  const { lang } = useLanguage();
  const c = lang === "ar" ? AR : EN;
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  return (
    <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
      <SEO
        titleAr={AR.seoTitle}
        titleEn={EN.seoTitle}
        descriptionAr={AR.seoDesc}
        descriptionEn={EN.seoDesc}
      />

      <div className="aff-root" dir={dir}>

        {/* ── Hero ── */}
        <section className="aff-hero">
          <div className="aff-glow aff-glow--top" />
          <div className="aff-wrap">
            <div className="aff-tag">{c.tag}</div>
            <h1 className="aff-hero-title">{c.heroTitle}</h1>
            <p className="aff-hero-desc">{c.heroDesc}</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="aff-cta-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2C5.6 2 2 5.6 2 10C2 11.4 2.4 12.8 3 14L2 18L6 17C7.2 17.6 8.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM13.5 12.5C13.3 13 12.5 13.5 12 13.5C11.3 13.5 10.8 13.3 8.5 11.5C6.5 9.7 6 8.7 6 8C6 7.5 6.2 7 6.7 6.5C7 6.2 7.3 6 7.7 6C8 6 8.3 6.5 8.7 7.3C9 7.8 9.3 8.5 9.3 8.8C9.3 9 9 9.3 8.8 9.5C8.7 9.7 8.5 9.8 8.7 10.2C9 10.7 9.5 11.3 10 11.8C10.5 12.3 11 12.7 11.5 12.8C11.8 13 12 12.8 12.3 12.5C12.5 12.2 12.8 12 13 12C13.3 12 14 12.8 13.5 12.5Z" fill="currentColor"/>
              </svg>
              {c.ctaMain}
            </a>
            <p className="aff-cta-sub">{c.ctaSub}</p>

            {/* Stats */}
            <div className="aff-stats">
              {c.stats.map((s, i) => (
                <div key={i} className="aff-stat">
                  <div className="aff-stat-val">{s.val}</div>
                  <div className="aff-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="aff-section">
          <div className="aff-wrap">
            <div className="aff-section-tag">{c.howTitle}</div>
            <div className="aff-steps">
              {c.howSteps.map((step, i) => (
                <div key={i} className="aff-step">
                  <div className="aff-step-num">{step.num}</div>
                  <div className="aff-step-body">
                    <div className="aff-step-title">{step.title}</div>
                    <div className="aff-step-desc">{step.desc}</div>
                  </div>
                  {i < c.howSteps.length - 1 && (
                    <div className="aff-step-arrow" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d={isAr ? "M14 11H8M8 8l-3 3 3 3" : "M8 11h6M14 8l3 3-3 3"} stroke="rgba(124,58,237,.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="aff-section aff-section--alt">
          <div className="aff-wrap">
            <div className="aff-section-tag">{c.benefitsTitle}</div>
            <div className="aff-benefits">
              {c.benefits.map((b, i) => (
                <div key={i} className="aff-benefit">
                  <div className="aff-benefit-icon">{b.icon}</div>
                  <div className="aff-benefit-title">{b.title}</div>
                  <div className="aff-benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Earnings Example ── */}
        <section className="aff-section">
          <div className="aff-wrap">
            <div className="aff-section-tag">{c.exampleTitle}</div>
            <p className="aff-example-desc">{c.exampleDesc}</p>
            <div className="aff-example-table">
              {c.exampleRows.map((row, i) => (
                <div key={i} className={`aff-example-row${i === c.exampleRows.length - 1 ? " aff-example-row--total" : ""}`}>
                  <span className="aff-example-row-label">{row.label}</span>
                  <span className="aff-example-row-val">{row.val}</span>
                </div>
              ))}
            </div>
            <p className="aff-example-note">{c.exampleNote}</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="aff-section aff-section--alt">
          <div className="aff-wrap">
            <div className="aff-section-tag">{c.faqTitle}</div>
            <div className="aff-faqs">
              {c.faqs.map((faq, i) => (
                <details key={i} className="aff-faq">
                  <summary className="aff-faq-q">
                    <span>{faq.q}</span>
                    <span className="aff-faq-chevron" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="aff-faq-a">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="aff-final">
          <div className="aff-glow aff-glow--bottom" />
          <div className="aff-wrap aff-final-inner">
            <h2 className="aff-final-title">{c.finalTitle}</h2>
            <p className="aff-final-desc">{c.finalDesc}</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="aff-cta-btn aff-cta-btn--large">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2C5.6 2 2 5.6 2 10C2 11.4 2.4 12.8 3 14L2 18L6 17C7.2 17.6 8.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM13.5 12.5C13.3 13 12.5 13.5 12 13.5C11.3 13.5 10.8 13.3 8.5 11.5C6.5 9.7 6 8.7 6 8C6 7.5 6.2 7 6.7 6.5C7 6.2 7.3 6 7.7 6C8 6 8.3 6.5 8.7 7.3C9 7.8 9.3 8.5 9.3 8.8C9.3 9 9 9.3 8.8 9.5C8.7 9.7 8.5 9.8 8.7 10.2C9 10.7 9.5 11.3 10 11.8C10.5 12.3 11 12.7 11.5 12.8C11.8 13 12 12.8 12.3 12.5C12.5 12.2 12.8 12 13 12C13.3 12 14 12.8 13.5 12.5Z" fill="currentColor"/>
              </svg>
              {c.ctaMain}
            </a>
          </div>
        </section>

      </div>
    </PageShell>
  );
}
