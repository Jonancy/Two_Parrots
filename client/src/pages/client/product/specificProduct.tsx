import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Button from "@/components/buttons/button";
// import SelectInput from "@/components/inputs/selectInput";
import {
  ICartItem,
  IProduct,
  ISize,
  IVariant,
} from "@/interfaces/product.interfaces";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slice/cartSlice";
import {
  useAddProductReviewQuery,
  useGetProductReviewsQuery,
  useGetProductSuggestionsQuery,
  useGetSpecificProductQuery,
  useWishListProduct,
} from "@/hooks/queries/product/product.query";
import { SetAddToCartNoti } from "@/helpers/addToCartNoti-helper";
import { toast } from "@/components/ui/use-toast";
import { ProductDisplay } from "../home";
import useIntersectionObserver from "@/hooks/useIntersection";
import { RootState } from "@/redux/store/reduxStore";
import ProductReviewCard from "@/components/cards/productReviewCard";
import MainDialog from "@/components/dialog/mainDialog";

export default function SpecificProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { userId } = useSelector((state: RootState) => state.user);

  const [selectedSize, setSelectedSize] = useState<ISize>();
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<IVariant>();
  const [quantity, setQuantity] = useState<number>(1);
  const [mainPicture, setMainPicture] = useState<string | undefined>();

  const { data, error } = useGetSpecificProductQuery(productId);

  const { ref, isIntersecting } = useIntersectionObserver();

  const { ref: ref2, isIntersecting: isIntersecting2 } =
    useIntersectionObserver();

  const productSuggestions = useGetProductSuggestionsQuery(
    productId,
    isIntersecting,
  );

  const reviewsQuery = useGetProductReviewsQuery(productId, isIntersecting2);

  console.log(reviewsQuery);

  const wishListQuery = useWishListProduct();

  const addReviews = useAddProductReviewQuery();

  const product = data?.data;

  useEffect(() => {
    if (data) {
      setSelectedVariant(product?.variants[variantIndex]);
      setMainPicture(selectedVariant?.images[0].url);
      setSelectedSize(selectedVariant?.sizes[sizeIndex]);
    }
  }, [data, product?.variants, selectedVariant]);

  if (error) {
    return <p>{error.response.data.message}</p>;
  }

  const handleVariantChange = (index: number) => {
    setSelectedVariant(product?.variants[index]);
    setQuantity(1);
    setVariantIndex(index);
    setSelectedSize(product?.variants[index].sizes[0]);
    setSizeIndex(0);
  };

  const handleSizeChange = (index: number) => {
    if (variantIndex !== undefined && product?.variants[variantIndex]) {
      setSelectedSize(product.variants[variantIndex].sizes[index]);
      setSizeIndex(index);
      setQuantity(1);
    }
  };

  const addToCart = () => {
    if (selectedSize && selectedVariant) {
      const { productId, name, price } = product as IProduct;
      const { variantId, color, images } = selectedVariant as IVariant;

      const cartItem: ICartItem = {
        productId,
        name,
        image: images[0].url ?? "",
        variantId,
        color,
        size: selectedSize,
        quantity: quantity,
        price,
      };
      dispatch(addItem(cartItem));
      toast({ title: "New item added to the cart" });
      SetAddToCartNoti();
    } else {
      alert("Please select a variant and size.");
    }
  };

  const handleWishList = () => {
    if (productId && userId) {
      wishListQuery.mutate({ productId, userId });
    }
  };

  const isLiked = data?.data.wishlist?.some((item) => item.userId == userId);

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (userId && productId) {
      addReviews.mutate({ userId, productId, review: { rating, comment } });
    } else {
      toast({ title: "Please log in to submit a review." });
    }
  };

  return (
    <div className="">
      <div className="mx-[16rem] grid grid-cols-3 gap-10">
        <div className="col-span-2 flex gap-4">
          <div className="flex flex-col gap-4">
            {selectedVariant?.images?.map((pic) => (
              <img
                key={pic.productImageId}
                className="h-[7rem] w-[8rem] cursor-pointer object-cover"
                alt="pic"
                src={pic.url}
                onClick={() => setMainPicture(pic.url)}
              />
            ))}
          </div>
          <Zoom>
            <img
              className="h-[44rem] object-cover"
              src={mainPicture}
              alt="Main product"
            />
          </Zoom>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-8 border-b-2 pb-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold">{product?.name}</h1>
              <p className="text-sm font-semibold">
                {product?.description} dhushd ushduhsu dh
                shdushdushuhushdushhdusdudhdu su dhushduhhdshuddsuhdu shdu
                shduhsudhsu dushdusdu sd h dhushd ushduhsu dh
                shdushdushuhushdushhdusdudhdu su dhushduhhdshuddsuhdu shdu
                shduhsudhsu dushdusdu sd h
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                </div>
                <p className="text-2xl font-semibold">NRS 3000</p>
                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-gray-300"} cursor-pointer text-3xl`}
                  onClick={handleWishList}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Color</p>
                <div className="flex gap-2">
                  {product?.variants?.map((color, index) => (
                    <div
                      role="button"
                      key={color.variantId}
                      className="flex w-fit cursor-pointer items-center gap-1 rounded-md bg-slate-200 p-2"
                      onClick={() => handleVariantChange(index)}
                    >
                      <input
                        type="radio"
                        className="h-[1rem] w-[1rem] cursor-pointer accent-black"
                        name={color.color}
                        checked={index === variantIndex}
                      ></input>
                      <label
                        htmlFor={color.color}
                        className="cursor-pointer text-sm font-semibold"
                      >
                        {color.color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Size</p>
                <div className="flex gap-2">
                  {selectedVariant?.sizes.map((size, index) => (
                    <div
                      key={size.sizeId}
                      className="flex w-fit cursor-pointer items-center gap-1 rounded-md bg-slate-200 p-2"
                      onClick={() => handleSizeChange(index)}
                    >
                      <input
                        type="radio"
                        className="h-[1rem] w-[1rem] cursor-pointer accent-black"
                        name={size.size}
                        checked={index === sizeIndex}
                      ></input>
                      <label
                        htmlFor={size.size}
                        className="cursor-pointer text-sm font-semibold"
                      >
                        {size.size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Quantity</p>
                <div className="flex gap-2">
                  {/* <SelectInput /> */}
                  <select
                    className="rounded-md border p-2 px-4"
                    name="quantity"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option className="" value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <Button buttonName="Add To Cart" handleOnClick={addToCart} />
          </div>
          <div className="mt-6">
            <h1 className="text-xl font-semibold">Rules</h1>
            <p className="text-sm font-semibold text-gray-500">
              No return hai mula haru
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-gray-50 px-20 py-10" ref={ref2}>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Customer Reviews</h1>
          {/* <Button buttonName="Add review"></Button> */}
          <MainDialog buttonName="Add review">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </MainDialog>
        </div>
        {reviewsQuery?.data?.data.map((review) => (
          <ProductReviewCard
            comment={review.comment}
            name={review.user.name}
            picture={review.user.picture}
            rating={review}
          />
        ))}
      </div>
      <div ref={ref}>
        <ProductDisplay
          isLoading={productSuggestions.isLoading}
          products={productSuggestions.data?.data}
        />
      </div>
    </div>
  );
}
interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(rating, comment);
    setRating(0); // Reset form after submission
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium">
          Rating
        </label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="w-full border-2 p-2"
          min="1"
          max="5"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="h-[6rem] w-full border-2 p-2"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit Review
      </button>
    </form>
  );
}
