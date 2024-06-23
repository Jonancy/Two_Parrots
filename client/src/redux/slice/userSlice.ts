// src/slice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "@/utils/localStorage-handler";
import { IUserState } from "@/interfaces/user.interfaces";

const localStorageData = getLocalStorage();

interface IUserWithAccessToken extends IUserState {
  token: string;
}

const initialState: IUserWithAccessToken = {
  id: localStorageData?.id ?? "",
  picture: localStorageData?.picture ?? "",
  name: localStorageData?.name ?? "",
  email: localStorageData?.email ?? "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IUserWithAccessToken>) => {
      const { id, picture, name, email, token } = action.payload;
      setLocalStorage({ id, picture, name, email });
      state.id = id;
      state.picture = picture;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    updateData: (
      state,
      action: PayloadAction<Partial<IUserWithAccessToken>>
    ) => {
      const { id, picture, name, email, token } = action.payload;
      if (id !== undefined) state.id = id;
      if (picture !== undefined) state.picture = picture;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (token !== undefined) state.token = token;

      setLocalStorage({
        id: state.id,
        picture: state.picture,
        name: state.name,
        email: state.email,
      });
    },
    clearData: (state) => {
      clearLocalStorage();
      state.id = "";
      state.picture = "";
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { setData, clearData, updateData } = userSlice.actions;

export default userSlice.reducer;
