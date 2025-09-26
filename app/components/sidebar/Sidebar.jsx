"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaChartPie, FaPlus, FaBox } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Overview", href: "/dashboard", icon: <FaChartPie /> },
    { name: "Add Product", href: "/dashboard/addproduct", icon: <FaPlus /> },
    { name: "My Products", href: "/dashboard/myproduct", icon: <FaBox /> },
    { name: "All Products", href: "/dashboard/allproduct", icon: <FaBox /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold text-green-600 px-6 py-4 border-b">Smart Shop</h1>
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
              pathname === href
                ? "bg-green-100 text-green-600"
                : "text-gray-700 hover:bg-green-50"
            }`}
          >
            <span className="text-lg">{icon}</span> {name}
          </Link>
        ))}
      </nav>
      <p className="text-center text-sm text-gray-400 border-t p-4">
        © {new Date().getFullYear()} Admin
      </p>
    </aside>
  );
}
