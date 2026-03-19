import { useEffect } from "react";
import { useParams } from "wouter";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import { getArticleById, getCategoryById } from "../data/support-data";
import { navigateTo } from "@/components/PageTransition";

export default function SupportArticle() {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const category = article ? getCategoryById(article.categoryId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article || !category) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="bg-wrap">
          <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
          <div className="bg-grid"/>
        </div>
        <div className="noise"/>
        <Nav />
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>المقال غير موجود</h1>
          <p style={{ color: "var(--td)", marginBottom: 28 }}>لم نعثر على هذا المقال، ربما تم نقله أو حذفه.</p>
          <span
            onClick={() => navigateTo("/support")}
            style={{ padding: "12px 28px", borderRadius: 50, background: "var(--p)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            العودة لمركز المساعدة
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      <div style={{ paddingTop: 100, paddingBottom: 80, position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "var(--td)" }}>
            <span
              onClick={() => navigateTo("/support")}
              style={{ color: "var(--td)", textDecoration: "none", transition: "color .2s", cursor: "pointer" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--td)")}
            >
              مركز المساعدة
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: "rotate(180deg)", flexShrink: 0 }}>
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              onClick={() => navigateTo("/support")}
              style={{ color: "var(--td)", textDecoration: "none", transition: "color .2s", cursor: "pointer" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--td)")}
            >
              {category.label}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: "rotate(180deg)", flexShrink: 0 }}>
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: "var(--tm)" }}>{article.title}</span>
          </div>

          {/* Article Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${category.color}18`, border: `1px solid ${category.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {category.icon}
              </div>
              <span style={{ fontSize: 13, color: category.color, fontWeight: 700, background: `${category.color}12`, padding: "3px 12px", borderRadius: 50, border: `1px solid ${category.color}25` }}>
                {category.label}
              </span>
              <span style={{ fontSize: 12, color: "var(--td)", display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                {article.time} قراءة
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, lineHeight: 1.3, letterSpacing: "-0.5px", marginBottom: 16 }}>
              {article.title}
            </h1>
            <p style={{ fontSize: 17, color: "var(--tm)", lineHeight: 1.8 }}>{article.desc}</p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--b1)", marginBottom: 40 }}/>

          {/* Article Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {article.sections.map((section, i) => {
              if (section.type === "heading") {
                return (
                  <h2 key={i} style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginTop: 12, paddingBottom: 10, borderBottom: `1px solid ${category.color}20` }}>
                    {section.text}
                  </h2>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p key={i} style={{ fontSize: 16, color: "var(--tm)", lineHeight: 1.9 }}>
                    {section.text}
                  </p>
                );
              }

              if (section.type === "numbered" && section.items) {
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {section.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${category.color}15`, border: `1px solid ${category.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800, color: category.color }}>
                          {j + 1}
                        </div>
                        <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.75, margin: 0, paddingTop: 3 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "list" && section.items) {
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {section.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: "rgba(255,255,255,.03)", border: "1px solid var(--b1)", borderRadius: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: category.color, flexShrink: 0, marginTop: 8 }}/>
                        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7, margin: 0 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "tip") {
                return (
                  <div key={i} style={{ background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 14, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(16,185,129,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
                      💡
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#10b981", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>نصيحة</div>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.75, margin: 0 }}>{section.text}</p>
                    </div>
                  </div>
                );
              }

              if (section.type === "warning") {
                return (
                  <div key={i} style={{ background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.25)", borderRadius: 14, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(245,158,11,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
                      ⚠️
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#f59e0b", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>تنبيه</div>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.75, margin: 0 }}>{section.text}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Footer Actions */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--b1)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <span
                onClick={() => navigateTo("/support")}
                style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--tm)", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "color .2s", cursor: "pointer" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--tm)")}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 5l4 4-4 4M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                العودة لمركز المساعدة
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="https://api.whatsapp.com/send/?phone=966510131856" target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.2)", borderRadius: 50, color: "#25d366", textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,.1)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  تواصل مع الدعم
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles from same category */}
          {(() => {
            const siblings = category.articles.filter(a => a.id !== article.id).slice(0, 3);
            if (!siblings.length) return null;
            return (
              <div style={{ marginTop: 48 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: "var(--tm)" }}>مقالات ذات صلة</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {siblings.map(s => (
                    <span key={s.id}
                      onClick={() => navigateTo(`/support/article/${s.id}`)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 20px", background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 14, textDecoration: "none", transition: "all .2s", cursor: "pointer" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${category.color}40`; (e.currentTarget as HTMLElement).style.background = `${category.color}06`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--b1)"; (e.currentTarget as HTMLElement).style.background = "var(--s1)"; }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: "var(--td)", marginTop: 3 }}>{s.time} قراءة</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(180deg)", flexShrink: 0 }}>
                        <path d="M10 4L6 8l4 4" stroke="var(--td)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <footer style={{ padding: "32px 5%", borderTop: "1px solid var(--b1)", position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--td)" }}>© ٢٠٢٥ Ziadah. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
