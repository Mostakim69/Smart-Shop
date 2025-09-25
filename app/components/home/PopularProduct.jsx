'use client';

import React from "react";
import { motion } from "framer-motion";

export default function PopularProduct() {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      price: 299,
      oldPrice: 399,
      discount: "-25%",
      rating: 4.5,
      image: "https://i.ibb.co.com/kgQHjkfB/Apple-i-Phone-17-Pro-Max.png",
    },
    {
      id: 2,
      name: "Rice Pack",
      price: 25,
      oldPrice: 35,
      discount: "-30%",
      rating: 4.2,
      image: "https://i.ibb.co.com/T9gR2Ks/foodela-baglamoti-rice.jpg",
    },
    {
      id: 3,
      name: "Jacket",
      price: 79,
      oldPrice: 120,
      discount: "-35%",
      rating: 4.7,
      image:
        "https://i.ibb.co.com/GQZyX8gh/497-4972831-transparent-leather-jacket-png-cute-red-leather-jacket.png",
    },
    {
      id: 4,
      name: "Smart TV",
      price: 499,
      oldPrice: 599,
      discount: "-15%",
      rating: 4.3,
      image: "https://i.ibb.co.com/LzdM1Qns/32-inch-android-led-tv-612.jpg",
    },
  ];

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: { scale: 1.03, transition: { type: "spring", stiffness: 250 } },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Popular Products
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-md mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore our most popular picks loved by thousands of happy customers.
          </motion.p>
        </div>

        {/* Category Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button className="px-4 py-2 rounded bg-secondary text-white shadow hover:bg-blue-300 transition cursor-pointer">
            All
          </button>
          <button className="px-4 py-2 rounded border border-blue-400 text-blue-500 hover:bg-blue-100 transition cursor-pointer">
            Electronics
          </button>
          <button className="px-4 py-2 rounded border border-blue-400 text-blue-500 hover:bg-blue-100 transition cursor-pointer">
            Fashion
          </button>
          <button className="px-4 py-2 rounded border border-blue-400 text-blue-500 hover:bg-blue-100 transition cursor-pointer">
            Grocery
          </button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative bg-white shadow-2xl rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              {/* Discount Badge */}
              <span className="absolute z-10 top-2 left-2 bg-yellow-400 text-black border-1 text-xs px-2 py-1 rounded">
                {product.discount}
              </span>

              {/* Product Image */}
              <div className="w-full h-40 mb-4 overflow-hidden rounded">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Product Info */}
              <h3 className="text-lg text-black font-semibold">{product.name}</h3>

              {/* Price */}
              <p className="text-gray-600">
                <span className="text-blue-600 font-bold">${product.price}</span>{" "}
                <span className="line-through text-sm text-gray-400">
                  ${product.oldPrice}
                </span>
              </p>

              {/* Rating */}
              <p className="text-yellow-500 text-sm">
                {"⭐".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 ? "⭐" : ""}
                <span className="text-gray-500 ml-1">
                  ({product.rating.toFixed(1)})
                </span>
              </p>

              {/* Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="w-full sm:flex-1 px-4 py-2 bg-primary text-white rounded shadow hover:cursor-pointer hover:bg-blue-600 transition">
                  Buy Now
                </button>
                <button className="w-full sm:flex-1 px-4 py-2 border rounded bg-secondary text-white hover:cursor-pointer hover:bg-yellow-500 transition">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

