"use client";
import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";

export default function ManageProducts() {
  const [search, setSearch] = useState("");
  
  // Demo data (later you can fetch from backend)
  const products = [
    { id: 1, image: "/images/product1.jpg", name: "iPhone 15", price: "$999", category: "Mobile", status: "Available" },
    { id: 2, image: "/images/product2.jpg", name: "MacBook Air M3", price: "$1299", category: "Laptop", status: "Out of Stock" },
    { id: 3, image: "/images/product3.jpg", name: "Sony Headphones", price: "$199", category: "Accessories", status: "Available" },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
        {/* Search */}
        <div className="relative mt-3 md:mt-0">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">{p.name}</td>
                  <td className="px-6 py-3">{p.price}</td>
                  <td className="px-6 py-3">{p.category}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        p.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition cursor-pointer">
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
