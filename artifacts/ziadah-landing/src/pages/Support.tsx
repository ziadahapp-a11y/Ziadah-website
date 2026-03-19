import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";
import { categories, videoLibrary, searchArticles } from "../data/support-data";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";

export default function Support() {
  const [activeCategory, setActiveCategory] = useState("start");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }); },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeCat = categories.find(c => c.id === activeCategory)!;
  const searchResults = searchArticles(search);

  const quickLinks = [
    { label: "التحدث مع الدعم", href: "https://api.whatsapp.com/send/?phone=966510131856", icon: "💬", desc: "رد خلال ساعة", ext: true },
    { label: "احجز اجتماعاً", href: "https://calendar.app.google/pjtPBzs9TUPipUEF6", icon: "📅", desc: "جلسة 30 دقيقة", ext: true },
    { label: "لوحة تحكم زد", href: "https://web.ziadah.app/", icon: "🔗", desc: "ادخل مباشرة", ext: true },
    { label: "لوحة تحكم سلة", href: "https://dashboard.ziadah.app/", icon: "🔗", desc: "ادخل مباشرة", ext: true },
  ];

  return (
    <>
    <SEO
      title="مركز الدعم والمساعدة — كل ما تحتاجه عن زيادة"
      description="مقالات شاملة ومفصلة لمساعدتك في كل خطوة مع زيادة. من التثبيت والإعداد إلى تحليل النتائج وتحسين الحملات. فريق الدعم متاح للرد خلال ساعة."
      canonical="/support"
    />
    <BreadcrumbSchema items={[{ name: "الرئيسية", url: "/" }, { name: "الدعم", url: "/support" }]} />
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 130, paddingBottom: 60, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", width: 900, height: 600, background: "radial-gradient(ellipse,rgba(124,58,237,.18) 0%,rgba(124,58,237,.05) 45%,transparent 70%)", top: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}/>

        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>مركز الدعم والمساعدة</div>
        <h1 className="rv d1" style={{ fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.1, marginTop: 10, marginBottom: 16 }}>
          كيف نقدر نساعدك؟
        </h1>
        <p className="rv d2" style={{ fontSize: 17, color: "var(--tm)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
          مقالات شاملة ومفصّلة لمساعدتك في كل خطوة
        </p>

        {/* Search */}
        <div className="rv d3" style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث في المقالات... مثال: كيف أفعّل، لوحة التحليلات، الكوبونات"
            style={{ width: "100%", padding: "16px 54px 16px 52px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 50, color: "#fff", fontFamily: "var(--font)", fontSize: 15, outline: "none", backdropFilter: "blur(20px)", transition: "border .25s, box-shadow .25s" }}
            onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,.55)"; e.target.style.boxShadow = "0 0 0 4px rgba(124,58,237,.08)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.12)"; e.target.style.boxShadow = "none"; }}
          />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="8" cy="8" r="5.5" stroke="rgba(255,255,255,.3)" strokeWidth="1.4"/>
            <line x1="12" y1="12" x2="16" y2="16" stroke="rgba(255,255,255,.3)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.08)", border: "none", color: "var(--td)", width: 24, height: 24, borderRadius: 50, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "background .2s" }}>
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {search.trim() && (
          <div style={{ maxWidth: 580, margin: "12px auto 0", background: "rgba(6,4,18,.98)", border: "1px solid var(--b2)", borderRadius: 18, padding: "8px 8px", textAlign: "right", backdropFilter: "blur(32px)", boxShadow: "0 24px 60px rgba(0,0,0,.6)" }}>
            {searchResults.length > 0 ? (
              <>
                <div style={{ padding: "6px 14px 8px", fontSize: 11, fontWeight: 700, color: "var(--td)", textTransform: "uppercase", letterSpacing: 1 }}>
                  {searchResults.length} نتيجة
                </div>
                {searchResults.map((a, i) => (
                  <div key={i}
                    onClick={() => { navigateTo(`/support/article/${a.id}`); setSearch(""); }}
                    style={{ padding: "12px 14px", borderRadius: 12, cursor: "pointer", transition: "background .2s", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ flex: 1, textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: "var(--td)", marginTop: 3 }}>{a.categoryLabel} · {a.time} قراءة</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 4, transform: "rotate(180deg)" }}>
                      <path d="M9 3L5 7l4 4" stroke="var(--td)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ padding: "18px 14px", fontSize: 14, color: "var(--td)", textAlign: "center" }}>
                لم نعثر على نتائج لـ «{search}»
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── QUICK LINKS ─── */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }} className="rv">
            {quickLinks.map(l => (
              <a key={l.label} href={l.href} target={l.ext ? "_blank" : undefined} rel="noreferrer"
                className="gc"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textDecoration: "none", color: "#fff", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,.09)"; e.currentTarget.style.borderColor = "rgba(124,58,237,.28)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--s1)"; e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; }}
              >
                <div className="shine"/>
                <span style={{ fontSize: 24, lineHeight: 1 }}>{l.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{l.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES + ARTICLES ─── */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Category Pills (Mobile-friendly horizontal scroll) */}
          <div className="support-cats rv" style={{ gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 50, border: `1px solid ${activeCategory === c.id ? c.color + "50" : "var(--b1)"}`, background: activeCategory === c.id ? `${c.color}12` : "var(--s1)", color: activeCategory === c.id ? "#fff" : "var(--tm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: activeCategory === c.id ? 700 : 500, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                <span style={{ fontSize: 15 }}>{c.icon}</span>
                {c.label}
                <span style={{ fontSize: 11, opacity: 0.6, background: "rgba(255,255,255,.08)", padding: "1px 8px", borderRadius: 20 }}>
                  {c.articles.length}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop: Sidebar + Grid. Mobile: Full width */}
          <div className="support-layout">

            {/* Sidebar */}
            <div className="support-sidebar">
              <div className="gc" style={{ padding: 8 }}>
                <div className="shine"/>
                {categories.map(c => (
                  <button key={c.id} onClick={() => setActiveCategory(c.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: "none", background: activeCategory === c.id ? `${c.color}12` : "transparent", borderRight: activeCategory === c.id ? `3px solid ${c.color}` : "3px solid transparent", color: activeCategory === c.id ? "#fff" : "var(--tm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: activeCategory === c.id ? 700 : 400, cursor: "pointer", transition: "all .2s", textAlign: "right" }}
                  >
                    <span style={{ fontSize: 17 }}>{c.icon}</span>
                    <span style={{ flex: 1 }}>{c.label}</span>
                    <span style={{ fontSize: 11, color: "var(--td)", background: "rgba(255,255,255,.06)", padding: "2px 8px", borderRadius: 20 }}>{c.articles.length}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="support-articles">
              {/* Category Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 28 }}>{activeCat.icon}</span>
                <h2 style={{ fontSize: 24, fontWeight: 900 }}>{activeCat.label}</h2>
                <span style={{ marginRight: "auto", fontSize: 12, color: "var(--td)", background: "var(--s1)", padding: "4px 12px", borderRadius: 50, border: "1px solid var(--b1)" }}>
                  {activeCat.articles.length} مقالة
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {activeCat.articles.map((a, i) => (
                  <div key={a.id}
                    onClick={() => navigateTo(`/support/article/${a.id}`)}
                    className="gc gc-lift"
                    style={{ display: "block", padding: "22px 24px", cursor: "pointer", transition: "all .28s cubic-bezier(.23,1,.32,1)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${activeCat.color}35`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--b1)"; }}
                  >
                    <div className="shine"/>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${activeCat.color}14`, border: `1px solid ${activeCat.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 800, color: activeCat.color }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>{a.title}</div>
                        <div style={{ fontSize: 12, color: "var(--td)", lineHeight: 1.6 }}>{a.desc}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 11, color: "var(--td)" }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                            <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                          </svg>
                          {a.time} قراءة
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: "auto", transform: "rotate(180deg)", opacity: 0.4 }}>
                            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO LIBRARY ─── */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
            <div>
              <div className="stag" style={{ display: "inline-flex", marginBottom: 12 }}><span className="stag-dot"/>مكتبة الفيديو</div>
              <h2 className="st font-semibold" style={{ marginBottom: 6 }}>تعلّم بالفيديو</h2>
              <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 420, lineHeight: 1.7 }}>
                شروحات مرئية خطوة بخطوة لكل ميزة في زيادة
              </p>
            </div>
            <div style={{ fontSize: 12, color: "var(--td)", background: "var(--s1)", border: "1px solid var(--b1)", padding: "6px 14px", borderRadius: 20, flexShrink: 0 }}>
              سيتم إضافة الفيديوهات قريباً
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }} className="rv d1">
            {videoLibrary.map(v => (
              <div key={v.id} className="gc" style={{ overflow: "hidden" }}>
                <div className="shine"/>
                {/* Placeholder thumbnail */}
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "rgba(0,0,0,.4)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,.15) 0%, rgba(6,182,212,.1) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    {/* Grid pattern */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }}/>
                    {/* Play button */}
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(124,58,237,.3)", border: "2px solid rgba(168,85,247,.4)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 5l10 5-10 5V5z" fill="rgba(168,85,247,.8)"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 600, position: "relative", zIndex: 1 }}>قريباً</div>
                  </div>
                  {/* Duration badge */}
                  <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#fff" }}>
                    {v.duration}
                  </div>
                  {/* Category badge */}
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(124,58,237,.3)", border: "1px solid rgba(168,85,247,.4)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, color: "var(--p4)" }}>
                    {v.category}
                  </div>
                </div>
                {/* Video info */}
                <div style={{ padding: "16px 18px 18px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>{v.title}</div>
                  <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.6 }}>{v.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div className="gc rv" style={{ padding: "48px 40px", textAlign: "center", position: "relative" }}>
            <div className="shine"/>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(124,58,237,.12),transparent 70%)", pointerEvents: "none", borderRadius: "var(--r)" }}/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🤝</div>
              <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 12 }}>لم تجد ما تبحث عنه؟</h2>
              <p style={{ fontSize: 16, color: "var(--tm)", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.75 }}>
                فريق الدعم جاهز لمساعدتك. ردّنا خلال ساعة في أوقات العمل.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://api.whatsapp.com/send/?phone=966510131856" target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 50, background: "rgba(37,211,102,.12)", border: "1px solid rgba(37,211,102,.25)", color: "#25d366", textDecoration: "none", fontWeight: 700, fontSize: 14, transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,.12)"; e.currentTarget.style.transform = "none"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </a>
                <a href="https://calendar.app.google/pjtPBzs9TUPipUEF6" target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 50, background: "linear-gradient(135deg,var(--p),#5b21b6)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14, boxShadow: "0 0 30px rgba(124,58,237,.3)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 50px rgba(124,58,237,.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,.3)"; e.currentTarget.style.transform = "none"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M5 1.5v2M11 1.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  احجز جلسة مجانية
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
