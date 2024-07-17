import { IFinalPayment, IOrderDTO } from "@/interfaces/order.interfaces";
import { axiosInstance } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";

export const orderProduct = async (
  data: IOrderDTO
): Promise<IApiResponse<{ payment_url: string }>> => {
  return (await axiosInstance.post(`/user/order/createOrder`, data)).data;
};

export const paymentProduct = async (data: IFinalPayment) => {
  return (await axiosInstance.post(`/user/orders/payment`, data)).data;
};
