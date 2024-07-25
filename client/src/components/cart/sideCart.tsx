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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";
import SideCartCard from "./sideCartCard";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";

export function SideCart() {
  const { totalPrice } = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <FaCartPlus className="cursor-pointer" />
          {/* {cartNumber > 0 && (
            <span className="absolute -top-4 -right-4 text-xs rounded-full px-2 py-1 animate-ping  bg-red-500 font-semibold text-white">
              <p className="">{cartNumber}</p>
            </span>
          )} */}
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>YOUR CART </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[37rem] ">
          <SideCartCard className="pr-4" />
        </ScrollArea>
        <div className="bottom-4 fixed flex flex-col gap-2">
          <p className="font-semibold text-xl">
            Total price is:{" "}
            <span className="text-base font-normal">NRS {totalPrice}</span>
          </p>
          <SheetFooter className="flex flex-col">
            <SheetClose asChild>
              <Button
                className="w-[20rem]"
                type="submit"
                onClick={() => navigate("/product/check-out")}
              >
                CHECK OUT
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
