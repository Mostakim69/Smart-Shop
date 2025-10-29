"use client";
import React from "react";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  User, 
  Phone, 
  Navigation, 
  DollarSign,
  Star,
  TrendingUp,
  AlertCircle,
  Bike,
  Calendar,
  Download
} from "lucide-react";

export default function DeliveryDashboard() {
  // Example data (replace with API data later)
  const stats = [
    { 
      title: "Today's Deliveries", 
      value: 12, 
      change: "+2", 
      icon: Package, 
      color: "blue",
      trend: "up"
    },
    { 
      title: "Pending Deliveries", 
      value: 5, 
      change: "-1", 
      icon: Clock, 
      color: "orange",
      trend: "down"
    },
    { 
      title: "Completed", 
      value: 7, 
      change: "+3", 
      icon: CheckCircle, 
      color: "green",
      trend: "up"
    },
    { 
      title: "Failed", 
      value: 0, 
      change: "0", 
      icon: XCircle, 
      color: "red",
      trend: "neutral"
    },
  ];

  const pendingDeliveries = [
    {
      id: "ORD001",
      customer: "John Doe",
      address: "123 Main St, Dhaka 1205",
      time: "10:30 AM",
      status: "Pending",
      priority: "High",
      phone: "+880 1234-567890",
      distance: "2.3 km",
      amount: "₫ 450"
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      address: "456 Park Ave, Dhaka 1206",
      time: "11:00 AM",
      status: "Pending",
      priority: "Medium",
      phone: "+880 1234-567891",
      distance: "1.8 km",
      amount: "₫ 320"
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      address: "789 Lake Rd, Dhaka 1207",
      time: "11:45 AM",
      status: "Pending",
      priority: "Low",
      phone: "+880 1234-567892",
      distance: "3.1 km",
      amount: "₫ 280"
    },
  ];

  const completedDeliveries = [
    {
      id: "ORD010",
      customer: "Alice Johnson",
      address: "321 Garden St, Dhaka 1208",
      time: "09:30 AM",
      status: "Completed",
      rating: 5,
      amount: "₫ 380",
      deliveryTime: "25 min"
    },
    {
      id: "ORD011",
      customer: "Bob Brown",
      address: "654 Hill View, Dhaka 1209",
      time: "10:15 AM",
      status: "Completed",
      rating: 4,
      amount: "₫ 520",
      deliveryTime: "32 min"
    },
  ];

  const quickActions = [
    { label: "Start Delivery", icon: Bike, color: "blue", action: () => console.log("Start delivery") },
    { label: "View Route", icon: Navigation, color: "green", action: () => console.log("View route") },
    { label: "Earnings", icon: DollarSign, color: "purple", action: () => console.log("View earnings") },
    { label: "Schedule", icon: Calendar, color: "orange", action: () => console.log("View schedule") },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "Failed": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-6">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Delivery Dashboard
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center gap-3">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <p className="text-sm text-gray-500">Current Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-600">Active</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-50 border-blue-200 text-blue-600",
            orange: "bg-orange-50 border-orange-200 text-orange-600",
            green: "bg-green-50 border-green-200 text-green-600",
            red: "bg-red-50 border-red-200 text-red-600"
          };

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-4 lg:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : 
                  stat.trend === "down" ? "text-red-600" : "text-gray-500"
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    stat.trend === "down" ? "rotate-180" : ""
                  }`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          const colorClasses = {
            blue: "bg-blue-600 hover:bg-blue-700",
            green: "bg-green-600 hover:bg-green-700",
            purple: "bg-purple-600 hover:bg-purple-700",
            orange: "bg-orange-600 hover:bg-orange-700"
          };

          return (
            <button
              key={index}
              onClick={action.action}
              className={`${colorClasses[action.color]} text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2`}
            >
              <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="text-sm font-medium text-center">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Pending Deliveries */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 lg:p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Pending Deliveries
              </h2>
              <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium">
                {pendingDeliveries.length} orders
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="divide-y divide-gray-100">
                  {pendingDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{delivery.id}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(delivery.priority)}`}>
                              {delivery.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <User className="w-4 h-4" />
                            <span>{delivery.customer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{delivery.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{delivery.amount}</div>
                          <div className="text-sm text-gray-500">{delivery.distance}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{delivery.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{delivery.phone}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Start Delivery
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Deliveries & Map */}
        <div className="space-y-6 lg:space-y-8">
          {/* Completed Deliveries */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 lg:p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Recent Completed
                </h2>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                  {completedDeliveries.length} today
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {completedDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{delivery.id}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${
                                i < delivery.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <User className="w-4 h-4" />
                        <span>{delivery.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{delivery.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">{delivery.amount}</div>
                      <div className="text-sm text-gray-500">{delivery.deliveryTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 lg:p-6 border-b">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-500" />
                Delivery Route
              </h2>
            </div>
            <div className="p-4 lg:p-6">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl h-48 lg:h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="relative text-white text-center">
                  <Navigation className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Live Route Tracking</p>
                  <p className="text-sm opacity-90">3 active deliveries on route</p>
                </div>
                {/* Map markers */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Total Distance</div>
                  <div className="font-semibold text-gray-900">7.2 km</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Est. Time</div>
                  <div className="font-semibold text-gray-900">45 min</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Next Stop</div>
                  <div className="font-semibold text-gray-900">0.8 km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 lg:mt-8 bg-white rounded-xl shadow-sm border p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Today's Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₫ 1,250</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">28 min</div>
            <div className="text-sm text-gray-600">Avg. Delivery Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}