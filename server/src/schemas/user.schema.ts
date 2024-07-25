import * as yup from "yup"; // Import all of yup
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";

export const userRegisterSchema: yup.ObjectSchema<UserRegisterDTO> = yup.object(
  {
    userId: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }
);

export const userLoginSchema: yup.ObjectSchema<UserLoginDTO> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
