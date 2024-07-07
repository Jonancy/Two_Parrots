import { ILoginDTO } from "@/interfaces/auth.interfaces";
import * as Yup from "yup";

export const userLoginValidationSchema: Yup.ObjectSchema<ILoginDTO> =
  Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
