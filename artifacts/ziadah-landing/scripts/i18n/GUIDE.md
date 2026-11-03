# Translating the Ziadah site catalogue

Input: `scripts/i18n/chunks/NN.json`, a JSON array of English strings (UI copy, marketing copy, help articles).
Output: `scripts/i18n/out/<locale>/NN.json`, a JSON OBJECT `{ "<english string exactly as given>": "<translation>" }`, every input string present, same keys byte for byte.

Rules
- Natural, native marketing and product copy for a SaaS that recommends products to shoppers on Zid, Salla and Shopify stores in Saudi Arabia and the GCC. Not word for word; read like it was written in the language.
- Do NOT translate: Ziadah, Zid, Salla, Shopify, WhatsApp, Meta, Google, TikTok, Snapchat, Instagram, YouTube, API, AOV, ROAS, CTA, SaaS, SAR, URLs, emails, code, slugs, file names, numbers, and anything inside {braces}, `backticks` or <tags>.
- Keep the same punctuation style, the same list markers, the same line breaks, the same capitalisation pattern for headings, and roughly the same length (UI space is tight).
- Keep Western digits (0-9). Currency marks like SAR or the riyal sign stay as written.
- Consistent terms across the whole file: "widget" = the on-store recommendation block; "add to cart"; "upsell"; "cross-sell"; "checkout"; "merchant" = the store owner; "storefront".
- No explanations, no notes, no markdown. Write valid JSON only (escape quotes). If a string is a proper name or already fine in the target language, return it unchanged.

Register by locale
- fr: vous, professional. de: Sie. es: neutral Latin-American/International Spanish, usted-free imperative. it: Lei/neutral. pt: Brazilian Portuguese, você. nl: u/je neutral-professional (je). sv/da/no: modern informal-professional (du); no = Norwegian Bokmal. pl: formal Pan/Pani avoided, impersonal where possible. tr: siz. ja: です・ます. ko: 합니다/해요 polite. zh: Simplified Chinese (Mainland terms). zh-tw: Traditional Chinese (Taiwan terms, not converted Mainland text).
