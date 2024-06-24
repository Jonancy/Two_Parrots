import { loadCartItemsFromCookies } from "@/utils/cookies-handler";
import CreateProductVariantForm from "../admin/addVariant";
import ProductTable from "../admin/productLists";
import SpecificProduct from "../client/specifcProduct";
import OrderPage from "../client/orderPage";

function Home() {
  const products = {
    productId: "clxok5pof0003vyecjxg4s025",
    name: "product",
    gender: "Men",
    isDeleted: false,
    view: true,
    price: 120.12,
    description: "kaskas",
    createdAt: "2024-06-21T10:38:30.204Z",
    category: {
      categoryId: "clxlz9gum0000tkf2awf2wm3r",
      categoryName: "string",
    },
    variants: [
      {
        variantId: "clxpvztfg0001p6ucbe2t8yik",
        color: "Blue",
        images: [
          {
            productImageId: "clxpvztfg0004p6ucq1y0lji7",
            url: "https://res.cloudinary.com/dr1giexhn/image/upload/v1719046688/twoParrot/kwspa5c1owqqwoblh3vg.jpg",
          },
        ],
        sizes: [
          {
            sizeId: "clxpvztfg0002p6uc0jcz7hu8",
            size: "Xl",
            stock: 2,
          },
          {
            sizeId: "clxpvztfg0003p6uc2z7gpz1d",
            size: "ML",
            stock: 1,
          },
        ],
      },
      {
        variantId: "clxpw5s29000175ptjj2uz2kg",
        color: "Blue",
        images: [
          {
            productImageId: "clxpw5s29000475ptqncg5q99",
            url: "https://res.cloudinary.com/dr1giexhn/image/upload/v1719046966/twoParrot/pp1gbfvnchp1oykpiutz.jpg",
          },
        ],
        sizes: [
          {
            sizeId: "clxpw5s29000275ptfmlkjbwr",
            size: "Xl",
            stock: 2,
          },
          {
            sizeId: "clxpw5s29000375ptbeq2ydyw",
            size: "ML",
            stock: 1,
          },
        ],
      },
      {
        variantId: "clxq0rdo80001vlppqvtucege",
        color: "Red",
        images: [
          {
            productImageId: "clxq0rdo80004vlppsawbo5px",
            url: "https://res.cloudinary.com/dr1giexhn/image/upload/v1719054692/twoParrot/yevvocrdl5xnmvd0ae5y.jpg",
          },
        ],
        sizes: [
          {
            sizeId: "clxq0rdo80002vlppn102hi8u",
            size: "M",
            stock: 5,
          },
          {
            sizeId: "clxq0rdo80003vlpp56k74go3",
            size: "XL",
            stock: 2,
          },
        ],
      },
      {
        variantId: "clxsq4cqd0001ev44odlenczm",
        color: "green",
        images: [
          {
            productImageId: "clxsq4cqd0003ev44ii9b22rk",
            url: "https://res.cloudinary.com/dr1giexhn/image/upload/v1719218221/twoParrot/yxfjlqnsm9v8pxkkxbyc.jpg",
          },
        ],
        sizes: [
          {
            sizeId: "clxsq4cqd0002ev44pcctj80h",
            size: "XXL",
            stock: 2,
          },
        ],
      },
    ],
  };

  return (
    <div>
      {/* Home sdsd
      <p>,P adsdas dasdas sdsass dasdas</p> */}
      {/* <CreateProductVariantForm /> */}
      {/* <ProductTable products={products} /> */}
      {/* <SpecificProduct product={products} /> */}
      <OrderPage />
    </div>
  );
}
export default Home;
