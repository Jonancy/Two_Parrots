import { NextFunction, Request, Response } from "express";
import { jwtAccessVerification } from "../../utils/token-manager";
import { userService } from "../../services/user.service";
import CustomError from "../../handlers/errors/customError";
import { JwtAccessPayloadExtended } from "../../interfaces/jwt.interfaces";

//! This is the actual verification of the jwt
export const verifyAccessJwtTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new CustomError(
        "No token provided. Please include a valid JWT token in the Authorization header.",
        400
      );
    }

    const [bearer, token] = bearerToken.split(" ");

    if (bearer !== "Bearer") {
      throw new CustomError(
        "Invalid token type. Token must be in 'Bearer <token>' format.",
        400
      );
    }

    if (!token) {
      throw new CustomError("Invalid token. Token cannot be empty.", 400);
    }

    const verifiedToken: JwtAccessPayloadExtended =
      jwtAccessVerification(token);

    if (!verifiedToken) {
      throw new CustomError("Invalid token. Failed to verify token.", 401);
    }

    const user = await userService.getUserById(verifiedToken.userId);

    if (!user) {
      throw new CustomError("User not found.", 404);
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
