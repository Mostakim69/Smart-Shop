"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon, TruckIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/orders?orderedBy=${user.email}`);
        if (!res.ok) {
          setOrders([]);
          return;
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  if (!user) {
    return (
      <div className="p-6 text-center bg-white shadow-md rounded-xl py-12">
        <p className="text-gray-500 text-lg">Please login to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading your orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛍️ My Orders</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Order ID</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Total</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="p-4 font-medium text-gray-800">{o._id.slice(-6)}</td>
                    <td className="p-4 text-gray-600">{new Date(o.orderDate).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-800 font-semibold">${o.totalAmount}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {o.status === "Delivered" && <CheckCircleIcon className="w-4 h-4" />}
                        {o.status === "Pending" && <ClockIcon className="w-4 h-4" />}
                        {o.status === "Shipped" && <TruckIcon className="w-4 h-4" />}
                        {o.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link href={`/orders/${o._id}`}>
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition">
                          <EyeIcon className="w-4 h-4" /> View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {orders.length > 0 ? (
            orders.map((o) => (
              <div key={o._id} className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">{o._id.slice(-6)}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    o.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : o.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {o.status || "Pending"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">📅 {new Date(o.orderDate).toLocaleDateString()}</p>
                <p className="text-gray-800 font-semibold mt-1">💰 ${o.totalAmount}</p>
                <Link href={`/orders/${o._id}`}>
                  <button className="mt-3 w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    <EyeIcon className="w-4 h-4" /> View Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
