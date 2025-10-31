"use client";
import React from "react";

export default function ProgressBar({ steps }) {
  const completed = steps.filter(s => s.done).length;
  const percentage = (completed / steps.length) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-4 mb-6">
      <div
        style={{ width: `${percentage}%` }}
        className="h-2 bg-primary transition-all duration-500"
      ></div>
    </div>
  );
}
