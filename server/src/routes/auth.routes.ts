import { Router } from "express";
import {
  checkUserExistence,
  checkUserLogin,
} from "../middlewares/user.middleware";
import { userValidation } from "../validations/user.validaton";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";
import { loginLimiter } from "../middlewares/loginLimiter.middleware";
import { authController } from "../controllers/auth.controller";
import { handleSingleFileUpload } from "../middlewares/upload.middleware";
import { uploadFile } from "../utils/multer-manager";

export const authRoutes = Router();

authRoutes.post(
  "/registerUser", uploadFile.single('image'),
  userValidation.userRegisterValidation(userRegisterSchema),
  checkUserExistence,
  handleSingleFileUpload('image', 'twoParrot'), 
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
