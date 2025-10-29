"use client";
import React, { useEffect, useState } from "react";

export default function RecentUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://smart-shop-server-three.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recent users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Users
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading recent users...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="hover:bg-gray-50 transition duration-150 border-t"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">{user.email || "N/A"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {user.role || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No recent users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
