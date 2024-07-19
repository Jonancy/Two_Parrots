import ProductCard from "@/components/cards/productCard";
import CheckBoxInput from "@/components/inputs/checkBoxInput";
import {
  useGetClientFilterProductsQuery,
  useGetFilterTypes,
} from "@/hooks/queries/product/product.query";
import { IProduct } from "@/interfaces/product.interfaces";
import { useEffect, useRef, useState, useCallback } from "react";

const CategoriesInput = ({
  name,
  handleSelect,
  selectedCategories,
}: {
  name: string;
  className?: string;
  selectedCategories: string[];
  handleSelect: (value: string) => void;
}) => {
  const isSelected = selectedCategories.includes(name);

  return (
    <div className="flex gap-2 items-center ">
      <input
        className="w-4 h-4"
        id={name}
        value={name}
        checked={isSelected ?? false}
        type="checkbox"
        onClick={() => handleSelect(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};
export default function FilterProducts() {
  const filterTypes = useGetFilterTypes();

  const [page, setPage] = useState<number>(1);

  const [productLists, setProductLists] = useState<IProduct[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filters, setFilters] = useState<{
    gender?: string;
    categories?: string[];
  }>();

  const products = useGetClientFilterProductsQuery({ page, filters });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const genderTypes = filterTypes.data?.data.gender;
  const categoryTypes = filterTypes.data?.data.categories;

  const lastProductRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (products.isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          page < (products.data?.data.totalPages ?? 0)
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [products.isFetching, page, products.data?.data.totalPages]
  );

  useEffect(() => {
    // Reset productLists when filters change to show only new filtered results
    setProductLists([]);
    setPage(1); // Reset page to 1 when filters change
  }, [filters]);

  useEffect(() => {
    if (products.isSuccess && products.data?.data.products) {
      setProductLists((prev) => [...prev, ...products.data.data.products]);
    }
  }, [products.isSuccess, products.data?.data.products]);

  const handleGenderSelect = (value: string) => {
    if (selectedGender != value) {
      setSelectedGender(value);
      setFilters((prevFilters) => ({ ...prevFilters, gender: value }));
    } else {
      setSelectedGender(undefined);
      setFilters((prevFilter) => ({ ...prevFilter, gender: undefined }));
    }
  };

  const handleSelectCategories = (value: string) => {
    setSelectedCategories((prevSelectedCategory) => {
      const isSelectedPrevious = selectedCategories.includes(value);
      const updatedValues = isSelectedPrevious
        ? prevSelectedCategory.filter((category) => category != value)
        : [...prevSelectedCategory, value];
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: updatedValues,
      }));
      return updatedValues;
    });
  };

  console.log(selectedGender);
  console.log(filters);

  return (
    <div className="px-20 py-10 grid grid-cols-3">
      <div className="col-span-1">
        <p>Filter products</p>
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <p>Gender</p>
            {genderTypes?.map((gender) => (
              <CheckBoxInput
                name={gender}
                key={gender}
                selectedValue={selectedGender ?? ""}
                handleSelect={handleGenderSelect}
              />
            ))}
          </div>
          <div>
            <p>Categories</p>
            {categoryTypes?.map((category) => (
              <CategoriesInput
                name={category}
                key={category}
                selectedCategories={selectedCategories}
                handleSelect={handleSelectCategories}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-4">
        {productLists.map((product, index) => (
          <span
            key={product.productId}
            ref={index + 1 === productLists.length ? lastProductRef : null}
          >
            <ProductCard {...product} />
          </span>
        ))}
      </div>
    </div>
  );
}
