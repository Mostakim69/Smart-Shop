"use client";
import React from "react";

export default function CardItem({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
