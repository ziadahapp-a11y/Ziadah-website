import type { Response } from "express";

export type ApiSuccess<T> = { success: true; data: T };
export type ApiFailure = { success: false; error: string };

export function jsonSuccess<T>(res: Response, data: T, status = 200): void {
  const body: ApiSuccess<T> = { success: true, data };
  res.status(status).json(body);
}

export function jsonError(
  res: Response,
  error: string,
  status = 400,
): void {
  const body: ApiFailure = { success: false, error };
  res.status(status).json(body);
}
