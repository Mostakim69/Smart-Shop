import React from "react";
import axios from "axios";
import UserRow from "../components/UserRow";

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
        <table className="min-w-full bg-white dark:bg-gray-800  rounded-xl">
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
            {users?.map((user, index) => (
              <UserRow key={index} user={user} index={index}></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
