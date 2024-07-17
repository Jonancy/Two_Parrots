import { IRouteTypes } from "@/interfaces/routes.interfaces";
import { lazy } from "react";
const LoginRegister = lazy(() => import("@/pages/auth/loginRegister"));

export const authRoutes: IRouteTypes[] = [
  {
    id: "login",
    path: "/login",
    element: LoginRegister,
  },
  {
    id: "login",
    path: "/register",
    element: LoginRegister,
  },
];
