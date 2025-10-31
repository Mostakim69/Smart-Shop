"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Truck, MapPin, User, Calendar, Package } from "lucide-react";

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch all deliveries from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/orders");
        const completed = res.data.filter((order) => order.status === "completed");
        setHistory(completed);
      } catch (error) {
        console.error("Error fetching delivery history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // 🕐 Loading State (Skeleton)
  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 rounded-2xl shadow-sm border border-gray-200"
            ></div>
          ))}
      </div>
    );
  }

  // 🪶 Empty State
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <Truck className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Completed Deliveries Yet
        </h3>
        <p className="text-gray-500">Once you complete a delivery, it will appear here.</p>
      </div>
    );
  }

  // ✅ Delivery History Cards
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Package className="w-6 h-6 text-blue-600" />
        Delivery History
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((delivery, index) => (
          <motion.div
            key={delivery._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">
                Order ID:{" "}
                <span className="font-semibold text-gray-800">
                  #{delivery._id?.slice(-6).toUpperCase()}
                </span>
              </p>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
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

              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>
                  <strong>Delivered At:</strong>{" "}
                  {delivery.deliveredAt
                    ? new Date(delivery.deliveredAt).toLocaleString()
                    : "Not available"}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
