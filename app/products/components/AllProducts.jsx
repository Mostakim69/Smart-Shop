"use client";
import { useState, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios.get("https://smart-shop-server-three.vercel.app/products")
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || p.category === category)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
        All Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-300 text-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="grocery">Grocery</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length ? filtered.map(p => (
          <div key={p._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-gray-500 font-bold text-sm mb-1">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-1">{p.description}</p>
              <div className="text-blue-600 font-bold text-sm mb-2">${p.price}</div>
              <div className="flex justify-between items-center">
                <button className="flex space-x-2">
                  <GrCart className="w-6 h-6 text-blue-600" />
                  <FaRegHeart className="w-6 h-6 text-purple-500" />
                </button>
                <button className="text-md py-1 px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}
