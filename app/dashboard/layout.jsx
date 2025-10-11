// "use client";

import NavDash from "../components/dashboard/NavDash";
import Sidebar from "../components/dashboard/Sidebar";

// import React, { useEffect, useRef, useState } from 'react'
// import Sidebar from '../components/sidebar/Sidebar'
// import DashboardNavbar from '../components/dashNav/DashNav'
// import { usePathname } from 'next/navigation';

// export default function DashboardLayout({ children }) {

//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const sidebarRef = useRef(null);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//     useEffect(() => {
//     toggleSidebar();
//   }, [pathname]);

//     useEffect(() => {
//     function handleClickOutsideEvent(event) {
//       if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutsideEvent);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideEvent);
//     };
//   }, []);


//   return (
//     <main className="relative flex">
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>
//       <div
//         ref={sidebarRef}
//         className={`fixed md:hidden ease-in-out transition-all duration-300 z-50 
//         ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}
//         `}
//       >
//         <Sidebar />
//       </div>


//       <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
//         <DashboardNavbar toggleSidebar={toggleSidebar}/>
//         <section className="pt-14 flex-1 bg-[#eff3f4]">{children}</section>
//       </section>
//     </main>
//   )
// }





export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavDash />
        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

