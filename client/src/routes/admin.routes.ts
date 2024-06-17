
import Dashboard from "@/pages/admin/dashboard/index.dashboard";
import Request from "@/pages/admin/Request";
import { lazy } from "react";






export const adminRoutes = [
    {
        id: "dashboard",
        path: "/dashboard/admin",
        component: Dashboard,
        hasHomeLayout: false,

    },
   
    
];
