import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IProduct, IVariant, ISize } from "@/interfaces/product.interfaces";
import { addItem } from "@/redux/slice/cartSlice";

interface SpecificProductProps {
  product: IProduct;
}

const SpecificProduct: React.FC<SpecificProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(
    product.variants[0]
  );
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  const handleVariantSelect = (variant: IVariant) => {
    setSelectedVariant(variant);
    setSelectedSize(null); // Reset size selection when variant changes
    setSelectedQuantity(1); // Reset quantity selection when variant changes
  };

  const handleSizeSelect = (size: ISize) => {
    setSelectedSize(size);
    setSelectedQuantity(1); // Reset quantity selection when variant changes
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (selectedSize && quantity > 0 && quantity <= selectedSize.stock) {
      setSelectedQuantity(quantity);
    } else {
      setSelectedQuantity(1);
    }
  };
  const addToCart = () => {
    if (selectedVariant && selectedSize) {
      const { productId, name, price } = product;
      const { variantId, color } = selectedVariant;

      const cartItem = {
        productId,
        name,
        image: selectedVariant.images[0]?.url || "", // Assuming you want to use the first image URL
        variantId,
        color,
        size: selectedSize,
        quantity: 1, // Default quantity to 1 when adding to cart
        price, // Assuming price is for the selected variant
      };

      dispatch(addItem(cartItem));
      alert("Item added to cart!");
    } else {
      alert("Please select a variant and size.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg flex">
      <div className="w-2/5">
        {selectedVariant && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Images:</h2>
            <div className="flex space-x-2 mb-4">
              {selectedVariant.images.map((image) => (
                <img
                  key={image.productImageId}
                  src={image.url}
                  alt="Product Image"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-3/5 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">
            Category: {product.category.categoryName}
          </h2>
          <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
          <p className="text-gray-600">Gender: {product.gender}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Variants</h2>
          <div className="flex space-x-4 mb-4">
            {product.variants.map((variant) => (
              <button
                key={variant.variantId}
                onClick={() => handleVariantSelect(variant)}
                className={`w-8 h-8 rounded-full ${
                  selectedVariant?.variantId === variant.variantId
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }`}
                style={{ backgroundColor: variant.color }}
              />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Sizes:</h2>
          <div className="flex space-x-2 mb-4">
            {selectedVariant?.sizes.map((size) => (
              <button
                key={size.sizeId}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize?.sizeId === size.sizeId
                    ? "bg-gray-300"
                    : "bg-white"
                }`}
              >
                {size.size} - Stock: {size.stock}
              </button>
            ))}
          </div>
          <div>
            <input
              className="border-2 border-black"
              value={selectedQuantity}
              onChange={handleQuantity}
              type="number"
              min="1"
              max={selectedSize?.stock || 1}
              disabled={!selectedSize}
            />
          </div>
        </div>
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SpecificProduct;
