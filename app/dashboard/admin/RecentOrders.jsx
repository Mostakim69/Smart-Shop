"use client";
import React, { useEffect, useState } from "react";

export default function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // change the URL to your actual server endpoint
    fetch("https://your-server-url.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setRecentOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Orders
      </h2>

      {/* 🔹 Loading state */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                   Customer Name
                </th> */}
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                   Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentOrders?.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">
                      {order._id?.slice(-6)}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      ৳{order.amount?.toLocaleString("en-BD")}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        order.status === "Completed"
                          ? "text-green-500"
                          : order.status === "Pending"
                          ? "text-yellow-500"
                          : order.status === "Cancelled"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-BD")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
