import { NextFunction, Request, Response } from "express";
import { jwtRefreshVerification } from "../utils/token-manager";
import { userService } from "../services/user.service";
import CustomError from "../handlers/errors/customError";

//!This is the actual verification of the jwt
export const verifyAccessJwtTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new CustomError("No token received.", 400);
    }

    const [bearer, token] = bearerToken.split(" ");

    if (bearer !== "Bearer") {
      throw new CustomError("Invalid token type.", 400);
    }

    if (!token) {
      throw new CustomError("Invalid token.", 400);
    }

    const verifiedToken = jwtRefreshVerification(token);

    if (!verifiedToken) {
      throw new CustomError("Invalid token.", 500);
    }

    const user = await userService.getUserByEmail(verifiedToken.email);

    if (!user) {
      throw new CustomError("User not found.", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
