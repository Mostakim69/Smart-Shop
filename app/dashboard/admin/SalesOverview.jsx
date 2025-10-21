"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesOverview() {
  const salesData = [
    { day: "Mon", sales: 120 },
    { day: "Tue", sales: 200 },
    { day: "Wed", sales: 150 },
    { day: "Thu", sales: 80 },
    { day: "Fri", sales: 170 },
    { day: "Sat", sales: 90 },
    { day: "Sun", sales: 130 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Sales Overview
        </h2>
        <BarChart3 className="text-blue-600" />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Last 7 days sales performance in BDT. Helps track trends and identify
        peak days.
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
