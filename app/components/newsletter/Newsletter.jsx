"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribed Email:", email);
    setEmail("");
  };

  return (
    <section className="bg-base-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Outer Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl shadow-lg bg-base-50 backdrop-blur-md border border-gray-200 p-10 md:p-14"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Mail className="text-primary w-8 h-8" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-3">
            Stay in the Loop with <span className="text-primary">SmartShop</span>!
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Get exclusive deals, new product alerts, and special offers straight to your inbox. 
            Join thousands of happy shoppers!
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-5 py-3.5 text-gray-500 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-secondary to-primary shadow-md hover:shadow-lg transition-all hover:cursor-pointer"
            >
              Subscribe
            </motion.button>
          </form>

          {/* Privacy Note */}
          <p className="text-sm text-gray-400 mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
