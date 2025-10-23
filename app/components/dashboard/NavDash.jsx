"use client";
import { useAuth } from "@/context/AuthContext";
import { Menu, Bell } from "lucide-react";

export default function NavDash({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3 z-50">
      {/* Left side — menu button (mobile only) */}
      <div className="flex items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      {/* Main section */}
      <div className="flex justify-between items-center w-full md:pr-[260px]">
        {/* Welcome text (hidden on mobile) */}
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Notification (always right on mobile) */}
          <button className="relative cursor-pointer hover:text-blue-700 transition-colors">
            <Bell size={22} />
            <span className="absolute -top-[4px] -right-[4px] bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block text-gray-700 font-medium">
              {user?.displayName || "Guest"}
            </span>
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-gray-300 object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
