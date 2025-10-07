"use client";
import React, { useState, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { addToCart } = useCart(); // use global cart

  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = async (e) => {
    const name = e.target.value;
    try {
      const res = await axios.get(
        `https://smart-shop-server-three.vercel.app/products?name=${name}`
      );
      setProducts(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product); 
    toast.success(`${product.name} added to cart!`);

    setTimeout(() => {
      router.push("/cart");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          All Products
        </h2>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search by name"
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex space-x-2"
                >
                  <GrCart className="w-6 h-6 text-blue-600" />
                  <FaRegHeart className="w-6 h-6 text-purple-500" />
                </button>
                <Link href={`/checkout/${product._id}`} className="text-md py-1 px-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
