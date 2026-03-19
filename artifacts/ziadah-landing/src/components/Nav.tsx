import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const AN = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
function toA(n: number) { return String(n).replace(/[0-9]/g, d => AN[+d]); }

const Logo = () => (
  <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <img src="/logo.png" alt="زيادة" style={{ height: 40, width: "auto" }} />
  </Link>
);

interface DropdownItem { label: string; href: string; desc: string; }

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "المنتج",
    dropdown: [
      { label: "الخصائص التفصيلية", href: "/features", desc: "الأهداف وطرق العرض والأنشطة الـ ٩" },
      { label: "حالات الاستخدام", href: "/features#usecases", desc: "حسب قطاع متجرك" },
    ],
  },
  { label: "قصص النجاح", href: "/success-stories" },
  { label: "الأسعار", href: "/#pricing" },
  { label: "الدعم", href: "/support" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpenDrop(null); }, [location]);

  return (
    <nav style={{
      position: "fixed", top: 16, right: "4%", left: "4%", zIndex: 900,
      background: scrolled ? "rgba(3,3,11,.97)" : "rgba(3,3,11,.82)",
      border: `1px solid ${scrolled ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.07)"}`,
      boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,.5)" : "none",
      borderRadius: 18, padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 58, backdropFilter: "blur(32px)", transition: "all .4s",
    }}>
      <Logo />
      <ul style={{ display: "flex", gap: 6, listStyle: "none", margin: 0, position: "relative" }}>
        {navItems.map((item) => (
          <li key={item.label} style={{ position: "relative" }}>
            {item.dropdown ? (
              <>
                <button
                  onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 10, background: openDrop === item.label ? "rgba(124,58,237,.12)" : "transparent", border: "none", color: openDrop === item.label ? "#fff" : "rgba(255,255,255,.55)", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .2s" }}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: openDrop === item.label ? "rotate(180deg)" : "none", transition: "transform .25s" }}><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openDrop === item.label && (
                  <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 260, background: "rgba(8,6,20,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: 8, backdropFilter: "blur(32px)", boxShadow: "0 24px 60px rgba(0,0,0,.6)", zIndex: 100 }}>
                    {item.dropdown.map(d => (
                      <Link key={d.href} href={d.href} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "12px 14px", borderRadius: 12, textDecoration: "none", transition: "background .2s", background: "transparent" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{d.label}</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{d.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href!} style={{ display: "block", padding: "8px 14px", borderRadius: 10, color: location === item.href ? "#fff" : "rgba(255,255,255,.55)", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 500, textDecoration: "none", background: location === item.href ? "rgba(124,58,237,.1)" : "transparent", transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => { if (location !== item.href) e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 10 }}>
        <a href="#" className="nb nb-ghost">تسجيل الدخول</a>
        <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer" className="nb nb-fill">فعّل الآن</a>
      </div>
    </nav>
  );
}
