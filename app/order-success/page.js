"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="bg-base-100 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 max-w-lg w-full text-center">
        <CheckCircle className="w-20 h-20 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Order Placed Successfully!</h1>
        <p className="text-gray-700">
          Thank you for your purchase. Your order <span className="font-semibold">{orderId || "#0000"}</span> has been placed successfully.
        </p>

        <Link
          href={`/tracking/${orderId}`}
          className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary/90 transition"
        >
          Track My Order
        </Link>

        <button
          onClick={() => router.push("/products")}
          className="mt-4 border border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
