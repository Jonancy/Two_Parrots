import TextInput from "@/components/inputs/textInput";
import { IProductDTO } from "@/dtos/product.dto";
import { useGetCategory } from "@/queries/category/category.query";
import { useAddProductQuery } from "@/queries/product/product.query";
import { useFormik } from "formik";
import { useState } from "react";

export default function AddProducts() {
  const { error, isSuccess, mutate, isPending } = useAddProductQuery();
  const { data } = useGetCategory();

  const initialValues: IProductDTO = {
    name: "",
    gender: "",
    categoryId: "",
    price: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      return mutate(values);
    },
  });

  if (isSuccess) {
    alert("New product added");
  }

  console.log(formik.values);

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <TextInput
          formik={formik}
          name="name"
          placeholder="Product Name"
          type="text"
          key={1}
        />
        <TextInput
          formik={formik}
          name="description"
          placeholder="Description"
          type="text"
          key={1}
        />
        <TextInput
          formik={formik}
          name="price"
          placeholder="Price"
          type="number"
          key={1}
        />

        <label>
          Gender:
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </label>
        <br />
        <label>
          Category:
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            {data?.data?.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className={`p-2 rounded-md ${
            isPending ? "bg-gray-500" : "bg-gray-400"
          } `}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
