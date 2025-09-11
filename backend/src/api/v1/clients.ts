import AppDataSource from "$server/core/AppDataSource.js";
import Client from "$server/entities/Client.js";
import { parseInteger } from "$server/utils/type-formatting.js";
import { Hono as Router, type MiddlewareHandler } from "hono";

const clientRouter = new Router<ClientRouterEnv>();

const findClientMiddleware: MiddlewareHandler<ClientRouterEnv, "/:id"> = async (ctx, next) => {
  const [id, parseIdError] = parseInteger(ctx.req.param("id"));

  if (id === null)
    return ctx.json([null, parseIdError]);

  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({
    where: { id },
    relations: {}
  });
  ctx.set("client", client);
  await next();
};

clientRouter.get("/:id", findClientMiddleware, (ctx) => {
  const client = ctx.get("client");
  return client
    ? ctx.json(client)
    : ctx.notFound();
});

type ClientRouterEnv = {
  Variables: {
    client: Client | null;
  };
};