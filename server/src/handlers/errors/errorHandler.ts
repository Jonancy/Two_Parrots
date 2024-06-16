import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "./customError";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = error?.message || "Something went wrong";
  const status = error instanceof CustomError ? error.status : 500;

  return res.status(status).json({
    success: false,
    message: errorMessage,
  });
};
