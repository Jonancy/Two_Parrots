import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import React, { useRef } from "react";

SwiperCore.use([Navigation]);

function MainSlider({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const swiperRef = useRef<SwiperCore>();
  console.log(children);

  return (
    <div className="relative mx-32">
      <div className="mt-10 flex flex-col justify-center">
        <h1 className="text-4xl font-light">{title}</h1>
      </div>
      <Swiper
        spaceBetween={5}
        slidesPerView={4}
        loop={true}
        // navigation={{
        //   prevEl: ".swiper-button-prev",
        //   nextEl: ".swiper-button-next",
        // }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={`delay-[300ms] duration-[600ms] taos:translate-y-[-200px] taos:opacity-0 mySwiper mt-10 grid grid-cols-6 justify-center gap-3 overflow-hidden`}
      >
        {children}
      </Swiper>
      <div
        className="swiper-button-preva bg- absolute -left-10 top-1/2 z-10 cursor-pointer select-none bg-opacity-30"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <span className="text-3xl">←</span>
      </div>
      <div
        className="swiper-button-nexta absolute -right-10 top-1/2 z-10 cursor-pointer select-none"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <span className="text-3xl">→</span>
      </div>
    </div>
  );
}

export default MainSlider;
