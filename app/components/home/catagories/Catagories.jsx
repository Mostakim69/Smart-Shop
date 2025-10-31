"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Note: axios and Link are preserved from your original code, but rely on an external environment (Next.js/Node) to function.
import axios from "axios";
import Link from "next/link";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // NOTE: This API call is left as is, but relies on the external 'axios' library and network access.
  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products?category")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([
          // Mock data for demonstration when API fails or is slow
          {
            _id: "mock1",
            category: "electronics",
            image: "https://placehold.co/80x80/2563eb/ffffff?text=E",
          },
          {
            _id: "mock2",
            category: "clothing",
            image: "https://placehold.co/80x80/0d9488/ffffff?text=C",
          },
          {
            _id: "mock3",
            category: "home+goods",
            image: "https://placehold.co/80x80/f97316/ffffff?text=H",
          },
          {
            _id: "mock4",
            category: "accessories",
            image: "https://placehold.co/80x80/c026d3/ffffff?text=A",
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-base-100">
        {/* Spinner uses 'border-primary' for theme compliance */}
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter out unique categories based on the product list
  const uniqueCategories = Array.from(
    new Map(products.map((p) => [p.category, p])).values()
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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  return (
    // FIX: Removed the JSX comment that was causing the syntax error here.
    <div className="bg-base-100">
      <div className="container mx-auto py-12 px-4 bg-base-100">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            // Heading color changed to solid text-primary for maximum readability in both modes.
            className="text-4xl font-bold text-primary mb-2"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Categories
          </motion.h2>
          <motion.p
            // Description text uses 'text-base-content/80' for muted theme color.
            className="text-lg mx-auto text-base-content/80 max-w-xl"
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
          viewport={{ once: true, margin: "-100px" }}
        >
          {uniqueCategories.map((product, index) => (
            <motion.div
              key={product._id}
              // Card uses 'bg-base-200' and theme-aware border 'border-base-content/20'.
              className="flex flex-col items-center justify-center p-6 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-content/20 overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              {/* The Link component is preserved here */}
              <Link
                key={product._id}
                href={`/products?category=${product.category}`}
              >
                <motion.img
                  src={
                    // Placeholder added using theme color
                    product?.image && product.image.trim() !== ""
                      ? product.image
                      : `https://placehold.co/80x80/2563eb/ffffff?text=${product.category
                          .slice(0, 1)
                          .toUpperCase()}`
                  }
                  alt={product?.name || "Category Image"}
                  className="w-20 h-20 object-contain mb-4"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                />
                <motion.p
                  // Category name uses 'text-base-content' for strong readability.
                  className="text-sm font-semibold text-base-content text-center capitalize tracking-wide mt-2"
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
    </div>
  );
}
