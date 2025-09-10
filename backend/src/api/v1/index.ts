import itemsRouter from "$server/api/v1/items.js";
import { Hono } from "hono";

const apiRouter = new Hono();

apiRouter.route("/items", itemsRouter);

export default apiRouter;