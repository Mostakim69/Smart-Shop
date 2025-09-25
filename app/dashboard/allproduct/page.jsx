import React from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";

export default function AllproductPage() {
  const products = [
    {
      name: "JetSetter Packing Cubes With Dick",
      category: "Kitchen Appliances",
      price: "$20.00",
      salePrice: "$35.00",
      stock: 300,
      status: "Selling",
    },
    {
      name: "MX Vertical Mouse",
      category: "Computer Accessories",
      price: "$70.00",
      salePrice: "$109.99",
      stock: 150,
      status: "Selling",
    },
    {
      name: "ErgoPro Mechanical Keyboard",
      category: "Computer Accessories",
      price: "$65.00",
      salePrice: "$99.00",
      stock: 0,
      status: "Out of stock",
    },
    {
      name: "Non-Stick Loaf Pan",
      category: "Bakeware",
      price: "$7.50",
      salePrice: "$14.50",
      stock: 280,
      status: "Selling",
    },
    {
      name: "Silicone Baking Mat Set",
      category: "Bakeware",
      price: "$10.00",
      salePrice: "$19.99",
      stock: 350,
      status: "Selling",
    },
    {
      name: "Project Hail Mary",
      category: "Fiction Books",
      price: "$12.50",
      salePrice: "$24.95",
      stock: 0,
      status: "Out of stock",
    },
    {
      name: "The Silent Patient",
      category: "Fiction Books",
      price: "$8.00",
      salePrice: "$14.99",
      stock: 400,
      status: "Selling",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Search product..."
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <select className="px-4 py-2 border rounded-lg">
          <option>Category</option>
        </select>
        <select className="px-4 py-2 border rounded-lg">
          <option>Sort by</option>
        </select>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Filter
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg">
          Reset
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Sale Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">View</th>
              <th className="p-3">Published</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">{p.salePrice}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      p.status === "Selling"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <Eye className="w-5 h-5 text-gray-600 cursor-pointer" />
                </td>
                <td className="p-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </td>
                <td className="p-3 flex gap-3">
                  <Edit className="w-5 h-5 text-blue-600 cursor-pointer" />
                  <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
