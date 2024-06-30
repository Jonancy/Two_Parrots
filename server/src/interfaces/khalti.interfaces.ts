import { IEsewaDecodeResponse } from "./esewa.interfaces";

export interface IKhaltiInitialPayload {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
}

export interface IFinalPaymentPayload {
  pidx: string;
  orderId: string;
  status: string;
  encodedData: IEsewaDecodeResponse;
  method: "Esewa" | "Khalti";
}

export interface IKhaltiCallBackResponse {
  pidx: string;
  total_amount: number;
  status: string;
  transaction_id: string;
  fee: 0;
  refunded: false;
}
