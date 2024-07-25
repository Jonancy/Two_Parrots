import { addProductVariant, updateProductSizes } from "@/api/admin/product.api";
import { toast } from "@/components/ui/use-toast";
import { ISizeUpdateDTO } from "@/dtos/product.dto";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

export const useCreateProductVariant = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  {
    formData: FormData;
    productId: string;
  }
> => {
  return useMutation({
    mutationFn: ({ formData, productId }) => {
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

export const useUpdateProductSizeQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { form: ISizeUpdateDTO; variantId: string; productId: string }
> => {
  const useClientQuery = new QueryClient();

  return useMutation({
    mutationFn: ({ form, variantId }) => updateProductSizes(form, variantId),
    onSettled: (success, error, variables) => {
      if (error) {
        console.log(variables.form, "as");
        toast({
          title: error.response.data.message,
        });
      } else {
        // console.log(variables.productId, "as");

        useClientQuery.invalidateQueries({
          queryKey: ["productsClient", variables.productId],
        });
        toast({
          title: success?.message,
        });
      }
    },
  });
};
