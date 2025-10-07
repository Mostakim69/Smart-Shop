"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
// import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  // const { addToCart } = useCart();

  // const handleAddToCart = (product) => {
  //   addToCart({ ...product, quantity });
  //   toast.success(`${product.name} added to cart!`);
  //   setTimeout(() => {
  //     router.push("/cart");
  //   }, 2000);
  // };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 border my-6 rounded-2xl bg-gray-50 items-center">
      {/* 🖼️ Image Section */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "Product Image"}
          fill
          className="object-cover"
        />
      </div>

      {/* 🧾 Content Section */}
      <div className="space-y-5">
        <p className="text-gray-500 text-sm tracking-wider uppercase">
          [{product?.category}]
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          {product?.name}
        </h1>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-2">
          {Array(5)
            .fill()
            .map((_, i) => (
              <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
            ))}
          <span className="text-sm text-gray-500 ml-2">(546 Reviews)</span>
        </div>

        {/* 📜 Description */}
        <p className="text-gray-600 leading-relaxed text-[15px]">
          {product?.description}
        </p>

        {/* 💰 Price */}
        <div>
          <span className="text-2xl font-bold text-gray-900">
            ৳ {product?.price}
          </span>
        </div>

        {/* 🛒 Quantity & Buttons */}
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

          <button
            // onClick={() => handleAddToCart(product)}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer"
          >
            Add to Cart
          </button>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
