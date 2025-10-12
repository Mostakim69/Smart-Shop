"use client";
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6 text-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          🎉 Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
          <p>Order ID: #ORD12345</p>
          <p>Date: Oct 11, 2025</p>
          <p>Total Amount: $165</p>
          <p>
            Status:{" "}
            <span className="text-green-600 font-semibold">Confirmed</span>
          </p>
        </div>

        <Link
          href="/dashboard/user/orders"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}
