// hooks/useLazyLoad.tsx
import React, { Fragment, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersection";
import SkeletonLoader from "@/components/loader/skeletonLoader";

interface LazyLoadProps {
  children: React.ReactNode;
  isLoading: boolean;
  count: number;
}
//HOC
const LazyLoadProducts: React.FC<LazyLoadProps> = ({
  children,
  isLoading,
  count,
}) => {
  console.log(children);

  console.log(isLoading);
  if (isLoading || !children) {
    console.log("oass");

    return <SkeletonLoader count={count} />;
  }
  console.log("ajsjas");

  return <Fragment>{children}</Fragment>;
};

export default LazyLoadProducts;
