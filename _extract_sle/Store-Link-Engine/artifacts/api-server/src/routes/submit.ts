import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, storesTable, productsTable, analysesTable } from "@workspace/db";
import { scrapeStore } from "../lib/store-scraper";
import { analyzeProducts, type AnchorGroup } from "../lib/product-analyzer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function validateSubmit(body: Record<string, unknown>): { error: string } | null {
  const { url, industry } = body;
  if (!url || typeof url !== "string") return { error: "Store URL is required" };
  try { new URL(url); } catch { return { error: "Please enter a valid URL (include https://)" }; }
  if (!industry || typeof industry !== "string") return { error: "Industry is required" };
  return null;
}

function nameFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host.split(".")[0]!.charAt(0).toUpperCase() + host.split(".")[0]!.slice(1);
  } catch {
    return "Store";
  }
}

async function runPipeline(storeId: number, url: string): Promise<void> {
  try {
    const { products, platform, currency, currencySymbol } = await scrapeStore(url);

    await db.delete(productsTable).where(eq(productsTable.storeId, storeId));
    if (products.length > 0) {
      await db.insert(productsTable).values(products.map((p) => ({ storeId, ...p })));
    }

    await db.update(storesTable).set({
      platform, currency, currencySymbol,
      status: "analyzing",
      productCount: products.length,
      lastSyncedAt: new Date(),
    }).where(eq(storesTable.id, storeId));

    const dbProducts = await db.select().from(productsTable).where(eq(productsTable.storeId, storeId));
    const analysis = await analyzeProducts(dbProducts);

    await db.insert(analysesTable).values({
      storeId,
      mainProductId: analysis.mainProductId,
      mainProductReason: analysis.mainProductReason,
      crossSellIds: analysis.crossSellIds,
      crossSellReasons: analysis.crossSellReasons,
      upsellIds: analysis.upsellIds,
      upsellReasons: analysis.upsellReasons,
      summary: analysis.summary,
      anchorsJson: analysis.anchors,
    });

    // Update product roles from first anchor
    await db.update(productsTable).set({ role: null }).where(eq(productsTable.storeId, storeId));
    await db.update(productsTable).set({ role: "main" }).where(eq(productsTable.id, analysis.mainProductId));
    for (const id of analysis.crossSellIds) {
      await db.update(productsTable).set({ role: "cross_sell" }).where(eq(productsTable.id, id));
    }
    for (const id of analysis.upsellIds) {
      await db.update(productsTable).set({ role: "upsell" }).where(eq(productsTable.id, id));
    }

    await db.update(storesTable).set({
      status: "analyzed",
      lastAnalyzedAt: new Date(),
    }).where(eq(storesTable.id, storeId));

    logger.info({ storeId }, "Pipeline complete");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ storeId, err: message }, "Pipeline failed");
    await db.update(storesTable).set({ status: "error" }).where(eq(storesTable.id, storeId));
  }
}

router.post("/submit", async (req, res): Promise<void> => {
  const validationError = validateSubmit(req.body as Record<string, unknown>);
  if (validationError) {
    res.status(400).json(validationError);
    return;
  }

  const { url, industry, monthlyUsers, conversionRate, avgOrderValue } = req.body as {
    url: string; industry: string;
    monthlyUsers?: number | null;
    conversionRate?: number | null;
    avgOrderValue?: number | null;
  };

  const [store] = await db.insert(storesTable).values({
    name: nameFromUrl(url), url, industry,
    monthlyUsers: monthlyUsers ?? null,
    conversionRate: conversionRate ?? null,
    avgOrderValue: avgOrderValue ?? null,
    status: "syncing",
  }).returning();

  runPipeline(store.id, url).catch(() => {});
  res.status(201).json({ storeId: store.id });
});

router.get("/submit/:id/status", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, id));
  if (!store) { res.status(404).json({ error: "Not found" }); return; }

  const base = {
    storeId: store.id,
    status: store.status,
    platform: store.platform,
    productCount: store.productCount,
    industry: store.industry,
    currency: store.currency ?? "SAR",
    currencySymbol: store.currencySymbol ?? "ر.س",
    storeName: store.name,
    storeUrl: store.url,
  };

  if (store.status !== "analyzed") { res.json(base); return; }

  const [analysis] = await db
    .select()
    .from(analysesTable)
    .where(eq(analysesTable.storeId, id))
    .orderBy(desc(analysesTable.createdAt))
    .limit(1);

  if (!analysis) { res.json(base); return; }

  const products = await db.select().from(productsTable).where(eq(productsTable.storeId, id));

  const fmt = (p: typeof products[0]) => ({
    productId: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    price: p.price,
    productUrl: p.productUrl,
  });

  // Try new anchorsJson first, fall back to legacy pairs
  const rawAnchors = (analysis.anchorsJson as AnchorGroup[] | null) ?? null;

  let anchorGroups: Array<{
    anchor: ReturnType<typeof fmt> & { reason: string };
    recommendations: Array<ReturnType<typeof fmt> & { role: string; reason: string }>;
  }>;

  if (rawAnchors && rawAnchors.length > 0) {
    const productMap = new Map(products.map((p) => [p.id, p]));
    anchorGroups = rawAnchors
      .filter((a) => productMap.has(a.productId))
      .map((a) => ({
        anchor: { ...fmt(productMap.get(a.productId)!), reason: a.reason },
        recommendations: a.recommendations
          .filter((r) => productMap.has(r.productId))
          .slice(0, 4)
          .map((r) => ({ ...fmt(productMap.get(r.productId)!), role: r.role, reason: r.reason })),
      }));
  } else {
    // Legacy: build from flat crossSell/upsell arrays
    const crossSellIds = (analysis.crossSellIds as number[]) ?? [];
    const upsellIds = (analysis.upsellIds as number[]) ?? [];
    const crossSellReasons = (analysis.crossSellReasons as Record<string, string>) ?? {};
    const upsellReasons = (analysis.upsellReasons as Record<string, string>) ?? {};
    const mainProduct = products.find((p) => p.id === analysis.mainProductId);
    const crossSells = products.filter((p) => crossSellIds.includes(p.id));
    const upsells = products.filter((p) => upsellIds.includes(p.id));

    const recs = [
      ...crossSells.slice(0, 2).map((p) => ({ ...fmt(p), role: "cross_sell", reason: crossSellReasons[String(p.id)] ?? "" })),
      ...upsells.slice(0, 2).map((p) => ({ ...fmt(p), role: "upsell", reason: upsellReasons[String(p.id)] ?? "" })),
    ].slice(0, 4);

    anchorGroups = mainProduct
      ? [{ anchor: { ...fmt(mainProduct), reason: analysis.mainProductReason ?? "" }, recommendations: recs }]
      : [];
  }

  const crossSellIds = (analysis.crossSellIds as number[]) ?? [];
  const upsellIds = (analysis.upsellIds as number[]) ?? [];

  res.json({
    ...base,
    analyzedAt: analysis.createdAt.toISOString(),
    summary: analysis.summary,
    crossSellCount: crossSellIds.length,
    upsellCount: upsellIds.length,
    anchorGroups,
  });
});

export default router;
