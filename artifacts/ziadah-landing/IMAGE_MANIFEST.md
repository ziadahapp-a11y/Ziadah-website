# Image / Icon Manifest — Ziadah Landing

Generated after stripping emoji placeholders. Every emoji was acting as either a
**decorative icon** or a **product thumbnail**. They fall into two buckets with very
different solutions:

- **ICONS** → should NOT be photos. Use the existing `lucide-react` icon set (already a
  dependency) or simple SVGs. No uploads needed.
- **PRODUCT PHOTOS** → real images you upload. These appear in demo mockups / widget previews.

> ⚠️ Wiring note: today the data fields are `emoji: string` and the JSX renders the emoji as
> text inside a styled box (e.g. `BuyTogetherWidget.tsx:84` renders `{p.emoji}`). Uploading
> images alone will NOT make them appear — the data fields must become image paths and the JSX
> must render `<img>`. That code change is separate from sourcing the images.

---

## BUCKET A — ICONS (recommend lucide-react, not uploads)

| Group | Count | Where | Recommendation |
|-------|------:|-------|----------------|
| Sector category icons | 16 | `data/sectors.ts` (sector `icon`) | 1 Lucide icon per sector |
| Sector flow-step icons | 48 | `data/sectors.ts` / `sectorVisuals.ts` (3 × 16) | Lucide icons |
| Use-case page feature/strategy icons | ~91 | `pages/use-cases/*.tsx` | Lucide icons |
| Nav / menu / mobile-nav icons | ~30 | `components/Nav.tsx` | Lucide icons (most already SVG) |
| Marketing / stats / benefit icons | ~15–20 | `Landing.tsx`, `Affiliate.tsx`, `Support.tsx`, `SuccessStories.tsx` | Lucide icons |

**Subtotal ≈ 185 icon slots.** None of these need uploaded photos.

### 16 sector category icons
Abayas & Fashion · Health & Fitness · Digital Products · Electronics · Jewelry ·
Beauty & Care · Restaurants & Cafés · Home Essentials · Creative/Design Services ·
Charities · Clinics · Digital Cards · Gold · Qurbani & Livestock · Delivery Apps ·
E-commerce Platforms

### Nav menu labels needing an icon
By Page · By Activity · By Display Type · By Goal · By Experience · Ecommerce Stores ·
Delivery Apps · Ecommerce Platforms · FAQ · Contact/Chat · Blog · (mobile bottom nav:
home, useCases, calculator, analyze, platforms, sectors, pricing, more, successStories,
help, meeting, langTheme, startNow, login)

---

## BUCKET B — PRODUCT PHOTOS (real images to upload)

These drive the widget previews, sector scenario mockups, and homepage demos. There are
~340 *slots*, but they collapse to roughly **130–150 unique products**, and most are
generic enough that a **curated category library (~40–60 photos) reused across sectors**
would look great without sourcing every single item.

### Widget previews — `data/sectorWidgetShowcaseDemos.ts` (16 sectors each)
| Widget | Slots/sector | Total | Thumbnail size |
|--------|------------:|------:|----------------|
| Buy Together | 2 | 32 | 36×36 |
| Add-ons | 4 | 64 | inline ~14px |
| Related Products | 2 | 32 | 40×40 |
| Free Shipping | 2 | 32 | 32×32 |
| Product Swap | 1 | 16 | 56×56 |

### Sector scenario mockups — `data/sectorVisuals.ts`
Main + suggested mini-products per scenario (~105–110 unique). Same product families as above.

### Homepage / personalization demos — named, brand-like products
`Landing.tsx`, `HomeTrackflow.tsx`, `CustomerPersonalizationDemo.tsx`, `CustomerProfileDemo.tsx`:
Ultra Pro Sneakers · JBL Reflect earbuds · Whey protein drink · Nivea moisturizer ·
AirPods Pro · Smart watch · Sports T-shirt · Men's flannel shirt · On Cloud running shoe ·
Ramadan fragrance · Skincare set · Oud incense · Luxury gift box  (~13 hero products)

### Use-case mockups — `pages/use-cases/CartPage.tsx`, `CheckoutPage.tsx`
~7–10 thumbnails: traditional scarf (شماغ), prayer beads (سبحة) ×2, plus cart line items. (52×52 / 30×30)

### Unique product photo list, deduped by category
*(reuse one photo across every sector that needs that category)*

- **Food & Beverage (~22):** beef burger, fries, soft drink, orange juice, espresso, croissant, pizza, kabsa, tabbouleh, shawarma, falafel plate, milkshake, hummus, lentil soup, kunafa/mahalabia, family meal box, mixed grill, salad, bread basket, Arabic coffee, juice, dip
- **Fashion (~9):** black abaya, summer/linen abaya, embroidered evening abaya, silk shawl, chiffon scarf, handbag, flat shoes, sunglasses, belt
- **Beauty (~11):** SPF moisturizer, vitamin-C serum, night serum, gentle cleanser, perfume 50ml, body lotion, lipstick, LED mirror, face mist, cleansing sponge, makeup brush
- **Health/Fitness (~11):** whey protein, omega-3, creatine, shaker, running shoe, jump rope, electrolyte drink, resistance band, water bottle, compression socks, protein bar
- **Home (~11):** cotton sheet set, pillows, storage box, robot vacuum, pot set, wood utensils, picture frame, wall clock, broom, laundry hamper, blackout curtain
- **Electronics (~12):** smartphone, wireless earbuds/AirPods, phone case, fast charger, tempered glass, laptop, laptop bag, smartwatch, smartwatch strap, USB drive, wireless mouse, keyboard
- **Jewelry (~10):** gold necklace 21k, matching earrings, diamond ring, gold ring, silver bracelet, light gold bracelet, zircon necklace, pendant/charm, elegant watch, premium box
- **Gold/bullion (~6):** gold bar 10g/1kg, gold coin, certified capsule, display box, digital scale
- **Digital/Cards/Services (~14):** UI kit, icon pack, Arabic font, ebook PDF, course, gift cards (PlayStation / app store / SAR 50 / 100 / music sub), logo design, landing page, presentation deck
- **Clinic/Dental (~9):** dental cleaning, whitening kit, electric toothbrush, floss, X-ray, laser session, soothing cream, mouth rinse, recall slot
- **Charity (~9):** food basket, water bottle, milk powder, rice pack, winter clothing, school kit, first-aid box, learning toy, donation/sponsorship
- **Livestock (~9):** whole lamb, family meat cuts, ground meat, feed 25kg, salt lick, hay bale, vitamin shot, feeder, hoof spray

---

## SUMMARY

| Bucket | Slots | Unique assets | Solution |
|--------|------:|--------------:|----------|
| A — Icons | ~185 | ~90 distinct concepts | `lucide-react` / SVG (no upload) |
| B — Product photos | ~340 | ~130–150 (≈40–60 if reusing per category) | Upload real images |

**Existing assets already covering some needs** (in `public/`): `avatar-male.webp`,
`avatar-female.webp`, `iphone-mockup.png`, brand logos (`logo-*`), platform logos
(`platform/zid-*`, `platform/salla-*`), and 20+ merchant logos in `public/logos/`.
