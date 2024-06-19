import { Request, Response, NextFunction } from "express-serve-static-core";
import yup, { ValidationError } from "yup";

//!Dynamic validator The generic type T means we can use what ever schema we want it can be of any type or any object
export const validateSchema =
  <T>(schema: yup.ObjectSchema<T>) =>
  async (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
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

// userLoginValidation =
//   (schema: yup.ObjectSchema<UserLoginDTO>) =>
//   async (
//     req: Request<{}, {}, UserLoginDTO>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       await schema.validate(req.body, { abortEarly: false });
//       next();
//     } catch (error) {
//       if (error instanceof ValidationError) {
//         res.status(400).json({
//           success: false,
//           message: "Validation errors",
//           errors: error.inner.map((err) => ({
//             field: err.path,
//             message: err.message,
//           })),
//         });
//       } else {
//         next(error);
//       }
//     }
//   };
