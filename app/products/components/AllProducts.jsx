"use client";
import React, { useState } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  

  useState(() => {
    axios.get('https://smart-shop-server-three.vercel.app/products')
      .then(res => {
        setProducts(res.data);
      })
  }, [products])

  console.log(products);


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
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          products?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-500 font-bold text-sm mb-1">
                  {product.name}
                </h3>
                <div>
                  <p className="text-gray-500 font-medium text-sm mb-1">{product.description}</p>
                </div>
                <div className="text-blue-600 font-bold text-sm mb-2">
                  {product.price}
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
        }
      </div>
    </div>
  );
}
