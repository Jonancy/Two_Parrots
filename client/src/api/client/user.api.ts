// // import { url } from "../index.service";

import { url } from "../index.api";

// import { IOrderDTO } from "@/interfaces/order.interfaces";
// import { url } from "../index.service";

// // export const getProfileDetails = (id: string) => {
// //   return url.get(`/user/getUserWithMusic/${id}`);
// // };

// // export const getSideBarArtists = (queryName: string | null) => {
// //   //!the first string is the key and the second is the value and it is denoted by K and T
// //   //! So if the queryParams is not null then the queryName or the params will append it
// //   const params: Record<string, string | null> = {};
// //   if (queryName) {
// //     params.queryName = queryName;
// //   }
// //   return url.get(`/user/getSideBarArtists`, { params });
// // };

// export const orderProduct = (data: IOrderDTO) => {
//   return url.post(`/user/orders/createOrder`, data);
// };

export const specificUser = (id: string) => {
  return url.get(`/user/getSpecificUser/${id}`);
};
