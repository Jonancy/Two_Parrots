import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";
import { checkPassword, hashPassword } from "../utils/bcryptPass";
import { userService } from "../services/user.service";
import {
  jwtAccessCreation,
  jwtRefreshCreation,
  jwtRefreshVerification,
} from "../utils/token-manager";
import { successHandler } from "../handlers/success/successHandler";
import CustomError from "../handlers/errors/customError";
import {
  JwtAccessPayloadExtended,
  JwtRefreshPayloadExtended,
} from "../interfaces/jwt.interfaces";
import { IUserDetails } from "../interfaces/user.interfaces";

//!Class for controlling authentication and authorization like login, regi,logout, refresh tokens, etc.
class AuthController {
  //For registration of the user
  registerUser = async (
    req: Request<{}, {}, UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userDTO = req.body;

      const hashedPass = await hashPassword(userDTO.password);

      const hashedUser = { ...userDTO, password: hashedPass };

      const userAddition = await userService.registerUser(hashedUser);

      if (userAddition) {
        return successHandler(res, 201, null, "User registered successfully.");
      } else {
        throw new CustomError("User registration failed", 400);
      }
    } catch (e) {
      next(e);
    }
  };

  loginUser = async (
    req: Request<{}, {}, UserLoginDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const injectDTO = req.user;
      const userDTO = req.body;
      const passCheck = await checkPassword(
        userDTO.password,
        injectDTO.password
      );

      if (!passCheck) {
        throw new CustomError("Password did'not matched", 400);
      }

      const jwtRefreshPayload: JwtRefreshPayloadExtended = {
        userId: injectDTO.userId,
      };

      const jwtAccessPayload: JwtAccessPayloadExtended = {
        userId: injectDTO.userId,
        role: injectDTO.role,
      };

      const jwt = jwtRefreshCreation(jwtRefreshPayload);
      const accessToken = jwtAccessCreation(jwtAccessPayload);

      //!Extend gareko userdetails lai with token variable
      const userDetails: IUserDetails & { token: string } = {
        userId: injectDTO.userId,
        name: injectDTO.name,
        email: injectDTO.email,
        picture: injectDTO.picture,
        phoneNumber: injectDTO.phoneNumber,
        token: accessToken,
      };

      res.cookie("token", jwt, {
        httpOnly: true, // Must be false to access in JS
        secure: true, // For local development. Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
      });

      successHandler(res, 201, userDetails, "User logged in successfully!");
    } catch (e) {
      next(e);
    }
  };

  //!This is for generating access token
  generateAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.cookies.token;
      if (!refreshToken) {
        throw new CustomError("No refresh token received", 401);
      }

      const verifiedToken = jwtRefreshVerification(refreshToken);

      if (!verifiedToken) {
        throw new CustomError("Unauthorized", 500);
      }

      const user = await userService.getUserByEmail(verifiedToken.email);

      if (!user) {
        throw new CustomError("User not found", 404);
      }

      const jwtPayload: JwtAccessPayloadExtended = {
        userId: user.userId,
        role: user.role,
      };

      const accessToken = jwtAccessCreation(jwtPayload);

      return successHandler(res, 201, accessToken, "Access token received");
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      if (!cookies?.token) throw new CustomError("No token recieved", 204);

      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return successHandler(res, 200, null, "Cookie cleared logged out");
    } catch (e) {
      next(e);
    }
  };
}

export const authController = new AuthController();
