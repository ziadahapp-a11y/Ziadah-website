import { randomBytes } from "node:crypto";

/** URL-safe opaque token for public report links (~43 chars); not enumerable like sequential ids. */
export function generateReportShareToken(): string {
  return randomBytes(32).toString("base64url");
}
