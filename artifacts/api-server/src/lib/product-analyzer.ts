import OpenAI from "openai";
import { logger } from "./logger";
import type { Product } from "@workspace/db";
import type { AnchorGroup } from "@workspace/db";

/**
 * Returns a client only when credentials are complete.
 * Priority:
 *   1. Replit AI integration (AI_INTEGRATIONS_OPENAI_BASE_URL + AI_INTEGRATIONS_OPENAI_API_KEY)
 *      — provisioned automatically via setupReplitAIIntegrations; no user key required.
 *   2. Direct API key (OPENAI_API_KEY) — user-supplied key, uses public OpenAI API or custom base URL.
 *   3. null → heuristic fallback is used instead.
 *
 * Avoid treating "half-configured" integration env as success — that caused 401s and confusing failures.
 */
function createOpenAIForAnalysis(): OpenAI | null {
  const integrationsUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL?.trim();
  const integrationsKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY?.trim();
  const directKey = process.env.OPENAI_API_KEY?.trim();

  if (integrationsUrl && integrationsKey) {
    logger.info(
      { baseURL: integrationsUrl, mode: "replit-ai-integration" },
      "OpenAI client: using Replit AI integration (AI_INTEGRATIONS_OPENAI_BASE_URL + AI_INTEGRATIONS_OPENAI_API_KEY)",
    );
    return new OpenAI({ baseURL: integrationsUrl, apiKey: integrationsKey });
  }
  if (directKey) {
    const baseURL = process.env.OPENAI_BASE_URL?.trim() ?? "https://api.openai.com/v1";
    logger.info({ baseURL, mode: "direct-api-key" }, "OpenAI client: using direct OPENAI_API_KEY");
    return new OpenAI({ baseURL, apiKey: directKey });
  }
  logger.warn(
    {
      hasIntegrationsUrl: Boolean(integrationsUrl),
      hasIntegrationsKey: Boolean(integrationsKey),
      hasDirectKey: Boolean(directKey),
    },
    "OpenAI client: no valid credentials found — will use heuristic analysis. Set AI_INTEGRATIONS_OPENAI_BASE_URL + AI_INTEGRATIONS_OPENAI_API_KEY (Replit integration) or OPENAI_API_KEY.",
  );
  return null;
}

/** Prefer env; default works on the public OpenAI API. */
const ANALYSIS_MODEL = process.env.OPENAI_ANALYSIS_MODEL ?? "gpt-4o";

export interface ProductAnalysis {
  summary: string;
  anchors: AnchorGroup[];
  // Legacy fields kept for DB compatibility
  mainProductId: number;
  mainProductReason: string;
  crossSellIds: number[];
  crossSellReasons: Record<number, string>;
  upsellIds: number[];
  upsellReasons: Record<number, string>;
}

function toLegacyFields(anchors: AnchorGroup[], products: Product[], summary: string): ProductAnalysis {
  const firstAnchor = anchors[0];
  const crossSellRecs = firstAnchor?.recommendations.filter((r) => r.role === "cross_sell") ?? [];
  const upsellRecs = firstAnchor?.recommendations.filter((r) => r.role === "upsell") ?? [];
  const crossSellIds = crossSellRecs.map((r) => r.productId);
  const upsellIds = upsellRecs.map((r) => r.productId);
  const crossSellReasons: Record<number, string> = {};
  for (const r of crossSellRecs) crossSellReasons[r.productId] = r.reason;
  const upsellReasons: Record<number, string> = {};
  for (const r of upsellRecs) upsellReasons[r.productId] = r.reason;

  return {
    summary,
    anchors,
    mainProductId: firstAnchor?.productId ?? products[0]!.id,
    mainProductReason: firstAnchor?.reason ?? "",
    crossSellIds,
    crossSellReasons,
    upsellIds,
    upsellReasons,
  };
}

