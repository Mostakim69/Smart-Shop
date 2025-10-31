"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock implementation of a message system for the clipboard function
const useNotification = () => {
  const [notification, setNotification] = useState({});

  const showNotification = (id, message) => {
    setNotification(prev => ({ ...prev, [id]: message }));
    setTimeout(() => {
      setNotification(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 1500);
  };
  return { notification, showNotification };
};

export default function App() {
  const { notification, showNotification } = useNotification();

  // Updated the 'bg' property to use DaisyUI semantic colors and ensure contrast
  const offers = [
    {
      id: 1,
      title: "GIFT COUPON",
      code: "SPECIALGIFT",
      discount: "$70 OFF",
      // Theme-adaptive Primary color for standout offer
      bg: "bg-primary text-primary-content",
      label: "SPECIAL DISCOUNT",
      description:
        "Get an instant $70 off on your next purchase over $250. Shop your favorite items and save more today!",
    },
    {
      id: 2,
      title: "SPECIAL OFFER",
      code: "HALFOFF",
      discount: "50% OFF",
      // Theme-adaptive Neutral (dark/high-contrast) color
      bg: "bg-neutral text-neutral-content",
      label: "DISCOUNT COUPON",
      description:
        "Enjoy 50% off on all fashion and lifestyle products. Limited-time deal — don’t miss out!",
    },
    {
      id: 3,
      title: "MEGA DEAL",
      code: "SAVE30",
      discount: "30% OFF",
      // Theme-adaptive Accent color for differentiation
      bg: "bg-accent text-accent-content",
      label: "LIMITED OFFER",
      description:
        "Get 30% off electronics and accessories. Upgrade your tech and save with this exclusive offer.",
    },
  ];

  // Function to copy the code to the clipboard
  const handleCopy = (code, id) => {
    // Fallback method for iFrame environment
    const tempInput = document.createElement('textarea');
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    showNotification(id, "Copied!");
  };

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
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Special Offers & Coupons
          </h2>
          <p className="text-base-content/80 mt-2 text-lg">
            Unlock exclusive discounts and make your shopping experience smarter and more rewarding.
          </p>
        </div>

        {/* Coupons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              className={`relative flex items-stretch rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition duration-300 ${offer.bg}`}
              variants={cardVariants}
            >
              {/* Left Strip (Thematically colored background) */}
              <div className="w-1/4 h-auto flex flex-col justify-center items-center py-6 relative">
                {/* Border color uses 'current' color, which is set by the text color of the offer, ensuring contrast */}
                <div className="absolute right-0 top-0 bottom-0 border-r border-dashed border-current opacity-60"></div>
                <span className="text-sm font-bold uppercase tracking-widest rotate-180 [writing-mode:vertical-rl] opacity-90">
                  {offer.label}
                </span>
              </div>

              {/* Right Content (Thematically colored base background) */}
              <div className="flex-1 bg-base-100 text-base-content p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1 text-primary">{offer.title}</h3>
                  <p className="text-5xl font-extrabold mb-4 leading-none text-secondary">
                    {offer.discount}
                  </p>
                  <p className="text-sm mb-1 font-medium text-base-content/80">Promo Code:</p>
                </div>
                
                <div className="flex items-center justify-between gap-3">
                  {/* Coupon Code Box */}
                  <div className="flex-1 flex items-center justify-center border border-base-content/40 bg-base-200 px-4 py-3 rounded-lg font-mono text-lg font-semibold cursor-pointer relative transition">
                    {offer.code}
                    {/* Copy Success Message */}
                    {notification[offer.id] && (
                      <span className="absolute -top-6 right-0 text-success text-xs font-bold animate-pulse">
                        {notification[offer.id]}
                      </span>
                    )}
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(offer.code, offer.id)}
                    className="btn btn-sm btn-primary btn-outline text-sm rounded-lg flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>

                <p className="text-xs mt-4 text-base-content/70 leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
