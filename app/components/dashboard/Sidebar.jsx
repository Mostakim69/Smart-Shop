"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
    const { openSidebar } = useAuth();

    //   role base 
    const user = { role: "user" };

    // akhane sharmin apu kaj korben ja ja link lage add korben 
    // 🔸 Admin menu
    const adminMenu = (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard/admin">Admin Dashboard</Link></li>
            <li><Link href="/dashboard/admin/manage-products">Manage Products</Link></li>
            <li><Link href="/dashboard/admin/manage-orders">Manage Orders</Link></li>
            <li><Link href="/dashboard/admin/manage-users">Manage Users</Link></li>
            <li><Link href="/dashboard/admin/reports">Reports</Link></li>
        </>
    );

    // akhane mostakim vai kaj korben ja ja link lage add korben 
    // 🔸 Seller menu
    const sellerMenu = (
        <>
            <li><Link href="/dashboard/seller">Seller Dashboard</Link></li>
            <li><Link href="/dashboard/seller/products">My Products</Link></li>
            <li><Link href="/dashboard/seller/orders">Orders</Link></li>
            <li><Link href="/dashboard/addproduct">add rpoduct</Link></li>
        </>
    );

      // 🔸 User menu (Newaz Vai)
  const userMenu = (
    <>
      {/* Top section */}
      <ul className="flex flex-col gap-2 text-gray-700 font-medium flex-1">
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <HomeIcon className="w-5 h-5 text-gray-600" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/user"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span>Overview</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/user/orders"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
            <span>My Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/user/wishlist"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <HeartIcon className="w-5 h-5 text-gray-600" />
            <span>Wishlist</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/user/cart"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
            <span>Cart</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/user/reviews"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-600" />
            <span>My Reviews</span>
          </Link>
        </li>
      </ul>

      {/* Bottom section */}
      <div className="mt-auto border-t pt-4 space-y-2">
        <Link
          href="/dashboard/user/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <UserCircleIcon className="w-5 h-5 text-gray-600" />
          <span>Profile</span>
        </Link>

        <Link
          href="dashboard/user/logout"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );

    // 🔸 Choose menu based on role
    let menuItems;
    if (user?.role === "admin") menuItems = adminMenu;
    else if (user?.role === "seller") menuItems = sellerMenu;
    else menuItems = userMenu;

    return (
        <div
      className={`bg-white text-black col-span-3 h-screen p-4 border-r shadow-sm flex flex-col 
      transition-all duration-300 ${openSidebar ? "block" : "hidden"} md:flex`}
    >
      <h1 className="text-2xl font-bold text-primary text-center mb-6">
        Smart Shop
      </h1>

      {/* Sidebar Menu */}
      {menuItems}
    </div>
    );
}
