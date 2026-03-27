import { Router } from "express";
import bcrypt from "bcrypt";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { cmsUsersTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import { toPublicCmsUser } from "../../lib/cms-user-public";
import { insertAuditLog } from "../../lib/audit";
import { requireCmsAuth, requireSuperAdmin } from "../../middleware/cms-auth";
import { routeParam } from "../../lib/route-params";

const router = Router();

router.use(requireCmsAuth);
router.use(requireSuperAdmin);

const roleSchema = z.enum(["super_admin", "editor", "viewer"]);

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: roleSchema.optional().default("viewer"),
});

const updateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  role: roleSchema.optional(),
  isActive: z.boolean().optional(),
});

router.get("/", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(cmsUsersTable)
      .orderBy(desc(cmsUsersTable.createdAt));
    jsonSuccess(res, { users: rows.map(toPublicCmsUser) });
  } catch (err) {
    console.error("GET /api/cms/users", err);
    jsonError(res, "Failed to load users", 500);
  }
});

router.post("/", async (req, res) => {
  const actor = req.cmsUser;
  if (!actor) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  const body = parsed.data;
  try {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const [created] = await db
      .insert(cmsUsersTable)
      .values({
        name: body.name,
        email: body.email.toLowerCase(),
        passwordHash,
        role: body.role,
        mustChangePassword: false,
        isActive: true,
      })
      .returning();
    if (!created) {
      jsonError(res, "Create failed", 500);
      return;
    }
    await insertAuditLog({
      userId: actor.id,
      action: "CREATE_USER",
      targetTable: "cms_users",
      targetId: created.id,
      oldValue: null,
      newValue: {
        id: created.id,
        email: created.email,
        role: created.role,
        name: created.name,
      },
      timestamp: new Date(),
    });
    jsonSuccess(res, { user: toPublicCmsUser(created) }, 201);
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "23505"
    ) {
      jsonError(res, "A user with this email already exists", 409);
      return;
    }
    console.error("POST /api/cms/users", err);
    jsonError(res, "Failed to create user", 500);
  }
});

router.put("/:id", async (req, res) => {
  const id = routeParam(req, "id");
  if (!id || !z.string().uuid().safeParse(id).success) {
    jsonError(res, "Invalid user id", 400);
    return;
  }
  const actor = req.cmsUser;
  if (!actor) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.id, id))
      .limit(1);
    if (!existing) {
      jsonError(res, "User not found", 404);
      return;
    }
    if (id === actor.id && parsed.data.isActive === false) {
      jsonError(res, "You cannot deactivate your own account", 400);
      return;
    }
    const patch = parsed.data;
    const [updated] = await db
      .update(cmsUsersTable)
      .set({
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.role !== undefined ? { role: patch.role } : {}),
        ...(patch.isActive !== undefined ? { isActive: patch.isActive } : {}),
      })
      .where(eq(cmsUsersTable.id, id))
      .returning();
    if (!updated) {
      jsonError(res, "Update failed", 500);
      return;
    }
    await insertAuditLog({
      userId: actor.id,
      action: "UPDATE_USER",
      targetTable: "cms_users",
      targetId: updated.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: updated as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { user: toPublicCmsUser(updated) });
  } catch (err) {
    console.error("PUT /api/cms/users/:id", err);
    jsonError(res, "Failed to update user", 500);
  }
});

router.delete("/:id", async (req, res) => {
  const id = routeParam(req, "id");
  if (!id || !z.string().uuid().safeParse(id).success) {
    jsonError(res, "Invalid user id", 400);
    return;
  }
  const actor = req.cmsUser;
  if (!actor) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  if (id === actor.id) {
    jsonError(res, "You cannot delete your own account", 400);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.id, id))
      .limit(1);
    if (!existing) {
      jsonError(res, "User not found", 404);
      return;
    }
    const [updated] = await db
      .update(cmsUsersTable)
      .set({ isActive: false })
      .where(eq(cmsUsersTable.id, id))
      .returning();
    if (!updated) {
      jsonError(res, "Soft delete failed", 500);
      return;
    }
    await insertAuditLog({
      userId: actor.id,
      action: "DELETE_USER",
      targetTable: "cms_users",
      targetId: existing.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: updated as unknown as Record<string, unknown>,
      timestamp: new Date(),
    });
    jsonSuccess(res, { deleted: true });
  } catch (err) {
    console.error("DELETE /api/cms/users/:id", err);
    jsonError(res, "Failed to delete user", 500);
  }
});

export default router;
