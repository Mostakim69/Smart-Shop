
import { CartTable } from "@/app/dashboard/user/cart/CartTable";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

// 🧾 Server-side data fetch (you can replace it with DB/API later)
async function getCartItems() {
  return [
    {
      id: 1,
      name: "Bluetooth Speaker",
      price: 40,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1616628188437-6b6d2ad278e0?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Phone Case",
      price: 10,
      qty: 3,
      image:
        "https://images.unsplash.com/photo-1625772452859-3e5d1b68f3cb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Phone BackCover",
      price: 11,
      qty: 5,
      image:
        "https://images.unsplash.com/photo-1612538420207-8d2a7d5a5c52?auto=format&fit=crop&w=400&q=80",
    },
  ];
}

export default async function Page() {
  const cartItems = await getCartItems();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBagIcon className="w-7 h-7 text-primary" /> My Cart
      </h1>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-xl py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <a
            href="/shop"
            className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-4 md:p-6">
          {/* Cart Table (Client Component for interaction) */}
          <CartTable cartItems={cartItems} total={total} />
        </div>
      )}
    </div>
  );
}
