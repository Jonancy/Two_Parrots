import { lazy } from "react";
import { IRouteTypes } from "@/interfaces/routes.interfaces";
const EditProducts = lazy(() => import("@/pages/admin/products/editProducts"));
const AddProuctVariant = lazy(
  () => import("@/pages/admin/products/addVariant")
);
const ProductLists = lazy(() => import("@/pages/admin/products/productLists"));
const AddProducts = lazy(() => import("@/pages/admin/products/addProducts"));
const Dashboard = lazy(() => import("@/pages/admin/dashboard/index.dashboard"));

export const adminRoutes: IRouteTypes[] = [
  {
    id: "dashboard",
    path: "/dashboard/admin",
    element: Dashboard,
    hasAdminLayout: true,
    hasAuth: true,
  },
  {
    id: "addProducts",
    path: "/dashboard/products",
    element: ProductLists,
    hasAdminLayout: true,
    hasAuth: true,
  },
  {
    id: "addProducts",
    path: "/dashboard/products/add-products",
    element: AddProducts,
    hasAdminLayout: true,
    hasAuth: true,
  },
  {
    id: "addVariant",
    path: "/dashboard/products/:productId/add-variant",
    element: AddProuctVariant,
    hasAdminLayout: true,
    hasAuth: true,
  },
  {
    id: "addVariant",
    path: "/dashboard/products/:productId/edit-product",
    element: EditProducts,
    hasAdminLayout: true,
    hasAuth: true,
  },
];
