import { IUserState } from "@/interfaces/user.interfaces";

export const setLocalStorage = ({
  userId,
  picture,
  name,
  email,
  number,
}: IUserState) => {
  const userDetails = JSON.stringify({ userId, picture, name, email, number });

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
  localStorage.removeItem("data");
};
