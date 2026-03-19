import { navigateTo } from "@/components/PageTransition";

export default function Footer() {
  return (
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
            <h4>المدونة</h4>
            <a href="/blog">جميع المقالات</a>
            <a href="/blog?cat=استراتيجيات البيع">استراتيجيات البيع</a>
            <a href="/blog?cat=الذكاء الاصطناعي">الذكاء الاصطناعي</a>
            <a href="/blog?cat=دليل التاجر">دليل التاجر</a>
            <a href="/blog?cat=شروحات المنصة">شروحات المنصة</a>
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
            © 2025 Ziadah. جميع الحقوق محفوظة. شاملة الضريبة.
          </div>
          <div className="ft-links">
            <span
              onClick={() => navigateTo("/privacy")}
              style={{ cursor: "pointer" }}
            >
              سياسة الخصوصية
            </span>
            <span
              onClick={() => navigateTo("/terms")}
              style={{ cursor: "pointer" }}
            >
              شروط الاستخدام
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
