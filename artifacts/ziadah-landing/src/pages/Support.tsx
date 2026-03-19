import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";

interface Article { title: string; desc: string; time: string; }
interface Category { id: string; icon: JSX.Element; label: string; color: string; articles: Article[]; }

const categories: Category[] = [
  {
    id: "start", label: "البداية السريعة", color: "#a855f7",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3L3 11h8l-2 8 10-12h-8l2-7z" fill="rgba(168,85,247,.3)" stroke="#a855f7" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    articles: [
      { title: "كيف تفعّل زيادة على منصة زد؟", desc: "خطوات التفعيل بالتفصيل - من الدخول للمتجر حتى أول اقتراح ذكي.", time: "٣ دقائق" },
      { title: "كيف تفعّل زيادة على منصة سلة؟", desc: "دليل التفعيل الكامل على سلة مع صور توضيحية لكل خطوة.", time: "٣ دقائق" },
      { title: "إعداد أول حملة توصية ذكية", desc: "كيف تختار الهدف الأول وطريقة العرض المناسبة لمتجرك.", time: "٥ دقائق" },
      { title: "ربط المنتجات والفئات", desc: "كيف يتعرف الذكاء الاصطناعي على كتالوج منتجاتك تلقائياً.", time: "٤ دقائق" },
      { title: "فهم لوحة التحليلات", desc: "شرح كل مقياس في لوحة التحكم وكيف تقرأ النتائج بشكل صحيح.", time: "٦ دقائق" },
      { title: "أسئلة شائعة للمبتدئين", desc: "أكثر ١٠ أسئلة يسألها التجار الجدد مع إجاباتها الكاملة.", time: "٧ دقائق" },
    ],
  },
  {
    id: "features", label: "الخصائص والإعدادات", color: "#06b6d4",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" fill="rgba(6,182,212,.2)" stroke="#06b6d4" strokeWidth="1.3"/><rect x="12" y="3" width="7" height="7" rx="2" fill="rgba(6,182,212,.2)" stroke="#06b6d4" strokeWidth="1.3"/><rect x="3" y="12" width="7" height="7" rx="2" fill="rgba(6,182,212,.2)" stroke="#06b6d4" strokeWidth="1.3"/><rect x="12" y="12" width="7" height="7" rx="2" fill="rgba(6,182,212,.2)" stroke="#06b6d4" strokeWidth="1.3"/></svg>,
    articles: [
      { title: "شرح الأهداف الـ ٥ بالتفصيل", desc: "متى تستخدم كل هدف وما الفرق بين زيادة الكمية وزيادة قيمة السلة.", time: "٨ دقائق" },
      { title: "طرق العرض الـ ٥ وكيف تختار المناسب", desc: "مقارنة بين منتجات ذات صلة، Add-ons، Combo، وبقية طرق العرض.", time: "١٠ دقائق" },
      { title: "إعداد عروض الكوبونات الذكية", desc: "كيف تضع شروط الكوبون وتربطه بهدف معين لزيادة الفعالية.", time: "٦ دقائق" },
      { title: "تخصيص شكل الاقتراحات في متجرك", desc: "تغيير الألوان، النصوص، وطريقة عرض التوصيات لتناسب تصميم متجرك.", time: "٥ دقائق" },
      { title: "إعداد قواعد الاستهداف المخصصة", desc: "تحديد شرائح عملاء معينة للحملات المخصصة بناءً على سلوكهم.", time: "٩ دقائق" },
      { title: "فهم نقاط الاقتراح الـ ٩ ورحلة العميل", desc: "أين تظهر التوصيات في كل خطوة من رحلة الشراء وكيف تحسينها.", time: "١٢ دقائق" },
    ],
  },
  {
    id: "ai", label: "الذكاء الاصطناعي", color: "#10b981",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="9" r="6" fill="rgba(16,185,129,.15)" stroke="#10b981" strokeWidth="1.3"/><path d="M7 18 C7 14 9 13 11 13 C13 13 15 14 15 18" fill="rgba(16,185,129,.08)" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8.5" cy="8.5" r="1" fill="#10b981"/><circle cx="11" cy="8.5" r="1" fill="#10b981"/><circle cx="13.5" cy="8.5" r="1" fill="#10b981"/></svg>,
    articles: [
      { title: "كيف يتعلم الذكاء الاصطناعي على عملائك؟", desc: "شرح مبسط لآلية التعلم الآلي وكيف يتحسن النظام مع كل طلب.", time: "٧ دقائق" },
      { title: "البيانات التي يحللها النظام", desc: "قائمة كاملة بالإشارات التي يستخدمها AI: الموقع، الجهاز، السلوك، التاريخ.", time: "٦ دقائق" },
      { title: "كم وقت يحتاج الذكاء الاصطناعي ليتعلم؟", desc: "مراحل التعلم ومتى تبدأ النتائج تتحسن بشكل ملحوظ.", time: "٤ دقائق" },
      { title: "تفسير توصيات الذكاء الاصطناعي", desc: "كيف تقرأ سبب اقتراح الذكاء الاصطناعي لمنتج معين لعميل بعينه.", time: "٨ دقائق" },
      { title: "الخصوصية وحماية بيانات العملاء", desc: "ما البيانات التي نجمعها وكيف نحميها وفق لوائح حماية البيانات.", time: "٥ دقائق" },
      { title: "رفع دقة التوصيات يدوياً", desc: "نصائح لتحسين جودة التوصيات من خلال ربط الفئات والمنتجات بشكل أفضل.", time: "٩ دقائق" },
    ],
  },
  {
    id: "billing", label: "الأسعار والفواتير", color: "#f59e0b",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="13" rx="2.5" fill="rgba(245,158,11,.12)" stroke="#f59e0b" strokeWidth="1.3"/><line x1="3" y1="9" x2="19" y2="9" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2"/><rect x="6" y="12" width="4" height="3" rx="1" fill="rgba(245,158,11,.3)"/></svg>,
    articles: [
      { title: "مقارنة الباقات الأربع بالتفصيل", desc: "ما الذي تحصل عليه في كل باقة وكيف تختار المناسب لحجم متجرك.", time: "٦ دقائق" },
      { title: "الفرق بين الاشتراك الشهري والسنوي", desc: "حساب التوفير السنوي وكيف يعمل التحويل بين الباقتين.", time: "٣ دقائق" },
      { title: "كيف تُحتسب الفاتورة الشهرية؟", desc: "توضيح آلية الاحتساب وتاريخ التجديد والرسوم المشمولة بالضريبة.", time: "٤ دقائق" },
      { title: "الترقية أو الخفض بين الباقات", desc: "كيف تغير باقتك في أي وقت وما يحدث للرصيد المتبقي.", time: "٣ دقائق" },
      { title: "سياسة الإلغاء واسترداد المبلغ", desc: "شروط الإلغاء وكيفية طلب استرداد وفق الضمان المقدم.", time: "٥ دقائق" },
      { title: "طرق الدفع المتاحة وكيف تحدّث بياناتك", desc: "الدفع عبر بطاقات مدى وفيزا وماستر وإدارة بيانات الدفع.", time: "٣ دقائق" },
    ],
  },
  {
    id: "technical", label: "التقنية والتكامل", color: "#ec4899",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" fill="rgba(236,72,153,.1)" stroke="#ec4899" strokeWidth="1.3"/><path d="M7 9l-2 2 2 2M15 9l2 2-2 2M12 8l-2 6" stroke="#ec4899" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    articles: [
      { title: "كيف يتكامل زيادة مع زد وسلة؟", desc: "شرح الاتصال التقني بين زيادة والمنصتين وكيف تتم المزامنة.", time: "٦ دقائق" },
      { title: "التعامل مع ثيمات المتاجر المخصصة", desc: "كيف تضمن ظهور الاقتراحات بشكل صحيح في ثيمات غير القياسية.", time: "٨ دقائق" },
      { title: "تكامل زيادة مع Google Analytics", desc: "كيف تتبع أداء الاقتراحات في تقارير Analytics.", time: "٧ دقائق" },
      { title: "سرعة الموقع وتأثير زيادة", desc: "كيف صممنا زيادة ليكون خفيفاً ولا يؤثر على سرعة متجرك.", time: "٤ دقائق" },
      { title: "إضافة فريق العمل وإدارة الصلاحيات", desc: "كيف تضيف أعضاء للفريق وتحدد صلاحيات كل منهم.", time: "٥ دقائق" },
      { title: "استكشاف الأخطاء الشائعة وحلها", desc: "قائمة بأكثر المشكلات تكراراً وكيف تحلها بنفسك.", time: "١٠ دقائق" },
    ],
  },
  {
    id: "strategies", label: "استراتيجيات النمو", color: "#8b5cf6",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="14" width="4" height="6" rx="1" fill="rgba(139,92,246,.2)" stroke="#8b5cf6" strokeWidth="1.2"/><rect x="9" y="9" width="4" height="11" rx="1" fill="rgba(139,92,246,.35)" stroke="#8b5cf6" strokeWidth="1.2"/><rect x="15" y="4" width="4" height="16" rx="1" fill="#8b5cf6" stroke="rgba(139,92,246,.7)" strokeWidth="1.2"/><path d="M5 12 L11 7 L17 2" stroke="rgba(167,139,250,.5)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/></svg>,
    articles: [
      { title: "أفضل الاستراتيجيات لمتاجر الأزياء", desc: "حزم الإطقم وتجميع الإكسسوارات والخصومات التدريجية - دليل الموضة.", time: "١٠ دقائق" },
      { title: "زيادة مبيعات متاجر الغذاء والمشروبات", desc: "استراتيجيات Combo والاشتراكات الدورية لمتاجر المأكولات والمشروبات.", time: "٩ دقائق" },
      { title: "تعظيم الأرباح لمتاجر الجمال والعناية", desc: "روتين العناية الكاملة وتوصيات المنتجات المكملة لرفع سلة الجمال.", time: "١١ دقائق" },
      { title: "كيف تستخدم البيانات لتحسين أداء حملاتك", desc: "قراءة تقارير التحليلات واتخاذ قرارات ذكية بناءً على البيانات.", time: "١٢ دقائق" },
      { title: "موسم الأعياد والمناسبات - دليل الاستعداد", desc: "كيف تعد متجرك وزيادة لموسم رمضان والجمعة السوداء والأعياد.", time: "٨ دقائق" },
      { title: "قياس عائد الاستثمار من زيادة بدقة", desc: "كيف تحسب صافي العائد مع مراعاة تكلفة الاشتراك والإيرادات الإضافية.", time: "٧ دقائق" },
    ],
  },
];

