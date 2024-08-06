import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpdateProfile from "@/components/profile/updateProfile";
import OrdersTable from "@/components/profile/ordersTable";
import ProductCard from "@/components/product/card";
import {
  useGetUserOrdersQuery,
  useGetUserProfileQuery,
  useGetUserWishListQuery,
} from "@/hooks/queries/user/user.query";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function MainProfile() {
  const { userId } = useParams();
  console.log(userId);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const userDetails = useGetUserProfileQuery(userId);

  const orderDetails = useGetUserOrdersQuery(userId);

  const wishListDetails = useGetUserWishListQuery(userId, isEnabled);

  console.log(wishListDetails);

  if (userDetails.isLoading) {
    return <p>loading...</p>;
  }

  if (
    userDetails.error?.response.data.message === "You have no authorization"
  ) {
    return <p>hehe no auth u a admin</p>;
  }

  if (
    userDetails.error?.response.data.message ===
    "You have no authorization non-user"
  ) {
    return <p>hehe no auth </p>;
  }

  console.log(userDetails?.data?.data?.picture);
  console.log(userDetails?.data?.data);

  const handleWishListTab = () => {
    if (!isEnabled) {
      console.log("asas");

      setIsEnabled(true);
    }
    console.log("asas");
  };

  return (
    <div className="flex flex-col bg-muted/40 p-6">
      <div className="min-h-screen rounded-md border">
        <header className="flex items-center gap-4 bg-background px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src={userDetails?.data?.data.picture}
              className="h-6 w-6 rounded-full object-cover"
            ></img>
            <div className="grid gap-0.5">
              <h1 className="text-lg font-semibold">
                {userDetails?.data?.data.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {userDetails?.data?.data.email}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </header>
        <div className="h-full flex-1 p-6">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="border-b">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist" onMouseEnter={handleWishListTab}>
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="pt-6">
              <div className="grid gap-6">
                <div>
                  <div>
                    <h1>Recent Orders</h1>
                  </div>
                  <div>
                    <OrdersTable orderDetails={orderDetails.data?.data ?? []} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="wishlist" className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {wishListDetails.data?.data.map((product) => (
                  <ProductCard {...product.product} />
                ))}
                {/* <div>
                  <div>
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={200}
                      height={200}
                      className="mx-auto aspect-square rounded-md object-cover"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium">Cozy Sweater</h3>
                      <p className="text-sm text-muted-foreground">$49.99</p>
                      <div className="mt-2 flex justify-center gap-2">
                        <Button size="sm">Add to Cart</Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </TabsContent>
            <TabsContent value="settings" className="pt-6">
              <UpdateProfile {...userDetails.data?.data} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
