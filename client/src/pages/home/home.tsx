import { loadCartItemsFromCookies } from "@/utils/cookies-handler";
import CreateProductVariantForm from "../admin/addVariant";
import ProductTable from "../admin/productLists";
import SpecificProduct from "../client/specifcProduct";
import OrderPage from "../client/orderPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IUserState } from "@/interfaces/user.interfaces";
import { useGetUsersQuery } from "@/queries/user/user.query";
import Page2 from "./page2";
import Page1 from "./page1";
import { IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import { useRegisterUserQuery } from "@/queries/auth/userRegister.query";
import { getAccessToken } from "@/helpers/token-helper";
import ProductCard from "@/components/cards/productCard";
import { useGetAllProductsQuery } from "@/queries/product/product.query";

function Home() {
  const authGoogle = async () => {
    window.open("http://localhost:8000/api/v1/auth/google/register", "_self");
  };

  // const postQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(data);
  //       }, 1000);
  //     });
  //   },
  // });

  // const newPostMutation = useMutation({
  //   mutationFn: async (name: string) => {
  //     const newData = [...data, { name }];
  //     setData(newData);
  //     return newData;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //     console.log("pass");
  //   },
  // });

  const products = useGetAllProductsQuery();
  console.log(products.data);

  return (
    <div>
      <div className="grid grid-cols-5 mx-20 gap-6">
        {products?.data?.data?.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
}
export default Home;
