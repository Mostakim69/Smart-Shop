
import ReviewList from "./ReviewList";

export default async function Page() {
  // Simulate fetching from a DB or API
  const reviews = [
    {
      id: 1,
      product: "Laptop Bag",
      rating: 4,
      comment: "Great quality! Fits my laptop perfectly.",
      date: "Oct 1, 2025",
      user: "Mohammad Shahnowaz",
    },
    {
      id: 2,
      product: "Wireless Mouse",
      rating: 5,
      comment: "Works perfectly, smooth and responsive.",
      date: "Oct 5, 2025",
      user: "Mohammad Shahnowaz",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        ⭐ My Reviews
      </h1>
      <ReviewList initialReviews={reviews} />
    </div>
  );
}
