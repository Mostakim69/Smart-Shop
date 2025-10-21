"use client";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <button className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition">
        Track Order
      </button>
      <button className="bg-pink-600 text-white py-3 rounded-lg shadow hover:bg-pink-700 transition">
        Wishlist
      </button>
      <button className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition">
        Write Review
      </button>
      <button className="bg-yellow-500 text-white py-3 rounded-lg shadow hover:bg-yellow-600 transition">
        Update Profile
      </button>
    </div>
  );
}
