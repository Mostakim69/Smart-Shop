"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  Info,
  Phone,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import ThemeToggler from "../ThemeToggler";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();


  const linkClass = (path) =>
    pathname === path
      ? "text-primary font-semibold underline" // active style
      : "text-gray-600 hover:text-primary hover:underline"; // default style

  return (
    <nav className=" shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-primary">
            <Link href="/"><Image
                          src="/logo (3).png"
                          alt="Smart Shop Logo"
                          width={60}
                          height={60}
                          className="rounded-xl"
                        /></Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden text-gray-600 md:flex items-center space-x-6">
            {/* <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/products" className={linkClass("/products")}>Products</Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
            <Link href="/login" className={linkClass("/login")}>Login</Link> */}
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <Package className="w-4 h-4" /> Products
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <Info className="w-4 h-4" /> About
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <Phone className="w-4 h-4" /> Contact
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <User className="w-4 h-4" /> Login
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden text-gray-300 md:flex items-center space-x-4">
            <ThemeToggler></ThemeToggler>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-3 py-1 border rounded-lg w-44 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Icons */}
            <Link href="/wishlist">
              <Heart className="w-6 h-6 text-gray-700 hover:text-primary" />
            </Link>

            <Link href="/cartPage" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                2
              </span>
            </Link>

            {/* User / Profile */}
            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                />

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                    <div className="px-4 py-2 text-sm text-gray-800">
                      {user.displayName || "User"}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-7 h-7 text-gray-700" />
              ) : (
                <Menu className="w-7 h-7 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden text-gray-300 shadow-lg px-6 pt-4 pb-6 space-y-4">
          {/* Links */}
          <Link href="/" className="flex items-center gap-2 hover:text-primary">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Package className="w-4 h-4" /> Products
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Info className="w-4 h-4" /> About
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Phone className="w-4 h-4" /> Contact
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-primary"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>

          <ThemeToggler></ThemeToggler>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Icons */}
          <div className="flex items-center space-x-6 pt-2">
            <Heart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />

            {!user ? (
              <Link href="/login">
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                />

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                    <div className="px-4 py-2 text-sm text-gray-800">
                      {user.displayName || "User"}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
