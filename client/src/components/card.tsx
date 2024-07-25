import React, { useState } from "react";
import { TProductCard } from "@/interfaces/product.interfaces";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

const ProductCard: React.FC<TProductCard> = ({ id, name, image, price }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleMouseEnter = () => setIsHovered(id);
  const handleMouseLeave = () => setIsHovered(null);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`absolute bottom-28 top-0 w-full ${
              isHovered === id
                ? "bg-black opacity-25 duration-700 ease-out"
                : ""
            }`}
          />
          <img
            loading="lazy"
            src={image}
            alt={`Product: ${name}`}
            className={`${
              isHovered === id
                ? "scale-110 duration-500 ease-linear"
                : "scale-100 duration-500 ease-linear"
            }`}
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
        <p className="text-gray-500">Woman , Dress, Jacket</p>
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
          <h4 className="text-lg font-semibold">${price}</h4>
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
    </div>
  );
};

export default ProductCard;
