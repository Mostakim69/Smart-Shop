"use client";
import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentFail() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-rose-200 to-pink-300 text-gray-800 px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <XCircle className="w-24 h-24 text-red-600 drop-shadow-lg" />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl font-extrabold mb-3 text-red-700"
      >
        Payment Failed
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-gray-700 mb-8 text-center max-w-md"
      >
        Unfortunately, your payment could not be completed. Please try again or
        contact our support team if the issue persists.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex gap-4"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition duration-300"
        >
          Back to Home
        </Link>
        <Link
          href="/checkout"
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-300"
        >
          Try Again
        </Link>
      </motion.div>
    </div>
  );
}
