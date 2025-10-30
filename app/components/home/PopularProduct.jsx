"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrCart } from "react-icons/gr";

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("https://smart-shop-server-three.vercel.app/products");
        setProducts(res.data);
        setFiltered(res.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFiltered(products.slice(0, 4));
    } else {
      const filteredItems = products
        .filter((item) => item.category.toLowerCase() === category.toLowerCase())
        .slice(0, 4);
      setFiltered(filteredItems);
    }
  };

  //  Add to Cart
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

  //  Animation Variants
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
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Popular Products
          </motion.h2>
          <motion.p
            className="text-base-content/80 mt-2 text-sm sm:text-base"
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
          {["All", "Electronics", "Fashion", "Grocery", "Sports", "Home", "Toys"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 rounded transition cursor-pointer font-medium text-sm
                ${selectedCategory === cat
                  ? "bg-secondary text-secondary-content shadow-md"
                  : "border border-base-content/20 text-primary hover:bg-base-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filtered.map((product) => (
            <motion.div
              key={product._id}
              className="bg-base-200 border border-base-content/10 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
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
                  <h3
                    className="inline-block relative text-base-content font-medium text-sm mb-1
                    hover:text-primary transition-colors duration-200
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-0 after:h-[1px] after:bg-primary
                    hover:after:w-full after:transition-all after:duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-secondary font-bold mt-1">${product.price}</p>

                <div className="flex justify-between mt-3">
                  <button onClick={() => handleAddToCart(product)}>
                    {/* USAGE UPDATED to CartIcon */}
                  
                  </button>
                  <Link
                    href={`/checkout?type=single&id=${product._id}`}
                    className="btn btn-primary btn-sm rounded-lg"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


