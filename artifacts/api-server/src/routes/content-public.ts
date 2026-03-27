import { Router } from "express";
import { eq } from "drizzle-orm";
import { contentBlocksTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../lib/api-response";
import { routeParam } from "../lib/route-params";

const router = Router();

router.get("/content", async (_req, res) => {
  try {
    const rows = await db.select().from(contentBlocksTable);
    const map: Record<string, string> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    jsonSuccess(res, map);
  } catch (err) {
    console.error("GET /api/content", err);
    jsonError(res, "Failed to load content", 500);
  }
});

router.get("/content/:key", async (req, res) => {
  const key = routeParam(req, "key");
  if (!key) {
    jsonError(res, "Missing content key", 400);
    return;
  }
  try {
    const [row] = await db
      .select()
      .from(contentBlocksTable)
      .where(eq(contentBlocksTable.key, key))
      .limit(1);
    if (!row) {
      jsonError(res, "Content block not found", 404);
      return;
    }
    jsonSuccess(res, { key: row.key, value: row.value, type: row.type });
  } catch (err) {
    console.error("GET /api/content/:key", err);
    jsonError(res, "Failed to load content", 500);
  }
});

export default router;
