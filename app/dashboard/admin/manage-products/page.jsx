import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import SearchAndFilter from "./SearchAndFilter";

export default async function ManageProducts() {
  let products = [];

  try {
    const res = await axios.get("https://smart-shop-server-three.vercel.app/products");
    products = res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h2>

      {/* Search & Filter */}
      <SearchAndFilter products={products} />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800 cursor-pointer">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
