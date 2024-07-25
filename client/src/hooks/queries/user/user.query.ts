import {
  QUERY_SPECIFIC_USER_KEY,
  QUERY_USERS_KEY,
} from "@/constants/query.constant";
import { IUserState } from "@/interfaces/user.interfaces";
import { getUsers } from "@/api/auth/auth.api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUsersQuery = (): UseQueryResult<IUserState[] | []> => {
  return useQuery({
    queryKey: [QUERY_USERS_KEY],
    queryFn: async () => {
      const user = await getUsers();
      console.log(user);
      return user.data;
    },
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
