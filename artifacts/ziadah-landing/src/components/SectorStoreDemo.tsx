import { useMemo, useState } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  getStoreDemo, OFFER_LABELS, OFFER_TYPES,
  type DemoProduct, type OfferType,
} from "@/data/sectorStoreDemo";
import { productImage } from "@/lib/product-images";

/**
 * A STOREFRONT THE MERCHANT CAN USE.
 *
 * Pictures of a widget answer "what does it look like". They do not answer
 * the question that actually closes a merchant, which is "what happens in my
 * shop when someone does X". So this is not a gallery: it is a working store
 * for the sector, and Ziadah's offers fire in it because of what the visitor
 * just did.
 *
 * Browse the category and nothing fires. Open a product and the upgrade
 * appears. Add it and the complements appear, because that is the moment they
 * are welcome and not before. Put three things in the cart and the tier
 * discount turns on by itself. Try to leave at checkout and the coupon shows
 * up. Place the order and the next one is seeded.
 *
 * The panel beside it keeps score: eleven offer types, and which of them this
 * visitor has made fire. That turns the coverage claim into something the
 * merchant proved themselves, which is worth more than any grid of counts.
 *
 * THE ELEVEN KEYS are the product's own, shared with the Figma sector screens
 * and the brand pitch kit, so one word means one thing across design, video
 * and site.
 */

type Screen = "category" | "product" | "cart" | "checkout" | "thankyou";
type Line = { id: string; qty: number };

