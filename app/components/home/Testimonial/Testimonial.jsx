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
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      
      comment:
        "Amazing quality! The packaging was premium and the delivery was super fast. Definitely worth it!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sharmin Akter",
      image:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      
      comment:
        "Customer service was very responsive and helpful throughout my order process.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Abdul Karim",
      image:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
     
      comment:
        "The product arrived exactly as shown in the pictures. Smooth checkout and quick delivery.",
      rating: 4,
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      image:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
     
      comment:
        "Loved the experience! The product feels premium and the support team is very kind.",
      rating: 5,
    },
  ];

  const Stars = ({ rating }) => (
    <div className="flex gap-1 text-yellow-400 justify-center mb-2">
      {Array.from({ length: 5 }, (_, i) => {
        if (rating >= i + 1) return <FaStar key={i} />;
        else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
        else return <FaRegStar key={i} />;
      })}
    </div>
  );

  return (
    <section className="py-20 bg-base-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What Customers Are Saying
          </h2>
          <p className="text-gray-500 mt-2 ">
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
              className="bg-base-50 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm mb-4"
                />
                <Stars rating={review.rating} />
                <p className="text-gray-500 text-sm leading-relaxed italic mb-4">
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
