import { getUserData } from "@/utils/authStorage";
import { Navigate } from "react-router-dom";

export function SubscribtionChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getUserData().token;
  const authentication = token ? true : false;

  if (authentication) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
}
