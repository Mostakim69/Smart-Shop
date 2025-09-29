"use client";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="max-w-sm mx-auto my-8 bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-64">
        <img
        referrerPolicy="no"
          src={product?.image}
          alt={product?.name}
          fill
          className=" hover:scale-105 transition-transform h-56 w-full duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary">{product?.name}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {product?.description}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">
            ৳ {product?.price}
          </span>
          <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
