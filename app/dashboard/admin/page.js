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

      {/* QUICK LINKS*/}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Access
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <li>
            <a
              href="/dashboard/profile"
              className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center font-medium text-green-700"
            >
              Profile
            </a>
          </li>
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
            {/* <li>
            <a
              href="/dashboard/admin/settings"
              className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center font-medium text-green-700"
            >
              Settings
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
