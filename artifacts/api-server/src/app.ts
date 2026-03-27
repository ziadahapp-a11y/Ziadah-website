import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";
import { ensureUploadsDir, uploadsDir } from "./lib/uploads";

const app: Express = express();

ensureUploadsDir();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

app.use("/api", router);

export default app;
