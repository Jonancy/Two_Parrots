import { lazy } from "react";
import { IRouteTypes } from "@/interfaces/routes.interfaces";
const ProductPage = lazy(() => import("@/pages/product/product.page"));
const MainProfile = lazy(() => import("@/pages/client/profile/mainProfile"));
const Home = lazy(() => import("@/pages/client/home"));
const FilterProducts = lazy(
  () => import("@/pages/client/product/filterProducts"),
);
const CheckOut = lazy(() => import("@/pages/client/product/checkOut"));
const SpecificProduct = lazy(
  () => import("@/pages/client/product/specificProduct"),
);
const PaymentSuccess = lazy(() => import("@/pages/client/paymentSuccess"));
// const Profile = lazy(() => import("@/pages/client/profile"));

export const userRoutes: IRouteTypes[] = [
  {
    id: "home",
    path: "/",
    element: Home,
    hasHomeLayout: true,
  },

  {
    id: "payment",
    path: "/payment-success",
    element: PaymentSuccess,
    hasHomeLayout: true,
  },
  {
    id: "profile",
    path: "/profile/:userId",
    element: MainProfile,
    hasHomeLayout: true,
  },
  {
    id: "specificProduct",
    path: "/product/:productId",
    element: SpecificProduct,
    hasHomeLayout: true,
  },
  {
    id: "specificProduct",
    path: "/product/check-out",
    element: CheckOut,
    hasHomeLayout: true,
  },
  {
    id: "filterProducts",
    path: "/product/filter-products",
    element: FilterProducts,
    hasHomeLayout: true,
  },
  {
    id: "productDetails",
    path: "/product",
    element: ProductPage,
    hasHomeLayout: true,
  },
];
