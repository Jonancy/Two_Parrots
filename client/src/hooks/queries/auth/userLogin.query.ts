import { LoginUser } from "@/api/auth/auth.api";
import { toast } from "@/components/ui/use-toast";
import { ILoginDTO } from "@/interfaces/auth.interfaces";
import { IUserWithAccessToken } from "@/interfaces/user.interfaces";
import { setData } from "@/redux/slice/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useLoginUserQuery = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: ILoginDTO) => {
      return await LoginUser(data);
    },
    onSuccess: (data) => {
      console.log("pass", data.data);
      const localPayload: IUserWithAccessToken = data.data.data;
      dispatch(setData(localPayload));
      toast({
        title: data.data.message,
      });
    },
    onError: (e) => {
      console.log("error", e);
      toast({
        title: e.response.data.message,
        duration: 2000,
      });
    },
  });
};
