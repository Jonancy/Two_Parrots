import { addProductVariant } from "@/api/admin/product.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateProductVariant = () => {
  return useMutation({
    mutationFn: ({
      formData,
      productId,
    }: {
      formData: FormData;
      productId: string;
    }) => {
      return addProductVariant(formData, productId);
    },

    onSettled: (success, error) => {
      if (error) {
        console.log("faield", error);
      } else {
        console.log("succcess");
      }
    },
  });
};
