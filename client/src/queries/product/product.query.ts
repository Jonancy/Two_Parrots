import { addProduct, getAllProducts } from "@/api/admin/product.api";
import { getAllProductClient } from "@/api/client/product.api";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { IProduct } from "@/interfaces/product.interfaces";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetAllAdminProductsQuery = (): UseQueryResult<
  IApiResponse<IProduct[]>,
  CustomError
> => {
  return useQuery({
    queryKey: [QUERY_PRODUCTS_KEY],
    queryFn: getAllProducts,
    retry: 0,
  });
};

export const useGetAllClientProductsQuery = (
  isEntered: boolean
): UseQueryResult<IApiResponse<IProduct[]>, CustomError> => {
  return useQuery({
    queryKey: ["productsClient"],
    queryFn: getAllProductClient,
    enabled: isEntered,
    retry: 0,
    // staleTime: 1000000,
  });
};

export const useAddProductQuery = () => {
  return useMutation({
    mutationFn: addProduct,
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
      }
    },
  });
};
