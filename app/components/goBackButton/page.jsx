"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton({ label = "Go Back", className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}
