import { IUserState } from "@/interfaces/user.interfaces";

export const setLocalStorage = ({ id, picture, name, email }: IUserState) => {
  const userDetails = JSON.stringify({ id, picture, name, email });

  localStorage.setItem("data", userDetails);
};

export const getLocalStorage = (): IUserState | null => {
  const userDetails = localStorage.getItem("data");

  if (userDetails) {
    return JSON.parse(userDetails) as IUserState;
  }
  return null;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
