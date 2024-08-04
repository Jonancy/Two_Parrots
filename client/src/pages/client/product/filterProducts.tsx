import ColorPalette from "@/components/buttons/colorPaletteButton";
import ProductCard from "@/components/cards/productCard";
import CheckBoxInput from "@/components/inputs/checkBoxInput";
import { colorOptions } from "@/constants/filterOptions";
import {
  useGetClientFilterProductsQuery,
  useGetFilterTypes,
} from "@/hooks/queries/product/product.query";
import { IProduct } from "@/interfaces/product.interfaces";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    <div className="flex items-center gap-2">
      <input
        className="h-4 w-4"
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [productLists, setProductLists] = useState<IProduct[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const [filters, setFilters] = useState<{
    gender?: string;
    categories?: string[];
    colors?: string[];
    isDeleted?: boolean;
  }>();

  const navigate = useNavigate();

  const products = useGetClientFilterProductsQuery({ page, filters });
  console.log(searchParams);

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
    [products.isFetching, page, products.data?.data.totalPages],
  );

  useEffect(() => {
    const genderParam = searchParams.get("gender");
    const categoriesParam = searchParams.get("categories");
    const colorsParam = searchParams.get("colors");

    if (genderParam) {
      setSelectedGender(genderParam);
      setFilters((prevFilters) => ({ ...prevFilters, gender: genderParam }));
    }

    if (categoriesParam) {
      const categoriesArray = categoriesParam.split(",");
      setSelectedCategories(categoriesArray);
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: categoriesArray,
      }));
    }

    if (colorsParam) {
      const colorsArray = colorsParam.split(",");
      setSelectedColor(colorsArray);
      setFilters((prevFilters) => ({ ...prevFilters, colors: colorsArray }));
    }
  }, [searchParams]);

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
      searchParams.append("gender", value);
    } else {
      setSelectedGender(undefined);
      setFilters((prevFilter) => ({ ...prevFilter, gender: undefined }));
      searchParams.delete("gender");
    }
    navigate(`/product/filter-products?${searchParams.toString()}`);
  };

  const handleSelectCategories = (value: string) => {
    setSelectedCategories((prevSelectedCategory) => {
      const isSelectedPrevious = selectedCategories.includes(value);
      const updatedValues = isSelectedPrevious
        ? prevSelectedCategory.filter((category) => category !== value)
        : [...prevSelectedCategory, value];
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: updatedValues,
      }));
      if (updatedValues.length > 0) {
        searchParams.set("categories", updatedValues.join(","));
      } else {
        searchParams.delete("categories");
      }
      setSearchParams(searchParams);
      navigate(`/product/filter-products?${searchParams.toString()}`);
      return updatedValues;
    });
  };

  const handleColorOptionClick = (color: string) => {
    setSelectedColor((prevColors) => {
      const updatedColors = prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color];

      setFilters((prevFilters) => ({ ...prevFilters, colors: updatedColors }));

      if (updatedColors.length > 0) {
        searchParams.set("colors", updatedColors.join(","));
      } else {
        searchParams.delete("colors");
      }
      setSearchParams(searchParams);
      navigate(`/product/filter-products?${searchParams.toString()}`);
      return updatedColors;
    });
  };
  console.log(selectedColor);
  console.log(filters);

  console.log(selectedGender);

  return (
    <div className="grid grid-cols-3 px-20 py-10">
      <div className="col-span-1">
        <p>Filter products</p>
        <div className="mt-2 flex flex-col gap-4">
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
          <div>
            <p>Categories</p>
            {colorOptions.map((color) => (
              <button
                type="button"
                key={color}
                className={`mr-2 h-8 w-8 rounded-full border ${
                  selectedColor.includes(color)
                    ? "ring-2 ring-indigo-500 ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorOptionClick(color)}
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
