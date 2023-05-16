import { Request, Response } from "express";
import { iApiResponse } from "../../../shared/interfaces/responses.interface";
import { iLoginAccount } from "./LoginAccount.interface";
import { LoginAccountModel } from "./LoginAccountModel";

export class LoginAccountController {
  async handle(request: Request, response: Response): Promise<iApiResponse> {
    const accountInfo = request.body as iLoginAccount;

    return await new LoginAccountModel().execute(accountInfo);
  }
}
