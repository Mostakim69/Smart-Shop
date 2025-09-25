import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Testimonial = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Uddin",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      comment: "The product quality is excellent and delivery was very fast!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sharmin Akter",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      comment: "Customer service is great, really appreciated.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Abdul Karim",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      comment: "Products arrived on time and exactly as described.",
      rating: 4,
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      comment: "The shopping experience was really amazing!",
      rating: 5,
    },
    {
      id: 5,
      name: "Mehedi Hasan",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      comment: "I’m very satisfied with the quality and service. Will order again, Insha’Allah.",
      rating: 4.5,
    },
  ];

  const Stars = ({ rating }) => {
    return (
      <div className="flex justify-center text-yellow-400">
        {Array.from({ length: 5 }, (_, i) => {
          if (rating >= i + 1) return <FaStar key={i} />;
          else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
          else return <FaRegStar key={i} />;
        })}
      </div>
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-black">
                    Customers Reviews
                </h2>
                <p className="text-gray-400 md:text-lg max-w-md mx-auto">
                    Our Customers say about us! 
                </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-1 border-gray-400"
              />
              <h3 className="font-semibold text-lg mb-2 text-black">{review.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{review.comment}</p>
              <Stars rating={review.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
