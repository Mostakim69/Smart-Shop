import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Quantity from './Quantity';
import MoreProduct from './MoreProduct';
// import RatingAndReview from "@/app/components/ratingAndReview/RatingAndReview";

export default function ProductDetails({ product, related }) {
  return (
    <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 border my-6 rounded-2xl bg-gray-50 items-center">
      {/* Image Section */}
      <div className="relative w-full h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
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

        <div className="flex items-center gap-6 mt-6">
          <Quantity product={product} />
        </div>

      </div>
      <MoreProduct related={related} />
      {/* <RatingAndReview product={product}></RatingAndReview> */}
    </div>
  );
}

