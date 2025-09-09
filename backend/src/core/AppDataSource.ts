import Client from "$server/entities/Client.js";
import ClientContactDetail from "$server/entities/ClientContactDetail.js";
import Invoice from "$server/entities/Invoice/Invoice.js";
import Item from "$server/entities/Item.js";
import Supplier from "$server/entities/Supplier.js";
import SupplierContactDetail from "$server/entities/SupplierContactDetail.js";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  synchronize: false,
  entities: [
    Client,
    ClientContactDetail,
    Supplier,
    SupplierContactDetail,
    Item,
    Invoice
  ],
  migrations: ["backend/migrations/{**,*}.{js,ts}"]
});

export {
  AppDataSource
};