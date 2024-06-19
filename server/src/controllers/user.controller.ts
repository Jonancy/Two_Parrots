import { Request, Response, NextFunction } from "express-serve-static-core";
import { userService } from "../services/user.service";
import { IUserDetails } from "../interfaces/user.interfaces";
import CustomError from "../handlers/errors/customError";
import { successHandler } from "../handlers/success/successHandler";

class UserController {
  //For getting all users
  getUserDetails = async (
    req: Request<{}, {}, IUserDetails>,
    res: Response<IUserDetails[]>,
    next: NextFunction
  ) => {
    try {
      const userDetails = await userService.getUserDetails();

      return successHandler(res, 200, userDetails, "These are the all user's");
    } catch (e) {
      next(e);
    }
  };

  getSpecificUser = async (
    req: Request<{ user_id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.user_id;

      const user = await userService.getUserById(userId);

      if (user != null) {
        return successHandler(res, 200, user, "Specific user's details");
      } else {
        throw new CustomError("User not found", 400);
      }
    } catch (e) {
      next(e);
    }
  };
}

export const userController = new UserController();
