import { useGetAllClientProductsQuery } from "@/hooks/queries/product/product.query";
import { SwiperSlide } from "swiper/react";
import ProductCard from "@/components/product/card";
import MainSlider from "@/components/slider/mainSlider";
import useIntersectionObserver from "@/hooks/useIntersection";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import { IProduct } from "@/interfaces/product.interfaces";

export const ProductDisplay = ({
  products,
  isLoading,
}: {
  products: IProduct[] | undefined;
  isLoading: boolean;
}) => {
  console.log(products);
  console.log(isLoading);

  return (
    <MainSlider>
      {!isLoading
        ? products?.map((product) => (
            <SwiperSlide key={product.productId} className="group relative p-5">
              <ProductCard {...product} />
            </SwiperSlide>
          ))
        : [1, 2, 3, 4, 5, 6].map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonLoader count={6} />
            </SwiperSlide>
          ))}
    </MainSlider>
  );
};
function Home() {
  const { ref: ref1, isIntersecting: isIntersecting1 } =
    useIntersectionObserver();

  const { ref: ref2, isIntersecting: isIntersecting2 } =
    useIntersectionObserver();

  const products = useGetAllClientProductsQuery({
    isEntered: isIntersecting1,
    filters: { gender: "Men" },
  });

  const secondProducts = useGetAllClientProductsQuery({
    isEntered: isIntersecting2,
    filters: { gender: "Women" },
  });

  console.log(products.data?.data);

  return (
    <div className="">
      <div ref={ref1} className="">
        <ProductDisplay
          isLoading={products.isLoading}
          products={products?.data?.data}
        />
      </div>
      <img
        src="https://res.cloudinary.com/dr1giexhn/image/upload/v1719218221/twoParrot/yxfjlqnsm9v8pxkkxbyc.jpg"
        loading="lazy"
        alt="hehe"
      ></img>
      <div ref={ref2}>
        <ProductDisplay
          isLoading={secondProducts.isLoading}
          products={secondProducts?.data?.data}
        />
      </div>
    </div>
  );
}
export default Home;
