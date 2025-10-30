"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch all deliveries from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/orders"); // fetch all orders
        // ✅ Filter only completed deliveries
        const completed = res.data.filter(order => order.status === "completed");
        setHistory(completed);
      } catch (error) {
        console.error("Error fetching delivery history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading delivery history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No completed delivery history found.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Delivery History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((delivery) => (
          <div
            key={delivery._id}
            className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              {delivery._id?.slice(-6).toUpperCase()}
            </p>
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {delivery.customerName || delivery.name || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {delivery.address || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Delivered At:</span>{" "}
              {delivery.deliveredAt
                ? new Date(delivery.deliveredAt).toLocaleString()
                : "Not available"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold">
                {delivery.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
