"use client";
import Notifications from "@/app/dashboard/Notifications";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";


export default function NavDash({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3 z-50 shadow-sm">
      {/* Left side — menu button (mobile only) */}
      <div className="flex items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      {/* Main section */}
      <div className="flex justify-between items-center w-full md:pr-[260px]">
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-5 ml-auto">
          {/* 🔔 Notifications Component */}
          <Notifications />

          {/* 👤 User Info */}
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
