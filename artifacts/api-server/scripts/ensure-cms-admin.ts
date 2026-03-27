import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { cmsUsersTable, db, pool } from "@workspace/db";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(`${name} is required`);
  }
  return v.trim();
}

async function main() {
  const email = requiredEnv("CMS_ADMIN_EMAIL").toLowerCase();
  const password = requiredEnv("CMS_ADMIN_PASSWORD");
  const name = process.env["CMS_ADMIN_NAME"]?.trim() || "CMS Admin";

  const passwordHash = await bcrypt.hash(password, 10);

  const [existing] = await db
    .select()
    .from(cmsUsersTable)
    .where(eq(cmsUsersTable.email, email))
    .limit(1);

  if (!existing) {
    await db.insert(cmsUsersTable).values({
      name,
      email,
      passwordHash,
      role: "super_admin",
      mustChangePassword: false,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null,
    });
    console.log(`Created CMS admin: ${email}`);
  } else {
    await db
      .update(cmsUsersTable)
      .set({
        name,
        passwordHash,
        role: "super_admin",
        isActive: true,
        mustChangePassword: false,
      })
      .where(eq(cmsUsersTable.id, existing.id));
    console.log(`Updated CMS admin: ${email}`);
  }

  await pool.end();
}

main().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
