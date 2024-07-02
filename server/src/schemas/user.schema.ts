import * as yup from "yup"; // Import all of yup
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";

export const userRegisterSchema: yup.ObjectSchema<UserRegisterDTO> = yup.object(
  {
    userId: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    phoneNumber: yup.string(),
  }
);

export const userLoginSchema: yup.ObjectSchema<UserLoginDTO> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
