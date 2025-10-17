"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  HeartIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import ChartClient from "./ChartClient";
import { useAuth } from "@/context/AuthContext";

function CardItem({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        //  Fetch cart items
        const cartRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cartItems/${user.email}`);
        const cartData = await cartRes.json();
        const cartCount = Array.isArray(cartData) ? cartData.length : 0;

        //  Fetch orders
        const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${user.email}`);
        const ordersData = await ordersRes.json();
        const totalOrders = Array.isArray(ordersData) ? ordersData.length : 0;
        const pendingOrders = ordersData.filter(o => o.status === "Pending").length;
        const deliveredOrders = ordersData.filter(o => o.status === "Delivered").length;
        const cancelledOrders = ordersData.filter(o => o.status === "Cancelled").length;

        //  Update stats dynamically
        setStats([
          { title: "My Orders", value: totalOrders, icon: ShoppingBagIcon, color: "bg-blue-100 text-blue-600" },
          { title: "Pending Orders", value: pendingOrders, icon: ClockIcon, color: "bg-yellow-100 text-yellow-600" },
          { title: "Delivered Orders", value: deliveredOrders, icon: TruckIcon, color: "bg-green-100 text-green-600" },
          { title: "Cancelled Orders", value: cancelledOrders, icon: XCircleIcon, color: "bg-red-100 text-red-600" },
          { title: "Wishlist Items", value: 5, icon: HeartIcon, color: "bg-pink-100 text-pink-600" }, // can make dynamic later
          { title: "Cart Items", value: cartCount, icon: ShoppingCartIcon, color: "bg-indigo-100 text-indigo-600" },
          { title: "Total Spent", value: `$${ordersData.reduce((sum, o) => sum + (o.totalAmount || 0), 0)}`, icon: BanknotesIcon, color: "bg-teal-100 text-teal-600" },
          { title: "Pending Reviews", value: 3, icon: StarIcon, color: "bg-orange-100 text-orange-600" }, // can make dynamic later
        ]);

        //  Prepare chart data dynamically (orders per day)
        const chartData = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => {
          const ordersOnDay = ordersData.filter(
            o => new Date(o.orderDate).toLocaleDateString("en-US", { weekday: "short" }) === day
          );
          return { name: day, orders: ordersOnDay.length };
        });

        setOrders(chartData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user?.email]);

  if (!user) return <p className="text-center py-20 text-gray-500">Please login to view dashboard</p>;
  if (loading) return <p className="text-center py-20 text-gray-500">Loading your dashboard...</p>;

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-gray-500">Welcome, <span className="font-medium">{user.email}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, i) => <CardItem key={i} {...stat} />)}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Order Summary</h2>
        <ChartClient orderData={orders} />
      </div>
    </>
  );
}
