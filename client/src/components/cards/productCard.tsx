import { IProduct } from "@/interfaces/product.interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const ProductCard = ({
  gender,
  name,
  price,
  variants,
  productId,
}: IProduct) => {
  return (
    <Link
      to={`/product/${productId}`}
      className="flex flex-col shadow-md  cursor-pointer rounded-md"
    >
      <div className=" overflow-hidden rounded-t-md">
        <LazyLoadImage
          className="rounded-t-md h-[30rem] w-full object-cover hover:scale-110 duration-500 "
          src={variants[0]?.images[0]?.url}
        ></LazyLoadImage>
      </div>
      <div className="px-2 py-4">
        <p className="font-semibold ">{name} </p>
        <p className="text-gray-400 text-sm">{gender}</p>
        <p className="font-semibold text-sm">NPR {price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
