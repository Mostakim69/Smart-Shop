"use client";
import { useAuth } from "@/context/AuthContext";
import { Menu, Bell } from "lucide-react";

export default function NavDash() {
  const { openSidebar, setOpenSidebar, user } = useAuth();

  return (
    <nav
      className={`bg-white shadow-sm flex items-center justify-between px-4 py-3 border-b text-blue-600
        fixed top-0 left-0 w-full md:left-54 md:w-[calc(100%-13.5rem)] z-44 transition-all`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <Menu size={22} />
        </button>

        {/* Welcome text — hidden on mobile */}
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notification icon — hidden on small devices */}
        <button className="hidden sm:block relative cursor-pointer hover:text-blue-700 transition-colors">
          <Bell size={22} />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ">
            3
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Username — hidden on mobile */}
          <span className="hidden sm:block text-gray-700 font-medium">
            {user?.displayName || "Guest"}
          </span>

          {/* Avatar — always visible */}
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
}
