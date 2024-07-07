import { checkAdmin } from "@/api/admin/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboardCheck = () => {
  return useQuery({
    queryKey: ["adminDash"],
    queryFn: async () => {
      return await checkAdmin();
    },
    retry: 0,
  });
};
