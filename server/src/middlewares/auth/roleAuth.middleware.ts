import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "../../handlers/errors/customError";
import { verifyAccessJwtTokenMiddleware } from "./jwt.middleware";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user);

    if (req.user.role === "Admin") {
      console.log("pass");

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
