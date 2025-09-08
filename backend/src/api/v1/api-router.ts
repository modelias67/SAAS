import { Hono } from "hono";

const apiRouter = new Hono();

apiRouter.get("/test", (ctx) => {
  return ctx.json({
    hello: "world",
    timestamp: Date.now()
  });
});

export default apiRouter;