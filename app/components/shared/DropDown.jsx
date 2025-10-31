"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogOut, User, Mail, Lock, LayoutDashboard } from "lucide-react"; // Import useful icons

const DropDown = ({ children }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Determine the correct dashboard path based on role, using a placeholder if role is undefined
  const userRole = user?.role || 'user'; 
  const dashboardPath = userRole === "admin"
    ? "/dashboard/admin"
    : userRole === "seller"
    ? "/dashboard/seller"
    : "/dashboard/user";

  const links = [
    { name: "Dashboard", path: dashboardPath, icon: <LayoutDashboard className="w-4 h-4" /> },
    // These items are for display/info only, using path: "#" is fine for non-navigable text
    { name: user?.displayName || "Profile", path: "#", icon: <User className="w-4 h-4" /> },
    { name: user?.email || "Email Info", path: "#", icon: <Mail className="w-4 h-4" /> },
    { name: "Change Password", path: "/login/passwordReset", icon: <Lock className="w-4 h-4" /> },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter links to prevent non-navigable links from being styled like buttons
  const infoLinks = links.filter(link => link.path === '#');
  const actionLinks = links.filter(link => link.path !== '#');

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Trigger */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {children}
      </motion.div>

      {/* Dropdown Menu */}
      {open && (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          // FIX: The background will now be theme-aware (bg-base-100) and the border uses primary color
          className="absolute right-0 mt-3 w-60 bg-base-100/95 backdrop-blur-sm border border-primary/30 rounded-xl shadow-2xl z-50 p-2"
        >
          {/* User Info Header Section */}
          <div className="px-4 py-2 border-b border-base-content/10 flex flex-col items-start space-y-1">
            {/* FIX: Use text-base-content for theme visibility */}
            <h3 className="text-base font-semibold text-base-content">{user?.displayName || "User Profile"}</h3>
            <p className="text-xs text-base-content/70 truncate w-full">{user?.email || "No Email Provided"}</p>
          </div>

          {/* Action Links */}
          <div className="py-1">
            {actionLinks.map((link, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                custom={i}
                // FIX: Use theme-aware hover background (hover:bg-neutral/10)
                whileHover={{
                  scale: 1.02,
                  background: 'var(--fallback-nd,oklch(var(--n)/0.1))', // DaisyUI way to use neutral/10
                }}
                className="rounded-lg"
              >
                <Link
                  href={link.path}
                  // FIX: Use theme-aware text color (text-base-content)
                  className="block px-4 py-2 text-sm text-base-content hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-1 pt-2 border-t border-base-content/10">
            <motion.button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </motion.ul>
      )}
    </div>
  );
};

export default DropDown;