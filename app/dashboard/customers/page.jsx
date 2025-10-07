"use client"; // Needed for state and interactivity

import Image from "next/image";
import { useState, useEffect } from "react";

// Demo customer data
const allCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/150?img=2", orders: 12, spent: 1200, vip: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?img=1", orders: 8, spent: 950, vip: false },
  { id: 3, name: "Alex Johnson", email: "alex@example.com", avatar: "https://i.pravatar.cc/150?img=3", orders: 15, spent: 1800, vip: true },
  { id: 4, name: "Maria Williams", email: "demo@example.com", avatar: "https://i.pravatar.cc/150?img=4", orders: 5, spent: 400, vip: false },
  { id: 5, name: "David Brown", email: "david@example.com", avatar: "https://i.pravatar.cc/150?img=5", orders: 9, spent: 1100, vip: true },
  { id: 6, name: "Sophia Lee", email: "sophia@example.com", avatar: "https://i.pravatar.cc/150?img=6", orders: 7, spent: 750, vip: false },
  { id: 7, name: "Liam Turner", email: "liam@example.com", avatar: "https://i.pravatar.cc/150?img=7", orders: 11, spent: 1400, vip: false },
  { id: 8, name: "Olivia Harris", email: "olivia@example.com", avatar: "https://i.pravatar.cc/150?img=8", orders: 6, spent: 600, vip: true },
  { id: 9, name: "Ethan Martin", email: "ethan@example.com", avatar: "https://i.pravatar.cc/150?img=9", orders: 10, spent: 1300, vip: false },
  { id: 10, name: "Ava Wilson", email: "ava@example.com", avatar: "https://i.pravatar.cc/150?img=20", orders: 4, spent: 350, vip: false },
];

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [sort, setSort] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  // Sort customers
  const sortedCustomers = [...allCustomers].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "orders") return b.orders - a.orders;
    if (sort === "spent") return b.spent - a.spent;
    return 0;
  });

  // Filter by search term
  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / perPage);
  const currentCustomers = filteredCustomers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="name">Sort by Name</option>
          <option value="orders">Sort by Orders</option>
          <option value="spent">Sort by Total Spent</option>
        </select>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 transform transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gradient-to-tr from-blue-400 to-purple-500">
              <Image
                src={customer.avatar}
                alt={customer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-800">{customer.name}</h2>
                {customer.vip && (
                  <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{customer.email}</p>
              <p className="mt-1 text-gray-700 text-sm">
                Orders: <span className="font-medium">{customer.orders}</span>
              </p>
              <p className="text-gray-700 text-sm">
                Total Spent: <span className="font-medium">${customer.spent}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded-lg shadow transition ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
