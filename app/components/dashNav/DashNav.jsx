"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";

export default function DashboardNavbar({ toggleSidebar }) {
  const { user } = useAuth();
  // const { data: admin } = useAdmin({ email: user?.email });

  
  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2 items-center">
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-sm font-semibold">{user?.name}</h1>
            <h1 className="text-xs text-gray-600">{user?.email}</h1>
          </div>
          <a size="sm" src={user?.imageURL} />
        </div>
      </div>
    </section>
  );
}