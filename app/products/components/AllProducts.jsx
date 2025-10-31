"use client";
import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const productsPerPage = 12;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);


  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);

  // Load products
  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://smart-shop-server-three.vercel.app/products?category=${category}`
      : "https://smart-shop-server-three.vercel.app/products";

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);

  const sectionTitle = category ? `Products of ${category}` : "All Products";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
  const handleAddToCart = async (product) => {
    const cartItem = {
      userEmail: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      sellerEmail: product.sellerEmail,
      sellerName: product.sellerName,
    };

    axios
      .post("https://smart-shop-server-three.vercel.app/addToCart", cartItem)
      .then((res) => {
        if (res.data?.insertedId) {
          toast.success("Added to cart");
        }
      })
      .catch((err) => console.log(err));
    console.log(cartItem);
  };

  const handleCategory = (category) => {       // <-- new
    setSelectedCategory(category);             // highlight selected
    setCurrentPage(1);                         // reset pagination
    if (category === "All") {
      setFiltered(products);                   // show all
    } else {
      const filteredItems = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      setFiltered(filteredItems);             // filtered products
    }
  };

  return (
    <div className="bg-base-100">
      <div className="container mx-auto p-4 ">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">{sectionTitle}</h2>
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
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image  */}
              <Link href={`/products/${product._id}`}>
                <div className="w-full h-48 flex items-center justify-center bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name || "Product image"}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {/* Name */}
                <Link href={`/products/${product._id}`}>
                  <h3
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
                  <div className="flex space-x-2 items-center">
                    <button onClick={() => handleAddToCart(product)}>
                      <GrCart className="w-6 h-6 text-blue-600 hover:cursor-pointer " />
                    </button>
                    <button>
                      <FaRegHeart className="w-6 h-6 text-secondary hover:cursor-pointer" />
                    </button>
                  </div>
                  <Link
                    href={`/checkout?type=single&id=${product._id}`}
                    className="text-md py-1 px-3 bg-secondary text-white rounded"
                  >
                    Buy Now
                  </Link>
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
            className="px-3 py-1 rounded disabled:opacity-50 bg-secondary text-white cursor-pointer"
          >
            Prev
          </button>

          {[...Array(Math.ceil(products.length / productsPerPage))].map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "border text-primary"
                    : "bg-secondary text-white"
                }`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(products.length / productsPerPage)
            }
            className="px-3 py-1 rounded disabled:opacity-50 bg-secondary text-white"
          >
            Next
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
