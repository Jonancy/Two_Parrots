import { addProductVariant } from "@/api/admin/product.api";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useCreateProductVariant = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  {
    formData: FormData;
    productId: string;
  }
> => {
  return useMutation({
    mutationFn: ({
      formData,
      productId,
    }: {
      formData: FormData;
      productId: string;
    }) => {
      return addProductVariant(formData, productId);
    },

    onSettled: (_, error) => {
      if (error) {
        console.log("faield", error);
      } else {
        console.log("succcess");
      }
    },
  });
};
