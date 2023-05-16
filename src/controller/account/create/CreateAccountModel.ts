import { iCreateAccount } from "./CreateAccount.interface";
import { Account } from "../../../entity/Account";
import { AppDataSource } from "../../../data-source";
import { iApiResponse } from "../../../shared/interfaces/responses.interface";

import bcrypt from "bcrypt";

export class CreateAccountModel {
  private accountRepository = AppDataSource.getRepository(Account);

  async execute({
    first_name,
    last_name,
    birthday,
    email,
    password,
    phone,
    document,
  }: iCreateAccount): Promise<iApiResponse> {
    try {
      const accountExist = await this.accountRepository.findOneBy({
        email,
      });

      if (accountExist !== null) {
        return {
          status: "error",
          message: "Account already registered on our database!",
          code: 400,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const account = Object.assign(new Account(), {
        first_name,
        last_name,
        birthday,
        email,
        password: hashedPassword,
        phone,
        document,
      });

      await this.accountRepository.save(account);

      return { status: "success", message: "Account successfully created!" };
    } catch (error) {
      console.log(error);

      return { status: "error", message: error, code: 500 };
    }
  }
}
