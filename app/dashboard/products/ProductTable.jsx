"use client";

import React, { useState } from "react";
import axios from "axios";
import { Trash2, Edit2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ProductTable({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  // 🗑️ Delete Function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://smart-shop-server-three.vercel.app/products/${id}`);
          setProducts(products.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (!products.length) {
    return <p className="text-center text-secondary">No products available.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                <img
                  src={product.image || "https://via.placeholder.com/60"}
                  alt={product.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 font-semibold text-primary">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.seller}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button className="btn btn-sm btn-warning flex items-center gap-1">
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-sm btn-error flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
