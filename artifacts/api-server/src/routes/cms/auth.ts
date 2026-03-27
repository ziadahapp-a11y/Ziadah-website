import { Router } from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { cmsUsersTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import { signCmsToken } from "../../lib/cms-jwt";
import { requireCmsAuth } from "../../middleware/cms-auth";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, "Invalid email or password format", 400);
    return;
  }
  const { email, password } = parsed.data;
  try {
    const [user] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.email, email.toLowerCase()))
      .limit(1);
    if (!user || !user.isActive) {
      jsonError(res, "Invalid credentials", 401);
      return;
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      jsonError(res, "Invalid credentials", 401);
      return;
    }
    await db
      .update(cmsUsersTable)
      .set({ lastLogin: new Date() })
      .where(eq(cmsUsersTable.id, user.id));

    const token = signCmsToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    jsonSuccess(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (err) {
    console.error("POST /api/cms/auth/login", err);
    jsonError(res, "Login failed", 500);
  }
});

router.post("/logout", (_req, res) => {
  jsonSuccess(res, { ok: true });
});

router.get("/me", requireCmsAuth, (req, res) => {
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  jsonSuccess(res, {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    mustChangePassword: user.mustChangePassword,
    lastLogin: user.lastLogin,
    isActive: user.isActive,
  });
});

const updateMeSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).max(128).optional(),
  })
  .refine(
    (b) =>
      !b.newPassword ||
      (b.currentPassword !== undefined && b.currentPassword.length > 0),
    { message: "currentPassword is required when changing password" },
  );

router.patch("/me", requireCmsAuth, (req, res, next) => {
  if (req.cmsUser?.role === "viewer") {
    jsonError(res, "Read-only role cannot update profile", 403);
    return;
  }
  next();
}, async (req, res) => {
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  const parsed = updateMeSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(res, parsed.error.flatten().formErrors.join(", "), 400);
    return;
  }
  const { name, currentPassword, newPassword } = parsed.data;
  try {
    if (newPassword) {
      const match = await bcrypt.compare(
        currentPassword ?? "",
        user.passwordHash,
      );
      if (!match) {
        jsonError(res, "Current password is incorrect", 400);
        return;
      }
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await db
        .update(cmsUsersTable)
        .set({
          passwordHash,
          mustChangePassword: false,
        })
        .where(eq(cmsUsersTable.id, user.id));
    }
    if (name !== undefined) {
      await db
        .update(cmsUsersTable)
        .set({ name })
        .where(eq(cmsUsersTable.id, user.id));
    }
    const [fresh] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.id, user.id))
      .limit(1);
    if (!fresh) {
      jsonError(res, "User not found", 404);
      return;
    }
    jsonSuccess(res, {
      id: fresh.id,
      name: fresh.name,
      email: fresh.email,
      role: fresh.role,
      mustChangePassword: fresh.mustChangePassword,
    });
  } catch (err) {
    console.error("PATCH /api/cms/auth/me", err);
    jsonError(res, "Failed to update profile", 500);
  }
});

export default router;
