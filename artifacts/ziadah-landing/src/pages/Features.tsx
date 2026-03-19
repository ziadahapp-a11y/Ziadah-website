import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import PlatformModal from "../components/PlatformModal";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { SoftwareAppSchema, BreadcrumbSchema } from "../components/JsonLd";

const goals = [
  { id: 1, icon: "🛒", title: "إضافة المزيد من المنتجات", subtitle: "زيادة عدد المنتجات في كل طلب", color: "#a855f7", desc: "يقترح الذكاء الاصطناعي منتجات إضافية مرتبطة بما في سلة العميل أو ما يتصفحه. الهدف زيادة عدد المنتجات لا قيمتها فقط.", when: "الأنسب عندما يكون متجرك يبيع منتجات صغيرة مكملة بأسعار منخفضة.", example: "عميل اشترى شامبو → يُقترح عليه بلسم الشعر + ماسك الشعر.", boost: "+28٪ متوسط المنتجات في السلة" },
  { id: 2, icon: "📦", title: "عرض الكميات (Buy X Get Y)", subtitle: "تحفيز الشراء بكميات أكبر", color: "#06b6d4", desc: "يعرض النظام خصوماً تدريجية عند شراء كميات أكبر: اشتر 2 واحصل على خصم 10٪، اشتر 3 وخصم 20٪. يحفز زيادة الكمية لنفس المنتج.", when: "مثالي للمنتجات القابلة للاستهلاك: العطور، المواد الغذائية، مستحضرات التجميل.", example: "عميل في صفحة مشروب البروتين → يظهر له: 'اشتر 3 واحصل على خصم 15٪'.", boost: "+35٪ في الكمية المطلوبة" },
  { id: 3, icon: "⬆️", title: "استبدال المنتج (Upsell)", subtitle: "عرض بديل أعلى قيمة وجودة", color: "#10b981", desc: "يقترح النظام نسخة أفضل أو أعلى جودة من المنتج الذي يشاهده العميل. يرفع قيمة الطلب ويقدم تجربة أفضل للعميل.", when: "مفيد جداً عندما يكون لديك فئات متعددة من المنتج: أساسي ومتميز وبريميوم.", example: "عميل في صفحة سماعة بسعر 100 ⃁ → يظهر له سماعة بسعر 180 ⃁ بمزايا أفضل.", boost: "+41٪ في متوسط قيمة الطلب" },
  { id: 4, icon: "💰", title: "زيادة قيمة السلة", subtitle: "رفع المبلغ الإجمالي لتجاوز عتبة معينة", color: "#f59e0b", desc: "يعرض منتجات إضافية مختارة ذكياً لمساعدة العميل على تجاوز عتبة الشحن المجاني أو الخصم. 'أضف 30 ⃁ للحصول على شحن مجاني'.", when: "ممتاز عندما يكون لديك عتبة للشحن المجاني أو خصم على الطلبات الكبيرة.", example: "سلة بقيمة 170 ⃁ → يقترح منتج بـ35 ⃁ لتصل لـ200 وتحصل على شحن مجاني.", boost: "+22٪ من الطلبات تتجاوز عتبة الشحن" },
  { id: 5, icon: "🏷️", title: "إعطاء كود خصم", subtitle: "تحفيز إتمام الشراء بعرض خاص", color: "#ec4899", desc: "يولد الذكاء الاصطناعي كوبوناً مخصصاً في اللحظة المناسبة لإقناع العميل المتردد على إتمام الشراء. الكوبون مؤقت ومحدود.", when: "فعّال جداً عند exit intent أو عندما يقضي العميل وقتاً طويلاً في السلة دون شراء.", example: "عميل في السلة منذ 4 دقائق → يظهر له 'خصم 10٪ لمدة 15 دقيقة فقط'.", boost: "-38٪ في معدل التخلي عن السلة" },
];

