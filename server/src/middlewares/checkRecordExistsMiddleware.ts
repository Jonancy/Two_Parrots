import { Request, Response, NextFunction } from "express-serve-static-core";
import { prisma } from "../..";
import CustomError from "../handlers/errors/customError";

//!So yo chai dynamic checker for any data if its available or not like the required table and the required id
//! is sent then using the bracket notation dot notation is not possible cuz we dont know what the data is going to be sent
//! So tei dynamic banauna ko lai

//TODO: Wont be using this if so will fix it later
export const checkRecordExistsMiddleware =
  (table: string, idField: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[idField];
      console.log(id);

      const check = await prisma[table].findFirst({
        where: { [idField]: id },
      });

      if (!check) {
        throw new CustomError(`${table} with ${idField} ${id} not found`, 404);
      }

      req[table] = check;
      next();
    } catch (e) {
      next(e);
    }
  };
