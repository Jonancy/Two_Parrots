import { Router } from "express";
import { userController } from "../../controllers/user.controller";
import { handleMultipleFileUpload } from "../../middlewares/upload/upload.middleware";
import { userRegisterSchema } from "../../schemas/user.schema";
import { Request, Response } from "express-serve-static-core";
import { uploadFile } from "../../utils/multer-manager";
import { validateSchema } from "../../validator";
import { checkUserExistence } from "../../middlewares/user/user.middleware";
import { userOrderRoutes } from "./order.routes";
import { userProductRoutes } from "./product.routes";
import { checkRecordExistsMiddleware } from "../../middlewares/checkRecordExistsMiddleware";
import { ClientAuthRole } from "../../middlewares/auth/roleAuth.middleware";

export const userRoutes = Router();
userRoutes.use("/order/:userId", ClientAuthRole(), userOrderRoutes);
userRoutes.use("/product", userProductRoutes);

userRoutes.get("/getUsers", userController.getUserDetails);

userRoutes.get(
  "/profile/:userId",
  ClientAuthRole(),
  userController.getProfileDetails
);

userRoutes.get("/getSpecificUser/:id", userController.getSpecificUser);

userRoutes.patch(
  "/updateUser/:userId",
  ClientAuthRole(),
  userController.updateUserDetails
);
userRoutes.patch(
  "/updateUserPass/:userId",
  ClientAuthRole(),
  userController.updateUserPasswordDetails
);

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
