"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function DashboardNavbar({ toggleDrawer }) {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  return (
    <nav className="navbar bg-base-200 px-4 py-2 shadow-md h-16">
      {/* Left: Welcome message */}
      <div className="flex-1">
        <span className="text-md font-medium text-primary">
          Welcome, {user?.displayName || "User"}
        </span>
      </div>

      {/* Center: Search box */}
      <div className="flex-1 justify-center hidden md:flex">
        <label className="input input-bordered input-sm flex items-center gap-2 w-80">
          <FaSearch className="text-base-content" />
          <input
            type="text"
            className="grow text-sm"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Right: Actions */}
      <div className="flex-none flex items-center gap-3">
        {/* Toggle Button (for drawer/sidebar) */}
        <button
          className="btn btn-ghost btn-sm lg:hidden"
          onClick={toggleDrawer}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle btn-sm">
          <div className="indicator">
            <FaBell className="text-lg" />
            <span className="badge badge-xs badge-secondary indicator-item"></span>
          </div>
        </button>

        {/* User Avatar */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar btn-sm">
            <div className="w-8 rounded-full">
              {
                user ? <div><img referrerPolicy="no-referrer" src={user.photoURL} alt="" /></div> : <FaUserCircle className="text-2xl text-secondary" />
              }

            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
