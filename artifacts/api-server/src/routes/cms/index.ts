import { Router } from "express";
import authRouter from "./auth";
import contentAdminRouter from "./content-admin";
import pagesRouter from "./pages";
import mediaRouter from "./media";
import usersRouter from "./users";
import auditRouter from "./audit";

const cmsRouter = Router();

cmsRouter.use("/auth", authRouter);
cmsRouter.use("/content", contentAdminRouter);
cmsRouter.use("/pages", pagesRouter);
cmsRouter.use("/media", mediaRouter);
cmsRouter.use("/users", usersRouter);
cmsRouter.use("/audit", auditRouter);

export default cmsRouter;
