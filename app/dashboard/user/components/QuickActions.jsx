"use client";

import Link from "next/link";
import { Truck, Heart, Star, User, Package, ShoppingBag } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Track Order",
      description: "Follow your package",
      icon: Truck,
      color: "from-blue-500 to-blue-600",
      href: "/track-order",
    },
    {
      title: "My Wishlist",
      description: "Saved items",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      href: "/wishlist",
    },
    {
      title: "Write Review",
      description: "Share experience",
      icon: Star,
      color: "from-green-500 to-green-600",
      href: "/write-review",
    },
    {
      title: "Update Profile",
      description: "Personal info",
      icon: User,
      color: "from-purple-500 to-purple-600",
      href: "/profile",
    },
    {
      title: "My Orders",
      description: "Purchase history",
      icon: Package,
      color: "from-orange-500 to-orange-600",
      href: "/dashboard/user/orders",
    },
    {
      title: "Continue Shopping",
      description: "Browse products",
      icon: ShoppingBag,
      color: "from-indigo-500 to-indigo-600",
      href: "/products",
    },
  ];

  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Actions</h2>
      </div>

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
    <Link
      href={action.href}
      className={`block bg-gradient-to-br ${action.color} text-white p-3 rounded-2xl shadow flex flex-col items-center justify-center text-center min-h-[140px]`}
    >
      <div className="mb-3 p-3 bg-white/20 rounded-xl">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-semibold text-white text-sm mb-1">{action.title}</h3>
      <p className="text-white/80 text-xs">{action.description}</p>
    </Link>
  );
}
