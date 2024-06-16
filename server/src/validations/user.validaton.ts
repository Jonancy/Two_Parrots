import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";
import yup, { ValidationError } from "yup";

class UserValidation {
  userRegisterValidation =
    (schema: yup.ObjectSchema<UserRegisterDTO>) =>
    async (
      req: Request<{}, {}, UserRegisterDTO>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error) {
        if (error instanceof ValidationError) {
          res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: error.inner.map((err) => ({
              field: err.path,
              message: err.message,
            })),
          });
        } else {
          next(error);
        }
      }
    };

  userLoginValidation =
    (schema: yup.ObjectSchema<UserLoginDTO>) =>
    async (
      req: Request<{}, {}, UserLoginDTO>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error) {
        if (error instanceof ValidationError) {
          res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: error.inner.map((err) => ({
              field: err.path,
              message: err.message,
            })),
          });
        } else {
          next(error);
        }
      }
    };
}

export const userValidation = new UserValidation();
