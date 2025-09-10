import AppDataSource from "$server/core/AppDataSource.js";
import Item from "$server/entities/Item.js";
import Supplier from "$server/entities/Supplier.js";
import { parseItemCreationData, parseItemUpdateData } from "$server/schemas/ItemSchema.js";
import { parseInteger } from "$server/utils/type-formatting.js";
import { Hono as Router, type MiddlewareHandler } from "hono";

const itemsRouter = new Router<ItemRouterEnv>();

const findItemMiddleware: MiddlewareHandler<ItemRouterEnv, "/:id"> = async (ctx, next) => {
  const [id, parseIdError] = parseInteger(ctx.req.param("id"));

  if (id === null)
    return ctx.json([null, parseIdError]);

  const itemRepository = AppDataSource.getRepository(Item);
  const item = await itemRepository.findOne({
    where: { id },
    relations: { supplier: true }
  });
  ctx.set("item", item);
  await next();
};

itemsRouter.get("/:id", findItemMiddleware, (ctx) => {
  const item = ctx.get("item");
  return item
    ? ctx.json(item)
    : ctx.notFound();
});

itemsRouter.patch("/:id", findItemMiddleware, async (ctx) => {
  const item = ctx.get("item");

  if (!item)
    return ctx.notFound();

  const body = await ctx.req.json();
  const [data, issues] = parseItemUpdateData(body);

  if (issues)
    return ctx.json([null, issues]);

  const { shortDesignation, commercialDesignation, supplierId } = data;

  shortDesignation && (item.shortDesignation = shortDesignation);
  commercialDesignation && (item.commercialDesignation = commercialDesignation);

  if (supplierId) {
    const supplierRepository = AppDataSource.getRepository(Supplier);
    const supplier = await supplierRepository.findOne({ where: { id: supplierId } });
    item.supplier = supplier;
  }

  const itemRepository = AppDataSource.getRepository(Item);
  await itemRepository.save(item);
  return ctx.json([true, null]);
});

itemsRouter.delete("/:id", async (ctx) => {
  const [id, parseIdError] = parseInteger(ctx.req.param("id"));

  if (id === null)
    return ctx.json([null, parseIdError]);

  const itemRepository = AppDataSource.getRepository(Item);
  const { affected } = await itemRepository.delete({ id });

  if (typeof affected !== "number" || affected < 1)
    return ctx.json([null, `L'article id = ${id} n'a pu pas être supprimé.`]);

  return ctx.json([true, null]);
});

itemsRouter.post("/", async (ctx) => {
  const body = await ctx.req.json();
  const [data, issues] = parseItemCreationData(body);

  if (issues)
    return ctx.json([null, issues]);

  const { shortDesignation, commercialDesignation, supplierId } = data;
  const supplierRepository = AppDataSource.getRepository(Supplier);
  const supplier = supplierId
    ? (await supplierRepository.findOne({ where: { id: supplierId } }))
    : null;

  const itemRepository = AppDataSource.getRepository(Item);
  const item = Item.create(
    shortDesignation,
    commercialDesignation,
    supplier
  );
  const savedItem = await itemRepository.save(item);
  return ctx.json([savedItem, null]);
});

type ItemRouterEnv = {
  Variables: {
    item: Item | null;
  };
};

export default itemsRouter;