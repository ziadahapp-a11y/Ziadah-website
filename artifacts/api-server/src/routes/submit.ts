import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, storesTable, productsTable, analysesTable } from "@workspace/db";
import { scrapeStore } from "../lib/store-scraper";
import { analyzeProducts, buildHeuristicAnalysis } from "../lib/product-analyzer";
import type { AnchorGroup } from "@workspace/db";
import { logger } from "../lib/logger";
import { generateReportShareToken } from "../lib/reportShareToken";

type StoreRow = typeof storesTable.$inferSelect;

async function ensureReportShareToken(storeId: number): Promise<string> {
  const [row] = await db
    .select({ token: storesTable.reportShareToken })
    .from(storesTable)
    .where(eq(storesTable.id, storeId))
    .limit(1);
  if (row?.token) return row.token;
  await db
    .update(storesTable)
    .set({ reportShareToken: generateReportShareToken() })
    .where(eq(storesTable.id, storeId));
  const [again] = await db
    .select({ token: storesTable.reportShareToken })
    .from(storesTable)
    .where(eq(storesTable.id, storeId))
    .limit(1);
  if (!again?.token) throw new Error("report share token missing after ensure");
  return again.token;
}

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

/** JSONB-safe reasons (numeric keys → string keys for Postgres drivers). */
function jsonReasons(r: Record<number, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(r).map(([k, v]) => [String(k), v]));
}

/** Ensure nested analysis payload is JSON-serializable (strip undefined, etc.). */
function cloneForJson<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

/** Postgres text columns reject NUL bytes; some SDK errors include them. */
function safeErrText(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  return raw.replace(/\0/g, "").slice(0, 8000);
}

async function updateStoreAnalyzed(storeId: number): Promise<void> {
  try {
    await db
      .update(storesTable)
      .set({
        status: "analyzed",
        lastAnalyzedAt: new Date(),
        lastError: null,
      })
      .where(eq(storesTable.id, storeId));
  } catch (e) {
    logger.warn({ storeId, err: e instanceof Error ? e.message : String(e) }, "analyzed update without last_error");
    await db
      .update(storesTable)
      .set({
        status: "analyzed",
        lastAnalyzedAt: new Date(),
      })
      .where(eq(storesTable.id, storeId));
  }
  try {
    await ensureReportShareToken(storeId);
  } catch (e) {
    logger.warn({ storeId, err: e instanceof Error ? e.message : String(e) }, "ensureReportShareToken after analyzed");
  }
}

async function updateStoreError(storeId: number, message: string): Promise<void> {
  const text = safeErrText(message);
  try {
    await db
      .update(storesTable)
      .set({ status: "error", lastError: text })
      .where(eq(storesTable.id, storeId));
  } catch (e) {
    logger.warn({ storeId, err: e instanceof Error ? e.message : String(e) }, "error update without last_error");
    await db.update(storesTable).set({ status: "error" }).where(eq(storesTable.id, storeId));
  }
}

/**
 * Validate and coerce analysis product IDs against the actual DB rows for this store.
 * Filters out any IDs that don't exist in the database so the insert/update never references
 * a non-existent product row (avoids silent FK-less orphan issues and aids debugging).
 */
function reconcileAnalysisIds(
  analysis: Awaited<ReturnType<typeof analyzeProducts>>,
  storeProductIds: Set<number>,
): Awaited<ReturnType<typeof analyzeProducts>> {
  const mainProductId = storeProductIds.has(analysis.mainProductId)
    ? analysis.mainProductId
    : ([...storeProductIds][0] ?? analysis.mainProductId);

  const crossSellIds = analysis.crossSellIds.filter((id) => storeProductIds.has(id));
  const upsellIds = analysis.upsellIds.filter((id) => storeProductIds.has(id));

  const crossSellReasons: Record<number, string> = {};
  for (const id of crossSellIds) {
    if (analysis.crossSellReasons[id]) crossSellReasons[id] = analysis.crossSellReasons[id]!;
  }
  const upsellReasons: Record<number, string> = {};
  for (const id of upsellIds) {
    if (analysis.upsellReasons[id]) upsellReasons[id] = analysis.upsellReasons[id]!;
  }

  const anchors = analysis.anchors
    .filter((a) => storeProductIds.has(a.productId))
    .map((a) => ({
      ...a,
      recommendations: a.recommendations.filter((r) => storeProductIds.has(r.productId)),
    }));

  return {
    ...analysis,
    mainProductId,
    crossSellIds,
    crossSellReasons,
    upsellIds,
    upsellReasons,
    anchors,
  };
}

