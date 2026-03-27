import { Router, type IRouter } from "express";
import healthRouter from "./health";
import featureRequestRouter from "./feature-request";
import contentPublicRouter from "./content-public";
import cmsRouter from "./cms";

const router: IRouter = Router();

router.use(healthRouter);
router.use(featureRequestRouter);
router.use(contentPublicRouter);
router.use("/cms", cmsRouter);

export default router;
