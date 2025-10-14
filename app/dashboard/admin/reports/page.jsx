'use client';
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";

export default function Reports() {
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4000 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 7000 },
  ];

  const ordersData = [
    { status: 'Completed', value: 240 },
    { status: 'Pending', value: 80 },
    { status: 'Cancelled', value: 30 },
  ];

  const COLORS = ['#4ade80', '#facc15', '#f87171'];

  const productData = [
    { name: 'Wireless Headphones', sold: 320 },
    { name: 'Smart Watch', sold: 270 },
    { name: 'Bluetooth Speaker', sold: 180 },
  ];

  const customerData = [
    { type: 'New Users', value: 120 },
    { type: 'Active Users', value: 450 },
    { type: 'Inactive Users', value: 80 },
  ];

  const revenueData = [
    { period: 'Today', revenue: 500 },
    { period: 'This Week', revenue: 3200 },
    { period: 'This Month', revenue: 12800 },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Month,Sales\n"
      + salesData.map(d => `${d.month},${d.sales}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

      {/* Sales Overview */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Summary */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Orders Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ordersData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {ordersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Insights */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Insights</h2>
        <ul className="space-y-3">
          {customerData.map((c, idx) => (
            <li key={idx} className="flex justify-between text-gray-700">
              <span>{c.type}</span>
              <span className="font-semibold">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Revenue Report */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Revenue Report</h2>
        <ul className="space-y-3">
          {revenueData.map((r, idx) => (
            <li key={idx} className="flex justify-between text-gray-700">
              <span>{r.period}</span>
              <span className="font-semibold">${r.revenue}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleExportCSV}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export Sales CSV
        </button>
      </div>
    </div>
  );
}
