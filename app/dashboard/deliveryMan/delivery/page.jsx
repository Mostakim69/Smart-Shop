"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Truck, MapPin, User, AlertCircle, CheckCircle } from "lucide-react";

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  // 🧠 Fetch deliveries
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
            delivery._id === id ? { ...delivery, status: newStatus } : delivery
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  // 🕐 Loading Skeleton
  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="h-44 bg-gray-100 rounded-2xl border border-gray-200"
            ></div>
          ))}
      </div>
    );
  }

  // 🪶 Empty State
  if (deliveries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <Truck className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Deliveries Assigned
        </h3>
        <p className="text-gray-500">
          Once you receive deliveries, they will appear here.
        </p>
      </div>
    );
  }

  // ✅ Deliveries Grid
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Truck className="w-6 h-6 text-blue-600" />
        My Deliveries
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery, index) => (
          <motion.div
            key={delivery._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">
                Order ID:{" "}
                <span className="font-semibold text-gray-800">
                  #{delivery._id.slice(-6).toUpperCase()}
                </span>
              </p>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  delivery.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : delivery.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : delivery.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {delivery.status}
              </span>
            </div>

            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>
                  <strong>Customer:</strong>{" "}
                  {delivery.customerName || delivery.name || "Unknown"}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>
                  <strong>Address:</strong> {delivery.address || "Not provided"}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleStatusUpdate(delivery._id, "completed")}
                disabled={updating === delivery._id}
                className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:shadow-md transition disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                {updating === delivery._id ? "Updating..." : "Completed"}
              </button>

              <button
                onClick={() => handleStatusUpdate(delivery._id, "failed")}
                disabled={updating === delivery._id}
                className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:shadow-md transition disabled:opacity-50"
              >
                <AlertCircle className="w-4 h-4" />
                {updating === delivery._id ? "Updating..." : "Failed"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
