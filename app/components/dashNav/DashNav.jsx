"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

export default function DashboardNavbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-white border-b shadow-sm z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:pr-[260px]">
        {/* Mobile Sidebar Toggle */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar" className="p-2 hover:bg-gray-100 rounded-full transition"> <Menu className="w-6 h-6" />
          </button>
        </div>

        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-800"> {user?.displayName || user?.name || "User"} </p>
            <p className="text-xs text-gray-500">{user?.email || "No email"}</p>
          </div>

          {/* Avatar */}
          <div className="relative"> <div tabIndex={0} className="btn btn-ghost btn-circle avatar btn-sm cursor-pointer" >
            <div className="w-9 h-9 rounded-full overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={`${user.displayName || "User"}'s avatar`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
