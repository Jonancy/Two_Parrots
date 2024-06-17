// import GetUserRole from "@/Services/user/getUserRole.services";
// import { getUserData } from "@/utils/authStorage";
// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import Loading from "@/pages/Loading";

// export function AdminChecker({ children }: { children: React.ReactNode }) {
//   const { data, loading, error } = GetUserRole();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [redirect, setRedirect] = useState(false);
//   const [showLoading, setShowLoading] = useState(loading);

//   useEffect(() => {
//     // Simulate delay with setTimeout

//     const timeout = setTimeout(() => {
//       setShowLoading(false);
//       if (data === "ADMIN") {
//         setIsAdmin(true);
//       } else {
//         setRedirect(true);
//       }
//     }, 500); // Adjust delay time as needed

//     // Clear timeout on component unmount or if data changes
//     return () => clearTimeout(timeout);
//   }, [data]);

//   if (showLoading) {
//     // Return loading indicator
//     return <Loading />;
//   }

//   if (error) {
//     // Handle error state
//     console.log(error, "error");
//   }

//   if (redirect) {
//     // If user is not admin, redirect to home page
//     return <Navigate to="/" />;
//   }

//   if (isAdmin) {
//     // If user is admin, render children
//     return <>{children}</>;
//   }

//   return null; // Render nothing if none of the conditions are met
// }

// export function AuthorChecker({ children }: { children: React.ReactNode }) {
//   const { data, loading, error } = GetUserRole();
//   const [isAuthor, setIsAuthor] = useState(false);
//   const [redirect, setRedirect] = useState(false);
//   const [showLoading, setShowLoading] = useState(loading);

//   useEffect(() => {
//     // Simulate delay with setTimeout

//     const timeout = setTimeout(() => {
//       setShowLoading(false);
//       if (data === "AUTHOR") {
//         setIsAuthor(true);
//       } else {
//         setRedirect(true);
//       }
//     }, 500); // Adjust delay time as needed

//     // Clear timeout on component unmount or if data changes
//     return () => clearTimeout(timeout);
//   }, [data]);

//   if (showLoading) {
//     // Return loading indicator
//     return <Loading />;
//   }

//   if (error) {
//     // Handle error state
//     console.log(error, "error");
//   }

//   if (redirect) {
//     // If user is not admin, redirect to home page
//     return <Navigate to="/" />;
//   }

//   if (isAuthor) {
//     // If user is admin, render children
//     return <>{children}</>;
//   }

//   return null; // Render nothing if none of the conditions are met
// }

// export function AuthChecker({ children }: { children: React.ReactNode }) {
//   const token = getUserData()?.token;
//   const authentication = token ? true : false;

//   if (authentication) {
//     return <>{children}</>;
//   }

//   return <Navigate to="/login" />;
// }
