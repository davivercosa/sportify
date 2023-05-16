import { Router } from "express";
import { Request, Response } from "express";

import AccountRoutes from "./account";
import { iApiResponse } from "../shared/interfaces/responses.interface";

const router = Router();

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../utils/swagger/swagger.json";

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

const routes = [AccountRoutes];

routes.forEach((obj) => {
  obj.routes.forEach((route) => {
    router[route.method](
      obj.path + route.route,
      route.middlewares,
      (request: Request, response: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          request,
          response,
          next
        );
        result.then((result: iApiResponse) => {
          if (result.status === "error") {
            response.status(result.code);

            delete result.code;

            response.json(result);

            return;
          } else if (result.status === "success") {
            response.status(200);
            response.json(result);

            return;
          } else {
            result !== null && result !== undefined
              ? response.send(result)
              : undefined;
          }
        });
      }
    );
  });
});

export { router };
