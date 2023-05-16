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

  authenticate(token: string): iApiResponse {
    try {
      jwt.verify(token, secret);

      const decodedToken = jwt.decode(token);

      return {
        status: "success",
        message: "User successfully authenticated!",
        result: decodedToken,
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === "JsonWebTokenError") {
          return {
            status: "error",
            message: "User unauthorized!",
            code: 401,
          };
        }

        if (error.name === "TokenExpiredError") {
          return { status: "error", message: "Token expired!", code: 401 };
        }
      }

      return { status: "error", message: error, code: 500 };
    }
  }
}
