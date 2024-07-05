import { getAllProducts } from "@/api/admin/product.api";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetAllProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_PRODUCTS_KEY],
    queryFn: async () => {
      return await getAllProducts();
    },
  });
};
