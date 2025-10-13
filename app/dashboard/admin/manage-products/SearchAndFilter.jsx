"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("name") || ""); // <-- name
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams();

      // ✅ backend expects "name"
      if (search) params.set("name", search);
      if (category) params.set("category", category);

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, category, router]);

  return (
    <div className="flex gap-3 items-center mb-4">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="sports">Sports</option>
      </select>
    </div>
  );
}