/** Rule-based fallback when OpenAI is missing or fails — keeps the pipeline usable for demos and Zid/Salla/Shopify scrapes. */
export function buildHeuristicAnalysis(products: Product[]): ProductAnalysis {
  const pool = products.filter((p) => p.inStock !== false);
  const list = pool.length > 0 ? pool : products;
  const n = list.length;
  const numAnchors = n >= 17 ? 4 : n >= 9 ? 3 : n >= 5 ? 2 : 1;
  const step = Math.max(1, Math.floor(n / (numAnchors + 1)));

  const anchors: AnchorGroup[] = [];
  for (let a = 0; a < numAnchors; a++) {
    const anchorIdx = Math.min(n - 1, a * step);
    const anchor = list[anchorIdx]!;
    const rest = list.filter((p) => p.id !== anchor.id);
    const recs: Product[] = [];
    const seen = new Set<number>([anchor.id]);
    for (const p of rest) {
      if (recs.length >= 4) break;
      if (seen.has(p.id)) continue;
      if (titlesTooSimilar(anchor.title, p.title)) continue;
      if (recs.some((q) => titlesTooSimilar(q.title, p.title))) continue;
      recs.push(p);
      seen.add(p.id);
    }
    let i = 0;
    while (recs.length < 4 && rest.length > 0) {
      const p = rest[i % rest.length]!;
      if (!seen.has(p.id)) {
        if (!titlesTooSimilar(anchor.title, p.title) && !recs.some((q) => titlesTooSimilar(q.title, p.title))) {
          recs.push(p);
          seen.add(p.id);
        }
      }
      i++;
      if (i > rest.length * 3) break;
    }

    const recommendations = recs.slice(0, 4).map((p, j) => ({
      productId: p.id,
      role: (j < 2 ? "cross_sell" : "upsell") as "cross_sell" | "upsell",
      reason:
        j < 2
          ? "منتج مكمّل مناسب لزيادة قيمة السلة."
          : "ترقية أو خيار أعلى قيمة ضمن نفس المتجر.",
      ziadahGoal: j < 2 ? "cross_sell" : "upsell",
      presentationWidget: "صفحة المنتج والسلة",
      addonsHint: "يمكن ربطه بعروض الإضافات أو الحزم.",
      quantityHint: "عروض كمية حسب سياسة المتجر.",
    }));

    anchors.push({
      productId: anchor.id,
      reason: "منتج مميز من كتالوج المتجر — مناسب كنقطة ارتكاز للعروض.",
      anchorGoal: "زيادة قيمة السلة",
      anchorPresentation: "صفحة المنتج ونافذة السلة",
      recommendations,
    });
  }

  const summary =
    "تحليل أولي سريع بناءً على ترتيب المنتجات في الكتالوج (بدون ذكاء اصطناعي أو عند تعذّر الاتصال بالنموذج). لتحليل أعمق ومخصّص، اضبط OPENAI_API_KEY أو مفاتيح التكامل على الخادم.";

  return toLegacyFields(anchors, products, summary);
}

function validateAnchorProductIds(analysis: ProductAnalysis, products: Product[]): boolean {
  const ids = new Set(products.map((p) => p.id));
  for (const a of analysis.anchors) {
    if (!ids.has(a.productId)) return false;
    for (const r of a.recommendations) {
      if (!ids.has(r.productId)) return false;
    }
  }
  return analysis.anchors.length > 0;
}

