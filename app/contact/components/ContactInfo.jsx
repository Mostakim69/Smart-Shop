"use client";
import { motion } from "framer-motion";
import React from "react";

export default function ContactInfo() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const infoData = [
    { icon: "📍", text: "123 Street, Dhaka, Bangladesh" },
    { icon: "📧", text: "contact@smartshop.com" },
    { icon: "☎", text: "+880 1234 567890" },
    { icon: "🕐", text: "Mon - Fri: 9am - 6pm" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-secondary/20 to-secondary/40 backdrop-blur-md shadow-lg rounded-2xl p-8 text-gray-800"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-5 text-secondary text-center"
      >
        Contact Information
      </motion.h2>

      <div className="space-y-3">
        {infoData.map((info, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="text-gray-700 text-base flex items-center gap-2 border-b border-gray-200 pb-2"
          >
            <span className="text-lg">{info.icon}</span> {info.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
