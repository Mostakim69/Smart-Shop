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
  const linkClass = (path) =>
    pathname === path ? "text-primary font-semibold underline" : "text-gray-600 hover:text-primary hover:underline";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`https://smart-shop-server-three.vercel.app/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-md hover:bg-gray-200 transition">
                {isOpen ? <X className="w-7 h-7 text-gray-700" /> : <Menu className="w-7 h-7 text-gray-700" />}
              </button>
            </div>
            <div className="flex-shrink-0 text-2xl font-bold text-primary">
              <Link href="/">
                <Image src="/logo_3.webp" alt="Smart Shop Logo" width={60} height={60} className="rounded-xl" />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            {links.map((link) => (
              <Link key={link.path} href={link.path} className={`flex items-center gap-1 ${linkClass(link.path)}`}>
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4 text-gray-300">
            <ThemeToggler />
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-3 pr-3 py-1 border rounded-lg w-44 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
            <Gems />
            <Link href="/cartPage" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {/* {cartItems.length} */} 2
              </span>
            </Link>
            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              </Link>
            ) : (
              <DropDown>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border hover:ring-2 hover:ring-indigo-400 transition-all ring-2 ring-offset-2"
                />
              </DropDown>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center">
            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              </Link>
            ) : (
              <DropDown>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border hover:ring-2 hover:ring-indigo-400 transition-all ring-2 ring-offset-2"
                />
              </DropDown>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden text-gray-700 shadow-lg px-6 pt-2 pb-4 space-y-4 bg-base-100 rounded-b-lg">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link key={link.path} href={link.path} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary mt-3"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-6 pt-4">
            <Link href="/cartPage" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {/* {cartItems.length} */} 2
              </span>
            </Link>
            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              </Link>
            ) : (
              <DropDown>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border hover:ring-2 hover:ring-indigo-400 transition-all ring-2 ring-offset-2"
                />
              </DropDown>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
