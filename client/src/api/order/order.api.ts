import { IFinalPayment, IOrderDTO } from "@/interfaces/order.interfaces";
import { url } from "../index.api";

export const orderProduct = (data: IOrderDTO) => {
  return url.post(`/user/orders/createOrder`, data);
};

export const paymentProduct = (data: IFinalPayment) => {
  return url.post(`/user/orders/payment`, data);
};
