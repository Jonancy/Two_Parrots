import React, { useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useCreateProductVariant } from "@/hooks/queries/product/variant/variant.query";
import ColorPalette from "@/components/buttons/colorPaletteButton";
import { colorOptions, sizeOptions } from "@/constants/filterOptions";

const AddProuctVariant = () => {
  const { productId } = useParams();
  const { mutate } = useCreateProductVariant();
  const [selectedColor, setSelectedColor] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      color: "",
      sizes: [{ size: "", stock: 0 }],
      images: [] as File[],
    },
    onSubmit: async (values) => {
      if (!productId) {
        console.error("Product ID is required.");
        return;
      }

      const formData = new FormData();
      formData.append("color", values.color);
      formData.append("sizes", JSON.stringify(values.sizes));
      values.images.forEach((image) => {
        formData.append(`image`, image);
      });

      mutate({ formData, productId });
    },
  });

  console.log(formik.values);

  const handleSizeChange = (
    index: number,
    field: keyof (typeof formik.values.sizes)[0],
    value: string | number,
  ) => {
    const updatedSizes = [...formik.values.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    formik.setFieldValue("sizes", updatedSizes);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      formik.setFieldValue("images", fileList);
    }
  };

  const handleSizeOptionClick = (index: number, size: string) => {
    handleSizeChange(index, "size", size);
  };

  const handleColorOptionClick = (color: string) => {
    setSelectedColor(color);
    formik.setFieldValue("color", color);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-6 w-[40rem] justify-center rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold">Create Product Variant</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color:
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {colorOptions?.map((color) => (
                <ColorPalette
                  color={color}
                  handleColorOptionClick={handleColorOptionClick}
                  key={color}
                  selectedColor={selectedColor}
                />
                // <button
                //   type="button"
                //   key={color}
                //   className={`mr-2 h-8 w-8 rounded-full border ${
                //     formik.values.color === color
                //       ? "ring-2 ring-indigo-500 ring-offset-2"
                //       : ""
                //   }`}
                //   style={{ backgroundColor: color }}
                //   onClick={() => handleColorOptionClick(color)}
                // />
              ))}
            </div>
            <input
              type="text"
              id="color"
              className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formik.values.color}
              onChange={formik.handleChange}
              required
              readOnly
            />
          </div>
          <fieldset className="mb-4">
            <legend className="block text-sm font-medium text-gray-700">
              Sizes:
            </legend>
            {formik.values.sizes.map((size, index) => (
              <div key={index} className="mb-2">
                <div className="mb-2 flex">
                  {sizeOptions?.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`mr-2 border px-2 py-1 ${
                        size.size === option
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-gray-700"
                      } rounded-md shadow-sm focus:outline-none`}
                      onClick={() => handleSizeOptionClick(index, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  id={`stock${index}`}
                  className="w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={size.stock}
                  onChange={(e) =>
                    handleSizeChange(index, "stock", parseInt(e.target.value))
                  }
                  placeholder="Stock"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("sizes", [
                  ...formik.values.sizes,
                  { size: "", stock: 0 },
                ])
              }
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Add Size
            </button>
          </fieldset>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images:
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Product Variant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProuctVariant;
