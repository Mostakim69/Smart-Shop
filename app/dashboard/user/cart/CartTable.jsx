"use client";

import { useRouter } from "next/navigation";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

export function CartTable({ cartItems: initialItems, total }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialItems);

  // 🧮 Quantity Increment
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ➖ Quantity Decrement
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // ❌ Remove Item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 💳 Checkout Navigation
  const handleCheckout = () => {
    router.push("/dashboard/user/checkout");
  };

  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <>
      {/* 🛒 Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Subtotal</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <td className="p-3 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {item.name}
                  </span>
                </td>

                {/* Price */}
                <td className="p-3">${item.price}</td>

                {/* Quantity Controls */}
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-2 border rounded-md px-2 py-1">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{item.qty}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>

                {/* Subtotal */}
                <td className="p-3 text-right font-semibold">
                  ${item.price * item.qty}
                </td>

                {/* Remove Button */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleRemove(item.id)}
                    title="Remove"
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 Summary Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="text-gray-600 text-sm">
          Shipping and taxes calculated at checkout.
        </div>

        <div className="text-right mt-4 md:mt-0">
          <p className="text-lg font-semibold">
            Total:{" "}
            <span className="text-primary">${totalPrice.toFixed(2)}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="mt-3 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
