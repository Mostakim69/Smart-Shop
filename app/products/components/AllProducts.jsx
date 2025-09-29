"use client";
import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);


  useEffect(() => {
    axios.get('https://smart-shop-server-three.vercel.app/products')
      .then(res => {
        setProducts(res.data);
      })
  }, []);


  const handleSearch = async (e) => {
    const name = e.target.value;
    const res = await axios.get(`https://smart-shop-server-three.vercel.app/products?name=${name}`)
      .then(res => {
        setProducts(res.data);
        setCurrentPage(1);
      }).catch(err => {
        alert(err)
      })
  }

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          All Products
        </h2>
        {/* Search Box */}
        <input onChange={handleSearch}
          type="text"
          placeholder="Search by name"
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          currentProducts?.map((product) => (
            <Link
              href={`products/${product._id}`}
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.save}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-500 font-medium text-sm mb-1">
                  {product.name}
                </h3>
                <div className="text-blue-600 font-bold text-sm mb-2">
                  {product.price}{" "}
                  <span className="text-gray-500 line-through text-xs">
                    {product.origPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button className="flex space-x-2">
                    <GrCart className="w-6 h-6 text-blue-600 " />
                    <FaRegHeart className="w-6 h-6 text-purple-500" />

                  </button>
                  <button
                    className="text-md py-1 px-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-500 hover:to-purple-500 text-white  rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
