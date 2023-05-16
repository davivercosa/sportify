import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import RequestManager from "../utils/RequestManager";

export default function (schema: Schema) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const verifyRequestResp = RequestManager.verify(request, schema);

    if (verifyRequestResp.status === "error") {
      response.status(400);
      response.json({ status: "error", message: verifyRequestResp.message });

      return;
    }

    next();
  };
}
