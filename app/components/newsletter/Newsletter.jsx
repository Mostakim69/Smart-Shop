"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real application, you would send this to your backend service
    console.log("Subscribed Email:", email);
    
    // Optionally display a success message here
    setEmail("");
  };

  return (
    // FIX: Set background to the slightly darker base-200 for better contrast against the main page/card
    <section className="bg-base-200 py-20"> 
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Outer Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // FIX: Use theme-aware classes for the card container
          className="rounded-3xl shadow-2xl bg-base-100/90 backdrop-blur-sm border border-base-content/10 p-10 md:p-14"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            {/* FIX: Use theme-aware primary/secondary colors for consistent branding */}
            <div className="bg-secondary/10 p-3 rounded-full">
              <Mail className="text-secondary w-8 h-8" />
            </div>
          </div>

          {/* Heading */}
          {/* FIX: Use text-base-content for the primary text color */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Stay in the Loop with <span className="text-primary">SmartShop</span>!
          </h2>
          {/* FIX: Use text-base-content/80 for descriptive text */}
          <p className="text-base-content/80 mb-8 max-w-xl mx-auto">
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
              // FIX: Input styling is now theme-aware
              className="w-full sm:w-2/3 px-5 py-3.5 
                         text-base-content 
                         bg-base-100 
                         border border-base-content/30 
                         placeholder:text-base-content/50 
                         rounded-xl 
                         focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              // Button is fine, using primary/secondary gradient
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-secondary to-primary shadow-lg hover:shadow-xl transition-all hover:cursor-pointer"
            >
              Subscribe
            </motion.button>
          </form>

          {/* Privacy Note */}
          {/* FIX: Use text-base-content/50 for subtle footnote text */}
          <p className="text-sm text-base-content/50 mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
