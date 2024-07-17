import { IOrderPaymentValidation } from "@/interfaces/order.interfaces";
import * as Yup from "yup";

export const orderValidationSchema: Yup.ObjectSchema<IOrderPaymentValidation> =
  Yup.object({
    userName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });
