"use client";

import Link from "next/link";
import { useState } from "react";

export default function Recommended({ recommendedProducts }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recommended Products</h2>
          <p className="text-gray-500 text-sm mt-1"> Just for you</p>
        </div>
        <Link href="/products">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border border-blue-200 hover:border-blue-300">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 block md:hidden">
        <Link href="/products">
          <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-200">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}

// Separate component for better image handling
function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container with better error handling */}
      <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-100 min-h-[140px] flex items-center justify-center">
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-center">Image not available</span>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-32 object-cover transition-transform duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          {product.rating && (
            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-xs font-medium text-orange-600">{product.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* View Product Button */}
      <Link href={`/products/${product._id}`}>
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform group-hover:scale-[1.02] shadow-lg shadow-blue-500/25 hover:shadow-blue-600/25 text-sm">
          View Product
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </Link>
    </div>
  );
}