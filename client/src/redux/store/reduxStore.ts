import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import cartReducer from "../slice/cartSlice"; // Import the cart slice

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, // Add the cart slice to the reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
