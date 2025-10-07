"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
// import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);

  const router = useRouter();
  // const { addToCart } = useCart();

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await axios.get("https://smart-shop-server-three.vercel.app/products");
        const filtered = res.data
          .filter(
            (item) =>
              item.category?.toLowerCase() === product?.category?.toLowerCase() &&
              item._id !== product?._id
          )
          .slice(0, 3);
        setRelated(filtered);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }
    if (product?.category) fetchRelated();
  }, [product]);

  const handleAddToCart = (product) => {
    // addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      router.push("/cart");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 border my-6 rounded-2xl bg-gray-50 items-center">
      {/* Image Section */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "Product Image"}
          fill
          className="object-cover"
        />
      </div>

      {/*  Content Section */}
      <div className="space-y-5">
        <p className="text-gray-500 text-sm tracking-wider uppercase">
          [{product?.category}]
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          {product?.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {Array(5)
            .fill()
            .map((_, i) => (
              <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
            ))}
          <span className="text-sm text-gray-500 ml-2">(546 Reviews)</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-[15px]">
          {product?.description}
        </p>

        {/*  Price */}
        <div>
          <span className="text-2xl font-bold text-gray-900">
            ${product?.price}
          </span>
        </div>

        {/* Quantity & Buttons */}
        <div className="flex items-center gap-6 mt-6">
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

          <button
            // onClick={() => handleAddToCart(product)}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer"
          >
            Add to Cart
          </button>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-20 md:col-span-2 w-full">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
            More Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/product/${item._id}`}
                className="group block bg-white rounded-2xl shadow-md border hover:shadow-xl transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden">

                  <img
                    src={
                      typeof item.image === "string" && item.image.startsWith("http")
                        ? item.image
                        : "/placeholder.png"
                    }
                    alt={item.name || "Related Product"}
                  
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Compact card content */}
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-medium mt-1">${item.price}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
