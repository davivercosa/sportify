import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";

import { Account } from "../entity/Account";
import { iApiResponse } from "../shared/interfaces/responses.interface";

const secret: Secret = process.env.JWT_SECRET;

export class JwtManager {
  create(accountInfo: Account): iApiResponse {
    try {
      const token = jwt.sign(
        {
          id: accountInfo.id,
        },
        secret,
        { expiresIn: "1d" }
      );

      return {
        status: "success",
        message: `Welcome back, ${accountInfo.first_name}`,
        result: token,
      };
    } catch (error) {
      return { status: "error", message: error, code: 500 };
    }
  }
}
