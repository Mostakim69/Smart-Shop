"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UserRow({ user, index }) {
  const router = useRouter();

  const handleRoleChange = async (newRole) => {
    console.log(newRole);

    try {
      const res = await axios.patch(`https://smart-shop-server-three.vercel.app/users/${user._id}`, {
        role: newRole
      });

      if (res.data?.modifiedCount) {
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
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://smart-shop-server-three.vercel.app/users/${user._id}`
        );

        if (res.data?.deletedCount) {
          await Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });

          router.refresh();
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
      <td className="px-4 py-2">
  <div className="flex flex-wrap gap-2">
    {user.role !== "admin" && (
      <button
        onClick={() => handleRoleChange("admin")}
        className="w-[80px] text-center border border-blue-400 bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-500 hover:text-white transition cursor-pointer"
      >
        Admin
      </button>
    )}
    {user.role !== "seller" && (
      <button
        onClick={() => handleRoleChange("seller")}
        className="w-[80px] text-center border border-green-400 bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-500 hover:text-white transition cursor-pointer"
      >
        Seller
      </button>
    )}
    {user.role !== "user" && (
      <button
        onClick={() => handleRoleChange("user")}
        className="w-[80px] text-center border border-gray-400 bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-500 hover:text-white transition cursor-pointer"
      >
        User
      </button>
    )}
    {user.role !== "deliveryMan" && (
      <button
        onClick={() => handleRoleChange("deliveryMan")}
        className="w-[80px] text-center border border-orange-400 bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition cursor-pointer"
      >
        Delivery Man
      </button>
    )}
    <button
      onClick={handleDelete}
      className="w-[80px] text-center border border-red-400 bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition cursor-pointer"
    >
      Delete
    </button>
  </div>
</td>

    </tr>
  );
}
