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

  if (!recentOrders || recentOrders.length === 0) {
    return (
      <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
        No recent orders yet.
      </div>
    );
  }

  return (
    <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {recentOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status || "Processing");

          return (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-gray-800">{order.name}</h3>
                </div>
                <span
                  className={`text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                {order.date} • <span className="font-medium">{order.amount}</span>
              </p>

              {order.items && order.items.length > 0 && (
                <div className="mt-3 border-t pt-2 space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {item.productName} x {item.quantity} (${item.price})
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
