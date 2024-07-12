import { lazy } from "react";
import { IRouteTypes } from "@/interfaces/routes.interfaces";
const PaymentSuccess = lazy(() => import("@/pages/client/paymentSuccess"));
const Profile = lazy(() => import("@/pages/client/profile"));
const Home = lazy(() => import("@/pages/home/home"));

export const userRoutes: IRouteTypes[] = [
  {
    id: "home",
    path: "/",
    element: Home,
    hasHomeLayout: true,
  },

  {
    id: "payment",
    path: "/paymentSuccess",
    element: PaymentSuccess,
    hasHomeLayout: true,
  },
  {
    id: "profile",
    path: "/profile/:userId",
    element: Profile,
    hasHomeLayout: true,
  },
];
