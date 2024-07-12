import { IProduct } from "@/interfaces/product.interfaces";

const ProductCard = ({ gender, name, price, variants }: IProduct) => {
  return (
    <div className="flex flex-col shadow-md  cursor-pointer rounded-md">
      <div className=" overflow-hidden rounded-t-md">
        <img
          className="rounded-t-md h-[30rem] w-full object-cover hover:scale-110 duration-500 "
          src={variants[0]?.images[0]?.url}
          loading="lazy"
        ></img>
      </div>
      <div className="px-2 py-4">
        <p className="font-semibold ">{name} </p>
        <p className="text-gray-400 text-sm">{gender}</p>
        <p className="font-semibold text-sm">NPR {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
