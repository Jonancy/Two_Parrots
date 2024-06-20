import { Users } from "@prisma/client";
import { Request } from "express";

//!Extending the request so that we can inject the values or k airacha request ma tha pauna ko lai
declare global {
  namespace Express {
    export interface Request {
      user: Users;
      productImage: string;
      images: { [key: string]: string[] };
    }
  }
}
