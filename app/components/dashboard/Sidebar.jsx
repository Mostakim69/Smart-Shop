"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  PresentationChartLineIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { openSidebar, user, logout } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState(); // hardcoded default role

  // ✅ Handle Logout
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // ✅ Fetch role dynamically (optional)
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`http://localhost:5000/users/${user.email}/role`);
        const data = await res.json();
        if (data?.role) setRole(data.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      }
    };
    fetchRole();
  }, [user?.email]);

  // akhane sharmin apu kaj korben ja ja link lage add korben 
  // 🔸 Admin menu
  const adminMenu = (
    <>
      <ul className="flex flex-col gap-2 text-gray-700 font-medium flex-1">
        <li>
          <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <HomeIcon className="w-5 h-5 text-gray-600" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admin" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span>Admin Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admin/manage-products" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <CubeIcon className="w-5 h-5 text-gray-600" />
            <span>Manage Products</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admin/manage-orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ClipboardDocumentListIcon className="w-5 h-5 text-gray-600" />
            <span>Manage Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admin/manage-users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <UsersIcon className="w-5 h-5 text-gray-600" />
            <span>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admin/reports" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <PresentationChartLineIcon className="w-5 h-5 text-gray-600" />
            <span>Reports</span>
          </Link>
        </li>
      </ul>

      {/* 🔴 Logout button (Admin) */}
      <div className="mt-auto border-t pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  // akhane mostakim vai kaj korben ja ja link lage add korben 
  // 🔸 Seller menu
  const sellerMenu = (
    <>
      <ul className="flex flex-col gap-2 text-gray-700 font-medium flex-1">
        <li>
          <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <HomeIcon className="w-5 h-5 text-gray-600" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/seller" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span>Seller Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/seller/myproducts" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <CubeIcon className="w-5 h-5 text-gray-600" />
            <span>My Products</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/seller/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ClipboardDocumentListIcon className="w-5 h-5 text-gray-600" />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/addproduct" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <PlusCircleIcon className="w-5 h-5 text-gray-600" />
            <span>Add Product</span>
          </Link>
        </li>
      </ul>

      {/* 🔴 Logout button (Seller) */}
      <div className="mt-auto border-t pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  // 🔸 User menu (Newaz bhai)
  const userMenu = (
    <>
      <ul className="flex flex-col gap-2 text-gray-700 font-medium flex-1">
        <li>
          <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <HomeIcon className="w-5 h-5 text-gray-600" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span>Overview</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
            <span>My Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user/wishlist" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <HeartIcon className="w-5 h-5 text-gray-600" />
            <span>Wishlist</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user/cart" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
            <span>Cart</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user/reviews" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-600" />
            <span>My Reviews</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/user/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <UserCircleIcon className="w-5 h-5 text-gray-600" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>

      {/* 🔴 Logout button (User) */}
      <div className="mt-auto border-t pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  // 🔸 Choose menu based on role
  let menuItems;
  if (role === "admin") menuItems = adminMenu;
  else if (role === "seller") menuItems = sellerMenu;
  else menuItems = userMenu;

  return (
    <div
      className={`bg-white text-black col-span-3 h-screen p-4 border-r shadow-sm flex flex-col transition-all duration-300 ${
        openSidebar ? "block" : "hidden"
      } md:flex`}
    >
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
        🛍️ Smart Shop
      </h1>

      {/* Sidebar Menu */}
      {menuItems}
    </div>
  );
}
