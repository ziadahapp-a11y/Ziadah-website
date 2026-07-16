import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, storesTable, productsTable, analysesTable } from "@workspace/db";
import {
  CreateStoreBody,
  UpdateStoreBody,
  GetStoreParams,
  UpdateStoreParams,
  DeleteStoreParams,
  SyncStoreParams,
  AnalyzeStoreParams,
  ListStoreProductsParams,
  GetLatestAnalysisParams,
  GetRecommendationsParams,
} from "@workspace/api-zod";
import { scrapeStore } from "../lib/store-scraper";
import { analyzeProducts } from "../lib/product-analyzer";
import { generateReportShareToken } from "../lib/reportShareToken";

const router: IRouter = Router();

// List all stores
router.get("/stores", async (_req, res): Promise<void> => {
  const stores = await db.select().from(storesTable).orderBy(desc(storesTable.createdAt));
  res.json(
    stores.map((s) => ({
      ...s,
      lastSyncedAt: s.lastSyncedAt?.toISOString() ?? null,
      lastAnalyzedAt: s.lastAnalyzedAt?.toISOString() ?? null,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }))
  );
});

// Create a store
router.post("/stores", async (req, res): Promise<void> => {
  const parsed = CreateStoreBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [store] = await db.insert(storesTable).values({
    name: parsed.data.name,
    url: parsed.data.url,
    status: "pending",
    reportShareToken: generateReportShareToken(),
  }).returning();

  res.status(201).json({
    ...store,
    lastSyncedAt: store.lastSyncedAt?.toISOString() ?? null,
    lastAnalyzedAt: store.lastAnalyzedAt?.toISOString() ?? null,
    createdAt: store.createdAt.toISOString(),
    updatedAt: store.updatedAt.toISOString(),
  });
});

// Get a single store
router.get("/stores/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetStoreParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  res.json({
    ...store,
    lastSyncedAt: store.lastSyncedAt?.toISOString() ?? null,
    lastAnalyzedAt: store.lastAnalyzedAt?.toISOString() ?? null,
    createdAt: store.createdAt.toISOString(),
    updatedAt: store.updatedAt.toISOString(),
  });
});

// Update a store
router.patch("/stores/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateStoreParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateStoreBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [store] = await db
    .update(storesTable)
    .set(parsed.data)
    .where(eq(storesTable.id, params.data.id))
    .returning();

  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  res.json({
    ...store,
    lastSyncedAt: store.lastSyncedAt?.toISOString() ?? null,
    lastAnalyzedAt: store.lastAnalyzedAt?.toISOString() ?? null,
    createdAt: store.createdAt.toISOString(),
    updatedAt: store.updatedAt.toISOString(),
  });
});

// Delete a store
router.delete("/stores/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteStoreParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.delete(storesTable).where(eq(storesTable.id, params.data.id)).returning();
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  res.sendStatus(204);
});

// Sync store products
router.post("/stores/:id/sync", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = SyncStoreParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  // Update status to syncing
  await db.update(storesTable).set({ status: "synced" }).where(eq(storesTable.id, store.id));

  try {
    const { products, platform, currency, currencySymbol } = await scrapeStore(store.url);

    // Delete existing products and re-insert
    await db.delete(productsTable).where(eq(productsTable.storeId, store.id));

    if (products.length > 0) {
      await db.insert(productsTable).values(
        products.map((p) => ({
          storeId: store.id,
          ...p,
        }))
      );
    }

    // Update store with sync info
    await db.update(storesTable).set({
      platform,
      currency,
      currencySymbol,
      status: "synced",
      productCount: products.length,
      lastSyncedAt: new Date(),
    }).where(eq(storesTable.id, store.id));

    res.json({
      synced: products.length,
      total: products.length,
      platform,
      message: `Successfully synced ${products.length} products from ${platform} store`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await db
      .update(storesTable)
      .set({ status: "error", lastError: message })
      .where(eq(storesTable.id, store.id));
    res.status(400).json({ error: message });
  }
});

// Analyze store with AI
router.post("/stores/:id/analyze", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = AnalyzeStoreParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  const products = await db.select().from(productsTable).where(eq(productsTable.storeId, store.id));
  if (products.length === 0) {
    res.status(400).json({ error: "No products found. Please sync the store first." });
    return;
  }

  await db.update(storesTable).set({ status: "analyzing" }).where(eq(storesTable.id, store.id));

  try {
    const analysis = await analyzeProducts(products);

    // Save analysis
    await db.insert(analysesTable).values({
      storeId: store.id,
      mainProductId: analysis.mainProductId,
      mainProductReason: analysis.mainProductReason,
      crossSellIds: analysis.crossSellIds,
      crossSellReasons: Object.fromEntries(
        Object.entries(analysis.crossSellReasons).map(([k, v]) => [k, v])
      ),
      upsellIds: analysis.upsellIds,
      upsellReasons: Object.fromEntries(
        Object.entries(analysis.upsellReasons).map(([k, v]) => [k, v])
      ),
      summary: analysis.summary,
    });

    // Update product roles
    await db.update(productsTable).set({ role: null }).where(eq(productsTable.storeId, store.id));
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
    }).where(eq(storesTable.id, store.id));

    // Build response
    const mainProduct = products.find((p) => p.id === analysis.mainProductId);
    const crossSells = products.filter((p) => analysis.crossSellIds.includes(p.id));
    const upsells = products.filter((p) => analysis.upsellIds.includes(p.id));

    res.json({
      storeId: store.id,
      analyzedAt: new Date().toISOString(),
      mainProduct: {
        productId: mainProduct!.id,
        title: mainProduct!.title,
        imageUrl: mainProduct!.imageUrl,
        price: mainProduct!.price,
        reason: analysis.mainProductReason,
      },
      crossSells: crossSells.map((p) => ({
        productId: p.id,
        title: p.title,
        imageUrl: p.imageUrl,
        price: p.price,
        reason: analysis.crossSellReasons[p.id] ?? "",
      })),
      upsells: upsells.map((p) => ({
        productId: p.id,
        title: p.title,
        imageUrl: p.imageUrl,
        price: p.price,
        reason: analysis.upsellReasons[p.id] ?? "",
      })),
      summary: analysis.summary,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await db.update(storesTable).set({ status: "error" }).where(eq(storesTable.id, store.id));
    res.status(400).json({ error: message });
  }
});

