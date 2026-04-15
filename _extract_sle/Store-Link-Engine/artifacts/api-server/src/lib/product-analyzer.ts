import OpenAI from "openai";
import { logger } from "./logger";
import type { Product } from "@workspace/db";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY ?? "dummy",
});

export interface AnchorRecommendation {
  productId: number;
  role: "cross_sell" | "upsell";
  reason: string;
}

export interface AnchorGroup {
  productId: number;
  reason: string;
  recommendations: AnchorRecommendation[];
}

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

export async function analyzeProducts(products: Product[]): Promise<ProductAnalysis> {
  if (products.length === 0) {
    throw new Error("No products to analyze");
  }

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

  const prompt = `You are an expert e-commerce strategist specializing in cross-selling and upselling.

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
      "recommendations": [
        { "productId": <number>, "role": "cross_sell", "reason": "<Arabic: why recommend alongside anchor>" },
        { "productId": <number>, "role": "cross_sell", "reason": "<Arabic: why recommend alongside anchor>" },
        { "productId": <number>, "role": "upsell", "reason": "<Arabic: why this is a premium upgrade>" },
        { "productId": <number>, "role": "upsell", "reason": "<Arabic: why this is a premium upgrade>" }
      ]
    }
  ]
}

Rules:
- Select exactly 4 anchor products (different products, ordered by sales potential)
- Each anchor must have exactly 4 recommendations (2 cross-sells + 2 upsells ideally)
- Anchor and recommendation product IDs must all exist in the provided list
- No product can appear as both an anchor and one of its own recommendations
- The same product CAN appear as a recommendation for multiple anchors
- Prefer in-stock products for anchors
- IMPORTANT — anchor product selection priority: always prefer products that are widely known and familiar to the general public (everyday items, popular categories like food, clothing, accessories, health & wellness, home goods). If the catalog contains a mix of common products and unusual/niche/obscure products, strongly favor the common ones as anchors. Niche products may appear as recommendations only.
- Write ALL reasons in Arabic
- Respond ONLY with valid JSON, no markdown`;

  const response = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content ?? "";
  logger.info({ contentLength: content.length }, "Got AI analysis response");

  try {
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const raw = JSON.parse(cleaned) as {
      summary: string;
      anchors: Array<{
        productId: number;
        reason: string;
        recommendations: Array<{ productId: number; role: string; reason: string }>;
      }>;
    };

    const anchors: AnchorGroup[] = (raw.anchors ?? []).slice(0, 4).map((a) => ({
      productId: a.productId,
      reason: a.reason ?? "",
      recommendations: (a.recommendations ?? []).slice(0, 4).map((r) => ({
        productId: r.productId,
        role: (r.role === "upsell" ? "upsell" : "cross_sell") as "cross_sell" | "upsell",
        reason: r.reason ?? "",
      })),
    }));

    // Derive legacy fields from first anchor for backwards compat
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
      summary: raw.summary ?? "",
      anchors,
      mainProductId: firstAnchor?.productId ?? products[0]!.id,
      mainProductReason: firstAnchor?.reason ?? "",
      crossSellIds,
      crossSellReasons,
      upsellIds,
      upsellReasons,
    };
  } catch (err) {
    logger.error({ err, content }, "Failed to parse AI analysis response");
    throw new Error("AI returned invalid JSON response");
  }
}
