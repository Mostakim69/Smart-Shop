"use client";
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function SalesOverview() {
  const [view, setView] = useState("monthly"); // monthly or weekly
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy fetch function (replace with API later)
  useEffect(() => {
    setLoading(true);
    // Example API fetch:
    // fetch("")
    //   .then(res => res.json())
    //   .then(data => setData(data))
    //   .finally(() => setLoading(false));

    // Dummy data
    const monthlySales = [
      { name: "Jan", sales: 12000 },
      { name: "Feb", sales: 15000 },
      { name: "Mar", sales: 14000 },
      { name: "Apr", sales: 18000 },
      { name: "May", sales: 20000 },
      { name: "Jun", sales: 17000 },
    ];

    const weeklySales = [
      { name: "Week 1", sales: 4000 },
      { name: "Week 2", sales: 6000 },
      { name: "Week 3", sales: 5000 },
      { name: "Week 4", sales: 7000 },
    ];

    setData(view === "monthly" ? monthlySales : weeklySales);
    setLoading(false);
  }, [view]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
        <div className="space-x-2">
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1 rounded font-medium cursor-pointer ${
              view === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1 rounded font-medium cursor-pointer ${
              view === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading chart...</div>
      ) : (
        <>
                {/* Chart Section */}
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3182CE"
                  fill="rgba(49,130,206,0.2)"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">{view === "monthly" ? "Month" : "Week"}</th>
                  <th className="px-4 py-2">Sales (৳)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 font-medium">{item.sales.toLocaleString("en-BD")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
