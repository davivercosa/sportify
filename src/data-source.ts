import "reflect-metadata";
import { DataSource } from "typeorm";
import { Account } from "./entity/Account";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "sa",
  password: "Riverland#2019",
  database: "sportify",
  synchronize: true,
  logging: false,
  entities: [Account],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
});
