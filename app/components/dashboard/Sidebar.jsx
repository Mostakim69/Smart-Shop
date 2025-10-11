"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
    const { openSidebar } = useAuth();

    //   role base 
    const user = { role: "selsler" };

    // akhane sharmin apu kaj korben ja ja link lage add korben 
    // 🔸 Admin menu
    const adminMenu = (
        <>
            <li><Link href="/dashboard/admin">Admin Dashboard</Link></li>
            <li><Link href="/dashboard/admin/manage-users">Manage Users</Link></li>
            <li><Link href="/dashboard/admin/reports">Reports</Link></li>
        </>
    );

    // akhane mostakim vai kaj korben ja ja link lage add korben 
    // 🔸 Seller menu
    const sellerMenu = (
        <>
            <li><Link href="/dashboard/seller">Seller Dashboard</Link></li>
            <li><Link href="/dashboard/seller/products">My Products</Link></li>
            <li><Link href="/dashboard/seller/orders">Orders</Link></li>
            <li><Link href="/dashboard/addproduct">add rpoduct</Link></li>
        </>
    );

    // akhane newaz vai kaj korben ja ja link lage add korben 
    // 🔸 User menu
    const userMenu = (
        <>
            <li><Link href="/dashboard/user">User Dashboard</Link></li>
            <li><Link href="/dashboard/user/orders">My Orders</Link></li>
            <li><Link href="/dashboard/user/profile">Profile</Link></li>
        </>
    );

    // 🔸 Choose menu based on role
    let menuItems;
    if (user?.role === "admin") menuItems = adminMenu;
    else if (user?.role === "seller") menuItems = sellerMenu;
    else menuItems = userMenu;

    return (
        <div
            className={`bg-white col-span-3 h-screen p-4 border-r 
        ${openSidebar ? "block" : "hidden"} md:block`}
        >
            <h1 className="text-2xl font-bold text-primary text-center mb-6">
                Smart Shop
            </h1>

            <ul className="flex flex-col gap-3 text-gray-700 font-medium">
                {menuItems}
            </ul>
        </div>
    );
}
