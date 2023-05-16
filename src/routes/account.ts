import { CreateAccountController } from "../controller/account/create/CreateAccountController";
import { createAccountSchema } from "../controller/account/create/CreateAccountDTO";
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
  ],
};