const presentations = [
  { icon: "🔗", title: "منتجات ذات صلة", color: "#a855f7", desc: "يحلل الذكاء الاصطناعي ما يتصفحه العميل وسلوكه السابق ويقترح منتجات مرتبطة بالموضوع. الأقوى في التأثير لأنه يعكس اهتمامات العميل الحقيقية.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة البحث"], best: "متاجر الأزياء، الإلكترونيات" },
  { icon: "➕", title: "إضافات (Add-ons)", color: "#06b6d4", desc: "يقترح منتجات تكمل المنتج الأساسي وتضيف قيمة وظيفية له. عرض طبيعي ومنطقي يشعر العميل أنه يحصل على تجربة أكمل.", positions: ["صفحة المنتج", "السلة", "الدفع"], best: "الإلكترونيات، الرياضة، العناية" },
  { icon: "🛒", title: "اشتروا مع بعض (BTAT)", color: "#10b981", desc: "يستند على بيانات تاريخية من آلاف الطلبات ليعرف أي المنتجات يُشترى مجتمعة. 'عملاء اشتروا هذا أيضاً اشتروا...' - اجتماعي وموثوق.", positions: ["صفحة المنتج", "السلة"], best: "الطعام، الأزياء، المنزل" },
  { icon: "🎁", title: "Combo (حزم ذكية)", color: "#f59e0b", desc: "يُجمّع منتجين أو أكثر بسعر حزمة خاص يوفر على العميل ويرفع قيمة طلبه. قوي جداً للمنتجات المتكاملة مثل الروتين الكامل أو الطقم الكامل.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة الفئة"], best: "العناية، الأزياء، الغذاء" },
  { icon: "📊", title: "اشتر أكثر ووفر أكثر", color: "#ec4899", desc: "يعرض جدولاً تصاعدياً للخصم مع ازدياد الكمية. يحفز العميل على الشراء أكثر ليستفيد من الخصم الأعلى. فعّال للمنتجات الاستهلاكية.", positions: ["صفحة المنتج", "السلة", "Popup"], best: "المواد الغذائية، التجميل" },
];

