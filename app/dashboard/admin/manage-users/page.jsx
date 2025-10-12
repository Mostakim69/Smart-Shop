import React from "react";
import axios from "axios";

export default async function ManageUsers() {
  let users = [];

  try {
    const res = await axios.get("https://smart-shop-server-three.vercel.app/users");
    users = res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name || "N/A"}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2">
                    Delete
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
