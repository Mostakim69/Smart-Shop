import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://i.postimg.cc/3r6ytnVK/c17cceb7a381cb44146b5e5c7ceedfa6.jpg" className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
            </div>

            <motion.div
                className="relative z-10 text-center max-w-4xl px-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                    Empowering Businesses with <span className="text-indigo-400">AI-Driven Solutions</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                    We're passionate about bringing you the best shopping experience with quality products, exceptional service, and unbeatable prices. Discover why millions trust us for their shopping needs.
                </p>
            </motion.div>
        </section>
    );
}
