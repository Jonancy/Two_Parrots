import { Router } from "express";
import { userController } from "../../controllers/user.controller";
import { handleMultipleFileUpload } from "../../middlewares/upload/upload.middleware";
import { userRegisterSchema } from "../../schemas/user.schema";
import { Request, Response } from "express-serve-static-core";
import { uploadFile } from "../../utils/multer-manager";
import { validateSchema } from "../../validations/validator";
import { checkUserExistence } from "../../middlewares/user/user.middleware";
import { userOrderRoutes } from "./order.routes";
import { userProductRoutes } from "./product.routes";
import { checkRecordExistsMiddleware } from "../../middlewares/checkRecordExistsMiddleware";

export const userRoutes = Router();
userRoutes.use("/orders", userOrderRoutes);
userRoutes.use("/products", userProductRoutes);

userRoutes.get("/getUsers", userController.getUserDetails);

userRoutes.get("/getSpecificUser/:id", userController.getSpecificUser);

userRoutes.post(
  "/upload",
  uploadFile.fields([{ name: "gallery", maxCount: 5 }]),
  validateSchema(userRegisterSchema),
  checkUserExistence,
  handleMultipleFileUpload(["gallery"], "twoParrot"),
  (req: Request, res: Response) => {
    let images = req.images;
    console.log(images);
    res.status(201).json({ images: req.images });
  }
);

userRoutes.post(
  "/:userId",
  checkRecordExistsMiddleware("users", "userId"),
  (req: Request, res: Response) => {
    res.status(201).json({ user: req["users"] });

    console.log("pass");
  }
);
