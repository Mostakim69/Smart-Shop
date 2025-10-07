"use client";

import React, { useState } from "react";
import { Search, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast"; // optional for notifications

const collectionsData = [
  { id: 1, name: "Summer Collection", products: 24, image: "https://i.postimg.cc/VsStt9VS/faba0e1df12caa064504862bbaa7a3cf.jpg" },
  { id: 2, name: "Winter Collection", products: 18, image: "https://i.postimg.cc/3x65kT4w/be6849e48d097bebedc83c17ce547377.jpg" },
  { id: 3, name: "Electronics", products: 30, image: "https://i.postimg.cc/prV10Ghk/84c890b3d9574968dd7261ec02ecfd1e.jpg" },
  { id: 4, name: "Home Decor", products: 12, image: "https://i.postimg.cc/qMz1zC8Q/8692d6ee2697718354981dbbd66ba4a3.jpg" },
  { id: 5, name: "Accessories", products: 20, image: "https://i.postimg.cc/9fVPt4q8/fd5447b166203cf1f90a7afb398426fb.jpg" },
  { id: 6, name: "Fashion Trends", products: 15, image: "https://i.postimg.cc/8kFyC6dJ/8a205e78e8a491f2e2c84768784448b9.jpg" },
];

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collections, setCollections] = useState(collectionsData);

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (collection) => {
    // Navigate to collection details page
    alert(`Open details for: ${collection.name}`);
  };

  const handleEdit = (e, collection) => {
    e.stopPropagation(); // prevent card click
    alert(`Edit collection: ${collection.name}`);
  };

  const handleDelete = (e, collection) => {
    e.stopPropagation(); // prevent card click
    if (confirm(`Are you sure you want to delete "${collection.name}"?`)) {
      setCollections(collections.filter((c) => c.id !== collection.id));
      toast.success("Collection deleted!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Collections</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search collections..."
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection) => (
          <div
            key={collection.id}
            onClick={() => handleCardClick(collection)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{collection.name}</h2>
              <p className="text-sm text-gray-500">{collection.products} products</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={(e) => handleEdit(e, collection)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, collection)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (example) */}
      <div className="flex justify-center mt-8 gap-3">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">2</button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Next</button>
      </div>
    </div>
  );
}
