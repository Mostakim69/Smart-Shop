import Link from "next/link";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AddToCartButton } from "./AddToCardButton";


async function getWishlist() {
  return [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$50",
      image:
        "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$90",
      image:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80",
    },
  ];
}

export default async function Page() {
  const wishlist = await getWishlist();

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">💖 My Wishlist</h1>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="text-center py-12 bg-white shadow-md rounded-xl">
          <HeartIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          <Link
            href="/shop"
            className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 group"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Delete Button */}
                <form
                  action={`/dashboard/user/wishlist/remove/${item.id}`}
                  method="post"
                >
                  <button
                    type="submit"
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
                    title="Remove from Wishlist"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </form>
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition">
                  {item.name}
                </h3>
                <p className="text-gray-600 font-medium mt-1">{item.price}</p>

                <div className="mt-4 flex justify-center gap-3">
                  <AddToCartButton item={item} />
                  <Link
                    href={`/dashboard/user/product/${item.id}`}
                    className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
