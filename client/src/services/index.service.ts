// import { getCookies } from "@/utils/cookies-handler";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token")?.replace(/"/g, "");
// const token = getCookies("token");

export const url = axios.create({
  baseURL: baseURL,
  // withCredentials: true, // Include credentials (cookies) in requests
  // // headers: {
  // //   Authorization: `Bearer ${token} `,
  // // },
});
