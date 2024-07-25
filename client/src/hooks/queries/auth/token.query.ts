import { generateAccessToken } from "@/api/token/token.api";
import { QUERY_TOKEN_KEY } from "@/constants/query.constant";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { RootState } from "@/redux/store/reduxStore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useTokenQuery = (): UseQueryResult<
  IApiResponse<{ token: string }>
> => {
  const accessToken = useSelector((state: RootState) => state.user.token);
  console.log(accessToken);

  return useQuery({
    queryKey: [QUERY_TOKEN_KEY],
    queryFn: () => {
      return generateAccessToken();
    },
    enabled: false,
  });
};