/** Remove Latin + Arabic digits so "خروف 1" / "خروف 2" compare as the same stem. */
function stripAllDigits(s: string): string {
  return s
    .replace(/[\d\u0660-\u0669\u06F0-\u06F9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeTitle(s: string): Set<string> {
  const cleaned = stripAllDigits(s).toLowerCase();
  return new Set(cleaned.split(/[\s\-–،,.؛:]+/).filter((t) => t.length > 1));
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) {
    if (b.has(x)) inter++;
  }
  return inter / (a.size + b.size - inter);
}

/**
 * True when two product titles are near-duplicates (same animal/SKU line with different numbers,
 * or trivial renames). Used to avoid suggesting "خروف 1" next to "خروف 2" etc.
 */
function titlesTooSimilar(titleA: string, titleB: string): boolean {
  const a = titleA.trim();
  const b = titleB.trim();
  if (a === b) return true;
  const coreA = stripAllDigits(a);
  const coreB = stripAllDigits(b);
  if (coreA.length >= 3 && coreB.length >= 3 && coreA === coreB) return true;

  const ta = tokenizeTitle(a);
  const tb = tokenizeTitle(b);
  const jac = jaccardSimilarity(ta, tb);
  const small = Math.min(ta.size, tb.size);
  if (small >= 2 && jac >= 0.72) return true;

  const na = coreA.toLowerCase();
  const nb = coreB.toLowerCase();
  if (na.length >= 14 && nb.length >= 14 && (na.includes(nb) || nb.includes(na))) {
    const ratio = Math.min(na.length, nb.length) / Math.max(na.length, nb.length);
    if (ratio >= 0.88) return true;
  }
  return false;
}

function filterRecsByTitleDiversity(
  anchorTitle: string,
  recs: AnchorGroup["recommendations"],
  products: Product[],
): AnchorGroup["recommendations"] {
  const byId = new Map(products.map((p) => [p.id, p]));
  const out: AnchorGroup["recommendations"] = [];
  for (const r of recs) {
    const p = byId.get(r.productId);
    if (!p) continue;
    if (titlesTooSimilar(anchorTitle, p.title)) continue;
    if (
      out.some((kept) => {
        const kp = byId.get(kept.productId);
        return kp ? titlesTooSimilar(kp.title, p.title) : false;
      })
    ) {
      continue;
    }
    out.push(r);
  }
  return out;
}

/** LLMs often emit string IDs or wrong numbers — coerce to DB product id */
function parseProductId(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v) && v > 0) return Math.floor(v);
  if (typeof v === "string" && /^\d+$/.test(v.trim())) return parseInt(v.trim(), 10);
  return null;
}

/**
 * Repair LLM output: coerce IDs, drop invalid rows, pad to 4 recs per anchor from catalog.
 */
function sanitizeLlmAnchors(
  raw: { summary?: unknown; anchors?: unknown },
  products: Product[],
): { summary: string; anchors: AnchorGroup[] } {
  const idSet = new Set(products.map((p) => p.id));
  const sortedIds = [...idSet].sort((a, b) => a - b);
  const summary = typeof raw.summary === "string" ? raw.summary : "";

  const rawAnchors = Array.isArray(raw.anchors) ? raw.anchors : [];
  const anchors: AnchorGroup[] = [];

  for (const item of rawAnchors.slice(0, 4)) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const anchorId = parseProductId(o.productId);
    if (!anchorId || !idSet.has(anchorId)) continue;

    const recIn = Array.isArray(o.recommendations) ? o.recommendations : [];
    const used = new Set<number>([anchorId]);
    const recommendations: AnchorGroup["recommendations"] = [];

    for (const r of recIn) {
      if (recommendations.length >= 4) break;
      if (!r || typeof r !== "object") continue;
      const rr = r as Record<string, unknown>;
      let pid = parseProductId(rr.productId);
      if (!pid || !idSet.has(pid) || used.has(pid)) continue;
      used.add(pid);
      recommendations.push({
        productId: pid,
        role: rr.role === "upsell" ? "upsell" : "cross_sell",
        reason: typeof rr.reason === "string" ? rr.reason : "",
        ziadahGoal: typeof rr.ziadahGoal === "string" ? rr.ziadahGoal : undefined,
        presentationWidget: typeof rr.presentationWidget === "string" ? rr.presentationWidget : undefined,
        addonsHint: typeof rr.addonsHint === "string" ? rr.addonsHint : undefined,
        quantityHint: typeof rr.quantityHint === "string" ? rr.quantityHint : undefined,
      });
    }

    const anchorProduct = products.find((p) => p.id === anchorId);
    const anchorTitle = anchorProduct?.title ?? "";
    const deduped = filterRecsByTitleDiversity(anchorTitle, recommendations, products);
    recommendations.length = 0;
    for (const r of deduped) {
      recommendations.push(r);
    }
    used.clear();
    used.add(anchorId);
    for (const r of recommendations) {
      used.add(r.productId);
    }

    let pad = 0;
    for (const pid of sortedIds) {
      if (recommendations.length >= 4) break;
      if (used.has(pid)) continue;
      const cand = products.find((p) => p.id === pid);
      if (!cand) continue;
      if (titlesTooSimilar(anchorTitle, cand.title)) continue;
      if (
        recommendations.some((rec) =>
          titlesTooSimilar(products.find((p) => p.id === rec.productId)!.title, cand.title),
        )
      ) {
        continue;
      }
      used.add(pid);
      const idx = recommendations.length;
      recommendations.push({
        productId: pid,
        role: idx < 2 ? "cross_sell" : "upsell",
        reason:
          idx < 2
            ? "منتج مكمّل مناسب لزيادة قيمة السلة."
            : "ترقية أو خيار أعلى قيمة ضمن نفس المتجر.",
        ziadahGoal: idx < 2 ? "cross_sell" : "upsell",
        presentationWidget: "صفحة المنتج والسلة",
        addonsHint: "يمكن ربطه بعروض الإضافات أو الحزم.",
        quantityHint: "عروض كمية حسب سياسة المتجر.",
      });
      pad++;
      if (pad > 50) break;
    }

    if (recommendations.length === 0) continue;

    anchors.push({
      productId: anchorId,
      reason: typeof o.reason === "string" ? o.reason : "",
      anchorGoal: typeof o.anchorGoal === "string" ? o.anchorGoal : undefined,
      anchorPresentation: typeof o.anchorPresentation === "string" ? o.anchorPresentation : undefined,
      recommendations: recommendations.slice(0, 4),
    });
  }

  return { summary, anchors };
}

