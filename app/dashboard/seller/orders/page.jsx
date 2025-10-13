"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function OrdersPage() {
  const { user } = useAuth(); // logged-in seller
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch seller-specific orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://smart-shop-server-three.vercel.app/api/orders?sellerEmail=${user.email}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  // 🔄 Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `https://smart-shop-server-three.vercel.app/api/orders/${orderId}`,
        { status: newStatus }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      Swal.fire("Updated!", `Order marked as ${newStatus}`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  // ❌ Cancel order
  const handleCancel = async (orderId) => {
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
            `https://smart-shop-server-three.vercel.app/api/orders/${orderId}`
          );
          setOrders(orders.filter((order) => order._id !== orderId));
          Swal.fire("Canceled!", "Order canceled successfully.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong!", "error");
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
        <h2 className="text-xl font-semibold text-gray-600">
          No orders yet for your products.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Product Orders</h1>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                Product Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                Buyer
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2 font-medium">{order.productName}</td>
                <td className="px-4 py-2">{order.buyerName}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">
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
                </td>
                <td className="px-4 py-2 flex flex-wrap justify-center gap-2">
                  {order.status !== "shipped" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order._id, "shipped")
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Mark Shipped
                    </button>
                  )}
                  {order.status !== "delivered" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order._id, "delivered")
                      }
                      className="text-green-500 hover:underline"
                    >
                      Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="text-red-500 hover:underline"
                  >
                    Cancel
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
