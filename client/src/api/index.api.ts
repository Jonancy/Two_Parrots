import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { generateAccessToken } from "./token/token.api";
import { getAccessToken, setAccessToken } from "@/helpers/token-helper";
import CustomError from "@/handlers/errors/customError";
import store from "@/redux/store/reduxStore";
import { clearData } from "@/redux/slice/userSlice";

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
  const dispatch = store.dispatch;
  dispatch(clearData());
  window.location.href = "/login";
};

privateAxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const accessToken = getAccessToken();
    console.log("aaka");

    if (accessToken) {
      console.log("aja");

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle token expiration and refresh
privateAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<CustomError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    console.log(error, "a");

    if (
      error.response?.status === 401 &&
      error.response.data?.message === "Access Token expired"
    ) {
      console.log("asas");

      try {
        const { data } = await generateAccessToken();
        setAccessToken(data.token);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        console.log("ssssas");

        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.log("logged out");
        console.log(refreshError);
        // console.error("Failed to refresh access token:", refreshError);

        // clearLocalStorage();
        // if()
        // const dispatch = store.dispatch;
        // dispatch(clearData());
        // Logout();
        console.log("aaa");

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
    console.log("alal");

    // } else {
    //   navigateLogin();

    //   console.log("sas");
    // }

    return Promise.reject(error);
  },
);

export { axiosInstance, privateAxiosInstance };
