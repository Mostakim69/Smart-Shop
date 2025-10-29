"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  // Input animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 space-y-6"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        className="w-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6"
      >
        {[
          {
            label: "Full Name",
            name: "name",
            type: "text",
            placeholder: "Enter your name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            label: "Subject",
            name: "subject",
            type: "text",
            placeholder: "Enter subject",
          },
        ].map((field, i) => (
          <motion.div key={field.name} variants={fadeUp} custom={i}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition-all duration-200"
            />
          </motion.div>
        ))}

        <motion.div variants={fadeUp} custom={3}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition-all duration-200"
          ></textarea>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
