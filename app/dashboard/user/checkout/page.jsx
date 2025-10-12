"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard/user/order-success");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-3">Billing & Shipping Info</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded w-full hover:bg-primary/90"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
