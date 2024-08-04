import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "../../handlers/errors/customError";
import { verifyAccessJwtTokenMiddleware } from "./jwt.middleware";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.user);

    if (req.user.role === "Admin") {
      // console.log("pass");

      next();
    } else {
      throw new CustomError("You have no authorization", 401);
    }
  } catch (e) {
    next(e);
  }
};

const clientAuth = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "User") {
      if (req.user.userId !== req.params.userId) {
        console.log(req.user, req.params, "jajsjas");

        throw new CustomError("You have no authorization non-user", 401);
      }
      next();
    } else {
      throw new CustomError("You have no authorization", 401);
    }
  } catch (e) {
    next(e);
  }
};

export const AdminAuthRole = () => {
  return [verifyAccessJwtTokenMiddleware, adminAuth];
};

export const ClientAuthRole = () => {
  return [verifyAccessJwtTokenMiddleware, clientAuth];
};
