import { Router } from "express";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { cmsAuditLogTable, cmsUsersTable, db } from "@workspace/db";
import { jsonError, jsonSuccess } from "../../lib/api-response";
import { requireCmsAuth, requireSuperAdmin } from "../../middleware/cms-auth";

const router = Router();

router.use(requireCmsAuth);
router.use(requireSuperAdmin);

router.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query["page"]) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query["pageSize"]) || 20));
  const userId =
    typeof req.query["userId"] === "string" && z.string().uuid().safeParse(req.query["userId"]).success
      ? req.query["userId"]
      : undefined;
  const action =
    typeof req.query["action"] === "string" && req.query["action"].length > 0
      ? req.query["action"]
      : undefined;
  const dateFrom =
    typeof req.query["dateFrom"] === "string" ? req.query["dateFrom"] : undefined;
  const dateTo =
    typeof req.query["dateTo"] === "string" ? req.query["dateTo"] : undefined;

  try {
    const conditions = [];
    if (userId) conditions.push(eq(cmsAuditLogTable.userId, userId));
    if (action) conditions.push(eq(cmsAuditLogTable.action, action));
    if (dateFrom) {
      const d = new Date(dateFrom);
      if (!Number.isNaN(d.getTime())) conditions.push(gte(cmsAuditLogTable.timestamp, d));
    }
    if (dateTo) {
      const d = new Date(dateTo);
      if (!Number.isNaN(d.getTime())) conditions.push(lte(cmsAuditLogTable.timestamp, d));
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const offset = (page - 1) * pageSize;

    const selectFields = {
      id: cmsAuditLogTable.id,
      userId: cmsAuditLogTable.userId,
      action: cmsAuditLogTable.action,
      targetTable: cmsAuditLogTable.targetTable,
      targetId: cmsAuditLogTable.targetId,
      oldValue: cmsAuditLogTable.oldValue,
      newValue: cmsAuditLogTable.newValue,
      timestamp: cmsAuditLogTable.timestamp,
      userName: cmsUsersTable.name,
      userEmail: cmsUsersTable.email,
    };

    const [countRow] = whereClause
      ? await db
          .select({ total: count() })
          .from(cmsAuditLogTable)
          .where(whereClause)
      : await db.select({ total: count() }).from(cmsAuditLogTable);

    const total = Number(countRow?.total ?? 0);

    const rows = whereClause
      ? await db
          .select(selectFields)
          .from(cmsAuditLogTable)
          .leftJoin(cmsUsersTable, eq(cmsAuditLogTable.userId, cmsUsersTable.id))
          .where(whereClause)
          .orderBy(desc(cmsAuditLogTable.timestamp))
          .limit(pageSize)
          .offset(offset)
      : await db
          .select(selectFields)
          .from(cmsAuditLogTable)
          .leftJoin(cmsUsersTable, eq(cmsAuditLogTable.userId, cmsUsersTable.id))
          .orderBy(desc(cmsAuditLogTable.timestamp))
          .limit(pageSize)
          .offset(offset);

    jsonSuccess(res, {
      items: rows.map((r) => ({
        id: r.id,
        userId: r.userId,
        userName: r.userName,
        userEmail: r.userEmail,
        action: r.action,
        targetTable: r.targetTable,
        targetId: r.targetId,
        oldValue: r.oldValue,
        newValue: r.newValue,
        timestamp: r.timestamp,
      })),
      total,
      page,
      pageSize,
    });
  } catch (err) {
    console.error("GET /api/cms/audit", err);
    jsonError(res, "Failed to load audit log", 500);
  }
});

export default router;
