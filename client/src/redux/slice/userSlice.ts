// src/slice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "@/utils/localStorage-handler";
import { IUserWithAccessToken } from "@/interfaces/user.interfaces";

const localStorageData = getLocalStorage();

//!The user state is only used and the token is extended kina ki i dont want to store the access token on the local storage
//! tei cache ma store garchu so extend gareko naya interface

const initialState: IUserWithAccessToken = {
  userId: localStorageData?.userId ?? "",
  picture: localStorageData?.picture ?? "",
  name: localStorageData?.name ?? "",
  email: localStorageData?.email ?? "",
  number: localStorageData?.number ?? "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IUserWithAccessToken>) => {
      const { userId, picture, name, email, token, number } = action.payload;
      setLocalStorage({ userId, picture, name, email, number });
      state.userId = userId;
      state.picture = picture;
      state.name = name;
      state.email = email;
      state.token = token;
      state.number = number;
    },
    updateData: (
      state,
      action: PayloadAction<Partial<IUserWithAccessToken>>
    ) => {
      const { userId, picture, name, email, token, number } = action.payload;
      if (userId !== undefined) state.userId = userId;
      if (picture !== undefined) state.picture = picture;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (token !== undefined) state.token = token;
      if (number !== undefined) state.number = number;

      setLocalStorage({
        userId: state.userId,
        picture: state.picture,
        name: state.name,
        email: state.email,
        number: state.number,
      });
    },
    clearData: (state) => {
      clearLocalStorage();
      state.userId = "";
      state.picture = "";
      state.name = "";
      state.email = "";
      state.token = "";
      state.number = "";
    },
  },
});

export const { setData, clearData, updateData } = userSlice.actions;

export default userSlice.reducer;
