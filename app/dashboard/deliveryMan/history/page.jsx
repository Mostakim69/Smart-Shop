"use client";

import React, { useEffect, useState } from "react";

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dummy data
  const dummyData = [
    {
      _id: "1",
      orderId: "ORD002",
      customerName: "Jane Smith",
      address: "45 Park Road, Chittagong",
      status: "completed",
      deliveredAt: "2025-10-28 14:30",
    },
    {
      _id: "2",
      orderId: "ORD005",
      customerName: "Sadia Rahman",
      address: "88 Green Street, Dhaka",
      status: "completed",
      deliveredAt: "2025-10-27 11:15",
    },
    {
      _id: "3",
      orderId: "ORD007",
      customerName: "Imran Hossain",
      address: "12 Lake Road, Khulna",
      status: "completed",
      deliveredAt: "2025-10-26 16:45",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    const timer = setTimeout(() => {
      setHistory(dummyData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
        <p className="text-gray-500">No delivery history found.</p>
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
              <span className="font-semibold">Order ID:</span> {delivery.orderId}
            </p>
            <p>
              <span className="font-semibold">Customer:</span> {delivery.customerName}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {delivery.address}
            </p>
            <p>
              <span className="font-semibold">Delivered At:</span> {delivery.deliveredAt}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold">{delivery.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
