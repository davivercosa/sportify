import { Request, Response } from "express";
import { UpdateAccountModel } from "./UpdateAccountModel";
import { iUpdateAccount } from "./UpdateAccount.interface";

export class UpdateAccountController {
  async handle(request: Request, response: Response) {
    const accountInfo = request.body as iUpdateAccount;

    await new UpdateAccountModel().execute(accountInfo);
  }
}
