// apiService.ts

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { generateAccessToken } from "./token/token.api";
import { getAccessToken, setAccessToken } from "@/helpers/token-helper";
import CustomError from "@/handlers/errors/customError";
import { redirect, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

//!Yo chai regular usage
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

//!Yo chai auth routes ko lagi
const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Cookies ko lai
});

const navigateLogin = () => {
  // const navigate = useNavigate();
  window.location.href = "/login";
};

// Request interceptor to add Authorization header
//!Suru ma check garni if access token cha ki nai so yedi cha vane authorization check garni natra response ma error
//! error type check garera logic lagauni either the user le naya access token pauni ki logout garni
privateAxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const accessToken = getAccessToken();
    console.log("aaka");

    if (accessToken) {
      console.log("aja");

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration and refresh
privateAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<CustomError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    console.log(error);
    //!Token expired or token chaina vane chai regain garni access token using refresh token
    //! Yedi refresh token ma error aucha so then logout as the token is expired
    //? And then request garni feri this time using the access token then authroized cha vane thik natra arko error
    //! Falera reject garni error cuz access token expired or remove vacha vane matra refetch garni naya
    //! Natra loop ma vako vai hunca so tala ko conditin lagayeko and if aru kei error aucha vane which is pakka
    //! No authorization so reject gardini error and move on lol
    if (
      error.response?.status === 401 &&
      error.response.data?.message === "Access Token expired"
    ) {
      try {
        const { data } = await generateAccessToken();
        setAccessToken(data.token);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        console.log("ssssas");

        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.log("logged out");
        console.error("Failed to refresh access token:", refreshError);
        // clearLocalStorage();
        // if()
        // const dispatch = store.dispatch;
        // dispatch(clearData());
        // Logout();
        if (refreshError instanceof AxiosError) {
          const error = refreshError as AxiosError<CustomError>;
          console.log("logged out", error?.response?.data.message);
          const errorMessage = error?.response?.data.message;

          switch (errorMessage) {
            case "No refresh token received":
              console.log("login again please");
              navigateLogin();
              break;
            case "You have no authorization":
              console.log("No auth");
              break;
            default:
              break;
          }
        }

        // return <LoginExpiredAlert />;
        // Optionally clear tokens and redirect to login
        // clearTokens();
        // redirectToLogin();
        return Promise.reject(refreshError);
      }
    }
    // } else {
    //   navigateLogin();

    //   console.log("sas");
    // }

    return Promise.reject(error);
  }
);

export { axiosInstance, privateAxiosInstance };
