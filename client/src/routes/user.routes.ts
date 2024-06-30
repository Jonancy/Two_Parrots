import HomeLayout from "@/layout/client/Home.Layout";
import PaymentSuccess from "@/pages/client/paymentSuccess";
import Home from "@/pages/home/index.home";
import Test from "@/pages/test";

export const userRoutes = [
  {
    id: "home",
    path: "/",
    component: Home,
    hasHomeLayout: true,
    hasAdminLayout: false,
    layout: HomeLayout,
    requiredAuth: false,
  },
  {
    id: "home",
    path: "/test",
    component: Test,
    hasHomeLayout: true,
    hasAdminLayout: false,
    layout: HomeLayout,
    requiredAuth: false,
  },
  {
    id: "payment",
    path: "/paymentSuccess",
    component: PaymentSuccess,
    hasHomeLayout: true,
    hasAdminLayout: false,
    layout: HomeLayout,
    requiredAuth: false,
  },
];
