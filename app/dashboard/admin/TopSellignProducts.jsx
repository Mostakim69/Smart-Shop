"use client";
import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { FaArrowUp, FaArrowDown, FaStar } from "react-icons/fa";

export default function TopSellingProducts() {
  const [products, setProducts] = useState([]);

  // data (future: replace with fetched data)
  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        rating: 4.7,
        sold: 320,
        change: "+12%",
        trend: "up",
        image: "/img/product1.jpg",
      },
      {
        id: 2,
        name: "Smart Watch",
        category: "Wearables",
        rating: 4.6,
        sold: 270,
        change: "+8%",
        trend: "up",
        image: "/img/product2.jpg",
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        category: "Gadgets",
        rating: 4.5,
        sold: 220,
        change: "-4%",
        trend: "down",
        image: "/img/product3.jpg",
      },
    ];
    setProducts(fakeData);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-blue-500 w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-800">
            Top Selling Products
          </h2>
        </div>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* Product List */}
      <ul className="divide-y divide-gray-100">
        {products.map((product) => (
          <li
            key={product.id}
            className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-lg px-3 transition"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {product.category} •{" "}
                  <span className="text-yellow-500 inline-flex items-center gap-1">
                    <FaStar className="w-3 h-3" /> {product.rating}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p className="text-gray-700 font-semibold">{product.sold} sold</p>
              <p
                className={`text-sm flex items-center justify-end gap-1 ${
                  product.trend === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {product.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                {product.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
