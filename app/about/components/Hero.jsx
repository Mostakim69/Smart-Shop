import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered E-Commerce Sales Predictor & Inventory Optimizer
        </motion.h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Predict demand trends with AI, manage your inventory smartly, and maximize sales efficiency.
        </p>
      </div>
    </section>
  );
}
