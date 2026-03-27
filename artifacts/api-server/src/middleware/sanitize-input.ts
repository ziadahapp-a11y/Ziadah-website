import type { NextFunction, Request, Response } from "express";

function sanitizeString(value: string): string {
  return value.trim().replace(/[<>]/g, "");
}

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return sanitizeString(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }
  if (value && typeof value === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      sanitized[key] = sanitizeValue(nested);
    }
    return sanitized;
  }
  return value;
}

export function sanitizeInputs(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  req.body = sanitizeValue(req.body);

  // Express 5 on Node.js 24+ defines req.query as a read-only getter,
  // so direct assignment throws. Redefine it as a writable value instead.
  try {
    const sanitizedQuery = sanitizeValue(req.query) as Request["query"];
    Object.defineProperty(req, "query", {
      value: sanitizedQuery,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch {
    // If redefinition fails, skip query sanitization gracefully
  }

  next();
}
