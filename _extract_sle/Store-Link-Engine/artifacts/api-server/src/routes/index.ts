import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storesRouter from "./stores";
import submitRouter from "./submit";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storesRouter);
router.use(submitRouter);

export default router;
