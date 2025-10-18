"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

export default function OrdersPage() {
  // ✅ Dummy orders data
  const [orders, setOrders] = useState([
    {
      _id: "ORD12345",
      productName: "Wireless Headphones",
      buyerName: "John Doe",
      quantity: 2,
      status: "pending",
    },
    {
      _id: "ORD12346",
      productName: "Smartwatch",
      buyerName: "Jane Smith",
      quantity: 1,
      status: "shipped",
    },
    {
      _id: "ORD12347",
      productName: "Gaming Mouse",
      buyerName: "Mike Johnson",
      quantity: 3,
      status: "delivered",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // 🔄 Update order status
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    Swal.fire("Updated!", `Order marked as ${newStatus}`, "success");
  };

  // ❌ Cancel order
  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be canceled permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter((order) => order._id !== orderId));
        Swal.fire("Canceled!", "Order canceled successfully.", "success");
      }
    });
  };

  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-500">Loading your orders...</p>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No orders yet for your products.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Product Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Order ID:</span>
              <span>{order._id}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Product:</span>
              <span>{order.productName}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Buyer:</span>
              <span>{order.buyerName}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Quantity:</span>
              <span>{order.quantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {order.status !== "shipped" && (
                <button
                  onClick={() => handleStatusChange(order._id, "shipped")}
                  className="flex-1 bg-blue-100 text-blue-700 py-1 rounded hover:bg-blue-200 transition"
                >
                  Mark Shipped
                </button>
              )}
              {order.status !== "delivered" && (
                <button
                  onClick={() => handleStatusChange(order._id, "delivered")}
                  className="flex-1 bg-green-100 text-green-700 py-1 rounded hover:bg-green-200 transition"
                >
                  Mark Delivered
                </button>
              )}
              <button
                onClick={() => handleCancel(order._id)}
                className="flex-1 bg-red-100 text-red-700 py-1 rounded hover:bg-red-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
