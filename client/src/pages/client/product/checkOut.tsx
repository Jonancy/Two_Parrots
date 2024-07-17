import SideCartCard from "@/components/cart/sideCartCard";
import TextInput from "@/components/inputs/textInput";
import { RootState } from "@/redux/store/reduxStore";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { orderValidationSchema } from "@/schemas/order.validationSchema";
import { IFormInputProps } from "@/interfaces/component.interfaces";
import Button from "@/components/buttons/button";
import {
  IOrderDTO,
  IOrderPaymentValidation,
} from "@/interfaces/order.interfaces";
import { useOrderCart } from "@/hooks/queries/product/order/order.query";

const SelectPaymentMethod = ({
  name,
  handlePayment,
  paymentMethod,
  formik,
  selectedMethod,
}: IFormInputProps & {
  handlePayment: (method: string) => void;
  paymentMethod: string | undefined;
  selectedMethod: string | undefined;
}) => {
  return (
    <div
      className=" cursor-pointer border w-fit p-4 rounded-md flex gap-2 items-center "
      onClick={() => handlePayment(paymentMethod ?? "")}
    >
      <input
        className={` w-4 h-4 cursor-pointer  ${
          selectedMethod == "Esewa" ? "accent-green-700" : "accent-purple-900"
        }`}
        name={name}
        value={formik.values[name]}
        id={paymentMethod}
        type="radio"
        checked={paymentMethod === selectedMethod}
        // onChange={formik.handleChange}
      ></input>
      <label className="text-xl cursor-pointer" htmlFor={paymentMethod}>
        {paymentMethod}
      </label>
    </div>
  );
};
export default function CheckOut() {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const paymentMethods = ["Esewa", "Khalti"];

  const { data, error, mutate } = useOrderCart();

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    formik.setFieldValue("paymentMethod", method);
  };

  const formik = useFormik<IOrderPaymentValidation>({
    initialValues: {
      userName: "",
      email: "",
      location: "",
      phoneNumber: "",
      paymentMethod: "",
    },
    validationSchema: orderValidationSchema,
    onSubmit: (values) => {
      const orderDTO: IOrderDTO = {
        ...values,
        totalPrice: totalPrice,
        orderItems: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          sizeId: item.size.sizeId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      mutate(orderDTO);
    },
  });

  if (data) {
    window.open(`${data?.data?.payment_url}`, "_self");
  }
  console.log(data);
  console.log(error);

  console.log(formik.errors);

  return (
    <div className=" grid grid-cols-2 ">
      <div className=" py-10 bg-slate-100 px-16  ">
        <div className=" bg-white rounded-md pl-6 sticky top-36 ">
          <ScrollArea className="h-[34rem] px-5">
            <SideCartCard className="w-full py-4" />
          </ScrollArea>
          <p className="py-2">Total: NPR{totalPrice} </p>
          <Button buttonName="Order" handleOnClick={formik.submitForm} />
        </div>
      </div>
      <div className="py-10 px-16 flex flex-col gap-8">
        <div className="">
          <h1 className="text-2xl font-semibold">Delivery Details</h1>
          <div className="flex gap-2 flex-col w-[30rem] mt-4">
            <TextInput
              name="userName"
              placeholder="User Name"
              type="text"
              formik={formik}
            />
            <TextInput
              name="phoneNumber"
              placeholder="Phone Number"
              type="number"
              formik={formik}
              // className="border-black"
            />
            <TextInput
              name="location"
              placeholder="Location"
              type="text"
              formik={formik}
              // className="border-black"
            />
            <TextInput
              name="email"
              placeholder="Email"
              type="text"
              formik={formik}
              // className="border-black"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Payment methods</h1>

          <span className="flex gap-2 items-center">
            {paymentMethods.map((name) => (
              <SelectPaymentMethod
                key={name}
                name="paymentMethod"
                handlePayment={handlePayment}
                paymentMethod={name}
                selectedMethod={paymentMethod}
                placeholder=""
                formik={formik}
                type="radio"
              />
            ))}
          </span>
          {formik.errors.paymentMethod && (
            <p className="text-xs text-red-500 mt-1">
              {String(formik.errors.paymentMethod)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
