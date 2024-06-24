// src/ProductTable.tsx

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  name: string;
  gender: string;
  isDeleted: boolean;
  view: boolean;
  price: number;
  description: string;
  createdAt: string;
  category: {
    categoryName: string;
  };
  variants: Variant[];
}

interface Variant {
  color: string;
  images: Image[];
  sizes: Size[];
}

interface Image {
  url: string;
}

interface Size {
  size: string;
  stock: number;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Variants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, productIndex) => (
          <TableRow key={productIndex}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.gender}</TableCell>
            <TableCell>{product.category.categoryName}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              {new Date(product.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {product.variants.map((variant, variantIndex) => (
                <div key={variantIndex}>
                  <div>Color: {variant.color}</div>
                  {variant.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image.url}
                      alt={variant.color}
                      className="w-16 h-16"
                    />
                  ))}
                  {variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex}>
                      Size: {size.size}, Stock: {size.stock}
                    </div>
                  ))}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
