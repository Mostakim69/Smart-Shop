// import React from "react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const Testimonial = () => {
//   const reviews = [
//     {
//       id: 1,
//       name: "Rahim Uddin",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "The product quality is excellent and delivery was very fast!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Sharmin Akter",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Customer service is great, really appreciated.",
//       rating: 4.5,
//     },
//     {
//       id: 3,
//       name: "Abdul Karim",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Products arrived on time and exactly as described.",
//       rating: 4,
//     },
//     {
//       id: 4,
//       name: "Nusrat Jahan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "The shopping experience was really amazing!",
//       rating: 5,
//     },
//     {
//       id: 5,
//       name: "Mehedi Hasan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "I’m very satisfied with the quality and service. Will order again, Insha’Allah.",
//       rating: 4.5,
//     },
//   ];

//   const Stars = ({ rating }) => {
//     return (
//       <div className="flex justify-center text-yellow-400">
//         {Array.from({ length: 5 }, (_, i) => {
//           if (rating >= i + 1) return <FaStar key={i} />;
//           else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
//           else return <FaRegStar key={i} />;
//         })}
//       </div>
//     );
//   };

//   return (
//     <section className="py-16">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-10">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-primary">
//                     Customers Reviews
//                 </h2>
//                 <p className="text-gray-400 md:text-lg max-w-md mx-auto">
//                     Our Customers say about us! 
//                 </p>
//             </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {reviews.map((review) => (
//             <div
//               key={review.id}
//               className=" p-6 rounded-xl shadow-2xl flex flex-col items-center text-center hover:shadow-lg transition"
//             >
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-20 h-20 rounded-full object-cover mb-4 border-1 border-gray-400"
//               />
//               <h3 className="font-semibold text-lg mb-2 text-black">{review.name}</h3>
//               <p className="text-gray-600 mb-4 text-sm">{review.comment}</p>
//               <Stars rating={review.rating} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;


// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const Testimonial = () => {
//   const reviews = [
//     {
//       id: 1,
//       name: "Rahim Uddin",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "The product quality is excellent and delivery was very fast!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Sharmin Akter",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Customer service is great, really appreciated.",
//       rating: 4.5,
//     },
//     {
//       id: 3,
//       name: "Abdul Karim",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Products arrived on time and exactly as described.",
//       rating: 4,
//     },
//     {
//       id: 4,
//       name: "Nusrat Jahan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "The shopping experience was really amazing!",
//       rating: 5,
//     },
//     {
//       id: 5,
//       name: "Mehedi Hasan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment:
//         "I’m very satisfied with the quality and service. Will order again, Insha’Allah.",
//       rating: 4.5,
//     },
//   ];

//   const Stars = ({ rating }) => (
//     <div className="flex justify-center text-yellow-400">
//       {Array.from({ length: 5 }, (_, i) => {
//         if (rating >= i + 1) return <FaStar key={i} />;
//         else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
//         else return <FaRegStar key={i} />;
//       })}
//     </div>
//   );

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             What Our Customers Say
//           </h2>
//           <p className="text-gray-500 mt-2">Real feedback from real people ❤️</p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {reviews.map((review) => (
//             <motion.div
//               key={review.id}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="bg-white/60 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300"
//             >
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-4 border-white shadow-md"
//               />
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                 {review.name}
//               </h3>
//               <Stars rating={review.rating} />
//               <p className="text-gray-600 text-sm mt-3 leading-relaxed">
//                 “{review.comment}”
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;



// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const Testimonial = () => {
//   const reviews = [
//     {
//       id: 1,
//       name: "Rahim Uddin",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment:
//         "SmartShop provides excellent product quality and fast delivery. Highly recommended!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Sharmin Akter",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Very responsive customer support and smooth shopping experience.",
//       rating: 4.5,
//     },
//     {
//       id: 3,
//       name: "Abdul Karim",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "Delivered on time and the products were exactly as described.",
//       rating: 4,
//     },
//     {
//       id: 4,
//       name: "Nusrat Jahan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment: "The overall experience was smooth and professional.",
//       rating: 5,
//     },
//     {
//       id: 5,
//       name: "Mehedi Hasan",
//       image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//       comment:
//         "Very satisfied with the service quality. I’ll definitely shop again.",
//       rating: 4.5,
//     },
//   ];

//   const Stars = ({ rating }) => (
//     <div className="flex justify-center gap-1 text-yellow-400">
//       {Array.from({ length: 5 }, (_, i) => {
//         if (rating >= i + 1) return <FaStar key={i} />;
//         else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
//         else return <FaRegStar key={i} />;
//       })}
//     </div>
//   );

//   return (
//     <section className="py-20 bg-base-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <h2 className="text-3xl md:text-4xl font-bold text-primary">
//             What Our Customers Say
//           </h2>
//           <p className="text-gray-500 mt-2 text-base">
//             Hear from people who love shopping with us.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
//           {reviews.map((review) => (
//             <motion.div
//               key={review.id}
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <img
//                   src={review.image}
//                   alt={review.name}
//                   className="w-16 h-16 rounded-full mb-4 object-cover border border-gray-300"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   {review.name}
//                 </h3>
//                 <Stars rating={review.rating} />
//                 <p className="text-gray-600 text-sm mt-4 leading-relaxed">
//                   “{review.comment}”
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;


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
