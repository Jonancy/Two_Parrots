import AddProducts from "@/pages/admin/addProducts";
import Dashboard from "@/pages/admin/dashboard/index.dashboard";
// AddProducts
// import Request from "@/pages/admin/Request";
// import { lazy } from "react";
export const adminRoutes = [
  {
    id: "dashboard",
    path: "/dashboard/admin",
    component: Dashboard,
    hasHomeLayout: false,
  },
  {
    id: "addProducts",
    path: "/dashboard/products",
    component: AddProducts,
    hasHomeLayout: false,
  },
];
