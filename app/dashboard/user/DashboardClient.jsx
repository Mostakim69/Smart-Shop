"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatsCards from "./components/StateCards";
import RecentOrders from "./components/RecentOrders";
import QuickActions from "./components/QuickActions";
import Recommended from "./components/Recommended";
import Addresses from "./components/Reviews";
import SupportSection from "./components/SupportSection";
import OrdersGraph from "./components/OrdersGraph";
import Reviews from "./components/Reviews";

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
          fetch(`http://localhost:5000/orders?orderedBy=${user.email}`),
          fetch(`http://localhost:5000/cartItems?email=${user.email}`),
          fetch(`http://localhost:5000/products?category=electronics`),
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
        setAllOrders(orders); // All orders for OrdersGraph
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading Dashboard...</div>;
 

  const userReviews = [
  { id: 1, product: "iPhone 15", rating: 5, comment: "Excellent phone!" },
  { id: 2, product: "Samsung Galaxy S23", rating: 4, comment: "Good performance." },
  { id: 3, product: "MacBook Pro", rating: 5, comment: "Loving it!" },
];


  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen space-y-6">
      <StatsCards userStats={userStats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8 mt-6">
        <RecentOrders recentOrders={recentOrders} />
        {/* OrdersGraph only receives orders prop */}
        <OrdersGraph orders={allOrders} />
      </div>

      <QuickActions userStats={userStats} notifications={[]} />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
  {/* Recommended Products: 7-cols grid এর 5 কলাম => 70% */}
  <div className="lg:col-span-5">
    <Recommended recommendedProducts={recommendedProducts} />
  </div>

  {/* Reviews: 7-cols grid এর 2 কলাম => 30% */}
  <div className="lg:col-span-2">
    <Reviews userReviews={userReviews} />
  </div>
</div>


      <SupportSection />
    </div>
  );
}
