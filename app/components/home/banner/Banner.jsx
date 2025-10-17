"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import deliveryAnim from "@/public/Shopping.json";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#111827] via-[#1e293b] to-secondary text-white">
      {/* Spotlight effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />

      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        
        {/* Left - Text */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
           <span className="text-yellow-400">SmartShop</span>  — Your Order, Our Priority
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Shop from anywhere — get it delivered everywhere. Track every move, every moment.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.a
              href="/products"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
            <motion.a
              href="/track-order"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Track Order
            </motion.a>
          </motion.div>
        </div>

        {/* Right - Animation with glowing ring */}
        <motion.div
          className="flex-1 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 4, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        >
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full bg-yellow-500/20 blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <div className="w-80  md:w-[380px] z-10">
            <Lottie animationData={deliveryAnim} loop={true} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}




