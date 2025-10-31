"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

const mockUser = { email: "mock.user@example.com", isLoggedIn: true }; 

// Inline Shopping Cart SVG Icon (replaces GrCart)
const ShoppingCartIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
// --- END MOCKS & UTILITIES ---

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // Replaces react-toastify's toast
  
  // Using the mock user for demonstration purposes
  const user = mockUser; 

  // Fetch Products using native fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://smart-shop-server-three.vercel.app/products");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setMessage("ERROR: Failed to load products. Check console for details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //  Added animation variants 
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
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-base-100">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Slice the first 8 products from the real data
  const featuredProducts = products.slice(0, 8);

  // Add to Cart using native fetch API
  const handleAddToCart = async (product) => {
    if (!user || !user.isLoggedIn) { // Check if user is "logged in" based on mock
      setMessage("ERROR: Please login to add to cart");
      setTimeout(() => setMessage(null), 3000); 
      return;
    }

    const cartItem = {
      userEmail: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    try {
      const response = await fetch(
        "https://smart-shop-server-three.vercel.app/addToCart",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        }
      );
      
      const resData = await response.json();

      if (response.ok && resData?.insertedId) { 
        setMessage(`SUCCESS: ${product.name} added to cart!`);
      } else {
        setMessage("ERROR: Failed to add to cart. Server issue or duplicate item.");
      }
    } catch (err) {
      console.error(err);
      setMessage("ERROR: Failed to connect to the cart service.");
    }
    setTimeout(() => setMessage(null), 3000); // Clear message after 3s
  };

  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        
        {/* Message Alert (Replaces toast) */}
        {message && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`alert ${message.startsWith('ERROR') ? 'alert-error' : 'alert-success'} shadow-lg mb-8 max-w-lg mx-auto`}
                role="alert"
            >
                <div>
                    <span>{message.replace(/(ERROR|SUCCESS): /, '')}</span>
                </div>
            </motion.div>
        )}

        {/* Animated Section Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-primary bg-clip-text"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-base-content/70 mt-2 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Discover our top-featured items curated for you.
          </motion.p>
        </motion.div>

        {/* Animated Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="rounded-xl border border-base-200 bg-base-100 shadow-lg hover:shadow-xl overflow-hidden transition"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              {/* Using standard <a> tag instead of Next/Link */}
              <a href={`/products/${product._id}`} aria-label={`View ${product.name} details`}>
                <div className="relative w-full h-48 bg-base-300"> 
                  {/* Using standard <img> tag instead of Next/Image */}
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : "https://placehold.co/200x200/4ade80/ffffff?text=Placeholder" // Fallback placeholder
                    }
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </a>

              <div className="p-4">
                <a href={`/products/${product._id}`}>
                  <h3 
                    className="inline-block relative text-base-content font-medium text-sm mb-1 
                      hover:text-primary transition-colors duration-200 
                      after:content-[''] after:absolute after:left-0 after:bottom-0 
                      after:w-0 after:h-[1px] after:bg-primary 
                      hover:after:w-full after:transition-all after:duration-300"
                  >
                    {product.name}
                  </h3>
                </a>
                <p className="text-secondary font-bold mt-1">${product.price}</p>

                <div className="flex justify-between mt-3">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="tooltip tooltip-right"
                    data-tip="Add to Cart"
                    aria-label="Add to cart"
                  >
                    <ShoppingCartIcon className="w-6 h-6 text-primary hover:text-secondary hover:cursor-pointer transition-colors" />
                  </button>
                  <a
                    href={`/checkout?type=single&id=${product._id}`}
                    className="px-3 py-1 bg-primary text-primary-content rounded-lg hover:opacity-90 transition font-semibold"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
