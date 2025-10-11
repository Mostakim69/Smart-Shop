import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow">Total Users: 120</div>
        <div className="p-4 bg-white rounded shadow">Total Orders: 80</div>
        <div className="p-4 bg-white rounded shadow">Total Sales: $5000</div>
        <div className="p-4 bg-white rounded shadow">Products: 45</div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul>
          <li>Order #1234 - Pending</li>
          <li>Order #1233 - Completed</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <ul className="flex gap-4">
          <li><a href="/dashboard/admin/manage-products" className="text-blue-600 underline">Manage Products</a></li>
          <li><a href="/dashboard/admin/manage-orders" className="text-blue-600 underline">Manage Orders</a></li>
          <li><a href="/dashboard/admin/manage-users" className="text-blue-600 underline">Manage Users</a></li>
          <li><a href="/dashboard/admin/reports" className="text-blue-600 underline">Reports</a></li>
        </ul>
      </div>
    </div>
  );
}