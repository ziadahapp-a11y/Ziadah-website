import type { CmsUser } from "@workspace/db";

export type PublicCmsUser = Omit<CmsUser, "passwordHash">;

export function toPublicCmsUser(user: CmsUser): PublicCmsUser {
  const { passwordHash: _p, ...rest } = user;
  return rest;
}
