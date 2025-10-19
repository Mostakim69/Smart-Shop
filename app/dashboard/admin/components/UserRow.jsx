"use client"
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function UserRow({ user, index }) {
    const router = useRouter();

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
        <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{user.name || "N/A"}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2 capitalize">{user.role}</td>
            <td className="px-4 py-2">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded mr-2"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
