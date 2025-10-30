"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // ✅ current logged-in user

  console.log(orders);
  

  // 🔄 Fetch orders from backend
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/orders/seller/${user.email}`
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to load your orders", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // ✅ Update status (optional - you can later connect this to backend)
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    Swal.fire("Updated!", `Order marked as ${newStatus}`, "success");
  };

  // ✅ Cancel order (frontend only; you can later connect backend DELETE)
  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be canceled permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://smart-shop-server-three.vercel.app/orders/${orderId}`
          );
          setOrders(orders.filter((order) => order._id !== orderId));
          Swal.fire("Canceled!", "Order canceled successfully.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to cancel order", "error");
        }
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
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

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
              <span className="font-semibold">Customer:</span>
              <span>{order.name}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Total:</span>
              <span>৳ {order.totalAmount}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Date:</span>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
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
                {order.status || "pending"}
              </span>
            </div>

            {/* ✅ Actions */}
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
