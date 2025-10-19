"use client";

import { useRouter } from "next/navigation"; // ✅ এটা যোগ করো
import { Trash2, Edit2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function MyProductsPage() {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ router ব্যবহার

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

  // ✅ handleEdit ফাংশন
  const handleEdit = (id) => {
    router.push(`/dashboard/seller/edit/${id}`);
  };

  // ✅ delete logic same থাকবে
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

  // ...
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-primary mb-4">My Products</h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2">
                  <img src={product.image} className="h-12 w-12 rounded object-cover" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                  >
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