// List store products
router.get("/stores/:id/products", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = ListStoreProductsParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  const products = await db.select().from(productsTable).where(eq(productsTable.storeId, params.data.id));
  res.json(
    products.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }))
  );
});

// Get latest analysis for store
router.get("/stores/:id/analysis", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetLatestAnalysisParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  const [analysis] = await db
    .select()
    .from(analysesTable)
    .where(eq(analysesTable.storeId, params.data.id))
    .orderBy(desc(analysesTable.createdAt))
    .limit(1);

  if (!analysis) {
    res.status(404).json({ error: "No analysis found for this store" });
    return;
  }

  const products = await db.select().from(productsTable).where(eq(productsTable.storeId, params.data.id));
  const mainProduct = products.find((p) => p.id === analysis.mainProductId);
  const crossSellIds = (analysis.crossSellIds as number[]) ?? [];
  const upsellIds = (analysis.upsellIds as number[]) ?? [];
  const crossSellReasons = (analysis.crossSellReasons as Record<string, string>) ?? {};
  const upsellReasons = (analysis.upsellReasons as Record<string, string>) ?? {};

  const crossSells = products.filter((p) => crossSellIds.includes(p.id));
  const upsells = products.filter((p) => upsellIds.includes(p.id));

  res.json({
    storeId: store.id,
    analyzedAt: analysis.createdAt.toISOString(),
    mainProduct: mainProduct ? {
      productId: mainProduct.id,
      title: mainProduct.title,
      imageUrl: mainProduct.imageUrl,
      price: mainProduct.price,
      reason: analysis.mainProductReason ?? "",
    } : null,
    crossSells: crossSells.map((p) => ({
      productId: p.id,
      title: p.title,
      imageUrl: p.imageUrl,
      price: p.price,
      reason: crossSellReasons[String(p.id)] ?? "",
    })),
    upsells: upsells.map((p) => ({
      productId: p.id,
      title: p.title,
      imageUrl: p.imageUrl,
      price: p.price,
      reason: upsellReasons[String(p.id)] ?? "",
    })),
    summary: analysis.summary,
  });
});

// Get recommendations summary
router.get("/stores/:id/recommendations", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetRecommendationsParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, params.data.id));
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  const [analysis] = await db
    .select()
    .from(analysesTable)
    .where(eq(analysesTable.storeId, params.data.id))
    .orderBy(desc(analysesTable.createdAt))
    .limit(1);

  const mainProductId = analysis?.mainProductId;
  const crossSellIds = (analysis?.crossSellIds as number[]) ?? [];
  const upsellIds = (analysis?.upsellIds as number[]) ?? [];

  let mainProductTitle: string | null = null;
  if (mainProductId) {
    const [mp] = await db.select().from(productsTable).where(eq(productsTable.id, mainProductId));
    mainProductTitle = mp?.title ?? null;
  }

  res.json({
    storeId: store.id,
    storeName: store.name,
    totalProducts: store.productCount,
    mainProductTitle,
    crossSellCount: crossSellIds.length,
    upsellCount: upsellIds.length,
    lastAnalyzedAt: store.lastAnalyzedAt?.toISOString() ?? null,
    status: store.status,
  });
});

export default router;
