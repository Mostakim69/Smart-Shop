"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageWithMagnify from "./ImageWithMangnify";


export default function MoreProduct({ related }) {
    console.log(related.length)
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const totalPages = Math.ceil(related.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = related.slice(indexOfFirst, indexOfLast);

    return (
        <div className="md:col-span-2 w-full">
            {related?.length > 0 && (
                <div className="mt-6 pb-10 w-full flex flex-col items-center">
                    <h2 className="text-3xl font-semibold mb-8 text-primary text-center">
                        Recommended Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {currentProducts.map((item) => (
                            <Link
                                key={item._id}
                                href={`/products/${item._id}`}
                                className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden"
                            >
                                <div className="relative w-full h-56">
                                    <Image
                                        src={
                                            item?.image?.startsWith("http")
                                                ? item.image
                                                : "/placeholder.png"
                                        }
                                        alt={item.name || "Related Product"}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    
                                </div>

                                <div className="p-4">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-blue-600 font-medium mt-1">${item.price}</p>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}

