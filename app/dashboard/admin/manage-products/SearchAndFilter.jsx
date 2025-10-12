
'use client';
import React, { useState } from "react";

export default function SearchAndFilter({ products }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" ? true : p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home & Living</option>
          <option value="fitness">Workout & Fitness</option>
          <option value="toys">Gift & Toys</option>
        </select>
      </div>

      {/* Filtered Products */}
      <div>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredProducts.map((p) => (
              <li key={p._id} className="border p-2 rounded">
                {p.name} - {p.category} - ${p.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
