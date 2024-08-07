import TextInput from "@/components/inputs/textInput";
import {
  useGetSpecificProductQuery,
  useUpdateProductImageQuery,
  useUpdateProductQuery,
} from "@/hooks/queries/product/product.query";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategory } from "@/hooks/queries/category/category.query";
import Button from "@/components/buttons/button";
import RadioInput from "@/components/inputs/radioInput";
import {
  IProductDTO,
  IProductPictureUpdateDTO,
  ISizeUpdateDTO,
} from "@/dtos/product.dto";
import { IVariant } from "@/interfaces/product.interfaces";
import { Cross, Minus, Plus, PlusCircle } from "lucide-react";
import { useUpdateProductSizeQuery } from "@/hooks/queries/product/variant/variant.query";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn("rounded-md border-2 p-2", className)}>{children}</div>
  );
}

export default function EditProducts() {
  const { productId } = useParams();
  const [addedPictures, setAddedPictures] = useState<string[]>([]);
  const [updatedPictures, setUpdatedPictures] =
    useState<IProductPictureUpdateDTO>();
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<ISizeUpdateDTO>();

  const { data, error } = useGetSpecificProductQuery(productId);
  const categoryTypes = useGetCategory();

  console.log(data);
  console.log(error);

  const { mutate } = useUpdateProductQuery();

  const updatePicturesQuery = useUpdateProductImageQuery();

  const updateSizeQuery = useUpdateProductSizeQuery();

  const generalFormik = useFormik<IProductDTO>({
    initialValues: {
      name: "",
      description: "",
      gender: "",
      price: "",
      categoryId: "",
      //   variants: { variantId: "", color: "" },
    },
    onSubmit: (values) => {
      console.log(values);

      mutate({ form: values, productId });
    },
  });

  const variantFormik = useFormik<IVariant>({
    initialValues: {
      color: "",
      images: [],
      variantId: "",
      sizes: [],
    },
    onSubmit: (values) => {
      console.log(values);

      const formData = new FormData();
      updatedPictures?.images.forEach((image) =>
        formData.append("image", image.url),
      );
      formData.append("variantId", values.variantId);
      formData.append("images", JSON.stringify(updatedPictures?.images));

      updatePicturesQuery.mutate({ form: formData, productId });
    },
  });

  console.log(addedPictures);

  useEffect(() => {
    if (data) {
      generalFormik.setFieldValue("productId", data.data.productId);
      generalFormik.setFieldValue("name", data.data.name);
      generalFormik.setFieldValue("description", data.data.description);
      generalFormik.setFieldValue("gender", data.data.gender);
      generalFormik.setFieldValue("price", data.data.price);
      generalFormik.setFieldValue("categoryId", data.data.category.categoryId);

      variantFormik.setFieldValue(
        "color",
        data.data.variants[selectedVariant].color,
      );
      variantFormik.setFieldValue(
        "images",
        data.data.variants[selectedVariant].images,
      );
      variantFormik.setFieldValue(
        "sizes",
        data.data.variants[selectedVariant].sizes,
      );
      variantFormik.setFieldValue(
        "variantId",
        data.data.variants[selectedVariant].variantId,
      );
    }
  }, [data, selectedVariant]);

  console.log(generalFormik.values);

  console.log(variantFormik.values);

  const handleCategoryChange = (id: string) => {
    generalFormik.setFieldValue("categoryId", id);
  };

  const handleGenderChange = (value: string) => {
    generalFormik.setFieldValue("gender", value);
  };

  const handleCancel = () => {
    if (data) {
      generalFormik.setFieldValue("productId", data?.data.productId);
      generalFormik.setFieldValue("name", data?.data.name);
      generalFormik.setFieldValue("description", data?.data.description);
      generalFormik.setFieldValue("gender", data?.data.gender);
      generalFormik.setFieldValue("price", data?.data.price);
      generalFormik.setFieldValue("categoryId", data?.data.category.categoryId);
    }
  };

  const handlePictureChange = (file: ChangeEvent<HTMLInputElement>) => {
    console.log(file);
    if (file?.target.files && file.target.files[0]) {
      const image = URL.createObjectURL(file.target.files[0]);
      setAddedPictures((prev) => [...prev, image]);
      setUpdatedPictures((prev) => ({
        ...prev,
        variantId: variantFormik.values.variantId,
        images: [
          ...(prev?.images || []),
          { productImageId: "", url: file?.target?.files[0] },
        ],
      }));
      // variantFormik.setFieldValue("images", updatedPicture);
    }
  };

  console.log(variantFormik.values);

  const handlePictureRemove = (productImageId: string | undefined) => {
    console.log(productImageId);

    const updatedPicture = variantFormik.values.images.filter(
      (image) => image.productImageId != productImageId,
    );
    console.log(updatedPicture, "aajsjasjsj");

    variantFormik.setFieldValue("images", updatedPicture);
    setUpdatedPictures((prev) => ({
      ...prev,
      variantId: variantFormik.values.variantId,
      images: [
        ...(prev?.images || []),
        { productImageId: productImageId, url: null },
      ],
    }));
  };

  console.log(variantFormik.values.images, "jajajajajj");

  console.log(updatedPictures);

  const handleVariantChange = (index: number) => {
    console.log(index);

    setSelectedVariant(index);
  };

  const handleSizeChange = (sizeId: string, stock: number) => {
    setSelectedSize({ sizeId: sizeId, stock: stock });
  };

  const handleQuantityChange = (type: string) => {
    console.log(type);
    if (selectedSize) {
      switch (type) {
        case "minus":
          if (selectedSize.stock > 0) {
            setSelectedSize((prev) => ({
              sizeId: prev.sizeId,
              stock: prev.stock - 1,
            }));
          }
          break;
        case "add":
          setSelectedSize((prev) => ({
            sizeId: prev.sizeId,
            stock: prev.stock + 1,
          }));
          break;
        default:
          break;
      }
    }
  };

  const submitSizeForm = () => {
    if (selectedSize && productId) {
      updateSizeQuery.mutate({
        form: selectedSize,
        variantId: variantFormik.values.variantId,
        productId: productId,
      });
    }
  };

  return (
    <div className="">
      <Layout className="">
        <h1>General Information</h1>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="name"
            placeholder="Product Name"
            type="text"
            formik={generalFormik}
          />
          <TextInput
            name="description"
            placeholder="Description"
            type="text"
            formik={generalFormik}
          />
          <div className="flex gap-2">
            {["Men", "Women"].map((gender) => (
              <RadioInput
                label={gender}
                key={gender}
                name={gender}
                selectedValue={generalFormik.values.gender}
                handleSelect={handleGenderChange}
              />
            ))}
          </div>
          <TextInput
            name="name"
            placeholder="Product Name"
            type="text"
            formik={generalFormik}
          />{" "}
          <TextInput
            name="price"
            placeholder="Pice"
            type="text"
            formik={generalFormik}
          />
          <Select
            value={generalFormik.values.categoryId}
            onValueChange={(value) => handleCategoryChange(value)}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryTypes?.data?.data?.map((category) => (
                <SelectItem
                  value={category.categoryId}
                  key={category.categoryId}
                >
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            buttonName="Save changes"
            handleOnClick={generalFormik.handleSubmit}
          />
          <Button buttonName="Cancel" handleOnClick={handleCancel} />
        </div>
      </Layout>
      <Layout className="mt-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Variants </h1>
          <Button buttonName="Delete" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {data?.data.variants.map((color, index) => (
              <div
                role="button"
                onClick={() => handleVariantChange(index)}
                key={color.variantId}
                className="cursor-pointer rounded-full border-2 p-2"
                style={{ backgroundColor: `${color.color}` }}
              ></div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p>Sizes</p>
            <div className="flex gap-2">
              {variantFormik.values.sizes.map((size) => (
                <button
                  key={size.sizeId}
                  className="border p-2"
                  onClick={() => handleSizeChange(size.sizeId, size.stock)}
                >
                  {size.size}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Minus onClick={() => handleQuantityChange("minus")} />
              <p>{selectedSize?.stock}</p>
              <Plus onClick={() => handleQuantityChange("add")} />
            </div>
            <Button
              buttonName="Save changes"
              handleOnClick={submitSizeForm}
              className="w-fit"
            />
          </div>

          <div className="flex gap-2">
            {variantFormik.values.images.map((image) => (
              <>
                <img
                  src={image.url}
                  className="relative h-[10rem] w-[10rem] object-cover"
                ></img>
                <Cross
                  onClick={() => handlePictureRemove(image?.productImageId)}
                />
              </>
            ))}
            {addedPictures.map((image) => (
              <img
                src={image}
                className="h-[10rem] w-[10rem] object-cover"
              ></img>
            ))}
            <div className="">
              <label htmlFor="image">
                <PlusCircle className="cursor-pointer" />
                <input
                  type="file"
                  id="image"
                  onChange={handlePictureChange}
                  hidden={true}
                ></input>
              </label>
            </div>
          </div>
        </div>
        <Button
          buttonName="Save changes"
          handleOnClick={variantFormik.handleSubmit}
        />
      </Layout>
    </div>
  );
}