const activities = [
  { num: "1", title: "صفحة المنتج", desc: "الاقتراح يظهر أسفل أو بجانب المنتج الرئيسي. أعلى معدل ظهور - العميل في مرحلة الاهتمام والتفكير.", icon: "📄", avail: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"], tactics: ["منتجات ذات صلة", "Add-ons", "Upsell", "Combo"] },
  { num: "2", title: "صفحة الفئة", desc: "يظهر بين بطاقات المنتجات. يستهدف العميل وهو يتصفح ويقارن - فرصة ذهبية للتوجيه الذكي.", icon: "📁", avail: ["النمو", "الاحترافية", "الأعمال"], tactics: ["منتجات ذات صلة", "Combo", "اشتر أكثر"] },
  { num: "3", title: "صفحة السلة", desc: "آخر فرصة قبل الدفع لإضافة منتجات. العميل جاهز للشراء - الاقتراح هنا يرفع قيمة الطلب بشكل مباشر.", icon: "🛒", avail: ["النمو", "الاحترافية", "الأعمال"], tactics: ["BTAT", "Add-ons", "كوبون", "زيادة القيمة"] },
  { num: "4", title: "صفحة الدفع (Checkout)", desc: "اقتراحات خفيفة الوزن في صفحة الدفع لا تشتت التركيز لكنها تضيف قيمة. تحويل عالي لأن العميل ملتزم بالشراء.", icon: "💳", avail: ["الاحترافية", "الأعمال"], tactics: ["Add-ons صغيرة", "منتج مكمل واحد"] },
  { num: "5", title: "صفحة الشكر (Post-Purchase)", desc: "بعد إتمام الشراء مباشرة. العميل راضٍ ومتحمس - أفضل وقت لعرض منتج تكميلي أو دعوته للشراء مرة أخرى.", icon: "🎉", avail: ["الاحترافية", "الأعمال"], tactics: ["منتج تكميلي", "Upsell للطلب التالي"] },
  { num: "6", title: "نافذة Exit Intent", desc: "تظهر عند محاولة العميل مغادرة المتجر. الفرصة الأخيرة لإقناعه بالبقاء والشراء.", icon: "🚪", avail: ["النمو", "الاحترافية", "الأعمال"], tactics: ["كوبون خصم", "عرض محدود الوقت"] },
  { num: "7", title: "الصفحة الرئيسية", desc: "يرحّب بالعميل العائد باقتراحات مبنية على آخر زيارته. تجربة مخصصة من أول لحظة في المتجر.", icon: "🏠", avail: ["النمو", "الاحترافية", "الأعمال"], tactics: ["منتجات ذات صلة", "Combo", "المشتريات السابقة"] },
  { num: "8", title: "صفحة البحث", desc: "عندما يبحث العميل عن منتج محدد، يظهر له في نتائج البحث توصيات ذكية تكمل بحثه.", icon: "🔍", avail: ["النمو", "الاحترافية", "الأعمال"], tactics: ["منتجات ذات صلة", "بدائل أفضل"] },
  { num: "9", title: "Popup ذكي", desc: "يظهر في الوقت المناسب بناءً على سلوك العميل. قوي لكن يُستخدم بحكمة لتجنب الإزعاج.", icon: "📢", avail: ["الاحترافية", "الأعمال"], tactics: ["عرض محدود", "Combo خاص", "كوبون"] },
];

const usecases = [
  { sector: "الأزياء والموضة", icon: "👗", color: "#a855f7", strategies: ["تجميع الإطقم الكاملة", "عرض الإكسسوارات المكملة", "Upsell للفئة الأعلى", "كوبون للشراء الأول"], result: "+35٪ متوسط الطلب", stores: "+230 متجر" },
  { sector: "الجمال والعناية", icon: "💄", color: "#ec4899", strategies: ["روتين العناية الكامل", "تجميع المنتجات المتكاملة", "Buy 3 وفر 20٪", "عرض نسخة الحجم الكبير"], result: "+32٪ متوسط الطلب", stores: "+140 متجر" },
  { sector: "الغذاء والمشروبات", icon: "🍯", color: "#f59e0b", strategies: ["حزم التوفير الشهرية", "اشتر أكثر ووفر أكثر", "منتجات مكملة للوجبة", "اشتراكات دورية"], result: "+28٪ متوسط الطلب", stores: "+180 متجر" },
  { sector: "الإلكترونيات والتقنية", icon: "💻", color: "#06b6d4", strategies: ["ملحقات الجهاز (Add-ons)", "الحماية والضمان الممتد", "Upsell للموديل الأحدث", "حزمة الإعداد الكامل"], result: "+22٪ متوسط الطلب", stores: "+90 متجر" },
  { sector: "المنزل والديكور", icon: "🏠", color: "#10b981", strategies: ["تجميع مستلزمات الغرفة", "منتجات ذات صلة بالديكور", "Combo للأثاث المتكامل", "خصم الكميات"], result: "+26٪ متوسط الطلب", stores: "+70 متجر" },
  { sector: "الرياضة واللياقة", icon: "🏋️", color: "#4f46e5", strategies: ["حزمة المستلزمات الرياضية", "منتجات التغذية + معدات", "روتين التمرين الكامل", "Upsell للإصدار المتميز"], result: "+30٪ متوسط الطلب", stores: "+60 متجر" },
  { sector: "الكتب والتعليم", icon: "📚", color: "#8b5cf6", strategies: ["سلسلة الكتب المرتبطة", "المستلزمات الدراسية", "Bundle الكورس + الكتاب", "اشتر 3 واحصل على خصم"], result: "+18٪ متوسط الطلب", stores: "+40 متجر" },
  { sector: "التبرعات والخيرية", icon: "🤲", color: "#059669", strategies: ["مشاريع تبرع مكملة", "زيادة مبلغ التبرع", "اشترك تبرعياً شهرياً", "عرض المشاريع ذات الأولوية"], result: "+48٪ متوسط التبرع", stores: "+40 منظمة" },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<"goals" | "presentations" | "activities" | "usecases">("goals");
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
    <SEO
      title="الخصائص التفصيلية — الأهداف والأنشطة وطرق العرض"
      description="اكتشف كل خصائص زيادة بالتفصيل: 5 أهداف، 5 طرق عرض، 9 أنشطة، وحالات استخدام لكل قطاع تجاري. ذكاء اصطناعي يرفع مبيعاتك تلقائياً."
      canonical="/features"
    />
    <SoftwareAppSchema />
    <BreadcrumbSchema items={[{ name: "الرئيسية", url: "/" }, { name: "الخصائص", url: "/features" }]} />
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
        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>الخصائص التفصيلية</div>
        <h1 className="st rv d1" style={{ fontSize: "clamp(38px,5vw,64px)", marginTop: 8 }}>كل خاصية موضحة<br />بالكامل</h1>
        <p className="ssub rv d2" style={{ margin: "0 auto 48px" }}>الأهداف الـ 5، طرق العرض الـ 5، الأنشطة الـ 9، وحالات الاستخدام لكل قطاع - مشروحة بالتفصيل.</p>

        {/* Tabs */}
        <div className="feat-tabs rv d3" style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, backdropFilter: "blur(20px)" }}>
          {[
            { id: "goals" as const, label: "الأهداف الـ 5" },
            { id: "presentations" as const, label: "طرق العرض الـ 5" },
            { id: "activities" as const, label: "الأنشطة الـ 9" },
            { id: "usecases" as const, label: "حسب القطاع" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: activeTab === t.id ? "rgba(124,58,237,.2)" : "transparent", color: activeTab === t.id ? "#fff" : "var(--tm)", fontFamily: "var(--font)", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 500, cursor: "pointer", transition: "all .25s", borderColor: activeTab === t.id ? "rgba(124,58,237,.4)" : "transparent", outline: activeTab === t.id ? "1px solid rgba(124,58,237,.3)" : "none" }}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* GOALS */}
      {activeTab === "goals" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
            {goals.map((g, i) => (
              <div key={g.id} className={`gc rv d${(i%2)+1}`} style={{ padding: 0, overflow: "hidden" }}>
                <div className="shine"/>
                <div className="feat-goals-outer" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto" }}>
                  <div style={{ width: 8, background: g.color, opacity: 0.7 }}/>
                  <div style={{ padding: "32px 36px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                      <div style={{ fontSize: 36, lineHeight: 1 }}>{g.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <h3 style={{ fontSize: 20, fontWeight: 900 }}>{g.title}</h3>
                          <span style={{ padding: "2px 10px", borderRadius: 50, background: `rgba(168,85,247,.1)`, border: `1px solid rgba(168,85,247,.2)`, fontSize: 14, color: g.color, fontWeight: 700 }}>هدف #{g.id}</span>
                        </div>
                        <div style={{ fontSize: 14, color: "var(--td)" }}>{g.subtitle}</div>
                      </div>
                    </div>
                    <div className="feat-goals-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>الوصف</div>
                        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>{g.desc}</p>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>متى تستخدمه؟</div>
                        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>{g.when}</p>
                        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(0,0,0,.25)", borderRadius: 10, fontSize: 14, color: "var(--tm)", lineHeight: 1.6 }}>
                          <span style={{ color: g.color, fontWeight: 700 }}>مثال: </span>{g.example}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>النتيجة المتوقعة</div>
                        <div style={{ padding: "16px 20px", background: `rgba(168,85,247,.08)`, border: `1px solid rgba(168,85,247,.2)`, borderRadius: 12, textAlign: "center" }}>
                          <div style={{ fontSize: 28, fontWeight: 900, color: g.color }}>{g.boost.split(" ")[0]}</div>
                          <div style={{ fontSize: 14, color: "var(--td)", marginTop: 4 }}>{g.boost.substring(g.boost.indexOf(" ") + 1)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRESENTATIONS */}
      {activeTab === "presentations" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div className="feat-presentations-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {presentations.map((p, i) => (
              <div key={p.title} className={`gc rv d${(i%2)+1}`} style={{ padding: "36px 32px" }}>
                <div className="shine"/>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `rgba(168,85,247,.1)`, border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{p.title}</div>
                    <div style={{ fontSize: 14, color: "var(--td)", marginTop: 2 }}>طريقة عرض #{i + 1}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.positions.map(pos => (
                    <span key={pos} style={{ padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,.3)", border: "1px solid var(--b1)", fontSize: 14, color: "var(--td)" }}>{pos}</span>
                  ))}
                </div>
                <div style={{ fontSize: 14, color: p.color, fontWeight: 700 }}>الأنسب لـ: {p.best}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACTIVITIES */}
      {activeTab === "activities" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="feat-activities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
              {activities.map((a, i) => (
                <div key={a.num} className={`gc rv d${(i%3)+1}`} style={{ padding: "28px 24px" }}>
                  <div className="shine"/>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800 }}>{a.title}</div>
                      <div style={{ fontSize: 14, color: "var(--p3)", fontWeight: 700 }}>النشاط {a.num}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7, marginBottom: 14 }}>{a.desc}</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, marginBottom: 6 }}>الأساليب المتاحة:</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {a.tactics.map(t => (
                        <span key={t} style={{ padding: "3px 9px", borderRadius: 50, background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.18)", fontSize: 14, color: "#06b6d4" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, marginBottom: 6 }}>متاح في الباقات:</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {a.avail.map(pkg => (
                        <span key={pkg} style={{ padding: "3px 9px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.18)", fontSize: 14, color: "var(--p3)" }}>{pkg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Journey map */}
            <div className="gc rv" style={{ padding: "36px 40px" }}>
              <div className="shine"/>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>خريطة رحلة العميل</div>
                <div style={{ fontSize: 14, color: "var(--td)", marginTop: 6 }}>كيف يتفاعل زيادة مع العميل في كل مرحلة</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
                {activities.map((a, i) => (
                  <div key={a.num} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(124,58,237,.14)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 8px" }}>{a.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", maxWidth: 70, textAlign: "center", margin: "0 auto" }}>{a.title}</div>
                    </div>
                    {i < activities.length - 1 && <div style={{ width: 30, height: 1, background: "linear-gradient(90deg,rgba(124,58,237,.5),rgba(6,182,212,.5))", flexShrink: 0 }}/>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USE CASES */}
      {activeTab === "usecases" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div className="feat-usecases-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
            {usecases.map((u, i) => (
              <div key={u.sector} className={`gc rv d${(i%2)+1}`} style={{ padding: "32px 28px" }}>
                <div className="shine"/>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 36 }}>{u.icon}</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{u.sector}</div>
                      <div style={{ fontSize: 14, color: "var(--td)", marginTop: 2 }}>{u.stores}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", padding: "10px 16px", background: `rgba(168,85,247,.08)`, border: "1px solid rgba(168,85,247,.2)", borderRadius: 12, flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: u.color }}>{u.result.split(" ")[0]}</div>
                    <div style={{ fontSize: 14, color: "var(--td)", marginTop: 2, whiteSpace: "nowrap" }}>{u.result.substring(u.result.indexOf(" ") + 1)}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 700, marginBottom: 10 }}>أفضل الاستراتيجيات:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {u.strategies.map(s => (
                      <div key={s} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: u.color, flexShrink: 0 }}/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="gc cta-box rv" style={{ padding: "72px 56px" }}>
            <div className="shine"/><div className="cta-glow"/>
            <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, marginBottom: 16, position: "relative", zIndex: 1 }}>جاهز تفعّل كل هذه الخصائص؟</h2>
            <p style={{ color: "var(--tm)", marginBottom: 36, position: "relative", zIndex: 1 }}>الذكاء الاصطناعي يختار الأنسب لعملائك تلقائياً</p>
            <div className="cta-btns">
              <button onClick={() => setPlatformModalOpen(true)} className="cta-btn cb-zid" style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff"/></svg>فعّل الآن</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
