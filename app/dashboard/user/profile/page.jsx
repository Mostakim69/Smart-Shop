"use client";
import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const user = {
    name: "Mohammad Shahnowaz",
    email: "newaz2580@gmail.com",
    phone: "+880 1234 567890",
    address: "Dhaka, Bangladesh",
    joined: "Jan 15, 2025",
    role: "User",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto hover:shadow-xl transition">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">
            MS
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-400 text-sm">{user.role} | Joined {user.joined}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition">
            <PencilIcon className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
