"use client"
import React from 'react';
import axios from 'axios';

export default function UserRow({ user, index, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (!confirmDelete) return;

    try {
      // Backend API DELETE request using _id
      await axios.delete(`/api/users/${user._id}`);

      // Parent কে জানানো যাতে UI update হয়
      onDelete(user._id);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{user.name || "N/A"}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
      <td className="px-4 py-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2"
        >
          Delete
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
          Edit
        </button>
      </td>
    </tr>
  );
}
