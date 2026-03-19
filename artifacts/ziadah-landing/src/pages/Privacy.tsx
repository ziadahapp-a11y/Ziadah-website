import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ParticleBackground />
        <Nav />
        <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: "5%", paddingRight: "5%", position: "relative", zIndex: 2 }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, letterSpacing: -1.5 }}>
              سياسة الخصوصية
            </h1>
            <p style={{ fontSize: 14, color: "var(--td)", marginBottom: 48 }}>
              آخر تحديث: 2025
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.9, color: "var(--tm)" }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  مقدمة
                </h2>
                <p>
                  [أضف هنا مقدمة سياسة الخصوصية وكيفية التزام زيادة بحماية بيانات مستخدميها.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  البيانات التي نجمعها
                </h2>
                <p>
                  [أضف هنا تفاصيل البيانات التي يتم جمعها من المستخدمين وأصحاب المتاجر.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  كيف نستخدم بياناتك
                </h2>
                <p>
                  [أضف هنا شرحاً لكيفية استخدام البيانات المجمعة وأغراضها.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  مشاركة البيانات مع أطراف ثالثة
                </h2>
                <p>
                  [أضف هنا سياسة مشاركة البيانات مع أطراف ثالثة وضمانات الحماية.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  حفظ البيانات وأمانها
                </h2>
                <p>
                  [أضف هنا تفاصيل مدة حفظ البيانات وإجراءات الأمان المتبعة.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  حقوقك
                </h2>
                <p>
                  [أضف هنا حقوق المستخدم فيما يتعلق ببياناته الشخصية.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  التواصل معنا
                </h2>
                <p>
                  [أضف هنا معلومات التواصل بخصوص أي استفسارات تتعلق بسياسة الخصوصية.]
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
