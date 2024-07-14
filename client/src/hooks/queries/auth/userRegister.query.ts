import { useToast } from "@/components/ui/use-toast";
import { QUERY_USERS_KEY } from "@/constants/query.constant";
import { RegisterUser } from "@/api/auth/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserRegisterDTO } from "@/interfaces/auth.interfaces";

export const useRegisterUserQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: IUserRegisterDTO) => await RegisterUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_USERS_KEY] });
      //     queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("pass");
      toast({
        title: "New User Created",
      });
      //   },
    },

    onError: (e) => {
      console.log("alal");
      console.log(e.response.data.message);
      toast({
        title: e.response.data.message,
      });
    },
  });
};
