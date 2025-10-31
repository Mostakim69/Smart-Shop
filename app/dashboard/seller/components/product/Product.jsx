import React from 'react'
import { Trash2, Edit2 } from "lucide-react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';


export default function Product({ product, myProducts, setMyProducts }) {

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
                const res = await axios.delete(`https://smart-shop-server-three.vercel.app/products/${product._id}`);
                if (res.data?.deletedCount) {

                    const remaining = myProducts.filter(p => p._id !== product._id);
                    setMyProducts(remaining);

                    await Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                }
            } catch (err) {
                alert("Error: ", err.message);
            }
        }
    };


    return (
        <tr>
            <td className="px-4 py-2">
                <img src={product?.image} className="h-12 w-12 rounded object-cover" />
            </td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">${product.price}</td>
            <td className="px-4 py-2">{product.category}</td>
            <td className="px-4 py-2 flex justify-center gap-2">
                <Link
                    href={`/dashboard/seller/edit/${product._id}`}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                >
                    <Edit2 size={16} /> Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="btn btn-sm btn-error flex items-center gap-1"
                >
                    <Trash2 size={16} /> Delete
                </button>
            </td>
        </tr>
    )
}
