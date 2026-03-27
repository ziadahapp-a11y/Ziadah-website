import type { CmsUser } from "@workspace/db";

declare global {
  namespace Express {
    interface Request {
      cmsUser?: CmsUser;
    }
  }
}

export {};
