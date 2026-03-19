import { useEffect, useRef, useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import Nav from "../components/Nav";

const storeLogos = [
  "عسل رشوف",
  "الجباره",
  "skinly",
  "سكندز",
  "FABIAN",
  "Nahla Oil",
  "متجر العطور",
  "جمعية القرآن",
  "عسل رشوف",
  "الجباره",
  "skinly",
  "سكندز",
  "FABIAN",
  "Nahla Oil",
  "متجر العطور",
  "جمعية القرآن",
];

const AN = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toA(n: number) {
  return String(Math.floor(n)).replace(/[0-9]/g, (d) => AN[+d]);
}

function GlassCard({
  children,
  className = "",
  style = {},
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--gx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      el.style.setProperty(
        "--gy",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className={`gc${lift ? " gc-lift" : ""} ${className}`}
      style={style}
    >
      <div className="shine" />
      {children}
    </div>
  );
}

function SecTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="stag rv">
      <span className="stag-dot" />
      {children}
    </div>
  );
}

export default function Landing() {
  const [pricingMode, setPricingMode] = useState<"m" | "y">("y");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Custom cursor
  useEffect(() => {
    const cur = document.getElementById("zd-cur");
    const curR = document.getElementById("zd-curR");
    if (!cur || !curR) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx - 5 + "px";
      cur.style.top = my - 5 + "px";
    };
    function loop() {
      rx += (mx - rx - 18) * 0.11;
      ry += (my - ry - 18) * 0.11;
      curR.style.left = rx + "px";
      curR.style.top = ry + "px";
      requestAnimationFrame(loop);
    }
    document.addEventListener("mousemove", onMove);
    loop();
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  const prices = {
    m: { s: 29, g: 290, p: 790 },
    y: { s: 290, g: 2990, p: 7990 },
  };

  const testimonials = [
    {
      stat1: "+٣٢٪",
      l1: "زيادة مبيعات",
      stat2: "+١٨٪",
      l2: "متوسط الطلب",
      text: "تطبيق جبار ساعدني على استهداف العميل داخل المتجر. السعر مو شئ أمام النتيجة. لم أجد أي تطبيق شامل كأداة تسويقية مع تحليلات مفصلة.",
      name: "عسل رشوف",
      role: "متجر عسل طبيعي",
      av: "ع",
      col: "linear-gradient(135deg,#7c3aed,#5b21b6)",
    },
    {
      stat1: "+٤١٪",
      l1: "قيمة الطلب",
      stat2: "10x",
      l2: "عائد الاشتراك",
      text: "فنانين، متعاونين، عبااقرة! حجم المردود لا يقارن بقيمة الاشتراك. اشتركوا وتوكلوا على الله.",
      name: "سكندز",
      role: "متجر أزياء",
      av: "س",
      col: "linear-gradient(135deg,#059669,#047857)",
    },
    {
      stat1: "+٢٨٪",
      l1: "زيادة مبيعات",
      stat2: "٢٤h",
      l2: "وقت التفعيل",
      text: "تطبيق أكثر من رائع - النتائج مدهشة! خسارة اني ما عرفت التطبيق قبل كذا. خدمة العملاء مميزة يساعدونك حتى تحقق مبيعات.",
      name: "الجباره",
      role: "متجر متعدد الأصناف",
      av: "ج",
      col: "linear-gradient(135deg,#06b6d4,#0891b2)",
    },
    {
      stat1: "+٣٥٪",
      l1: "معدل التحويل",
      stat2: "+٢٢٪",
      l2: "إعادة الطلب",
      text: "التطبيق من أكثر التطبيقات فعالية في زيادة السلة. فريق يهتم لتفاصيل التفاصيل ويأخذ باراء العملاء.",
      name: "Nahla Oil",
      role: "متجر زيوت طبيعية",
      av: "ن",
      col: "linear-gradient(135deg,#ec4899,#be185d)",
    },
    {
      stat1: "+٢٥٪",
      l1: "زيادة مبيعات",
      stat2: "⭐⭐⭐⭐⭐",
      l2: "تقييم المنصة",
      text: "رائع وسهل انصح فيه لرفع مبيعات السلة. كل الشكر لخدمة العملاء والفريق كل التوفيق.",
      name: "FABIAN",
      role: "متجر أزياء رجالية",
      av: "ف",
      col: "linear-gradient(135deg,#f59e0b,#d97706)",
    },
    {
      stat1: "+٥٠٪",
      l1: "سلة التبرعات",
      stat2: "+٣٠٪",
      l2: "المتبرعين",
      text: "تطبيق متميز سهّل عملية التبرعات وأتاح فرص إضافية للمساهمة. فريق العمل متعاون جداً ومتفاعل.",
      name: "جمعية القرآن",
      role: "منصة تبرعات",
      av: "ق",
      col: "linear-gradient(135deg,#4f46e5,#4338ca)",
    },
  ];

  const faqs = [
    {
      q: "هل يتطلب مني خبرة تقنية؟",
      a: "لا، بمجرد تفعيل التطبيق الذكاء الاصطناعي يبدأ يعمل لوحده. ما تحتاج تحدد أي حملات أو إعدادات تقنية.",
    },
    {
      q: "كيف يتعلم الذكاء الاصطناعي على عملائي؟",
      a: "يحلل بيانات التصفح، الطلبات السابقة، الموقع الجغرافي، نوع الجهاز، وأوقات الشراء. كل هذا يحدث تلقائياً وبشكل خاص لكل عميل.",
    },
    {
      q: "كم وقت تحتاج حتى أرى نتائج؟",
      a: "معظم التجار يلاحظون فرقاً في أول أسبوع. النتائج تتحسن تدريجياً مع تراكم البيانات.",
    },
    {
      q: "ما الفرق بين زيادة والعروض المخصصة في سلة؟",
      a: "العروض المخصصة في سلة تعمل في حدث واحد فقط. زيادة يعمل في ١٠ أحداث، يدعم ٥ أهداف و٥ طرق عرض، ولديه ذكاء اصطناعي يختار الأنسب تلقائياً مع تقارير تفصيلية.",
    },
    {
      q: "هل هناك ضمان على النتائج؟",
      a: "باقة الأعمال تأتي مع ضمان ذهبي لتحقيق ١٠ أضعاف العائد على الاستثمار. بقية الباقات معها تجربة مجانية وسهولة إلغاء في أي وقت.",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        fontFamily: "var(--font)",
        direction: "rtl",
        color: "var(--t)",
      }}
    >
      {/* CURSOR */}
      <div
        id="zd-cur"
        style={{
          width: 10,
          height: 10,
          background: "var(--p3)",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
          transition: "width .18s,height .18s,background .18s",
          top: -999,
          left: -999,
        }}
      />
      <div
        id="zd-curR"
        style={{
          width: 36,
          height: 36,
          border: "1px solid rgba(168,85,247,.4)",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "all .3s",
          top: -999,
          left: -999,
        }}
      />
      {/* BG */}
      <div className="bg-wrap">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />
        <div className="orb o4" />
        <div className="bg-grid" />
      </div>
      <div className="noise" />
      <ParticleBackground />
      {/* NAV */}
      <Nav />
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-in">
          <div className="hbadge">
            <span className="hbadge-pill">AI مفعّل</span>
            <span className="hbadge-txt">
              ذكاء اصطناعي + تعلم آلي يعمل الآن
            </span>
          </div>
          <h1 className="ht text-[72px]">
            مسوّق داخل متجرك
            <em>بالذكاء الاصطناعي</em>
            <span className="grad pt-[10px] pb-[10px] mt-[10px] mb-[10px]">
              أخبر منك بعميلك
            </span>
          </h1>
          <p className="hero-sub">
            فعّل التطبيق <strong>بضغطة زر واحدة</strong>.. وبيتعلم على عملائك
            تلقائياً ويعطي كل عميل <strong>تجربة مخصصة 100%</strong> حسب منطقته،
            جهازه، مشترياته السابقة، و....
          </p>
          <div className="hero-ctas">
            <a
              href="https://apps.zid.sa/application/1826"
              target="_blank"
              rel="noreferrer"
              className="btn-p"
            >
              فعّل الذكاء الاصطناعي الآن
            </a>
            <a href="#hiw" className="btn-g">
              شوف كيف يعمل
            </a>
          </div>
          <div className="sbar">
            <div className="sbi">
              <div className="sbi-n">+700</div>
              <div className="sbi-l text-[14px]">متجر </div>
            </div>
            <div className="sbi">
              <div className="sbi-n">+20 مليون</div>
              <div className="sbi-l">ريال مبيعات إضافية</div>
            </div>
            <div className="sbi">
              <div className="sbi-n">+200 ألف</div>
              <div className="sbi-l">منتج تم شراؤه</div>
            </div>
            <div className="sbi">
              <div className="sbi-n">+40 مليون</div>
              <div className="sbi-l">ظهور ناجح</div>
            </div>
          </div>
        </div>
      </section>
      {/* LOGOS */}
      <div className="logos-sec">
        <p className="logos-lbl rv">فخورين بثقتهم</p>
        <div className="logos-mask">
          <div className="lt">
            {storeLogos.map((l, i) => (
              <div key={i} className="lc">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* HOW IT WORKS */}
      <section id="hiw">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 56 }}>
            <SecTag>كيف تعمل؟</SecTag>
            <h2 className="st rv d1 text-[48px]">
              ما تحتاج تسوي شي..
              <br />
              فعّل وزيادة يتولى الباقي
            </h2>
            <p className="ssub rv d2">
              التعلم الآلي يبدأ يدرس عملائك من أول لحظة ويتحسن يوم بعد يوم
            </p>
          </div>
          <div className="hiw-grid">
            {[
              {
                step: "الخطوة ١",
                title: "فعّل التطبيق",
                desc: "بضغطة زر واحدة في منصة زد أو سلة. يتفعل مباشرة, مايحتاج خبرة تقنية..",
                chip: "30 ثانية فقط",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect
                      x="9"
                      y="6"
                      width="14"
                      height="20"
                      rx="3"
                      fill="rgba(124,58,237,.14)"
                      stroke="rgba(168,85,247,.45)"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="12"
                      y="10"
                      width="8"
                      height="2"
                      rx="1"
                      fill="rgba(168,85,247,.55)"
                    />
                    <rect
                      x="12"
                      y="14"
                      width="5"
                      height="2"
                      rx="1"
                      fill="rgba(168,85,247,.35)"
                    />
                    <circle
                      cx="21"
                      cy="22"
                      r="6"
                      fill="rgba(16,185,129,.14)"
                      stroke="rgba(16,185,129,.5)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.5 22l1.5 1.5 3-3"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                step: "الخطوة ٢",
                title: "الذكاء الاصطناعي يتعلم",
                desc: "يحلل كل عميل - منطقته، جهازه، مشترياته، وأنماط تصفحه, وأسرار خاصة فينا, ويبدأ مباشرة بدون أي تدخل منك.",
                chip: "تعلم مستمر يومياً",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle
                      cx="16"
                      cy="13"
                      r="8"
                      fill="rgba(124,58,237,.12)"
                      stroke="rgba(168,85,247,.4)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 22 C10 17 13 15 16 15 C19 15 22 17 22 22"
                      fill="rgba(124,58,237,.08)"
                      stroke="rgba(168,85,247,.35)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="13"
                      cy="12"
                      r="1.5"
                      fill="rgba(168,85,247,.7)"
                    />
                    <circle cx="16" cy="12" r="1.5" fill="#a855f7" />
                    <circle
                      cx="19"
                      cy="12"
                      r="1.5"
                      fill="rgba(168,85,247,.7)"
                    />
                    <line
                      x1="8"
                      y1="5"
                      x2="11"
                      y2="8"
                      stroke="rgba(168,85,247,.3)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="3"
                      x2="16"
                      y2="7"
                      stroke="rgba(168,85,247,.3)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <line
                      x1="24"
                      y1="5"
                      x2="21"
                      y2="8"
                      stroke="rgba(168,85,247,.3)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                step: "الخطوة ٣",
                title: "المبيعات ترتفع تلقائياً",
                desc: "كل عميل يحصل على العرض الأنسب له في اللحظة الصح - بتكلفة تسويق صفر ريال.",
                chip: "نتائج من أول يوم",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect
                      x="4"
                      y="20"
                      width="5"
                      height="8"
                      rx="1.5"
                      fill="rgba(168,85,247,.25)"
                      stroke="rgba(168,85,247,.45)"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="13"
                      y="14"
                      width="5"
                      height="14"
                      rx="1.5"
                      fill="rgba(168,85,247,.45)"
                      stroke="rgba(168,85,247,.6)"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="22"
                      y="7"
                      width="5"
                      height="21"
                      rx="1.5"
                      fill="#a855f7"
                      stroke="rgba(168,85,247,.7)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M6.5 18 L15.5 12 L24.5 5"
                      stroke="rgba(196,132,252,.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx="24.5"
                      cy="5"
                      r="2.5"
                      fill="rgba(196,132,252,.4)"
                      stroke="rgba(196,132,252,.6)"
                      strokeWidth="1"
                    />
                  </svg>
                ),
              },
            ].map((c, i) => (
              <GlassCard key={i} lift className={`rv d${i + 1}`}>
                <div className="hiw-p">
                  <div className="step-lbl">{c.step}</div>
                  <div className="hiw-img">{c.icon}</div>
                  <div className="hiw-t">{c.title}</div>
                  <div className="hiw-d">{c.desc}</div>
                  <div className="hiw-chip">✓ {c.chip}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {/* PERSONALIZATION DEMO */}
      <section id="demo">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 56 }}>
            <SecTag>التخصيص الذكي</SecTag>
            <h2 className="st rv d1">
              كل عميل يحصل على
              <br />
              تجربة مصممة له
            </h2>
            <p className="ssub rv d2">
              زيادة يعرف من هو عميلك ويعرض له المنتجات المناسبة
              تلقائياً
            </p>
          </div>
          <div className="demo-grid">
            {/* MALE */}
            <div className="rv d1">
              <div className="demo-card">
                <div className="demo-illo">
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 35%, #1e1245 0%, #0d0a22 55%, #060412 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src="/avatar-male.png" alt="ناصر" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
                  </div>
                  <div className="demo-fade" />
                  <div className="demo-pill">
                    <span className="demo-pill-dot" />
                    AI يحلل سلوكه
                  </div>
                  <div className="demo-shelf">
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(240,240,248,.1)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <ellipse
                            cx="11"
                            cy="14"
                            rx="7"
                            ry="4"
                            fill="rgba(240,240,248,.14)"
                            stroke="rgba(240,240,248,.55)"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M4 14 Q6 7 11 5 Q16 7 18 14"
                            fill="rgba(15,10,25,.5)"
                            stroke="rgba(240,240,248,.2)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <span>حذاء رياضي</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(168,85,247,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="4"
                            y="8"
                            width="14"
                            height="7"
                            rx="2.5"
                            fill="rgba(168,85,247,.2)"
                            stroke="rgba(168,85,247,.65)"
                            strokeWidth="1.2"
                          />
                          <circle
                            cx="8"
                            cy="11.5"
                            r="1.5"
                            fill="rgba(168,85,247,.6)"
                          />
                          <circle
                            cx="14"
                            cy="11.5"
                            r="1.5"
                            fill="rgba(168,85,247,.6)"
                          />
                        </svg>
                      </div>
                      <span>سماعات</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(6,182,212,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="8"
                            y="3"
                            width="6"
                            height="14"
                            rx="2.5"
                            fill="rgba(6,182,212,.18)"
                            stroke="rgba(6,182,212,.65)"
                            strokeWidth="1.2"
                          />
                          <ellipse
                            cx="11"
                            cy="17"
                            rx="3.5"
                            ry="2"
                            fill="rgba(6,182,212,.12)"
                            stroke="rgba(6,182,212,.45)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <span>زجاجة ماء</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(16,185,129,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <ellipse
                            cx="7"
                            cy="13"
                            rx="3.5"
                            ry="3"
                            fill="rgba(16,185,129,.15)"
                            stroke="rgba(16,185,129,.55)"
                            strokeWidth="1.2"
                            transform="rotate(-12 7 13)"
                          />
                          <ellipse
                            cx="15"
                            cy="13"
                            rx="3.5"
                            ry="3"
                            fill="rgba(16,185,129,.15)"
                            stroke="rgba(16,185,129,.55)"
                            strokeWidth="1.2"
                            transform="rotate(12 15 13)"
                          />
                        </svg>
                      </div>
                      <span>دمبل</span>
                    </div>
                  </div>
                </div>
                <div className="demo-info">
                  <div className="demo-top">
                    <div>
                      <div className="demo-name">ناصر</div>
                      <div className="demo-meta">الرياض · آيفون · ٢٨ سنة</div>
                    </div>
                    <div className="demo-chip">٩٢٪</div>
                  </div>
                  <div className="demo-sigs">
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#a855f7",
                          boxShadow: "0 0 6px #a855f7",
                        }}
                      />{" "}
                      يتصفح المستلزمات الرياضية
                    </div>
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#06b6d4",
                          boxShadow: "0 0 6px #06b6d4",
                        }}
                      />{" "}
                      سلته تحوي مشروب بروتين
                    </div>
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#10b981",
                          boxShadow: "0 0 6px #10b981",
                        }}
                      />{" "}
                      اشترى حذاء قبل شهر
                    </div>
                  </div>
                  <div className="demo-sl">المقترحات بالذكاء الاصطناعي</div>
                  <div className="demo-suggs">
                    <div className="demo-sugg">
                      <div
                        className="demo-si"
                        style={{
                          background: "rgba(240,240,248,.06)",
                          border: "1px solid rgba(240,240,248,.12)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <ellipse
                            cx="9"
                            cy="12"
                            rx="5.5"
                            ry="3.5"
                            fill="rgba(240,240,248,.12)"
                            stroke="rgba(240,240,248,.4)"
                            strokeWidth="1"
                          />
                          <path
                            d="M3.5 12 Q5.5 5.5 9 3.5 Q12.5 5.5 14.5 12"
                            fill="rgba(15,10,30,.4)"
                            stroke="rgba(240,240,248,.18)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <div className="demo-sb">
                        <div className="demo-sn">عرض الكولاجين </div>
                        <div className="demo-sw">
                          يكمل مشروب البروتين في سلتك
                        </div>
                      </div>
                      <div className="demo-sp">٣٤٩ ر.س</div>
                    </div>
                    <div className="demo-sugg">
                      <div
                        className="demo-si"
                        style={{
                          background: "rgba(168,85,247,.07)",
                          border: "1px solid rgba(168,85,247,.15)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="7"
                            width="12"
                            height="6"
                            rx="2"
                            fill="rgba(168,85,247,.15)"
                            stroke="rgba(168,85,247,.5)"
                            strokeWidth="1"
                          />
                          <circle
                            cx="6.5"
                            cy="10"
                            r="1.2"
                            fill="rgba(168,85,247,.5)"
                          />
                          <circle
                            cx="11.5"
                            cy="10"
                            r="1.2"
                            fill="rgba(168,85,247,.5)"
                          />
                        </svg>
                      </div>
                      <div className="demo-sb">
                        <div className="demo-sn">سماعات JBL Reflect</div>
                        <div className="demo-sw">
                          ٧٨٪ يشترونها مع نفس الحذاء
                        </div>
                      </div>
                      <div className="demo-sp">٢١٩ ر.س</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEMALE */}
            <div className="rv d2">
              <div className="demo-card">
                <div className="demo-illo">
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 35%, #1f0a32 0%, #0f0818 55%, #060410 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src="/avatar-female.png" alt="نوره" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
                  </div>
                  <div className="demo-fade" />
                  <div className="demo-pill">
                    <span className="demo-pill-dot" />
                    AI يحلل سلوكها
                  </div>
                  <div className="demo-shelf">
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(236,72,153,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="6"
                            width="16"
                            height="11"
                            rx="2.5"
                            fill="rgba(236,72,153,.15)"
                            stroke="rgba(236,72,153,.6)"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="5"
                            y="8"
                            width="4"
                            height="3"
                            rx="1"
                            fill="rgba(255,140,170,.3)"
                          />
                          <rect
                            x="10.5"
                            y="8"
                            width="4"
                            height="3"
                            rx="1"
                            fill="rgba(200,70,120,.3)"
                          />
                          <rect
                            x="5"
                            y="13"
                            width="9"
                            height="2"
                            rx="1"
                            fill="rgba(236,72,153,.25)"
                          />
                        </svg>
                      </div>
                      <span>باليت مكياج</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(245,158,11,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="9"
                            y="3"
                            width="4"
                            height="13"
                            rx="2"
                            fill="rgba(245,158,11,.18)"
                            stroke="rgba(245,158,11,.65)"
                            strokeWidth="1.2"
                          />
                          <ellipse
                            cx="11"
                            cy="16.5"
                            rx="3.5"
                            ry="2"
                            fill="rgba(245,158,11,.12)"
                            stroke="rgba(245,158,11,.45)"
                            strokeWidth="1"
                          />
                          <rect
                            x="9.5"
                            y="1.5"
                            width="3"
                            height="2.5"
                            rx=".8"
                            fill="rgba(245,158,11,.3)"
                          />
                        </svg>
                      </div>
                      <span>عطر</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(168,85,247,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="6"
                            y="4"
                            width="10"
                            height="12"
                            rx="2.5"
                            fill="rgba(168,85,247,.15)"
                            stroke="rgba(168,85,247,.6)"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="8"
                            y="6"
                            width="6"
                            height="2"
                            rx="1"
                            fill="rgba(168,85,247,.4)"
                          />
                          <ellipse
                            cx="11"
                            cy="17"
                            rx="3.5"
                            ry="2"
                            fill="rgba(168,85,247,.1)"
                            stroke="rgba(168,85,247,.35)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <span>كريم</span>
                    </div>
                    <div className="demo-prod">
                      <div
                        className="demo-ico"
                        style={{ background: "rgba(6,182,212,.16)" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M5 7 Q5 3 11 3 Q17 3 17 7 L16.5 16 Q16.5 18 11 18 Q5.5 18 5.5 16Z"
                            fill="rgba(6,182,212,.12)"
                            stroke="rgba(6,182,212,.6)"
                            strokeWidth="1.2"
                          />
                          <line
                            x1="7"
                            y1="9"
                            x2="15"
                            y2="9"
                            stroke="rgba(6,182,212,.3)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <span>مرطب</span>
                    </div>
                  </div>
                </div>
                <div className="demo-info">
                  <div className="demo-top">
                    <div>
                      <div className="demo-name">نوره</div>
                      <div className="demo-meta">جدة · سامسونج · ٢٤ سنة</div>
                    </div>
                    <div
                      className="demo-chip"
                      style={{
                        background: "rgba(236,72,153,.12)",
                        border: "1px solid rgba(236,72,153,.28)",
                        color: "#f9a8d4",
                      }}
                    >
                      ٩٦٪
                    </div>
                  </div>
                  <div className="demo-sigs">
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#ec4899",
                          boxShadow: "0 0 6px #ec4899",
                        }}
                      />{" "}
                      تتصفح منتجات التجميل
                    </div>
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#a855f7",
                          boxShadow: "0 0 6px #a855f7",
                        }}
                      />{" "}
                      اشترت عطراً الأسبوع الماضي
                    </div>
                    <div className="demo-sig">
                      <i
                        style={{
                          background: "#f59e0b",
                          boxShadow: "0 0 6px #f59e0b",
                        }}
                      />{" "}
                      سلتها تحوي كريم مرطب
                    </div>
                  </div>
                  <div className="demo-sl">المقترحات بالذكاء الاصطناعي</div>
                  <div className="demo-suggs">
                    <div className="demo-sugg">
                      <div
                        className="demo-si"
                        style={{
                          background: "rgba(236,72,153,.07)",
                          border: "1px solid rgba(236,72,153,.15)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="5"
                            width="14"
                            height="9"
                            rx="2"
                            fill="rgba(236,72,153,.12)"
                            stroke="rgba(236,72,153,.45)"
                            strokeWidth="1"
                          />
                          <rect
                            x="4"
                            y="7"
                            width="3"
                            height="2"
                            rx=".6"
                            fill="rgba(255,130,160,.3)"
                          />
                          <rect
                            x="8"
                            y="7"
                            width="3"
                            height="2"
                            rx=".6"
                            fill="rgba(200,70,120,.3)"
                          />
                        </svg>
                      </div>
                      <div className="demo-sb">
                        <div className="demo-sn">باليت مكياج </div>
                        <div className="demo-sw">يكمل العطر الذي اشترته</div>
                      </div>
                      <div className="demo-sp">٢٨٩ ر.س</div>
                    </div>
                    <div className="demo-sugg">
                      <div
                        className="demo-si"
                        style={{
                          background: "rgba(168,85,247,.07)",
                          border: "1px solid rgba(168,85,247,.15)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <rect
                            x="5"
                            y="3"
                            width="8"
                            height="11"
                            rx="2"
                            fill="rgba(168,85,247,.12)"
                            stroke="rgba(168,85,247,.4)"
                            strokeWidth="1"
                          />
                          <ellipse
                            cx="9"
                            cy="14.5"
                            rx="3"
                            ry="1.5"
                            fill="rgba(168,85,247,.08)"
                            stroke="rgba(168,85,247,.3)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <div className="demo-sb">
                        <div className="demo-sn">كريم يوسرين مرطب</div>
                        <div className="demo-sw">مقترن مع كريمك في السلة</div>
                      </div>
                      <div className="demo-sp">٤٤٩ ر.س</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* GOALS + PRESENTATIONS */}
      <section id="gp">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 56 }}>
            <SecTag>الأهداف وطرق العرض</SecTag>
            <h2 className="st rv d1">
              زيادة يختار
              <br />
              الأنسب لكل عميل تلقائياً
            </h2>
            <p className="ssub rv d2">يحدد الأهداف وطرق العرض المناسبة ويعرضها للعميل مباشرة</p>
          </div>
          <div className="gp-grid">
            <GlassCard className="rv d1">
              <div className="gp-card">
                <div className="gp-hd">
                  <div className="gp-ico gp-ico-p">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle
                        cx="13"
                        cy="13"
                        r="9"
                        stroke="rgba(168,85,247,.45)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="13"
                        cy="13"
                        r="5"
                        stroke="rgba(168,85,247,.65)"
                        strokeWidth="1.5"
                      />
                      <circle cx="13" cy="13" r="2" fill="#a855f7" />
                      <line
                        x1="13"
                        y1="2"
                        x2="13"
                        y2="6"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="13"
                        y1="20"
                        x2="13"
                        y2="24"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="2"
                        y1="13"
                        x2="6"
                        y2="13"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="20"
                        y1="13"
                        x2="24"
                        y2="13"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="gp-title">الأهداف</div>
                    <div className="gp-sub">ماذا نحقق من كل عميل؟</div>
                  </div>
                </div>
                <div className="gp-items">
                  {[
                    [
                      "إضافة المزيد من المنتجات",
                      "زيادة عدد المنتجات في كل طلب",
                    ],
                    ["عرض الكميات ", "لشراء كميات أكبر من نفس المنتج"],
                    ["استبدال المنتج", "لعرض منتج بديل أفضل أو أعلى قيمة"],
                    ["الوصول للشحن المجاني", "عند إضافة المنتجات يصل العميل للشحن المجاني"],
                    ["كود خصم", "إظهار أكواد خصم للعميل"],
                  ].map(([t, s]) => (
                    <div key={t} className="gp-row">
                      <div className="gdot gdot-p" />
                      <div>
                        <div className="gp-row-t">{t}</div>
                        <div className="gp-row-s">{s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
            <GlassCard className="rv d2">
              <div className="gp-card">
                <div className="gp-hd">
                  <div className="gp-ico gp-ico-c">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="20"
                        height="16"
                        rx="3"
                        fill="rgba(6,182,212,.1)"
                        stroke="rgba(6,182,212,.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="6"
                        y="9"
                        width="6"
                        height="8"
                        rx="1.5"
                        fill="rgba(6,182,212,.2)"
                        stroke="rgba(6,182,212,.35)"
                        strokeWidth="1"
                      />
                      <rect
                        x="14"
                        y="9"
                        width="6"
                        height="3.5"
                        rx="1.5"
                        fill="rgba(6,182,212,.15)"
                        stroke="rgba(6,182,212,.3)"
                        strokeWidth="1"
                      />
                      <rect
                        x="14"
                        y="14.5"
                        width="6"
                        height="2.5"
                        rx="1"
                        fill="rgba(6,182,212,.2)"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="gp-title">طرق العرض</div>
                    <div className="gp-sub">كيف يُعرض المنتج على العميل؟</div>
                  </div>
                </div>
                <div className="gp-items">
                  {[
                    ["منتجات ذات صلة", "إظهار زر الإضافة لكل منتج"],
                    ["إضافات (Add-ons)", "إظهار طريقة الاختبار المتعدد"],
                    ["الشراء معاً", "تجميع المنتجات بطريقة الشراء معاً"],
                    ["عروض الحزم", "لشراء أكثر من منتج معاً بسعر مخفض"],
                    ["اشتر أكثر ووفر أكثر", "عروض الكميات لشراء كميات أكبر من نفس المنتج"],
                  ].map(([t, s]) => (
                    <div key={t} className="gp-row">
                      <div className="gdot gdot-c" />
                      <div>
                        <div className="gp-row-t">{t}</div>
                        <div className="gp-row-s">{s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
            <GlassCard
              className="gp-banner rv"
              style={{ gridColumn: "span 2" }}
            >
              <div className="gp-banner-ico">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="20"
                    height="20"
                    rx="5"
                    fill="rgba(124,58,237,.15)"
                    stroke="rgba(168,85,247,.45)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="2"
                    fill="rgba(168,85,247,.6)"
                  />
                  <circle
                    cx="19.5"
                    cy="10.5"
                    r="2"
                    fill="rgba(168,85,247,.6)"
                  />
                  <path
                    d="M10 18 Q15 22 20 18"
                    stroke="#a855f7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <line
                    x1="15"
                    y1="1"
                    x2="15"
                    y2="5"
                    stroke="rgba(168,85,247,.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15"
                    y1="25"
                    x2="15"
                    y2="29"
                    stroke="rgba(168,85,247,.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="1"
                    y1="15"
                    x2="5"
                    y2="15"
                    stroke="rgba(168,85,247,.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="25"
                    y1="15"
                    x2="29"
                    y2="15"
                    stroke="rgba(168,85,247,.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <div className="gp-banner-t">
                  زيادة يجمع كل شيء تلقائياً
                </div>
                <div className="gp-banner-d">
                  ما تحتاج تختار الهدف أو الطريقة يدوياً. زيادة بيحلل كل عميل
                  ويختار الهدف المناسب + طريقة العرض الأنسب، بدون أي
                  تدخل منك، ويتحسن مع الوقت تلقائياً.
                </div>
              </div>
            </GlassCard>
            <GlassCard
              className="gp-banner rv d2"
              style={{ gridColumn: "span 2" }}
            >
              <div className="gp-banner-ico">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="20"
                    height="20"
                    rx="5"
                    fill="rgba(6,182,212,.1)"
                    stroke="rgba(6,182,212,.4)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="10"
                    y1="15"
                    x2="20"
                    y2="15"
                    stroke="rgba(6,182,212,.7)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="10"
                    y1="11"
                    x2="20"
                    y2="11"
                    stroke="rgba(6,182,212,.4)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="10"
                    y1="19"
                    x2="16"
                    y2="19"
                    stroke="rgba(6,182,212,.4)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="22"
                    cy="19"
                    r="3"
                    fill="rgba(6,182,212,.15)"
                    stroke="rgba(6,182,212,.6)"
                    strokeWidth="1.3"
                  />
                  <line
                    x1="22"
                    y1="17.5"
                    x2="22"
                    y2="19"
                    stroke="rgba(6,182,212,.8)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="22" cy="19.8" r=".5" fill="rgba(6,182,212,.9)" />
                </svg>
              </div>
              <div>
                <div className="gp-banner-t">
                  أو تحكّم يدوياً متى تريد
                </div>
                <div className="gp-banner-d">
                  زيادة يشتغل تلقائياً بالكامل، لكن لو حبيت تتدخل فالتحكم بيدك. تقدر تحدد الاقتراحات يدوياً، تختار المنتجات، وتضبط طريقة العرض لكل حالة — التلقائي والتحكم اليدوي يعملان جنباً إلى جنب.
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
      {/* BEFORE / AFTER */}
      <section id="why">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 56 }}>
            <SecTag>ليش زيادة؟</SecTag>
            <h2 className="st rv d1">
              الفرق يظهر
              <br />
              من أول طلب
            </h2>
            <p className="ssub rv d2">قبل وبعد تفعيل زيادة</p>
          </div>
          <div className="ba-grid">
            <GlassCard className="ba-card rv d1">
              <div className="ba-lbl ba-lbl-b text-[16px]">قبل زيادة</div>
              <div className="ba-list">
                {[
                  "عميل يشتري منتج واحد ويروح",
                  "لا اقتراحات ولا تخصيص لأي عميل",
                  "خسارة فرص بيع في كل طلب",
                  "المنتجات الرهيبة ما تتحرك بسرعة",
                  "تكلفة تسويق عالية لكل بيع إضافي",
                ].map((t) => (
                  <div key={t} className="ba-row ba-row-b">
                    {t}
                  </div>
                ))}
              </div>
              <div className="ba-foot ba-foot-b">متوسط قيمة الطلب: ثابت</div>
            </GlassCard>
            <div className="ba-arrow-wrap rv d2">
              <div className="ba-arrow-circle">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M4 11H18M12 5L18 11L12 17"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <GlassCard
              className="ba-card rv d3"
              style={{
                background: "rgba(88,28,220,.07)",
                borderColor: "rgba(124,58,237,.2)",
              }}
            >
              <div className="ba-lbl ba-lbl-a text-[16px]">بعد زيادة </div>
              <div className="ba-list">
                {[
                  "كل عميل يشتري أكثر - تجربة مخصصة 100%",
                  "AI يختار العرض الأنسب لكل شخص تلقائياً",
                  "كل طلب يحقق أقصى قيمة ممكنة",
                  "حركة المخزون تتسارع بدون جهد",
                  "تكلفة تسويق صفر ريال على البيع الإضافي",
                ].map((t) => (
                  <div key={t} className="ba-row ba-row-a">
                    {t}
                  </div>
                ))}
              </div>
              <div className="ba-foot ba-foot-a">
                متوسط قيمة الطلب: <span style={{ fontSize: 24 }}>+٣٥٪</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 56 }}>
            <SecTag>آراء تجارنا</SecTag>
            <h2 className="st rv d1">
              أرقام حقيقية
              <br />
              من تجار حقيقيين
            </h2>
            <p className="ssub rv d2">
              نتائج موثقة من متاجر تستخدم زيادة يومياً
            </p>
          </div>
          <div className="test-grid">
            {testimonials.map((t, i) => (
              <GlassCard key={i} lift className={`tc-card rv d${(i % 3) + 1}`}>
                <div className="tc-stars">★★★★★</div>
                <div className="tc-stats">
                  <div>
                    <div className="ts-n">{t.stat1}</div>
                    <div className="ts-l">{t.l1}</div>
                  </div>
                  <div>
                    <div className="ts-n">{t.stat2}</div>
                    <div className="ts-l">{t.l2}</div>
                  </div>
                </div>
                <div className="tc-text">{t.text}</div>
                <div className="tc-author">
                  <div className="tc-av" style={{ background: t.col }}>
                    {t.av}
                  </div>
                  <div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-role">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section id="pricing">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 24 }}>
            <SecTag>الأسعار</SecTag>
            <h2 className="st rv d1">استثمار مسترد</h2>
            <p className="ssub rv d2">
              باقات مصممة حسب حجم متجرك - شاملة الضريبة
            </p>
          </div>
          <div
            style={{ textAlign: "center", marginBottom: 48 }}
            className="rv d2"
          >
            <div className="ptog">
              <button
                className={`ptb${pricingMode === "m" ? " on" : ""}`}
                onClick={() => setPricingMode("m")}
              >
                شهري
              </button>
              <button
                className={`ptb${pricingMode === "y" ? " on" : ""}`}
                onClick={() => setPricingMode("y")}
              >
                سنوي<span className="save-pill">٣٠٪</span>
              </button>
            </div>
          </div>
          <div className="pg">
            {[
              {
                name: "الانطلاقة",
                desc: "للمبتدئين والراغبين بالتجربة",
                price: prices[pricingMode].s,
                feat: false,
                badge: null,
                list: [
                  "ذكاء اصطناعي أساسي",
                  "اقتراحات لامحدودة",
                  "مبيعات لامحدودة",
                  "مزامنة تلقائية للمنتجات",
                  "اقتراح في صفحة المنتج",
                  "تحليلات عامة",
                ],
                cta: "اشترك الآن",
                fill: false,
              },
              {
                name: "النمو",
                desc: "للتجار الأفراد",
                price: prices[pricingMode].g,
                feat: true,
                badge: "الأكثر طلباً",
                list: [
                  "ذكاء اصطناعي متقدم",
                  "كل مزايا الانطلاقة",
                  "عروض الكوبونات",
                  "اقتراح في ٦ نقاط من الرحلة",
                  "تحليلات مفصلة للمنتج",
                  "إضافة فريق عمل ٢",
                ],
                cta: "اشترك الآن",
                fill: true,
              },
              {
                name: "الاحترافية",
                desc: "للشركات والمؤسسات",
                price: prices[pricingMode].p,
                feat: false,
                badge: null,
                list: [
                  "ذكاء اصطناعي كامل",
                  "كل مزايا النمو",
                  "اقتراح في ١٠ نقاط من الرحلة",
                  "اقتراح في صفحة الدفع وبعده",
                  "دعم الثيمات الخاصة",
                  "فريق عمل لامحدود",
                ],
                cta: "اشترك الآن",
                fill: false,
              },
              {
                name: "الأعمال",
                desc: "للمنشآت الكبيرة",
                price: null,
                feat: false,
                badge: null,
                list: [
                  "كل مزايا الاحترافية",
                  "مدير نجاح يدير حسابك",
                  "مراجعة شهرية استراتيجية",
                  "دعم تقني مخصص ٢٤/٧",
                  "ضمان ذهبي ١٠x عائد الاستثمار",
                ],
                cta: "تواصل معنا",
                fill: false,
              },
            ].map((p, i) => (
              <GlassCard
                key={i}
                className={`pc rv d${i + 1}${p.feat ? " feat" : ""}`}
              >
                {p.badge && <div className="pc-badge">{p.badge}</div>}
                <div className="p-name">{p.name}</div>
                <div className="p-desc">{p.desc}</div>
                <div className="p-price">
                  {p.price != null ? (
                    <>
                      <span className="p-num">{toA(p.price)}</span>
                      <span className="p-cur">ر.س</span>
                      <span className="p-per">
                        / {pricingMode === "y" ? "سنة" : "شهر"}
                      </span>
                    </>
                  ) : (
                    <span
                      style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}
                    >
                      مخصص
                    </span>
                  )}
                </div>
                <hr className="p-hr" />
                <ul className="p-list">
                  {p.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <a
                  href={
                    p.cta === "تواصل معنا"
                      ? "#"
                      : "https://apps.zid.sa/application/1826"
                  }
                  target={p.cta === "تواصل معنا" ? undefined : "_blank"}
                  rel="noreferrer"
                  className={`pbtn ${p.fill ? "pbtn-fill" : "pbtn-ghost"}`}
                >
                  {p.cta}
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {/* HELP CENTER */}
      <section id="help">
        <div className="wrap">
          <SecTag>مركز المساعدة</SecTag>
          <h2 className="st rv d1" style={{ marginBottom: 48 }}>
            كيف نقدر نساعدك؟
          </h2>
          <div className="hc-wrap">
            <GlassCard className="hc-left rv">
              <h3>نحن هنا لك</h3>
              <p>
                فريق زيادة يدعمك من أول يوم حتى تحقق نتائج حقيقية. ما تمشي وحدك.
              </p>
              <div className="hc-btns">
                <a
                  href="https://api.whatsapp.com/send/?phone=966510131856"
                  target="_blank"
                  rel="noreferrer"
                  className="hcb hcb-wa"
                >
                  <div className="hcb-ico hcb-wa">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2C5.6 2 2 5.6 2 10C2 11.4 2.4 12.8 3 14L2 18L6 17C7.2 17.6 8.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM13.5 12.5C13.3 13 12.5 13.5 12 13.5C11.3 13.5 10.8 13.3 8.5 11.5C6.5 9.7 6 8.7 6 8C6 7.5 6.2 7 6.7 6.5C7 6.2 7.3 6 7.7 6C8 6 8.3 6.5 8.7 7.3C9 7.8 9.3 8.5 9.3 8.8C9.3 9 9 9.3 8.8 9.5C8.7 9.7 8.5 9.8 8.7 10.2C9 10.7 9.5 11.3 10 11.8C10.5 12.3 11 12.7 11.5 12.8C11.8 13 12 12.8 12.3 12.5C12.5 12.2 12.8 12 13 12C13.3 12 14 12.8 13.5 12.5Z"
                        fill="rgba(37,211,102,0.6)"
                      />
                    </svg>
                  </div>
                  <div>
                    <div>تواصل عبر واتساب</div>
                    <div className="hcb-sub">رد خلال ساعة</div>
                  </div>
                </a>
                <a
                  href="https://calendar.app.google/pjtPBzs9TUPipUEF6"
                  target="_blank"
                  rel="noreferrer"
                  className="hcb hcb-cal"
                >
                  <div className="hcb-ico hcb-cal">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="3"
                        y="4"
                        width="14"
                        height="13"
                        rx="2"
                        fill="rgba(6,182,212,.12)"
                        stroke="rgba(6,182,212,.4)"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="3"
                        y1="8"
                        x2="17"
                        y2="8"
                        stroke="rgba(6,182,212,.35)"
                        strokeWidth="1"
                      />
                      <line
                        x1="7"
                        y1="2"
                        x2="7"
                        y2="6"
                        stroke="rgba(6,182,212,.5)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="13"
                        y1="2"
                        x2="13"
                        y2="6"
                        stroke="rgba(6,182,212,.5)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="6"
                        y="10"
                        width="3"
                        height="2.5"
                        rx=".5"
                        fill="rgba(6,182,212,.3)"
                      />
                      <rect
                        x="11"
                        y="10"
                        width="3"
                        height="2.5"
                        rx=".5"
                        fill="rgba(6,182,212,.3)"
                      />
                    </svg>
                  </div>
                  <div>
                    <div>احجز اجتماع</div>
                    <div className="hcb-sub">جلسة ٣٠ دقيقة مجانية</div>
                  </div>
                </a>
                <a href="#" className="hcb hcb-doc">
                  <div className="hcb-ico hcb-doc">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 3h6v14H4z"
                        fill="rgba(168,85,247,.12)"
                        stroke="rgba(168,85,247,.35)"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 3h6v14h-6z"
                        fill="rgba(168,85,247,.08)"
                        stroke="rgba(168,85,247,.3)"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="10"
                        y1="3"
                        x2="10"
                        y2="17"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <div>
                    <div>مركز التوثيق</div>
                    <div className="hcb-sub">دليل خطوة بخطوة</div>
                  </div>
                </a>
              </div>
            </GlassCard>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div key={i} className={`fi rv d${(i % 2) + 1}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      background:
                        openFaq === i ? "rgba(124,58,237,.06)" : "var(--s1)",
                      border: `1px solid ${openFaq === i ? "rgba(124,58,237,.3)" : "var(--b1)"}`,
                      borderRadius: openFaq === i ? "14px 14px 0 0" : "14px",
                    }}
                  >
                    {f.q}
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "var(--s3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        fontWeight: 300,
                        flexShrink: 0,
                        transform: openFaq === i ? "rotate(45deg)" : "none",
                        transition:
                          "transform .35s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? 400 : 0,
                      overflow: "hidden",
                      background: "rgba(124,58,237,.04)",
                      border:
                        openFaq === i
                          ? "1px solid rgba(124,58,237,.15)"
                          : "none",
                      borderTop: "none",
                      borderRadius: "0 0 14px 14px",
                      fontSize: 14,
                      color: "var(--tm)",
                      lineHeight: 1.8,
                      padding: openFaq === i ? "18px 22px" : 0,
                      transition: "max-height .38s ease,padding .25s",
                    }}
                  >
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="cta-sec">
        <div className="wrap">
          <GlassCard className="cta-box rv">
            <div className="cta-glow" />
            <h2>
              جاهز ترفع
              <br />
              مبيعاتك؟
            </h2>
            <p>
              تفعيل في دقيقتين · الذكاء الاصطناعي يبدأ يتعلم فوراً · ضمان
              استرداد
            </p>
            <div className="cta-btns">
              <a
                href="https://apps.zid.sa/application/1826"
                target="_blank"
                rel="noreferrer"
                className="cta-btn cb-zid"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
                </svg>
                منصة زد - فعّل الآن
              </a>
              <a
                href="https://apps.salla.sa/ar/app/1099604538"
                target="_blank"
                rel="noreferrer"
                className="cta-btn cb-salla"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="12"
                    height="12"
                    rx="3"
                    fill="rgba(255,255,255,.3)"
                  />
                  <path
                    d="M6 9h6M9 6v6"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                منصة سلة - فعّل الآن
              </a>
            </div>
            <div className="cta-note">
              +٧٠٠ متجر سبقوك · +١٠ مليون ريال مبيعات إضافية
            </div>
          </GlassCard>
        </div>
      </section>
      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-logo">
                <div className="ft-lm">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
                  </svg>
                </div>
                <span className="ft-lt">زيادة</span>
              </div>
              <p className="ft-desc">
                بيّاع شاطر بالذكاء الاصطناعي يرفع حجم الطلبات في متجرك تلقائياً.
              </p>
              <div className="ft-soc">
                <a
                  href="https://twitter.com/ZiadahApp"
                  target="_blank"
                  rel="noreferrer"
                  className="ftsi"
                >
                  𝕏
                </a>
                <a href="#" className="ftsi">
                  ig
                </a>
                <a
                  href="https://linkedin.com/company/ziadahapp"
                  target="_blank"
                  rel="noreferrer"
                  className="ftsi"
                >
                  in
                </a>
              </div>
            </div>
            <div className="ft-col">
              <h4>المنتج</h4>
              <a href="#hiw">كيف تعمل؟</a>
              <a href="#gp">الأهداف والعرض</a>
              <a href="#why">ليش زيادة؟</a>
              <a href="#pricing">الأسعار</a>
            </div>
            <div className="ft-col">
              <h4>المنصات</h4>
              <a
                href="https://apps.zid.sa/application/1826"
                target="_blank"
                rel="noreferrer"
              >
                منصة زد
              </a>
              <a
                href="https://apps.salla.sa/ar/app/1099604538"
                target="_blank"
                rel="noreferrer"
              >
                منصة سلة
              </a>
              <a
                href="https://web.ziadah.app/"
                target="_blank"
                rel="noreferrer"
              >
                لوحة التحكم - زد
              </a>
              <a
                href="https://dashboard.ziadah.app/"
                target="_blank"
                rel="noreferrer"
              >
                لوحة التحكم - سلة
              </a>
            </div>
            <div className="ft-col">
              <h4>تواصل معنا</h4>
              <a
                href="https://api.whatsapp.com/send/?phone=966510131856"
                target="_blank"
                rel="noreferrer"
              >
                واتساب
              </a>
              <a
                href="https://calendar.app.google/pjtPBzs9TUPipUEF6"
                target="_blank"
                rel="noreferrer"
              >
                احجز اجتماع
              </a>
              <a href="#testimonials">قصص النجاح</a>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-copy">
              © ٢٠٢٥ Ziadah. جميع الحقوق محفوظة. شاملة الضريبة.
            </div>
            <div className="ft-links">
              <a href="#">سياسة الخصوصية</a>
              <a href="#">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
