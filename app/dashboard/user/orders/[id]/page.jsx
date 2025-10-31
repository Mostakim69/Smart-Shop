"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon, 
  XCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon
} from "@heroicons/react/24/outline";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`https://smart-shop-server-three.vercel.app/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusConfig = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-50 text-yellow-800 border-yellow-200",
        icon: ClockIcon,
        label: "Pending"
      },
      processing: {
        color: "bg-blue-50 text-blue-800 border-blue-200",
        icon: ClockIcon,
        label: "Processing"
      },
      shipped: {
        color: "bg-purple-50 text-purple-800 border-purple-200",
        icon: TruckIcon,
        label: "Shipped"
      },
      delivered: {
        color: "bg-green-50 text-green-800 border-green-200",
        icon: CheckCircleIcon,
        label: "Delivered"
      },
      cancelled: {
        color: "bg-red-50 text-red-800 border-red-200",
        icon: XCircleIcon,
        label: "Cancelled"
      }
    };
    return config[status?.toLowerCase()] || config.pending;
  };

  const getProgressSteps = (status) => {
    const steps = [
      { key: 'pending', label: 'Order Placed' },
      { key: 'processing', label: 'Processing' },
      { key: 'shipped', label: 'Shipped' },
      { key: 'delivered', label: 'Delivered' }
    ];
    
    const currentStatusIndex = steps.findIndex(step => 
      step.key === status?.toLowerCase()
    );
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      current: index === currentStatusIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircleIcon className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;
  const progressSteps = getProgressSteps(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-2">Order #{order._id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium ${statusConfig.color}`}>
                <StatusIcon className="w-5 h-5" />
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h2>
          <div className="flex justify-between relative">
            {progressSteps.map((step, index) => (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.completed
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : step.current
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className={`text-xs font-medium mt-2 ${
                  step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 -z-10">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ 
                  width: `${(progressSteps.filter(step => step.completed).length - 1) * 33.33}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBagIcon className="w-6 h-6 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition duration-200">
                    <div className="flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>Price: ${item.price}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Subtotal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPinIcon className="w-6 h-6 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <p className="text-gray-600">
                    {order.shippingAddress?.street || "123 Main Street"} <br />
                    {order.shippingAddress?.city || "City"}, {order.shippingAddress?.state || "State"} {order.shippingAddress?.zipCode || "12345"} <br />
                    {order.shippingAddress?.country || "Country"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <p className="text-gray-600">
                    {order.orderedBy || "customer@example.com"} <br />
                    {order.phoneNumber || "+1 (555) 123-4567"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="space-y-6">
            {/* Order Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order ID</dt>
                  <dd className="font-medium text-gray-900">{order._id.slice(-8).toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order Date</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Items</dt>
                  <dd className="font-medium text-gray-900">{order.items?.length || 0}</dd>
                </div>
              </dl>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCardIcon className="w-6 h-6 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Payment Summary</h3>
              </div>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-gray-900">${order.totalAmount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="text-gray-900">$0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="text-gray-900">$0.00</dd>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <dt className="font-semibold text-gray-900">Total</dt>
                  <dd className="font-semibold text-gray-900">${order.totalAmount}</dd>
                </div>
              </dl>
            </div>

            {/* Support Card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-700 text-sm mb-4">
                If you have any questions about your order, our customer service team is here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-blue-600">📞 +1 (555) 123-4567</p>
                <p className="text-blue-600">✉️ support@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}