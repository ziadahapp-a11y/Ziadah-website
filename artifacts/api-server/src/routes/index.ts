/**
 * The API surface.
 *
 * The store-analysis routes are gone: `/stores`, `/stores/:id/analyze` and the
 * `/submit` flow existed only for the Analyze product, which the site no
 * longer ships, and nothing in this repository called them. The scraper, the
 * OpenAI product analyser and the report share-token helper went with them,
 * since those three routes were their only callers.
 */
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contentPublicRouter from "./content-public";
import featureRequestRouter from "./feature-request";
import cmsRouter from "./cms";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contentPublicRouter);
router.use(featureRequestRouter);
router.use("/cms", cmsRouter);

export default router;
