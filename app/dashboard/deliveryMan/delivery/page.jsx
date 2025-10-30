"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // track which order is updating

  // 🧠 Fetch all deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/orders");
        setDeliveries(res.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // 🔁 Update delivery status
  const handleStatusUpdate = async (id, newStatus) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to mark this order as "${newStatus}"?`
    );
    if (!confirmUpdate) return;

    try {
      setUpdating(id);
      const res = await axios.patch(`http://localhost:5000/orders/${id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        setDeliveries((prev) =>
          prev.map((delivery) =>
            delivery._id === id
              ? { ...delivery, status: newStatus }
              : delivery
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading your deliveries...</p>
      </div>
    );
  }

  if (deliveries.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No deliveries assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">My Deliveries</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery._id}
            className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              {delivery._id.slice(-6).toUpperCase()}
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
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  delivery.status === "pending"
                    ? "text-yellow-600"
                    : delivery.status === "completed"
                    ? "text-green-600"
                    : delivery.status === "failed"
                    ? "text-red-600"
                    : "text-gray-600"
                } font-semibold`}
              >
                {delivery.status}
              </span>
            </p>

            {/* ✅ Always show both buttons */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  handleStatusUpdate(delivery._id, "completed")
                }
                disabled={updating === delivery._id}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-50"
              >
                {updating === delivery._id
                  ? "Updating..."
                  : "Mark as Completed"}
              </button>

              <button
                onClick={() => handleStatusUpdate(delivery._id, "failed")}
                disabled={updating === delivery._id}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
              >
                {updating === delivery._id
                  ? "Updating..."
                  : "Mark as Failed"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
