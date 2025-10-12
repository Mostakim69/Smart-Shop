"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartClient({ orderData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={orderData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
        <YAxis tick={{ fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
