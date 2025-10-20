"use client";

import React, { useState, useEffect } from "react";

export default function ManageOrders() {
  // Dummy data (replace later with API fetch)
  const [orders, setOrders] = useState([
    {
      _id: "1",
      customer: "John Doe",
      email: "john@example.com",
      product: "iPhone 15",
      quantity: 2,
      total: 2000,
      status: "Pending",
      payment: "Paid",
    },
    {
      _id: "2",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "MacBook Pro",
      quantity: 1,
      total: 2500,
      status: "Shipped",
      payment: "Unpaid",
    },
  ]);

  // Status update handler
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
    // Later: call backend API to update status in DB
    console.log(`Order ${id} status changed to ${newStatus}`);
  };

  // Delete handler
  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id));
    // Later: call backend API to delete
    console.log(`Order ${id} deleted`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">${order.total}</td>
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
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
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
