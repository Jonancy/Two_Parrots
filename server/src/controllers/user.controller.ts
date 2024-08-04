import { Request, Response, NextFunction } from "express-serve-static-core";
import { userService } from "../services/user.service";
import { IUserDetails } from "../interfaces/user.interfaces";
import CustomError from "../handlers/errors/customError";
import { successHandler } from "../handlers/success/successHandler";
import {
  IUpdateUserDetailsDTO,
  IUpdateUserPasswordDTO,
} from "../dtos/user.dto";
import { checkPassword, hashPassword } from "../utils/bcryptPass";

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

  getProfileDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const { updatedAt, role, password, createdAt, ...details } = user;

      const userDetails: IUserDetails & { password: boolean } = {
        ...details,
        password: !!password,
      };
      console.log(userDetails);

      successHandler(res, 200, userDetails, "Users profile details");
    } catch (e) {
      next(e);
    }
  };

  updateUserDetails = async (
    req: Request<{ userId: string }, {}, IUpdateUserDetailsDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const { userId } = req.params;

      const updateUser = await userService.updateUser(user, userId);

      if (!updateUser) {
        throw new CustomError("Update failed", 401);
      }

      return successHandler(res, 200, null, "User updated successfully");
    } catch (e) {
      next(e);
    }
  };

  updateUserPasswordDetails = async (
    req: Request<{ userId: string }, {}, IUpdateUserPasswordDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userDTO = req.body;
      const user = req.user;
      const { userId } = req.params;
      console.log(user.password, userDTO.currentPassword);

      if (userDTO.newPassword !== userDTO.confirmPassword) {
        console.log("billa");
        throw new CustomError(
          "Confirm Password and New Password didnt matched",
          400
        );
      }

      if (userDTO?.currentPassword && user?.password) {
        console.log("lol");

        const checkHashedPass = await checkPassword(
          userDTO.currentPassword,
          user.password
        );
        console.log(checkHashedPass);

        if (!checkHashedPass) {
          throw new CustomError("Password didnt matched", 400);
        }
      }

      const hashedPassword = await hashPassword(userDTO.confirmPassword);

      const updateUser = await userService.updateUserPassword(
        hashedPassword,
        userId
      );

      if (!updateUser) {
        throw new CustomError("Update Password failed", 401);
      }

      return successHandler(
        res,
        200,
        null,
        "User's password updated successfully"
      );
    } catch (e) {
      next(e);
    }
  };
}

export const userController = new UserController();
