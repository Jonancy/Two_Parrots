import { Response } from "express-serve-static-core";

export const successHandler = <T>(
  res: Response,
  status: number = 200,
  data: T = {} as T,
  message: string = "Success"
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
