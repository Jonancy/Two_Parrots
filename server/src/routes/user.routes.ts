import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { handleMultipleFileUpload } from "../middlewares/upload/upload.middleware";
import { userRegisterSchema } from "../schemas/user.schema";
import { Request, Response } from "express-serve-static-core";
import { uploadFile } from "../utils/multer-manager";
import { validateSchema } from "../validations/validator";
import { checkUserExistence } from "../middlewares/user/user.middleware";
export const userRoutes = Router();

userRoutes.get("/getUser", userController.getUserDetails);

userRoutes.get("/getSpecificUser/:id", userController.getSpecificUser);

userRoutes.post(
  "/upload",
  uploadFile.fields([{ name: "gallery", maxCount: 5 }]),
  validateSchema(userRegisterSchema),
  checkUserExistence,
  handleMultipleFileUpload(["gallery"], "twoParrot"),
  (req: Request, res: Response) => {
    let images = req.gallery;
    console.log(images);
    res.status(201).json({ images: req.gallery });
  }
);
