import { useEffect, useRef, useState } from "react";

import ProductCard from "@/components/cards/productCard";
import bill from "@/assets/bil.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetAllClientProductsQuery } from "@/hooks/queries/product/product.query";

function Home() {
  const exampleRef = useRef<HTMLDivElement | null>(null);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log("entry", entry);
      console.log(entry.isIntersecting);

      if (entry.isIntersecting && !hasFetched) {
        console.log("Fetching data...");
        setIsEntered(true);
        setHasFetched(true);
      }
    });

    observer.observe(exampleRef?.current);
    if (exampleRef.current) {
      observer.observe(exampleRef.current);
    }

    return () => {
      if (exampleRef.current) {
        observer.unobserve(exampleRef.current);
      }
    };
  }, [hasFetched]);

  // const authGoogle = async () => {
  //   window.open("http://localhost:8000/api/v1/auth/google/register", "_self");
  // };

  console.log("isEntered", isEntered);

  const products = useGetAllClientProductsQuery(isEntered);
  console.log(products.error?.response);
  // const secondProducts = useGetAllClientProductsQuery(isEntered);
  // const customError = products?.error?.response;

  return (
    <div className="" ref={exampleRef}>
      {products?.isLoading ? (
        <div className="mx-20 grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <div
              className="flex cursor-pointer flex-col rounded-md shadow-md"
              key={index}
            >
              <div className="overflow-hidden rounded-t-md">
                <LazyLoadImage
                  className="h-[23rem] w-full rounded-t-md object-cover duration-500 hover:scale-110"
                  src={bill}
                  loading="lazy"
                ></LazyLoadImage>
              </div>
              <div className="px-2 py-4">
                <p className="font-semibold">aha </p>
                <p className="text-sm text-gray-400">as</p>
                <p className="text-sm font-semibold">NPR 22323</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-20 grid grid-cols-5 gap-6">
          {products?.data?.data?.map((product) => <ProductCard {...product} />)}
        </div>
      )}
      <h1 className="m-10 text-7xl">Gap</h1>
      {/* <div ref={exampleRef}>
        {secondProducts?.isLoading ? (
          <p>Loading data</p>
        ) : (
          <div className="grid grid-cols-5 mx-20 gap-6">
            {secondProducts?.data?.data?.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        )}
      </div> */}

      <LazyLoadImage
        src="https://res.cloudinary.com/dr1giexhn/image/upload/v1719218221/twoParrot/yxfjlqnsm9v8pxkkxbyc.jpg"
        loading="lazy"
        alt="hehe"
      ></LazyLoadImage>
      {/* 
      <h1 ref={exampleRef} className="text-7xl m-10">
        Ehehe
      </h1> */}
    </div>
  );
}
export default Home;
