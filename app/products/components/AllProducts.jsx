"use client";
import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const router = useRouter();
  // const { addToCart } = useCart();

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  // Load products
  useEffect(() => {
    axios
      .get("https://smart-shop-server-three.vercel.app/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Search
  const handleSearch = async (e) => {
    const name = e.target.value;
    try {
      const res = await axios.get(
        `https://smart-shop-server-three.vercel.app/products?name=${name}`
      );
      setProducts(res.data);
      setCurrentPage(1);
    } catch (err) {
      alert(err);
    }
  };

  // Add to cart
  // const handleAddToCart = (product) => {
  //   addToCart(product);
  //   toast.success(`${product.name} added to cart!`);
  //   setTimeout(() => {
  //     router.push("/cart");
  //   }, 2000);
  // };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />

      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          All Products
        </h2>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search products..."
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* Products Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image  */}
            <Link href={`/products/${product._id}`}>
              <div className="relative cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              {/* Name (Clickable) */}
              <Link href={`/products/${product._id}`}>
                <h3
                  // className="text-gray-500 font-medium text-sm mb-1 hover:text-black transition hover:underline"
                  className="inline-block relative text-gray-500 font-medium text-sm mb-1 
               hover:text-blue-600 transition-colors duration-200 
               after:content-[''] after:absolute after:left-0 after:bottom-0 
               after:w-0 after:h-[1px] after:bg-blue-600 
               hover:after:w-full after:transition-all after:duration-300"
                >
                  {product.name}
                </h3>
              </Link>

              <div className="text-blue-600 font-bold text-sm mb-2">
                {product.price}{" "}
                <span className="text-gray-500 line-through text-xs">
                  {product.origPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <button
                  // onClick={() => handleAddToCart(product)}
                  className="flex space-x-2"
                >
                  <GrCart className="w-6 h-6 text-blue-600 hover:cursor-pointer " />
                  <FaRegHeart className="w-6 h-6 text-purple-500 hover:cursor-pointer" />
                </button>
                <button className="text-md py-1 px-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          Prev
        </button>

        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, i) => (
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
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          className="px-3 py-1 rounded disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}






