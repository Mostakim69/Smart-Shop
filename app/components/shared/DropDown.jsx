"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";

const DropDown = ({ children }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: user?.displayName || "Unknown User", path: "#" },
    { name: user?.email || "No Email", path: "#" },
    { name: "Change Password", path: "/login/passwordReset" },
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
          className="absolute right-0 mt-3 w-56 bg-base-100/80 backdrop-blur-md border border-indigo-500/30 rounded-xl shadow-lg z-50 p-2"
        >
          <div className="px-4 py-2 border-b border-indigo-500/20">
            <h3 className="text-sm font-medium text-indigo-600">User Menu</h3>
          </div>

          {links.map((link, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              custom={i}
              whileHover={{
                scale: 1.03,
                background: "rgba(99,102,241,0.1)",
              }}
              className="rounded-lg"
            >
              <Link
                href={link.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}

          <div className="px-4 py-2 border-t border-indigo-500/20">
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </motion.ul>
      )}
    </div>
  );
};

export default DropDown;
