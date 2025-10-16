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
import { ClipboardIcon, Home, LayoutDashboard, Package, PackageIcon, PlusCircle, ShoppingBag, UsersIcon } from "lucide-react";

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
    <ul className="space-y-2 text-gray-700 font-medium">
        <li>
  <Link
    href="/"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
     onClick={() => setOpenSidebar(false)}
  >
    <HomeIcon className="w-5 h-5 text-gray-600" />
    <span>Home</span>
  </Link>
</li>
<li>
  <Link
    href="/dashboard/admin"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
     onClick={() => setOpenSidebar(false)}
  >
    <ChartBarIcon className="w-5 h-5 text-gray-600" />
    <span>Admin Dashboard</span>
  </Link>
</li>
<li>
  <Link
    href="/dashboard/admin/manage-products"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
    onClick={() => setOpenSidebar(false)}
  >
    <PackageIcon className="w-5 h-5 text-gray-600" />
    <span>Manage Products</span>
  </Link>
</li>
<li>
  <Link
    href="/dashboard/admin/manage-orders"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
     onClick={() => setOpenSidebar(false)}
  >
    <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
    <span>Manage Orders</span>
  </Link>
</li>
<li>
  <Link
    href="/dashboard/admin/manage-users"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
     onClick={() => setOpenSidebar(false)}
  >
    <UsersIcon className="w-5 h-5 text-gray-600" />
    <span>Manage Users</span>
  </Link>
</li>
<li>
  <Link
    href="/dashboard/admin/reports"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
     onClick={() => setOpenSidebar(false)}
  >
    <ClipboardIcon className="w-5 h-5 text-gray-600" />
    <span>Reports</span>
  </Link>
</li>

    </ul>
  );

    // akhane mostakim vai kaj korben ja ja link lage add korben 
    // 🔸 Seller menu
    // const sellerMenu = (
    //     <>
    //         <li><Link href="/">Home</Link></li>
    //         <li><Link href="/dashboard/seller">Seller Dashboard</Link></li>
    //         <li><Link href="/dashboard/seller/myproducts">My Products</Link></li>
    //         <li><Link href="/dashboard/seller/orders">Orders</Link></li>
    //         <li><Link href="/dashboard/addproduct">add rpoduct</Link></li>
    //     </>
    // );
const sellerMenu = (
  <ul className="space-y-2 text-gray-700 font-medium">
    <li>
      <Link
        href="/"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpenSidebar(false)}
      >
        <Home className="w-5 h-5 text-gray-600" />
        <span>Home</span>
      </Link>
    </li>

    <li>
      <Link
        href="/dashboard/seller"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpenSidebar(false)}
      >
        <LayoutDashboard className="w-5 h-5 text-gray-600" />
        <span>Seller Dashboard</span>
      </Link>
    </li>

    <li>
      <Link
        href="/dashboard/seller/myproducts"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpenSidebar(false)}
      >
        <Package className="w-5 h-5 text-gray-600" />
        <span>My Products</span>
      </Link>
    </li>

    <li>
      <Link
        href="/dashboard/seller/orders"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpenSidebar(false)}
      >
        <ShoppingBag className="w-5 h-5 text-gray-600" />
        <span>Orders</span>
      </Link>
    </li>

    <li>
      <Link
        href="/dashboard/addproduct"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpenSidebar(false)}
      >
        <PlusCircle className="w-5 h-5 text-gray-600" />
        <span>Add Product</span>
      </Link>
    </li>
  </ul>
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
      className={`fixed left-0 top-0 h-screen w-54 bg-white border-r text-blue-600 shadow-md flex flex-col z-50 transition-all duration-300 ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <h1 className="text-2xl font-bold text-blue-600 text-center py-4 border-b">
        Smart Shop
      </h1>
      <nav className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
        {menuItems}
      </nav>
    </div>
  );
}

