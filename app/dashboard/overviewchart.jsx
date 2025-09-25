"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, } from "recharts";

export default function OverviewChart() {
    const salesData = [{ date: "Sep 20", sales: 1000 }, { date: "Sep 21", sales: 300 }, { date: "Sep 22", sales: 200 }, { date: "Sep 23", sales: 250 }, { date: "Sep 24", sales: 100 }, { date: "Sep 25", sales: 300 }, { date: "Sep 26", sales: 400 },
    ];

    // Dummy data for pie chart
    const productData = [
        { name: "Green Leaf Lettuce", value: 400, color: "#22c55e" },
        { name: "Rainbow Chard", value: 300, color: "#3b82f6" },
        { name: "Clementine", value: 300, color: "#f97316" },
        { name: "Mint", value: 200, color: "#6366f1" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Weekly Sales */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Weekly Sales</h2>
                <div className="flex gap-4 mb-4 border-b">
                    <button className="text-green-500 border-b-2 border-green-500 pb-1">
                        Sales
                    </button>
                    <button className="text-gray-500 pb-1">Orders</button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Best Selling Products */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-4">Best Selling Products</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={productData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {productData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
