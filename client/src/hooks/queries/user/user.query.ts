import {
  QUERY_SPECIFIC_USER_KEY,
  QUERY_USERS_KEY,
} from "@/constants/query.constant";
import { IUserState } from "@/interfaces/user.interfaces";
import { getUsers } from "@/api/auth/auth.api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import CustomError from "@/handlers/errors/customError";
import {
  getUserProfileDetails,
  specificUsersOrders,
  updateUserGeneralDetails,
  updateUserPasswordDetails,
} from "@/api/client/user.api";
import { IOrderTableDetails } from "@/interfaces/order.interfaces";
import { IPasswordChangeDTO, IUpdateUserDetailsDTO } from "@/dtos/user.dto";

export const useGetUsersQuery = (): UseQueryResult<
  IApiResponse<IUserState[] | []>,
  CustomError
> => {
  return useQuery({
    queryKey: [QUERY_USERS_KEY],
    queryFn: async () => {
      const user = await getUsers();
      console.log(user);
      return user.data;
    },
  });
};

export const useGetUserProfileQuery = (
  userId: string | undefined,
): UseQueryResult<
  IApiResponse<IUserState & { password: boolean }>,
  CustomError
> => {
  return useQuery({
    queryKey: [QUERY_SPECIFIC_USER_KEY, userId],
    queryFn: () => getUserProfileDetails(userId),
  });
};

export const useGetUserOrdersQuery = (
  userId: string | undefined,
): UseQueryResult<IApiResponse<IOrderTableDetails[] | []>, CustomError> => {
  return useQuery({
    queryKey: ["clientOrders", userId],
    queryFn: () => specificUsersOrders(userId),
  });
};

export const useUpdateUserGeneralDetailsQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { user: IUpdateUserDetailsDTO; userId: string }
> => {
  return useMutation({
    mutationFn: ({ user, userId }) => updateUserGeneralDetails(user, userId),
  });
};

export const useUpdateUserPasswordQuery = (): UseMutationResult<
  IApiResponse<null>,
  CustomError,
  { user: IPasswordChangeDTO; userId: string }
> => {
  return useMutation({
    mutationFn: ({ user, userId }) => updateUserPasswordDetails(user, userId),
  });
};

// export const useGetSpecificUserQuery = ()=>{
//   return useQuery({
//     queryKey:[QUERY_SPECIFIC_USER_KEY],
//     queryFn:async()=>{
//       const user = await
//     }
//   })
// }
