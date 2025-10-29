import Image from "next/image";
import { Star } from "lucide-react";
import Quantity from './Quantity';
import MoreProduct from './MoreProduct';
import ProductForDetailsPage from "./ProductsForDetailsPage";
import RatingAndReview from "@/app/components/ratingAndReview/RatingAndReview";
import ImageWithMagnify from "./ImageWithMangnify";

export default function ProductDetails({ product, related }) {
  return (
    <div className="w-full bg-base-100 py-16">
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 my-6 rounded-2xl items-center">

        {/* Image Section */}
        <div className="relative w-full h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-md group cursor-zoom-in">
          <ImageWithMagnify
            src={product.image?.startsWith("http") ? product.image : ""}
            alt={product.name}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-5">
          <p className="text-gray-500 text-sm tracking-wider uppercase">
            [{product?.category}]
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-primary">
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
            <span className="text-2xl font-bold text-primary">
              ${product?.price}
            </span>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <Quantity product={product} />
          </div>
        </div>
      </div>

      {/* Related Sections */}
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        <RatingAndReview product={product} />
        <MoreProduct related={related} />
        <ProductForDetailsPage />
      </div>
    </div>
  );
}
