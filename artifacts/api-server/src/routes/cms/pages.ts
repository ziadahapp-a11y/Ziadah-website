import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { cmsPagesTable, db } from "@workspace/db";
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

const createPageSchema = z.object({
  slug: z.string().min(1).max(320),
  title: z.string().min(1).max(512),
  metaDescription: z.string().max(100_000).optional().default(""),
  isPublished: z.boolean().optional().default(false),
});

const updatePageSchema = z.object({
  slug: z.string().min(1).max(320).optional(),
  title: z.string().min(1).max(512).optional(),
  metaDescription: z.string().max(100_000).optional(),
  isPublished: z.boolean().optional(),
});

router.get("/", requireViewer, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(cmsPagesTable)
      .orderBy(desc(cmsPagesTable.updatedAt));
    jsonSuccess(res, { pages: rows });
  } catch (err) {
    console.error("GET /api/cms/pages", err);
    jsonError(res, "Failed to load pages", 500);
  }
});

router.post("/", requireSuperAdmin, async (req, res) => {
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = createPageSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  const body = parsed.data;
  try {
    const [created] = await db
      .insert(cmsPagesTable)
      .values({
        slug: body.slug,
        title: body.title,
        metaDescription: body.metaDescription ?? "",
        isPublished: body.isPublished ?? false,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    if (!created) {
      jsonError(res, "Create failed", 500);
      return;
    }
    await insertAuditLog({
      userId: user.id,
      action: "CREATE_PAGE",
      targetTable: "cms_pages",
      targetId: created.id,
      oldValue: null,
      newValue: created as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { page: created }, 201);
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "23505"
    ) {
      jsonError(res, "A page with this slug already exists", 409);
      return;
    }
    console.error("POST /api/cms/pages", err);
    jsonError(res, "Failed to create page", 500);
  }
});

router.put("/:id", requireEditor, async (req, res) => {
  const id = routeParam(req, "id");
  if (!id || !z.string().uuid().safeParse(id).success) {
    jsonError(res, "Invalid page id", 400);
    return;
  }
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = updatePageSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(cmsPagesTable)
      .where(eq(cmsPagesTable.id, id))
      .limit(1);
    if (!existing) {
      jsonError(res, "Page not found", 404);
      return;
    }
    const patch = parsed.data;
    const [updated] = await db
      .update(cmsPagesTable)
      .set({
        ...(patch.slug !== undefined ? { slug: patch.slug } : {}),
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.metaDescription !== undefined
          ? { metaDescription: patch.metaDescription }
          : {}),
        ...(patch.isPublished !== undefined
          ? { isPublished: patch.isPublished }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(cmsPagesTable.id, id))
      .returning();
    if (!updated) {
      jsonError(res, "Update failed", 500);
      return;
    }
    await insertAuditLog({
      userId: user.id,
      action: "UPDATE_PAGE",
      targetTable: "cms_pages",
      targetId: updated.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: updated as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { page: updated });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "23505"
    ) {
      jsonError(res, "A page with this slug already exists", 409);
      return;
    }
    console.error("PUT /api/cms/pages/:id", err);
    jsonError(res, "Failed to update page", 500);
  }
});

router.delete("/:id", requireSuperAdmin, async (req, res) => {
  const id = routeParam(req, "id");
  if (!id || !z.string().uuid().safeParse(id).success) {
    jsonError(res, "Invalid page id", 400);
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
      .from(cmsPagesTable)
      .where(eq(cmsPagesTable.id, id))
      .limit(1);
    if (!existing) {
      jsonError(res, "Page not found", 404);
      return;
    }
    await db.delete(cmsPagesTable).where(eq(cmsPagesTable.id, id));
    await insertAuditLog({
      userId: user.id,
      action: "DELETE_PAGE",
      targetTable: "cms_pages",
      targetId: existing.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: null,
      timestamp: new Date(),
    });
    jsonSuccess(res, { deleted: true });
  } catch (err) {
    console.error("DELETE /api/cms/pages/:id", err);
    jsonError(res, "Failed to delete page", 500);
  }
});

export default router;
