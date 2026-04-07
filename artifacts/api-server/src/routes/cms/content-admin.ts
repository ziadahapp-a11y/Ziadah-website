import { Router } from "express";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import {
  contentBlocksTable,
  db,
} from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import { insertAuditLog } from "../../lib/audit";
import {
  requireCmsAuth,
  requireEditor,
  requireSuperAdmin,
  requireViewer,
} from "../../middleware/cms-auth";
import { blockViewerWrites } from "../../middleware/cms-viewer-readonly";
import { routeParam } from "../../lib/route-params";

const router = Router();

router.use(requireCmsAuth);
router.use(blockViewerWrites);

const blockTypeSchema = z.enum([
  "text",
  "richtext",
  "image_url",
  "color",
  "number",
  "boolean",
]);

const createBlockSchema = z.object({
  key: z.string().min(1).max(512),
  value: z.string().default(""),
  type: blockTypeSchema,
  page: z.string().min(1).max(128),
  section: z.string().min(1).max(128),
  label: z.string().min(1).max(512),
});

const updateBlockSchema = z.object({
  value: z.string().optional(),
  type: blockTypeSchema.optional(),
  page: z.string().min(1).max(128).optional(),
  section: z.string().min(1).max(128).optional(),
  label: z.string().min(1).max(512).optional(),
});

const bulkUpdateSchema = z.object({
  updates: z
    .array(
      z.object({
        key: z.string().min(1).max(512),
        patch: updateBlockSchema,
      }),
    )
    .min(1)
    .max(250),
});

router.get("/", requireViewer, async (req, res) => {
  const page = typeof req.query["page"] === "string" ? req.query["page"] : undefined;
  const section =
    typeof req.query["section"] === "string" ? req.query["section"] : undefined;
  try {
    const conditions = [];
    if (page) conditions.push(eq(contentBlocksTable.page, page));
    if (section) conditions.push(eq(contentBlocksTable.section, section));
    const rows =
      conditions.length > 0
        ? await db
            .select()
            .from(contentBlocksTable)
            .where(and(...conditions))
        : await db.select().from(contentBlocksTable);
    jsonSuccess(res, { blocks: rows });
  } catch (err) {
    console.error("GET /api/cms/content", err);
    jsonError(res, "Failed to load content blocks", 500);
  }
});

router.put("/bulk", requireEditor, async (req, res) => {
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = bulkUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }

  const updates = parsed.data.updates;
  const keys = [...new Set(updates.map((u) => u.key))];
  if (keys.length !== updates.length) {
    jsonError(res, "Duplicate keys in bulk update payload", 400);
    return;
  }

  try {
    const existingRows =
      keys.length === 0
        ? []
        : await db
            .select()
            .from(contentBlocksTable)
            .where(inArray(contentBlocksTable.key, keys));
    const byKey = new Map(existingRows.map((r) => [r.key, r]));
    const missingKeys = keys.filter((k) => !byKey.has(k));
    if (missingKeys.length > 0) {
      jsonError(
        res,
        `Content block not found: ${missingKeys.slice(0, 10).join(", ")}${
          missingKeys.length > 10 ? "…" : ""
        }`,
        404,
      );
      return;
    }

    const updatedBlocks = [];
    for (const u of updates) {
      const existing = byKey.get(u.key);
      if (!existing) continue;
      const patch = u.patch;
      const nextRow = {
        ...existing,
        ...(patch.value !== undefined ? { value: patch.value } : {}),
        ...(patch.type !== undefined ? { type: patch.type } : {}),
        ...(patch.page !== undefined ? { page: patch.page } : {}),
        ...(patch.section !== undefined ? { section: patch.section } : {}),
        ...(patch.label !== undefined ? { label: patch.label } : {}),
        updatedAt: new Date(),
        updatedBy: user.id,
      };

      const [updated] = await db
        .update(contentBlocksTable)
        .set({
          value: nextRow.value,
          type: nextRow.type,
          page: nextRow.page,
          section: nextRow.section,
          label: nextRow.label,
          updatedAt: nextRow.updatedAt,
          updatedBy: nextRow.updatedBy,
        })
        .where(eq(contentBlocksTable.key, u.key))
        .returning();
      if (!updated) {
        jsonError(res, `Update failed for key: ${u.key}`, 500);
        return;
      }

      await insertAuditLog({
        userId: user.id,
        action: "UPDATE_CONTENT",
        targetTable: "content_blocks",
        targetId: updated.id,
        oldValue: existing as unknown as Record<string, unknown>,
        newValue: updated as unknown as Record<string, unknown>,
        timestamp: new Date(),
      });

      updatedBlocks.push(updated);
    }

    jsonSuccess(res, { blocks: updatedBlocks });
  } catch (err) {
    console.error("PUT /api/cms/content/bulk", err);
    jsonError(res, "Failed to bulk update content blocks", 500);
  }
});

