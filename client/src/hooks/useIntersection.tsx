import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target); // Unobserve the element after it has intersected
      }
      // } else {
      //   setIsIntersecting(false);
      // }
    });

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
