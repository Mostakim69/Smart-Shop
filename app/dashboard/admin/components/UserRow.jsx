"use client"
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function UserRow({ user, index, }) {

    const router = useRouter();
    // comment for deploy

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://smart-shop-server-three.vercel.app/users/${user._id}`)
                    .then(res => {
                        if (res.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
                router.refresh();
            }
        });
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
