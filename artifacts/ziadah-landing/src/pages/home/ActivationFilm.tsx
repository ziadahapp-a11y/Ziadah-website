import { memo, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Check, Sparkles, Store, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { AUTO_LINE } from "@/lib/auto-message";
import { DEFAULT_PACK, SECTOR_PACKS, type PackItem } from "@/data/sectorProductPacks";
import { ProductIcon } from "@/lib/product-icons";
import { StorefrontWidget, widgetKindLabel, type WidgetKind } from "@/components/widgets/storefrontSets";

/**
 * THE ACTIVATION FILM.
 *
 * The merchant activates the app; Ziadah then reads the store, studies the
 * buyers, picks the offers and puts them in the store. Thirty seconds, no
 * sound, text on the screen, looping.
 *
 * ONE CLOCK, NO CSS ANIMATIONS. Everything on the stage is a pure function of
 * `t`, in seconds. That is what lets the same component play on the page
 * (a requestAnimationFrame clock that only runs while the film is on screen)
 * and be recorded to a video file frame by frame (`?film=1` hands the clock
 * to `window.__filmSeek`). A CSS animation could not be seeked.
 *
 * THE STAGE IS 1920x1080 AND SCALED. Layout is written once, in those
 * numbers, and the whole stage is scaled to its container, so the film is
 * the same composition on a phone and in the recording.
 *
 * The sheets in the store scene are the real `StorefrontWidget` shapes with
 * the real shelf, not drawings of them.
 */

const W = 1920;
const H = 1080;
export const FILM_SECONDS = 30;

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const out3 = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
const io3 = (x: number) => { const c = clamp(x); return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2; };
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** 0 before `a`, 1 between `a+fi` and `b-fo`, 0 after `b`. */
const win = (t: number, a: number, b: number, fi = 0.5, fo = 0.5) => Math.min(seg(t, a, a + fi), 1 - seg(t, b - fo, b));
const num = (n: number) => Math.round(n).toLocaleString("en-US");

const STEPS = [
  { ar: "قراءة المنتجات والفئات", en: "Reading products and categories", meta: { ar: "248 منتج · 12 فئة", en: "248 products · 12 categories" }, a: 7.0, b: 9.4 },
  { ar: "تحليل سلوك المشترين", en: "Studying how buyers shop", meta: { ar: "1,420 طلب", en: "1,420 orders" }, a: 9.4, b: 11.8 },
  { ar: "اختيار ما يناسب متجرك من العروض", en: "Picking the offers that fit your store", meta: { ar: "3 من 11 عرضاً", en: "3 of 11 offers" }, a: 11.8, b: 17.0 },
  { ar: "تركيبها في متجرك", en: "Putting them in your store", meta: { ar: "صفحة المنتج · السلة", en: "Product page · Cart" }, a: 17.0, b: 22.4 },
] as const;

/** A sheet is built once and handed to the stage as a constant element, so the
 *  per-frame render never re-renders the sheet itself. */
const Sheet = memo(function Sheet({ kind }: { kind: WidgetKind }) {
  return <StorefrontWidget kind={kind} pack={DEFAULT_PACK} />;
});

/** Every shape Ziadah can show, where it appears and on what event. Only some
 *  suit any one store, so the film picks three of the eleven and says so. */
const KINDS: { kind: WidgetKind; page: { ar: string; en: string }; event: { ar: string; en: string }; pick: boolean }[] = [
  { kind: "related", page: { ar: "صفحة المنتج", en: "Product page" }, event: { ar: "عند فتح المنتج", en: "On opening a product" }, pick: true },
  { kind: "kit", page: { ar: "صفحة المنتج", en: "Product page" }, event: { ar: "عند فتح المنتج", en: "On opening a product" }, pick: false },
  { kind: "steps", page: { ar: "صفحة المنتج", en: "Product page" }, event: { ar: "عند فتح المنتج", en: "On opening a product" }, pick: false },
  { kind: "quantity", page: { ar: "صفحة المنتج", en: "Product page" }, event: { ar: "عند اختيار الكمية", en: "On choosing a quantity" }, pick: true },
  { kind: "buythemall", page: { ar: "صفحة المنتج", en: "Product page" }, event: { ar: "عند فتح المنتج", en: "On opening a product" }, pick: false },
  { kind: "replace", page: { ar: "بعد الإضافة", en: "After adding" }, event: { ar: "عند الإضافة للسلة", en: "On add to cart" }, pick: false },
  { kind: "addmore", page: { ar: "بعد الإضافة", en: "After adding" }, event: { ar: "عند الإضافة للسلة", en: "On add to cart" }, pick: false },
  { kind: "drawer", page: { ar: "السلة", en: "Cart" }, event: { ar: "عند فتح السلة", en: "On opening the cart" }, pick: true },
  { kind: "bmsm", page: { ar: "السلة", en: "Cart" }, event: { ar: "عند تعديل السلة", en: "On changing the cart" }, pick: false },
  { kind: "routine", page: { ar: "السلة", en: "Cart" }, event: { ar: "عند فتح السلة", en: "On opening the cart" }, pick: false },
  { kind: "cartvalue", page: { ar: "الدفع", en: "Checkout" }, event: { ar: "قبل إتمام الطلب", en: "Before checkout" }, pick: false },
];
const COLS = 6;
const CELL_W = 194;
const CELL_H = 364;
const SHEET_SCALE = 0.4;

export default function ActivationFilm({ capture = false }: { capture?: boolean }) {
  const { isAr } = useLanguage();
  const tx = (ar: string, en: string) => (isAr ? ar : en);
  const nm = (it: PackItem) => (isAr ? it.ar : it.en);
  const sar = (v: number) => (isAr ? `${num(v)} ر.س` : `SAR ${num(v)}`);

  const host = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(capture ? 0 : 0);
  const [scale, setScale] = useState(capture ? 1 : 0.6);

  /* The clock. On the page it runs only while the film is at least a quarter
     visible; reduced motion gets the last, finished frame and no clock. */
  useEffect(() => {
    if (capture) {
      const w = window as unknown as { __filmSeek?: (v: number) => void; __filmReady?: boolean };
      w.__filmSeek = (v) => setT(v);
      w.__filmReady = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(27.5);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let on = false;
    const el = host.current;
    const obs = typeof IntersectionObserver === "undefined" || !el ? null : new IntersectionObserver(([e]) => { on = e.isIntersecting; last = performance.now(); }, { threshold: 0.25 });
    if (obs && el) obs.observe(el); else on = true;
    const tick = (now: number) => {
      if (on) setT((p) => (p + (now - last) / 1000) % FILM_SECONDS);
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); obs?.disconnect(); };
  }, [capture]);

  /* The stage is scaled to its container's width. */
  useEffect(() => {
    if (capture) return;
    const el = host.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [capture]);

  const shelf = useMemo(() => {
    const extra = Object.values(SECTOR_PACKS).slice(1, 4).map((p) => p.main);
    return [DEFAULT_PACK.main, DEFAULT_PACK.a, DEFAULT_PACK.b, DEFAULT_PACK.c, DEFAULT_PACK.up, ...extra];
  }, []);
  const burst = useMemo(() => KINDS.map((k) => <Sheet key={k.kind} kind={k.kind} />), []);
  const sheetRelated = useMemo(() => <Sheet kind="related" />, []);
  const sheetQuantity = useMemo(() => <Sheet kind="quantity" />, []);
  const sheetDrawer = useMemo(() => <Sheet kind="drawer" />, []);

  /* ---- scene weights ---- */
  const sceneA = win(t, 0, 6.4, 0.4, 0.6);
  const work = win(t, 6.0, 26.8, 0.6, 0.6);
  const canvasRead = win(t, 6.4, 9.6, 0.5, 0.5);
  const canvasBuy = win(t, 9.4, 12.0, 0.5, 0.5);
  const canvasPick = win(t, 11.8, 17.2, 0.3, 0.5);
  const canvasStore = win(t, 17.0, 22.8, 0.5, 0.6);
  const canvasKpi = win(t, 22.6, 26.8, 0.6, 0.6);
  const endCard = win(t, 26.4, 30.0, 0.8, 0.8) * (t > 29.2 ? 1 - seg(t, 29.2, 30) : 1);
  const loopFade = t > 29.4 ? 1 - seg(t, 29.4, 30) : 1;

  /* ---- scene A: the click ---- */
  const cur = io3(seg(t, 1.2, 3.2));
  const curX = lerp(1380, 1010, cur) + (t > 3.4 ? lerp(0, 90, seg(t, 4.2, 5.4)) : 0);
  const curY = lerp(900, 585, cur) + (t > 3.4 ? lerp(0, 120, seg(t, 4.2, 5.4)) : 0);
  const clickK = seg(t, 3.3, 3.6);
  const active = t >= 3.5;
  const ripple = seg(t, 3.4, 4.2);
  const toast = win(t, 3.9, 6.0, 0.4, 0.4);

  /* ---- the panel ---- */
  const done = (i: number) => seg(t, STEPS[i].b - 0.25, STEPS[i].b);
  const allDone = t >= 22.4;
  const progress = clamp((t - 7.0) / (22.4 - 7.0));

  /* ---- scene: read ---- */
  const scan = seg(t, 7.0, 9.2);
  const counters = {
    products: Math.round(248 * out3(seg(t, 7.0, 9.2))),
    cats: Math.round(12 * out3(seg(t, 7.2, 9.0))),
  };

  /* ---- scene: KPIs ---- */
  const kpi = (a: number) => out3(seg(t, a, a + 1.6));

  const box = (o: number, dy = 0): CSSProperties => ({ opacity: o, transform: `translateY(${(1 - o) * dy}px)`, pointerEvents: "none" });

  return (
    <div
      ref={host}
      className="film"
      data-capture={capture ? "" : undefined}
      style={capture ? { width: W, height: H } : undefined}
      aria-label={tx("فيلم يوضح كيف يفعّل التاجر زيادة ثم يضبط زيادة كل شي بنفسه", "A film showing the merchant activate Ziadah and Ziadah then set everything up by itself")}
      role="img"
    >
      <div className="film-stage" dir={isAr ? "rtl" : "ltr"} style={{ width: W, height: H, transform: `scale(${scale})`, opacity: loopFade }}>
        <div className="film-win">
          <div className="film-bar">
            <i /><i /><i />
            <span className="film-addr">{sceneA > 0.5 ? tx("متجر التطبيقات", "App market") : tx("زيادة · يعمل في متجرك", "Ziadah · working in your store")}</span>
          </div>

          {/* ───────── scene A: activate ───────── */}
          <div className="film-body" style={{ opacity: sceneA, visibility: sceneA > 0 ? "visible" : "hidden" }}>
            <div className="film-market" style={box(out3(seg(t, 0.1, 0.9)), 40)}>
              <div className="film-market-head">
                <span className="film-pill"><Store size={30} /> {tx("متجر التطبيقات", "App market")}</span>
                <span className="film-search">{tx("زيادة", "Ziadah")}</span>
              </div>
              <div className="film-app">
                <span className="film-app-ic"><Sparkles size={86} strokeWidth={1.6} /></span>
                <div className="film-app-txt">
                  <p className="film-app-name">{tx("زيادة", "Ziadah")}</p>
                  <p className="film-app-sub">{tx("اقتراح المنتجات والعروض بالذكاء الاصطناعي", "AI product and offer suggestions")}</p>
                </div>
                <div className="film-btn-wrap">
                  <span className="film-btn" style={{ opacity: active ? 0 : 1, transform: `scale(${1 - clickK * 0.06 + (t > 3.6 ? 0.06 * clickK : 0)})` }}>{tx("فعّل", "Activate")}</span>
                  <span className="film-btn film-btn--on" style={{ opacity: active ? 1 : 0 }}><Check size={40} strokeWidth={3} /> {tx("مفعّل", "Active")}</span>
                  <span className="film-ripple" style={{ opacity: (1 - ripple) * 0.5, transform: `scale(${1 + ripple * 1.8})` }} />
                </div>
              </div>
            </div>
            <div className="film-toast" style={box(toast, 24)}>
              <span><Check size={32} strokeWidth={3} /></span>
              {tx("تم تفعيل زيادة على متجرك", "Ziadah is now active in your store")}
            </div>
            <svg className="film-cursor" width="64" height="64" viewBox="0 0 24 24" style={{ left: curX, top: curY, opacity: win(t, 1.0, 5.6, 0.3, 0.5), transform: `scale(${1 - clickK * 0.15})` }} aria-hidden="true">
              <path d="M5 3l14 7.5-6 1.8 3.6 6.4-2.4 1.3-3.6-6.4L6 17.5z" fill="#0a0a0a" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>

          {/* ───────── scenes B-D: Ziadah at work ───────── */}
          <div className="film-body film-work" style={{ opacity: work, visibility: work > 0 ? "visible" : "hidden" }}>
            <div className="film-canvas">
              {/* read the store */}
              <div className="film-layer" style={box(canvasRead, 24)}>
                <p className="film-h">{tx("يقرأ كتالوج متجرك", "Reading your catalogue")}</p>
                <div className="film-count">
                  <span><b>{num(counters.products)}</b>{tx("منتج", "products")}</span>
                  <span><b>{num(counters.cats)}</b>{tx("فئة", "categories")}</span>
                </div>
                <div className="film-grid">
                  {shelf.map((p, i) => {
                    const hit = clamp((scan * (shelf.length + 1.2) - i) / 1);
                    return (
                      <div key={i} className="film-tile" data-hit={hit > 0.5 ? "" : undefined} style={{ transform: `translateY(${(1 - out3(seg(t, 6.6 + i * 0.07, 7.2 + i * 0.07))) * 30}px)`, opacity: out3(seg(t, 6.6 + i * 0.07, 7.2 + i * 0.07)) }}>
                        <span className="film-tile-ic"><ProductIcon name={nm(p)} size={110} /></span>
                        <span className="film-tile-n">{nm(p)}</span>
                        <span className="film-tile-p">{sar(p.price)}</span>
                        <span className="film-tile-ok" style={{ opacity: hit > 0.5 ? 1 : 0 }}><Check size={26} strokeWidth={3.5} /></span>
                      </div>
                    );
                  })}
                  <span className="film-beam" style={{ top: `${scan * 112 - 6}%`, opacity: scan > 0 && scan < 1 ? 1 : 0 }} />
                </div>
              </div>

              {/* study the buyers */}
              <div className="film-layer" style={box(canvasBuy, 24)}>
                <p className="film-h">{tx("يدرس ماذا يشتري عملاؤك معاً", "Studying what your customers buy together")}</p>
                <div className="film-pairs">
                  {([[DEFAULT_PACK.main, DEFAULT_PACK.a, 64], [DEFAULT_PACK.main, DEFAULT_PACK.b, 48], [DEFAULT_PACK.a, DEFAULT_PACK.b, 31]] as [PackItem, PackItem, number][]).map(([x, y, pct], i) => {
                    const k = out3(seg(t, 9.8 + i * 0.35, 10.9 + i * 0.35));
                    return (
                      <div key={i} className="film-pair" style={{ opacity: k, transform: `translateY(${(1 - k) * 28}px)` }}>
                        <span className="film-pair-ic"><ProductIcon name={nm(x)} size={96} /></span>
                        <span className="film-plus">+</span>
                        <span className="film-pair-ic"><ProductIcon name={nm(y)} size={96} /></span>
                        <div className="film-pair-mid">
                          <p>{nm(x)} + {nm(y)}</p>
                          <div className="film-meter"><i style={{ width: `${pct * k}%` }} /></div>
                        </div>
                        <b className="film-pct">{Math.round(pct * k)}%</b>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* every offer, and the few that fit this store */}
              <div className="film-layer" style={box(canvasPick, 0)}>
                <p className="film-h">
                  {tx("يختار ما يناسب متجرك من كل العروض", "It picks only what fits your store")}
                  <small style={{ opacity: seg(t, 15.4, 15.9) }}>{tx("3 من 11", "3 of 11")}</small>
                </p>
                <div className="film-xgrid">
                  {KINDS.map((k, i) => {
                    const a = 12.1 + i * 0.05;
                    const fly = out3(seg(t, a, a + 1.25));
                    const col = isAr ? COLS - 1 - (i % COLS) : i % COLS;
                    const row = Math.floor(i / COLS);
                    const x1 = col * CELL_W + (CELL_W - 340 * SHEET_SCALE) / 2;
                    const y1 = row * (CELL_H + 8);
                    const x0 = (COLS * CELL_W) / 2 - 170 * 0.12;
                    const y0 = CELL_H - 80;
                    const decide = 13.9 + i * 0.16;
                    const judged = seg(t, decide, decide + 0.35);
                    const yes = k.pick;
                    const gone = yes ? 0 : seg(t, 16.0, 16.6);
                    const dim = yes ? 1 : lerp(1, 0.3, judged);
                    return (
                      <div
                        key={k.kind}
                        className="film-xc"
                        style={{
                          transform: `translate(${lerp(x0, x1, fly)}px, ${lerp(y0, y1, fly)}px) rotate(${(1 - fly) * (i % 2 ? 22 : -22)}deg)`,
                          opacity: Math.min(seg(t, a, a + 0.4), 1 - gone) * dim,
                          filter: !yes && judged > 0 ? `grayscale(${judged})` : undefined,
                        }}
                      >
                        <div className="film-xc-sheet" data-yes={yes && judged > 0.5 ? "" : undefined} style={{ transform: `scale(${lerp(0.12, SHEET_SCALE, fly)})` }}>{burst[i]}</div>
                        <div className="film-xc-meta" style={{ opacity: seg(t, a + 0.85, a + 1.35) }}>
                          <b>{widgetKindLabel(k.kind, isAr)}</b>
                          <small>{tx(k.page.ar, k.page.en)}</small>
                          <small>{tx(k.event.ar, k.event.en)}</small>
                        </div>
                        <span className="film-xc-badge" data-yes={yes ? "" : undefined} style={{ opacity: judged > 0.5 ? 1 : 0, transform: `scale(${0.6 + 0.4 * judged})` }}>
                          {yes ? <Check size={26} strokeWidth={3.5} /> : <X size={24} strokeWidth={3.5} />}
                        </span>
                        {!yes ? <span className="film-xc-no" style={{ opacity: judged > 0.6 ? 1 : 0 }}>{tx("لا يناسب متجرك", "Not for your store")}</span> : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* put them in the store */}
              <div className="film-layer film-store" style={box(canvasStore, 24)}>
                {([
                  [tx("صفحة المنتج", "Product page"), sheetRelated, 17.3],
                  [tx("اختيار الكمية", "Quantity"), sheetQuantity, 19.0],
                  [tx("السلة", "Cart"), sheetDrawer, 20.7],
                ] as const).map(([tag, el, at], i) => (
                  <div key={i} className="film-store-col" style={{ opacity: out3(seg(t, at, at + 0.7)), transform: `translateY(${(1 - out3(seg(t, at, at + 1.0))) * 80}px)` }}>
                    <span className="film-tag">{tag}</span>
                    <div className="film-sheet">{el}</div>
                  </div>
                ))}
              </div>

              {/* results */}
              <div className="film-layer" style={box(canvasKpi, 24)}>
                <p className="film-h">{tx("النتيجة بعد التفعيل", "After activation")}<small>{tx("مثال توضيحي", "Illustrative example")}</small></p>
                <div className="film-kpis">
                  <div className="film-kpi">
                    <small>{tx("متوسط قيمة الطلب", "Average order value")}</small>
                    <b>{sar(lerp(212, 286, kpi(23.0)))}</b>
                    <em>+{Math.round(35 * kpi(23.0))}%</em>
                  </div>
                  <div className="film-kpi">
                    <small>{tx("عروض تعمل الآن", "Offers running now")}</small>
                    <b>{Math.round(3 * kpi(23.2))}</b>
                    <em>{tx("تلقائياً", "automatically")}</em>
                  </div>
                  <div className="film-kpi">
                    <small>{tx("طلبات فيها منتج مقترح", "Orders with a suggested item")}</small>
                    <b>{Math.round(38 * kpi(23.4))}%</b>
                    <em>{tx("وتتحسن", "and improving")}</em>
                  </div>
                </div>
                <div className="film-bars">
                  {[28, 34, 31, 44, 52, 61, 70, 78].map((h, i) => (
                    <i key={i} style={{ height: `${h * out3(seg(t, 23.2 + i * 0.12, 24.4 + i * 0.12))}%` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* the agent panel */}
            <aside className="film-panel">
              <div className="film-panel-head">
                <span className="film-panel-av"><Sparkles size={34} /></span>
                <b>{tx("مساعد زيادة", "Ziadah assistant")}</b>
              </div>
              <p className="film-msg" style={box(out3(seg(t, 6.6, 7.2)), 20)}>{tx("تم التفعيل. أبدأ بقراءة متجرك.", "Activated. I'm starting with your store.")}</p>
              <ul className="film-steps">
                {STEPS.map((s, i) => {
                  const shown = out3(seg(t, s.a - 0.2, s.a + 0.4));
                  const d = done(i);
                  const running = t >= s.a && d < 1;
                  return (
                    <li key={i} style={{ opacity: shown, transform: `translateY(${(1 - shown) * 18}px)` }}>
                      <span className="film-step-ic" data-state={d >= 1 ? "done" : running ? "run" : "wait"}>
                        {d >= 1 ? <Check size={26} strokeWidth={3.5} /> : running ? <i className="film-spin" style={{ transform: `rotate(${t * 540}deg)` }} /> : null}
                      </span>
                      <div>
                        <p>{tx(s.ar, s.en)}</p>
                        <small style={{ opacity: d }}>{tx(s.meta.ar, s.meta.en)}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="film-ready" style={box(out3(seg(t, 22.6, 23.3)), 20)}><Check size={30} strokeWidth={3.5} /> {tx("جاهز: العروض تعمل في متجرك", "Ready: the offers are live in your store")}</p>
              <div className="film-prog"><i style={{ width: `${(allDone ? 1 : progress) * 100}%` }} /></div>
            </aside>
          </div>

          {/* ───────── end card ───────── */}
          <div className="film-end" style={{ opacity: endCard, visibility: endCard > 0 ? "visible" : "hidden" }}>
            <img src={isAr ? "/logo-ar.svg" : "/logo-en.svg"} alt="" className="film-end-logo" style={box(out3(seg(t, 26.8, 27.5)), 20)} />
            <p className="film-end-line" style={box(out3(seg(t, 27.1, 28.0)), 30)}>{tx(AUTO_LINE.ar, AUTO_LINE.en)}</p>
            <div className="film-end-chips" style={box(out3(seg(t, 27.8, 28.6)), 20)}>
              <span>{tx("زد", "Zid")}</span><span>{tx("سلة", "Salla")}</span><span>{tx("شوبيفاي", "Shopify")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
