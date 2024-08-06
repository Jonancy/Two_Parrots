import {
  addProduct,
  getAllProducts,
  softDeleteProduct,
  updateProduct,
  updateProductImages,
} from "@/api/admin/product.api";
import {
  addProductReviews,
  getAllProductClient,
  getFilterProductClient,
  getFilterTypes,
  getProductSuggestions,
  getSpecificProductClient,
  productReviews,
  wishListProduct,
} from "@/api/client/product.api";
import { toast } from "@/components/ui/use-toast";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";
import { IProductDTO, IProductReviewDTO } from "@/dtos/product.dto";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IMiniProduct,
  IProduct,
  IProductReviews,
} from "@/interfaces/product.interfaces";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
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
  IApiResponse<IMiniProduct[]>,
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
): UseQueryResult<IApiResponse<IMiniProduct[]>, CustomError> => {
  return useQuery({
    queryKey: ["productSuggestions", productId],
    queryFn: () => getProductSuggestions(productId),
    retry: 2,
    enabled: isEntered,
  });
};

export const useGetProductReviewsQuery = (
  productId: string | undefined,
  isEntered: boolean,
): UseQueryResult<IApiResponse<IProductReviews[]>, CustomError> => {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => productReviews(productId),
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
  isEnabled = true,
}: IFilterProduct): UseQueryResult<
  IApiResponse<IFilterProducts>,
  CustomError
> => {
  console.log(isEnabled);

  return useQuery({
    queryKey: ["filterProducts", page, filters],
    queryFn: () => getFilterProductClient({ page, filters }),
    retry: 0,
    enabled: isEnabled,
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

export const useSoftDeleteProductQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { productId: string }
> => {
  const useClientQuery = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }) => softDeleteProduct(productId),
    onSettled: (success, error, variables) => {
      if (error) {
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log(variables.productId, "as");

        useClientQuery.invalidateQueries({
          queryKey: [QUERY_PRODUCTS_KEY],
        });
        toast({
          title: success?.message,
        });
      }
    },
  });
};

export const useWishListProduct = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { productId: string; userId: string }
> => {
  const useClientQuery = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, userId }) => wishListProduct(productId, userId),
    onSettled: (success, error, variables) => {
      if (error) {
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log(variables.productId, "as");

        useClientQuery.invalidateQueries({
          queryKey: ["productsClient"],
        });
        toast({
          title: success?.message,
        });
      }
    },
  });
};

export const useAddProductReviewQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { productId: string; userId: string; review: IProductReviewDTO }
> => {
  const useClientQuery = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, userId, review }) =>
      addProductReviews(productId, userId, review),
    onSettled: (success, error, variables) => {
      if (error) {
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log(variables.productId, "as");

        useClientQuery.invalidateQueries({
          queryKey: ["productReviews"],
        });
        toast({
          title: success?.message,
        });
      }
    },
  });
};
