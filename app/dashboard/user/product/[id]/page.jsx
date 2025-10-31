"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();

  // Demo data (replace later with fetch)
  const product = {
    id,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: "$50",
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-primary text-lg font-semibold mb-3">
              {product.price}
            </p>
            <p className="text-gray-600 mb-5">{product.description}</p>

            <div className="flex gap-3">
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                Add to Cart
              </button>
              <Link
                href="/dashboard/user/wishlist"
                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"
              >
                Back to Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
