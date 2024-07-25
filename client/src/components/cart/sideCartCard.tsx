import { IClassNameProps } from "@/interfaces/component.interfaces";
import { ICartItem } from "@/interfaces/product.interfaces";
import { cn } from "@/lib/utils";
import { adjustQuantity } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store/reduxStore";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const SideCartCard: React.FC<IClassNameProps> = ({ className }) => {
  const { items } = useSelector((state: RootState) => state.cart);
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
    <div className="grid py-4 ">
      {items?.map((product) => (
        <div
          className={cn(
            "flex justify-between items-center text-sm p-2 border-b ",
            className
          )}
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
    </div>
  );
};
export default SideCartCard;
