import OpenAI from "openai";
import { logger } from "./logger";
import type { Product } from "@workspace/db";
import type { AnchorGroup } from "@workspace/db";

/**
 * Returns a client only when credentials are complete.
 * Replit integrations require BOTH base URL and API key; OPENAI_API_KEY alone uses the public API.
 * Avoid treating "half-configured" integration env as success — that caused 401s and confusing failures.
 */
function createOpenAIForAnalysis(): OpenAI | null {
  const integrationsUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL?.trim();
  const integrationsKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY?.trim();
  const directKey = process.env.OPENAI_API_KEY?.trim();

  if (integrationsUrl && integrationsKey) {
    return new OpenAI({ baseURL: integrationsUrl, apiKey: integrationsKey });
  }
  if (directKey) {
    return new OpenAI({
      baseURL: process.env.OPENAI_BASE_URL?.trim() ?? "https://api.openai.com/v1",
      apiKey: directKey,
    });
  }
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
function buildHeuristicAnalysis(products: Product[]): ProductAnalysis {
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
      if (!seen.has(p.id)) {
        recs.push(p);
        seen.add(p.id);
      }
    }
    let i = 0;
    while (recs.length < 4 && rest.length > 0) {
      const p = rest[i % rest.length]!;
      if (!seen.has(p.id)) {
        recs.push(p);
        seen.add(p.id);
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
- IMPORTANT — anchor product selection priority: always prefer products that are widely known and familiar to the general public (everyday items, popular categories like food, clothing, accessories, health & wellness, home goods). If the catalog contains a mix of common products and unusual/niche/obscure products, strongly favor the common ones as anchors. Niche products may appear as recommendations only.
- Fill anchorGoal, anchorPresentation, ziadahGoal, presentationWidget, addonsHint, quantityHint for every anchor and every recommendation (use concise Arabic; ziadahGoal may include English token as shown)
- Write ALL reasons and descriptive fields in Arabic
- Respond ONLY with valid JSON, no markdown`;

  const response = await client.chat.completions.create({
    model: ANALYSIS_MODEL,
    max_completion_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content ?? "";
  logger.info({ contentLength: content.length }, "Got AI analysis response");

  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const raw = JSON.parse(cleaned) as {
    summary: string;
    anchors: Array<{
      productId: number;
      reason: string;
      anchorGoal?: string;
      anchorPresentation?: string;
      recommendations: Array<{
        productId: number;
        role: string;
        reason: string;
        ziadahGoal?: string;
        presentationWidget?: string;
        addonsHint?: string;
        quantityHint?: string;
      }>;
    }>;
  };

  const anchors: AnchorGroup[] = (raw.anchors ?? []).slice(0, 4).map((a) => ({
    productId: a.productId,
    reason: a.reason ?? "",
    anchorGoal: a.anchorGoal,
    anchorPresentation: a.anchorPresentation,
    recommendations: (a.recommendations ?? []).slice(0, 4).map((r) => ({
      productId: r.productId,
      role: (r.role === "upsell" ? "upsell" : "cross_sell") as "cross_sell" | "upsell",
      reason: r.reason ?? "",
      ziadahGoal: r.ziadahGoal,
      presentationWidget: r.presentationWidget,
      addonsHint: r.addonsHint,
      quantityHint: r.quantityHint,
    })),
  }));

  const legacy = toLegacyFields(anchors, products, raw.summary ?? "");
  if (!validateAnchorProductIds(legacy, products)) {
    throw new Error("LLM returned invalid or empty product IDs");
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
