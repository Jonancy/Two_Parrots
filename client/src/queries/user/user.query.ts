import { QUERY_USERS_KEY } from "@/constants/query.constant";
import { IUserState } from "@/interfaces/user.interfaces";
import { getUsers } from "@/services/auth/auth.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUsersQuery = (): UseQueryResult<IUserState[] | []> => {
  return useQuery({
    queryKey: [QUERY_USERS_KEY],
    queryFn: async () => {
      const user = await getUsers();
      console.log(user);
      return user.data.data;
    },
  });
};
