import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { Router } from "express";
import multer from "multer";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { cmsMediaTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import { insertAuditLog } from "../../lib/audit";
import { ensureUploadsDir, uploadsDir } from "../../lib/uploads";
import {
  requireCmsAuth,
  requireEditor,
  requireViewer,
} from "../../middleware/cms-auth";
import { blockViewerWrites } from "../../middleware/cms-viewer-readonly";
import { routeParam } from "../../lib/route-params";

ensureUploadsDir();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadsDir();
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const base = `${Date.now()}-${randomBytes(8).toString("hex")}`;
    cb(null, `${base}${ext}`);
  },
});

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error("Unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

const router = Router();

router.use(requireCmsAuth);
router.use(blockViewerWrites);

router.get("/", requireViewer, async (_req, res) => {
  try {
    const rows = await db.select().from(cmsMediaTable);
    jsonSuccess(res, { media: rows });
  } catch (err) {
    console.error("GET /api/cms/media", err);
    jsonError(res, "Failed to load media", 500);
  }
});

router.post(
  "/upload",
  requireEditor,
  upload.single("file"),
  async (req, res) => {
    const user = req.cmsUser;
    if (!user) {
      jsonError(res, "Authentication required", 401);
      return;
    }
    const file = req.file;
    if (!file) {
      jsonError(res, "file field is required (multipart/form-data)", 400);
      return;
    }
    try {
      const publicPath = `/uploads/${file.filename}`;
      const [row] = await db
        .insert(cmsMediaTable)
        .values({
          filename: file.filename,
          url: publicPath,
          size: file.size,
          type: file.mimetype || "application/octet-stream",
          uploadedBy: user.id,
          uploadedAt: new Date(),
        })
        .returning();
      if (!row) {
        fs.unlinkSync(file.path);
        jsonError(res, "Failed to save media record", 500);
        return;
      }
      await insertAuditLog({
        userId: user.id,
        action: "UPLOAD_MEDIA",
        targetTable: "cms_media",
        targetId: row.id,
        oldValue: null,
        newValue: row as unknown as Record<string, unknown>,
        timestamp: new Date(),
      });
      jsonSuccess(res, { media: row }, 201);
    } catch (err) {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      console.error("POST /api/cms/media/upload", err);
      jsonError(res, "Failed to upload media", 500);
    }
  },
);

router.delete("/:id", requireEditor, async (req, res) => {
  const id = routeParam(req, "id");
  if (!id || !z.string().uuid().safeParse(id).success) {
    jsonError(res, "Invalid media id", 400);
    return;
  }
  const user = req.cmsUser;
  if (!user) {
    jsonError(res, "Authentication required", 401);
    return;
  }
  try {
    const [existing] = await db
      .select()
      .from(cmsMediaTable)
      .where(eq(cmsMediaTable.id, id))
      .limit(1);
    if (!existing) {
      jsonError(res, "Media not found", 404);
      return;
    }
    const relative = existing.url.startsWith("/uploads/")
      ? existing.url.slice("/uploads/".length)
      : path.basename(existing.url);
    const diskPath = path.join(uploadsDir, relative);
    if (fs.existsSync(diskPath)) {
      fs.unlinkSync(diskPath);
    }
    await db.delete(cmsMediaTable).where(eq(cmsMediaTable.id, id));
    await insertAuditLog({
      userId: user.id,
      action: "DELETE_MEDIA",
      targetTable: "cms_media",
      targetId: existing.id,
      oldValue: existing as unknown as Record<string, unknown>,
      newValue: null,
      timestamp: new Date(),
    });
    jsonSuccess(res, { deleted: true });
  } catch (err) {
    console.error("DELETE /api/cms/media/:id", err);
    jsonError(res, "Failed to delete media", 500);
  }
});

export default router;
