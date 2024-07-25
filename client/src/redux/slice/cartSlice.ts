import { ICartItem } from "@/interfaces/product.interfaces";
import {
  loadCartItemsFromCookies,
  saveCartItemsToCookies,
} from "@/utils/cookies-handler";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: ICartItem[];
  totalPrice: number;
}

// const initialState: CartState = {
//   items: [],
//   totalPrice: 0,
// };

// Calculate total price
const calculateTotalPrice = (items: ICartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartItemsFromCookies(), // Initialize items from sessionStorage
    totalPrice: calculateTotalPrice(loadCartItemsFromCookies()), // Initialize totalPrice
  } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      //!So this is for checking if the same item has been added or not so the product, variant and its sizes are checked
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId &&
          item.size.sizeId === newItem.size.sizeId
      );

      if (existingItem) {
        console.log("exists");
        console.log(existingItem.quantity);
        console.log(newItem.quantity);

        existingItem.quantity += newItem.quantity;
        const price = newItem.quantity * newItem.price;
        existingItem.price += price;
      } else {
        state.items.push(newItem);
      }

      saveCartItemsToCookies(state.items);

      state.totalPrice = calculateTotalPrice(state.items);
    },

    updateItem(state, action: PayloadAction<ICartItem>) {
      const updatedItem = action.payload;
      const index = state.items.findIndex(
        (item) =>
          item.productId === updatedItem.productId &&
          item.variantId === updatedItem.variantId
      );

      if (index !== -1) {
        state.items[index] = updatedItem;
        saveCartItemsToCookies(state.items);

        // Update totalPrice
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    removeItem(
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        sizeId: string;
      }>
    ) {
      const { productId, variantId, sizeId } = action.payload;
      const index = state.items.findIndex(
        (item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size.sizeId === sizeId
      );

      if (index !== -1) {
        state.items.splice(index, 1);
        saveCartItemsToCookies(state.items);

        // Update totalPrice
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    adjustQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        sizeId: string;
        quantity: number;
      }>
    ) {
      const { productId, variantId, quantity, sizeId } = action.payload;
      const index = state.items.findIndex(
        (item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size.sizeId === sizeId
      );

      if (index !== -1) {
        state.items[index].quantity = quantity;

        // Remove item if quantity is zero or less
        if (quantity <= 0) {
          state.items.splice(index, 1);
        }

        saveCartItemsToCookies(state.items);

        // Update totalPrice
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      sessionStorage.removeItem("cartItems");
      state.totalPrice = 0;
    },
  },
});

export const { addItem, updateItem, removeItem, adjustQuantity, clearCart } =
  cartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: { cart: CartState }): ICartItem[] =>
  state.cart.items;

// Selector to get total price
export const selectTotalPrice = (state: { cart: CartState }): number =>
  state.cart.totalPrice;

export default cartSlice.reducer;
