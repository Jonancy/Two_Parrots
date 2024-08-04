import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetAllAdminProductsQuery } from "@/hooks/queries/product/product.query";
import Button from "@/components/buttons/button";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

const ProductLists = () => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const allProducts = useGetAllAdminProductsQuery({
    page,
    filters: { isDeleted },
  });
  const navigate = useNavigate();

  console.log(allProducts);

  useEffect(() => {
    allProducts.refetch();
  }, [isDeleted, page]);

  if (allProducts.error) {
    return <p>{allProducts.error?.response?.data?.message}</p>;
  }

  console.log(isDeleted);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div className="max-h-screen">
      <div className="mb-2 flex w-full justify-between">
        <div className="flex gap-2">
          <Button
            buttonName="All"
            handleOnClick={() => setIsDeleted(false)}
            className=""
          ></Button>
          <Button
            buttonName="Deleted"
            handleOnClick={() => setIsDeleted(true)}
            className=""
          ></Button>
        </div>
        <Button
          buttonName="Add Products"
          handleOnClick={() => navigate("/dashboard/products/add-products")}
          className=""
        ></Button>
      </div>
      <Table>
        {/* <TableCaption>A list of your products.</TableCaption> */}
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
        <TableBody className="">
          {!allProducts.isLoading ? (
            allProducts?.data?.data?.products?.map((product) => (
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
                          className="h-16 w-16 object-cover"
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

                <TableCell className="flex gap-2">
                  <Button
                    handleOnClick={() =>
                      navigate(
                        `/dashboard/products/${product.productId}/add-variant`,
                      )
                    }
                    buttonName="Add variant"
                  />
                  <Button
                    handleOnClick={() =>
                      navigate(
                        `/dashboard/products/${product.productId}/edit-product`,
                      )
                    }
                    buttonName="Edit product"
                  ></Button>
                  <Button
                    buttonName="Delete Product"
                    handleOnClick={() =>
                      navigate("/dashboard/products/add-products")
                    }
                    className=""
                  ></Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="text-center">Loading data...</p>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Pagination
          count={allProducts.data?.data.totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          size="medium"
        />
      </div>
    </div>
  );
};

export default ProductLists;
