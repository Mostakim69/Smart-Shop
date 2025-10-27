import React from "react";
import RecentOrders from "./RecentOrders";
import SalesOverview from "./SalesOverview";
import SummaryCards from "./SummaryCards";
import RecentUsers from "./RecentUsers";
import TopSellignProducts from "./TopSellignProducts";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <SummaryCards />
      <SalesOverview />

      <TopSellignProducts />

      <RecentOrders />
      <RecentUsers />

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
