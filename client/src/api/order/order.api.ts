import { IFinalPayment, IOrderDTO } from "@/interfaces/order.interfaces";
import { axiosInstance } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";

export const orderProduct = async (data: IOrderDTO) => {
  return (await axiosInstance.post(`/user/order/createOrder`, data)).data;
};

export const paymentProduct = async (data: IFinalPayment) => {
  return (await axiosInstance.post(`/user/order/payment`, data)).data;
};