router.put("/:key", requireEditor, async (req, res) => {
  const key = routeParam(req, "key");
  if (!key) {
    jsonError(res, "Missing key", 400);
    return;
  }
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = updateBlockSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(contentBlocksTable)
      .where(eq(contentBlocksTable.key, key))
      .limit(1);
    if (!existing) {
      jsonError(res, "Content block not found", 404);
      return;
    }
    const patch = parsed.data;
    const nextRow = {
      ...existing,
      ...(patch.value !== undefined ? { value: patch.value } : {}),
      ...(patch.type !== undefined ? { type: patch.type } : {}),
      ...(patch.page !== undefined ? { page: patch.page } : {}),
      ...(patch.section !== undefined ? { section: patch.section } : {}),
      ...(patch.label !== undefined ? { label: patch.label } : {}),
      updatedAt: new Date(),
      updatedBy: user.id,
    };
    const [updated] = await db
      .update(contentBlocksTable)
      .set({
        value: nextRow.value,
        type: nextRow.type,
        page: nextRow.page,
        section: nextRow.section,
        label: nextRow.label,
        updatedAt: nextRow.updatedAt,
        updatedBy: nextRow.updatedBy,
      })
      .where(eq(contentBlocksTable.key, key))
      .returning();
    if (!updated) {
      jsonError(res, "Update failed", 500);
      return;
    }
    await insertAuditLog({
      userId: user.id,
      action: "UPDATE_CONTENT",
      targetTable: "content_blocks",
      targetId: updated.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: updated as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { block: updated });
  } catch (err) {
    console.error("PUT /api/cms/content/:key", err);
    jsonError(res, "Failed to update content block", 500);
  }
});

router.post("/", requireSuperAdmin, async (req, res) => {
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = createBlockSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  const body = parsed.data;
  try {
    const [created] = await db
      .insert(contentBlocksTable)
      .values({
        key: body.key,
        value: body.value,
        type: body.type,
        page: body.page,
        section: body.section,
        label: body.label,
        updatedAt: new Date(),
        updatedBy: user.id,
      })
      .returning();
    if (!created) {
      jsonError(res, "Create failed", 500);
      return;
    }
    await insertAuditLog({
      userId: user.id,
      action: "CREATE_CONTENT",
      targetTable: "content_blocks",
      targetId: created.id,
      oldValue: null,
      newValue: created as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { block: created }, 201);
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "23505"
    ) {
      jsonError(res, "A block with this key already exists", 409);
      return;
    }
    console.error("POST /api/cms/content", err);
    jsonError(res, "Failed to create content block", 500);
  }
});

router.delete("/:key", requireSuperAdmin, async (req, res) => {
  const key = routeParam(req, "key");
  if (!key) {
    jsonError(res, "Missing key", 400);
    return;
  }
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(contentBlocksTable)
      .where(eq(contentBlocksTable.key, key))
      .limit(1);
    if (!existing) {
      jsonError(res, "Content block not found", 404);
      return;
    }
    await db.delete(contentBlocksTable).where(eq(contentBlocksTable.key, key));
    await insertAuditLog({
      userId: user.id,
      action: "DELETE_CONTENT",
      targetTable: "content_blocks",
      targetId: existing.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: null,
      timestamp: new Date(),
    });
    jsonSuccess(res, { deleted: true });
  } catch (err) {
    console.error("DELETE /api/cms/content/:key", err);
    jsonError(res, "Failed to delete content block", 500);
  }
});

export default router;
