import { useAdminDashboardCheck } from "@/queries/auth/adminDashboard.query";

export default function AdminAuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  //!Wont be using this its for validating on the frontend only using interceptors as a middleware
  //! the authorzation will be done
  // const
  const checkRole = useAdminDashboardCheck();

  console.log(checkRole);

  if (checkRole.isError) {
    return <h1>No auth </h1>;
  } else {
    return <div>{children}</div>;
  }
}
