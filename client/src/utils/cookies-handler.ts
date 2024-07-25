import Cookies from "js-cookie";
import { ICartItem } from "@/interfaces/product.interfaces";

// export const getCookies = (name: string) => {
//   console.log(name);
//   console.log("All cookies:", Cookies.get());
//   console.log(Cookies.get(name));
//   return Cookies.get(name);
// };

// Load cart items from cookies
export const loadCartItemsFromCookies = (): ICartItem[] => {
  const storedCartItems = Cookies.get("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
};

// Save cart items to cookies
export const saveCartItemsToCookies = (items: ICartItem[]) => {
  console.log(items);

  Cookies.set("cartItems", JSON.stringify(items), { expires: 7 }); // Expires in 7 days
};
