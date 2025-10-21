import { Gem } from "lucide-react";
import React from "react";

export default function Gems() {
  return (
    <div className="flex items-center gap-2 border border-gray-700 p-1 rounded-lg">
      <Gem className="w-6 h-6 text-gray-700 hover:text-primary" />
     <h1 className="text-gray-700 font-semibold">200</h1>
    </div>
  );
}
