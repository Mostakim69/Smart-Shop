"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductRow({ product }) {
  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  // Delete handler
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://smart-shop-server-three.vercel.app/products/${product._id}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Product deleted.", "success");
            router.refresh();
          }
        } catch (err) {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };
  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://smart-shop-server-three.vercel.app/products/${product._id}`,
        editedProduct
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Product updated.", "success");
        setOpenEditModal(false);
        location.reload(); 
      }
    } catch (err) {
      Swal.fire("Error!", "Update failed.", "error");
    }
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-contain rounded"
          />
        </td>
        <td className="px-6 py-4">{product.name}</td>
        <td className="px-6 py-4 capitalize">{product.category}</td>
        <td className="px-6 py-4">${product.price}</td>
        {/* <td className="px-6 py-4">{product.stock}</td> */}
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setOpenEditModal(true)}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                value={editedProduct.name}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Name"
              />
              <input
                name="category"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Category"
              />
              <input
                name="price"
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Price"
              />
              <input
                name="stock"
                type="number"
                value={editedProduct.stock}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, stock: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Stock"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenEditModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
