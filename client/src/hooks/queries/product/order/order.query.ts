import { orderProduct } from "@/api/order/order.api";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { IOrderDTO } from "@/interfaces/order.interfaces";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useOrderCart = (): UseMutationResult<
  IApiResponse<{ payment_url: string }>,
  CustomError,
  IOrderDTO
> => {
  return useMutation({
    mutationFn: (orderDTO: IOrderDTO) => orderProduct(orderDTO),
    onSettled: () => {},
  });
};
