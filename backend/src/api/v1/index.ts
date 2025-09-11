import itemRouter from "$server/api/v1/items.js";
import { Hono } from "hono";

const apiRouter = new Hono();

apiRouter.route("/items", itemRouter);

export default apiRouter;