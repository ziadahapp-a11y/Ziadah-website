import { Router, type IRouter } from "express";
import healthRouter from "./health";
import featureRequestRouter from "./feature-request";

const router: IRouter = Router();

router.use(healthRouter);
router.use(featureRequestRouter);

export default router;
