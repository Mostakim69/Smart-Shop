"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  BarChart3,
  MapPin,
  User,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch deliveries and issues
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch deliveries
        const deliveriesRes = await axios.get("http://localhost:5000/orders");
        setDeliveries(deliveriesRes.data);

        // fetch support issues
        const issuesRes = await axios.get("http://localhost:5000/issue");
        const sortedIssues = issuesRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3); // last 3 issues
        setIssues(sortedIssues);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🧮 Delivery status breakdown
  const totalDeliveries = deliveries.length;
  const completedDeliveries = deliveries.filter(
    (d) => d.status === "completed"
  );
  const pendingDeliveries = deliveries.filter((d) => d.status === "pending");
  const failedDeliveries = deliveries.filter((d) => d.status === "failed");
  const inProgressDeliveries = deliveries.filter(
    (d) => d.status === "in-progress"
  );

  const stats = [
    {
      label: "Total Deliveries",
      value: totalDeliveries,
      icon: <Truck className="w-5 h-5 text-white" />,
      bg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    },
    {
      label: "Completed",
      value: completedDeliveries.length,
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      bg: "bg-gradient-to-tr from-green-400 to-green-600",
    },
    {
      label: "Pending",
      value: pendingDeliveries.length,
      icon: <Clock className="w-5 h-5 text-white" />,
      bg: "bg-gradient-to-tr from-yellow-400 to-yellow-500",
    },
    {
      label: "In Progress",
      value: inProgressDeliveries.length,
      icon: <Package className="w-5 h-5 text-white" />,
      bg: "bg-gradient-to-tr from-purple-500 to-purple-600",
    },
    {
      label: "Failed",
      value: failedDeliveries.length,
      icon: <XCircle className="w-5 h-5 text-white" />,
      bg: "bg-gradient-to-tr from-red-400 to-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-2xl border border-gray-200"
            ></div>
          ))}
      </div>
    );
  }

  // 🧾 Show only 3 recent orders
  const recentOrders = deliveries
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg transform transition hover:scale-105`}
          >
            <div
              className={`p-3 rounded-full mb-2 ${item.bg} flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
            <p className="text-sm font-semibold text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 📈 Delivery Status Chart */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Delivery Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Pending", value: pendingDeliveries.length },
              { name: "In Progress", value: inProgressDeliveries.length },
              { name: "Completed", value: completedDeliveries.length },
              { name: "Failed", value: failedDeliveries.length },
            ]}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#4b5563" }} />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              <Cell fill="#facc15" />
              <Cell fill="#7c3aed" />
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🧾 Recent Orders Section */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Deliveries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-gradient-to-br from-white to-indigo-50"
            >
              <p className="text-sm text-gray-500 mb-2">
                Order ID:{" "}
                <span className="font-semibold text-gray-700">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 mb-1">
                <User className="w-4 h-4 text-indigo-600" />
                {order.customerName || order.name || "Unknown"}
              </p>
              <p className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4 text-red-500" />
                {order.address || "Not provided"}
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  order.status === "completed"
                    ? "text-green-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "failed"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 Last 3 Support Issues */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Last 3 Support Issues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-gradient-to-br from-white to-pink-50"
            >
              <p className="text-sm text-gray-500 mb-2">
                Name: <span className="font-semibold text-gray-700">{issue.name}</span>
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Email: <span className="font-semibold text-gray-700">{issue.email}</span>
              </p>
              <p className="text-gray-700 mb-2">{issue.message}</p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  issue.status === "Pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Status: {issue.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
