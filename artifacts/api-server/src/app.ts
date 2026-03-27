import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { existsSync } from "fs";
import router from "./routes";
import { ensureUploadsDir, uploadsDir } from "./lib/uploads";

const app: Express = express();

ensureUploadsDir();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
