import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";
import { userService } from "../services/user.service";
import CustomError from "../handlers/errors/customError";

export const checkUserExistence = async (
  req: Request<{}, {}, UserRegisterDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = req.body;
    const userExists = await userService.getUserByEmail(userDTO.email);
    if (userExists) {
      throw new CustomError(
        "User has been already registered with this email",
        400
      );
    }

    req.user = userExists;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkUserLogin = async (
  req: Request<{}, {}, UserLoginDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = req.body;
    const user = await userService.getUserByEmail(userDTO.email);

    if (!user) {
      throw new CustomError("User has not been registered yet!", 400);
    }

    //Injecting the values for reusing
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
