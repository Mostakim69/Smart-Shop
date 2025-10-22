import React from "react";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

export default function SummaryCards() {
  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: 720,
      change: "+5% this month",
      icon: <Users className="w-6 h-6" />,
      changeType: "up",
      color: "blue",
    },
    {
      id: 2,
      title: "Total Orders",
      value: 198,
      change: "+3% this week",
      icon: <ShoppingBag className="w-6 h-6" />,
      changeType: "up",
      color: "purple",
    },
    {
      id: 3,
      title: "Total Sales",
      value: "$5,480",
      change: "-2% this week",
      icon: <DollarSign className="w-6 h-6" />,
      changeType: "down",
      color: "green",
    },
    {
      id: 4,
      title: "Products",
      value: 47,
      change: "+2 new added",
      icon: <Package className="w-6 h-6" />,
      changeType: "up",
      color: "orange",
    },
  ];

  // Color map for icons
  const iconColors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-500",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <div
              className={`p-3 rounded-xl flex items-center justify-center ${iconColors[stat.color]}`}
            >
              {stat.icon}
            </div>
          </div>

          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>

          <p
            className={`text-xs mt-2 font-medium ${
              stat.changeType === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {stat.changeType === "up" ? "↑" : "↓"} {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

// export default function SummaryCards() {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     // Replace this URL with your actual backend API endpoint
//     fetch("/api/dashboard-stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Failed to fetch stats:", err));
//   }, []);

//   // Fallback: loading state
//   if (stats.length === 0) {
//     return <div className="text-center py-10">Loading stats...</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//       {stats.map((stat) => (
//         <div
//           key={stat.id}
//           className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 border border-gray-50"
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
//             <div className="bg-gray-50 p-2 rounded-lg">{getIcon(stat.icon)}</div>
//           </div>

//           <p className="text-3xl font-bold text-gray-800">{stat.value}</p>

//           <p
//             className={`text-xs mt-2 font-medium ${
//               stat.changeType === "up" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {stat.changeType === "up" ? "↑" : "↓"} {stat.change}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Function to render icon dynamically
// function getIcon(name) {
//   switch (name) {
//     case "Users":
//       return <Users className="text-blue-600 w-6 h-6" />;
//     case "ShoppingBag":
//       return <ShoppingBag className="text-purple-600 w-6 h-6" />;
//     case "DollarSign":
//       return <DollarSign className="text-green-600 w-6 h-6" />;
//     case "Package":
//       return <Package className="text-orange-500 w-6 h-6" />;
//     default:
//       return null;
//   }
// }
