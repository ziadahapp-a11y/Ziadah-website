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

if (allowedOrigins.length === 0) {
  logger.warn(
    "CORS_ALLOWED_ORIGINS and REPLIT_DEV_DOMAIN are both unset — no cross-origin credentialed requests will be allowed. Set CORS_ALLOWED_ORIGINS or REPLIT_DEV_DOMAIN to enable browser-to-API calls.",
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
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
