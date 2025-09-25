"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { motion, useAnimation } from "framer-motion";
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

  // Custom Hook for Count Animation
  const useCountUp = (target, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target);
      if (start === end) return;

      let incrementTime = 15; // ms
      let step = (end / (duration / incrementTime));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, incrementTime);

      return () => clearInterval(timer);
    }, [target, duration]);

    return count;
  };

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Overview
      </motion.h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className={`${item.color} rounded-2xl p-5 text-white flex flex-col items-center shadow-lg`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-3">{item.icon}</div>
            <h2 className="text-sm font-medium opacity-80">{item.title}</h2>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Orders Section with Count Animation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orders.map((item, index) => {
          const count = useCountUp(item.value, 2000);
          return (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <h2 className="text-sm font-medium text-gray-500">
                {item.title}
              </h2>
              <p className={`text-3xl font-bold mt-2 ${item.color}`}>
                {count}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <OverviewChart />
      </motion.div>
    </div>
  );
}
