import { lazy } from "react";
import { IRouteTypes } from "@/interfaces/routes.interfaces";
const AddProducts = lazy(() => import("@/pages/admin/addProducts"));
const Dashboard = lazy(() => import("@/pages/admin/dashboard/index.dashboard"));

export const adminRoutes: IRouteTypes[] = [
  {
    id: "dashboard",
    path: "/dashboard/admin",
    element: Dashboard,
    hasAdminLayout: true,
  },
  {
    id: "addProducts",
    path: "/dashboard/products",
    element: AddProducts,
    hasAdminLayout: true,
  },
];
