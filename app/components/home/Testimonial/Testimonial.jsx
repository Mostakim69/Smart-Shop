"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Testimonial = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Uddin",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      
      comment:
        "Amazing quality! The packaging was premium and the delivery was super fast. Definitely worth it!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sharmin Akter",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      
      comment:
        "Customer service was very responsive and helpful throughout my order process.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Abdul Karim",
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      
      comment:
        "The product arrived exactly as shown in the pictures. Smooth checkout and quick delivery.",
      rating: 4,
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      image:
        "https://plus.unsplash.com/premium_photo-1681486778237-af14e624069d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      
      comment:
        "Loved the experience! The product feels premium and the support team is very kind.",
      rating: 5,
    },
  ];

  const Stars = ({ rating }) => (
    // Stars color remains fixed to yellow-400 for universal recognition
    <div className="flex gap-1 text-yellow-400 justify-center mb-2">
      {Array.from({ length: 5 }, (_, i) => {
        if (rating >= i + 1) return <FaStar key={i} />;
        else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
        else return <FaRegStar key={i} />;
      })}
    </div>
  );

  return (
    // Theme update: Changed bg-base-50 to theme-aware bg-base-100
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What Customers Are Saying
          </h2>
          {/* Theme update: Changed text-gray-500 to theme-aware text-base-content/80 */}
          <p className="text-base-content/80 mt-2 ">
            Real reviews from verified shoppers around the country.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              // Theme update: Changed bg-base-50 to bg-base-200 and border-gray-200 to border-base-content/10
              className="bg-base-200 backdrop-blur-md border border-base-content/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  // Theme update: Changed border-gray-300 to theme-aware border-base-content/30
                  className="w-20 h-20 rounded-full object-cover border border-base-content/30 shadow-sm mb-4"
                />
                <Stars rating={review.rating} />
                {/* Theme update: Changed text-gray-500 to theme-aware text-base-content/80 */}
                <p className="text-base-content/80 text-sm leading-relaxed italic mb-4">
                  “{review.comment}”
                </p>
                <h3 className="font-semibold text-primary text-lg">
                  {review.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
