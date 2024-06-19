import { Router } from "express";

import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";
import { loginLimiter } from "../middlewares/auth/loginLimiter.middleware";
import { authController } from "../controllers/auth.controller";
import { handleSingleFileUpload } from "../middlewares/upload/upload.middleware";
import { uploadFile } from "../utils/multer-manager";
import { validateSchema } from "../validations/validator";
import {
  checkUserExistence,
  checkUserLogin,
} from "../middlewares/user/user.middleware";

export const authRoutes = Router();

authRoutes.post(
  "/registerUser",
  // uploadFile.single("image"),
  validateSchema(userRegisterSchema),
  checkUserExistence,
  // handleSingleFileUpload("image", "twoParrot"),
  authController.registerUser
);

authRoutes.post(
  "/loginUser",
  loginLimiter,
  validateSchema(userLoginSchema),
  checkUserLogin,
  authController.loginUser
);

authRoutes.get("/refresh", authController.generateAccessToken);

authRoutes.post("/logout", authController.logout);
