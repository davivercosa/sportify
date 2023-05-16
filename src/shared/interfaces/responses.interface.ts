import Joi from "joi";
import { iCreateAccount } from "../../controller/account/create/CreateAccount.interface";

type ResponseStatus = "success" | "error";

export interface iApiResponse {
  status: ResponseStatus;
  message: string;
  result?: any;
  code?: number;
}

export interface iRequestManager
  extends Omit<iApiResponse, "result" | "code" | "message"> {
  message: iCreateAccount | Joi.ValidationError;
}
