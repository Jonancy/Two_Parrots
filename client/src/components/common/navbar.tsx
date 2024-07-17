import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavbarHoverTypes from "../navbarLinks/navbarHoverTypes";
import React from "react";
import bill from "@/assets/a.jpg";
import { FaUser } from "react-icons/fa";
import { SideCart } from "../cart/sideCart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";
import { useNavigate } from "react-router-dom";
interface INavLinkTypes {
  name: string;
  component: React.ComponentType;
}

export default function Navbar() {
  const { userId } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const navLinks: INavLinkTypes[] = [
    {
      name: "New",
      component: NavbarHoverTypes,
    },
    {
      name: "Women",
      component: NavbarHoverTypes,
    },
    {
      name: "Men",
      component: NavbarHoverTypes,
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
    <div className=" px-20 py-4 flex justify-between items-center bg-white z-50 sticky top-0 border-b">
      <div className="w-[8rem] h-[4rem] ">
        <img className="w-full h-full object-cover" src={bill}></img>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks?.map((nav) => (
            <NavigationMenuItem key={nav.name}>
              <NavigationMenuTrigger>{nav.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <nav.component />
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-[15rem] items-center flex justify-end">
        <div className="flex gap-4 items-center text-2xl  ">
          {/* <Search /> */}
          <FaUser onClick={handleNavigate} className="cursor-pointer" />
          <SideCart />
          <form action="" className="relative ">
            <input
              type="search"
              placeholder="Search clothes"
              // onChange={debounceOnChange}
              className="peer cursor-pointer relative z-10 h-10 w-6  rounded-full bg-transparent text-sm font-semibold  pl-10 outline-none transition-all duration-300 ease-in-out focus:w-full focus:border focus:cursor-text focus:border-neutral-700 focus:pl-14 focus:pr-2"
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
          </form>
        </div>
      </div>
    </div>
  );
}
