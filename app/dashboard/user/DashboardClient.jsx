"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatsCards from "./components/StateCards";
import RecentOrders from "./components/RecentOrders";
import QuickActions from "./components/QuickActions";
import Recommended from "./components/Recommended";
import Reviews from "./components/Reviews";
import SupportSection from "./components/SupportSection";
import OrdersGraph from "./components/OrdersGraph";

export default function DashboardClient() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const [ordersRes, cartRes, recRes] = await Promise.all([
          fetch(`https://smart-shop-server-three.vercel.app/orders?orderedBy=${user.email}`),
          fetch(`https://smart-shop-server-three.vercel.app/cartItems?email=${user.email}`),
          fetch(`https://smart-shop-server-three.vercel.app/products?category=electronics`),
        ]);

        const orders = await ordersRes.json();
        const cartItems = await cartRes.json();
        const recommended = await recRes.json();

        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        const lastOrders = orders
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
          .slice(0, 3)
          .map((order) => ({
            id: order._id,
            name: order.name || "Product",
            status: order.status || "Processing",
            date: new Date(order.orderDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            amount: `$${order.totalAmount}`,
            items: order.items || [],
          }));

        setUserStats({
          totalOrders,
          wishlistCount: 5,
          reviewsCount: 8,
          cartItems: cartItems.length,
          totalSpent,
        });

        setRecentOrders(lastOrders);
        setRecommendedProducts(recommended);
        setAllOrders(orders);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading Dashboard...</div>;

  const userReviews = [
    { id: 1, product: "iPhone 15", rating: 5, comment: "Excellent phone!" },
    { id: 2, product: "Samsung Galaxy S23", rating: 4, comment: "Good performance." },
    { id: 3, product: "MacBook Pro", rating: 5, comment: "Loving it!" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Stats Cards */}
      <StatsCards userStats={userStats} />

      {/* Recent Orders & Orders Graph */}
      <div className="grid grid-cols-1 md:grid-cols-2 not-first:gap-3 md:gap-12">
        {/* Recent Orders - 60% width on large screens */}
        <div className="w-full ">
          <RecentOrders recentOrders={recentOrders} />
        </div>

        {/* Orders Graph - 40% width on large screens */}
        <div className="w-full">
          <OrdersGraph orders={allOrders} />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions userStats={userStats} notifications={[]} />

      {/* Recommended & Reviews */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="w-full lg:w-7/10 min-w-0">
          <Recommended recommendedProducts={recommendedProducts} />
        </div>
        <div className="w-full lg:w-3/10 min-w-0">
          <Reviews userReviews={userReviews} />
        </div>
      </div>

      {/* Support Section */}
      <SupportSection />
    </div>
  );
}
