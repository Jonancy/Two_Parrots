import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaCartPlus } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";
import { ICartItem } from "@/interfaces/product.interfaces";
import { adjustQuantity } from "@/redux/slice/cartSlice";

export function SideCart() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  console.log(items);

  const dispatch = useDispatch();

  const handleQuantityChange = (action: string, cartItem: ICartItem) => {
    let quantity: number = 0;
    switch (action) {
      case "minus":
        quantity = cartItem.quantity - 1;
        break;
      case "add":
        quantity = cartItem.quantity + 1;
        break;
      default:
        break;
    }
    const data = {
      productId: cartItem.productId,
      variantId: cartItem.variantId,
      sizeId: cartItem.size.sizeId,
      quantity: quantity,
    };

    dispatch(adjustQuantity(data));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <FaCartPlus />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>YOUR CART </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {items?.map((product) => (
            <div
              className="flex justify-between items-center text-sm"
              key={product?.productId}
            >
              <div className="flex gap-4">
                <img
                  className="w-[6rem] h-[6rem] object-cover"
                  src={product.image}
                ></img>
                <div>
                  <p>{product?.name}</p>
                  <p>
                    {product?.color} . {product?.size.size}
                  </p>
                  <p>{product?.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Minus
                  className="border cursor-pointer"
                  onClick={() => handleQuantityChange("minus", product)}
                />
                <p className="">{product?.quantity}</p>
                <Plus
                  className="border cursor-pointer"
                  onClick={() => handleQuantityChange("add", product)}
                />
              </div>
            </div>
          ))}
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
        </div>
        <div className="bottom-4 fixed flex flex-col gap-2">
          <p className="font-semibold text-xl">
            Total price is:{" "}
            <span className="text-base font-normal">NRS {totalPrice}</span>
          </p>
          <SheetFooter className="flex flex-col">
            <SheetClose asChild>
              <Button className="w-[20rem]" type="submit">
                CHECK OUT
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