export default function SectorStoreDemo({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const demo = getStoreDemo(slug);

  const [screen, setScreen] = useState<Screen>("category");
  const [openId, setOpenId] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [seen, setSeen] = useState<Set<OfferType>>(new Set(["plain"]));
  const [qtyTier, setQtyTier] = useState(1);
  const [boxPicks, setBoxPicks] = useState<string[]>([]);
  const [couponOn, setCouponOn] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const byId = useMemo(() => {
    const m: Record<string, DemoProduct> = {};
    for (const p of demo?.products ?? []) m[p.id] = p;
    return m;
  }, [demo]);

  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + (byId[l.id]?.price ?? 0) * l.qty, 0),
    [lines, byId],
  );
  const units = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  if (!demo) return null;

  const L = {
    kicker: isAr ? "جرّبها بنفسك" : "Try it yourself",
    title: isAr ? "متجر يشتغل، لا صورة متجر" : "A store that works, not a picture of one",
    lead: isAr
      ? "هذا متجر إلكترونيات حقيقي بمنتجاته وأسعاره. تصفّح، افتح منتجاً، أضف للسلة، أكمل الطلب - وشوف زيادة تشتغل في نفس اللحظات التي تشتغل فيها عند عملائك. اللوحة على الجانب تعدّ ما شغّلته."
      : "This is a working electronics store with its own products and prices. Browse, open a product, add to the cart, finish the order - and watch Ziadah fire at the same moments it fires for your customers. The panel beside it counts what you have triggered.",
    store: isAr ? demo.storeAr : demo.storeEn,
    back: isAr ? "رجوع" : "Back",
    cat: isAr ? "الأكثر مبيعاً" : "Best sellers",
    add: isAr ? "أضف للسلة" : "Add to cart",
    added: isAr ? "في السلة" : "In cart",
    cart: isAr ? "السلة" : "Cart",
    checkout: isAr ? "إتمام الطلب" : "Checkout",
    pay: isAr ? "ادفع الآن" : "Pay now",
    leave: isAr ? "أغلق الصفحة" : "Leave the page",
    empty: isAr ? "سلتك فارغة. ارجع واختر شيئاً." : "Your cart is empty. Go back and pick something.",
    subtotal: isAr ? "المجموع" : "Subtotal",
    total: isAr ? "الإجمالي" : "Total",
    sar: isAr ? "ر.س" : "SAR",
    toCart: isAr ? "اذهب للسلة" : "Go to cart",
    reviewsOf: isAr ? "تقييم" : "reviews",
    panelTitle: isAr ? "ما شغّلته حتى الآن" : "What you have triggered",
    panelLead: isAr
      ? "أحد عشر نوع عرض. كل واحد يضيء لما تشغّله بنفسك."
      : "Eleven offer types. Each lights up when you make it fire.",
    reset: isAr ? "ابدأ من جديد" : "Start over",
    ziadah: isAr ? "زيادة" : "Ziadah",
    orderDone: isAr ? "تم طلبك" : "Your order is placed",
    orderSub: isAr ? "وصلك إشعار بالتفاصيل." : "A confirmation is on its way.",
  };

  const mark = (t: OfferType) =>
    setSeen((s) => (s.has(t) ? s : new Set(s).add(t)));

  const nm = (p: DemoProduct) => (isAr ? p.nameAr : p.nameEn);
  const money = (n: number) => `${n.toLocaleString("en-US")} ${L.sar}`;

  const addLine = (id: string, qty = 1) => {
    setLines((ls) => {
      const at = ls.findIndex((l) => l.id === id);
      if (at < 0) return [...ls, { id, qty }];
      const next = [...ls];
      next[at] = { ...next[at], qty: next[at].qty + qty };
      return next;
    });
  };
  const inCart = (id: string) => lines.some((l) => l.id === id);

  const reset = () => {
    setScreen("category"); setOpenId(null); setLines([]);
    setSeen(new Set(["plain"])); setQtyTier(1); setBoxPicks([]);
    setCouponOn(false); setShowCoupon(false);
  };

  /* The tier discount is a RULE, not a button: it turns on because the cart
     reached three units, which is exactly how it behaves in a real store. */
  const bmsmPct = units >= 4 ? 15 : units >= 3 ? 10 : 0;
  if (bmsmPct > 0 && !seen.has("bmsm")) mark("bmsm");
  const gap = Math.max(0, demo.freeShipping - subtotal);
  if (screen === "cart" && gap > 0 && gap <= 120 && !seen.has("cartvalue")) mark("cartvalue");

  const discount = Math.round(subtotal * (bmsmPct / 100)) + (couponOn ? Math.round(subtotal * (demo.couponPct / 100)) : 0);
  const total = Math.max(0, subtotal - discount);

  const Photo = ({ p, size = 56 }: { p: DemoProduct; size?: number }) => {
    const src = productImage(isAr ? p.nameAr : p.nameEn);
    return (
      <span className="sd-ph" style={{ width: size, height: size }} aria-hidden="true">
        {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
      </span>
    );
  };

  /* An offer card. Every one carries its type, so the panel and the card
     always agree on what just fired. */
  const Offer = ({ type, title, children }: { type: OfferType; title: string; children: React.ReactNode }) => (
    <div className="sd-offer" data-type={type}>
      <p className="sd-offer-k">
        <span className="sd-offer-dot" aria-hidden="true" />
        {L.ziadah} · {isAr ? OFFER_LABELS[type].ar : OFFER_LABELS[type].en}
      </p>
      <p className="sd-offer-t">{title}</p>
      {children}
    </div>
  );

  const Row = ({ p, right }: { p: DemoProduct; right?: React.ReactNode }) => (
    <div className="sd-row">
      <Photo p={p} size={48} />
      <span className="sd-row-main">
        <span className="sd-row-n">{nm(p)}</span>
        <span className="sd-row-p">
          {money(p.price)}
          {p.was ? <s>{money(p.was)}</s> : null}
        </span>
      </span>
      {right}
    </div>
  );

  const hero = byId[demo.heroId];
  const open = openId ? byId[openId] : null;

  return (
    <DsSection id="section-try" family="grey">
      <SectionHead center kicker={L.kicker} title={L.title} lead={L.lead} />
      <Shell>
        <div className="sd-wrap" dir={dir}>
          {/* ── THE STORE ─────────────────────────────────────────── */}
          <div className="sd-phone">
            <div className="sd-bar">
              <span className="sd-bar-t">{L.store}</span>
              <button type="button" className="sd-cart-btn" onClick={() => { setScreen("cart"); }}>
                {L.cart} {units > 0 ? <b>{units}</b> : null}
              </button>
            </div>

            <div className="sd-screen">
              {screen === "category" ? (
                <>
                  <h4 className="sd-h">{L.cat}</h4>
                  <div className="sd-grid">
                    {demo.products.map((p) => (
                      <button
                        key={p.id} type="button" className="sd-tile"
                        onClick={() => { setOpenId(p.id); setScreen("product"); mark("plain"); }}
                      >
                        <Photo p={p} size={92} />
                        <span className="sd-tile-n">{nm(p)}</span>
                        <span className="sd-tile-p">{money(p.price)}</span>
                      </button>
                    ))}
                  </div>

                  {/* `box` belongs on the category page: it is a way of
                      shopping the whole shelf, not a reaction to one item. */}
                  <Offer type="box" title={isAr ? "اصنع صندوقك: اختر ٣ وادفع ٢٦٠" : "Build your box: pick 3 for 260"}>
                    <div className="sd-chips">
                      {demo.boxIds.map((id) => {
                        const p = byId[id]; const on = boxPicks.includes(id);
                        return (
                          <button
                            key={id} type="button" className="sd-chip" aria-pressed={on}
                            onClick={() => {
                              setBoxPicks((b) => (on ? b.filter((x) => x !== id) : b.length >= 3 ? b : [...b, id]));
                              mark("box");
                            }}
                          >
                            {nm(p)}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button" className="sd-cta" disabled={boxPicks.length < 3}
                      onClick={() => { boxPicks.forEach((id) => addLine(id)); setBoxPicks([]); setScreen("cart"); }}
                    >
                      {boxPicks.length < 3
                        ? isAr ? `اختر ${3 - boxPicks.length} أخرى` : `Pick ${3 - boxPicks.length} more`
                        : isAr ? "أضف الصندوق ٢٦٠ ر.س" : "Add the box for 260 SAR"}
                    </button>
                  </Offer>
                </>
              ) : null}

              {screen === "product" && open ? (
                <>
                  <button type="button" className="sd-back" onClick={() => setScreen("category")}>
                    {dir === "rtl" ? "→" : "←"} {L.back}
                  </button>
                  <Photo p={open} size={150} />
                  <h4 className="sd-h">{nm(open)}</h4>
                  <p className="sd-rating">
                    ★ {open.rating} · {open.reviews} {L.reviewsOf}
                  </p>
                  <p className="sd-price">
                    {money(open.price)} {open.was ? <s>{money(open.was)}</s> : null}
                  </p>
                  <button
                    type="button" className="sd-cta"
                    onClick={() => { addLine(open.id); mark("addmore"); }}
                  >
                    {inCart(open.id) ? L.added : L.add}
                  </button>

                  {/* `replace` fires while they are still deciding. */}
                  {open.id === demo.heroId ? (
                    <Offer
                      type="replace"
                      title={isAr ? "بـ١٢٠ ر.س أكثر: شحن لاسلكي وبطارية أطول" : "For 120 more: wireless charging and longer battery"}
                    >
                      <Row
                        p={byId[demo.upgradeId]}
                        right={
                          <button
                            type="button" className="sd-mini"
                            onClick={() => { setOpenId(demo.upgradeId); mark("replace"); }}
                          >
                            {isAr ? "شوفه" : "See it"}
                          </button>
                        }
                      />
                    </Offer>
                  ) : null}

                  {/* `addmore` only after the thing is actually in the cart. */}
                  {inCart(open.id) ? (
                    <Offer type="addmore" title={isAr ? "أكمل جهازك" : "Complete your device"}>
                      {demo.addMoreIds.filter((id) => !inCart(id)).map((id) => (
                        <Row
                          key={id} p={byId[id]}
                          right={
                            <button type="button" className="sd-mini" onClick={() => addLine(id)}>
                              {L.add}
                            </button>
                          }
                        />
                      ))}
                      <button type="button" className="sd-cta" onClick={() => setScreen("cart")}>{L.toCart}</button>
                    </Offer>
                  ) : null}

                  {/* `quantity` belongs to the thing people lose and rebuy. */}
                  {open.id === demo.quantityId ? (
                    <Offer type="quantity" title={isAr ? "خذها بالكمية وسعر الحبة ينزل" : "Take the pack and the unit price drops"}>
                      <div className="sd-tiers">
                        {[1, 3, 5].map((q) => {
                          const off = q === 5 ? 0.78 : q === 3 ? 0.86 : 1;
                          const t = Math.round(open.price * q * off);
                          return (
                            <button
                              key={q} type="button" className="sd-tier" aria-pressed={qtyTier === q}
                              onClick={() => { setQtyTier(q); mark("quantity"); }}
                            >
                              <b>{q === 1 ? (isAr ? "حبة" : "One") : `${q}`}</b>
                              <span>{money(t)}</span>
                              {q > 1 ? <i>{isAr ? `وفّر ${Math.round(open.price * q - t)}` : `save ${Math.round(open.price * q - t)}`}</i> : null}
                            </button>
                          );
                        })}
                      </div>
                      <button type="button" className="sd-cta" onClick={() => { addLine(open.id, qtyTier); setScreen("cart"); }}>
                        {isAr ? `أضف ${qtyTier}` : `Add ${qtyTier}`}
                      </button>
                    </Offer>
                  ) : null}

                  {/* `steps` and `buythemall` are two ways to sell the same
                      kit: one assembled piece by piece, one in a single move. */}
                  {open.id === demo.heroId ? (
                    <>
                      <Offer type="steps" title={isAr ? "التجهيز كامل، خطوة خطوة" : "The full kit, step by step"}>
                        {demo.kitIds.map((id, i) => (
                          <Row
                            key={id} p={byId[id]}
                            right={<span className="sd-step">{i + 1}</span>}
                          />
                        ))}
                        <button
                          type="button" className="sd-cta"
                          onClick={() => { demo.kitIds.forEach((id) => addLine(id)); mark("steps"); setScreen("cart"); }}
                        >
                          {isAr ? "خذ التجهيز ٤٦٥ ر.س بدل ٥٢٥" : "Take the kit for 465 instead of 525"}
                        </button>
                      </Offer>

                      <Offer type="buythemall" title={isAr ? "الثلاثة بسعر واحد" : "All three at one price"}>
                        <p className="sd-note">
                          {isAr ? "سماعات + غطاء + واقي شاشة" : "Earbuds + case + screen protector"}
                        </p>
                        <button
                          type="button" className="sd-cta"
                          onClick={() => { demo.kitIds.forEach((id) => addLine(id)); mark("buythemall"); setScreen("cart"); }}
                        >
                          {isAr ? "خذها كلها ٤٩٩ ر.س" : "Buy them all for 499 SAR"}
                        </button>
                      </Offer>
                    </>
                  ) : null}
                </>
              ) : null}

              {screen === "cart" ? (
                <>
                  <button type="button" className="sd-back" onClick={() => setScreen("category")}>
                    {dir === "rtl" ? "→" : "←"} {L.back}
                  </button>
                  <h4 className="sd-h">{L.cart}</h4>
                  {lines.length === 0 ? <p className="sd-note">{L.empty}</p> : (
                    <>
                      {lines.map((l) => (
                        <Row
                          key={l.id} p={byId[l.id]}
                          right={<span className="sd-qty">×{l.qty}</span>}
                        />
                      ))}

                      {/* `cartvalue`: the gap, and what closes it. */}
                      {gap > 0 ? (
                        <Offer type="cartvalue" title={isAr ? `ناقص ${gap} ر.س للشحن المجاني` : `${gap} SAR away from free delivery`}>
                          <div className="sd-meter"><i style={{ width: `${Math.min(100, (subtotal / demo.freeShipping) * 100)}%` }} /></div>
                          {demo.products.filter((p) => !inCart(p.id) && p.price >= gap).slice(0, 2).map((p) => (
                            <Row key={p.id} p={p} right={
                              <button type="button" className="sd-mini" onClick={() => { addLine(p.id); mark("cartvalue"); }}>{L.add}</button>
                            } />
                          ))}
                        </Offer>
                      ) : (
                        <p className="sd-free">{isAr ? "✓ الشحن مجاني" : "✓ Free delivery unlocked"}</p>
                      )}

                      {/* `bmsm` turned itself on at three units. */}
                      {bmsmPct > 0 ? (
                        <Offer type="bmsm" title={isAr ? `خصم ${bmsmPct}٪ فعّال على ${units} قطع` : `${bmsmPct}% is live on ${units} items`}>
                          <p className="sd-note">
                            {units < 4
                              ? isAr ? "أضف قطعة رابعة ويصير ١٥٪." : "Add a fourth item and it becomes 15%."
                              : isAr ? "وصلت لأعلى شريحة." : "You are on the top tier."}
                          </p>
                        </Offer>
                      ) : null}

                      <div className="sd-sum">
                        <span>{L.subtotal}</span><b>{money(subtotal)}</b>
                      </div>
                      <button type="button" className="sd-cta" onClick={() => setScreen("checkout")}>{L.checkout}</button>
                    </>
                  )}
                </>
              ) : null}

              {screen === "checkout" ? (
                <>
                  <button type="button" className="sd-back" onClick={() => setScreen("cart")}>
                    {dir === "rtl" ? "→" : "←"} {L.back}
                  </button>
                  <h4 className="sd-h">{L.checkout}</h4>
                  <div className="sd-sum"><span>{L.subtotal}</span><b>{money(subtotal)}</b></div>
                  {discount > 0 ? <div className="sd-sum is-off"><span>{isAr ? "الخصم" : "Discount"}</span><b>−{money(discount)}</b></div> : null}
                  <div className="sd-sum is-total"><span>{L.total}</span><b>{money(total)}</b></div>

                  {/* `coupon` is the exit-intent offer, so it needs the exit. */}
                  {showCoupon && !couponOn ? (
                    <Offer type="coupon" title={isAr ? `قبل ما تطلع: خصم ${demo.couponPct}٪` : `Before you go: ${demo.couponPct}% off`}>
                      <p className="sd-code">{demo.coupon}</p>
                      <button type="button" className="sd-cta" onClick={() => { setCouponOn(true); mark("coupon"); }}>
                        {isAr ? "فعّل الكود" : "Apply the code"}
                      </button>
                    </Offer>
                  ) : null}
                  {couponOn ? <p className="sd-free">{isAr ? `✓ ${demo.coupon} مفعّل` : `✓ ${demo.coupon} applied`}</p> : null}

                  <button type="button" className="sd-cta" onClick={() => { setScreen("thankyou"); mark("thankyou"); }}>{L.pay}</button>
                  {!couponOn ? (
                    <button type="button" className="sd-leave" onClick={() => { setShowCoupon(true); mark("coupon"); }}>
                      {L.leave}
                    </button>
                  ) : null}
                </>
              ) : null}

              {screen === "thankyou" ? (
                <>
                  <p className="sd-done">✓</p>
                  <h4 className="sd-h">{L.orderDone}</h4>
                  <p className="sd-note">{L.orderSub}</p>
                  <Offer type="thankyou" title={isAr ? "يُشترى عادةً بعد هذا الطلب" : "Usually bought after this order"}>
                    {demo.thankYouIds.map((id) => (
                      <Row key={id} p={byId[id]} right={
                        <button type="button" className="sd-mini" onClick={() => { reset(); addLine(id); setScreen("cart"); }}>{L.add}</button>
                      } />
                    ))}
                  </Offer>
                  <button type="button" className="sd-cta" onClick={reset}>{L.reset}</button>
                </>
              ) : null}
            </div>
          </div>

          {/* ── THE SCORECARD ─────────────────────────────────────── */}
          <aside className="sd-panel">
            <h3 className="sd-panel-t">{L.panelTitle}</h3>
            <p className="sd-panel-l">{L.panelLead}</p>
            <p className="sd-score"><b>{seen.size}</b> / {OFFER_TYPES.length}</p>
            <ul className="sd-types">
              {OFFER_TYPES.map((t) => (
                <li key={t} className="sd-type" data-on={seen.has(t) ? "" : undefined}>
                  <span className="sd-type-tick" aria-hidden="true">{seen.has(t) ? "✓" : ""}</span>
                  <span className="sd-type-main">
                    <span className="sd-type-n">{isAr ? OFFER_LABELS[t].ar : OFFER_LABELS[t].en}</span>
                    <span className="sd-type-d">{isAr ? OFFER_LABELS[t].descAr : OFFER_LABELS[t].descEn}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" className="sd-reset" onClick={reset}>{L.reset}</button>
          </aside>
        </div>
      </Shell>
    </DsSection>
  );
}
