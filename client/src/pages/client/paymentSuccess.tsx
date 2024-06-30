import { IEsewaDecodeResponse } from "@/interfaces/esewa.interfaces";
import { IFinalPayment } from "@/interfaces/order.interfaces";
import { paymentProduct } from "@/services/order/order.service";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [parseData, setParsedData] = useState<IEsewaDecodeResponse | null>(
    null
  );

  const pidx = searchParams.get("pidx");
  const status = searchParams.get("status");
  const orderId = searchParams.get("purchase_order_id");

  //!Data query is for esewa only
  const data = searchParams.get("data");

  useEffect(() => {
    if (data) {
      console.log("s");

      const decodedData = atob(data);
      const parsedData: IEsewaDecodeResponse = JSON.parse(decodedData);
      setParsedData(parsedData);
    }
    const check = async () => {
      try {
        const res = await paymentProduct({
          pidx,
          orderId,
          status,
          encodedData: parseData,
          method: "Esewa",
        } as IFinalPayment);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    check();
  }, []);

  if (status !== "Completed" && !data) {
    return <p>Nope</p>;
  }

  console.log(parseData);

  return (
    <div>
      <p>Pass</p>
      <p>{parseData ? JSON.stringify(parseData) : "Loading..."}</p>
    </div>
  );
}
