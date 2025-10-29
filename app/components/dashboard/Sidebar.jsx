"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import {
  HomeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardIcon,
  UsersIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  LogOut,
  Home,
  X,
  Menu,
  Settings,
  ChartPieIcon,
  LifeBuoyIcon,
  UserCircle2Icon,
  BellIcon,
  Package2,
  LayoutDashboardIcon,
  ClipboardPenIcon,
  UserRoundPen,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Sidebar() {
  const { user, logout } = useAuth();
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
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
        name: "Profile",
        link: "/dashboard/profile",
        icon: <UserRoundPen className="h-5 w-5" />,
      },
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
      {
        name: "Support User",
        link: "/dashboard/admin/support-user",
        icon: <UserCircleIcon className="h-5 w-5" />,
      },
      {
        name: "Report",
        link: "/dashboard/admin/reports",
        icon: <ChartPieIcon className="h-5 w-5" />,
      },
      {
        name: "Settings",
        link: "/dashboard/admin/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    
    ],
    seller: [
      { name: "Home", link: "/", icon: <Home className="h-5 w-5" /> },
         {
        name: "Profile",
        link: "/dashboard/profile",
        icon: <UserRoundPen className="h-5 w-5" />,
      },
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
      {
        name: "Settings",
        link: "/dashboard/admin/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
    user: [
      { name: "Home", link: "/", icon: <HomeIcon className="h-5 w-5" /> },
       {
        name: "Profile",
        link: "/dashboard/profile",
        icon: <UserRoundPen className="h-5 w-5" />,
      },
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
        name: "Support",
        link: "/dashboard/user/support",
        icon: <LifebuoyIcon className="h-5 w-5" />,
      },
     
    ],
     deliveryMan: [
      { name: "Home", link: "/", icon: <HomeIcon className="h-5 w-5" /> },
      {
        name: "Dashboard",
        link: "/dashboard/deliveryMan",
        icon: <LayoutDashboardIcon className="h-5 w-5" />,
      },
      {
        name: "My Deliveries",
        link: "/dashboard/deliveryMan/delivery",
        icon: <Package2 className="h-5 w-5" />,
      },
      {
        name: "Delivery History",
        link: "/dashboard/deliveryMan/history",
        icon: <ClipboardPenIcon className="h-5 w-5" />,
      },
      {
        name: "Notifications",
        link: "/dashboard/deliveryMan/notifications",
        icon: <BellIcon className="h-5 w-5" />,
      },
      {
        name: "Profile",
        link: "/dashboard/deliveryMan/profile",
        icon: <UserCircle2Icon className="h-5 w-5" />,
      },
      {
        name: "Support",
        link: "/dashboard/deliveryMan/support",
        icon: <LifeBuoyIcon className="h-5 w-5" />,
      },
    ],
  };

  const menuList = menuItems[role] || menuItems.user;

  return (
    <>
      {/* ✅ Sidebar */}
      <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
        {/* ✅ Logo */}
        <div className="flex justify-center py-4">
          <Link href="/">
            <Image src="/logo_3.webp" alt="Logo" width={110} height={40} />
          </Link>
        </div>

        {/* ✅ Menu */}
        <ul className="flex-1 overflow-y-auto  h-full scrollbar-none flex flex-col gap-4">
          {menuList?.map((item, index) => (
            <Tab item={item} key={index} />
          ))}
        </ul>

        {/* ✅ Logout */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 cursor-pointer"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </section>
    </>
  );
}

// ✅ Tab Component
function Tab({ item, onClick }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;

  return (
    <Link href={item?.link} onClick={onClick}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
          ${isSelected
            ? "bg-[#879fff] text-white"
            : "bg-white text-black hover:bg-indigo-50"
          }`}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
