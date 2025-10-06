"use client";

import { auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { Layers2, LayoutDashboard, LibraryBig, LogOut, PackageOpen, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaBox, FaHome, FaPlus } from "react-icons/fa";

export default function Sidebar() {
  const menuList = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, },
    { name: "Add Product", href: "/dashboard/addproduct", icon: <FaPlus /> },
    { name: "My Products", href: "/dashboard/myproduct", icon: <FaBox /> },
    {
      name: "Categories", href: "/dashboard/categories", icon: <Layers2 className="h-5 w-5" />,
    },
    { name: "All Products", href: "/dashboard/allproduct", icon: <PackageOpen className="h-5 w-5" />, },
    { name: "Customers", href: "/dashboard/customers", icon: <User className="h-5 w-5" />, },
    { name: "Reviews", href: "/dashboard/reviews", icon: <Star className="h-5 w-5" />, },
    { name: "Collections", href: "/dashboard/collections", icon: <LibraryBig className="h-5 w-5" />, },
  ];

  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
      <div className="flex justify-center py-4">
        <div className="flex-shrink-0 text-2xl font-bold text-primary">
          <Link href="/"><Image
            src="/logo (3).png"
            alt="Smart Shop Logo"
            width={60}
            height={60}
            className="rounded-xl"
          /></Link>
        </div>
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />;
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading...",
                success: "Successfully Logged out",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all cursor-pointer"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.href;
  return (
    <Link href={item?.href}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"} 
        `}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}