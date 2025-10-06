'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useCart } from "@/context/CartContext";
// import toast from "react-hot-toast";

export default function FeaturedProducts() {

  const [products, setProducts] = useState([]);
  // const router = useRouter();
  // const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const featured = products.slice(0, 8);

  // const handleAddToCart = (product) => {
  //   const quantity = 1;
  //   addToCart({ ...product, quantity });
  //   toast.success(`${product.name} added to cart!`);
  //   setTimeout(() => {
  //     router.push("/cart");
  //   }, 2000);
  // };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
    hover: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 text-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Products
        </motion.h2>
        <motion.p
          className="text-base md:text-lg max-w-md mx-auto text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Check & Get Your Desired Product!
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {featured.map(product => (
          <motion.div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
                {product.save}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-sm mb-1">{product.name}</h3>
              <div className="text-blue-600 font-bold text-sm mb-2">
                {product.price}{' '}
                <span className="text-gray-500 line-through text-xs">{product.price}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  // onClick={() => handleAddToCart(product)}
                  className="flex-1 cursor-pointer bg-primary text-white py-2 rounded ">
                  Add to Cart
                </button>
                <button className="flex-1 cursor-pointer bg-secondary text-white py-2 rounded ">
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
