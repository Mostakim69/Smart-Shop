"use client";
import React, { useState } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";


export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: 'TV 43" Class TU7000 Series Crystal UHD 4K Smart TV',
      price: "$599.00",
      origPrice: "$678.95",
      save: "$80 (5%)",
      img: "https://i.ibb.co.com/LzdM1Qns/32-inch-android-led-tv-612.jpg",
    },
    {
      id: 2,
      name: "EARBUDS Apple AirPods 3rd generation with Charging Case",
      price: "$170.00",
      origPrice: "$250.00",
      save: "$80 (10%)",
      img: "https://i.postimg.cc/jdxqWqWN/25baefac5d2a64cff300295923077243.jpg",
    },
    {
      id: 3,
      name: "GAMING CONSOLE Apple Mac Mini M4 Chip 16/512GB Silver (10C CPU 10...)",
      price: "$666.00",
      origPrice: "$750.00",
      save: "$84 (10%)",
      img: "https://i.postimg.cc/gk2dzM5H/c2dee5d94568d5f8415e1de463039aa2.jpg",
    },
    {
      id: 4,
      name: "GAMING CONSOLE Apple MacBook Pro 16 in M4 Pro Chip Liquid Retina",
      price: "$3,759.00",
      origPrice: "$4,434.90",
      save: "$675 (10%)",
      img: "https://i.postimg.cc/wv2Pnz68/1480ac68643aad7626f6084589292944.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$199.00",
      origPrice: "$250.00",
      save: "$51 (10%)",
      img: "https://i.ibb.co.com/kgQHjkfB/Apple-i-Phone-17-Pro-Max.png",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$299.00",
      origPrice: "$350.00",
      save: "$51 (10%)",
      img: "https://i.ibb.co.com/T9gR2Ks/foodela-baglamoti-rice.jpg",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$499.00",
      origPrice: "$550.00",
      save: "$51 (10%)",
      img: "https://i.ibb.co.com/LzdM1Qns/32-inch-android-led-tv-612.jpg",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$699.00",
      origPrice: "$750.00",
      save: "$51 (10%)",
      img: "https://i.ibb.co.com/GQZyX8gh/497-4972831-transparent-leather-jacket-png-cute-red-leather-jacket.png",
    },
  ];

  // Filtered products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          All Products
        </h2>
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.save}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-500 font-medium text-sm mb-1">
                  {product.name}
                </h3>
                <div className="text-blue-600 font-bold text-sm mb-2">
                  {product.price}{" "}
                  <span className="text-gray-500 line-through text-xs">
                    {product.origPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button className="flex space-x-2">
                    <GrCart className="w-6 h-6 text-blue-600 " />
                    <FaRegHeart className="w-6 h-6 text-purple-500" />
                 
                  </button>
                  <button
                    className="text-md py-1 px-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-500 hover:to-purple-500 text-white  rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
