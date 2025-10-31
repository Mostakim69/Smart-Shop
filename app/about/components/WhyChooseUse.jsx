import React from "react";
import { FaUsers, FaDollarSign, FaHeadset, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUsers className="text-5xl text-blue-600 mx-auto" />,
      title: "Expert Team",
      desc: "Our team consists of highly skilled professionals with years of industry experience.",
      
    },
    {
      icon: <FaDollarSign className="text-5xl text-green-600 mx-auto" />,
      title: "Affordable Pricing",
      desc: "Get premium quality services without breaking the bank.",
     
    },
    {
      icon: <FaHeadset className="text-5xl text-purple-600 mx-auto" />,
      title: "24/7 Support",
      desc: "Our support team is available day and night to assist you.",

    },
    {
      icon: <FaStar className="text-5xl text-yellow-500 mx-auto" />,
      title: "High Quality Service",
      desc: "We prioritize excellence in every project we handle.",
    
    },
  ];
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Us</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Discover the key reasons why customers trust us and choose our services over others.
          </p>
        </motion.div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className=" border border-gray-300 p-8 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {feature.icon}
              <h3 className="mt-5 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600">{feature.desc}</p>
              <p className="mt-2 text-gray-500 text-sm">{feature.detail}</p>
            </motion.div>
          ))}
        </div>
        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="px-4 py-3 text-black font-semibold bg-yellow-400 rounded hover:bg-yellow-300 shadow  transition cursor-pointer">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
