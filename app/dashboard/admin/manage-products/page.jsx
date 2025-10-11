"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filtered products
  let filteredProducts = products;

  // Search filter
  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category filter
  if (categoryFilter && categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === categoryFilter
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home & Living</option>
          <option value="fitness">Workout & Fitness</option>
          <option value="toys">Gift & Toys</option>
        </select>
      </div>
      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td className="flex justify-center">
                  <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700 capitalize">
                    {product.category}
                  </td>
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
