import React, { useState } from "react";
import { IMiniProduct } from "@/interfaces/product.interfaces";
import { StarIcon } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const ProductCard: React.FC<IMiniProduct> = ({
  productId,
  name,
  variants,
  price,
  gender,
  category,
}) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleMouseEnter = () => setIsHovered(productId);
  const handleMouseLeave = () => setIsHovered(null);

  return (
    <Link
      to={`/product/${productId}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`absolute bottom-28 top-0 w-full ${
              isHovered === productId
                ? "bg-black opacity-25 duration-700 ease-out"
                : ""
            }`}
          />
          <LazyLoadImage
            loading="lazy"
            src={variants[0]?.images[0]?.url}
            alt={`Product: ${name}`}
            className={`${
              isHovered === productId
                ? "scale-110 duration-500 ease-linear"
                : "scale-100 duration-500 ease-linear"
            } h-[20rem] w-full object-cover`}
          />
        </div>
        {/* {isHovered === id && (
            <button className="absolute bottom-0 w-full bg-white bg-opacity-30 p-4 font-light tracking-[0.2em] text-black backdrop-blur-lg">
              ORDER NOW
            </button>
          )} */}
      </div>
      <div className="m-5 text-[16px] tracking-wide">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">
          {gender} , {category.categoryName}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-0.5">
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
          </div>
          <span className="text-muted-foreground">(1)</span>
        </div>

        <div className="mt-0 flex items-center justify-between">
          <h4 className="text-lg font-semibold">NPR {price}</h4>
          {/* <Button
              size="sm"
              className="hidden h-0 opacity-0 transition-opacity duration-500 group-hover:block group-hover:h-10 group-hover:opacity-100"
            >
              Add to Cart
            </Button> */}
        </div>
        {/* <p>{name}</p>
          <p>Rs.{price}</p> */}
      </div>
    </Link>
  );
};

export default ProductCard;
