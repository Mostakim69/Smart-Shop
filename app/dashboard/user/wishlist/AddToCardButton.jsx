"use client";

export function AddToCartButton({ item }) {
  const handleClick = () => alert(`${item.name} added to cart!`);
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  );
}
