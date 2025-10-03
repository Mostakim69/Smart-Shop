"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
