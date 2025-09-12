import apiRouter from "$server/api/v1/index.js";
import { viewsMiddleware } from "$server/core/views.js";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import chalk from "chalk";
import { Hono } from "hono";

function runServer(): void {
  const app = new Hono();

  app.route("/api/v1", apiRouter);

  app.use("/static/*", serveStatic({ root: "./" }));
  app.use("*", viewsMiddleware);

  const serverOptions: ServerOptions = {
    fetch: app.fetch,
    port: +process.env.PORT
  };

  const server = serve(serverOptions, ({ port }) => {
    const p = chalk.cyan(port.toString());
    const url = chalk.yellow(`http://localhost:${p}`);
    console.log(`App running at ${url}...`);
  });

  process.on("SIGINT", () => {
    server.close();
    process.exit(0);
  });
}

export {
  runServer
};

type ServerOptions = Parameters<typeof serve>[0];