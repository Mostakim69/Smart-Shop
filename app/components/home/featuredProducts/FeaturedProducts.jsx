"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrCart } from "react-icons/gr";
import { motion } from "framer-motion"; 

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

  //  Added animation variants 
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
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Animated Section Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-2 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Discover our top-featured items curated for you.
          </motion.p>
        </motion.div>

        {/* Animated Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="rounded-xl border border-gray-50 shadow-md hover:shadow-xl overflow-hidden transition"
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
                  <h3 className="inline-block relative text-gray-500 font-medium text-sm mb-1 
               hover:text-blue-600 transition-colors duration-200 
               after:content-[''] after:absolute after:left-0 after:bottom-0 
               after:w-0 after:h-[1px] after:bg-blue-600 
               hover:after:w-full after:transition-all after:duration-300">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

