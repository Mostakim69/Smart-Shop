"use client";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";

export default function NavDash() {
  const { openSidebar, setOpenSidebar } = useAuth();

  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-4 py-3">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="bg-primary text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
