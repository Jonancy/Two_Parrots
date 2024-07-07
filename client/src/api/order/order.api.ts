import { IFinalPayment, IOrderDTO } from "@/interfaces/order.interfaces";
import { axiosInstance } from "../index.api";

export const orderProduct = (data: IOrderDTO) => {
  return axiosInstance.post(`/user/orders/createOrder`, data);
};

export const paymentProduct = (data: IFinalPayment) => {
  return axiosInstance.post(`/user/orders/payment`, data);
};
