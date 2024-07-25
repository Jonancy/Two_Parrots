import { ICartItem } from "@/interfaces/product.interfaces";

//!Session remains until the tab or browser is closed tei vayera yo nachalauni lol
export const loadCartItemsFromSession = (): ICartItem[] => {
  const storedCartItems = sessionStorage.getItem("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
};

// Save cart items to sessionStorage
export const saveCartItemsToSession = (items: ICartItem[]) => {
  sessionStorage.setItem("cartItems", JSON.stringify(items));
};
