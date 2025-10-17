"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalSales: 0, orders: 0, productsListed: 0 });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🧩 Dummy data for testing
    const dummyStats = {
      totalSales: 12890,
      orders: 56,
      productsListed: 12,
    };

    const dummyOrders = [
      {
        id: "ORD-1001",
        customer: "John Doe",
        date: "2025-10-15",
        status: "Delivered",
        total: "$299.00",
      },
      {
        id: "ORD-1002",
        customer: "Sarah Miller",
        date: "2025-10-14",
        status: "Processing",
        total: "$125.50",
      },
      {
        id: "ORD-1003",
        customer: "Michael Lee",
        date: "2025-10-13",
        status: "Pending",
        total: "$89.00",
      },
    ];

    const dummyProducts = [
      { _id: 1, name: "Wireless Headphones", stock: 25, price: "$59.99", sales: 145 },
      { _id: 2, name: "Smartwatch Series 6", stock: 12, price: "$199.00", sales: 87 },
      { _id: 3, name: "Bluetooth Speaker", stock: 40, price: "$39.99", sales: 212 },
      { _id: 4, name: "Gaming Mouse", stock: 30, price: "$29.99", sales: 165 },
    ];

    setTimeout(() => {
      setStats(dummyStats);
      setOrders(dummyOrders);
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="font-display bg-white min-h-screen text-gray-800 px-4 md:px-10 py-8">
      {/* 👋 Greeting */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-gray-900">
          Welcome back, <span className="text-blue-500">Seller</span> 👋
        </h2>
        <p className="text-gray-600 mt-2">Here’s an overview of your store performance today.</p>
      </div>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Sales", value: `$${stats.totalSales}`, color: "blue" },
          { label: "Orders", value: stats.orders, color: "emerald" },
          { label: "Products Listed", value: stats.productsListed, color: "violet" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
            <p className={`text-3xl font-bold text-${item.color}-600 mt-2`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* 🧾 Orders Table */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-blue-50">
              <tr>
                {["Order ID", "Customer", "Date", "Status", "Total"].map((header) => (
                  <th
                    key={header}
                    className="p-4 text-sm font-semibold text-gray-700 border-b border-blue-100"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <td className="p-4 text-blue-500 text-sm font-medium">{o.id}</td>
                  <td className="p-4 text-sm">{o.customer}</td>
                  <td className="p-4 text-sm">{o.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right font-medium">{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🛒 Product List */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Product Listings</h3>
        <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-blue-50">
              <tr>
                {["Product", "Stock", "Price", "Sales"].map((header) => (
                  <th
                    key={header}
                    className="p-4 text-sm font-semibold text-gray-700 border-b border-blue-100"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <td className="p-4 text-sm font-medium">{p.name}</td>
                  <td className="p-4 text-sm">{p.stock}</td>
                  <td className="p-4 text-sm">{p.price}</td>
                  <td className="p-4 text-sm text-right font-medium">{p.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
