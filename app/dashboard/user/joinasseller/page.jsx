"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // adjust path to your auth context
import axios from "axios";

export default function JoinRequestPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    role: "seller",
    reason: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://smart-shop-server-three.vercel.app/api/join-request", {
        name: user?.displayName,
        email: user?.email,
        ...formData,
      });
      alert("Your request has been submitted successfully!");
    } catch (err) {
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          Apply to Join Smart Shop
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={user?.displayName || ""}
            disabled
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Choose Your Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
          >
            <option value="seller">Seller</option>
            <option value="delivery">Delivery Man</option>
          </select>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
            required
          />
        </div>

        {/* Reason */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Why do you want to join?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Explain your motivation briefly..."
            rows="4"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-secondary text-white font-semibold hover:bg-secondary-100 transition cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
