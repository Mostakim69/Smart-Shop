"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { HomeIcon, ChartBarIcon, ShoppingBagIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, ClipboardIcon, UsersIcon, } from "@heroicons/react/24/outline";
import { LayoutDashboard, Package, PlusCircle, ShoppingBag, LogOut, Home, } from "lucide-react";

export default function Sidebar() {
  const { openSidebar, user, logout } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch role
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://smart-shop-server-three.vercel.app/users/${user.email}/role`
        );
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

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await toast.promise(logout(), {
        loading: "Logging out...",
        success: "Successfully logged out",
        error: "Logout failed",
      });
      router.push("/");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  if (loading) {
    return (
      <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50 items-center justify-center">
        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm mt-2">Loading...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="sticky top-0 flex flex-col items-center justify-center bg-white border-r px-5 py-3 h-screen w-[260px]">
        <p className="text-gray-500">Please log in</p>
      </section>
    );
  }

  // 🔹 Define menus for different roles
  const menuItems = {
    admin: [
      { name: "Home", link: "/", icon: <HomeIcon className="h-5 w-5" /> },
      {
        name: "Admin Dashboard",
        link: "/dashboard/admin",
        icon: <ChartBarIcon className="h-5 w-5" />,
      },
      {
        name: "Manage Products",
        link: "/dashboard/admin/manage-products",
        icon: <ClipboardIcon className="h-5 w-5" />,
      },
      {
        name: "Manage Orders",
        link: "/dashboard/admin/manage-orders",
        icon: <ShoppingBagIcon className="h-5 w-5" />,
      },
      {
        name: "Manage Users",
        link: "/dashboard/admin/manage-users",
        icon: <UsersIcon className="h-5 w-5" />,
      },
    ],
    seller: [
      { name: "Home", link: "/", icon: <Home className="h-5 w-5" /> },
      {
        name: "Seller Dashboard",
        link: "/dashboard/seller",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        name: "My Products",
        link: "/dashboard/seller/myproducts",
        icon: <Package className="h-5 w-5" />,
      },
      {
        name: "Orders",
        link: "/dashboard/seller/orders",
        icon: <ShoppingBag className="h-5 w-5" />,
      },
      {
        name: "Add Product",
        link: "/dashboard/addproduct",
        icon: <PlusCircle className="h-5 w-5" />,
      },
    ],
    user: [
      { name: "Home", link: "/", icon: <HomeIcon className="h-5 w-5" /> },
      {
        name: "Overview",
        link: "/dashboard/user",
        icon: <ChartBarIcon className="h-5 w-5" />,
      },
      {
        name: "My Orders",
        link: "/dashboard/user/orders",
        icon: <ShoppingBagIcon className="h-5 w-5" />,
      },
      {
        name: "Wishlist",
        link: "/dashboard/user/wishlist",
        icon: <HeartIcon className="h-5 w-5" />,
      },
      {
        name: "Cart",
        link: "/dashboard/user/cart",
        icon: <ShoppingCartIcon className="h-5 w-5" />,
      },
      {
        name: "My Reviews",
        link: "/dashboard/user/reviews",
        icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />,
      },
      {
        name: "Profile",
        link: "/dashboard/user/profile",
        icon: <UserCircleIcon className="h-5 w-5" />,
      },
    ],
  };

  const menuList =
    role === "admin" ? menuItems.admin : role === "seller" ? menuItems.seller : menuItems.user;

  return (
    <section
      className={`sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50 transition-all duration-300 ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* ✅ Logo */}
      <div className="flex justify-center py-4">
        <Link href="/">
          <img className="h-8" src="/logo.png" alt="Smart Shop Logo" />
        </Link>
      </div>

      {/* ✅ Menu */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, index) => (
          <Tab item={item} key={index} />
        ))}
      </ul>

      {/* ✅ Logout */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all text-red-600 font-semibold"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </section>
  );
}

// ✅ Tab Component
function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;

  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
          ${
            isSelected
              ? "bg-[#879fff] text-white"
              : "bg-white text-black hover:bg-indigo-50"
          }`}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
