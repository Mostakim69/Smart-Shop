import React from "react";
import {
  ShoppingBagIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import OverviewChart from "./overviewchart";

export default function DashboardPage() {
  const stats = [
    {
      title: "Today Orders",
      value: "$897.40",
      color: "bg-green-500",
      icon: <ShoppingBagIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "Yesterday Orders",
      value: "$679.93",
      color: "bg-orange-400",
      icon: <ShoppingBagIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "This Month",
      value: "$13146.96",
      color: "bg-blue-500",
      icon: <ArrowPathIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "Last Month",
      value: "$31964.92",
      color: "bg-cyan-600",
      icon: <CalendarDaysIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "All-Time Sales",
      value: "$626513.05",
      color: "bg-green-600",
      icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
    },
  ];

  const orders = [
    { title: "Total Orders", value: 815, color: "text-orange-600" },
    { title: "Orders Pending", value: 263, color: "text-green-500" },
    { title: "Orders Processing", value: 97, color: "text-blue-400" },
    { title: "Orders Delivered", value: 418, color: "text-green-600" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Dashboard Overview</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.color} rounded-lg p-4 text-white flex flex-col items-center shadow-lg`}
          >
            <div className="mb-2">{item.icon}</div>
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orders.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <OverviewChart />
    </div>
  );
}
