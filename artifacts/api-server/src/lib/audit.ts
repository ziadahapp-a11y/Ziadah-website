import { db, cmsAuditLogTable } from "@workspace/db";

export async function insertAuditLog(entry: {
  userId: string | null;
  action: string;
  targetTable: string;
  targetId: string | null;
  oldValue: unknown;
  newValue: unknown;
  timestamp: Date;
}): Promise<void> {
  await db.insert(cmsAuditLogTable).values({
    userId: entry.userId,
    action: entry.action,
    targetTable: entry.targetTable,
    targetId: entry.targetId,
    oldValue: entry.oldValue,
    newValue: entry.newValue,
    timestamp: entry.timestamp,
  });
}
