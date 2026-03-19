import { useEffect } from "react";
import { Link } from "wouter";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";

const stories = [
  {
    store: "عسل رشوف",
    sector: "المنتجات الغذائية",
    logo: "ع",
    color: "linear-gradient(135deg,#7c3aed,#5b21b6)",
    tagline: "من متجر محلي إلى علامة تجارية ناجحة بمساعدة الذكاء الاصطناعي",
    founded: "٢٠٢١",
    platform: "سلة",
    before: { aov: "٨٥", conv: "١.٢٪", monthly: "١٢,٠٠٠" },
    after: { aov: "١١٢", conv: "١.٩٪", monthly: "٣١,٠٠٠" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+٣٢٪", color: "#a855f7" },
      { label: "زيادة في المبيعات الشهرية", value: "+١٥٨٪", color: "#06b6d4" },
      { label: "عائد على الاستثمار", value: "١٢x", color: "#10b981" },
      { label: "مدة تحقيق النتائج", value: "٣ أسابيع", color: "#f59e0b" },
    ],
    quote: "تطبيق جبار ساعدني على استهداف العميل داخل المتجر. السعر مو شئ أمام النتيجة. الذكاء الاصطناعي يعرف عميلي أكثر مني أحياناً - يقترح المنتج الصح في الوقت الصح بدون أي جهد مني.",
    person: "أحمد الرشوف",
    role: "مؤسس متجر عسل رشوف",
    strategy: "استخدم زيادة لعرض منتجات العسل المتكاملة (عسل + مانوكا + حبة سوداء) كحزمة Combo مع خصم تدريجي.",
    results: ["ارتفع متوسط الطلب من ٨٥ إلى ١١٢ ريال", "٦٨٪ من العملاء يختارون الحزمة الكاملة", "تضاعفت المبيعات الشهرية خلال شهرين", "وفّر ٤٠٪ من تكاليف التسويق الإضافي"],
  },
  {
    store: "الجباره",
    sector: "البيع بالجملة والتجزئة",
    logo: "ج",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    tagline: "متجر متعدد الأصناف يحقق مبيعات قياسية بتخصيص ذكي",
    founded: "٢٠١٩",
    platform: "زد",
    before: { aov: "١٤٠", conv: "٢.١٪", monthly: "٤٥,٠٠٠" },
    after: { aov: "١٧٩", conv: "٣.٤٪", monthly: "٩٨,٠٠٠" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+٢٨٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+٦٢٪", color: "#06b6d4" },
      { label: "عائد على الاستثمار", value: "١٨x", color: "#10b981" },
      { label: "وقت التفعيل", value: "٢٤ ساعة", color: "#f59e0b" },
    ],
    quote: "تطبيق أكثر من رائع - النتائج مدهشة! خسارة اني ما عرفت التطبيق قبل كذا. خدمة العملاء مميزة يساعدونك حتى تحقق مبيعات. الآن كل عميل يحصل على تجربة شخصية مختلفة وهذا يظهر في الأرقام.",
    person: "سعد الجبار",
    role: "مدير متجر الجباره",
    strategy: "فعّل منتجات ذات صلة في صفحات المنتجات وعروض Buy-2-Get مخفضة في صفحة السلة.",
    results: ["ارتفع معدل التحويل من ٢.١ إلى ٣.٤٪", "تضاعفت المبيعات الشهرية من ٤٥ إلى ٩٨ ألف ريال", "٤١٪ من العملاء يشترون منتجاً إضافياً", "انخفضت تكلفة اكتساب العملاء بنسبة ٣٥٪"],
  },
  {
    store: "سكندز",
    sector: "الأزياء والموضة",
    logo: "س",
    color: "linear-gradient(135deg,#059669,#047857)",
    tagline: "علامة أزياء تحوّل كل زيارة إلى تجربة تسوق مخصصة",
    founded: "٢٠٢٢",
    platform: "سلة",
    before: { aov: "٢٢٠", conv: "١.٨٪", monthly: "٦٥,٠٠٠" },
    after: { aov: "٢٩٩", conv: "٢.٤٪", monthly: "١٣٥,٠٠٠" },
    metrics: [
      { label: "زيادة في قيمة الطلب", value: "+٤١٪", color: "#a855f7" },
      { label: "عائد الاشتراك", value: "10x", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+١٠٨٪", color: "#10b981" },
      { label: "نقاط اقتراح نشطة", value: "٨ نقاط", color: "#f59e0b" },
    ],
    quote: "فنانين، متعاونين، عبااقرة! حجم المردود لا يقارن بقيمة الاشتراك. اشتركوا وتوكلوا على الله. الذكاء الاصطناعي اكتشف أن عملائي يشترون إكسسوارات مع كل قطعة ملابس وبدأ يقترحها تلقائياً.",
    person: "فريق سكندز",
    role: "متجر أزياء سعودي",
    strategy: "فعّل إضافات الإكسسوارات (Combo) مع كل قطعة ملابس وعروض الكميات للخصومات التدريجية.",
    results: ["قفز متوسط الطلب من ٢٢٠ إلى ٢٩٩ ريال", "٥٣٪ من العملاء يضيفون إكسسواراً واحداً على الأقل", "المبيعات الشهرية تضاعفت في ٤ أشهر", "تقليل معدل التخلي عن السلة بنسبة ٢٨٪"],
  },
  {
    store: "Nahla Oil",
    sector: "الجمال والعناية الطبيعية",
    logo: "ن",
    color: "linear-gradient(135deg,#ec4899,#be185d)",
    tagline: "زيوت طبيعية تصل للعميل الصح في اللحظة الصح",
    founded: "٢٠٢٠",
    platform: "سلة",
    before: { aov: "١٨٠", conv: "٢.٣٪", monthly: "٤٢,٠٠٠" },
    after: { aov: "٢٤٣", conv: "٣.١٪", monthly: "٧٨,٠٠٠" },
    metrics: [
      { label: "زيادة في معدل التحويل", value: "+٣٥٪", color: "#a855f7" },
      { label: "زيادة في إعادة الطلب", value: "+٢٢٪", color: "#06b6d4" },
      { label: "زيادة في متوسط الطلب", value: "+٣٥٪", color: "#10b981" },
      { label: "رضا العملاء", value: "٩٧٪", color: "#f59e0b" },
    ],
    quote: "التطبيق من أكثر التطبيقات فعالية في زيادة السلة. فريق يهتم لتفاصيل التفاصيل ويأخذ بآراء العملاء. الآن عملائي يطلبون بشكل دوري لأن زيادة يذكرهم بالمنتجات المكملة.",
    person: "نهلة السعيد",
    role: "مؤسسة Nahla Oil",
    strategy: "ربطت منتجات الزيوت المكملة كحزم علاجية + كوبونات خصم للطلبات فوق ٢٠٠ ريال.",
    results: ["ارتفع متوسط الطلب من ١٨٠ إلى ٢٤٣ ريال", "زادت إعادة الشراء بنسبة ٢٢٪", "٤٥٪ من العملاء يشترون حزمة العناية الكاملة", "معدل رضا العملاء ٩٧٪ حسب التقييمات"],
  },
  {
    store: "FABIAN",
    sector: "الأزياء الرجالية الراقية",
    logo: "ف",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
    tagline: "أزياء رجالية بتجربة VIP مخصصة لكل عميل",
    founded: "٢٠٢١",
    platform: "زد",
    before: { aov: "٣٨٠", conv: "١.٥٪", monthly: "٨٨,٠٠٠" },
    after: { aov: "٤٧٥", conv: "١.٩٪", monthly: "١٦٥,٠٠٠" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+٢٥٪", color: "#a855f7" },
      { label: "زيادة في التحويلات", value: "+٢٧٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+٨٨٪", color: "#10b981" },
      { label: "تقييم العملاء", value: "⭐⭐⭐⭐⭐", color: "#f59e0b" },
    ],
    quote: "رائع وسهل انصح فيه لرفع مبيعات السلة. كل الشكر لخدمة العملاء والفريق كل التوفيق. الذكاء الاصطناعي يعرف الفرق بين عميل القمصان وعميل البدل ويعرض المنتج المناسب.",
    person: "فريق FABIAN",
    role: "متجر أزياء رجالية فاخرة",
    strategy: "فعّل تجميع الإطقم الكاملة (قميص + بنطلون + حزام) مع خصم ٨٪ على الطقم الكامل.",
    results: ["قفز متوسط الطلب من ٣٨٠ إلى ٤٧٥ ريال", "٣٨٪ من العملاء يشترون طقماً كاملاً", "المبيعات الشهرية من ٨٨ إلى ١٦٥ ألف ريال", "معدل إعادة الشراء ارتفع ٣٢٪"],
  },
  {
    store: "جمعية القرآن الكريم",
    sector: "المنظمات غير الربحية والتبرعات",
    logo: "ق",
    color: "linear-gradient(135deg,#4f46e5,#4338ca)",
    tagline: "منصة تبرعات تضاعف أثرها بتوصيات ذكية للمتبرعين",
    founded: "٢٠١٨",
    platform: "سلة",
    before: { aov: "٥٠", conv: "٣.٢٪", monthly: "٣٥,٠٠٠" },
    after: { aov: "٦٥", conv: "٤.١٪", monthly: "٧٥,٠٠٠" },
    metrics: [
      { label: "زيادة في سلة التبرعات", value: "+٥٠٪", color: "#a855f7" },
      { label: "زيادة في عدد المتبرعين", value: "+٣٠٪", color: "#06b6d4" },
      { label: "زيادة في إجمالي التبرعات", value: "+١١٤٪", color: "#10b981" },
      { label: "رضا المتبرعين", value: "٩٨٪", color: "#f59e0b" },
    ],
    quote: "تطبيق متميز سهّل عملية التبرعات وأتاح فرص إضافية للمساهمة. فريق العمل متعاون جداً ومتفاعل. الآن المتبرع يتبرع لمشروع ويُقترح عليه مشاريع مرتبطة تكمل أثره.",
    person: "إدارة الجمعية",
    role: "جمعية خيرية معتمدة",
    strategy: "عرض مشاريع تبرع مرتبطة بناءً على المشروع المختار + باقات تبرع تدريجية.",
    results: ["ارتفع متوسط التبرع من ٥٠ إلى ٦٥ ريال", "تضاعف عدد المتبرعين الجدد", "إجمالي التبرعات الشهرية من ٣٥ إلى ٧٥ ألف ريال", "٤٤٪ من المتبرعين يتبرعون لأكثر من مشروع"],
  },
];

const sectors = [
  { name: "الغذاء والمشروبات", icon: "🍯", stores: "+١٨٠ متجر", avg: "+٢٨٪ مبيعات" },
  { name: "الأزياء والموضة", icon: "👔", stores: "+٢٣٠ متجر", avg: "+٣٥٪ مبيعات" },
  { name: "الجمال والعناية", icon: "💄", stores: "+١٤٠ متجر", avg: "+٣٢٪ مبيعات" },
  { name: "الإلكترونيات", icon: "📱", stores: "+٩٠ متجر", avg: "+٢٢٪ مبيعات" },
  { name: "المنزل والديكور", icon: "🏠", stores: "+٧٠ متجر", avg: "+٢٦٪ مبيعات" },
  { name: "التبرعات والخيرية", icon: "🤲", stores: "+٤٠ متجر", avg: "+٤٨٪ تبرعات" },
];

export default function SuccessStories() {
  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>قصص نجاح حقيقية</div>
        <h1 className="st rv d1" style={{ fontSize: "clamp(40px,5vw,68px)", marginTop: 8 }}>أرقام لا تكذب<br />من تجار أثقوا فيها</h1>
        <p className="ssub rv d2" style={{ margin: "0 auto 48px" }}>+٧٠٠ متجر يستخدم زيادة يومياً. هنا نشارك قصص حقيقية بأرقام موثقة من تجار حققوا نتائج استثنائية.</p>
        <div className="rv d3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[["٧٠٠+","متجر نشط"],["١٠M+","ريال مبيعات إضافية"],["٣٥٪","متوسط زيادة الطلب"]].map(([v,l])=>(
            <div key={l} style={{ padding: "18px 32px", background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, backdropFilter: "blur(20px)" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "var(--p3)" }}>{v}</div>
              <div style={{ fontSize: 13, color: "var(--td)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section style={{ position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%", paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          {stories.map((s, i) => (
            <div key={s.store} className={`gc rv d${(i%2)+1}`} style={{ padding: "0", overflow: "hidden" }}>
              <div className="shine"/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", minHeight: 0 }}>
                {/* Left: profile */}
                <div style={{ padding: "48px 40px", background: "rgba(0,0,0,.25)", borderLeft: "1px solid var(--b1)", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, boxShadow: `0 0 24px rgba(124,58,237,.3)` }}>{s.logo}</div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>{s.store}</div>
                      <div style={{ fontSize: 12, color: "var(--td)" }}>{s.sector} · {s.platform} · منذ {s.founded}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75, fontStyle: "italic", borderRight: "2px solid rgba(168,85,247,.3)", paddingRight: 14 }}>"{s.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.logo}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700 }}>{s.person}</div><div style={{ fontSize: 11, color: "var(--td)" }}>{s.role}</div></div>
                  </div>
                  <div style={{ padding: "14px 16px", background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.18)", borderRadius: 12, fontSize: 13, color: "var(--tm)", lineHeight: 1.7 }}>
                    <span style={{ color: "var(--p3)", fontWeight: 700 }}>الاستراتيجية: </span>{s.strategy}
                  </div>
                </div>
                {/* Right: metrics */}
                <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--td)", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>القصة</div>
                    <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3 }}>{s.tagline}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {s.metrics.map(m => (
                      <div key={m.label} style={{ padding: "18px 20px", background: "rgba(0,0,0,.25)", border: "1px solid var(--b1)", borderRadius: 14 }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: 12, color: "var(--td)", marginTop: 6 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <div style={{ padding: "12px 16px", background: "rgba(0,0,0,.2)", borderRadius: 12, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>قبل زيادة</div>
                      <div style={{ fontSize: 13, color: "var(--tm)" }}>متوسط الطلب <span style={{ fontWeight: 800, color: "#fff" }}>{s.before.aov} ر.س</span></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14H22M15 8L22 14L15 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div style={{ padding: "12px 16px", background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 12, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "var(--p3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>بعد زيادة</div>
                      <div style={{ fontSize: 13, color: "var(--tm)" }}>متوسط الطلب <span style={{ fontWeight: 800, color: "var(--p3)" }}>{s.after.aov} ر.س</span></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--td)", fontWeight: 700, marginBottom: 10 }}>النتائج الموثقة:</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {s.results.map(r => (
                        <div key={r} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--tm)", alignItems: "flex-start" }}>
                          <span style={{ color: "#10b981", fontWeight: 800, flexShrink: 0 }}>✓</span>{r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>حسب القطاع</div>
            <h2 className="st rv d1">نجاح في كل قطاع</h2>
            <p className="ssub rv d2" style={{ margin: "0 auto" }}>زيادة يعمل مع جميع أنواع المتاجر</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="rv d2">
            {sectors.map(s => (
              <div key={s.name} className="gc" style={{ padding: "28px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div className="shine"/>
                <div style={{ fontSize: 36 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--td)", marginTop: 3 }}>{s.stores} · {s.avg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="gc cta-box rv" style={{ padding: "72px 56px" }}>
            <div className="shine"/><div className="cta-glow"/>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, position: "relative", zIndex: 1 }}>متجرك القادم في قائمة النجاح</h2>
            <p style={{ color: "var(--tm)", fontSize: 17, marginBottom: 40, position: "relative", zIndex: 1 }}>انضم لـ +٧٠٠ متجر وابدأ رحلتك اليوم</p>
            <div className="cta-btns">
              <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer" className="cta-btn cb-zid"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff"/></svg>فعّل الآن على زد</a>
              <a href="https://apps.salla.sa/ar/app/1099604538" target="_blank" rel="noreferrer" className="cta-btn cb-salla"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="3" fill="rgba(255,255,255,.3)"/><path d="M6 9h6M9 6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>فعّل الآن على سلة</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 5%", borderTop: "1px solid var(--b1)", position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--td)" }}>© ٢٠٢٥ Ziadah. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
