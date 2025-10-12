
import React from "react";
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


async function getDashboardStats() {
  
  return {
    stats: [
      { title: "Total Orders", value: "12", icon: ShoppingBagIcon, color: "bg-blue-100 text-blue-600" },
      { title: "Pending Orders", value: "3", icon: ClockIcon, color: "bg-yellow-100 text-yellow-600" },
      { title: "Delivered Orders", value: "8", icon: TruckIcon, color: "bg-green-100 text-green-600" },
      { title: "Cancelled Orders", value: "1", icon: XCircleIcon, color: "bg-red-100 text-red-600" },
      { title: "Wishlist Items", value: "5", icon: HeartIcon, color: "bg-pink-100 text-pink-600" },
      { title: "Cart Items", value: "2", icon: ShoppingCartIcon, color: "bg-indigo-100 text-indigo-600" },
      { title: "Total Spent", value: "$350", icon: BanknotesIcon, color: "bg-teal-100 text-teal-600" },
      { title: "Pending Reviews", value: "3", icon: StarIcon, color: "bg-orange-100 text-orange-600" },
    ],
    orders: [
      { name: "Mon", orders: 3 },
      { name: "Tue", orders: 5 },
      { name: "Wed", orders: 2 },
      { name: "Thu", orders: 6 },
      { name: "Fri", orders: 4 },
      { name: "Sat", orders: 7 },
      { name: "Sun", orders: 5 },
    ],
  };
}

export default async function Page() {
  const { stats, orders } = await getDashboardStats();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-gray-500">
          Here’s a quick summary of your recent activities and order trends.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-semibold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Chart  */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Order Summary</h2>
        <ChartClient orderData={orders} />
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between border-b pb-2">
            <span>🛒 Order #ORD124 placed</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>🚚 Order #ORD120 delivered</span>
            <span className="text-sm text-gray-500">5 days ago</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>❤️ Added “Headphones” to Wishlist</span>
            <span className="text-sm text-gray-500">1 week ago</span>
          </li>
          <li className="flex justify-between">
            <span>⭐ Reviewed “Laptop Bag”</span>
            <span className="text-sm text-gray-500">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
