import { Router } from "express";
import { userController } from "../controllers/user.controller";
// import {Request,Response} from "express-serve-static-core"
import { handleMultipleFileUpload } from "../middlewares/upload.middleware";
import { userValidation } from "../validations/user.validaton";
import { userRegisterSchema } from "../schemas/user.schema";
import { checkUserExistence } from "../middlewares/user.middleware";
import {Request,Response} from "express-serve-static-core"
import { uploadFile } from "../utils/multer-manager";
export const userRoutes = Router();

userRoutes.get("/getUser", userController.getUserDetails);

userRoutes.get("/getSpecificUser/:id", userController.getSpecificUser);

userRoutes.post("/upload", uploadFile.fields([
    { name: "gallery", maxCount: 5 },
  ]),
  userValidation.userRegisterValidation(userRegisterSchema),
  checkUserExistence,
  handleMultipleFileUpload(['gallery'],'twoParrot'),(req:Request,res:Response)=>{
    let images = req.gallery;
    console.log(images);
    res.status(201).json({images: req.gallery });
    
  })


