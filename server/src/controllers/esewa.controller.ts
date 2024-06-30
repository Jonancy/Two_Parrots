import { Response, NextFunction } from "express-serve-static-core";
import CustomError from "../handlers/errors/customError";
import { createSignature } from "../utils/esewaHash";
import axios from "axios";
import {
  IEsewaCallBackPayload,
  IEsewaDecodeResponse,
} from "../interfaces/esewa.interfaces";

export const handleEsewaSuccess = async (
  data: IEsewaDecodeResponse,
  res: Response,
  next: NextFunction
) => {
  try {
    if (data.status !== "COMPLETE") {
      throw new CustomError("Esewa payment unsuccessful", 400);
    }

    const message = data.signed_field_names
      .split(",")
      .map((field) => `${field}=${data[field] || ""}`)
      .join(",");

    console.log(message);
    const signature = createSignature(message);

    if (signature !== data.signature) {
      throw new CustomError("integrity error", 400);
    }

    const payloadData: IEsewaCallBackPayload = {
      transaction_uuid: data.transaction_uuid,
      total_amount: data.total_amount,
    };
    const res = await handleEsewaCallback(payloadData);

    if (res.data.status !== "COMPLETE") {
      throw new CustomError("Esewa payment unsuccessful lol", 400);
    }
    console.log(res, "pas");

    return res.data;
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const handleEsewaCallback = async (data: IEsewaCallBackPayload) => {
  const response = await axios.get(
    `https://uat.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${data.total_amount}&transaction_uuid=${data.transaction_uuid}`
  );

  console.log(response.data);

  return response.data;
};
