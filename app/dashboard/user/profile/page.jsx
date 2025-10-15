"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${user.email}`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [user?.email]);

  // ✏️ Start editing
  const handleEditClick = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  // ❌ Cancel editing
  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  // ✅ Save edited data
  const handleSave = async (field) => {
    if (!userData) return;

    try {
      const updatedUser = { ...userData, [field]: tempValue };

      const res = await fetch(`http://localhost:5000/users/${userData.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setUserData(updatedUser);
      setEditingField(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  if (!userData) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto hover:shadow-xl transition">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 shadow-md">
            <img
              src={userData.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {editingField === "photo" ? (
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="Enter image URL"
                className="border rounded-lg px-2 py-1 text-sm"
              />
              <button
                onClick={() => handleSave("photo")}
                className="text-green-600"
              >
                <CheckIcon className="w-5 h-5" />
              </button>
              <button onClick={handleCancel} className="text-red-500">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEditClick("photo", userData.photo || "")}
              className="flex items-center gap-1 text-sky-600 mt-3 text-sm hover:underline"
            >
              <PencilIcon className="w-4 h-4" /> Change Photo
            </button>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{userData.email}</p>
          </div>

          {/* Name */}
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            {editingField === "name" ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm"
                />
                <button
                  onClick={() => handleSave("name")}
                  className="text-green-600"
                >
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={handleCancel} className="text-red-500">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="font-semibold">{userData.name}</p>
                <button
                  onClick={() => handleEditClick("name", userData.name)}
                  className="text-sky-600 hover:underline text-sm flex items-center gap-1"
                >
                  <PencilIcon className="w-4 h-4" /> Edit
                </button>
              </div>
            )}
          </div>

          {/* Role */}
          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-semibold capitalize">{userData.role}</p>
          </div>

          {/* Joined Date */}
          <div>
            <p className="text-gray-500 text-sm">Joined</p>
            <p className="font-semibold">
              {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
