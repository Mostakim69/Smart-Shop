"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
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
  Bike,
  Calendar,
  Download,
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  Truck,
  BarChart3,
  MessageCircle,
  Settings,
  Bell,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
} from "lucide-react";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New high priority delivery assigned", time: "5 min ago", read: false },
    { id: 2, message: "Delivery #A5B2C8 completed successfully", time: "1 hour ago", read: true },
  ]);

  // ✅ Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [orders, searchTerm, statusFilter, priorityFilter]);

  // ✅ Separate orders by status
  const pendingDeliveries = filteredOrders.filter((order) => order.status === "pending");
  const completedDeliveries = filteredOrders.filter((order) => order.status === "completed");
  const failedDeliveries = filteredOrders.filter((order) => order.status === "failed");
  const inProgressDeliveries = filteredOrders.filter((order) => order.status === "in-progress");

  // ✅ Calculate stats dynamically
  const stats = [
    {
      title: "Total Deliveries",
      value: orders.length,
      change: "+12%",
      icon: Package,
      color: "blue",
      trend: "up",
    },
    {
      title: "Pending",
      value: pendingDeliveries.length,
      change: "-5%",
      icon: Clock,
      color: "orange",
      trend: "down",
    },
    {
      title: "In Progress",
      value: inProgressDeliveries.length,
      change: "+3",
      icon: Bike,
      color: "purple",
      trend: "up",
    },
    {
      title: "Completed",
      value: completedDeliveries.length,
      change: "+8%",
      icon: CheckCircle,
      color: "green",
      trend: "up",
    },
    {
      title: "Success Rate",
      value: `${orders.length > 0 ? Math.round((completedDeliveries.length / orders.length) * 100) : 0}%`,
      change: "+2%",
      icon: BarChart3,
      color: "teal",
      trend: "up",
    },
    {
      title: "Failed",
      value: failedDeliveries.length,
      change: "0%",
      icon: XCircle,
      color: "red",
      trend: "neutral",
    },
  ];

  // ✅ Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const handleStartDelivery = (orderId) => {
    // Update order status to in-progress
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, status: "in-progress" } : order
    ));
  };

  const handleCompleteDelivery = (orderId) => {
    // Update order status to completed
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, status: "completed" } : order
    ));
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">
            Loading deliveries...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Delivery Dashboard
                </h1>
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* Status Badge */}
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border hidden md:block">
                <p className="text-sm text-gray-500">Current Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-50 border-blue-200 text-blue-600",
              orange: "bg-orange-50 border-orange-200 text-orange-600",
              green: "bg-green-50 border-green-200 text-green-600",
              red: "bg-red-50 border-red-200 text-red-600",
              purple: "bg-purple-50 border-purple-200 text-purple-600",
              teal: "bg-teal-50 border-teal-200 text-teal-600",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${
                        stat.trend === "down" ? "rotate-180" : ""
                      }`}
                    />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders, customers, addresses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {[
                { id: "pending", label: "Pending", count: pendingDeliveries.length, icon: Clock },
                { id: "in-progress", label: "In Progress", count: inProgressDeliveries.length, icon: Bike },
                { id: "completed", label: "Completed", count: completedDeliveries.length, icon: CheckCircle },
                { id: "failed", label: "Failed", count: failedDeliveries.length, icon: XCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {(activeTab === "pending" ? pendingDeliveries :
              activeTab === "in-progress" ? inProgressDeliveries :
              activeTab === "completed" ? completedDeliveries :
              failedDeliveries).map((order) => (
              <div
                key={order._id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(order.priority)}`}>
                        {order.priority || "Medium"}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{order.customer || order.orderUser}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{order.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{order.address || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{order.time || "N/A"}</span>
                      </div>
                    </div>
                    
                    {order.notes && (
                      <div className="flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg mb-4">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{order.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-3 ml-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 mb-1">
                        {order.amount || "৳ 0"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.distance || "N/A"} away
                      </div>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button 
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {order.status === "completed" && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (order.rating || 4)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Created: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <button 
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                          onClick={() => handleStartDelivery(order._id)}
                        >
                          <Bike className="w-4 h-4" />
                          Start Delivery
                        </button>
                        <button 
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </button>
                      </>
                    )}
                    {order.status === "in-progress" && (
                      <button 
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                        onClick={() => handleCompleteDelivery(order._id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Complete Delivery
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setShowOrderModal(false)}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order info sections would go here */}
              <div className="text-center py-8 text-gray-500">
                Order details view would be implemented here
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}