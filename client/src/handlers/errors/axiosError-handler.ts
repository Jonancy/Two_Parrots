import { AxiosError } from "axios";
import CustomError from "./customError";

//!Will not be using thiss
export const handleError = (error: AxiosError) => {
  if (error.response) {
    throw new CustomError({
      data: error.response.data as { success: boolean; message: string },
      status: error.status as number,
    });
  }

  throw error;
};
