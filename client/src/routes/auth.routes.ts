import { IRouteTypes } from "@/interfaces/routes.interfaces";
import { lazy } from "react";
const LoginPage = lazy(() => import("@/pages/auth/loginPage"));

export const authRoutes: IRouteTypes[] = [
  {
    id: "login",
    path: "/login",
    element: LoginPage,
  },
];
