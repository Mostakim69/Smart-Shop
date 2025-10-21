"use client";
import { CheckCircleIcon, ClockIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function RecentOrders({ recentOrders }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return CheckCircleIcon;
      case "Processing":
        return ClockIcon;
      case "Shipped":
        return TruckIcon;
      case "Cancelled":
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (!recentOrders || recentOrders.length === 0) {
    return (
      <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-md text-center text-gray-500">
        No recent orders yet.
      </div>
    );
  }

  return (
    <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Recent Orders
      </h2>
      <div className="space-y-4">
        {recentOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status || "Processing");

          return (
            <div
              key={order.id}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gradient-to-r from-white to-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <StatusIcon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{order.name}</h3>
                </div>

                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-2">
                {order.date} • <span className="font-medium">{order.amount}</span>
              </p>

              {order.items && order.items.length > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-2 space-y-1">
                  {order.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-gray-600 text-sm flex justify-between hover:bg-gray-100 px-2 py-1 rounded transition"
                    >
                      <span>{item.productName} x {item.quantity}</span>
                      <span className="font-medium">${item.price}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
