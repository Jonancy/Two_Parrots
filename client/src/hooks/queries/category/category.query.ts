import { getCategories } from "@/api/admin/category.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    retry: 0,
  });
};
