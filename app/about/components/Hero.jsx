import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gray-900 py-12">
      <div className="absolute inset-0">
        <img
          src="https://i.postimg.cc/3r6ytnVK/c17cceb7a381cb44146b5e5c7ceedfa6.jpg"
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
        {/* Text */}
        <motion.div
          className="flex-1 text-white text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            About <span className="text-indigo-400">Smart Shop</span> shopping
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Experience the best shopping with high-quality products, fast and reliable service, and unbeatable prices. Millions trust us for a reason.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="https://i.postimg.cc/3r6ytnVK/c17cceb7a381cb44146b5e5c7ceedfa6.jpg"
            alt="Smart Shop"
            className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
