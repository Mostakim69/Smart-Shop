import { Edit, Trash2, Plus, Laptop, Shirt, Home, Dumbbell, Gift, Package } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Categories | Admin Dashboard",
};

async function getCategories() {

  return [
    {
      id: 1,
      name: "Electronics",
      description: "Phones, laptops, and smart devices",
      products: 12,
      icon: <Laptop size={34} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothes, shoes & accessories",
      products: 16,
      icon: <Shirt size={34} />,
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 3,
      name: "Home & Living",
      description: "Furniture, kitchen tools & decor",
      products: 4,
      icon: <Home size={34} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      name: "Fitness & Sports",
      description: "Workout gear, gym tools & more",
      products: 7,
      icon: <Dumbbell size={34} />,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      name: "Gifts & Toys",
      description: "Toys, games & gift collections",
      products: 11,
      icon: <Gift size={34} />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 6,
      name: "Groceries",
      description: "Daily essentials & fresh foods",
      products: 23,
      icon: <Package size={34} />,
      color: "from-yellow-500 to-amber-600",
    },
  ];
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="p-8 animate-fadeIn min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ✅ Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">📦 Categories</h1>
          <p className="text-gray-500 mt-2 text-base">
            Manage and organize all your product categories easily.
          </p>
        </div>

        <Link
          href="/dashboard/categories/add"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Plus size={20} /> Add New Category
        </Link>
      </div>

      {/* ✅ Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/30 group"
          >
            {/* Top Accent Bar */}
            <div
              className={`absolute top-0 left-0 h-1 w-0 bg-gradient-to-r ${cat.color} rounded-t-2xl transition-all duration-500 group-hover:w-full`}
            ></div>

            {/* Icon */}
            <div
              className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${cat.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
            >
              {cat.icon}
            </div>

            {/* Category Info */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {cat.name}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{cat.description}</p>

            <div className="flex items-center justify-between mb-8">
              <span className="text-blue-600 font-medium text-sm">
                📊 {cat.products} Products
              </span>
              <span className="text-xs text-gray-400 italic">
                Updated {Math.floor(Math.random() * 10) + 1} days ago
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Link
                href={`/dashboard/categories/edit/${cat.id}`}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <Edit size={17} /> Edit
              </Link>
              <button className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-300">
                <Trash2 size={17} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {categories.length === 0 && (
        <div className="text-center text-gray-500 mt-16 text-lg italic">
          No categories found. Click “Add New Category” to create one.
        </div>
      )}
    </section>
  );
}
