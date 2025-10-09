'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from "next/link";

export default function Categories() {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get('https://smart-shop-server-three.vercel.app/products?category')
      .then(res => {
        setProducts(res.data);
         setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
         setLoading(false)
      });
  }, []);

   if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
   const uniqueCategories = Array.from(
    new Map(products.map(p => [p.category, p])).values()
  );

  // Staggered animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
  };

   


  return (
    <div className="container mx-auto py-12 px-4">
      {/* Heading */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl font-bold text-primary mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Featured Categories
        </motion.h2>
        <motion.p
          className="text-lg mx-auto text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover and shop from our curated selection of products.
        </motion.p>
      </motion.div>

      {/* Grid with animation */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 cursor-pointer gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {uniqueCategories.map((product, index) => (
          <motion.div
            key={product._id}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-300 overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >

            <Link
              key={product._id}
              href={`/products?category=${product.category}`}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-contain mb-4"
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              />
              <motion.p
                className="text-sm font-semibold text-gray-700 text-center capitalize tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {product.category}
              </motion.p>
            </Link>

          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

