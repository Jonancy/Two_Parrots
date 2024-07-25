import TextInput from "@/components/inputs/textInput";
import { toast } from "@/components/ui/use-toast";
import { IProductDTO } from "@/dtos/product.dto";
import { useGetCategory } from "@/hooks/queries/category/category.query";
import { useAddProductQuery } from "@/hooks/queries/product/product.query";

import { useFormik } from "formik";
import { useEffect } from "react";

export default function AddProducts() {
  const { error, isSuccess, mutate, isPending, data } = useAddProductQuery();
  const category = useGetCategory();

  const initialValues: IProductDTO = {
    name: "",
    gender: "Men",
    categoryId: category?.data?.data[0]?.categoryId ?? "",
    price: "",
    description: "",
  };
  console.log(category?.data?.data[0]?.categoryId);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      return mutate(values);
    },
  });

  // if (isSuccess) {
  //   alert("New product added");
  // }

  // console.log(formik.values);

  // if (!error) {.
  //   alert("new product added");
  // }

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      toast({ title: data?.message });
      console.log("success");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) {
      toast({ title: error?.message });
    }
  }, [error]);

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
          {category?.data?.data?.map((category) => (
            <div className="flex items-center gap-2" key={category.categoryId}>
              <label>{category.categoryName}</label>
              <input
                name="categoryId"
                value={category.categoryId}
                onChange={formik.handleChange}
                checked={formik.values.categoryId === category.categoryId}
                type="radio"
              ></input>
            </div>
          ))}
        </label>

        <button
          type="submit"
          className={`rounded-md p-2 ${
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
