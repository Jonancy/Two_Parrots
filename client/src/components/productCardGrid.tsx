import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import product1 from "../assets/p1.jpeg";
import product2 from "../assets/p2.jpeg";
import product3 from "../assets/p3.jpeg";
import ProductCard from "./card";
import { useRef } from "react";

SwiperCore.use([Navigation]);

function ProductGrid({ title }: { title: string }) {
  const swiperRef = useRef<SwiperCore>();
  const products = [
    {
      id: "1",
      name: "Fluffy Blue Balacalava Hoodie",
      price: 4950,
      image: product1,
    },
    {
      id: "2",
      name: "Ivy Gold Fur Jacket",
      price: 4150,
      image: product2,
    },
    {
      id: "3",
      name: "Ritzy Vintage Hoodie",
      price: 3100,
      image: product3,
    },
    {
      id: "4",
      name: "Fluffy Gray Balacalava Hoodie",
      price: 4950,
      image: product1,
    },
    {
      id: "5",
      name: "Ivy Silver Fur Jacket",
      price: 4150,
      image: product2,
    },
    {
      id: "6",
      name: "Ritzy Vintage",
      price: 3100,
      image: product3,
    },
  ];

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
        {products.map((product) => (
          <SwiperSlide key={product.id} className="group relative p-5">
            <ProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          </SwiperSlide>
        ))}
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

export default ProductGrid;
