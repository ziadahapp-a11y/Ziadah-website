import ali from "@assets/Frame_1321314903_1773891999653.png";
import mahmoud from "@assets/Frame_1321314904_1773891999653.png";
import nawaf from "@assets/Frame_1321314905_1773891999653.png";
import ayat from "@assets/Frame_1321314908_1773891999654.png";
import zainab from "@assets/Frame_1321314906_1773891999654.png";
import tahseen from "@assets/Frame_1321314907_1773891999654.png";

const team = [
  { name: "علي الدهنين", role: "الشريك المؤسس - رئيس تطوير المنتج", img: ali },
  { name: "محمود أحمد", role: "الشريك المؤسس - الرئيس التنفيذي للتقنية", img: mahmoud },
  { name: "نواف الضراب", role: "الشريك المؤسس - مستشار الأعمال", img: nawaf },
  { name: "آيات", role: "مسؤول نجاح التجار", img: ayat },
  { name: "زينب الصفار", role: "مسؤول تسويق المنتج والشراكات", img: zainab },
  { name: "تحسين الله", role: "مطور واجهة أمامية", img: tahseen },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div className="wrap">
        <div className="tc" style={{ marginBottom: 56 }}>
          <div className="stag rv">
            <span className="stag-dot" />
            فريقنا
          </div>
          <h2 className="st rv d1" style={{ fontSize: 48 }}>
            فريق <span className="grad">زيادة</span>
          </h2>
          <p className="ssub rv d2">خبرة تتجاوز ال10 سنوات في التجارة الإلكترونية والتسويق الرقمي.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="team-grid"
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`rv d${(i % 3) + 1}`}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(168,85,247,0.15)",
                borderRadius: 20,
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(168,85,247,0.45)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(124,58,237,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(168,85,247,0.15)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "85%",
                  background: "linear-gradient(160deg, #1a0f2e 0%, #0d0820 100%)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(to top, rgba(10,5,20,0.95) 0%, transparent 100%)",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "20px 20px 24px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f1e8ff",
                    margin: "0 0 6px",
                    fontFamily: "var(--font)",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(196,132,252,0.8)",
                    margin: 0,
                    lineHeight: 1.5,
                    fontFamily: "var(--font)",
                  }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
