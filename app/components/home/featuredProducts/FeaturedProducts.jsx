'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturedProducts() {
  const products = [
    {
      id: 1, name: 'TV 43" Class TU7000 Series Crystal UHD 4K Smart TV',
      price: '$599.00', origPrice: '$678.95', save: '$80 (5%)',
      img: 'https://i.ibb.co.com/LzdM1Qns/32-inch-android-led-tv-612.jpg'
    },
    {
      id: 2, name: 'EARBUDS Apple AirPods 3rd generation with Charging Case', 
      price: '$170.00', origPrice: '$250.00', save: '$80 (10%)',
      img: 'https://i.postimg.cc/jdxqWqWN/25baefac5d2a64cff300295923077243.jpg'
    },
    {
      id: 3, name: 'GAMING CONSOLE Apple Mac Mini M4 Chip 16/512GB Silver (10C CPU 10...)',
      price: '$666.00', origPrice: '$750.00', save: '$84 (10%)',
      img: 'https://i.postimg.cc/gk2dzM5H/c2dee5d94568d5f8415e1de463039aa2.jpg'
    },
    {
      id: 4, name: 'GAMING CONSOLE Apple MacBook Pro 16 in M4 Pro Chip Liquid Retina',
      price: '$3,759.00', origPrice: '$4,434.90', save: '$675 (10%)',
      img: 'https://i.postimg.cc/wv2Pnz68/1480ac68643aad7626f6084589292944.jpg'
    },
    {
      id: 5, name: 'Product 5',
      price: '$199.00', origPrice: '$250.00', save: '$51 (10%)',
      img: 'https://i.ibb.co.com/kgQHjkfB/Apple-i-Phone-17-Pro-Max.png'
    },
    {
      id: 6, name: 'Product 6',
      price: '$299.00', origPrice: '$350.00', save: '$51 (10%)',
      img: 'https://i.ibb.co.com/T9gR2Ks/foodela-baglamoti-rice.jpg'
    },
    {
      id: 7, name: 'Product 7',
      price: '$499.00', origPrice: '$550.00', save: '$51 (10%)',
      img: 'https://i.ibb.co.com/LzdM1Qns/32-inch-android-led-tv-612.jpg'
    },
    {
      id: 8, name: 'Product 8',
      price: '$699.00', origPrice: '$750.00', save: '$51 (10%)',
      img: 'https://i.ibb.co.com/GQZyX8gh/497-4972831-transparent-leather-jacket-png-cute-red-leather-jacket.png'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
    hover: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 text-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Products
        </motion.h2>
        <motion.p
          className="text-base md:text-lg max-w-md mx-auto text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Check & Get Your Desired Product!
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {products.map(product => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
                {product.save}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-sm mb-1">{product.name}</h3>
              <div className="text-blue-600 font-bold text-sm mb-2">
                {product.price}{' '}
                <span className="text-gray-500 line-through text-xs">{product.origPrice}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 cursor-pointer bg-primary text-white py-2 rounded ">
                  Add to Cart
                </button>
                <button className="flex-1 cursor-pointer bg-secondary text-white py-2 rounded ">
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
