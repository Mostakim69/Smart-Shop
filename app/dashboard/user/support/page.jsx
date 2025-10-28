"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  ChatBubbleLeftRightIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";

export default function SupportTracker() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/support?userEmail=${user.email}`
      );
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Failed to load support tickets:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    fetchTickets();
  }, [user?.email]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <ArrowPathIcon className="w-5 h-5 text-orange-500 animate-spin" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Progress":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-gray-200 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Support Tickets</h3>
        <p className="text-gray-500 mb-4">You haven't submitted any support requests yet.</p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Support Tickets</h2>
            <p className="text-sm text-gray-500">
              {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} in total
            </p>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">{tickets.length}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">
            {tickets.filter(t => t.status === "Pending").length}
          </div>
          <div className="text-xs text-yellow-600">Pending</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {tickets.filter(t => t.status === "Resolved").length}
          </div>
          <div className="text-xs text-green-600">Resolved</div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
              {/* Ticket Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  {getStatusIcon(ticket.status)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {ticket.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {ticket.message}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    Submitted: {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                    <span className="flex items-center gap-1">
                      <ArrowPathIcon className="w-4 h-4" />
                      Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}
                >
                  {getStatusIcon(ticket.status)}
                  {ticket.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Need more help? Contact our support team for immediate assistance.
        </p>
      </div>
    </div>
  );
}