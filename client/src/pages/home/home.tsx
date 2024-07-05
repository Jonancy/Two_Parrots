import { loadCartItemsFromCookies } from "@/utils/cookies-handler";
import CreateProductVariantForm from "../admin/addVariant";
import ProductTable from "../admin/productLists";
import SpecificProduct from "../client/specifcProduct";
import OrderPage from "../client/orderPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IUserRegisterDTO, IUserState } from "@/interfaces/user.interfaces";
import { useGetUsersQuery } from "@/queries/user/user.query";
import { useRegisterUser } from "@/queries/auth/userRegister.query";
import Page2 from "./page2";
import Page1 from "./page1";

function Home() {
  const authGoogle = async () => {
    window.open("http://localhost:8000/api/v1/auth/google/register", "_self");
  };

  const [currentPage, setCurrentPage] = useState(<Page1 />);

  const [newUser, setNewUser] = useState<IUserRegisterDTO>({
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const users = useGetUsersQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

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

  // if (users.isLoading) return <p>Loading...</p>;

  // if (users.error) return <p>{users.error.response.data.message}</p>;

  console.log(newUser);

  const createUser = useRegisterUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate(newUser);
  };

  if (createUser.isSuccess) {
    console.log("created");
  }

  if (createUser.error) {
    console.log(createUser.error.response.data.message);
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<Page1 />)}> Page1 </button>
      <button onClick={() => setCurrentPage(<Page2 />)}> Page2 </button>
      {currentPage}
      {/* Home sdsd
      <p>,P adsdas dasdas sdsass dasdas</p> */}
      {/* <CreateProductVariantForm /> */}
      {/* <ProductTable products={products} /> */}
      {/* <SpecificProduct product={products} /> */}
      {/* <OrderPage /> */}
      {/* <button onClick={authGoogle}>Google</button> */}
      {/* <p>{JSON.stringify(postQuery.data)}</p>
      <button onClick={() => newPostMutation.mutate("New")}>Add post</button> */}
      {/* <div>
        {users.data ? (
          users.data.map((user) => (
            <p key={user.userId}>
              {user.userId} - {user.name}
            </p>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div> */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
export default Home;
