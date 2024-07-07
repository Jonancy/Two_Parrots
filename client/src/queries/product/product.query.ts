import { getAllProducts } from "@/api/admin/product.api";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { IProduct } from "@/interfaces/product.interfaces";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetAllProductsQuery = (): UseQueryResult<
  IApiResponse<IProduct[]>
> => {
  return useQuery({
    queryKey: [QUERY_PRODUCTS_KEY],
    queryFn: async () => {
      const res = await getAllProducts();
      return res.data;
    },
  });
};