async function persistAnalysisAndFinish(storeId: number, analysis: Awaited<ReturnType<typeof analyzeProducts>>): Promise<void> {
  logger.info(
    {
      storeId,
      mainProductId: analysis.mainProductId,
      anchorCount: analysis.anchors.length,
      crossSellCount: analysis.crossSellIds.length,
      upsellCount: analysis.upsellIds.length,
      summaryLength: analysis.summary?.length ?? 0,
    },
    "persistAnalysisAndFinish: starting DB save",
  );

  // Validate product IDs against what actually exists in the DB for this store.
  // This prevents transaction failures caused by referencing product IDs that were
  // inserted in this same pipeline run but may have been re-assigned new serial IDs.
  const dbProductRows = await db.select({ id: productsTable.id }).from(productsTable).where(eq(productsTable.storeId, storeId));
  const storeProductIds = new Set(dbProductRows.map((r) => r.id));

  if (storeProductIds.size === 0) {
    throw new Error(`persistAnalysisAndFinish: no products found in DB for store ${storeId} — cannot persist analysis`);
  }

  const reconciledAnalysis = reconcileAnalysisIds(analysis, storeProductIds);

  const discardedCrossSell = analysis.crossSellIds.filter((id) => !storeProductIds.has(id));
  const discardedUpsell = analysis.upsellIds.filter((id) => !storeProductIds.has(id));
  if (discardedCrossSell.length > 0 || discardedUpsell.length > 0) {
    logger.warn(
      { storeId, discardedCrossSell, discardedUpsell },
      "persistAnalysisAndFinish: discarded product IDs not found in DB",
    );
  }

  const insertPayload = {
    storeId,
    mainProductId: reconciledAnalysis.mainProductId,
    mainProductReason: reconciledAnalysis.mainProductReason ?? "",
    crossSellIds: reconciledAnalysis.crossSellIds,
    crossSellReasons: jsonReasons(reconciledAnalysis.crossSellReasons),
    upsellIds: reconciledAnalysis.upsellIds,
    upsellReasons: jsonReasons(reconciledAnalysis.upsellReasons),
    summary: reconciledAnalysis.summary ?? "",
    anchorsJson: cloneForJson(reconciledAnalysis.anchors),
  };

  try {
    await db.transaction(async (tx) => {
      logger.debug({ storeId }, "persistAnalysisAndFinish: inserting analysis row");
      await tx.insert(analysesTable).values(insertPayload);

      logger.debug({ storeId }, "persistAnalysisAndFinish: resetting product roles");
      await tx.update(productsTable).set({ role: null }).where(eq(productsTable.storeId, storeId));

      logger.debug({ storeId, mainProductId: reconciledAnalysis.mainProductId }, "persistAnalysisAndFinish: setting main role");
      await tx.update(productsTable).set({ role: "main" }).where(eq(productsTable.id, reconciledAnalysis.mainProductId));

      for (const id of reconciledAnalysis.crossSellIds) {
        await tx.update(productsTable).set({ role: "cross_sell" }).where(eq(productsTable.id, id));
      }
      for (const id of reconciledAnalysis.upsellIds) {
        await tx.update(productsTable).set({ role: "upsell" }).where(eq(productsTable.id, id));
      }
    });
  } catch (txErr) {
    logger.error(
      {
        storeId,
        err: safeErrText(txErr),
        insertPayloadSummary: {
          mainProductId: insertPayload.mainProductId,
          crossSellCount: insertPayload.crossSellIds.length,
          upsellCount: insertPayload.upsellIds.length,
          anchorCount: insertPayload.anchorsJson.length,
          storeProductIdCount: storeProductIds.size,
        },
      },
      "persistAnalysisAndFinish: transaction failed",
    );
    throw txErr;
  }

  await updateStoreAnalyzed(storeId);
  logger.info({ storeId }, "persistAnalysisAndFinish: complete");
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

    await persistAnalysisAndFinish(storeId, analysis);

    logger.info({ storeId }, "Pipeline complete");
  } catch (err) {
    const message = safeErrText(err);
    logger.error({ storeId, err: message }, "Pipeline failed");

    try {
      const rows = await db.select().from(productsTable).where(eq(productsTable.storeId, storeId));

      if (rows.length > 0) {
        try {
          await db.delete(analysesTable).where(eq(analysesTable.storeId, storeId));
          const fallback = buildHeuristicAnalysis(rows);
          await persistAnalysisAndFinish(storeId, fallback);
          logger.warn(
            { storeId, originalErr: message },
            "Pipeline recovered with heuristic analysis after primary path failed",
          );
          return;
        } catch (recoveryErr) {
          logger.error(
            { storeId, err: safeErrText(recoveryErr) },
            "Heuristic recovery failed",
          );
        }
      }

      await updateStoreError(storeId, message);
    } catch (inner) {
      logger.error({ storeId, err: safeErrText(inner) }, "Pipeline error handler failed");
      try {
        await updateStoreError(storeId, `Pipeline error: ${message}. Follow-up: ${safeErrText(inner)}`);
      } catch {
        /* ignore */
      }
    }
  }
}

