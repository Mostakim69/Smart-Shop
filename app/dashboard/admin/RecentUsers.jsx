"use client";
import React, { useEffect, useState } from "react";

export default function RecentUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend theke latest 6 users fetch koro
     fetch("https://smart-shop-server-three.vercel.app/users")

      .then((res) => res.json())
      .then((data) => {
        setUsers(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recent users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow mb-10 text-center text-gray-500">
        Loading recent users...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Users</h2>
      <ul className="divide-y divide-gray-100">
        {users.map((user) => (
          <li
            key={user.id}
            className="py-3 flex justify-between items-center hover:bg-gray-50 transition px-2 rounded-lg"
          >
            <div>
              <p className="text-gray-800 font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">Joined {user.joined}</p>
            </div>
            <span
              className={`font-semibold ${
                user.status === "Active" ? "text-green-600" : "text-gray-400"
              }`}
            >
              {user.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
