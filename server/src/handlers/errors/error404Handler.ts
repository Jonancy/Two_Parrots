import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "./customError";

export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new CustomError(`API Not Found - ${req.originalUrl}`, 404);
};
