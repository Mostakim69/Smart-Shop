"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How long does it take to get a reply?",
      answer: "Usually within 24-48 business hours.",
    },
    {
      question: "Do you offer support 24/7?",
      answer: "No, our support team is available Monday to Friday, 9am - 6pm.",
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order is shipped, you’ll receive a tracking link via email.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and mobile payments.",
    },
    {
      question: "Can I return a product?",
      answer: "Yes, returns are accepted within 14 days of purchase with original packaging.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
          >
            <summary
              className="cursor-pointer font-semibold text-gray-800 text-lg md:text-xl list-none"
              onClick={() => toggleFAQ(i)}
            >
              {faq.question}
            </summary>

            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 text-gray-600 text-base md:text-lg"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
