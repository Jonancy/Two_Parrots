import React from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useCreateProductVariant } from "@/queries/product/variant/varinat.query";
import { addProductVariant } from "@/api/admin/product.api";

const sizeOptions = ["S", "M", "L", "XL", "XXL"];
const colorOptions = ["red", "blue", "green", "yellow", "purple"];

const AddProuctVariant = () => {
  const { productId } = useParams();

  const { data, error, mutate } = useCreateProductVariant();

  const formik = useFormik({
    initialValues: {
      color: "",
      sizes: [{ size: "", stock: 0 }],
      images: [] as File[],
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("color", values.color);
      formData.append("sizes", JSON.stringify(values.sizes));
      values.images.forEach((image) => {
        formData.append(`image`, image);
      });

      const res = await addProductVariant(formData, productId);
      console.log(res.data);

      // mutate(formData, productId);
    },
  });

  console.log(formik.values);

  const handleSizeChange = (
    index: number,
    field: keyof (typeof formik.values.sizes)[0],
    value: string | number
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
    formik.setFieldValue("color", color);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Create Product Variant</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color:
          </label>
          <div className="flex mb-2">
            {colorOptions.map((color) => (
              <button
                type="button"
                key={color}
                className={`w-8 h-8 rounded-full mr-2 ${
                  formik.values.color === color
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorOptionClick(color)}
              />
            ))}
          </div>
          <input
            type="text"
            id="color"
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <div className="flex mb-2">
                {sizeOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`mr-2 px-2 py-1 border ${
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
                className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Product Variant
        </button>
      </form>
    </div>
  );
};

export default AddProuctVariant;
