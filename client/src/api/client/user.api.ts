import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance, privateAxiosInstance } from "../index.api";
import { IOrderTableDetails } from "@/interfaces/order.interfaces";
import { IUserState } from "@/interfaces/user.interfaces";
import { IPasswordChangeDTO } from "@/dtos/user.dto";

export const getUserProfileDetails = async (userId: string | undefined) => {
  return (await privateAxiosInstance.get(`/user/profile/${userId}`)).data;
};

export const specificUser = (id: string) => {
  return axiosInstance.get(`/user/getSpecificUser/${id}`);
};

export const specificUsersOrders = async (
  userId: string | undefined,
): Promise<IApiResponse<IOrderTableDetails[] | []>> => {
  return (
    await privateAxiosInstance.get(`/user/order/${userId}/getAllOrderDetails`)
  ).data;
};

export const updateUserGeneralDetails = async (
  userDetails: IUserState,
  id: string,
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.patch(`/user/updateUser/${id}`, userDetails)
  ).data;
};

export const updateUserPasswordDetails = async (
  userDetails: IPasswordChangeDTO,
  id: string,
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.patch(`/user/updateUserPass/${id}`, userDetails)
  ).data;
};
