import { LoginUser, RegisterUser } from "@/api/auth/auth.api";
import { toast } from "@/components/ui/use-toast";
import CustomError from "@/handlers/errors/customError";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { ILoginDTO, IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import { IUserWithAccessToken } from "@/interfaces/user.interfaces";
import { setData } from "@/redux/slice/userSlice";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useLoginUserQuery = (): UseMutationResult<
  IApiResponse<IUserWithAccessToken>,
  CustomError,
  ILoginDTO
> => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: ILoginDTO) => LoginUser(data),

    onSuccess: (data) => {
      const localPayload: IUserWithAccessToken = data.data;
      dispatch(setData(localPayload));
      toast({
        title: data.message,
      });
    },
    onError: (e: CustomError) => {
      console.log("error", e);
      toast({
        title: e.response.data.message,
        duration: 2000,
      });
    },
  });
};

export const useRegisterUserQuery = (): UseMutationResult<
  IApiResponse<IUserWithAccessToken>,
  CustomError,
  IUserRegisterDTO
> => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: IUserRegisterDTO) => RegisterUser(data),

    onSuccess: (data) => {
      const localPayload: IUserWithAccessToken = data.data;
      dispatch(setData(localPayload));
      toast({
        title: data.message,
      });
    },
    onError: (e: CustomError) => {
      console.log("error", e);
      toast({
        title: e.response.data.message,
        duration: 2000,
      });
    },
  });
};
