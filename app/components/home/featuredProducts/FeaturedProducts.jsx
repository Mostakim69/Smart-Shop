"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrCart } from "react-icons/gr";


export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 8);

  // Add to Cart
  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    const cartItem = {
      userEmail: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    try {
      const res = await axios.post(
        "https://smart-shop-server-three.vercel.app/addToCart",
        cartItem
      );
      if (res.data?.insertedId) {
        toast.success("Product added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Featured Products</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl  shadow-md hover:shadow-xl overflow-hidden transition"
          >
            <Link href={`/products/${product._id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/products/${product._id}`}>
                <h3 className="font-medium text-gray-800 hover:text-blue-600 truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="text-blue-600 font-bold mt-1">${product.price}</p>

              <div className="flex justify-between mt-3">
                <button onClick={() => handleAddToCart(product)}>
                  <GrCart className="w-6 h-6 text-blue-600 hover:cursor-pointer " />
                </button>
                <Link
                  href={`/checkout?type=single&id=${product._id}`}
                  className="px-3 py-1 bg-secondary text-white rounded hover:opacity-90 transition"
                >
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
