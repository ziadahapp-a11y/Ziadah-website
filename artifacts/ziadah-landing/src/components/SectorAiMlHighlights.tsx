import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { navigateTo } from "@/components/PageTransition";
import {
  sectorAiMlBlogLinks,
  sectorAiMlBullets,
  sectorAiMlSupportLinks,
} from "@/data/sectorAiMlContent";

export default function SectorAiMlHighlights() {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang].sectorsPage;

  return (
    <div id="sector-ai-ml" className="gc rv d1" style={{ padding: 0, marginBottom: 22, scrollMarginTop: 120 }}>
      <div className="shine" />
      <div style={{ padding: "22px 24px 26px" }}>
        <div className="stag" style={{ marginBottom: 10 }}>
          <span className="stag-dot" />
          {tr.sectorAiSectionTag}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight" style={{ marginBottom: 10, marginTop: 0 }}>
          {tr.sectorAiSectionTitle}
        </h2>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75 }}>
          {tr.sectorAiSectionLead}
        </p>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {sectorAiMlBullets.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px 16px",
                borderRadius: 14,
                border: "1px solid var(--b2)",
                background: "rgba(124, 58, 237,.04)",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, lineHeight: 1 }} aria-hidden>
                  {b.emoji}
                </span>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 800, color: "var(--t)", lineHeight: 1.35 }}>
                    {lang === "ar" ? b.titleAr : b.titleEn}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--td)", lineHeight: 1.65 }}>
                    {lang === "ar" ? b.textAr : b.textEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--b1)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: "var(--tm)", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {tr.sectorAiDeepenTitle}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--p)" }}>{tr.sectorAiFromBlog} — </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {sectorAiMlBlogLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => navigateTo(link.href)}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: "1px solid var(--b2)",
                      background: "var(--s1)",
                      color: "var(--t)",
                      cursor: "pointer",
                      fontFamily: "var(--font)",
                      textAlign: dir === "rtl" ? "right" : "left",
                    }}
                  >
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--p)" }}>{tr.sectorAiFromSupport} — </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {sectorAiMlSupportLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => navigateTo(link.href)}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: "1px solid var(--b2)",
                      background: "var(--s1)",
                      color: "var(--t)",
                      cursor: "pointer",
                      fontFamily: "var(--font)",
                      textAlign: dir === "rtl" ? "right" : "left",
                    }}
                  >
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
