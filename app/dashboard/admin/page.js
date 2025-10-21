import React from "react";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

import RecentOrders from "./RecentOrders";
import SalesOverview from "./SalesOverview";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <Users className="text-blue-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">720</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% this month</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <ShoppingBag className="text-purple-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">198</p>
          <p className="text-xs text-green-600 mt-1">↑ 3% this week</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
            <DollarSign className="text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">$5,480</p>
          <p className="text-xs text-red-600 mt-1">↓ 2% this week</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Products</h3>
            <Package className="text-orange-500" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">47</p>
          <p className="text-xs text-green-600 mt-1">↑ 2 new added</p>
        </div>
      </div>

      <SalesOverview />

      {/*  QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">New Feedback</h3>
          <p className="text-3xl font-bold">34</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Server Uptime</h3>
          <p className="text-3xl font-bold">99.8%</p>
        </div>
      </div>

      {/*  TOP SELLING PRODUCTS */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Top Selling Products
        </h2>
        <ul className="divide-y divide-gray-100">
          <li className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/img/product1.jpg" className="w-10 h-10 rounded" />
              <span className="text-gray-700">Wireless Headphones</span>
            </div>
            <span className="font-medium text-gray-600">320 sold</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/img/product2.jpg" className="w-10 h-10 rounded" />
              <span className="text-gray-700">Smart Watch</span>
            </div>
            <span className="font-medium text-gray-600">270 sold</span>
          </li>
        </ul>
      </div>

     <RecentOrders/>

      {/* RECENT USERS*/}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Users
        </h2>
        <ul className="divide-y divide-gray-100">
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="text-gray-800 font-medium">Sarah Rahman</p>
              <p className="text-sm text-gray-500">Joined 2 days ago</p>
            </div>
            <span className="text-green-600 font-semibold">Active</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="text-gray-800 font-medium">Aminul Hasan</p>
              <p className="text-sm text-gray-500">Joined 5 days ago</p>
            </div>
            <span className="text-gray-400 font-semibold">Offline</span>
          </li>
        </ul>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          <button className="text-sm text-blue-600 hover:underline">
            Mark all as read
          </button>
        </div>
        <ul className="divide-y divide-gray-100">
          <li className="py-3 flex items-start gap-3">
            <div className="w-3 h-3 mt-2 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-gray-800 font-medium">New order received</p>
              <p className="text-sm text-gray-500">
                Order #2345 from Sarah Rahman
              </p>
              <span className="text-xs text-gray-400">5 mins ago</span>
            </div>
          </li>
          <li className="py-3 flex items-start gap-3">
            <div className="w-3 h-3 mt-2 rounded-full bg-amber-400"></div>
            <div>
              <p className="text-gray-800 font-medium">Low stock alert</p>
              <p className="text-sm text-gray-500">
                “Wireless Earbuds” stock below 10
              </p>
              <span className="text-xs text-gray-400">30 mins ago</span>
            </div>
          </li>
          <li className="py-3 flex items-start gap-3">
            <div className="w-3 h-3 mt-2 rounded-full bg-green-500"></div>
            <div>
              <p className="text-gray-800 font-medium">Product approved</p>
              <p className="text-sm text-gray-500">
                New product added by Admin
              </p>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </li>
          <li className="py-3 flex items-start gap-3">
            <div className="w-3 h-3 mt-2 rounded-full bg-red-500"></div>
            <div>
              <p className="text-gray-800 font-medium">Payment failed</p>
              <p className="text-sm text-gray-500">
                Order #452 payment unsuccessful
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          </li>
        </ul>
      </div>

      {/* QUICK LINKS*/}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Access
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <a
              href="/dashboard/admin/manage-products"
              className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center font-medium text-blue-700"
            >
              Manage Products
            </a>
          </li>
          <li>
            <a
              href="/dashboard/admin/manage-orders"
              className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center font-medium text-purple-700"
            >
              Manage Orders
            </a>
          </li>
          <li>
            <a
              href="/dashboard/admin/manage-users"
              className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center font-medium text-green-700"
            >
              Manage Users
            </a>
          </li>
          <li>
            <a
              href="/dashboard/admin/reports"
              className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center font-medium text-orange-700"
            >
              Reports
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
