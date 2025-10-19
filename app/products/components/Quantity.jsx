"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Quantity({ product }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = async (product) => {
    const cartItem = {
      userEmail: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    try {
      const res = await axios.post("https://smart-shop-server-three.vercel.app/addToCart", cartItem);
      if (res.data?.insertedId) toast.success("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 w-full">

        <div className="flex items-center justify-between bg-base-100 text-gay-700 border-1 rounded-lg font-medium w-full sm:w-auto px-6 py-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 text-xl font-bold hover:text-gray-400 transition hover:cursor-pointer"
        >
          -
        </button>

        <span className="text-lg">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 text-xl font-bold hover:text-gray-400 transition hover:cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 w-full">
        <button
          onClick={() => handleAddToCart(product)}
          className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          Add to Cart
        </button>
        <Link
          href={`/checkout?type=single&id=${product._id}`}
          className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium text-center hover:bg-gray-700 transition-all"
        >
          Buy Now
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

