import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ParticleBackground />
        <Nav />
        <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: "5%", paddingRight: "5%", position: "relative", zIndex: 2 }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, letterSpacing: -1.5 }}>
              الشروط والأحكام
            </h1>
            <p style={{ fontSize: 14, color: "var(--td)", marginBottom: 48 }}>
              آخر تحديث: 2025
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.9, color: "var(--tm)" }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  القبول بالشروط
                </h2>
                <p>
                  [أضف هنا نص القبول بالشروط وكيفية سريانها على المستخدمين.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  وصف الخدمة
                </h2>
                <p>
                  [أضف هنا وصفاً تفصيلياً للخدمات التي تقدمها منصة زيادة.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  شروط الاشتراك والدفع
                </h2>
                <p>
                  [أضف هنا تفاصيل خطط الاشتراك وسياسة الدفع والفواتير.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  سياسة الاسترداد
                </h2>
                <p>
                  [أضف هنا سياسة استرداد المدفوعات والشروط المتعلقة بها.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  التزامات المستخدم
                </h2>
                <p>
                  [أضف هنا الالتزامات والمسؤوليات المترتبة على استخدام المنصة.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  الملكية الفكرية
                </h2>
                <p>
                  [أضف هنا بنود الملكية الفكرية وحقوق الاستخدام.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  تحديد المسؤولية
                </h2>
                <p>
                  [أضف هنا حدود مسؤولية المنصة تجاه المستخدمين.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  إنهاء الخدمة
                </h2>
                <p>
                  [أضف هنا شروط وإجراءات إنهاء الاشتراك أو إيقاف الخدمة.]
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                  التواصل معنا
                </h2>
                <p>
                  [أضف هنا معلومات التواصل بخصوص أي استفسارات تتعلق بالشروط والأحكام.]
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
