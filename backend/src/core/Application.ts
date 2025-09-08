import apiRouter from "$server/api/v1/api-router.js";
import { serve } from "@hono/node-server";
import chalk from "chalk";
import { Hono } from "hono";

function runServer(): void {
  const app = new Hono();

  app.route("/api/v1", apiRouter);

  const server = serve({ fetch: app.fetch, port: +process.env.PORT }, ({ port }) => {
    const url = chalk.yellow(`http://localhost:${port}`);
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