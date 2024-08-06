import NavbarHoverTypes from "../navbarLinks/navbarHoverTypes";
import React, { useEffect, useState } from "react";
import bill from "@/assets/two_parrots.jpg";
import { FaUser } from "react-icons/fa";
import { SideCart } from "../cart/sideCart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetClientFilterProductsQuery } from "@/hooks/queries/product/product.query";
interface INavLinkTypes {
  name: string;
  component: React.ComponentType;
  link: string;
}

function SearchBar() {
  const [filters, setFilters] = useState<{
    searchName?: string;
  }>();
  const [value, setValue] = useState<string>();

  const { debounceValue } = useDebounce(value);

  const { data, isLoading } = useGetClientFilterProductsQuery({
    filters,
    isEnabled: !!filters?.searchName,
  });

  useEffect(() => {
    if (debounceValue) {
      setFilters({ searchName: debounceValue });
    } else {
      setFilters({}); // Clear filters if debounceValue is empty
    }
  }, [debounceValue]);

  return (
    <form action="" className="relative">
      <input
        type="search"
        placeholder="Search clothes"
        onChange={(e) => setValue(e.target.value)}
        className="peer relative z-10 h-10 w-6 cursor-pointer rounded-full bg-transparent pl-10 text-sm font-semibold outline-none transition-all duration-300 ease-in-out focus:w-full focus:cursor-text focus:border focus:border-neutral-700 focus:pl-14 focus:pr-2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-y-0 my-auto h-9 w-12 border-r border-transparent stroke-black px-3 transition-all duration-300 ease-in-out peer-focus:border-neutral-700 peer-focus:stroke-neutral-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {debounceValue && (
        <div className="absolute z-10 flex h-[20rem] w-full flex-col gap-2 rounded-md border bg-gray-100 p-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : data && data?.data?.products?.length > 0 ? (
            data?.data.products.map((product) => (
              <div className="flex items-center gap-2" key={product.productId}>
                <img
                  src={product.variants[0].images[0].url}
                  className="h-10 w-10 object-cover"
                  alt="pic"
                />
                <p className="text-sm font-semibold">{product.name}</p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </form>
  );
}

export default function Navbar() {
  const { userId } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  // const [openSearch, setOpenSearch] = useState<boolean>(false);

  const navLinks: INavLinkTypes[] = [
    {
      name: "Products",
      component: NavbarHoverTypes,
      link: "/product/filter-products",
    },
    {
      name: "About",
      component: NavbarHoverTypes,
      link: "/about-us",
    },
  ];

  const handleNavigate = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-20 py-4">
      <Link to={"/"} className="h-[4rem] w-[8rem]">
        <img className="h-full w-full object-cover" src={bill}></img>
      </Link>
      <div className="flex gap-10">
        {navLinks?.map((nav) => <Link to={`${nav.link}`}>{nav.name}</Link>)}
      </div>
      {/* <NavigationMenu>
        <NavigationMenuList>
          {navLinks?.map((nav) => (
            <NavigationMenuItem key={nav.name}>
              <NavigationMenuTrigger>{nav.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="">
                  <nav.component />
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu> */}
      <div className="flex w-[20rem] items-center justify-end">
        <div className="flex items-center gap-4 text-2xl">
          {/* <Search /> */}
          <FaUser onClick={handleNavigate} className="cursor-pointer" />
          <SideCart />
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
