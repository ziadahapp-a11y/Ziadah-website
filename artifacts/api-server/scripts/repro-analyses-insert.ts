import { db, productsTable, analysesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { buildHeuristicAnalysis } from "../src/lib/product-analyzer.ts";

function jsonReasons(r: Record<number, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(r).map(([k, v]) => [String(k), v]));
}

function cloneForJson<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

async function main() {
  const storeId = 13;
  await db.delete(analysesTable).where(eq(analysesTable.storeId, storeId));
  const rows = await db.select().from(productsTable).where(eq(productsTable.storeId, storeId));
  console.log("products", rows.length);
  const analysis = buildHeuristicAnalysis(rows);
  try {
    await db.insert(analysesTable).values({
      storeId,
      mainProductId: analysis.mainProductId,
      mainProductReason: analysis.mainProductReason,
      crossSellIds: analysis.crossSellIds,
      crossSellReasons: jsonReasons(analysis.crossSellReasons),
      upsellIds: analysis.upsellIds,
      upsellReasons: jsonReasons(analysis.upsellReasons),
      summary: analysis.summary,
      anchorsJson: cloneForJson(analysis.anchors),
    });
    console.log("insert OK");
  } catch (e) {
    console.error("insert FAIL", e);
    process.exit(1);
  }
}

main();
