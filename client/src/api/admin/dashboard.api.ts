import { privateAxiosInstance } from "../index.api";

export const checkAdmin = () => {
  return privateAxiosInstance.get("/admin/dashboard");
};
