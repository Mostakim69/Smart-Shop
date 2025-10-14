"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Edit2 } from "lucide-react";
import Swal from "sweetalert2";

export default function MyProductsPage() {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://smart-shop-server-three.vercel.app/products?sellerEmail=${user.email}`)
        .then((res) => {
          setMyProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // prodcut delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://smart-shop-server-three.vercel.app/products/${id}`);
          setMyProducts(myProducts.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Product deleted successfully.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading your products...</p>;
  }

  if (!myProducts.length) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-600">
          You haven’t added any products yet!
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-primary mb-4">My Products</h1>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Product Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={product.image || "https://via.placeholder.com/60"}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 text-primary font-semibold">${product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
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
    </div>
  );
}
