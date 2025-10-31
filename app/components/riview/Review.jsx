"use client";
import { FaStar } from "react-icons/fa";

export default function Reviews({ reviews }) {
  const defaultReviews = [
    {
      id: 1,
      name: "Abdullah S.",
      verified: true,
      rating: 5,
      date: "29 Jul 2024",
      text: "প্রোডাক্টের মান এবং কোয়ালিটি দুইটাই এক কথায় অসাধারণ। সেলার খুবই আন্তরিক এবং সক্র।",
      images: ["https://i.postimg.cc/R0x152Q2/infino-photography-KjsRBYfj9hA-unsplash.jpg"],
      likes: 10,
      sellerResponse: null,
    },
    {
      id: 2,
      name: "T***",
      verified: true,
      rating: 5,
      date: "12 Aug 2023",
      text: "valo ase ... original tai paise.. apnara sobai nite prn.. packaging ta arektu better hoya drkar selo",
      images: [
        "https://i.ibb.co/example2.jpg",
        "https://i.ibb.co/example3.jpg",
      ],
      likes: 6,
      sellerResponse:
        "Dear customer, We would like to thank you for shopping with us. Our customers also order all their monthly groceries from the comfort of their homes at lower prices from Daraz. Currently, 'Nestle Brand' is offering you up to a 20% discount on their products. Why not make your basket?",
    },
  ];

  const allReviews = reviews || defaultReviews;

  return (
    <div className="space-y-6">
      {allReviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-xl shadow">
          {/* Rating and Name */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="font-semibold">{review.name}</span>
              {review.verified && (
                <span className="text-xs text-green-600 font-medium ml-2">
                  Verified Purchase
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 mb-2">{review.text}</p>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mb-2">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="review"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}

          {/* Likes */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>👍 {review.likes}</span>
          </div>

          {/* Seller Response */}
          {review.sellerResponse && (
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 border-l-2 border-red-500">
              <span className="font-medium text-red-600">Seller Response:</span>{" "}
              {review.sellerResponse}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
