"use client";
import { FaStar } from "react-icons/fa";

export default function Rating({ data }) {

  const defaultData = {
    totalReviews: 223,
    averageRating: 3.6,
    ratingBreakdown: [120, 30, 20, 50, 3], // 5 → 1 star
  };

  const { totalReviews, averageRating, ratingBreakdown } = data || defaultData;

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: Average rating summary */}
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-2xl shadow">
        <h2 className="text-5xl font-bold text-gray-800">{averageRating}</h2>
        <div className="flex items-center my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={22}
              className={star <= Math.round(averageRating) ? "text-amber-400" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">{totalReviews} Ratings</p>
      </div>

      {/* Right: Rating breakdown */}
      <div className="col-span-2 flex flex-col justify-center">
        {ratingBreakdown.map((count, i) => {
          const star = 5 - i;
          const percentage = (count / totalReviews) * 100;

          return (
            <div key={star} className="flex items-center gap-2 my-1">
              <span className="w-10 font-semibold">
                {star} <FaStar className="inline text-yellow-400" />
              </span>
              <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                <div
                  className="bg-yellow-400 h-3 rounded transition-all duration-300 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <span className="w-10 text-right font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
