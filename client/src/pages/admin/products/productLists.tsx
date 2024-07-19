import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import LoginExpiredAlert from "@/components/alert/loginExpiredAlert";
import { useNavigate } from "react-router-dom";
import { useGetAllAdminProductsQuery } from "@/hooks/queries/product/product.query";

// interface Product {
//   productId: string;
//   name: string;
//   gender: string;
//   isDeleted: boolean;
//   view: boolean;
//   price: number;
//   description: string;
//   createdAt: string;
//   category: {
//     categoryName: string;
//   };
//   variants: Variant[];
// }

// interface Variant {
//   color: string;
//   images: Image[];
//   sizes: Size[];
// }

// interface Image {
//   url: string;
// }

// interface Size {
//   size: string;
//   stock: number;
// }

// interface ProductTableProps {
//   products: Product[];
// }

const ProductLists = () => {
  const { data, error } = useGetAllAdminProductsQuery();
  const navigate = useNavigate();

  if (error) {
    return <p>{error?.response?.data?.message}</p>;
  }

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((product) => (
          <TableRow key={product.productId}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.gender}</TableCell>
            <TableCell>{product.category.categoryName}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              {new Date(product.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {product.variants.map((variant) => (
                <div key={variant?.variantId}>
                  <div>Color: {variant.color}</div>
                  {variant.images.map((image) => (
                    <img
                      key={image?.productImageId}
                      src={image.url}
                      alt={variant.color}
                      className="w-16 h-16 object-cover"
                      loading="lazy"
                    />
                  ))}
                  {variant.sizes.map((size) => (
                    <div key={size.sizeId}>
                      Size: {size.size}, Stock: {size.stock}
                    </div>
                  ))}
                </div>
              ))}
            </TableCell>

            <TableCell className="flex gap-2 ">
              <button
                className="p-2 rounded-md bg-blue-500 text-white font-semibold text-xs"
                onClick={() =>
                  navigate(
                    `/dashboard/products/${product.productId}/add-variant`
                  )
                }
              >
                Add variant
              </button>
              <button
                className="p-2 rounded-md bg-blue-500 text-white font-semibold text-xs"
                onClick={() =>
                  navigate(
                    `/dashboard/products/${product.productId}/edit-product`
                  )
                }
              >
                Edit product
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductLists;
