"use client";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="max-w-sm mx-auto my-8 bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-64">
        {/* <Image
        // referrerPolicy="no-referrer"
          src={product?.image}
          alt={product?.name}
          fill
          className=" hover:scale-105 transition-transform h-56 w-full duration-300"
        /> */}
        {product?.image ? (
          <Image
            src={product.image}
            alt={product?.name || "No image"}
            fill
            className="object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            No Image
          </div>
        )}
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
