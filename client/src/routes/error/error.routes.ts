import { IRouteTypes } from "@/interfaces/routes.interfaces";
import Error404 from "@/pages/error/error404";
import { lazy } from "react";
const LoginExpiredAlert = lazy(
  () => import("@/components/alert/loginExpiredAlert"),
);

export const errorRoutes: IRouteTypes[] = [
  {
    id: "error404",
    element: Error404,
    path: "*",
  },
  {
    id: "loginExpiration",
    element: LoginExpiredAlert,
    path: "/loginExpired",
  },
];
