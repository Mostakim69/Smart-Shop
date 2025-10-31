"use client";

import { usePathname } from "next/navigation";
import NavDash from "../components/dashboard/NavDash";
import Sidebar from "../components/dashboard/Sidebar";
import { useEffect, useRef, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);


  return (
    <main className="flex relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}
        `}
      >
        <Sidebar />
      </div>
      {/* Main Section */}
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <NavDash toggleSidebar={toggleSidebar} />
        <section className="pt-14 flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
}
