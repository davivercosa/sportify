import { iApiResponse } from "../../../shared/interfaces/responses.interface";
import { iUpdateAccount } from "./UpdateAccount.interface";
import { AppDataSource } from "../../../data-source";
import { Account } from "../../../entity/Account";

export class UpdateAccountModel {
  private accountRepository = AppDataSource.getRepository(Account);

  async execute({
    id,
    first_name,
    last_name,
    birthday,
    email,
    password,
    phone,
    document,
  }: iUpdateAccount): Promise<iApiResponse> {
    try {
      const accountExist = await this.accountRepository
        .createQueryBuilder("account")
        .where("account.email = :email", { email })
        .orWhere("account.phone = :phone", { phone })
        .orWhere("account.document = :document", { document })
        .andWhere("account.id !== :id", { id })
        .getExists();

      console.log(accountExist);
    } catch (error) {
      console.log(error);

      return {
        status: "error",
        message: error,
        code: 500,
      };
    }
  }
}
