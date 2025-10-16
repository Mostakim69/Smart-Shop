"use client";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";

export default function NavDash() {
  const { openSidebar, setOpenSidebar } = useAuth();

  return (
    <nav
      className={`bg-white flex items-center justify-between px-4 py-4 border-b text-blue-600
        fixed top-0 left-0 w-full md:left-54 md:w-[calc(100%-13.5rem)] z-40`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">

        <h1 className="text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="bg-primary text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
