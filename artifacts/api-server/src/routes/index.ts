import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storesRouter from "./stores";
import submitRouter from "./submit";
import contentPublicRouter from "./content-public";
import featureRequestRouter from "./feature-request";
import cmsRouter from "./cms";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storesRouter);
router.use(submitRouter);
router.use(contentPublicRouter);
router.use(featureRequestRouter);
router.use("/cms", cmsRouter);

export default router;
