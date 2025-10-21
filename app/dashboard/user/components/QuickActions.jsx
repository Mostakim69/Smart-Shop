"use client";

import { Truck, Heart, Star, User, Package, ShoppingBag } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Track Order",
      description: "Follow your package",
      icon: Truck,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      href: "/track-order"
    },
    {
      title: "My Wishlist",
      description: "Saved items",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      hoverColor: "hover:from-pink-600 hover:to-pink-700",
      href: "/wishlist"
    },
    {
      title: "Write Review",
      description: "Share experience",
      icon: Star,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      href: "/write-review"
    },
    {
      title: "Update Profile",
      description: "Personal info",
      icon: User,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      href: "/profile"
    },
    {
      title: "My Orders",
      description: "Purchase history",
      icon: Package,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      href: "/dashboard/user/orders"
    },
    {
      title: "Continue Shopping",
      description: "Browse products",
      icon: ShoppingBag,
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
      href: "/products"
    }
  ];

  return (
    <div className="mb-12">
      {/* Header */}
      <div className=" mb-8">
        <h2 className="text-3xl font-bold text-gray-900  mb-3">
          Quick Actions
        </h2>
        
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {actions.map((action, index) => (
          <ActionCard key={index} action={action} />
        ))}
      </div>
    </div>
  );
}

function ActionCard({ action }) {
  const Icon = action.icon;
  
  return (
    <button
      onClick={() => window.location.href = action.href}
      className={`group relative bg-gradient-to-br ${action.color} ${action.hoverColor} text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-[140px]`}
    >
      {/* Icon */}
      <div className="mb-3 p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      
      {/* Text Content */}
      <h3 className="font-semibold text-white text-sm mb-1">
        {action.title}
      </h3>
      <p className="text-white/80 text-xs">
        {action.description}
      </p>

      {/* Hover Arrow */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
}