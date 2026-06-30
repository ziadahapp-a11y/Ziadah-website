import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";

const BOOKING_URL = "https://calendar.app.google/PHiuLc9ofgqw4XXk6";

export function Footer() {
  const t = useT();
  const { lang } = useLang();
  const ArrowCTA = lang === "ar" ? ArrowLeft : ArrowRight;

  const navLinks = [
    { href: "/how-it-works", label: t({ ar: "كيف يعمل", en: "How it works" }) },
    { href: "/features", label: t({ ar: "المميزات", en: "Features" }) },
    { href: "/integrations", label: t({ ar: "التكاملات", en: "Integrations" }) },
    { href: "/pricing", label: t({ ar: "الأسعار", en: "Pricing" }) },
  ];

  const bookCall = () =>
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");

  return (
    <footer className="border-t border-zinc-200 bg-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand + CTA */}
          <div className="md:col-span-6 lg:col-span-7 max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <img src="/logo.png" alt="راصد Rasid" className="h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-600 mb-6">
              {t({
                ar: "منصّة راصد لمتابعة عملائك المحتملين وإثراء بياناتهم وتحويلهم إلى صفقات بكل سهولة.",
                en: "Rasid helps you track leads, enrich their data, and turn them into deals — effortlessly.",
              })}
            </p>
            <button
              onClick={bookCall}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              {t({ ar: "احجز مكالمة", en: "Book a call" })}
              <ArrowCTA className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-zinc-950">
              {t({ ar: "تصفّح", en: "Explore" })}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-zinc-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-4 text-sm font-semibold text-zinc-950">
              {t({ ar: "تواصل معنا", en: "Get in touch" })}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li>
                <a
                  href="mailto:ziadah.app@gmail.com"
                  className="transition-colors hover:text-zinc-950"
                >
                  ziadah.app@gmail.com
                </a>
              </li>
              <li>
                <button
                  onClick={bookCall}
                  className="transition-colors hover:text-zinc-950"
                >
                  {t({ ar: "جدولة عرض توضيحي", en: "Schedule a demo" })}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>
            {t({
              ar: "© 2026 راصد. جميع الحقوق محفوظة.",
              en: "© 2026 Rasid. All rights reserved.",
            })}
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t({ ar: "كل الأنظمة شغّالة طبيعي", en: "All systems operational" })}
          </p>
        </div>
      </div>
    </footer>
  );
}
