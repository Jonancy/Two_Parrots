import { checkAdmin } from "@/api/admin/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboardCheck = () => {
  return useQuery({
    queryKey: ["adminDash"],
    queryFn: checkAdmin,
    retry: 0,
  });
};