async function analyzeProductsWithLLM(
  products: Product[],
  client: OpenAI,
): Promise<ProductAnalysis> {
  const productList = products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description?.substring(0, 200) ?? "",
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    category: p.category,
    tags: p.tags,
    inStock: p.inStock,
  }));

  const prompt = `You are an expert e-commerce strategist specializing in cross-selling and upselling for Saudi e-commerce (Zid, Salla, Shopify).

Analyze this product catalog and identify 4 distinct "anchor" products — these are key products a customer might buy. For each anchor, identify exactly 4 recommended products (mix of cross-sells and upsells).

CRITICAL: Each product in the input has an "id" field — these are the ONLY valid product IDs. You MUST copy those numeric ids exactly in "productId" fields. Do not invent ids or use SKU strings.

Products:
${JSON.stringify(productList, null, 2)}

Respond with JSON in exactly this format:
{
  "summary": "<2-3 sentence Arabic summary of the store's product strategy>",
  "anchors": [
    {
      "productId": <number>,
      "reason": "<Arabic: why this is a strong anchor/hero product>",
      "anchorGoal": "<Arabic: best Ziadah campaign goal for this anchor — e.g. زيادة عناصر السلة، عرض ترقية، عروض كمية، إضافات>",
      "anchorPresentation": "<Arabic: best on-site presentation — e.g. نافذة عند الإضافة للسلة، شريط صفحة المنتج، سلة، صفحة رئيسية>",
      "recommendations": [
        {
          "productId": <number>,
          "role": "cross_sell",
          "reason": "<Arabic>",
          "ziadahGoal": "<short Arabic or English token: more_cart_items | product_swap | quantity_offers | addons | cross_sell | upsell>",
          "presentationWidget": "<Arabic: widget style — e.g. بطاقات مرتبطة، إضافات متعددة، عرض مجمّع>",
          "addonsHint": "<Arabic: how add-ons / bundles could work for this pair>",
          "quantityHint": "<Arabic: quantity / tier suggestion — e.g. عرض 2+1، شراء حبتين>"
        },
        ... exactly 4 objects with roles as specified below
      ]
    }
  ]
}

Rules:
- Select exactly 4 anchor products (different products, ordered by sales potential)
- Each anchor must have exactly 4 recommendations (2 cross-sells + 2 upsells)
- Anchor and recommendation product IDs must all exist in the provided list
- No product can appear as both an anchor and one of its own recommendations
- The same product CAN appear as a recommendation for multiple anchors
- Prefer in-stock products for anchors
- CRITICAL — title diversity within each anchor's 4 recommendations: do NOT pick two products that are essentially the same listing with different numbers or trivial name variants (e.g. "خروف 1" vs "خروف 2", or two lamb boxes that only differ by weight digits). Choose products with clearly distinct titles and roles: complementary add-ons, different cuts/categories, bundles, spices/sides, or a true upgrade — not multiple near-duplicate SKUs.
- IMPORTANT — anchor product selection priority: always prefer products that are widely known and familiar to the general public (everyday items, popular categories like food, clothing, accessories, health & wellness, home goods). If the catalog contains a mix of common products and unusual/niche/obscure products, strongly favor the common ones as anchors. Niche products may appear as recommendations only.
- Fill anchorGoal, anchorPresentation, ziadahGoal, presentationWidget, addonsHint, quantityHint for every anchor and every recommendation (use concise Arabic; ziadahGoal may include English token as shown)
- Write ALL reasons and descriptive fields in Arabic
- Respond ONLY with valid JSON, no markdown`;

  const useJsonMode = process.env.OPENAI_ANALYSIS_JSON_MODE !== "false";

  const createParams = (withJsonMode: boolean) => ({
    model: ANALYSIS_MODEL,
    max_completion_tokens: 4096,
    temperature: 0.25,
    messages: [{ role: "user" as const, content: prompt }],
    ...(withJsonMode ? { response_format: { type: "json_object" as const } } : {}),
  });

  let response;
  try {
    response = await client.chat.completions.create(createParams(useJsonMode));
  } catch (firstErr) {
    if (useJsonMode) {
      logger.warn(
        { err: firstErr instanceof Error ? firstErr.message : String(firstErr) },
        "Chat completion with json_object failed; retrying without response_format",
      );
      response = await client.chat.completions.create(createParams(false));
    } else {
      throw firstErr;
    }
  }

  const content = response.choices[0]?.message?.content ?? "";
  logger.info(
    { contentLength: content.length, finishReason: response.choices[0]?.finish_reason },
    "Got AI analysis response",
  );

  if (!content.trim()) {
    throw new Error("Empty model response");
  }

  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseErr) {
    logger.error({ preview: cleaned.slice(0, 400) }, "Invalid JSON from model");
    throw parseErr instanceof Error ? parseErr : new Error("JSON parse failed");
  }

  const raw = parsed as { summary?: unknown; anchors?: unknown };
  const { summary, anchors } = sanitizeLlmAnchors(raw, products);

  if (anchors.length === 0) {
    throw new Error("Model returned no usable anchors after sanitization");
  }

  const legacy = toLegacyFields(anchors, products, summary);
  if (!validateAnchorProductIds(legacy, products)) {
    throw new Error("Sanitized analysis still has invalid product IDs");
  }
  return legacy;
}

export async function analyzeProducts(products: Product[]): Promise<ProductAnalysis> {
  if (products.length === 0) {
    throw new Error("No products to analyze");
  }

  const client = createOpenAIForAnalysis();
  if (!client) {
    logger.warn(
      "OpenAI not configured (set both AI_INTEGRATIONS_OPENAI_BASE_URL and AI_INTEGRATIONS_OPENAI_API_KEY, or OPENAI_API_KEY); using heuristic analysis.",
    );
    return buildHeuristicAnalysis(products);
  }

  try {
    return await analyzeProductsWithLLM(products, client);
  } catch (err) {
    logger.warn(
      { err: err instanceof Error ? err.message : String(err) },
      "AI analysis failed; using heuristic fallback",
    );
    return buildHeuristicAnalysis(products);
  }
}