async function buildSubmitStatusPayloadForStore(store: StoreRow): Promise<Record<string, unknown>> {
  const id = store.id;
  const reportShareToken = await ensureReportShareToken(id);

  const base: Record<string, unknown> = {
    storeId: store.id,
    status: store.status,
    platform: store.platform,
    productCount: store.productCount,
    industry: store.industry,
    currency: store.currency ?? "SAR",
    currencySymbol: store.currencySymbol ?? "ر.س",
    storeName: store.name,
    storeUrl: store.url,
    /** Cleared when analysis succeeded. If status is error but last_error is empty (legacy updates), show a hint. */
    errorMessage:
      store.status === "analyzed"
        ? null
        : store.status === "error"
          ? (store.lastError?.trim() ||
              "Server error (no stored detail). Redeploy the latest API, check logs, and ensure DB migrations are applied (stores.last_error, analyses.anchors_json).")
          : (store.lastError ?? null),
    monthlyUsers: store.monthlyUsers,
    conversionRate: store.conversionRate,
    avgOrderValue: store.avgOrderValue,
    reportShareToken,
  };

  if (store.status !== "analyzed") {
    return base;
  }

  const [analysis] = await db
    .select()
    .from(analysesTable)
    .where(eq(analysesTable.storeId, id))
    .orderBy(desc(analysesTable.createdAt))
    .limit(1);

  if (!analysis) {
    return base;
  }

  const products = await db.select().from(productsTable).where(eq(productsTable.storeId, id));

  const fmt = (p: (typeof products)[0]) => ({
    productId: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    price: p.price,
    productUrl: p.productUrl,
  });

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
        anchor: {
          ...fmt(productMap.get(a.productId)!),
          reason: a.reason,
          anchorGoal: a.anchorGoal,
          anchorPresentation: a.anchorPresentation,
        },
        recommendations: a.recommendations
          .filter((r) => productMap.has(r.productId))
          .slice(0, 4)
          .map((r) => ({
            ...fmt(productMap.get(r.productId)!),
            role: r.role,
            reason: r.reason,
            ziadahGoal: r.ziadahGoal,
            presentationWidget: r.presentationWidget,
            addonsHint: r.addonsHint,
            quantityHint: r.quantityHint,
          })),
      }));
  } else {
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

  return {
    ...base,
    errorMessage: null,
    analyzedAt: analysis.createdAt.toISOString(),
    summary: analysis.summary,
    crossSellCount: crossSellIds.length,
    upsellCount: upsellIds.length,
    anchorGroups,
  };
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
    reportShareToken: generateReportShareToken(),
  }).returning();

  runPipeline(store.id, url).catch((e) => {
    logger.error({ storeId: store.id, err: safeErrText(e) }, "runPipeline rejected");
  });
  res.status(201).json({ storeId: store.id, reportShareToken: store.reportShareToken });
});

/** Re-run scrape + analysis for an existing store (same URL). Fixes UX where "Try again" only reset the form. */
router.post("/submit/:id/retry", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId ?? "", 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, id));
  if (!store) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  try {
    await db
      .update(storesTable)
      .set({
        status: "syncing",
        lastError: null,
      })
      .where(eq(storesTable.id, id));
  } catch (e) {
    logger.warn({ id, err: safeErrText(e) }, "retry: could not clear last_error; continuing");
    await db.update(storesTable).set({ status: "syncing" }).where(eq(storesTable.id, id));
  }

  runPipeline(id, store.url).catch((e) => {
    logger.error({ storeId: id, err: safeErrText(e) }, "runPipeline retry rejected");
  });

  res.json({ ok: true, storeId: id });
});

/** Full report payload (including analyzed results) — use opaque token, not sequential store id. */
router.get("/submit/share/:token/status", async (req, res): Promise<void> => {
  const token = String(req.params.token ?? "").trim();
  if (!token || token.length > 128) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }
  const [store] = await db.select().from(storesTable).where(eq(storesTable.reportShareToken, token)).limit(1);
  if (!store) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const payload = await buildSubmitStatusPayloadForStore(store);
  res.json(payload);
});

/**
 * Pipeline progress by numeric store id (same session). When status is `analyzed`, full report is not returned —
 * use `GET /submit/share/:token/status` so public report data is not enumerable by id.
 */
router.get("/submit/:id/status", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [store] = await db.select().from(storesTable).where(eq(storesTable.id, id));
  if (!store) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  if (store.status === "analyzed") {
    const reportShareToken = await ensureReportShareToken(store.id);
    res.status(403).json({
      error: "public_report_requires_token",
      reportShareToken,
      storeId: store.id,
    });
    return;
  }

  const payload = await buildSubmitStatusPayloadForStore(store);
  res.json(payload);
});

export default router;
