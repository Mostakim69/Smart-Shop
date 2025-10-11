"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
                <div className="mt-12 pb-10 w-full flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
                        More Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {currentProducts.map((item) => (
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
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {totalPages >= 1 && (
                <div className="flex justify-center items-center mt-8 gap-3">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-900 rounded-lg hover:bg-black disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(Math.ceil(related.length / productsPerPage))].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "border text-black"
                                : "bg-purple-200 text-black"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
