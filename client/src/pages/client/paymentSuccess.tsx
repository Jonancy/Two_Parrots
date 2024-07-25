import { paymentProduct } from "@/api/order/order.api";
import { IEsewaDecodeResponse } from "@/interfaces/esewa.interfaces";
import { IFinalPayment } from "@/interfaces/order.interfaces";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  // const [parseData, setParsedData] = useState<IEsewaDecodeResponse | null>(
  //   null
  // );

  const pidx = searchParams.get("pidx");
  const status = searchParams.get("status");
  const orderId = searchParams.get("purchase_order_id");

  //!This will decide if the payment method is esewa or khalti
  const paymentMethod = searchParams.get("product_code");

  //!Data query is for esewa only
  const data = searchParams.get("data");
  console.log(paymentMethod);

  useEffect(() => {
    // if (data) {
    //   // const decodedData = atob(data);
    //   const decodedData = JSON.parse(
    //     Buffer.from(data, "base64").toString("utf-8")
    //   );
    //   // const parsedData = JSON.parse(decodedData);
    //   console.log(decodedData);
    //   setParsedData(decodedData);
    // }
    if (data || pidx) {
      check();
    }
  }, []);
  // console.log(parseData);

  const check = async () => {
    try {
      const res = await paymentProduct({
        pidx,
        orderId,
        status,
        encodedData: data,
        method: data ? "Esewa" : "Khalti",
      } as IFinalPayment);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (status !== "Completed" && !data) {
    return <p>Nope</p>;
  }

  // console.log(parseData);

  return (
    <div>
      <p>Pass</p>
      {/* <p>{parseData ? JSON.stringify(parseData) : "Loading..."}</p> */}
    </div>
  );
}
