"use client";

import { useState } from "react";
import axios from "axios";
import { LifebuoyIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // 🔹 if you have AuthContext

export default function SupportSection() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/support", {
        ...formData,
        email: user?.email || formData.email,
      });
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("❌ Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Need Help?</h2>
          <p className="text-indigo-100 mt-1">
          Contact our support team for assistance with orders, refunds, account issues, or any other queries.          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-3 lg:mt-0 bg-white text-indigo-600 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-2"
        >
          <LifebuoyIcon className="w-5 h-5" />
          Contact Support
        </button>
      </div>

      {/* Modal with animation */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-gray-800 p-6 rounded-xl shadow-2xl w-11/12 md:w-1/3 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Contact Support
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Please describe your issue below, and our support team will get back to you soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                />

                <input
                  name="email"
                  type="email"
                  value={user?.email || formData.email}
                  readOnly={!!user?.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 ${
                    user?.email ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="4"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
