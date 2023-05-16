import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { router } from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use("/api/v1", router);

    app.listen(3000);
  })
  .catch((error) => console.log(error));
