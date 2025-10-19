"use client"
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function UserRow({ user, index }) {
    const router = useRouter();

const handleRoleChange = async (newRole) => {
  try {
    const res = await axios.patch(
      `https://smart-shop-server-three.vercel.app/users/role/${user._id}`,
      { role: newRole }
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: `${user.name} is now ${newRole}`,
        showConfirmButton: false,
        timer: 1200,
      });
      router.refresh();
    } else {
      Swal.fire({
        icon: "info",
        title: "No changes made",
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed to update role",
      text: err.message,
    });
  }
};


    const handleDelete = async () => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {

                const res = await axios.delete(`https://smart-shop-server-three.vercel.app/users/${user._id}`);

                if (res.data?.deletedCount) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });

                    router.refresh();
                }
            } catch (err) {
                alert("Error: " + err.message);
            }
        }
    };

    return (
         <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
       <td className="px-4 py-2 space-x-2">
        {/* conditional role buttons */}
        {user.role !== "admin" && (
          <button
            onClick={() => handleRoleChange("admin")}
            className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            Admin
          </button>
        )}
        {user.role !== "seller" && (
          <button
            onClick={() => handleRoleChange("seller")}
            className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            Seller
          </button>
        )}
        {user.role !== "user" && (
          <button
            onClick={() => handleRoleChange("user")}
            className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            User
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
    );
}
