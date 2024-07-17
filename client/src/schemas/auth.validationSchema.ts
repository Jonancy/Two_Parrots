import { ILoginDTO, IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import * as yup from "yup";

export const userLoginValidationSchema: yup.ObjectSchema<ILoginDTO> =
  yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

export const userRegisterValidationSchema: yup.ObjectSchema<IUserRegisterDTO> =
  yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
