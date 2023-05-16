import { AppDataSource } from "../../../data-source";
import { Account } from "../../../entity/Account";
import { iApiResponse } from "../../../shared/interfaces/responses.interface";
import { JwtManager } from "../../../utils/JwtManager";
import { iLoginAccount } from "./LoginAccount.interface";

import bcrypt from "bcrypt";

export class LoginAccountModel {
  private accountRepository = AppDataSource.getRepository(Account);

  async execute({ email, password }: iLoginAccount): Promise<iApiResponse> {
    try {
      const accountExist = await this.accountRepository.findOneBy({
        email,
      });

      if (accountExist === null) {
        return {
          status: "error",
          message: "Account not found on our database!",
          code: 404,
        };
      }

      const passwordCorrect = await bcrypt.compare(
        password,
        accountExist.password
      );

      if (passwordCorrect === false) {
        return {
          status: "error",
          message: "Something is wrong with the account info provided!",
          code: 401,
        };
      }

      return new JwtManager().create(accountExist);
    } catch (error) {
      return { status: "error", message: error, code: 500 };
    }
  }
}
