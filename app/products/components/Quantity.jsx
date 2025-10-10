"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Quantity({ product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => router.push("/cart"), 2000);
  };

  return (
    <div className="flex items-center gap-6 mt-6">
      <div className="flex items-center border border-gray-500 rounded-lg">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-lg text-gray-600"
        >
          -
        </button>
        <span className="px-4 py-2 text-black">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 text-lg text-gray-600"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <button
        onClick={handleAddToCart}
        className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
      >
        Add to Cart
      </button>
      <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all">
        Buy Now
      </button>
    </div>
  );
}
