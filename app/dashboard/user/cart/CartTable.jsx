"use client";

import { useRouter } from "next/navigation";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export function CartTable({ cartItems: initialItems, userEmail, refreshCart }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialItems);
  const [loadingItem, setLoadingItem] = useState(null);

  // Increase quantity
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // Remove item
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`https://smart-shop-server-three.vercel.app/cartItems/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      if (refreshCart) refreshCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item from cart");
    }
  };

  // Buy Now handler
  const handleBuyNow = async (item) => {
    if (!userEmail) return alert("Please log in first!");
    setLoadingItem(item.id);

    try {
      const orderPayload = {
        userEmail,
        items: [{ productId: item.id, quantity: item.qty, price: item.price }],
        totalAmount: item.price * item.qty,
        payment: "online",
      };

      // Place order
      const res = await fetch("https://smart-shop-server-three.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error("Failed to place order");

      // Remove item from cart
      await fetch(`https://smart-shop-server-three.vercel.app/cartItems/${item.id}`, { method: "DELETE" });

      // Update local state
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      if (refreshCart) refreshCart();

      alert(`${item.name} purchased successfully!`);
      router.push("/dashboard/user/orders"); // Redirect to orders page
    } catch (err) {
      console.error(err);
      alert("Failed to complete purchase.");
    } finally {
      setLoadingItem(null);
    }
  };

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
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
              <tr key={item.id} className="border-b">
                <td className="p-3 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <span className="font-medium text-gray-800">{item.name}</span>
                </td>
                <td className="p-3">${item.price}</td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-2 border rounded-md px-2 py-1">
                    <button onClick={() => handleDecrease(item.id)} className="p-1 rounded">
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{item.qty}</span>
                    <button onClick={() => handleIncrease(item.id)} className="p-1 rounded">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-3 text-right font-semibold">${item.price * item.qty}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    title="Remove"
                    className="p-2 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    {loadingItem === item.id ? "Processing..." : "Buy Now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="p-2 rounded-full">
                <TrashIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 border rounded-md px-2 py-1">
                <button onClick={() => handleDecrease(item.id)} className="p-1 rounded">
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="font-medium">{item.qty}</span>
                <button onClick={() => handleIncrease(item.id)} className="p-1 rounded">
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="font-semibold text-gray-900">${item.price * item.qty}</p>
            </div>

            <button
              onClick={() => handleBuyNow(item)}
              className="w-full bg-green-600 text-white py-2 rounded-md"
            >
              {loadingItem === item.id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3">
        <div className="text-gray-600 text-sm">Shipping and taxes calculated at checkout.</div>
        <div className="text-right mt-4 md:mt-0 text-lg font-semibold">
          Total: <span className="text-primary">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
