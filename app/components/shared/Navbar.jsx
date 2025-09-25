"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-primary">
            <Link href="/">SmartShop</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden text-black md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/dashboard" className="block hover:text-primary">Dashboard</Link>
            <Link href="/login" className="hover:text-primary">Login</Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
          </div>

          {/* Right Side */}
          <div className="hidden text-black md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-3 py-1 border rounded-lg w-44 text-black focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Icons */}
            <Link href="/wishlist">
              <Heart className="w-6 h-6 text-gray-700 hover:text-primary" />
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                2
              </span>
            </Link>

            <Link href="/account">
              <User className="w-6 h-6 text-gray-700 hover:text-primary" />
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
        <div className="md:hidden text-black bg-white shadow-lg px-6 pt-4 pb-6 space-y-4">
          {/* Links */}
          <Link href="/" className="block hover:text-primary">Home</Link>
          <Link href="/products" className="block hover:text-primary">Products</Link>
          <Link href="/about" className="block hover:text-primary">About</Link>
          <Link href="/contact" className="block hover:text-primary">Contact</Link>
          <Link href="/dashboard" className="block hover:text-primary">Dashboard</Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Icons */}
          <div className="flex space-x-6 pt-2">
            <Heart className="w-6 h-6 text-black hover:text-primary" />
            <ShoppingCart className="w-6 h-6 text-black hover:text-primary" />
            <User className="w-6 h-6 text-black hover:text-primary" />
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
      )
      }
    </nav>
  )
};
