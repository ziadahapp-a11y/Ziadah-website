import jwt from "jsonwebtoken";

export type CmsJwtPayload = {
  sub: string;
  email: string;
  role: "super_admin" | "editor" | "viewer";
};

const JWT_EXPIRES = "8h" as const;

export function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret || secret.length < 16) {
    throw new Error(
      "JWT_SECRET must be set and at least 16 characters long.",
    );
  }
  return secret;
}

export function signCmsToken(payload: CmsJwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES });
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
