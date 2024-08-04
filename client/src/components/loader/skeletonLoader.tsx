import React from "react";
import { SwiperSlide } from "swiper/react";

const SkeletonLoader: React.FC<{ count: number }> = ({ count }) => {
  console.log([...Array(count)]);
  console.log(count);

  return (
    <div className="flex animate-pulse cursor-pointer flex-col rounded-md shadow-md">
      <div className="h-[23rem] w-full overflow-hidden rounded-t-md bg-gray-300"></div>
      <div className="bg-gray-200 px-2 py-4">
        <p className="mb-2 h-6 w-3/4 bg-gray-300 font-semibold"></p>
        <p className="h-4 w-1/2 bg-gray-300 text-sm"></p>
        <p className="mt-2 h-5 w-1/4 bg-gray-300 text-sm font-semibold"></p>
      </div>
    </div>
  );
};

export default SkeletonLoader;
