import { Router } from "express";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { cmsUsersTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import {
  signCmsAccessToken,
  signCmsRefreshToken,
  verifyCmsRefreshToken,
} from "../../lib/cms-jwt";
import { requireCmsAuth } from "../../middleware/cms-auth";

const router = Router();
const ACCESS_COOKIE_NAME = "ziadah_cms_access";
const REFRESH_COOKIE_NAME = "ziadah_cms_refresh";

function isProduction(): boolean {
  return process.env["NODE_ENV"] === "production";
}

function setAuthCookies(res: Parameters<typeof jsonSuccess>[0], tokenPayload: {
  accessToken: string;
  refreshToken: string;
}): void {
  res.cookie(ACCESS_COOKIE_NAME, tokenPayload.accessToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });
  res.cookie(REFRESH_COOKIE_NAME, tokenPayload.refreshToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

function clearAuthCookies(res: Parameters<typeof jsonSuccess>[0]): void {
  const options = {
    httpOnly: true as const,
    secure: isProduction(),
    sameSite: "strict" as const,
    path: "/",
  };
  res.clearCookie(ACCESS_COOKIE_NAME, options);
  res.clearCookie(REFRESH_COOKIE_NAME, options);
}

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

    const jwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    } as const;
    const accessToken = signCmsAccessToken(jwtPayload);
    const refreshToken = signCmsRefreshToken(jwtPayload);
    setAuthCookies(res, { accessToken, refreshToken });

    jsonSuccess(res, {
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
  clearAuthCookies(res);
  jsonSuccess(res, { ok: true });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!refreshToken || typeof refreshToken !== "string") {
    clearAuthCookies(res);
    jsonError(res, "Authentication required", 401);
    return;
  }
  try {
    const payload = verifyCmsRefreshToken(refreshToken);
    const [user] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.id, payload.sub))
      .limit(1);
    if (!user || !user.isActive) {
      clearAuthCookies(res);
      jsonError(res, "Invalid or inactive user", 401);
      return;
    }
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    } as const;
    const accessToken = signCmsAccessToken(jwtPayload);
    const newRefreshToken = signCmsRefreshToken(jwtPayload);
    setAuthCookies(res, { accessToken, refreshToken: newRefreshToken });
    jsonSuccess(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch {
    clearAuthCookies(res);
    jsonError(res, "Invalid or expired token", 401);
  }
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
