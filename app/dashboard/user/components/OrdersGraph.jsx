"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OrdersGraph({ orders = [] }) {
  const [view, setView] = useState("weekly");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!orders.length) return;

    if (view === "weekly") {
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
      });

      const labels = last7Days.map((d) =>
        d.toLocaleDateString("en-US", { weekday: "short" })
      );

      const data = last7Days.map((day) =>
        orders
          .filter((o) => {
            const orderDate = new Date(o.orderDate);
            return (
              orderDate.getDate() === day.getDate() &&
              orderDate.getMonth() === day.getMonth() &&
              orderDate.getFullYear() === day.getFullYear()
            );
          })
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
      );

      setChartData({
        labels,
        datasets: [
          { label: "Orders ($)", data, backgroundColor: "rgba(59, 130, 246, 0.6)" },
        ],
      });
    } else if (view === "monthly") {
      const months = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - i));
        return d;
      });

      const labels = months.map((m) =>
        m.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      );

      const data = months.map((month) =>
        orders
          .filter((o) => {
            const orderDate = new Date(o.orderDate);
            return (
              orderDate.getMonth() === month.getMonth() &&
              orderDate.getFullYear() === month.getFullYear()
            );
          })
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
      );

      setChartData({
        labels,
        datasets: [
          { label: "Orders ($)", data, backgroundColor: "rgba(16, 185, 129, 0.6)" },
        ],
      });
    }
  }, [orders, view]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Orders</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              view === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded ${
              view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {chartData.datasets.length ? (
        <div className="w-full overflow-x-auto">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: true } },
              scales: {
                x: { ticks: { autoSkip: false } },
                y: { beginAtZero: true },
              },
            }}
            height={300}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No order data available</p>
      )}
    </div>
  );
}
