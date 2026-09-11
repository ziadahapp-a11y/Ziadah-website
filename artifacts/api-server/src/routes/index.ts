/**
 * The API surface.
 *
 * Two routes, because two are all the marketing site calls: a health check,
 * and the feature-request form.
 *
 * What used to be here is worth naming, so nobody goes looking for it. The
 * store-analysis routes - `/stores`, `/stores/:id/analyze`, `/submit` - served
 * the Analyze product. The `/cms/*` tree and `/content` served an in-house CMS
 * that the site read its copy from. Neither product ships any more: the site's
 * copy lives in the repository, and nothing in it called either surface.
 */
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import featureRequestRouter from "./feature-request";

const router: IRouter = Router();

router.use(healthRouter);
router.use(featureRequestRouter);

export default router;
