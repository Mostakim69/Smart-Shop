
"use client";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function OrderSummary() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#3182CE", "#38A169", "#E53E3E", "#D69E2E"]; // Blue, Green, Red, Yellow

  useEffect(() => {
    setLoading(true);

    // 🔹 Dummy data, replace with API fetch
    // fetch("https://your-server.com/orders-summary")
    //   .then(res => res.json())
    //   .then(data => setOrdersData(data))
    //   .finally(() => setLoading(false));

    const dummyData = [
      { status: "Completed", value: 45 },
      { status: "Pending", value: 25 },
      { status: "Cancelled", value: 15 },
    //   { status: "Processing", value: 10 },
    ];

    setOrdersData(dummyData);
    setLoading(false);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Orders Summary</h2>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading chart...</div>
      ) : ordersData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ordersData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {ordersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-20 text-gray-500">No orders data found.</div>
      )}
    </div>
  );
}
