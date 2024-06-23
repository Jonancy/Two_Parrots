import { IProduct } from "@/interfaces/product.interfaces";
import { addProduct } from "@/services/admin/product.service";
import { ChangeEvent, useState } from "react";

export default function AddProducts() {
  const initialData: IProduct = {
    name: "Sample Product",
    description: "This is a sample product description.",
    price: 99.99,
    gender: "Men",
    categoryId: "some-category-id",
    variants: [
      {
        color: "Red",
        sizes: [
          {
            size: "M",
            stock: 10,
          },
          {
            size: "L",
            stock: 5,
          },
        ],
        images: [], // To be filled dynamically from file uploads
      },
      {
        color: "Blue",
        sizes: [
          {
            size: "S",
            stock: 8,
          },
          {
            size: "M",
            stock: 15,
          },
        ],
        images: [], // To be filled dynamically from file uploads
      },
    ],
  };

  const [formData, setFormData] = useState(initialData);
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    color: string
  ) => {
    const files = Array.from(event.target.files || []);

    setFormData((prevState: IProduct) => ({
      ...prevState,
      variants: prevState.variants.map((variant) => {
        if (variant.color === color) {
          const updatedImages = [...variant.images, { url: files[0] }];

          return {
            ...variant,
            images: updatedImages,
          };
        }
        return variant;
      }),
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price.toString());
      form.append("gender", formData.gender);
      form.append("categoryId", formData.categoryId);
      form.append("variants", JSON.stringify(formData.variants));
      formData.variants.forEach((variant) => {
        variant.images.forEach((image) => {
          form.append(`image`, image.url);
        });
      });

      // Replace with your API endpoint
      const response = await addProduct(form);
      console.log(response.data);

      //   if (!response.ok) {
      //     throw new Error("Failed to add product");
      //   }

      // alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      // alert("Failed to add product. Please try again.");
    }
  };

  console.log(formData, "aka");

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleFormSubmit}>
        {/* <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </label>
        <br />
        <label>
          Category ID:
          <input
            type="text"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          />
        </label>
        <br /> */}
        {/* File inputs for Red variant */}
        <label>
          Upload Red Variant Images:
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e, "Red")}
          />
        </label>
        <br />
        {/* File inputs for Blue variant */}
        <label>
          Upload Blue Variant Images:
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e, "Blue")}
          />
        </label>
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
