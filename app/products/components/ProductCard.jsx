// "use client";
// import Image from "next/image";

// export default function ProductCard({ product }) {
//   return (
//     <div className="max-w-sm mx-auto my-8 bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-gray-200">
//       {/* Image */}
//       <div className="relative w-full h-64">
//         {product?.image ? (
//           <Image
//             src={product.image}
//             alt={product?.name || "No image"}
//             fill
//             className="object-cover rounded"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold text-primary">{product?.name}</h2>
//         <p className="text-gray-600 text-sm mt-2 line-clamp-3">
//           {product?.description}
//         </p>

//         {/* Price */}
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-lg font-bold text-secondary">
//             ৳ {product?.price}
//           </span>
//           <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition">
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 border my-6 rounded-2xl bg-gray-50 items-center">
      {/* Image Section */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "Product Image"}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-5">
        <p className="text-gray-500 text-sm tracking-wider uppercase">
          [{product?.category}]
        </p>

        <h1 className="text-3xl md:text-4xl  font-semibold text-gray-900">
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

        {/* Price */}
        <div>
          <span className="text-2xl font-bold text-gray-900">
            ৳ {product?.price}
          </span>
   
        </div>

        {/* Quantity + Buttons */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center border border-gray-500 rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(0, q - 1))}
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

          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer">
            Add to Cart
          </button>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all hover:cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

