import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Quantity from './Quantity';

export default function ProductDetails({ product, related }) {
  return (
    <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 border my-6 rounded-2xl bg-gray-50 items-center">
      {/* Image Section */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={
            product?.image?.startsWith("http")
              ? product.image
              : "/placeholder.png"
          }
          alt={product?.name || "Product Image"}
          width={600}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Content Section */}
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

        <p className="text-gray-600 leading-relaxed text-[15px]">
          {product?.description}
        </p>

        <div>
          <span className="text-2xl font-bold text-gray-900">
            ${product?.price}
          </span>
        </div>

        {/* Non-interactive buttons */}
        <div className="flex items-center gap-6 mt-6">
          <Quantity product={product} />
        </div>
      </div>

      {/* Related Section */}
      {related?.length > 0 && (
        <div className="mt-20 md:col-span-2 w-full">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
            More Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/product/${item._id}`}
                className="group block bg-white rounded-2xl shadow-md border hover:shadow-xl transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={
                      item?.image?.startsWith("http")
                        ? item.image
                        : "/placeholder.png"
                    }
                    alt={item.name || "Related Product"}
                    width={400}
                    height={300}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
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

