import type { NextFunction, Request, Response } from "express";
import { jsonError } from "../lib/api-response";

/** Blocks viewers from any non-GET request (Phase 2: viewer is read-only on /api/cms). */
export function blockViewerWrites(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.cmsUser?.role === "viewer" && req.method !== "GET") {
    jsonError(res, "Read-only access", 403);
    return;
  }
  next();
}
