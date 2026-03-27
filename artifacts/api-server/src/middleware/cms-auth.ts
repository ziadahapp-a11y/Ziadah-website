import type { NextFunction, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { cmsUsersTable, db } from "@workspace/db";
import { jsonError } from "../lib/api-response";
import { verifyCmsToken } from "../lib/cms-jwt";

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice("Bearer ".length).trim() || null;
}

function extractCookieToken(req: Request): string | null {
  const token = req.cookies?.["ziadah_cms_access"];
  return typeof token === "string" && token.trim().length > 0 ? token : null;
}

export async function requireCmsAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractBearerToken(req) ?? extractCookieToken(req);
  if (!token) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  try {
    const payload = verifyCmsToken(token);
    const [user] = await db
      .select()
      .from(cmsUsersTable)
      .where(eq(cmsUsersTable.id, payload.sub))
      .limit(1);
    if (!user || !user.isActive) {
      jsonError(res, "Invalid or inactive user", 401);
      return;
    }
    req.cmsUser = user;
    next();
  } catch {
    jsonError(res, "Invalid or expired token", 401);
  }
}

export type CmsRole = "super_admin" | "editor" | "viewer";

export function requireCmsRoles(...allowed: CmsRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.cmsUser;
    if (!user) {
      jsonError(res, "Authentication required", 401);
      return;
    }
    if (!allowed.includes(user.role)) {
      jsonError(res, "Insufficient permissions", 403);
      return;
    }
    next();
  };
}

/** super_admin only */
export const requireSuperAdmin = requireCmsRoles("super_admin");

/** editor or super_admin */
export const requireEditor = requireCmsRoles("editor", "super_admin");

/** any authenticated CMS role */
export const requireViewer = requireCmsRoles("viewer", "editor", "super_admin");
