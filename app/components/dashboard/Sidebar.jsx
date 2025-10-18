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
  ClipboardIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  Home,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";

export default function Sidebar() {
  const { openSidebar, user, logout } = useAuth();
  const router = useRouter();
  //set default role in the useState("admin")
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  // ✅ Handle Logout
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
//if you want to set default role comment useEffect and set default in the useState
  // ✅ Fetch role dynamically
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://smart-shop-server-three.vercel.app/users/${user.email}/role`);
        const data = await res.json();
        if (data?.role) setRole(data.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  // ✅ Show loading spinner while user/role is loading
  if (loading) {
    return (
      <div className="fixed left-0 top-0 h-screen w-54 bg-white border-r shadow-md flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ If user is not logged in
  if (!user) {
    return (
      <div className="fixed left-0 top-0 h-screen w-54 bg-white border-r shadow-md flex items-center justify-center">
      </div>
    );
  }

  // 🔸 Admin Menu
  const adminMenu = (
    <ul className="space-y-2 text-gray-700 font-medium">
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
          <ClipboardIcon className="w-5 h-5 text-gray-600" />
          <span>Manage Products</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/admin/manage-orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
          <span>Manage Orders</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/admin/manage-users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <UsersIcon className="w-5 h-5 text-gray-600" />
          <span>Manage Users</span>
        </Link>
      </li>
    </ul>
  );

  // 🔸 Seller Menu
  const sellerMenu = (
    <ul className="space-y-2 text-gray-700 font-medium">
      <li>
        <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <Home className="w-5 h-5 text-gray-600" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/seller" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <LayoutDashboard className="w-5 h-5 text-gray-600" />
          <span>Seller Dashboard</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/seller/myproducts" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <Package className="w-5 h-5 text-gray-600" />
          <span>My Products</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/seller/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <ShoppingBag className="w-5 h-5 text-gray-600" />
          <span>Orders</span>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/addproduct" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
          <PlusCircle className="w-5 h-5 text-gray-600" />
          <span>Add Product</span>
        </Link>
      </li>
    </ul>
  );

  // 🔸 User Menu
  const userMenu = (
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
  );

  // 🔸 Choose menu based on role
  let menuItems;
  if (role === "admin") menuItems = adminMenu;
  else if (role === "seller") menuItems = sellerMenu;
  else menuItems = userMenu;

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-54 bg-white border-r text-blue-600 shadow-md flex flex-col justify-between z-50 transition-all duration-300 ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div>
        <h1 className="text-2xl font-bold text-blue-600 text-center py-4 border-b">
          Smart Shop
        </h1>
        <nav className="overflow-y-auto px-4 py-4 custom-scrollbar">
          {menuItems}
        </nav>
      </div>

      {/* ✅ Logout fixed at bottom for all roles */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
