"use client";

import { StarIcon } from "@heroicons/react/24/solid";

export default function Reviews({ userReviews }) {
  if (!userReviews || userReviews.length === 0)
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Reviews</h2>
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Reviews</h2>
      <div className="space-y-4">
        {userReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800">{review.product}</h3>
            <div className="flex items-center mt-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
