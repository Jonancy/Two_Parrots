import ImageView from "@/components/product/imageView";
import ProductDetails from "@/components/product/productDetails";
import ProductGrid from "@/components/productCardGrid";

function ProductPage() {
  return (
    <>
      <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
        <ImageView />
        <ProductDetails />
      </div>
      <ProductGrid title="Similar Products" />
    </>
  );
}
export default ProductPage;
