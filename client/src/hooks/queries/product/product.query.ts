import {
  addProduct,
  getAllProducts,
  updateProduct,
  updateProductImages,
} from "@/api/admin/product.api";
import {
  getAllProductClient,
  getFilterProductClient,
  getFilterTypes,
  getProductSuggestions,
  getSpecificProductClient,
} from "@/api/client/product.api";
import { toast } from "@/components/ui/use-toast";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";
import { IProductDTO } from "@/dtos/product.dto";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IProduct,
} from "@/interfaces/product.interfaces";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetAllAdminProductsQuery = (
  filters: IFilterProduct,
): UseQueryResult<IApiResponse<IFilterProducts>, CustomError> => {
  return useQuery({
    queryKey: [QUERY_PRODUCTS_KEY],
    queryFn: () => getAllProducts(filters),
    retry: 0,
  });
};

export const useGetAllClientProductsQuery = ({
  isEntered,
  filters,
}: IFilterProduct & { isEntered: boolean }): UseQueryResult<
  IApiResponse<IProduct[]>,
  CustomError
> => {
  return useQuery({
    queryKey: ["productsClient", filters],

    queryFn: () => getAllProductClient(filters),
    enabled: isEntered,
    retry: 0,
    // staleTime: 1000000,
  });
};

export const useAddProductQuery = () => {
  return useMutation({
    mutationFn: addProduct,
    onSettled: (success, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success", success);
      }
    },
  });
};

export const useGetSpecificProductQuery = (
  productId: string | undefined,
): UseQueryResult<IApiResponse<IProduct>, CustomError> => {
  return useQuery({
    queryKey: ["productsClient", productId],
    queryFn: () => getSpecificProductClient(productId),
    retry: 0,
  });
};

export const useGetProductSuggestionsQuery = (
  productId: string | undefined,
  isEntered: boolean,
): UseQueryResult<IApiResponse<IProduct[]>, CustomError> => {
  return useQuery({
    queryKey: ["productSuggestions", productId],
    queryFn: () => getProductSuggestions(productId),
    retry: 2,
    enabled: isEntered,
  });
};

export const useGetFilterTypes = (): UseQueryResult<
  IApiResponse<IFilterTypes>,
  CustomError
> => {
  return useQuery({
    queryKey: ["filterTypes"],
    queryFn: getFilterTypes,
  });
};

export const useGetClientFilterProductsQuery = ({
  page,
  filters,
}: IFilterProduct): UseQueryResult<
  IApiResponse<IFilterProducts>,
  CustomError
> => {
  return useQuery({
    queryKey: ["filterProducts", page, filters],
    queryFn: () => getFilterProductClient({ page, filters }),
    retry: 0,
  });
};

export const useUpdateProductQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { form: IProductDTO; productId: string }
> => {
  const useClientQuery = new QueryClient();

  return useMutation({
    mutationFn: ({ form, productId }) => updateProduct(form, productId),
    onSettled: (success, error, variables) => {
      if (error) {
        console.log(variables.form, "as");
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log(variables.productId, "as");

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

export const useUpdateProductImageQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { form: FormData; productId: string }
> => {
  const useClientQuery = new QueryClient();

  return useMutation({
    mutationFn: ({ form, productId }) => updateProductImages(form, productId),
    onSettled: (success, error, variables) => {
      if (error) {
        console.log(variables.form.get("images"), "as");
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log(variables.productId, "as");

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
