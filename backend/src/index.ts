import AppDataSource from "$server/core/AppDataSource.js";
import { runServer } from "$server/core/Application.js";
import "reflect-metadata";

await AppDataSource.initialize();
runServer();