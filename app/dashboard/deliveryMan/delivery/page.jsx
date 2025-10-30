"use client";

import React, { useEffect, useState } from "react";

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dummy data
  const dummyData = [
    {
      _id: "1",
      orderId: "ORD001",
      customerName: "John Doe",
      address: "123 Main Street, Dhaka",
      status: "pending",
    },
    {
      _id: "2",
      orderId: "ORD002",
      customerName: "Jane Smith",
      address: "45 Park Road, Chittagong",
      status: "completed",
    },
    {
      _id: "3",
      orderId: "ORD003",
      customerName: "Ali Khan",
      address: "67 Lake Avenue, Sylhet",
      status: "pending",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    const timer = setTimeout(() => {
      setDeliveries(dummyData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              <span className="font-semibold">Order ID:</span> {delivery.orderId}
            </p>
            <p>
              <span className="font-semibold">Customer:</span> {delivery.customerName}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {delivery.address}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  delivery.status === "pending"
                    ? "text-yellow-600"
                    : delivery.status === "completed"
                    ? "text-green-600"
                    : "text-gray-600"
                } font-semibold`}
              >
                {delivery.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