export default function Support() {
  const [active, setActive] = useState("start");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeCat = categories.find(c => c.id === active)!;
  const filtered = search.trim()
    ? categories.flatMap(c => c.articles.filter(a => a.title.includes(search) || a.desc.includes(search)).map(a => ({ ...a, cat: c.label, color: c.color })))
    : [];

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
      <section style={{ paddingTop: 140, paddingBottom: 56, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>مركز الدعم والمساعدة</div>
        <h1 className="st rv d1" style={{ fontSize: "clamp(38px,5vw,64px)", marginTop: 8 }}>كيف نقدر نساعدك؟</h1>
        <p className="ssub rv d2" style={{ margin: "0 auto 36px" }}>مقالات شاملة لمساعدتك من التفعيل حتى تحقيق أقصى نتائج</p>
        {/* Search */}
        <div className="rv d3" style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ابحث في المقالات..."
            style={{ width: "100%", padding: "15px 50px 15px 20px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 50, color: "#fff", fontFamily: "var(--font)", fontSize: 15, outline: "none", backdropFilter: "blur(20px)", transition: "border .25s" }}
            onFocus={e => e.target.style.borderColor = "rgba(168,85,247,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
          />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}><circle cx="8" cy="8" r="5.5" stroke="rgba(255,255,255,.3)" strokeWidth="1.4"/><line x1="12" y1="12" x2="16" y2="16" stroke="rgba(255,255,255,.3)" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
        {/* Search results */}
        {search.trim() && (
          <div style={{ maxWidth: 560, margin: "12px auto 0", background: "rgba(8,6,20,.98)", border: "1px solid var(--b1)", borderRadius: 16, padding: 8, textAlign: "right" }}>
            {filtered.length > 0 ? filtered.map((a, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 12, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>{a.cat} · {a.time} قراءة</div>
              </div>
            )) : <div style={{ padding: "16px 14px", fontSize: 14, color: "var(--td)" }}>لم يتم العثور على نتائج</div>}
          </div>
        )}
      </section>

      {/* QUICK LINKS */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }} className="rv">
            {[
              { label: "التحدث مع الدعم", href: "https://api.whatsapp.com/send/?phone=966510131856", icon: "💬", desc: "رد خلال ساعة" },
              { label: "احجز اجتماعاً", href: "https://calendar.app.google/pjtPBzs9TUPipUEF6", icon: "📅", desc: "جلسة ٣٠ دقيقة" },
              { label: "لوحة تحكم زد", href: "https://web.ziadah.app/", icon: "🔗", desc: "ادخل مباشرة" },
              { label: "لوحة تحكم سلة", href: "https://dashboard.ziadah.app/", icon: "🔗", desc: "ادخل مباشرة" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 14, textDecoration: "none", color: "#fff", transition: "all .25s", backdropFilter: "blur(16px)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,.1)"; e.currentTarget.style.borderColor = "rgba(124,58,237,.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--s1)"; e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; }}
              >
                <span style={{ fontSize: 22 }}>{l.icon}</span>
                <div><div style={{ fontWeight: 700, fontSize: 14 }}>{l.label}</div><div style={{ fontSize: 11, color: "var(--td)" }}>{l.desc}</div></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES + ARTICLES */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ position: "sticky", top: 88 }}>
            <div className="gc" style={{ padding: 8 }}>
              <div className="shine"/>
              {categories.map(c => (
                <button key={c.id} onClick={() => setActive(c.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: "none", background: active === c.id ? `rgba(${c.id === "start" ? "168,85,247" : c.id === "features" ? "6,182,212" : c.id === "ai" ? "16,185,129" : c.id === "billing" ? "245,158,11" : c.id === "technical" ? "236,72,153" : "139,92,246"},.12)` : "transparent", color: active === c.id ? "#fff" : "var(--tm)", fontFamily: "var(--font)", fontSize: 14, fontWeight: active === c.id ? 700 : 500, cursor: "pointer", transition: "all .2s", textAlign: "right" }}>
                  {c.icon}
                  <span style={{ flex: 1 }}>{c.label}</span>
                  <span style={{ fontSize: 11, color: "var(--td)" }}>{c.articles.length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              {activeCat.icon}
              <h2 style={{ fontSize: 26, fontWeight: 900 }}>{activeCat.label}</h2>
              <span style={{ marginRight: "auto", fontSize: 13, color: "var(--td)", background: "var(--s1)", padding: "4px 12px", borderRadius: 50, border: "1px solid var(--b1)" }}>{activeCat.articles.length} مقالات</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeCat.articles.map((a, i) => (
                <div key={i} className="gc" style={{ padding: "22px 26px", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,.07)"; e.currentTarget.style.borderColor = "rgba(124,58,237,.25)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--s1)"; e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; }}
                >
                  <div className="shine"/>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(168,85,247,.1)`, border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: activeCat.color }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{a.title}</div>
                      <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.6 }}>{a.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--td)", flexShrink: 0, marginTop: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                      {a.time}
                    </div>
                  </div>
                </div>
              ))}
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
