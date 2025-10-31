"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Home, Info, Phone, LayoutDashboard, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggler from "../ThemeToggler";
import Gems from "./Gems";
import DropDown from "./DropDown";
// import useCart from "@/context/CartContext"; // optional if you have cart context

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, role } = useAuth();
  // const { cartItems } = useCart(); // for real-time cart count
  const pathname = usePathname();
  const router = useRouter();

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "seller"
      ? "/dashboard/seller"
      : "/dashboard/user";

  const links = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Products", path: "/products", icon: <Package className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="w-4 h-4" /> },
  ];
  if (user?.email) {
    links.push({
      name: "Dashboard",
      path: dashboardPath,
      icon: <LayoutDashboard className="w-4 h-4" />,
    });
  }

  // UPDATED: Use text-base-content for default links color
  const linkClass = (path) =>
    pathname === path 
      ? "text-primary font-semibold underline" 
      : "text-base-content/80 hover:text-primary hover:underline";

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     router.push(`https://smart-shop-server-three.vercel.app/products?search=${encodeURIComponent(searchQuery.trim())}`);
  //   }
  // };

  return (
    // FIX: Added text-base-content to ensure all text inherits the theme color
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 text-base-content">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              {/* FIX: Replaced fixed hover:bg-gray-200 with theme-aware hover:bg-neutral/10 */}
              <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-md hover:bg-neutral/10 transition">
                {/* FIX: Replaced fixed text-gray-700 with theme-aware text-base-content */}
                {isOpen 
                  ? <X className="w-7 h-7 text-base-content" /> 
                  : <Menu className="w-7 h-7 text-base-content" />
                }
              </button>
            </div>
            <div className="flex-shrink-0 text-2xl font-bold text-primary">
              <Link href="/">
                <Image src="/logo_3.webp" alt="Smart Shop Logo" width={60} height={60} className="rounded-xl" />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          {/* FIX: Removed text-gray-600 from parent div as linkClass handles color */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link key={link.path} href={link.path} className={`flex items-center gap-1 ${linkClass(link.path)}`}>
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          {/* FIX: Removed text-gray-300 from parent div */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggler />
            {/* <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                // FIX: Used theme-aware border and text colors
                className="pl-3 pr-3 py-1 border border-base-content/30 rounded-lg w-44 
                           text-base-content bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form> */}
            <Gems />
            <Link href="/cartPage" className="relative">
              {/* FIX: Replaced fixed text-gray-700 with theme-aware text-base-content */}
              <ShoppingCart className="w-6 h-6 text-base-content hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {/* {cartItems.length} */} 2
              </span>
            </Link>
            {!user ? (
              <Link href="/login">
                {/* FIX: Replaced fixed text-gray-700 and hover:text-blue-600 with theme-aware text-base-content and hover:text-primary */}
                <User className="w-6 h-6 text-base-content hover:text-primary" />
              </Link>
            ) : (
              <DropDown>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border hover:ring-2 hover:ring-primary transition-all ring-2 ring-offset-2"
                />
              </DropDown>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center">
            {/* ... Mobile User/Dropdown icons are fine, inheriting parent styles ... */}
            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-base-content hover:text-primary" />
              </Link>
            ) : (
              <DropDown>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border hover:ring-2 hover:ring-primary transition-all ring-2 ring-offset-2"
                />
              </DropDown>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        // FIX: Replaced fixed text-gray-700 with theme-aware text-base-content
        <div className="md:hidden text-base-content shadow-lg px-6 pt-2 pb-4 space-y-4 bg-base-100 rounded-b-lg">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              // FIX: Replaced fixed hover:bg-gray-100 with theme-aware hover:bg-neutral/10
              <Link key={link.path} href={link.path} className="flex items-center gap-2 p-2 rounded hover:bg-neutral/10">
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle is fine */}
          <div className="pt-3">
            <ThemeToggler />
          </div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              // FIX: Used theme-aware border and text colors
              className="w-full px-3 py-2 border border-base-content/30 rounded-lg 
                         text-base-content bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary mt-3"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-6 pt-4">
            <Link href="/cartPage" className="relative">
              {/* FIX: Replaced fixed text-gray-700 and hover:text-blue-600 */}
              <ShoppingCart className="w-6 h-6 text-base-content hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {/* {cartItems.length} */} 2
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}