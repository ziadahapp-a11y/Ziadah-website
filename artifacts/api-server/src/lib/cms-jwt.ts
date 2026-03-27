import jwt from "jsonwebtoken";

export type CmsJwtPayload = {
  sub: string;
  email: string;
  role: "super_admin" | "editor" | "viewer";
};

type JwtTokenType = "access" | "refresh";

type CmsTokenPayload = CmsJwtPayload & {
  typ: JwtTokenType;
};

const ACCESS_TOKEN_EXPIRES = "15m" as const;
const REFRESH_TOKEN_EXPIRES = "7d" as const;

export function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be set and at least 32 characters long.",
    );
  }
  return secret;
}

export function getJwtRefreshSecret(): string {
  const refreshSecret = process.env["JWT_REFRESH_SECRET"] ?? process.env["JWT_SECRET"];
  if (!refreshSecret || refreshSecret.length < 32) {
    throw new Error(
      "JWT_REFRESH_SECRET (or JWT_SECRET fallback) must be at least 32 characters long.",
    );
  }
  return refreshSecret;
}

export function signCmsAccessToken(payload: CmsJwtPayload): string {
  const tokenPayload: CmsTokenPayload = { ...payload, typ: "access" };
  return jwt.sign(tokenPayload, getJwtSecret(), { expiresIn: ACCESS_TOKEN_EXPIRES });
}

export function signCmsRefreshToken(payload: CmsJwtPayload): string {
  const tokenPayload: CmsTokenPayload = { ...payload, typ: "refresh" };
  return jwt.sign(tokenPayload, getJwtRefreshSecret(), {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
}

export function verifyCmsToken(token: string): CmsJwtPayload {
  const decoded = jwt.verify(token, getJwtSecret());
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token payload");
  }
  const { sub, email, role } = decoded as Record<string, unknown>;
  if (
    typeof sub !== "string" ||
    typeof email !== "string" ||
    (role !== "super_admin" && role !== "editor" && role !== "viewer")
  ) {
    throw new Error("Invalid token claims");
  }
  return { sub, email, role };
}

export function verifyCmsRefreshToken(token: string): CmsJwtPayload {
  const decoded = jwt.verify(token, getJwtRefreshSecret());
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token payload");
  }
  const { sub, email, role, typ } = decoded as Record<string, unknown>;
  if (
    typ !== "refresh" ||
    typeof sub !== "string" ||
    typeof email !== "string" ||
    (role !== "super_admin" && role !== "editor" && role !== "viewer")
  ) {
    throw new Error("Invalid token claims");
  }
  return { sub, email, role };
}
