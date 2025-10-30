"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import SellerProductsOrder from "../components/product/SellerProductsOrder";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 

  console.log(orders);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/orders/seller/${user.email}`
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to load your orders", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);


  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-500">Loading your orders...</p>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No orders yet for your products.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => <SellerProductsOrder
          key={order._id}
          order={order}
        ></SellerProductsOrder>)}
      </div>
    </div>
  );
}
