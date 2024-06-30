import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "../handlers/errors/customError";
import {
  IKhaltiCallBackResponse,
  IKhaltiInitialPayload,
} from "../interfaces/khalti.interfaces";
import axios from "axios";
import { successHandler } from "../handlers/success/successHandler";
import { KHALTI_SECRET_KEY } from "../../secrets";

export const callKhalti =
  (formData: IKhaltiInitialPayload) => async (req: Request, res: Response) => {
    try {
      const headers = {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      };
      console.log(headers);
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        formData,
        {
          headers,
        }
      );
      console.log(response.data);
      return successHandler(res, 201, response.data, "Order success by khalti");
    } catch (e) {
      let err = e.response.data;
      return res
        .status(err.status_code)
        .json({ success: false, message: err.detail });
    }
  };

export const handleKhaltiCallback = async (
  pidx: string,
  next: NextFunction
): Promise<IKhaltiCallBackResponse> => {
  try {
    const headers = {
      Authorization: `Key asa`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(e);
    next(e);
  }
};
