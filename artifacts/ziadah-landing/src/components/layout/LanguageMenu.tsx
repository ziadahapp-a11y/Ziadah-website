import { useEffect, useId, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ENABLED_LOCALES } from "@/i18n/enabled";
import { LOCALE_NAMES, LOCALE_TAGS, type Locale } from "@/i18n/languages";
import { analytics } from "@/lib/analytics";
import "@/styles/language-menu.css";

/**
 * The language switcher: one button that opens the list of the seventeen
 * languages the site is served in, each written in its own script. Choosing
 * one goes to the same page under that language's prefix.
 */
export default function LanguageMenu({ testId, tabIndex }: { testId: string; tabIndex?: number }) {
  const { locale, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    analytics.languageSwitch(locale, next);
    setLang(next);
  };

  return (
    <div className="lang-menu" ref={root}>
      <button
        type="button"
        className="lang-menu-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={LOCALE_NAMES[locale]}
        data-testid={testId}
        tabIndex={tabIndex}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span>{LOCALE_NAMES[locale]}</span>
      </button>
      {open ? (
        <ul id={id} role="listbox" className="lang-menu-list" data-lenis-prevent="" aria-label={LOCALE_NAMES[locale]}>
          {ENABLED_LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button type="button" lang={LOCALE_TAGS[l]} onClick={() => choose(l)} className="lang-menu-item" data-active={l === locale ? "" : undefined}>
                <span>{LOCALE_NAMES[l]}</span>
                {l === locale ? <Check className="w-4 h-4" aria-hidden="true" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
