"use client";
import {
  ShoppingBagIcon,
  StarIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Gem } from "lucide-react"; // 💎 Added gem icon

export default function StatsCards({ userStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 🛒 Total Orders */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold mt-2">{userStats.totalOrders}</p>
          </div>
          <ShoppingBagIcon className="w-8 h-8 text-blue-200" />
        </div>
      </div>

      {/* 💎 Gems Points (Replaced Wishlist) */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Gems Points</h2>
            <p className="text-3xl font-bold mt-2">{userStats.gemsPoint}</p>
          </div>
          <Gem className="w-8 h-8 text-pink-200" />
        </div>
      </div>

      {/* ⭐ Reviews */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Reviews</h2>
            <p className="text-3xl font-bold mt-2">{userStats.reviewsCount}</p>
          </div>
          <StarIcon className="w-8 h-8 text-green-200" />
        </div>
      </div>

      {/* 🛍️ Cart Items */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Cart</h2>
            <p className="text-3xl font-bold mt-2">{userStats.cartItems}</p>
          </div>
          <ShoppingCartIcon className="w-8 h-8 text-purple-200" />
        </div>
      </div>

      {/* 💰 Total Spent */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Total Spent</h2>
            <p className="text-3xl font-bold mt-2">${userStats.totalSpent}</p>
          </div>
          <CurrencyDollarIcon className="w-8 h-8 text-yellow-200" />
        </div>
      </div>
    </div>
  );
}
