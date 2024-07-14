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
import { FaCartPlus, FaUser } from "react-icons/fa";
import { Search } from "lucide-react";
import { SideCart } from "../cart/sideCart";

export default function Navbar() {
  interface INavLinkTypes {
    name: string;
    component: React.ComponentType;
  }
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
  return (
    <div className=" px-20 py-6 flex justify-between items-center bg-white z-50 sticky top-0 border-b">
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
      <div className="flex gap-4 items-center">
        <FaUser />
        <Search />
        <SideCart />
      </div>
    </div>
  );
}
