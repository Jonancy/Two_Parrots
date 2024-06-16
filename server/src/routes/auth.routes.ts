import { Router } from "express";
import {
  checkUserExistence,
  checkUserLogin,
} from "../middlewares/user.middleware";
import { userValidation } from "../validations/user.validaton";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";
import { loginLimiter } from "../middlewares/loginLimiter.middleware";
import { authController } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.post(
  "/registerUser",
  userValidation.userRegisterValidation(userRegisterSchema),
  checkUserExistence,
  authController.registerUser
);

authRoutes.post(
  "/loginUser",
  loginLimiter,
  userValidation.userLoginValidation(userLoginSchema),
  checkUserLogin,
  authController.loginUser
);

authRoutes.get("/refresh", authController.generateAccessToken);

authRoutes.post("/logout", authController.logout);
