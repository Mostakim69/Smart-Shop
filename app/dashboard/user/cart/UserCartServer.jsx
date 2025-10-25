"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { CartTable } from "./CartTable";

export default function UserCartClient() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://smart-shop-server-three.vercel.app/cartItems?userEmail=${user.email}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        setCartItems([]);
        return;
      }
      const data = await res.json();
      const formatted = data.map((item) => ({
        id: item._id,
        name: item.name,
        price: parseFloat(item.price),
        qty: item.quantity,
        image: item.image,
      }));
      setCartItems(formatted);
    } catch (error) {
      console.error(error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user?.email]);

  if (!user) {
    return (
      <div className="text-center bg-white shadow-md rounded-xl py-12">
        <p className="text-gray-500 text-lg">Please login to view your cart.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        Loading your cart...
      </div>
    );
  }

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBagIcon className="w-7 h-7 text-primary" /> My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-xl py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <a
            href="/products"
            className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-4 md:p-6">
          <CartTable
            cartItems={cartItems}
            total={total}
            userEmail={user.email}
            refreshCart={fetchCartItems}
          />
        </div>
      )}
    </div>
  );
}
