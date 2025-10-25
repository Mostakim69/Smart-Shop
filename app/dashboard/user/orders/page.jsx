"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  EyeIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  XMarkIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://smart-shop-server-three.vercel.app/orders?orderedBy=${user.email}`);
        if (!res.ok) {
          setOrders([]);
          return;
        }
        const data = await res.json();
        const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedOrder) return;

    setCancellingOrderId(selectedOrder._id);
    try {
      const res = await fetch(`https://smart-shop-server-three.vercel.app/orders/${selectedOrder._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setOrders(orders.filter(order => order._id !== selectedOrder._id));
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancellingOrderId(null);
      setShowCancelModal(false);
      setSelectedOrder(null);
    }
  };

  const cancelModalClose = () => {
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "Pending":
        return <ClockIcon className="w-4 h-4" />;
      case "Shipped":
        return <TruckIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getStatusColors = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your order history</p>
          <Link href="/login">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">View and manage your recent purchases</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">Order Details</th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">Total</th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="text-right p-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="p-6">
                          <div>
                            <div className="font-medium text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-gray-600">
                          {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-6">
                          <div className="font-semibold text-gray-900">${order.totalAmount}</div>
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColors(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-end gap-3">
                            <Link href={`/dashboard/user/orders/${order._id}`}>
                              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm">
                                <EyeIcon className="w-4 h-4" /> View
                              </button>
                            </Link>
                            <button
                              onClick={() => handleCancelClick(order)}
                              disabled={cancellingOrderId === order._id}
                              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <TrashIcon className="w-4 h-4" />
                              {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-12 text-center">
                        <div className="max-w-sm mx-auto">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TruckIcon className="w-10 h-10 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                          <p className="text-gray-600 mb-6">When you place orders, they will appear here</p>
                          <Link href="/products">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                              Start Shopping
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <div className="p-4 space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColors(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status || "Pending"}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="font-medium text-gray-900">{order.items?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-gray-900">${order.totalAmount}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/dashboard/user/orders/${order._id}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm">
                          <EyeIcon className="w-4 h-4" /> View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleCancelClick(order)}
                        disabled={cancellingOrderId === order._id}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <TrashIcon className="w-4 h-4" /> {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TruckIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                  <Link href="/products">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                      Browse Products
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cancel Order</h3>
                <p className="text-gray-600 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel order <strong>#{selectedOrder._id.slice(-8).toUpperCase()}</strong>? 
              This will permanently remove the order from your history.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelModalClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
              >
                Back
              </button>
              <button
                onClick={confirmCancel}
                disabled={cancellingOrderId === selectedOrder._id}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancellingOrderId === selectedOrder._id ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
