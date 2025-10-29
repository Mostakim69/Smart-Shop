"use client";
import { useState } from "react";
import { Bell, X, Check, CheckCheck, Clock } from "lucide-react";

export default function Notifications({ isDarkMode = false }) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order #ORD-7842 placed by John Doe", time: "2 min ago", type: "order", read: false, priority: "high" },
    { id: 2, message: "Your product design was approved by the team", time: "1 hour ago", type: "success", read: false, priority: "medium" },
    { id: 3, message: "Payment of $1,240 received successfully", time: "3 hours ago", type: "payment", read: true, priority: "medium" },
    { id: 4, message: "Weekly team meeting starts in 30 minutes", time: "5 hours ago", type: "reminder", read: true, priority: "low" },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const removeNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };

  const getNotificationIcon = (type) => {
    const base = "w-4 h-4";
    switch (type) {
      case "order": return <Bell className={`${base} text-blue-500`} />;
      case "success": return <Check className={`${base} text-green-500`} />;
      case "payment": return <CheckCheck className={`${base} text-emerald-500`} />;
      case "reminder": return <Clock className={`${base} text-amber-500`} />;
      default: return <Bell className={`${base} text-gray-500`} />;
    }
  };

  const dropdownStyle = isDarkMode
    ? "bg-gray-800 border border-gray-700 text-white"
    : "bg-white border border-gray-200 text-gray-900";

  const itemStyle = isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50";

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-red-500 text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className={`absolute right-0 mt-3 w-80 rounded-lg shadow-lg ${dropdownStyle}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-green-500 hover:text-green-600 text-sm">Mark all read</button>
              )}
              <button onClick={() => setShowAll(true)} className="text-blue-500 hover:text-blue-600 text-sm">View all</button>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-sm p-4 text-gray-500">No notifications</p>
            ) : (
              notifications.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 border-b ${itemStyle} cursor-pointer ${!n.read ? (isDarkMode ? "bg-gray-700/20" : "bg-gray-100") : ""}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className={`w-1 h-12 rounded-full ${getPriorityColor(n.priority)}`}></div>
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(n.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.time}</p>
                  </div>
                  <button onClick={() => removeNotification(n.id)} className="text-gray-400 hover:text-red-500 p-1">
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-300 dark:border-gray-700">
              <button onClick={() => setShowAll(true)} className="w-full py-2 text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
            </div>
          )}
        </div>
      )}

      {/* Modal View All */}
      {showAll && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <h3 className="font-semibold">All Notifications</h3>
              <button onClick={() => setShowAll(false)} className="text-gray-500 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-sm p-4 text-gray-500">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 border-b cursor-pointer ${!n.read ? "bg-gray-100 dark:bg-gray-700/20" : ""}`}
                  >
                    <div className={`w-1 h-12 rounded-full ${getPriorityColor(n.priority)}`}></div>
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(n.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{n.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.time}</p>
                    </div>
                    <button onClick={() => removeNotification(n.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
