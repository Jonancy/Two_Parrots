import { addProductVariant } from "@/api/admin/product.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateProductVariant = () => {
  return useMutation({
    mutationFn: (formData, productId) => addProductVariant(formData, productId),

    onSettled: (success, error) => {
      if (error) {
        console.log("faield", error);
      } else {
        console.log("succcess");
      }
    },
  });
};
