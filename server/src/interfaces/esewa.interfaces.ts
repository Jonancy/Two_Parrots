export interface IEsewaCallBackPayload {
  total_amount: string;
  transaction_uuid: string;
}

export interface IEsewaDecodeResponse {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}
