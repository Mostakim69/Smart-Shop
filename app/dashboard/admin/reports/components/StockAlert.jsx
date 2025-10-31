"use client";
import React, { useState } from "react";

export default function StockAlert() {
  // Dummy data
  const [alerts] = useState([
    { _id: "1", name: "Product A", stock: 5, alert: "Low Stock" },
    { _id: "2", name: "Product B", stock: 8, alert: "Low Stock" },
    { _id: "3", name: "Product C", stock: 55, alert: "Over Stock" },
    { _id: "4", name: "Product D", stock: 60, alert: "Over Stock" },
    { _id: "5", name: "Product E", stock: 3, alert: "Low Stock" },
  ]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Stock Alerts</h2>
      <table className="min-w-full text-gray-600 text-sm">
        <thead className="text-left bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Alert</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((p, index) => (
            <tr key={p._id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 font-medium">{p.name}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  p.alert === "Low Stock" ? "text-red-600" : "text-yellow-600"
                }`}
              >
                {p.alert}
              </td>
              <td className="px-4 py-2">
                <button
                  className="px-3 py-1 border border-blue-400 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-blue-100 rounded transition cursor-pointer"
                  onClick={() => alert(`Notify seller about ${p.name}`)}
                >

                  Notify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
