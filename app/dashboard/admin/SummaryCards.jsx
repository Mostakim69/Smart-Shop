"use client";
import React, { useEffect, useState } from "react";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

export default function SummaryCards() {
  const [data, setData] = useState({
    users: [],
    orders: [],
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = "https://smart-shop-server-three.vercel.app";

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🔹 একসাথে ৩টা API call
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch(`${base}/users`),
          fetch(`${base}/orders`),
          fetch(`${base}/products`),
        ]);

        // 🔹 যদি কোনো API fail করে
        if (!usersRes.ok || !ordersRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data from one or more APIs");
        }

        // 🔹 সব data একসাথে JSON এ convert
        const [users, orders, products] = await Promise.all([
          usersRes.json(),
          ordersRes.json(),
          productsRes.json(),
        ]);

        setData({ users, orders, products });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ✅ Derived values
  const totalUsers = data.users.length;
  const totalSellers = data.users.filter((u) => u.role === "seller").length;
  const totalOrders = data.orders.length;
  const totalProducts = data.products.length;

  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      gradient: "from-blue-100 to-blue-50",
      text: "text-blue-700",
    },
    {
      id: 2,
      title: "Total Sellers",
      value: totalSellers,
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      gradient: "from-purple-100 to-purple-50",
      text: "text-purple-700",
    },
    {
      id: 3,
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-green-600" />,
      gradient: "from-green-100 to-green-50",
      text: "text-green-700",
    },
    {
      id: 4,
      title: "Total Products",
      value: totalProducts,
      icon: <Package className="w-6 h-6 text-orange-600" />,
      gradient: "from-orange-100 to-orange-50",
      text: "text-orange-700",
    },
  ];

  // ✅ UI Part
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow animate-pulse bg-gradient-to-r from-gray-100 to-gray-50"
          >
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl shadow bg-red-50 text-red-700 col-span-4">
        <p className="font-medium">Error loading stats</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${stat.text}`}>{stat.title}</h3>
            <div className="p-3 rounded-xl flex items-center justify-center bg-white shadow-inner">
              {stat.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold ${stat.text}`}>{stat.value}</p>
          <p className="text-xs mt-2 opacity-80">quick overview</p>
        </div>
      ))}
    </div>
  );
}
