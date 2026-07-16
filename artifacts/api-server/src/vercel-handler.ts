import "./load-env";
import app from "./app";

/**
 * Vercel serverless entry. The Express application is itself a
 * `(req, res)` request listener, so it can be used directly as a Node
 * function handler. Unlike `index.ts`, this does not call `app.listen()` —
 * Vercel invokes the exported handler per request.
 */
export default app;
