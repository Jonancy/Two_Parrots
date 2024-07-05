import { useGetAllProductsQuery } from "@/queries/product/product.query";

export default function Page2() {
  const products = useGetAllProductsQuery();
  console.log(products);
  console.log(products.data);

  return (
    <div>
      {products.data ? (
        products.data?.data?.data?.map((product) => (
          <p key={product.productId}>
            {product.productId} - {product.name}
          </p>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}
