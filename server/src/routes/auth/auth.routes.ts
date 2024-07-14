import { Router } from "express";

import { userLoginSchema, userRegisterSchema } from "../../schemas/user.schema";
import { loginLimiter } from "../../middlewares/auth/loginLimiter.middleware";
import { authController } from "../../controllers/auth.controller";
import { handleSingleFileUpload } from "../../middlewares/upload/upload.middleware";
import { uploadFile } from "../../utils/multer-manager";
import { validateSchema } from "../../validator";
import {
  checkUserExistence,
  checkUserLogin,
} from "../../middlewares/user/user.middleware";
import { googleAuthRoutes } from "./googleAuth.routes";

export const authRoutes = Router();

authRoutes.use("/google", googleAuthRoutes);
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
