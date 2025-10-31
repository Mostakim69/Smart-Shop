"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import PageIntro from "@/utils/PageIntro";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalSales: 0, orders: 0, productsListed: 0, totalProductsSold: 0 });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch products
        const productsRes = await axios.get(
          `https://smart-shop-server-three.vercel.app/products?sellerEmail=${user.email}`
        );
        const myProducts = productsRes.data || [];
        setProducts(myProducts);

        // ✅ Fetch orders
        const ordersRes = await axios.get(
          `https://smart-shop-server-three.vercel.app/orders/seller/${user.email}`
        );
        const myOrders = ordersRes.data || [];
        setOrders(myOrders);

        // ✅ Calculate total sales, total products sold
        let totalSales = 0;
        let totalProductsSold = 0;

        myOrders.forEach(order => {
          order.items.forEach(item => {
            totalProductsSold += item.quantity || 1;
            totalSales += parseFloat(item.price || 0) * (item.quantity || 1);
          });
        });

        setStats({
          totalSales,
          orders: myOrders.length,
          productsListed: myProducts.length,
          totalProductsSold
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-900 px-4 md:px-10 py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <PageIntro
            h1={`👋 Welcome back, ${user.displayName || "Seller"}`}
          />
          <p className="text-gray-600 text-lg">Here a quick overview of your store performance.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Sales", value: `৳${stats.totalSales}`, color: "blue" },
          { label: "Orders", value: stats.orders, color: "emerald" },
          { label: "Products Listed", value: stats.productsListed, color: "violet" },
          { label: "Products Sold", value: stats.totalProductsSold, color: "rose" },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl border border-gray-200 shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
          >
            <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
            <p className={`text-3xl font-extrabold text-${item.color}-600 mt-3 animate-pulse`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h3>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Order ID", "Customer", "Date", "Status", "Total"].map((header) => (
                  <th key={header} className="p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                >
                  <td className="p-4 text-blue-500 text-sm font-medium">{o._id}</td>
                  <td className="p-4 text-sm">{o.name}</td>
                  <td className="p-4 text-sm">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${o.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : o.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {o.status || "pending"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right font-medium">৳{o.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Listings */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Listings</h3>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Product", "Category", "Price", "Quantity Sold", "Date Added"].map((header) => (
                  <th key={header} className="p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                // calculate sold quantity per product
                const soldQty = orders.reduce((sum, order) => {
                  const item = order.items.find(i => i._id === p._id);
                  return sum + (item?.quantity || 0);
                }, 0);

                return (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                  >
                    <td className="p-4 text-sm font-medium">{p.name}</td>
                    <td className="p-4 text-sm capitalize">{p.category || "N/A"}</td>
                    <td className="p-4 text-sm">৳{p.price}</td>
                    <td className="p-4 text-sm">{soldQty}</td>
                    <td className="p-4 text-sm text-right font-medium">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString()
                        : new Date(parseInt(p._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
