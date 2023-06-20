import { CreateAccountController } from "../controller/account/create/CreateAccountController";
import { createAccountSchema } from "../controller/account/create/CreateAccountDTO";
import { LoginAccountController } from "../controller/account/login/LoginAccountController";
import { loginAccountSchema } from "../controller/account/login/LoginAccountDTO";
import { UpdateAccountController } from "../controller/account/update/UpdateAccountController";
import { updateAccountSchema } from "../controller/account/update/UpdateAccountDTO";
import VerifyDTO from "../middlewares/VerifyDTO";

export default {
  path: "/account",
  routes: [
    {
      method: "post",
      route: "/",
      controller: CreateAccountController,
      action: "handle",
      middlewares: [VerifyDTO(createAccountSchema)],
    },

    {
      method: "post",
      route: "/login",
      controller: LoginAccountController,
      action: "handle",
      middlewares: [VerifyDTO(loginAccountSchema)],
    },

    {
      method: "put",
      route: "/",
      controller: UpdateAccountController,
      action: "handle",
      middlewares: [VerifyDTO(updateAccountSchema)],
    },
  ],
};
