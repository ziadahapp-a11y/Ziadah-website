import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { existsSync } from "fs";
import router from "./routes";
import { ensureUploadsDir, uploadsDir } from "./lib/uploads";
import { sanitizeInputs } from "./middleware/sanitize-input";

const app: Express = express();

ensureUploadsDir();

const defaultAllowedOrigins = [
  "https://ziadah.app",
  "https://www.ziadah.app",
  "http://localhost:3000",
  "http://localhost:5173",
];

const corsAllowedOrigins = (
  process.env["CORS_ALLOWED_ORIGINS"] ?? defaultAllowedOrigins.join(",")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOriginSet = new Set(corsAllowedOrigins);

const connectSrc = ["'self'", ...corsAllowedOrigins];
const scriptSrc = ["'self'"];

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc,
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc,
        fontSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (corsOriginSet.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(
  "/api/cms/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInputs);
app.use("/uploads", express.static(uploadsDir));

app.use("/api", router);

const spaDistDir = path.resolve(
  import.meta.dirname,
  "../../ziadah-landing/dist/public",
);
const spaIndexPath = path.join(spaDistDir, "index.html");
const hasSpaBuild = existsSync(spaIndexPath);

if (hasSpaBuild) {
  app.use(express.static(spaDistDir));
  app.get(/^(?!\/api\/|\/uploads\/).*/, (_req, res) => {
    res.sendFile(spaIndexPath);
  });
}

export default app;
