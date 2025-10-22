"use client";
import { useAuth } from "@/context/AuthContext";
import { Menu, Bell } from "lucide-react";

export default function NavDash({ toggleSidebar }) {
  const { openSidebar, setOpenSidebar, user } = useAuth();

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">

        {/* Welcome text — hidden on mobile */}
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notification icon — hidden on small devices */}
        <button className="hidden sm:block relative cursor-pointer hover:text-blue-700 transition-colors">
          <Bell size={22} />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ">
            2
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
      </div>
    </section>
  );
}
