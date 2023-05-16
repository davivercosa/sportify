import { Request, Response } from "express";
import { iApiResponse } from "../../../shared/interfaces/responses.interface";

import { iCreateAccount } from "./CreateAccount.interface";
import { CreateAccountModel } from "./CreateAccountModel";

export class CreateAccountController {
  async handle(request: Request, response: Response): Promise<iApiResponse> {
    const accountInfo = request.body as iCreateAccount;

    return await new CreateAccountModel().execute(accountInfo);
  }
}
