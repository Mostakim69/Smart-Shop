"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

export default function ManageOrder({ order, index }) {

    const router = useRouter();

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
                    `https://smart-shop-server-three.vercel.app/orders/${order._id}`
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
            <td className="px-4 py-2">{order.name || "no name"}</td>
            <td className="px-4 py-2">{order.email}</td>
            <td className="px-4 py-2">{order.items?.length}</td>
            <td className="px-4 py-2">${order.totalAmount}</td>
            <td className="px-4 py-2">
                <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                </select>
            </td>
            <td className="px-4 py-2">{order.payment}</td>
            <td className="px-4 py-2 space-x-2">
                <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
