"use client";
import React, { useEffect, useState } from "react";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

export default function SummaryCards() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch Users
    fetch("https://smart-shop-server-three.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch Orders
    fetch("https://smart-shop-server-three.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));

    // Fetch Products
    fetch("https://smart-shop-server-three.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const totalUsers = users.length;
  const totalSellers = users.filter((user) => user.role === "seller").length;
  const totalOrders = orders.length;
  const totalProducts = products.length;

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${stat.text}`}>{stat.title}</h3>
            <div
              className={`p-3 rounded-xl flex items-center justify-center bg-white shadow-inner`}
            >
              {stat.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold ${stat.text}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
