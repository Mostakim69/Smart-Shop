// // Banner.jsx
// export default function Banner() {
//   return (
//     // <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white">
//     <section className="relative bg-gradient-to-r from-[#111827] to-secondary text-white">
//       <div className="container mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center gap-10">
        
//         {/* Left Content */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Welcome to <span className="text-yellow-300">SmartShop</span>
//           </h1>
//           <p className="mt-4 text-lg md:text-xl text-gray-100">
//             Discover the best deals on electronics, fashion, and more.  
//             Shop smart, shop fast, shop with us!
//           </p>
//           <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <a
//               href="#shop"
//               className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
//             >
//               Start Shopping
//             </a>
//             <a
//               href="#about"
//               className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-[##f59e0b] transition"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex-1 flex justify-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
//             alt="Shopping Banner"
//             className="w-72 md:w-96 drop-shadow-xl animate-bounce-slow"
//           />
        
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-[#111827] to-secondary text-white">
      <div className="container mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to <span className="text-yellow-300">SmartShop</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover the best deals on electronics, fashion, and more.  
            Shop smart, shop fast, shop with us!
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="#shop"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
            <motion.a
              href="#about"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-[#f59e0b] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="Shopping Banner"
            className="w-72 md:w-96 drop-shadow-xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}



