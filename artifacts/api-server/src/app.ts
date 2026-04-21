import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

function getAllowedOrigins(): string[] {
  const configured = process.env.CORS_ALLOWED_ORIGINS;
  if (configured) {
    return configured
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }

  const devDomain = process.env.REPLIT_DEV_DOMAIN;
  if (devDomain) {
    return [`https://${devDomain}`];
  }

  return [];
}

const allowedOrigins = getAllowedOrigins();

/** Browser → API on another host/port (e.g. VITE_API_BASE_URL=http://127.0.0.1:8787 while Vite is on :5000). */
function isLocalDevBrowserOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    const httpish = u.protocol === "http:" || u.protocol === "https:";
    return (
      httpish &&
      (u.hostname === "localhost" || u.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

const allowLocalhostInDev =
  process.env.NODE_ENV !== "production" || process.env.ALLOW_LOCALHOST_CORS === "1";

if (allowedOrigins.length === 0) {
  logger.warn(
    "CORS_ALLOWED_ORIGINS and REPLIT_DEV_DOMAIN are both unset — cross-origin browser calls only work for same-origin requests, or localhost in non-production (set ALLOW_LOCALHOST_CORS=1 to allow localhost when NODE_ENV=production).",
  );
} else {
  logger.info({ allowedOrigins }, "CORS allowed origins");
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      if (allowLocalhostInDev && isLocalDevBrowserOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
