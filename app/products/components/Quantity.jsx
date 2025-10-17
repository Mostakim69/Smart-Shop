"use client";
import { useState } from "react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Quantity({ product }) {

  const { user } = useAuth();


  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // const handleAddToCart = () => {
  //   toast.success(`${product.name} added to cart!`);
  //   setTimeout(() => router.push("/cart"), 2000);
  // };

    const handleAddToCart = async (product) => {
      const cartItem = {
        userEmail: user?.email,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
  
      axios.post("https://smart-shop-server-three.vercel.app/addToCart", cartItem)
        .then(res => {
          if (res.data?.insertedId) {
            toast.success("Added to cart");
          }
        })
        .catch(err => console.log(err));
      console.log(cartItem);
    };

  return (
    <div className="flex items-center gap-6 mt-4">
      <div className="flex items-center border border-gray-500 rounded-lg">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-lg text-gray-600"
        >
          -
        </button>
        <span className="px-4 py-2 text-black">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 text-lg text-gray-600"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <div className="flex  sm:flex-row justify-center lg:justify-start gap-3 w-full lg:w-auto">
        <button
          onClick={() => handleAddToCart(product)}
          className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer"
        >
          Add to Cart
        </button>
        <Link href={`/checkout?type=single&id=${product._id}`} className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer">
          Buy Now
        </Link>
      </div>
      <ToastContainer />
    </div>

  );
}
